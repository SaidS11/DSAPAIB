/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import './VerProtocolo.css';
import {
    useTable,
    TableOptions,
    useSortBy,
    useFilters,
    HeaderGroup,
  } from 'react-table';
import '../../../../assets/Iconos/style.css';

interface VerProtocoloProps {
  options: TableOptions<{ col1: string }>;
  onClickRow: (arg0: any) => void;
}

const VerProtocolo = (props: VerProtocoloProps) => {
  const { options, onClickRow } = props;
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
            <div className='display-center'>
            <h1>Protocolo</h1>
            </div>
             
            <section className="display-center">
          <h4>Seleccione uno de la lista para ver más detalles:</h4>
        </section>
             <br />
      <div 
        style={{
          width: '100%',
          overflow: 'auto',
          maxHeight: '60vh',
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
                  onClick={() => onClickRow(row)}
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

export default VerProtocolo;