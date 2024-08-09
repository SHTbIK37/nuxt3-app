import { JSDOM } from "jsdom";

export default defineEventHandler(async (event) => {
  // Получаем HTML-страницу
  const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Button Example</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <button onclick="calculateSum()">Click me</button>

    <script>
        function calculateSum() {
            const num1 = 16;
            const num2 = 14;
            const sum = num1 + num2;
            console.log("The sum is: " + sum);
        }
    </script>
    <script src="./mocks.js"></script>
</body>

</html>`;
  // Парсим HTML
  const dom = new JSDOM(html);
  const document = dom.window.document;
  console.log(document.innerHTML);
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
  console.log(jsLinks);

  return {
    html,
    js,
    cssLinks,
    jsLinks,
  };
});
