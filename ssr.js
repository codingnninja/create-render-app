/* This is the configuration for static site rendering */
import { writeFile } from 'fs/promises';
import { App } from './src/App';
import { $render } from '@codingnninja/render';
import { songs } from './src/playlist';
import { toggle } from './src/utils/appUtils';

console.log('loading...');
const renderedApp = await $render(App, { songs, toggle });
const htmlString = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Render App</title>
    <link href="./assets/css/style.css" />
    <script type="module" src="/main.js"></script>
  </head>
  <body>
    <div id="root">${renderedApp}</div>
    <!--Material Icon Font-->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,-25"
    />
  </body>
</html>`;
await writeFile('index.html', htmlString, 'utf8');
console.log('pre-rendering completed!');
