import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';
import { setErrorDetails, setFallosAlCargar, setIsLoading } from '../../../redux/slices/StatusSlice';
import VerPaciente from './VerPaciente';
import { PacientesAnalisisMongo } from '../Utilities/Constants';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

// import { useNavigate } from "react-router-dom";
interface Cols {
  col1: string;
}

const VerPacienteContainer = () => {
  const usuario = useCustomSelector((state) => state.datos.usuarioPaciente);
  const datosArray = useCustomSelector((state) => state.datos.datosPaciente);
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<Cols[]>([]);

  const datarRetrieved: Cols[] = [];
  async function loadPacientes() {
    appDispatch(setIsLoading(true));
    const document = {
      name: `${datosArray[0].col1} ${datosArray[0].col2} ${datosArray[0].col3}`,
    };
    const jsonDocument = JSON.stringify(document);
    try {
      const pacientes = (await window.electron.ipcRenderer.buscarElementoM(
        jsonDocument
      )) as Array<PacientesAnalisisMongo>;
      for (let i = 0; i < pacientes.length; i += 1) {
        datarRetrieved.push({
          col1: `${pacientes[i].name} Protocolo: ${pacientes[i].protocol} Etiqueta: ${pacientes[i].etiqueta}`,
        });
      }
      console.log('Retrieved', datarRetrieved);
      setData(datarRetrieved);
    } catch (error: any) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails('Error al cargar los datos'));
    }
    appDispatch(setIsLoading(false));
  }

  async function loadExcelData(nombre: string, protocolo: string, etiqueta: string) {
    appDispatch(setIsLoading(true));
    const document = {
      name: nombre,
      protocol: protocolo,
      etiqueta,
    };
    const jsonDocument = JSON.stringify(document);
    try {
      const datos = (await window.electron.ipcRenderer.buscarElementoM(
        jsonDocument
      )) as Array<PacientesAnalisisMongo>;
      
      console.log('Datos Excel', datos);
      
      const fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = "test";
      const jsonObj = datos[0].signals;
      const jsonArr: any = jsonObj;
      console.log("JSON ARR", jsonArr);
      const maxLength = Math.max(...Object.values(jsonArr).map((arr: any) => arr.length));

      const keys: any = Object.keys(jsonArr);

      // Crear el nuevo arreglo de objetos
      // const newArray = jsonArr[keys[0]].map((_: any, index: string | number) => {
      //   const newObj: any = {};
      //   keys.forEach((key: string | number) => {
      //     newObj[key] = jsonArr[key][index].y;
      //   });
      //   return newObj;
      // });

      // const newArray = Array.from({ length: maxLength }, (_, index) => {
      //   const newObj: any = {};
      //   Object.keys(jsonArr).forEach(key => {
      //     const value = jsonArr[key][index];
      //     newObj[key] = value ? value.y : 0; // Si el valor existe, usa value.y, de lo contrario, usa 0
      //   });
      //   return newObj;
      // });

      const newArray = Array.from({ length: maxLength }, (_, index) => {
        const newObj: any = {};
        Object.keys(jsonArr).forEach(key => {
          if (!key.includes('tiempo')) { // Excluir claves que contengan "tiempo"
            const value = jsonArr[key][index];
            newObj[key] = value ? value.y : 0;
          }
        });
        return newObj;
      });
      

      console.log("Generated", newArray);
      

      const ws = XLSX.utils.json_to_sheet(newArray);
      console.log("WS", ws);
      const wb = { Sheets: {'data': ws}, SheetNames: ['data']};
      console.log("wb", wb);
      const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
      console.log("excel Buf", excelBuffer);
      const data = new Blob([excelBuffer], {type: fileType});
      console.log("Blob", data);
      FileSaver.saveAs(data, fileName + fileExtension);
      

    } catch (error: any) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Error al cargar los datos: ${error}`));
    }
    appDispatch(setIsLoading(false));
  }

  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Registros',
        accessor: 'col1',
      },
    ],
    []
  );
  const options: TableOptions<{
    col1: string;
  }> = {
    data,
    columns,
  };
  const onClickCaptura = () => {
    navigate('/escogerConfiguracion');
  };
  const onClickIrInicio = () => {
    navigate('/');
  };

  const onClickRow = (element: any) => {
    console.log(element);
    console.log(element.cells);

    const valorClickeado = element.cells[0].value
    // Separar el nombre
    const nombreRegex = /^(.*?)\sProtocolo:/;
    const nombreMatch = valorClickeado.match(nombreRegex);
    const nombre = nombreMatch ? nombreMatch[1] : "";

    // Separar el protocolo
    const protocoloRegex = /Protocolo:\s(.*?)\sEtiqueta:/;
    const protocoloMatch = valorClickeado.match(protocoloRegex);
    const protocolo = protocoloMatch ? protocoloMatch[1] : "";

    // Separar la etiqueta
    const etiquetaRegex = /Etiqueta:\s(.*)$/;
    const etiquetaMatch = valorClickeado.match(etiquetaRegex);
    const etiqueta = etiquetaMatch ? etiquetaMatch[1] : "";

    console.log("Nombre", nombre);
    console.log("protocolo", protocolo);
    console.log("etiqueta", etiqueta);

    loadExcelData(nombre, protocolo, etiqueta);

    // loadPaciente(
    //   element.cells[0].value,
    //   element.cells[1].value,
    //   element.cells[2].value,
    //   element.cells[4].value
    // );
  };

  useEffect(() => {
    loadPacientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <VerPaciente
      options={options}
      datosArray={datosArray}
      onClickCaptura={onClickCaptura}
      onClickIrInicio={onClickIrInicio}
      onClickRow={onClickRow}
    />
  );
};

export default VerPacienteContainer;
