export interface PacientesAnalisis {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  etiqueta: string;
  fecha_nacimiento: Date;
  email: string;
}

export interface PacientesAnalisisMongo {
  name: string;
  etiqueta: string;
  protocol?: string;
}

export interface FormularioEntrenamiento {
  algoritmo: string;
  iteraciones: string;
  porcentaje: string;
  protocolo: string;
}

export interface MultimediaObj {
  link_imagen: string;
  link_video: string;
}

export interface SelectedPatientObj {
  col1: string;
  col2: string;
}

export interface Algoritmo {
  nombre: string;
  descripcion: string;
  algoritmo_ia: string;
  parametros: object;
  presicion: number;
  desviacion_estandar: number;
  entrenado: boolean;
}

export interface AnalisisParamsInterface {
  protocolo: string;
  algoritmo?: string;
  iteraciones: string;
  porcentaje: string;
  sexo: string;
}

export interface ModeloIAInterface {
  id: number;
  nombre: string;
  algoritmo_ia: string;
  protocolo: string;
  entrenado: string;
  resultados: object;
}

export interface ConfigDetalle {
  descripcion: string;
  emgs: number;
  gsr: boolean;
  nombre: string;
  temperatura: boolean;
  frecuencia_cardiaca: boolean;
  subido: boolean;
  acelerometro: boolean;
}

export interface SelectedModeloIAInterface {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: object;
}

export interface ProtocoloNombre {
  nombre: string;
}

export interface ConfiguracionNombre {
  configuracion: string;
}

export interface MongoSignalLayout {
  x: number;
  y: number;
}
export interface MongoSignals {
  signal1?: Array<MongoSignalLayout>;
  signal2?: Array<MongoSignalLayout>;
  signal3?: Array<MongoSignalLayout>;
  signal4?: Array<MongoSignalLayout>;
  signalGs4?: Array<MongoSignalLayout>;
}
export interface DataSignalsMongo {
  etiqueta: string;
  name: string;
  protocol: string;
  signals: any;
}

export interface MongoInsertObjectInterface {
  etiqueta?: string;
  name?: string;
  protocol?: string;
  signals?: any;
}

export interface RealTimeSignalInterface {
  emg1?: Array<any>;
  emg2?: Array<any>;
  emg3?: Array<any>;
  emg4?: Array<any>;
  frecuencia?: Array<any>;
  gsr?: Array<any>;
  acelerometro?: Array<any>;
}

export interface ConfigurationInterface {
  nombreConfig: string;
  descripcion: string;
  canales: string;
  temperatura: string;
  frecuencia: string;
  gsr: string;
  acelerometro: string;
}

export const numOfPlotsToRender = (sensoresSelected: number) => {
 
  // impar aumenta las columns
  let dynamicRows = 0;
  let dynamicColumns = 0;
  if (sensoresSelected === 1) {
    dynamicRows = 1;
    dynamicColumns = 1;
  }
  if (sensoresSelected === 2) {
    dynamicRows = 1;
    dynamicColumns = 2;
  }
  if (sensoresSelected > 2 && sensoresSelected < 5) {
    dynamicRows = 2;
    dynamicColumns = 2;
  }
  if (sensoresSelected > 4 && sensoresSelected < 7) {
    dynamicRows = 2;
    dynamicColumns = 3;
  }
  if (sensoresSelected >= 7) {
    dynamicRows = 2;
    dynamicColumns = 4;
  }
  const objGrid = {
    rows: dynamicRows,
    columns: dynamicColumns,
    pattern: 'independent',
  };
  return objGrid;
};

