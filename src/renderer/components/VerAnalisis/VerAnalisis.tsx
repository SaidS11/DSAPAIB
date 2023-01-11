/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import './VerAnalisis.css';
import {
    useTable,
    TableOptions,
    useSortBy,
    useFilters,
    HeaderGroup,
  } from 'react-table';
import '../../../../assets/Iconos/style.css';

  interface VerPacienteProps {
    options: TableOptions<{ col1: string }>;
  }

const VerAnalisis = (props: VerPacienteProps) => {
    const { options } = props;
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
        <div className=''>
            <div className='display-flex-analisis'>
            <h2>Seleccione un Analisis de la lista o agregue uno nuevo:</h2>
            <section style={{ marginLeft: 'auto' }}>
            <span className="icon-user-plus" />
            </section>
            </div>
             
             <div className='display-flex-analisis'>
             <h3>Busqueda: </h3> 
             <input className='more-margin-right' type="text" placeholder='Nombre de Analisis'/>
             </div>
             <br />
      <div 
        style={{
          width: '100%',
          overflow: 'auto',
          maxHeight: '60vh',
        }}
      >
        <table {...getTableProps()} className="tableCustom" id='table'>
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
        </div>
       
    );
}

export default VerAnalisis;