/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPythonResponse } from '../../../redux/slices/ResponsesSlice';
import { setAnalisisParams } from '../../../redux/slices/ConfiguracionSlice';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import PreAnalisis from './PreAnalisis';

const PreAnalisisContainer = () => {
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  async function startAnalysis() {
    appDispatch(setIsLoading(true));
    console.log('Getting message');
    window.electron.ipcRenderer.funPython('Tree');
  }
  window.electron.ipcRenderer.funP((event: any, resp: any) => {
    console.log('Esta es', resp);
    appDispatch(setPythonResponse(resp));
    appDispatch(setIsLoading(false));
    navigate('/resultadosAnalisis');
  });
  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startAnalysis();
  };

  return (
    <div>
      <PreAnalisis onClickNav={onClickNav} />
    </div>
  );
};

export default PreAnalisisContainer;
