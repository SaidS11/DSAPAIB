/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { TableOptions, Column } from 'react-table';
import { useCustomSelector } from '../../../redux/hooks';
import VerModelo from './VerModelo';

const VerModeloContainer = () => {
  const resp = useCustomSelector((state) => state.config.modeloDetalle);
  console.log("Recibi", resp);
  return <VerModelo resp={resp}/>;
};

export default VerModeloContainer;
