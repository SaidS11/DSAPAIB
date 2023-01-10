// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import Login from './Login';
import ModalDatos from './ModalDatos';
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';

const LoginContainer = () => {
  // const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const doctor = 'isrroman';
  const passw = 'Isrogo_2000';
  /* let doctor = '';
  let passw = ''; */
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  async function loadData() {
    appDispatch(setIsLoading(true));
    window.Bridge.loggearDoctor(doctor, passw);
  }
  window.Bridge.loggearD((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('si es', resp);
      appDispatch(setIsLogged(true));
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
  };
  return (
    <div>
      <Login onClickLogin={onClickLogin} />
      {open && <ModalDatos toggleModal={toggleModal} open={open} />}
    </div>
  );
};

export default LoginContainer;
