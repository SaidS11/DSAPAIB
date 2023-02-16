/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */

import './ComenzarAnalisisEntrenamiento.css';
import Button from '@mui/material/Button';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import { styleButtonBiggerGreen } from '../VerPaciente/ButtonStyle';

interface ComenzarAnalisisEntrenamientoProps {
  data: any;
  dataM: any;
  options: TableOptions<{ col1: string }>;
  onClickNav: any
  onClickStop: any
}

const ComenzarAnalisisEntrenamiento = (
  props: ComenzarAnalisisEntrenamientoProps
) => {
  const { data, dataM, options, onClickNav, onClickStop } = props;
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  const sortedColumn = (column: HeaderGroup<{ col1: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };

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
  const numofModels = () => {
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

  return (
    <div>
      <div className="display-center">
        <h1>Entrenamiento</h1>
      </div>
      <div className='display-center'>
        <form className="analisis-form" onSubmit={onClickNav} style={{ width: "70%" }}>
          <section className="display-flex">
            <h3>Nombre: </h3>{' '}
            <input className="first-input" type="text"  name="nombre" required />
          </section>
          <section className="display-flex">
            <h3>Descripción: </h3>{' '}
            <textarea className="second-input" name="descripcion" required/>
          </section>
          <section className="display-flex">
            <h3>Protocolo Adquisicion: </h3>{' '}
            <select className="fourth-input-modelo" required name="protocolo">
            {setProtocols()}
            </select>
          </section>
          <section className="display-flex">
            <h3>Modelo: </h3>{' '}
            <select className="fourth-input-modelo" required name="modelo">
            {numofModels()}
            </select>
          </section>
        
      <div className='display-center'>
          <h2>Parametros de la seleccion:</h2>
      </div>
      <section className="display-flexAgregar">
          <h4>Sexo: </h4>
          <select>
          <option>Hombre</option>
          <option>Mujer</option>
          </select>
          <h4>Edad (años): </h4>
          <select>
          <option>10 a 15</option>
          <option>15 a 20</option>
          <option>20 a 25</option>
          <option>25 a 30</option>
          <option>30 a 35</option>
          <option>35 a 40</option>
          <option>40 a 45</option>
          <option>45 a 50</option>
          <option>Más de 50</option>
          </select>
        </section>
        <br />
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
        <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} variant="contained" component="label">Comenzar
          <input hidden type="submit" />
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

export default ComenzarAnalisisEntrenamiento;
