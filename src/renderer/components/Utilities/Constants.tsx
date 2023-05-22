import { float } from 'aws-sdk/clients/cloudfront';

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
  desviacion_estandar: float;
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
  giroscopio: boolean;
  nombre: string;
  ritmo_cardiaco: boolean;
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

export const datosDePrueba =
  '[[{"colMediaABSEMG1":"4.50","colMedianaEMG1":"4.5","colRMSEMG1":"4.64","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.64","colMediaABSGiroscopio":"4.50","colMedianaGiroscopio":"4.5","colRMSGiroscopio":"4.64","colMediaABSAcelerometro":"4.50","colMedianaAcelerometro":"4.5","colRMSAcelerometro":"4.64","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"},{"colMediaABSEMG1":13,"colMedianaEMG1":"13","colRMSEMG1":"13.03","colMediaABSEMG2":"15","colMedianaEMG2":"15","colRMSEMG2":"15.02","colMediaABSGiroscopio":13,"colMedianaGiroscopio":"13","colRMSGiroscopio":"13.03","colMediaABSAcelerometro":13,"colMedianaAcelerometro":"13","colRMSAcelerometro":"13.03","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"}],[{"colMediaABSEMG1":5,"colMedianaEMG1":"5","colRMSEMG1":"5.20","colMediaABSEMG2":"3.5","colMedianaEMG2":"3.5","colRMSEMG2":"3.67","colMediaABSGiroscopio":5,"colMedianaGiroscopio":"5","colRMSGiroscopio":"5.20","colMediaABSAcelerometro":5,"colMedianaAcelerometro":"5","colRMSAcelerometro":"5.20","etiqueta":"Diabetico","nombre":"Carlos Silva Chacon"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.02","colMediaABSEMG2":"16.5","colMedianaEMG2":"16.5","colRMSEMG2":"16.54","colMediaABSGiroscopio":15,"colMedianaGiroscopio":"15","colRMSGiroscopio":"15.02","colMediaABSAcelerometro":15,"colMedianaAcelerometro":"15","colRMSAcelerometro":"15.02","etiqueta":"Diabetico","nombre":"Carlos Silva Chacon"}],[{"colMediaABSEMG1":3,"colMedianaEMG1":"3","colRMSEMG1":"3.32","colMediaABSEMG2":"2","colMedianaEMG2":"2","colRMSEMG2":"2.16","colMediaABSGiroscopio":3,"colMedianaGiroscopio":"3","colRMSGiroscopio":"3.32","colMediaABSAcelerometro":3,"colMedianaAcelerometro":"3","colRMSAcelerometro":"3.32","etiqueta":"Sano","nombre":"Probando pr pr"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.08","colMediaABSEMG2":"11","colMedianaEMG2":"11","colRMSEMG2":"11.09","colMediaABSGiroscopio":15,"colMedianaGiroscopio":"15","colRMSGiroscopio":"15.08","colMediaABSAcelerometro":15,"colMedianaAcelerometro"15.08","colMediaABSAcelerometro":15,"colMedianaAcelerometro":"15","colRMSAcelerometro":"15.08","etiqueta":"Sano","nombre":"Probando pr pr"}],[{"colMediaABSEMG1":"4.50","colMedianaEMG1":"4.5","colRMSEMG1":"4.64","colMolRMSEMG2":"4.64","colMediaABSGiroscopio":"4.50","cediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.64","colMediaABSGiroscopio":"4.50","colMedianaGiroscopio":"4.5","colRMSGiroscopio":"4.64","colMediaABSAcelerometro":"4.50","colMedianaAcelerometro":"4.5","colRMSAcelerometro":"4.64naEMG1":"13","colRMSEMG1":"13.03","colMediaA","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"},{"colMediaABSEMG1":13,"colMedianaEMG1":"13","colRMSEMG1":"13.03","colMediaABSEMG2":"15","colMedianaEMG2":"15","colRMSEMG2":"15.02","colMDiabetico","nombre":"Martha Garcia Lopez"}],ediaABSGiroscopio":13,"colMedianaGiroscopio":"13","colRMSGiroscopio":"13.03","colMediaABSAcelerometro":13,"colMedianaAcelerometro":"13","colRMSAcelerometro":"13.03","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"}],[{"colMediaABSEMGediaABSAcelerometro":5,"colMedianaAcelerometro":"5","colRMST1":5,"colMedianaEMG1":"5","colRMSEMG1":"5.20","colMediaABSEMG2":"3.5","colMedianaEMG2":"3.5","colRMSEMG2":"3.67","colMediaABSGiroscopio":5,"colMedianaGiroscopio":"5","colRMSGiroscopio":"5.20","colMediaABSAcelerometro":5,"c:"16.54","colMediaABSGiroscopio":15,"colMedianaGiroscopio"olMedianaAcelerometro":"5","colRMSAcelerometro":"5.20","etiqueta":"Diabetico","nombre":"Carlos Silva Chacon"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.02","colMediaABSEMG2":"16.5","colMediaRMSEMG1":"3.32","colMediaABSEMG2":"2","colMenaEMG2":"16.5","colRMSEMG2":"16.54","colMediaABSGiroscopio":15,"colMedianaGiroscopio":"15","colRMSGiroscopio":"15.02","colMediaABSAcelerometro":15,"colMedianaAcelerometro":"15","colRMSAcelerometro":"15.02","etiqueta":"Diabetico","nombre": pr"},{"colMediaABSEMG1":15,"colMedianaEMG1""Carlos Silva Chacon"}],[{"colMediaABSEMG1":3,"colMedianaEMG1":"3","colRMSEMG1":"3.32","colMediaABSEMG2":"2","colMedianaEMG2":"2","colRMSEMG2":"2.16","colMediaABSGiroscopio":3,"colMedianaGiroscopio":"3","col15","colRMSAcelerometro":"15.08","etiqueta":"Sano","RMSGiroscopio":"3.32","colMediaABSAcelerometro":3,"colMedianaAcelerometro":"3","colRMSAcelerometro":"3.32","etiqueta":"Sano","nombre":"Probando pr pr"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.08","colMediaABSEMG2":"11","colMedianaEMG2":"11","colRMSEMG2":"11.09","colMediaABSGiroscopio":15,"colMedianaGiroscopio":"15","colRMSGiroscopio":"15.08","colMediaABSAcelerometro":15,"colMedianaAcelerometro":"15","colRMSAcelerometro":"15.08","etiqueta":"Sano","nombre":"Probando pr pr"}]]';
