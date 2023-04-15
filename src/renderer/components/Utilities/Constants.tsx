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
