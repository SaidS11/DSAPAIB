import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    selectConfiguracion() {
      ipcRenderer.send('selectConfiguracion');
    },
    selectC: (callback: any) => ipcRenderer.on('selectC', callback),
    selectMultimediaConfig(nombre: string) {
      ipcRenderer.send('selectMultimediaConfig', nombre);
    },
    selectMC: (callback: any) => ipcRenderer.on('selectMC', callback),
    selectConfiguracionNombre(nombre: string) {
      ipcRenderer.send('selectConfiguracionNombre', nombre);
    },
    selectCN: (callback: any) => ipcRenderer.on('selectCN', callback),
    selectConfiguracionDetalle(nombre: string) {
      ipcRenderer.send('selectConfiguracionDetalle', nombre);
    },
    selectCD: (callback: any) => ipcRenderer.on('selectCD', callback),
    funPython(nombre: string) {
      ipcRenderer.send('funPython', nombre);
    },
    funP: (callback: any) => ipcRenderer.on('funP', callback),
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
    removeListener(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.removeListener(channel, (_event, ...args) => func(...args));
    },
    removeAllListeners(channel: string) {
      ipcRenderer.removeAllListeners(channel);
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
function insertPaciente(
  usario: string,
  email: string,
  telefono: string,
  fechaNacimiento: any,
  nombre: string,
  apellidoP: string,
  apellidoM: string
) {
  ipcRenderer.send(
    'insertPaciente',
    usario,
    email,
    telefono,
    fechaNacimiento,
    nombre,
    apellidoP,
    apellidoM
  );
}

function selectProtocolos() {
  ipcRenderer.send('selectProtocolos');
}

function selectConfiguracionNombre(nombre: string) {
  ipcRenderer.send('selectConfiguracionNombre', nombre);
}

function selectMultimediaConfig(nombre: string) {
  ipcRenderer.send('selectMultimediaConfig', nombre);
}

function insertRegistro(
  datosCrudos: any,
  fecha: any,
  pacienteNombre: string,
  protocoloNombre: string
) {
  ipcRenderer.send(
    'insertRegistro',
    datosCrudos,
    fecha,
    pacienteNombre,
    protocoloNombre
  );
}

function selectConfiguracion() {
  ipcRenderer.send('selectConfiguracion');
}

function insertConfiguracion(
  configuracionNombre: string,
  configuracionGsr: any,
  configuracionSpo2: any,
  configuracionRitmoCardiaco: any,
  configuracionEmgs: any,
  configuracionTemperatura: any,
  configuracionSubido: any,
  configuracionDescripcion: string
) {
  ipcRenderer.send(
    'insertConfiguracion',
    configuracionNombre,
    configuracionGsr,
    configuracionSpo2,
    configuracionRitmoCardiaco,
    configuracionEmgs,
    configuracionTemperatura,
    configuracionSubido,
    configuracionDescripcion
  );
}

function insertMultimedia(
  multimediaNombre: string,
  link_video: any,
  link_imagen: any,
  subido: any,
  configuracion: string
) {
  ipcRenderer.send(
    'insertMultimedia',
    multimediaNombre,
    link_video,
    link_imagen,
    subido,
    configuracion
  );
}

function insertProtocolo(
  protocoloAdquisicionNombre: string,
  protocoloAdquisicionDoctor: string,
  protocoloAdquisicionConfiguracion: string,
  protocoloAdquisicionDescripcion: string
) {
  ipcRenderer.send(
    'insertProtocolo',
    protocoloAdquisicionNombre,
    protocoloAdquisicionDoctor,
    protocoloAdquisicionConfiguracion,
    protocoloAdquisicionDescripcion
  );
}

function selectRegistrosProtocolo(nombre: string) {
  ipcRenderer.send('selectRegistrosProtocolo', nombre);
}

function selectProtocoloDetalle(nombre: string) {
  ipcRenderer.send('selectProtocoloDetalle', nombre);
}

function selectConfiguracionDetalle(nombre: string) {
  ipcRenderer.send('selectConfiguracionDetalle', nombre);
}

function sensores() {
  ipcRenderer.send('senso');
}

const indexBridge = {
  loggearDoctor,
  loggearD: (callback: any) => ipcRenderer.on('loggearD', callback),
  sensores,
  senso: (callback: any) => ipcRenderer.on('senso', callback),
  selectPaciente,
  selectP: (callback: any) => ipcRenderer.on('selectP', callback),
  selectPacientes,
  selectPs: (callback: any) => ipcRenderer.on('selectPs', callback),
  insertPaciente,
  insertP: (callback: any) => ipcRenderer.on('insertP', callback),
  selectProtocolos,
  selectPrs: (callback: any) => ipcRenderer.on('selectPrs', callback),
  selectConfiguracionNombre,
  selectCN: (callback: any) => ipcRenderer.on('selectCN', callback),
  selectMultimediaConfig,
  selectMC: (callback: any) => ipcRenderer.on('selectMC', callback),
  insertRegistro,
  insertR: (callback: any) => ipcRenderer.on('insertR', callback),
  selectConfiguracion,
  selectC: (callback: any) => ipcRenderer.on('selectC', callback),
  insertConfiguracion,
  insertC: (callback: any) => ipcRenderer.on('insertC', callback),
  insertMultimedia,
  insertM: (callback: any) => ipcRenderer.on('insertM', callback),
  insertProtocolo,
  insertPro: (callback: any) => ipcRenderer.on('insertPro', callback),
  selectRegistrosProtocolo,
  selectRP: (callback: any) => ipcRenderer.on('selectRP', callback),
  selectProtocoloDetalle,
  selectPD: (callback: any) => ipcRenderer.on('selectPD', callback),
  selectConfiguracionDetalle,
  selectCD: (callback: any) => ipcRenderer.on('selectCD', callback),
};

contextBridge.exposeInMainWorld('Bridge', indexBridge);