export const apiEndpoint = 'http://localhost:8000';
export const datosDePrueba =
  '[[{"colMediaABSEMG1":"4.50","colMedianaEMG1":"4.5","colRMSEMG1":"4.64","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.64","colMediaABSGsr":"4.50","colMedianaGsr":"4.5","colRMSGsr":"4.64","colMediaABSAcelerometro":"4.50","colMedianaAcelerometro":"4.5","colRMSAcelerometro":"4.64","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"},{"colMediaABSEMG1":13,"colMedianaEMG1":"13","colRMSEMG1":"13.03","colMediaABSEMG2":"15","colMedianaEMG2":"15","colRMSEMG2":"15.02","colMediaABSGsr":13,"colMedianaGsr":"13","colRMSGsr":"13.03","colMediaABSAcelerometro":13,"colMedianaAcelerometro":"13","colRMSAcelerometro":"13.03","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"}],[{"colMediaABSEMG1":5,"colMedianaEMG1":"5","colRMSEMG1":"5.20","colMediaABSEMG2":"3.5","colMedianaEMG2":"3.5","colRMSEMG2":"3.67","colMediaABSGsr":5,"colMedianaGsr":"5","colRMSGsr":"5.20","colMediaABSAcelerometro":5,"colMedianaAcelerometro":"5","colRMSAcelerometro":"5.20","etiqueta":"Diabetico","nombre":"Carlos Silva Chacon"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.02","colMediaABSEMG2":"16.5","colMedianaEMG2":"16.5","colRMSEMG2":"16.54","colMediaABSGsr":15,"colMedianaGsr":"15","colRMSGsr":"15.02","colMediaABSAcelerometro":15,"colMedianaAcelerometro":"15","colRMSAcelerometro":"15.02","etiqueta":"Diabetico","nombre":"Carlos Silva Chacon"}],[{"colMediaABSEMG1":3,"colMedianaEMG1":"3","colRMSEMG1":"3.32","colMediaABSEMG2":"2","colMedianaEMG2":"2","colRMSEMG2":"2.16","colMediaABSGsr":3,"colMedianaGsr":"3","colRMSGsr":"3.32","colMediaABSAcelerometro":3,"colMedianaAcelerometro":"3","colRMSAcelerometro":"3.32","etiqueta":"Sano","nombre":"Probando pr pr"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.08","colMediaABSEMG2":"11","colMedianaEMG2":"11","colRMSEMG2":"11.09","colMediaABSGsr":15,"colMedianaGsr":"15","colRMSGsr":"15.08","colMediaABSAcelerometro":15,"colMedianaAcelerometro"15.08","colMediaABSAcelerometro":15,"colMedianaAcelerometro":"15","colRMSAcelerometro":"15.08","etiqueta":"Sano","nombre":"Probando pr pr"}],[{"colMediaABSEMG1":"4.50","colMedianaEMG1":"4.5","colRMSEMG1":"4.64","colMolRMSEMG2":"4.64","colMediaABSGsr":"4.50","cediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.64","colMediaABSGsr":"4.50","colMedianaGsr":"4.5","colRMSGsr":"4.64","colMediaABSAcelerometro":"4.50","colMedianaAcelerometro":"4.5","colRMSAcelerometro":"4.64naEMG1":"13","colRMSEMG1":"13.03","colMediaA","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"},{"colMediaABSEMG1":13,"colMedianaEMG1":"13","colRMSEMG1":"13.03","colMediaABSEMG2":"15","colMedianaEMG2":"15","colRMSEMG2":"15.02","colMDiabetico","nombre":"Martha Garcia Lopez"}],ediaABSGsr":13,"colMedianaGsr":"13","colRMSGsr":"13.03","colMediaABSAcelerometro":13,"colMedianaAcelerometro":"13","colRMSAcelerometro":"13.03","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"}],[{"colMediaABSEMGediaABSAcelerometro":5,"colMedianaAcelerometro":"5","colRMST1":5,"colMedianaEMG1":"5","colRMSEMG1":"5.20","colMediaABSEMG2":"3.5","colMedianaEMG2":"3.5","colRMSEMG2":"3.67","colMediaABSGsr":5,"colMedianaGsr":"5","colRMSGsr":"5.20","colMediaABSAcelerometro":5,"c:"16.54","colMediaABSGsr":15,"colMedianaGsr"olMedianaAcelerometro":"5","colRMSAcelerometro":"5.20","etiqueta":"Diabetico","nombre":"Carlos Silva Chacon"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.02","colMediaABSEMG2":"16.5","colMediaRMSEMG1":"3.32","colMediaABSEMG2":"2","colMenaEMG2":"16.5","colRMSEMG2":"16.54","colMediaABSGsr":15,"colMedianaGsr":"15","colRMSGsr":"15.02","colMediaABSAcelerometro":15,"colMedianaAcelerometro":"15","colRMSAcelerometro":"15.02","etiqueta":"Diabetico","nombre": pr"},{"colMediaABSEMG1":15,"colMedianaEMG1""Carlos Silva Chacon"}],[{"colMediaABSEMG1":3,"colMedianaEMG1":"3","colRMSEMG1":"3.32","colMediaABSEMG2":"2","colMedianaEMG2":"2","colRMSEMG2":"2.16","colMediaABSGsr":3,"colMedianaGsr":"3","col15","colRMSAcelerometro":"15.08","etiqueta":"Sano","RMSGsr":"3.32","colMediaABSAcelerometro":3,"colMedianaAcelerometro":"3","colRMSAcelerometro":"3.32","etiqueta":"Sano","nombre":"Probando pr pr"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.08","colMediaABSEMG2":"11","colMedianaEMG2":"11","colRMSEMG2":"11.09","colMediaABSGsr":15,"colMedianaGsr":"15","colRMSGsr":"15.08","colMediaABSAcelerometro":15,"colMedianaAcelerometro":"15","colRMSAcelerometro":"15.08","etiqueta":"Sano","nombre":"Probando pr pr"}]]';