export const datosDePrueba2 =
  '[[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGiroscopio":"3.33","colMedianaGiroscopio":"3","colRMSGiroscopio":"3.56","colMediaABSAcelerometro":"3.33","colMedianaAcelerometro":"3","colRMSAcelerometro":"3.56","etiqueta":"diabetico","nombre": "Karla"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGiroscopio":"10.75","colMedianaGiroscopio":"10.5","colRMSGiroscopio":"10.85","colMediaABSAcelerometro":"10.75","colMedianaAcelerometro":"10.5","colRMSAcelerometro":"10.85","etiqueta":"diabetico","nombre": "Karla"}],[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGiroscopio":"3.33","colMedianaGiroscopio":"3","colRMSGiroscopio":"3.56","colMediaABSAcelerometro":"3.33","colMedianaAcelerometro":"3","colRMSAcelerometro":"3.56","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGiroscopio":"10.75","colMedianaGiroscopio":"10.5","colRMSGiroscopio":"10.85","colMediaABSAcelerometro":"10.75","colMedianaAcelerometro":"10.5","colRMSAcelerometro":"10.85","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"}],[{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGiroscopio":"2.50","colMedianaGiroscopio":"2.5","colRMSGiroscopio":"2.55","colMediaABSAcelerometro":"2.50","colMedianaAcelerometro":"2.5","colRMSAcelerometro":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 1"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGiroscopio":8,"colMedianaGiroscopio":"8","colRMSGiroscopio":"8.12","colMediaABSAcelerometro":8,"colMedianaAcelerometro":"8","colRMSAcelerometro":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 1"}]]';
export const datosDePrueba3 =
  '[[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGiroscopio":"3.33","colMedianaGiroscopio":"3","colRMSGiroscopio":"3.56","colMediaABSAcelerometro":"3.33","colMedianaAcelerometro":"3","colRMSAcelerometro":"3.56","etiqueta":"diabetico","nombre": "Karla"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGiroscopio":"10.75","colMedianaGiroscopio":"10.5","colRMSGiroscopio":"10.85","colMediaABSAcelerometro":"10.75","colMedianaAcelerometro":"10.5","colRMSAcelerometro":"10.85","etiqueta":"diabetico","nombre": "Karla"}],[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGiroscopio":"3.33","colMedianaGiroscopio":"3","colRMSGiroscopio":"3.56","colMediaABSAcelerometro":"3.33","colMedianaAcelerometro":"3","colRMSAcelerometro":"3.56","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGiroscopio":"10.75","colMedianaGiroscopio":"10.5","colRMSGiroscopio":"10.85","colMediaABSAcelerometro":"10.75","colMedianaAcelerometro":"10.5","colRMSAcelerometro":"10.85","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"}],[{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGiroscopio":"2.50","colMedianaGiroscopio":"2.5","colRMSGiroscopio":"2.55","colMediaABSAcelerometro":"2.50","colMedianaAcelerometro":"2.5","colRMSAcelerometro":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 1"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGiroscopio":8,"colMedianaGiroscopio":"8","colRMSGiroscopio":"8.12","colMediaABSAcelerometro":8,"colMedianaAcelerometro":"8","colRMSAcelerometro":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 1"}], [{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGiroscopio":"2.50","colMedianaGiroscopio":"2.5","colRMSGiroscopio":"2.55","colMediaABSAcelerometro":"2.50","colMedianaAcelerometro":"2.5","colRMSAcelerometro":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 2"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGiroscopio":8,"colMedianaGiroscopio":"8","colRMSGiroscopio":"8.12","colMediaABSAcelerometro":8,"colMedianaAcelerometro":"8","colRMSAcelerometro":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 2"}]]';
