import React, { useState } from 'react';
import { TableOptions, Column } from 'react-table';
import Pacientes from './Pacientes';

const PacientesContainer = () => {
  // const navigate = useNavigate();
  interface Cols {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
  }
  const data = React.useMemo(
    (): Cols[] => [
      {
        col1: 'Isaac',
        col2: 'Chacon',
        col3: 'Rayas',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com',
      },
      {
        col1: 'Carlos Said',
        col2: 'Silva',
        col3: 'Chacon',
        col4: '11/06/2001',
        col5: 'saidsilva@gmail.com',
      },
      {
        col1: 'Fernando',
        col2: 'Castro',
        col3: 'Galan',
        col4: '09/05/1999',
        col5: 'fercas@gmail.com',
      },
      {
        col1: 'Alma Karen',
        col2: 'Bañuelos',
        col3: 'Mezquitan',
        col4: '11/11/2002',
        col5: 'almakaren@gmail.com',
      },
      {
        col1: 'Franco',
        col2: 'Chacon',
        col3: 'Castro',
        col4: '18/12/2002',
        col5: 'franco@gmail.com',
      },
      {
        col1: 'Isaac',
        col2: 'Chacon',
        col3: 'Rayas',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com',
      },
      {
        col1: 'Isaac',
        col2: 'Chacon',
        col3: 'Rayas',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com',
      },
      {
        col1: 'Isaac',
        col2: 'Chacon',
        col3: 'Rayas',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com',
      },
      {
        col1: 'Carlos Said',
        col2: 'Silva',
        col3: 'Chacon',
        col4: '11/06/2001',
        col5: 'saidsilva@gmail.com',
      },
      {
        col1: 'Fernando',
        col2: 'Castro',
        col3: 'Galan',
        col4: '09/05/1999',
        col5: 'fercas@gmail.com',
      },
      {
        col1: 'Alma Karen',
        col2: 'Bañuelos',
        col3: 'Mezquitan',
        col4: '11/11/2002',
        col5: 'almakaren@gmail.com',
      },
      {
        col1: 'Franco',
        col2: 'Chacon',
        col3: 'Castro',
        col4: '18/12/2002',
        col5: 'franco@gmail.com',
      },
      {
        col1: 'Isaac',
        col2: 'Chacon',
        col3: 'Rayas',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com',
      },
      {
        col1: 'Isaac',
        col2: 'Chacon',
        col3: 'Rayas',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com',
      },
      {
        col1: 'Isaac',
        col2: 'Chacon',
        col3: 'Rayas',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com',
      },
      {
        col1: 'Carlos Said',
        col2: 'Silva',
        col3: 'Chacon',
        col4: '11/06/2001',
        col5: 'saidsilva@gmail.com',
      },
      {
        col1: 'Fernando',
        col2: 'Castro',
        col3: 'Galan',
        col4: '09/05/1999',
        col5: 'fercas@gmail.com',
      },
      {
        col1: 'Alma Karen',
        col2: 'Bañuelos',
        col3: 'Mezquitan',
        col4: '11/11/2002',
        col5: 'almakaren@gmail.com',
      },
      {
        col1: 'Franco',
        col2: 'Chacon',
        col3: 'Castro',
        col4: '18/12/2002',
        col5: 'franco@gmail.com',
      },
      {
        col1: 'Isaac',
        col2: 'Chacon',
        col3: 'Rayas',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com',
      },
      {
        col1: 'Isaac',
        col2: 'Chacon',
        col3: 'Rayas',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com',
      },
    ],
    []
  );
  const columns: Array<
    Column<{
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    }>
  > = React.useMemo(
    () => [
      {
        Header: 'Nombres',
        accessor: 'col1',
      },
      {
        Header: 'Apellido Paterno',
        accessor: 'col2',
      },
      {
        Header: 'Apellido Materno',
        accessor: 'col3',
      },
      {
        Header: 'Fecha de Nacimiento',
        accessor: 'col4',
      },
      {
        Header: 'Email',
        accessor: 'col5',
      },
    ],
    []
  );
  const options: TableOptions<{
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
  }> = {
    data,
    columns,
  };
  const [filterInput, setFilterInput] = useState('');

  return (
    <Pacientes
      filterInput={filterInput}
      setFilterInput={setFilterInput}
      options={options}
    />
  );
};

export default PacientesContainer;
