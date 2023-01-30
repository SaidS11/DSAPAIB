/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import './VerPaciente.css';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
// import TableStylesList from "./TableStylesList";
import Button from '@mui/material/Button';
import styleButton from './ButtonStyle';

interface Cols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}
interface VerPacienteProps {
  options: TableOptions<{ col1: string }>;
  datosArray: Cols[];
  onClickCaptura: () => void;
  onClickIrInicio: () => void;
}

const VerPaciente = (props: VerPacienteProps) => {
  const { options, datosArray, onClickCaptura, onClickIrInicio } = props;
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
      <div style={{}}>
        <section className="display-center">
          <h1>Paciente</h1>
        </section>
        <section className="display-flex">
          <h5>Nombres(s):</h5>
          <h5 className="second-item">{datosArray[0].col1}</h5>
        </section>
        <section className="display-flex">
          <h5>Apellido Paterno:</h5>
          <h5 className="second-item">{datosArray[0].col2}</h5>
        </section>
        <section className="display-flex">
          <h5>Apellido Materno:</h5>
          <h5 className="second-item">{datosArray[0].col3}</h5>
        </section>
        <section className="display-flex">
          <h5>Sexo:</h5>
          <h5 className="second-item">Masculino</h5>
        </section>
        <section className="display-flex">
          <h5>Fecha de Nacimiento:</h5>
          <h5 className="second-item">{datosArray[0].col4}</h5>
        </section>
        <section className="display-flex">
          <h5>Peso:</h5>
          <h5 className="second-item">40 kg</h5>
          <h5 style={{ paddingLeft: '10px' }}>Estatura:</h5>
          <h5 className="second-item">1.50 metros</h5>
        </section>
      </div>
      <br />
      <div
        style={{
          width: '100%',
          overflow: 'auto',
          maxHeight: '20vh',
        }}
      >
        <table {...getTableProps()} className="tableCustom">
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
      <br />
      <section className="display-center">
        <Button sx={styleButton} onClick={onClickIrInicio}>
          Ir a Inicio
        </Button>
        <Button sx={styleButton} onClick={onClickCaptura}>
          Captura
        </Button>
        <Button sx={styleButton}>Analisis</Button>
      </section>
      <br />
    </div>
  );
};

export default VerPaciente;
