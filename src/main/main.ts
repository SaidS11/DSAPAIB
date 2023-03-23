/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { Pool } from 'pg';
import { PythonShell } from 'python-shell';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { Json } from 'aws-sdk/clients/robomaker';
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const { MongoClient, ServerApiVersion } = require('mongodb');

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
    installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  })
  .catch(console.log);
const credenciales = {
  user: 'postgres',
  host: 'modulardb.coxrmuefwyts.us-east-1.rds.amazonaws.com',
  database: 'ModularDB',
  password: '219748227',
};

const uri =
  'mongodb+srv://ByPona:219748227@modulardbmongo.3hvrzpy.mongodb.net/test';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const pool = new Pool(credenciales);

async function conexionPrincipalMongo() {
  try {
    await client.connect();
    console.log('Conexión a MongoDB Atlas exitosa');
  } catch (error) {
    console.log('Error al conectar', error);
  } finally {
    await client.close();
  }
}

async function insertarElementoMongo(query: string) {
  try {
    const queryJSON = JSON.parse(query);
    await client.connect();
    const result = await client
      .db('Modular')
      .collection('Señales')
      .insertOne(queryJSON);
    console.log(
      `${result.insertedCount} documents inserted with _id: ${result.insertedId}`
    );
    return result;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

async function buscarElementoMongo(query: string) {
  try {
    const queryJSON = JSON.parse(query);
    await client.connect();
    const collection = client.db('Modular').collection('Señales');
    const result = await collection.find(queryJSON).toArray();
    return result;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

async function seleccionarTodoMongo() {
  try {
    await client.connect();
    const collection = client.db('Modular').collection('Señales');
    const result = await collection.find({}).toArray();
    return result;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

async function borrarElementoMongo(query: string) {
  try {
    // const query = { name: 'Ernesto Peña' };
    const result = await client
      .db('Modular')
      .collection('Señales')
      .deleteOne(query);
    console.log(`${result.deletedCount} documents deleted`);
    console.log(result);
    mainWindow?.webContents.send('borrarElementoM', result);
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

async function iniciarSesion(user: string, pass: string) {
  const query = await pool.query(
    ' SELECT usuario FROM doctor WHERE usuario = $1 AND password = crypt($2, password) ',
    [user, pass]
  );
  console.log(query.rows);
  return query.rows;
}

// ipcMain.on('loggearDoctor', async () => {
//   await conexionPrincipalMongo();
// });

ipcMain.on('loggearDoctor', async (event, user: string, pass: string) => {
  await conexionPrincipalMongo();
  const resp = await iniciarSesion(user, pass);
  console.log(resp);
  mainWindow?.webContents.send('loggearD', resp);
});

ipcMain.on('insertarElementoMongo', async (event, archivo: string) => {
  const resp = await insertarElementoMongo(archivo);
  console.log(resp);
  mainWindow?.webContents.send('insertarElementoM', resp);
});

ipcMain.on('buscarElementoMongo', async (event, archivo: string) => {
  const resp = await buscarElementoMongo(archivo);
  console.log(resp);
  mainWindow?.webContents.send('buscarElementoM', resp);
});

ipcMain.on('seleccionarTodoMongo', async () => {
  const resp = await seleccionarTodoMongo();
  console.log(resp);
  mainWindow?.webContents.send('seleccionarTodoM', resp);
});

ipcMain.on('borrarElementoMongo', async (event, archivo: string) => {
  const resp = await borrarElementoMongo(archivo);
  console.log(resp);
  mainWindow?.webContents.send('borrarElementoM', resp);
});

async function selectPacienteF(
  nombre: string,
  apellidoP: string,
  apellidoM: string,
  email: string
) {
  const query = await pool.query(
    ' select * from paciente where nombre = $1 and apellido_paterno = $2 and apellido_materno = $3 and email = $4 ',
    [nombre, apellidoP, apellidoM, email]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on(
  'selectPaciente',
  async (
    event,
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    email: string
  ) => {
    const resp = await selectPacienteF(nombre, apellidoP, apellidoM, email);
    console.log(resp);
    mainWindow?.webContents.send('selectP', resp);
  }
);

async function selectPacientes() {
  const query = await pool.query(' select * from paciente  ');
  console.log(query.rows);
  return query.rows;
}

ipcMain.on('selectPacientes', async (event) => {
  const resp = await selectPacientes();
  console.log(resp);
  mainWindow?.webContents.send('selectPs', resp);
});

async function insertPaciente(
  usario: string,
  email: string,
  telefono: string,
  fechaNacimiento: any,
  nombre: string,
  apellidoP: string,
  apellidoM: string
) {
  try {
    const query = await pool.query(
      ' insert into paciente (usuario, email, telefono, fecha_nacimiento, nombre, apellido_paterno, apellido_materno) values ($1, $2, $3, $4, $5, $6, $7)  ',
      [usario, email, telefono, fechaNacimiento, nombre, apellidoP, apellidoM]
    );
    console.log(query.rows);
    return query.rows;
  } catch (e: any) {
    console.log('errorr', e);
    return [0, e.detail];
  }
}

ipcMain.on(
  'insertPaciente',
  async (
    event,
    usario: string,
    email: string,
    telefono: string,
    fechaNacimiento: any,
    nombre: string,
    apellidoP: string,
    apellidoM: string
  ) => {
    const resp = await insertPaciente(
      usario,
      email,
      telefono,
      fechaNacimiento,
      nombre,
      apellidoP,
      apellidoM
    );
    console.log(resp);
    mainWindow?.webContents.send('insertP', resp);
  }
);

async function insertModelo(
  modelo: string,
  prueba: string,
  algoritmo_ia: string,
  parametros: any
) {
  try {
    const query = await pool.query(
      ' INSERT INTO implementacion(nombre, prueba, algoritmo_ia, parametros) values ($1,$2,$3,$4)  ',
      [modelo, prueba, algoritmo_ia, parametros]
    );
    console.log(query.rows);
    return query.rows;
  } catch (e: any) {
    console.log('errorr', e);
    return [0, e.detail];
  }
}

ipcMain.on(
  'insertModelo',
  async (
    event,
    modelo: string,
    prueba: string,
    algoritmo_ia: string,
    parametros: any
  ) => {
    const resp = await insertModelo(modelo, prueba, algoritmo_ia, parametros);
    console.log(resp);
    mainWindow?.webContents.send('insertMod', resp);
  }
);

async function selectImplementacionNombreIA(nombre: string) {
  const query = await pool.query(
    ' SELECT * FROM implementacion where algoritmo_ia = $1',
    [nombre]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on('selectImplementacionNombreIA', async (event, nombre) => {
  const resp = await selectImplementacionNombreIA(nombre);
  console.log(resp);
  mainWindow?.webContents.send('selectImplemenIA', resp);
});

async function selectImplementacionPorNombre(nombre: string) {
  const query = await pool.query(
    ' SELECT * FROM implementacion where nombre = $1',
    [nombre]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on('selectImplementacionPorNombre', async (event, nombre) => {
  const resp = await selectImplementacionPorNombre(nombre);
  console.log(resp);
  mainWindow?.webContents.send('selectImplementacionPorN', resp);
});

async function selectModelosNombre() {
  const query = await pool.query(
    ' select nombre, algoritmo_ia from implementacion '
  );
  console.log('Estas son las rows', query.rows);
  return query.rows;
}
ipcMain.handle('selectModelosNombre', selectModelosNombre);

async function selectProtocolos() {
  const query = await pool.query(' select nombre from protocolo_adquisicion  ');
  console.log(query.rows);
  return query.rows;
}

ipcMain.on('selectProtocolos', async (event) => {
  const resp = await selectProtocolos();
  console.log(resp);
  mainWindow?.webContents.send('selectPrs', resp);
});

async function selectConfiguracionNombre(nombre: string) {
  const query = await pool.query(
    ' select configuracion from protocolo_adquisicion where nombre = $1 ',
    [nombre]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on('selectConfiguracionNombre', async (event, nombre: string) => {
  const resp = await selectConfiguracionNombre(nombre);
  console.log(resp);
  mainWindow?.webContents.send('selectCN', resp);
});

async function selectMultimediaConfig(nombre: string) {
  const query = await pool.query(
    ' select * from multimedia where configuracion = $1 ',
    [nombre]
  );
  console.log(query.rows);
  return query.rows;
}
ipcMain.handle('selectMultimediaConfig', (event, nombre: string) =>
  selectMultimediaConfig(nombre)
);

// ipcMain.handle('selectMultimediaConfig', async (event, nombre: string) =>);
// ipcMain.handle('selectMultimediaConfig', async (event, nombre: string) => {
//   const resp = await selectMultimediaConfig(nombre);
//   console.log(resp);
//   mainWindow?.webContents.send('selectMC', resp);
// });

async function insertRegistro(
  datosCrudos: any,
  fecha: any,
  pacienteNombre: string,
  protocoloNombre: string
) {
  const query = await pool.query(
    ' insert into registro (datos_crudos, fecha, paciente, protocolo_adquisicion) values($1, $2, $3, $4)  ',
    [datosCrudos, fecha, pacienteNombre, protocoloNombre]
  );
  console.log(query.rows);
  return query.rows;
}
// prueba2();

ipcMain.on(
  'insertRegistro',
  async (
    event,
    datosCrudos: any,
    fecha: any,
    pacienteNombre: string,
    protocoloNombre: string
  ) => {
    const resp = await insertRegistro(
      datosCrudos,
      fecha,
      pacienteNombre,
      protocoloNombre
    );
    console.log(resp);
    mainWindow?.webContents.send('insertR', resp);
  }
);

async function selectConfiguracion() {
  const query = await pool.query(' select nombre from configuracion ');
  console.log('Estas son las rows', query.rows);
  return query.rows;
}
ipcMain.handle('selectConfiguracion', selectConfiguracion);

async function selectAlgoritmosIA() {
  const query = await pool.query(' SELECT * FROM algoritmos_ia ');
  console.log(query.rows);
  return query.rows;
}
ipcMain.handle('selectAlgoritmosIA', selectAlgoritmosIA);
/* ipcMain.on('selectConfiguracion', async (event) => {
  const resp = await selectConfiguracion();
  console.log('Esta es la resp', resp);
  mainWindow?.webContents.send('selectC', resp);
}); */

async function insertConfiguracion(
  configuracionNombre: string,
  configuracionGsr: any,
  configuracionSpo2: any,
  configuracionRitmoCardiaco: any,
  configuracionEmgs: any,
  configuracionTemperatura: any,
  configuracionSubido: any,
  configuracionDescripcion: string
) {
  const query = await pool.query(
    ' insert into configuracion values($1, $2, $3, $4, $5, $6, $7, $8)  ',
    [
      configuracionNombre,
      configuracionGsr,
      configuracionSpo2,
      configuracionRitmoCardiaco,
      configuracionEmgs,
      configuracionTemperatura,
      configuracionSubido,
      configuracionDescripcion,
    ]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on(
  'insertConfiguracion',
  async (
    event,
    configuracionNombre: string,
    configuracionGsr: any,
    configuracionSpo2: any,
    configuracionRitmoCardiaco: any,
    configuracionEmgs: any,
    configuracionTemperatura: any,
    configuracionSubido: any,
    configuracionDescripcion: string
  ) => {
    const resp = await insertConfiguracion(
      configuracionNombre,
      configuracionGsr,
      configuracionSpo2,
      configuracionRitmoCardiaco,
      configuracionEmgs,
      configuracionTemperatura,
      configuracionSubido,
      configuracionDescripcion
    );
    console.log(resp);
    mainWindow?.webContents.send('insertC', resp);
  }
);

async function insertMultimedia(
  multimediaNombre: string,
  link_video: any,
  link_imagen: any,
  subido: any,
  configuracion: string
) {
  const query = await pool.query(
    ' insert into multimedia values($1, $2, $3, $4, $5)  ',
    [multimediaNombre, link_video, link_imagen, subido, configuracion]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on(
  'insertMultimedia',
  async (
    event,
    multimediaNombre: string,
    link_video: any,
    link_imagen: any,
    subido: any,
    configuracion: string
  ) => {
    const resp = await insertMultimedia(
      multimediaNombre,
      link_video,
      link_imagen,
      subido,
      configuracion
    );
    console.log(resp);
    mainWindow?.webContents.send('insertM', resp);
  }
);

async function insertProtocolo(
  protocoloAdquisicionNombre: string,
  protocoloAdquisicionDoctor: string,
  protocoloAdquisicionConfiguracion: string,
  protocoloAdquisicionDescripcion: string
) {
  try {
    const query = await pool.query(
      ' insert into protocolo_adquisicion values($1, $2, $3, $4)  ',
      [
        protocoloAdquisicionNombre,
        protocoloAdquisicionDoctor,
        protocoloAdquisicionConfiguracion,
        protocoloAdquisicionDescripcion,
      ]
    );
    console.log(query.rows);
    return query.rows;
  } catch (e: any) {
    console.log('errorr', e);
    return [0, e.detail];
  }
}
// prueba2();

ipcMain.on(
  'insertProtocolo',
  async (
    event,
    protocoloAdquisicionNombre: string,
    protocoloAdquisicionDoctor: string,
    protocoloAdquisicionConfiguracion: string,
    protocoloAdquisicionDescripcion: string
  ) => {
    const resp = await insertProtocolo(
      protocoloAdquisicionNombre,
      protocoloAdquisicionDoctor,
      protocoloAdquisicionConfiguracion,
      protocoloAdquisicionDescripcion
    );
    console.log(resp);
    mainWindow?.webContents.send('insertPro', resp);
  }
);

async function selectRegistrosProtocolo(nombre: string) {
  const query = await pool.query(
    ' select paciente from registro where protocolo_adquisicion = $1 ',
    [nombre]
  );
  console.log('query', query.rows);
  return query.rows;
}

ipcMain.on('selectRegistrosProtocolo', async (event, nombre: string) => {
  const resp = await selectRegistrosProtocolo(nombre);
  console.log('resp', resp);
  mainWindow?.webContents.send('selectRP', resp);
});

async function selectProtocoloDetalle(nombre: string) {
  const query = await pool.query(
    ' select * from protocolo_adquisicion where nombre = $1 ',
    [nombre]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on('selectProtocoloDetalle', async (event, nombre: string) => {
  const resp = await selectProtocoloDetalle(nombre);
  console.log(resp);
  mainWindow?.webContents.send('selectPD', resp);
});

async function selectConfiguracionDetalle(nombre: string) {
  const query = await pool.query(
    ' select * from configuracion where nombre = $1 ',
    [nombre]
  );
  console.log('consulta', query.rows);
  return query.rows;
}
ipcMain.handle('selectConfiguracionDetalle', (event, nombre: string) =>
  selectConfiguracionDetalle(nombre)
);

async function updateImplementacion(
  precision: string,
  desviacion: string,
  entrenado: string,
  modelo: string
) {
  const query = await pool.query(
    ' UPDATE implementacion SET precision = $1, desviacion_estandar = $2, entrenado = $3 WHERE nombre = $4',
    [precision, desviacion, entrenado, modelo]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on(
  'updateImplementacion',
  async (
    event,
    precision: string,
    desviacion: string,
    entrenado: string,
    modelo: string
  ) => {
    const resp = await updateImplementacion(
      precision,
      desviacion,
      entrenado,
      modelo
    );
    console.log(resp);
    mainWindow?.webContents.send('updateIm', resp);
  }
);

const serialPort = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
});
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' })); // Normalizar la impresion
// eslint-disable-next-line promise/param-names
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function sensores() {
  // serialPort.isOpen;
  serialPort.open();
  let buffer = '';
  let sum = 0;
  let gsrAverage = 0;
  let hr = 0;
  console.log('ANTES DEE');
  parser.on('data', async (chunk: any) => {
    console.log('SIGOOO');
    for (let i = 0; i < 10; i++) {
      buffer = '';
      buffer += chunk;
      console.log(buffer);
      sum += parseInt(buffer);
    }
    gsrAverage = sum / 10;
    console.log('Gsr Average', gsrAverage);
    hr = ((1024 + 2 * gsrAverage) * 1000) / (512 - gsrAverage);
    console.log('GSR', hr);
    // const resp = await sleep(10000);
    // console.log("Resp", resp);
  });
  return hr;
}

ipcMain.on('sensores', async (event) => {
  // const resp = await sensores();
  // console.log(resp);
  if (serialPort.isOpen === false) {
    serialPort.open();
  }
  const buffer = '';
  const sum = 0;
  const gsrAverage = 0;
  const hr = 0;
  const len = 0;
  const arrValues: Array<number> = [];
  console.log('ANTES DEE');
  parser.on('data', (chunk: any) => {
    console.log('SIGOOO');
    // len+=1;
    // arrValues.push(parseInt(chunk));
    // if (len === 10) {
    //   let sum2 = 0;
    //   arrValues.map((x) => sum2 += x);
    //   gsrAverage = sum2 / 10;
    //   console.log('GSR AVErage', gsrAverage);
    //   hr = ((1024 + 2 * gsrAverage) * 1000) / (512 - gsrAverage);
    //   console.log('GSR', hr);
    //   len = 0;
    //   arrValues.length = 0;
    //   mainWindow?.webContents.send('senso', hr);
    // }
    // for (let i = 0; i < 10; i++) {
    //   buffer = '';
    //   buffer += chunk;
    //   console.log(buffer);
    //   sum += parseInt(buffer);
    // }
    // gsrAverage = sum / 10;
    // sum = 0;
    // console.log('Gsr Average', gsrAverage);
    // hr = ((1024 + 2 * gsrAverage) * 1000) / (512 - gsrAverage);
    // console.log('GSR', hr);
    // const resp = await sleep(10000);
    // console.log("Resp", resp);
    console.log('c', chunk);
    // mainWindow?.webContents.send('senso', chunk);
    try {
      event.reply('senso', chunk);
    } catch (err) {
      console.log(err);
    }
    // mainWindow?.webContents.send('senso', chunk);
  });
});

async function sensoresStop() {
  // parser.off('data', console.log);
  console.log('Closing');
  serialPort.close();
  // parser.write('\x03')
}

ipcMain.on('sensoresStop', async (event) => {
  const resp = await sensoresStop();
  console.log(resp);
  mainWindow?.webContents.send('sensoStop', resp);
});

/* const options = {}
const shellTest = new PythonShell('testing.py', options)

shellTest.on('message', function (message: any) {
  console.log(message);
  return message;
 }); */

/* const funPython = async () => {
  console.log("Llamada");
  let res;
  await PythonShell.run("D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/testing.py", options, function(err, results) {
      if(err){
        console.log("err", err)
        return "Error"
      }
      else {
        console.log(results![0]);
        res = results![0]
        console.log("Finished")
        return results;
      }
    }
  )
  console.log("Esta es la res", res);
  return res;
}; */
/* const funPython = PythonShell.run("D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/testing.py", options, function(err, results) {
      if(err){
        console.log("err", err)
        return "Error"
      }
      else {
        console.log(results![0]);
        // res = results![0]
        console.log("Finished")
        return results;
      }
    }
  ) */
ipcMain.handle(
  'analisisPython',
  async (
    event,
    tipo: string,
    tipoIA: string,
    params: string,
    nombre: string,
    iteraciones: string,
    reducedPercentage: string
  ) => {
    const options = {
      // scriptPath: "../pythonScripts/",
      args: [tipo, tipoIA, params, nombre, iteraciones, reducedPercentage],
    };
    console.log('Llamado 2');
    // const location = require("../pythonScripts/testing.py")
    // console.log("DIRRRRRRRRRRR", __dirname);
    const direc = __dirname;
    const regex = /\//i;
    const direcParsed = direc.replace(regex, '/');
    const direcFinal = direcParsed.slice(0, -4);
    // console.log("REadyyy", direcFinal);
    /* const resp = await funPython;
  console.log(resp);
  mainWindow?.webContents.send('funP', resp); */
    // PythonShell.run("D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/testing.py", options, function(err, results) {
    try {
      PythonShell.run(
        `${direcFinal}/pythonScripts/analisis.py`,
        options,
        function (err, results) {
          if (err) {
            console.log('err', err);
            // return "Error"
          } else {
            console.log(results);
            // res = results![0]
            console.log('Finisheddd');
            mainWindow?.webContents.send('analisisP', results![0]);
          }
        }
      );
    } catch (e: any) {
      console.log('Error', e);
    }
  }
);

ipcMain.handle('preAnalisisPython', async (event) => {
  const options = {
    args: ['vacio'],
  };
  console.log('Llamado 3');
  const direc = __dirname;
  const regex = /\//i;
  const direcParsed = direc.replace(regex, '/');
  const direcFinal = direcParsed.slice(0, -4);
  try {
    PythonShell.run(
      `${direcFinal}/pythonScripts/preAnalisis.py`,
      options,
      function (err, results) {
        if (err) {
          console.log('err', err);
        } else {
          console.log(results);
          mainWindow?.webContents.send('preAnalisisP', results![0]);
        }
      }
    );
  } catch (e: any) {
    console.log('Error', e);
  }
});
