// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
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

  async function loadData() {
    appDispatch(setIsLoading(true));
    window.Bridge.loggearDoctor(doctor, passw);
  }
  window.Bridge.loggearD((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('si es', resp[0].usuario);
      appDispatch(setIsLogged(true));
      appDispatch(setLoggedUser(resp[0].usuario));
      appDispatch(setIsLoading(false));
    } else {
      toggleModal();
    }
  });
  const onClickLogin = () => {
    // Get user
    /* const usDocument = document.getElementById('user') as HTMLInputElement | null;
    const passDocument = document.getElementById('password') as HTMLInputElement | null;
    console.log(usDocument?.value)
    console.log(passDocument?.value)
    if (usDocument !== null){
      doctor = usDocument.value
    }
    if (passDocument !== null){
      passw = passDocument.value
    } */
    loadData();
    appDispatch(setCantidadSujetos(4));
    appDispatch(setCantidadSujetosRespaldo(4));
  };
  return (
    <div>
      <Login onClickLogin={onClickLogin} />
      {open && <ModalDatos toggleModal={toggleModal} open={open} />}
      {loading && <Loading />}
    </div>
  );
};

export default LoginContainer;
