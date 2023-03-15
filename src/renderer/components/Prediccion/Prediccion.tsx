/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import './Prediccion.css';
import Button from '@mui/material/Button';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';

interface PrediccionProps {
  options: TableOptions<{ col1: string }>;
  data: any;
  dataM: any;
  onClickNav: any
  onClickStop: any
}

const Prediccion = (
  props: PrediccionProps
) => {
  const { options, data, dataM, onClickNav, onClickStop } = props;
  const setProtocols = () => {
    const plots = [];
    if (data.length > 0) {
      // eslint-disable-next-line no-plusplus
      for(let i = 0; i < data.length; i++) {
        console.log('datos recibidios', data[i]);
        plots.push(
          <option value={`${data[i].nombre}`}>{data[i].nombre}</option>
        )
      }
      return plots;
    }
    return <option value={1}>1</option>;
    
  }
  const numOfAlgos = () => {
    const models = [];
    if (dataM.length >= 1) {
      // eslint-disable-next-line no-plusplus
      for(let i = 0; i < dataM.length; i++) {
        // console.log('datos recibidios', data[i]);
        models.push(
          <option  key={i} value={`${dataM[i].modelo}`}>{dataM[i].modelo}</option>
        )
      }
      return models;
    }
    return <option value={1}>1</option>;
  }
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  
  const sortedColumn = (column: HeaderGroup<{ col1: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };

  return (
    <div>
      <div className="display-center">
        <h1>Análisis Predicción</h1>
      </div>
      <div className='display-center'>
        <form className="analisis-form" action="" style={{ width: "70%" }}>
          <section className="display-flex">
            <h3>Nombre: </h3>{' '}
            <input className="first-input" type="text"  name="nombrePrediccion" required />
          </section>
          <section className="display-flex">
            <h3>Descripción: </h3>{' '}
            <textarea className="second-input" name="descripcion" required/>
          </section>
          <section className="display-flex">
            <h3>Protocolo Adquisición: </h3>{' '}
            <select className='sensores-crear-analisis' name="protocolo" required>
              {setProtocols()}
            </select>
          </section>
          <section className="display-flex">
            <h3>Algoritmo: </h3>{' '}
            <select className="fourth-input-modelo">
              {numOfAlgos()}
            </select>
          </section>
        
      <div className='display-center'>
          <h2>Pacientes:</h2>
      </div>
      <div
        style={{
          width: '90%',
          overflow: 'auto',
          maxHeight: '60vh',
          marginLeft: '80px',
        }}
      >
        <table {...getTableProps()} className="tableCustom" id="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="tableHeader"
                  >
                    {column.render('Header')}
                    <span>{column.isSorted ? sortedColumn(column) : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={
                    row.index % 2 === 0 ? 'tableElementOdd' : 'tableElementEven'
                  }
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="display-center" style={{ marginTop: '10px' }}>
        <h5>Total: </h5>{' '}
        <h5 style={{ fontWeight: '600', marginLeft: '5px' }}>5</h5>
      </div>
      <div
        className="display-center"
        style={{ marginTop: '5px', marginBottom: '30px' }}
      >
        <Button sx={styleButtonBiggerGreen} style={{ fontSize: '30px' }} onClick={onClickNav}>
          Comenzar
        </Button>
        <Button sx={styleButtonBiggerGreen} style={{ fontSize: '30px' }} onClick={onClickStop}>
          Parar
        </Button>
      </div>
      </form>
      </div>
    </div>
  );
};

export default Prediccion;
