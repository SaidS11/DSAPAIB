// eslint-disable-next-line import/no-named-as-default
import { useCallback, useState } from 'react';
import { type } from 'os';
import { json } from 'stream/consumers';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import Login from './Login';
import Loading from '../Loading/Loading';
import ModalDatos from './ModalDatos';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import {
  setCantidadSujetos,
  setCantidadSujetosRespaldo,
} from '../../../redux/slices/SeñalesSlice';
import { setIsLogged, setLoggedUser } from '../../../redux/slices/LoginSlice';

const LoginContainer = () => {
  // const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const doctor = 'isrroman';
  const passw = 'Isrogo_2000';
  /* let doctor = '';
  let passw = ''; */
  const [open, setOpen] = useState(false);
  const loading = useCustomSelector((state) => state.status.isLoading);
  const toggleModal = () => {
    setOpen(!open);
  };

  async function loadData(doctorArg: string, passwordArg: string) {
    appDispatch(setIsLoading(true));
    window.Bridge.loggearDoctor(doctor, passw);
    // window.Bridge.loggearDoctor(doctorArg, passwordArg);

  }
  window.Bridge.loggearD((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('si es', resp[0].usuario);
      appDispatch(setIsLogged(true));
      appDispatch(setLoggedUser(resp[0].usuario));
      appDispatch(setIsLoading(false));
    } else {
      toggleModal();
      appDispatch(setIsLoading(false));

    }
  });

  const onClickLogin = async(e: React.FormEvent<HTMLFormElement>) => {    
    e.preventDefault();
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    const dataF = Object.fromEntries(new FormData(form).entries());
    console.log('la data', dataF);

    const usuario = dataF.username.toString()
    const password = dataF.password.toString()
    // Get user
    loadData(usuario, password);

  };

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <div>
      <Login onClickLogin={onClickLogin} passwordShown={passwordShown} togglePassword={togglePassword} setPasswordShown={setPasswordShown} />
      {open && <ModalDatos toggleModal={toggleModal} open={open} />}
      {loading && <Loading />}
    </div>
  );
};

export default LoginContainer;




export function obtenerPosicionesEnRango(arreglo: Array<string>, tiempoInicio: string, tiempoFin: string) {
  const inicio = convertirATiempoEnSegundos(tiempoInicio);
  const fin = convertirATiempoEnSegundos(tiempoFin);

  return arreglo.reduce((posicionesEnRango: any, tiempo: any, index: any) => {
    const tiempoEnSegundos = convertirATiempoEnSegundos(tiempo);

    if (tiempoEnSegundos >= inicio && tiempoEnSegundos <= fin) {
      posicionesEnRango.push(index);
    }

    return posicionesEnRango;
  }, []);
}

function convertirATiempoEnSegundos(tiempo: any) {
  const [horas, minutos, segundos] = tiempo.split(':').map(Number);
  return horas * 3600 + minutos * 60 + segundos;
}

export function equivalenteSegunPosiciones(arregloX: Array<number>, arregloY: Array<number>, posicionesEnRango: Array<number>) {
  const arregloXAux: Array<number> = [];
  const arregloYAux: Array<number> = [];

  const arregloRetorno: any = [];
  for (const posicion of posicionesEnRango) {
    if (posicion >= 0 && posicion < arregloX.length) {
      arregloXAux.push(arregloX[posicion]);
      arregloYAux.push(arregloY[posicion]);
    } 
  }
  for (let i = 0; i < arregloXAux.length; i += 1) {
    arregloRetorno.push({
      x: arregloXAux[i],
      y: arregloYAux[i]
    })
  }
  return arregloRetorno;
}

