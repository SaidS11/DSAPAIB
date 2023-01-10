import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});

function loggearDoctor(user: string, pass: string) {
  ipcRenderer.send('loggearDoctor', user, pass);
}
function selectPaciente(
  nombre: string,
  apellidoP: string,
  apellidoM: string,
  email: string
) {
  ipcRenderer.send('selectPaciente', nombre, apellidoP, apellidoM, email);
}
function selectPacientes() {
  ipcRenderer.send('selectPacientes');
}

const indexBridge = {
  loggearDoctor,
  loggearD: (callback: any) => ipcRenderer.on('loggearD', callback),
  selectPaciente,
  selectP: (callback: any) => ipcRenderer.on('selectP', callback),
  selectPacientes,
  selectPs: (callback: any) => ipcRenderer.on('selectPs', callback),
};

contextBridge.exposeInMainWorld('Bridge', indexBridge);
