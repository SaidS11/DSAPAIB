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

export interface SelectedModeloIAInterface {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: object;
}

export const datosDePrueba =
  '[[{"colMediaABSEMG1":"4.50","colMedianaEMG1":"4.5","colRMSEMG1":"4.64","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.64","colMediaABSGsr":"4.50","colMedianaGsr":"4.5","colRMSGsr":"4.64","colMediaABSTemp":"4.50","colMedianaTemp":"4.5","colRMSTemp":"4.64","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"},{"colMediaABSEMG1":13,"colMedianaEMG1":"13","colRMSEMG1":"13.03","colMediaABSEMG2":"15","colMedianaEMG2":"15","colRMSEMG2":"15.02","colMediaABSGsr":13,"colMedianaGsr":"13","colRMSGsr":"13.03","colMediaABSTemp":13,"colMedianaTemp":"13","colRMSTemp":"13.03","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"}],[{"colMediaABSEMG1":5,"colMedianaEMG1":"5","colRMSEMG1":"5.20","colMediaABSEMG2":"3.5","colMedianaEMG2":"3.5","colRMSEMG2":"3.67","colMediaABSGsr":5,"colMedianaGsr":"5","colRMSGsr":"5.20","colMediaABSTemp":5,"colMedianaTemp":"5","colRMSTemp":"5.20","etiqueta":"Diabetico","nombre":"Carlos Silva Chacon"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.02","colMediaABSEMG2":"16.5","colMedianaEMG2":"16.5","colRMSEMG2":"16.54","colMediaABSGsr":15,"colMedianaGsr":"15","colRMSGsr":"15.02","colMediaABSTemp":15,"colMedianaTemp":"15","colRMSTemp":"15.02","etiqueta":"Diabetico","nombre":"Carlos Silva Chacon"}],[{"colMediaABSEMG1":3,"colMedianaEMG1":"3","colRMSEMG1":"3.32","colMediaABSEMG2":"2","colMedianaEMG2":"2","colRMSEMG2":"2.16","colMediaABSGsr":3,"colMedianaGsr":"3","colRMSGsr":"3.32","colMediaABSTemp":3,"colMedianaTemp":"3","colRMSTemp":"3.32","etiqueta":"Sano","nombre":"Probando pr pr"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.08","colMediaABSEMG2":"11","colMedianaEMG2":"11","colRMSEMG2":"11.09","colMediaABSGsr":15,"colMedianaGsr":"15","colRMSGsr":"15.08","colMediaABSTemp":15,"colMedianaTemp"15.08","colMediaABSTemp":15,"colMedianaTemp":"15","colRMSTemp":"15.08","etiqueta":"Sano","nombre":"Probando pr pr"}],[{"colMediaABSEMG1":"4.50","colMedianaEMG1":"4.5","colRMSEMG1":"4.64","colMolRMSEMG2":"4.64","colMediaABSGsr":"4.50","cediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.64","colMediaABSGsr":"4.50","colMedianaGsr":"4.5","colRMSGsr":"4.64","colMediaABSTemp":"4.50","colMedianaTemp":"4.5","colRMSTemp":"4.64naEMG1":"13","colRMSEMG1":"13.03","colMediaA","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"},{"colMediaABSEMG1":13,"colMedianaEMG1":"13","colRMSEMG1":"13.03","colMediaABSEMG2":"15","colMedianaEMG2":"15","colRMSEMG2":"15.02","colMDiabetico","nombre":"Martha Garcia Lopez"}],ediaABSGsr":13,"colMedianaGsr":"13","colRMSGsr":"13.03","colMediaABSTemp":13,"colMedianaTemp":"13","colRMSTemp":"13.03","etiqueta":"Diabetico","nombre":"Martha Garcia Lopez"}],[{"colMediaABSEMGediaABSTemp":5,"colMedianaTemp":"5","colRMST1":5,"colMedianaEMG1":"5","colRMSEMG1":"5.20","colMediaABSEMG2":"3.5","colMedianaEMG2":"3.5","colRMSEMG2":"3.67","colMediaABSGsr":5,"colMedianaGsr":"5","colRMSGsr":"5.20","colMediaABSTemp":5,"c:"16.54","colMediaABSGsr":15,"colMedianaGsr"olMedianaTemp":"5","colRMSTemp":"5.20","etiqueta":"Diabetico","nombre":"Carlos Silva Chacon"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.02","colMediaABSEMG2":"16.5","colMediaRMSEMG1":"3.32","colMediaABSEMG2":"2","colMenaEMG2":"16.5","colRMSEMG2":"16.54","colMediaABSGsr":15,"colMedianaGsr":"15","colRMSGsr":"15.02","colMediaABSTemp":15,"colMedianaTemp":"15","colRMSTemp":"15.02","etiqueta":"Diabetico","nombre": pr"},{"colMediaABSEMG1":15,"colMedianaEMG1""Carlos Silva Chacon"}],[{"colMediaABSEMG1":3,"colMedianaEMG1":"3","colRMSEMG1":"3.32","colMediaABSEMG2":"2","colMedianaEMG2":"2","colRMSEMG2":"2.16","colMediaABSGsr":3,"colMedianaGsr":"3","col15","colRMSTemp":"15.08","etiqueta":"Sano","RMSGsr":"3.32","colMediaABSTemp":3,"colMedianaTemp":"3","colRMSTemp":"3.32","etiqueta":"Sano","nombre":"Probando pr pr"},{"colMediaABSEMG1":15,"colMedianaEMG1":"15","colRMSEMG1":"15.08","colMediaABSEMG2":"11","colMedianaEMG2":"11","colRMSEMG2":"11.09","colMediaABSGsr":15,"colMedianaGsr":"15","colRMSGsr":"15.08","colMediaABSTemp":15,"colMedianaTemp":"15","colRMSTemp":"15.08","etiqueta":"Sano","nombre":"Probando pr pr"}]]';
