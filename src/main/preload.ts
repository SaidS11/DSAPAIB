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
    selectC: () => ipcRenderer.invoke('selectConfiguracion'),
    selectProtocolos() {
      ipcRenderer.send('selectProtocolos');
    },
    selectPrs: () => ipcRenderer.invoke('selectProtocolos'),
    selectModelosNombre() {
      ipcRenderer.send('selectModelosNombre');
    },
    selectModNom: () => ipcRenderer.invoke('selectModelosNombre'),
    selectAlgoritmosIA() {
      ipcRenderer.send('selectAlgoritmosIA');
    },
    selectAIA: () => ipcRenderer.invoke('selectAlgoritmosIA'),
    selectMultimediaConfig(nombre: string) {
      ipcRenderer.send('selectMultimediaConfig', nombre);
    },
    selectMC: (callback: any) =>
      ipcRenderer.invoke('selectMultimediaConfig', callback),
    selectConfiguracionNombre(nombre: string) {
      ipcRenderer.send('selectConfiguracionNombre', nombre);
    },
    selectCN: (callback: any) => ipcRenderer.on('selectCN', callback),
    selectImplementacionNombreIA(nombre: string) {
      ipcRenderer.send('selectImplementacionNombreIA', nombre);
    },
    selectImplemenIA: (callback: any) =>
      ipcRenderer.on('selectImplemenIA', callback),
    insertarElementoMongo(json: string) {
      ipcRenderer.send('insertarElementoMongo', json);
    },
    insertarElementoM: (callback: any) =>
      ipcRenderer.on('insertarElementoM', callback),
    buscarElementoMongo(json: string) {
      ipcRenderer.send('buscarElementoMongo', json);
    },
    buscarElementoM: (callback: any) =>
      ipcRenderer.invoke('buscarElementoMongo', callback),
    seleccionarTodoMongo() {
      ipcRenderer.send('seleccionarTodoMongo');
    },
    seleccionarTodoM: (callback: any) =>
      ipcRenderer.on('seleccionarTodoM', callback),
    borrarElementoMongo(json: string) {
      ipcRenderer.send('borrarElementoMongo', json);
    },
    borrarElementoM: (callback: any) =>
      ipcRenderer.on('borrarElementoM', callback),
    updateImplementacion(
      precision: string,
      desviacion: string,
      entrenado: string,
      modelo: string
    ) {
      ipcRenderer.send(
        'updateImplementacion',
        precision,
        desviacion,
        entrenado,
        modelo
      );
    },
    selectImplementacionPorN: (callback: any) =>
      ipcRenderer.on('selectImplementacionPorN', callback),
    selectConfiguracionDetalle(nombre: string) {
      ipcRenderer.send('selectConfiguracionDetalle', nombre);
    },
    selectCD: (callback: any) =>
      ipcRenderer.invoke('selectConfiguracionDetalle', callback),
    selectImplementacionPorNombre(nombre: string) {
      ipcRenderer.send('selectImplementacionPorNombre', nombre);
    },
    updateIm: (callback: any) => ipcRenderer.on('updateIm', callback),
    analisisPython(
      type: string,
      typeIA: string,
      params: string,
      nombre: string,
      iteraciones: string,
      reducedPercentage: string
    ) {
      ipcRenderer.invoke(
        'analisisPython',
        type,
        typeIA,
        params,
        nombre,
        iteraciones,
        reducedPercentage
      );
    },
    analisisP: (callback: any) => ipcRenderer.on('analisisP', callback),
    preAnalisisPython() {
      ipcRenderer.invoke('preAnalisisPython');
    },
    preAnalisisP: (callback: any) => ipcRenderer.on('preAnalisisP', callback),
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

function insertModelo(
  modelo: string,
  prueba: string,
  algoritmo_ia: string,
  parametros: any
) {
  ipcRenderer.send('insertModelo', modelo, prueba, algoritmo_ia, parametros);
}

// function selectProtocolos() {
//   ipcRenderer.send('selectProtocolos');
// }

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
  ipcRenderer.send('sensores');
}

function sensoresStop() {
  ipcRenderer.send('sensoresStop');
}
const indexBridge = {
  loggearDoctor,
  loggearD: (callback: any) => ipcRenderer.on('loggearD', callback),
  sensores(nombre: string) {
    ipcRenderer.send('sensores', nombre);
  },
  senso: (callback: any) => ipcRenderer.on('senso', callback),
  // sensores,
  // senso: (callback: any) => ipcRenderer.on('senso', callback),
  sensoresStop,
  sensoStop: (callback: any) => ipcRenderer.on('sensoStop', callback),
  selectPaciente,
  selectP: (callback: any) => ipcRenderer.on('selectP', callback),
  selectPacientes,
  selectPs: (callback: any) => ipcRenderer.on('selectPs', callback),
  insertPaciente,
  insertP: (callback: any) => ipcRenderer.on('insertP', callback),
  insertModelo,
  insertMod: (callback: any) => ipcRenderer.on('insertMod', callback),
  // selectProtocolos,
  // selectPrs: (callback: any) => ipcRenderer.on('selectPrs', callback),
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
  // selectConfiguracionDetalle,
  // selectCD: (callback: any) => ipcRenderer.on('selectCD', callback),
};

contextBridge.exposeInMainWorld('Bridge', indexBridge);
