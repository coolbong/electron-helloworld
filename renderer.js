/**
 * Created by coolbong on 2017-07-19.
 */


const {ipcRenderer} = require('electron');


const btn_default = document.getElementById('btn-ping');


btn_default.addEventListener('click', () => {
  ipcRenderer.send('asynchronous-message', 'ping');
});

ipcRenderer.on('asynchronous-message', (event, message) => {
  console.log(message);
});