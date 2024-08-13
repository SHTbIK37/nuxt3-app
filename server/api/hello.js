import { JSDOM } from "jsdom";

export default defineEventHandler(async (event) => {
  const res = await fetch("http://localhost:8000/test.php");
  const html = await res.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;
  // Извлекаем все ссылки на CSS и JS файлы

  const cssLinks = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  ).map((link) => link.href);
  const jsLinks = Array.from(document.querySelectorAll("script[src]")).map(
    (script) => script.src
  );

  const cssPromises = cssLinks.map((link) =>
    fetch(`http://localhost:8000${link}`).then((res) => res.text())
  );
  const jsPromises = jsLinks.map((link) =>
    fetch(`http://localhost:8000${link}`).then((res) => res.text())
  );

  const cssCode = await Promise.all(cssPromises);
  const jsCode = await Promise.all(jsPromises);

  return {
    html,
    jsCode,
    cssCode,
  };
});
