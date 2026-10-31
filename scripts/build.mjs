import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','app.js','activities.js','diagrams.js','model.js'])await copyFile(file,`dist/${file}`);
console.log('Sitio estático preparado en dist/');
