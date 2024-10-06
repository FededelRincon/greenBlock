const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

// Define el path donde está tu repositorio
const repoPath = path.resolve(__dirname); 
const git = simpleGit(repoPath);

// Define el archivo que se va a modificar (puedes usar cualquier archivo)
const filePath = path.join(repoPath, 'update-log.txt');

// Obtiene la fecha actual en formato ISO
const fechaDeHoy = new Date().toISOString();
const logMessage = `fechaDeHoy: '${fechaDeHoy}'\n`;

// Agrega la fecha actual al archivo (si no existe el archivo, lo crea)
fs.appendFileSync(filePath, logMessage, 'utf8');

// Paso 1: Agregar los cambios
git.add('.')
   .then(() => {
       // Paso 2: Hacer commit con la fecha de hoy en el mensaje
       return git.commit(`Commit automático: ${fechaDeHoy}`);
   })
   .then(() => {
       // Paso 3: Hacer push al repositorio remoto
       return git.push('origin', 'main');
   })
   .then(() => {
       console.log('¡Cambios subidos a GitHub!');
   })
   .catch(err => console.error('Error al hacer el push:', err));
