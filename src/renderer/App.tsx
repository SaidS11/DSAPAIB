import { MemoryRouter as Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavegacionContainer from './components/Navegacion/NavegacionContainer';
import AnalisisContainer from './components/Analisis/AnalisisContainer';
import ProbarSensoresContainer from './components/ProbarSensores/ProbarSensoresContainer';
import LoginContainer from './components/Login/LoginContainer';
import PacientesContainer from './components/Pacientes/PacientesContainer';
import VerPacienteContainer from './components/VerPaciente/VerPacienteContainer';
import { useCustomSelector } from '../redux/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const isLogged = useCustomSelector((state) => state.login.isLogged);
  console.log(isLogged);
  if (isLogged) {
    return (
      <div>
        <NavegacionContainer />
        <CssBaseline />
        <Container maxWidth={false}>
          <br />
          <Routes>
            <Route path="/" element={<PacientesContainer />} />
            <Route path="/analisis" element={<AnalisisContainer />} />
            <Route path="/verPaciente" element={<VerPacienteContainer />} />
            <Route
              path="/probarSensores"
              element={<ProbarSensoresContainer />}
            />
          </Routes>
        </Container>
      </div>
    );
  }
  return <LoginContainer />;
}
