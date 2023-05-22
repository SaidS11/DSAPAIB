/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { setConfigPrimerPaso } from '../../../redux/slices/ConfiguracionSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomDispatch } from '../../../redux/hooks';
import CrearConfiguracion from './CrearConfiguracion';

const CrearConfiguracionContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    appDispatch(setIsLoading(true));
    e.preventDefault();
    // navigate('/escogerConfiguracion');
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    // console.log('el form', form);
    const data = Object.fromEntries(new FormData(form).entries());
    if (!('ritmo' in data)) {
      data.ritmo = '0';
    }
    if (!('frecuencia' in data)) {
      data.frecuencia = '0';
    }
    if (!('giroscopio' in data)) {
      data.giroscopio = '0';
    }
    if (!('acelerometro' in data)) {
      data.acelerometro = '0';
    }
    console.log('la data', data);
    appDispatch(setConfigPrimerPaso(data))
    appDispatch(setIsLoading(false));
    // insertData(data);
    navigate('/crearConfigMultimedia');
  };
  return <CrearConfiguracion onClickNav={onClickNav}/>;
};

export default CrearConfiguracionContainer;