/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { TableOptions, Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';
import VerProtocolo2 from './VerProtocolo2';

const VerProtocolo2Container = () => {
  const resp = useCustomSelector((state) => state.config.protocoloDetalle);
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  interface Cols {
      col1: string;
    }
  const [data, setData] = useState<Cols[]>([]);
  const datarRetrieved: Cols[] = [];

  // Load Data for the rows
  async function loadData() {
    console.log('Fui llamado');
    appDispatch(setIsLoading(true));
    window.Bridge.selectRegistrosProtocolo(resp[0].nombre);
  }
  window.Bridge.selectRP((event: any, respArg: any) => {
    console.log('llamada dentro');
    if (respArg.length > 0) {
      console.log('si es', respArg);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < respArg.length; i++) {
        datarRetrieved.push({
          col1: respArg[i].paciente,
        });
      }
      setData(datarRetrieved);
    } else {
      console.log('nada');
    }
    appDispatch(setIsLoading(false));
  });
    const columns: Array<Column<{ col1: string }>> = React.useMemo(
      () => [
        {
          Header: 'Registros',
          accessor: 'col1',
        },
      ],
      []
    );
    useEffect(() => {
      console.log('updated lista proto');
      loadData();
    }, []);
    const options: TableOptions<{
      col1: string;
    }> = {
      data,
      columns,
    };
    const onClickIrRegresar = () => {
      navigate('/verProtocolo');
    };
    const largo = data.length;
    console.log('El largo', largo)
  return <VerProtocolo2 options={options} resp={resp} onClickIrRegresar={onClickIrRegresar} largo={largo} />;
};

export default VerProtocolo2Container;
