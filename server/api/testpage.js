import { JSDOM } from "jsdom";

export default defineEventHandler(async (event) => {
  const res = await fetch("https://ru.ecarstrade.com/contact?l=en");
  const html = await res.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;
  // Извлекаем все ссылки на CSS и JS файлы

  const cssLinks = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  ).map((link) => {
    const href = link.href;
    link.remove();
    return href;
  });

  const headLinks = document.querySelectorAll("img").forEach((img) => {
    img.src = `https://ru.ecarstrade.com${img.src}`;
  });

  const jsLinks = Array.from(document.querySelectorAll("script[src]")).map(
    (script) => {
      const src = script.src;
      script.remove();
      return src;
    }
  );

  const rawJs = Array.from(document.querySelectorAll("script")).map((script) =>
    script.src ? script.innerText : ""
  );

  const cssPromises = cssLinks.map(async (link) => {
    const res = await fetch(`https://ru.ecarstrade.com${link}`);
    const code = await res.text();
    return code;
  });

  const jsPromises = jsLinks.map(async (link) => {
    if (link.startsWith("http")) {
      const res = await fetch(`${link}`);
      const code = await res.text();
      return code;
    } else {
      const res = await fetch(`https://ru.ecarstrade.com${link}`);
      const code = await res.text();
      return code;
    }
  });

  const cssCode = await Promise.all(cssPromises);
  const jsCode = await Promise.all(jsPromises);
  jsCode.concat(rawJs);

  const newHtml = dom.serialize();

  return {
    html: newHtml,
    jsCode,
    cssCode,
  };
});
