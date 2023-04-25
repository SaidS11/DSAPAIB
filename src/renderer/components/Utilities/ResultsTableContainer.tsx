import { useNavigate } from 'react-router-dom';
import { useTable, Column } from 'react-table';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useCustomSelector } from '../../../redux/hooks';
import { setIsLoading } from '../../../redux/slices/StatusSlice';

import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';
import ResultsTable from './ResultsTable';

interface ResultsTableContainerInterface {
  stringObjData: string;
}

const ResultsTableContainer = (props: ResultsTableContainerInterface) => {
  const { stringObjData } = props;
  const [currentLabel, setCurrentLabel] = useState('Expandir');
  interface Cols {
    nombre?: string;
    // EMG's
    colMediaABSEMG1?: string;
    colMedianaEMG1?: string;
    colRMSEMG1?: string;

    colMediaABSEMG2?: string;
    colMedianaEMG2?: string;
    colRMSEMG2?: string;
    // TEMP
    colMediaABSTemp?: string;
    colMedianaTemp?: string;
    colRMSTemp?: string;
    // GSR
    colMediaABSGsr?: string;
    colMedianaGsr?: string;
    colRMSGsr?: string;

    // Clase
    etiqueta?: string;
  }

  // const respStringTest = '{"colMediaABSEMG1":{"0":3.33,"1":10.75,"2":3.33,"3":10.75,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colMedianaEMG1":{"0":3.0,"1":10.5,"2":3.0,"3":10.5,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colRMSEMG1":{"0":3.56,"1":10.85,"2":3.56,"3":10.85,"4":2.55,"5":8.12,"6":2.55,"7":8.12},"colMediaABSEMG2":{"0":8.5,"1":16.0,"2":8.5,"3":16.0,"4":4.5,"5":14.5,"6":4.5,"7":14.5},"colMedianaEMG2":{"0":8.5,"1":16.0,"2":8.5,"3":16.0,"4":4.5,"5":14.5,"6":4.5,"7":14.5},"colRMSEMG2":{"0":8.57,"1":16.06,"2":8.57,"3":16.06,"4":4.81,"5":14.6,"6":4.81,"7":14.6},"colMediaABSGsr":{"0":3.33,"1":10.75,"2":3.33,"3":10.75,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colMedianaGsr":{"0":3.0,"1":10.5,"2":3.0,"3":10.5,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colRMSGsr":{"0":3.56,"1":10.85,"2":3.56,"3":10.85,"4":2.55,"5":8.12,"6":2.55,"7":8.12},"colMediaABSTemp":{"0":3.33,"1":10.75,"2":3.33,"3":10.75,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colMedianaTemp":{"0":3.0,"1":10.5,"2":3.0,"3":10.5,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colRMSTemp":{"0":3.56,"1":10.85,"2":3.56,"3":10.85,"4":2.55,"5":8.12,"6":2.55,"7":8.12},"etiqueta":{"0":"sano","1":"diabetico","2":"sano","3":"diabetico","4":"sano","5":"sano","6":"sano","7":"sano"},"nombre":{"0":"Karla","1":"Karla","2":"Martha Garcia Lopez","3":"Martha Garcia Lopez","4":"Sujeto Prueba 1","5":"Sujeto Prueba 1","6":"Sujeto Prueba 2","7":"Sujeto Prueba 2"}}'
  const parsedRespObj = JSON.parse(stringObjData);
  console.log('this is parsed', parsedRespObj);
  const cantidadSensores = 2;
  const getData = () => {
    const objSensoresData: Cols[] = [];
    const keys = Object.keys(parsedRespObj.nombre);
    const numberOfKeys = keys.length;
    console.log('len', numberOfKeys);
    for (let i = 0; i < numberOfKeys; i += 1) {
      let dataJson = {};
      if (cantidadSensores === 2) {
        dataJson = {
          nombre: parsedRespObj.nombre[i],
          colMediaABSEMG1: parsedRespObj.colMediaABSEMG1[i],
          colMedianaEMG1: parsedRespObj.colMedianaEMG1[i],
          colRMSEMG1: parsedRespObj.colRMSEMG1[i],
          colMediaABSEMG2: parsedRespObj.colMediaABSEMG2[i],
          colMedianaEMG2: parsedRespObj.colMedianaEMG2[i],
          colRMSEMG2: parsedRespObj.colRMSEMG2[i],
          colMediaABSGsr: parsedRespObj.colMediaABSGsr[i],
          colMedianaGsr: parsedRespObj.colMedianaGsr[i],
          colRMSGsr: parsedRespObj.colRMSGsr[i],
          colMediaABSTemp: parsedRespObj.colMediaABSTemp[i],
          colMedianaTemp: parsedRespObj.colMedianaTemp[i],
          colRMSTemp: parsedRespObj.colRMSTemp[i],
          etiqueta: parsedRespObj.etiqueta[i],
        };
      }
      console.log('Calculated1', dataJson);
      objSensoresData.push(dataJson);
    }
    return objSensoresData;
  };
  const parsedData = getData();
  const data = React.useMemo(
    (): Cols[] => [...parsedData],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  console.log('DAta', data);

  const sensoresNames = ['EMG1', 'EMG2'];
  const sensoresExtraNames = ['GSR Promedio', 'Temperatura Promedio'];
  const getColumns = (sizeEMG: number, sizeSensoresExtra: number) => {
    const internalArray: Array<
      Column<{ Header: string; show: boolean; accessor: string }>
    > = [];
    internalArray.push({
      Header: 'Nombre',
      show: true,
      columns: [
        {
          Header: 'Nombre',
          accessor: 'nombre',
        },
      ],
    });
    for (let i = 0; i < sizeEMG; i += 1) {
      console.log('Itera');
      internalArray.push({
        Header: sensoresNames[i],
        show: false,
        columns: [
          {
            Header: 'Media absoluta',
            accessor: `colMediaABSEMG${i + 1}`,
          },
          {
            Header: 'Mediana',
            accessor: `colMedianaEMG${i + 1}`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSEMG${i + 1}`,
          },
        ],
      });
    }
    internalArray.push({
      Header: 'GSR Promedio',
      show: false,
      columns: [
        {
          Header: 'Media absoluta',
          accessor: `colMediaABSGsr`,
        },
        {
          Header: 'Mediana',
          accessor: `colMedianaGsr`,
        },
        {
          Header: 'RMS',
          accessor: `colRMSGsr`,
        },
      ],
    });
    internalArray.push({
      Header: 'Temperatura Promedio',
      show: false,
      columns: [
        {
          Header: 'Media absoluta',
          accessor: `colMediaABSTemp`,
        },
        {
          Header: 'Mediana',
          accessor: `colMedianaTemp`,
        },
        {
          Header: 'RMS',
          accessor: `colRMSTemp`,
        },
      ],
    });
    internalArray.push({
      Header: 'Etiqueta',
      show: true,
      columns: [
        {
          Header: 'Clase',
          accessor: 'etiqueta',
        },
      ],
    });
    return internalArray;
  };
  const columns = getColumns(cantidadSensores, 2);

  const options = {
    data,
    columns,
  };

  // const setStatus = () => {
  //     if(visibleColumns.length == 2) {
  //         allColumns.map(column => {
  //             column.toggleHidden(false);
  //         })
  //         setCurrentLabel("Retraer")
  //     } else {
  //         allColumns.map(column => {
  //             if (column.id !== "nombre" && column.id !== "etiqueta"){
  //                 column.toggleHidden(true);
  //             }
  //         })
  //         setCurrentLabel("Expandir")

  //     }
  // };
  return <ResultsTable options={options} data={data} columns={columns} />;
};

export default ResultsTableContainer;
