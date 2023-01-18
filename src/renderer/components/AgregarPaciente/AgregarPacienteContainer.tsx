// eslint-disable-next-line import/no-named-as-default
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import { useCustomDispatch } from '../../../redux/hooks';
import {
  setUsuarioPaciente,
  setDatosPaciente,
} from '../../../redux/slices/PacienteSlice';
import AgregarPaciente from './AgregarPaciente';

const AgregarPacienteContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  interface Cols {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
  }
  let dataPaciente: Cols[] = [];
  async function insertData(data: any) {
    const user =
      data.nombrePaciente +
      data.apellidoPaterno.slice(0, 2).toString() +
      data.apellidoMaterno.slice(0, 2).toString() +
      data.fechaNacimiento.slice(0, 4).toString();
    dataPaciente.push({
      col1: data.nombrePaciente,
      col2: data.apellidoPaterno,
      col3: data.apellidoMaterno,
      col4: data.fechaNacimiento,
      col5: data.email,
    });
    appDispatch(setUsuarioPaciente(user.toLowerCase()));
    appDispatch(setDatosPaciente(dataPaciente));
    dataPaciente = [];
    window.Bridge.insertPaciente(
      user.toLowerCase(),
      data.email,
      data.telefono,
      data.fechaNacimiento,
      data.nombrePaciente,
      data.apellidoPaterno,
      data.apellidoMaterno
    );
  }
  window.Bridge.insertP((event: any, resp: any) => {
    appDispatch(setIsLoading(false));
    navigate('/verPaciente');
  });

  const onClickNav = (e: React.FormEvent<HTMLFormElement>) => {
    // appDispatch(setIsLoading(true));
    e.preventDefault();
    navigate('/escogerConfiguracion');
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    // console.log('el form', form);
    const data = Object.fromEntries(new FormData(form).entries());
    // console.log('la data', data);
    // insertData(data);
  };
  return (
    <div>
      <AgregarPaciente onClickNav={onClickNav} />
    </div>
  );
};

export default AgregarPacienteContainer;
