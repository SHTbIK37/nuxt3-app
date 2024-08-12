import { JSDOM } from "jsdom";

export default defineEventHandler(async (event) => {
  // Получаем HTML-страницу
  const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple Button Example</title>
    <link rel="stylesheet" href="./style" />
  </head>

  <body>
  <div>
    <button id="fetchButton" onclick="calculateSum()">Click me</button>
    <script src="./mocks"></script>
  </div>  
  </body>
</html>
`;
  // Парсим HTML
  const dom = new JSDOM(html);
  const document = dom.window.document;
  // Извлекаем все ссылки на CSS и JS файлы
  const js = Array.from(document.querySelectorAll("script")).map((script) => {
    if (!script.src) return script.innerHTML;
  });
  const cssLinks = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  ).map((link) => link.href);
  const jsLinks = Array.from(document.querySelectorAll("script[src]")).map(
    (script) => script.src
  );

  return {
    html,
    js,
    cssLinks,
    jsLinks,
  };
});