export const datosDePrueba2 =
  '[[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSTemp":"3.33","colMedianaTemp":"3","colRMSTemp":"3.56","etiqueta":"diabetico","nombre": "Karla"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSTemp":"10.75","colMedianaTemp":"10.5","colRMSTemp":"10.85","etiqueta":"diabetico","nombre": "Karla"}],[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSTemp":"3.33","colMedianaTemp":"3","colRMSTemp":"3.56","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSTemp":"10.75","colMedianaTemp":"10.5","colRMSTemp":"10.85","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"}],[{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGsr":"2.50","colMedianaGsr":"2.5","colRMSGsr":"2.55","colMediaABSTemp":"2.50","colMedianaTemp":"2.5","colRMSTemp":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 1"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGsr":8,"colMedianaGsr":"8","colRMSGsr":"8.12","colMediaABSTemp":8,"colMedianaTemp":"8","colRMSTemp":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 1"}]]';
export const datosDePrueba3 =
  '[[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSTemp":"3.33","colMedianaTemp":"3","colRMSTemp":"3.56","etiqueta":"diabetico","nombre": "Karla"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSTemp":"10.75","colMedianaTemp":"10.5","colRMSTemp":"10.85","etiqueta":"diabetico","nombre": "Karla"}],[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSTemp":"3.33","colMedianaTemp":"3","colRMSTemp":"3.56","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSTemp":"10.75","colMedianaTemp":"10.5","colRMSTemp":"10.85","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"}],[{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGsr":"2.50","colMedianaGsr":"2.5","colRMSGsr":"2.55","colMediaABSTemp":"2.50","colMedianaTemp":"2.5","colRMSTemp":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 1"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGsr":8,"colMedianaGsr":"8","colRMSGsr":"8.12","colMediaABSTemp":8,"colMedianaTemp":"8","colRMSTemp":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 1"}], [{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGsr":"2.50","colMedianaGsr":"2.5","colRMSGsr":"2.55","colMediaABSTemp":"2.50","colMedianaTemp":"2.5","colRMSTemp":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 2"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGsr":8,"colMedianaGsr":"8","colRMSGsr":"8.12","colMediaABSTemp":8,"colMedianaTemp":"8","colRMSTemp":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 2"}]]';
