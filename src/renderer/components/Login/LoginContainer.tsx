// eslint-disable-next-line import/no-named-as-default
import { useState } from 'react';
import { type } from 'os';
import { json } from 'stream/consumers';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import Login from './Login';
import Loading from '../Loading/Loading';
import ModalDatos from './ModalDatos';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
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

  async function insertarElementoMongoFront() {
    // appDispatch(setIsLoading(true));
    const document = {
      name: 'Ernesto Peña',
      age: 39,
      hobbies: ['reading', 'running', 'cooking'],
    };
    // const cadena = 'hola';
    const jsonDocument = JSON.stringify(document);
    console.log(typeof jsonDocument);
    window.electron.ipcRenderer.insertarElementoMongo(jsonDocument);
  }
  window.electron.ipcRenderer.insertarElementoM((event: any, resp: any) => {
    if (resp > 0) {
      toggleModal();
    } else {
      console.log(resp.insertedCount);
    }
  });

  async function buscarElementoMongoFront() {
    // appDispatch(setIsLoading(true));
    const document = { name: 'John Doe', age: 35 };
    // const cadena = 'hola';
    const jsonDocument = JSON.stringify(document);
    // console.log(typeof jsonDocument);
    window.electron.ipcRenderer.buscarElementoMongo(jsonDocument);
  }
  window.electron.ipcRenderer.buscarElementoM((event: any, resp: any) => {
    if (resp > 0) {
      console.log(resp.insertedCount);
    } else {
      toggleModal();
    }
  });

  async function seleccionarTodoMongoFront() {
    // appDispatch(setIsLoading(true));
    // console.log(typeof jsonDocument);
    window.electron.ipcRenderer.seleccionarTodoMongo();
  }
  window.electron.ipcRenderer.seleccionarTodoM((event: any, resp: any) => {
    if (resp > 0) {
      console.log(resp.insertedCount);
    } else {
      toggleModal();
    }
  });

  async function borrarElementoMongoFront() {
    // appDispatch(setIsLoading(true));
    const document = { name: 'John Doe', age: 35 };
    // const cadena = 'hola';
    const jsonDocument = JSON.stringify(document);
    // console.log(typeof jsonDocument);
    window.electron.ipcRenderer.borrarElementoMongo(jsonDocument);
  }
  window.electron.ipcRenderer.borrarElementoM((event: any, resp: any) => {
    if (resp > 0) {
      console.log(resp.insertedCount);
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
    // insertarElementoMongoFront();
    // buscarElementoMongoFront();
    // seleccionarTodoMongoFront();
    // borrarElementoMongoFront();
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