export const datosDePrueba2 =
  '[[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSAcelerometro":"3.33","colMedianaAcelerometro":"3","colRMSAcelerometro":"3.56","etiqueta":"diabetico","nombre": "Karla"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSAcelerometro":"10.75","colMedianaAcelerometro":"10.5","colRMSAcelerometro":"10.85","etiqueta":"diabetico","nombre": "Karla"}],[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSAcelerometro":"3.33","colMedianaAcelerometro":"3","colRMSAcelerometro":"3.56","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSAcelerometro":"10.75","colMedianaAcelerometro":"10.5","colRMSAcelerometro":"10.85","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"}],[{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGsr":"2.50","colMedianaGsr":"2.5","colRMSGsr":"2.55","colMediaABSAcelerometro":"2.50","colMedianaAcelerometro":"2.5","colRMSAcelerometro":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 1"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGsr":8,"colMedianaGsr":"8","colRMSGsr":"8.12","colMediaABSAcelerometro":8,"colMedianaAcelerometro":"8","colRMSAcelerometro":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 1"}]]';
export const datosDePrueba3 =
  '[[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSAcelerometro":"3.33","colMedianaAcelerometro":"3","colRMSAcelerometro":"3.56","etiqueta":"diabetico","nombre": "Karla"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSAcelerometro":"10.75","colMedianaAcelerometro":"10.5","colRMSAcelerometro":"10.85","etiqueta":"diabetico","nombre": "Karla"}],[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSAcelerometro":"3.33","colMedianaAcelerometro":"3","colRMSAcelerometro":"3.56","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSAcelerometro":"10.75","colMedianaAcelerometro":"10.5","colRMSAcelerometro":"10.85","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"}],[{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGsr":"2.50","colMedianaGsr":"2.5","colRMSGsr":"2.55","colMediaABSAcelerometro":"2.50","colMedianaAcelerometro":"2.5","colRMSAcelerometro":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 1"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGsr":8,"colMedianaGsr":"8","colRMSGsr":"8.12","colMediaABSAcelerometro":8,"colMedianaAcelerometro":"8","colRMSAcelerometro":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 1"}], [{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGsr":"2.50","colMedianaGsr":"2.5","colRMSGsr":"2.55","colMediaABSAcelerometro":"2.50","colMedianaAcelerometro":"2.5","colRMSAcelerometro":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 2"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGsr":8,"colMedianaGsr":"8","colRMSGsr":"8.12","colMediaABSAcelerometro":8,"colMedianaAcelerometro":"8","colRMSAcelerometro":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 2"}]]';
