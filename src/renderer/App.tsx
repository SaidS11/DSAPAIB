import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import React from 'react';
import NavegacionContainer from './components/Navegacion/NavegacionContainer';
import CrearAnalisisContainer from './components/CrearAnalisis/CrearAnalisisContainer';
import VerAnalisisContainer from './components/VerAnalisis/VerAnalisisContainer';
import VerAnalisis2Container from './components/VerAnalisis2/VerAnalisis2Container';
import ComenzarAnalisisEntrenamientoContainer from './components/ComenzarAnalisisEntrenamiento/ComenzarAnalisisEntrenamientoContainer';
import PrediccionContainer from './components/Prediccion/PrediccionContainer';
import ProbarSensoresContainer from './components/ProbarSensores/ProbarSensoresContainer';
import LoginContainer from './components/Login/LoginContainer';
import PacientesContainer from './components/Pacientes/PacientesContainer';
import VerPacienteContainer from './components/VerPaciente/VerPacienteContainer';
import CrearConfiguracionContainer from './components/CrearConfiguracion/CrearConfiguracionContainer';
import VerConfiguracionContainer from './components/VerConfiguracion/VerConfiguracionContainer';
import Loading from './components/Loading/Loading';
import AgregarPacienteContainer from './components/AgregarPaciente/AgregarPacienteContainer';
import EscogerConfiguracionContainer from './components/EscogerConfiguracion/EscogerConfiguracionContainer';
import ColocacionMuestraContainer from './components/ColocacionMuestra/ColocacionMuestraContainer';
import VideoDemoContainer from './components/VideoDemo/VideoDemoContainer';
import VideoContainer from './components/Video/VideoContainer';
import ResultadosAnalisisContainer from './components/ResultadosAnalisis/ResultadosAnalisisContainer';
import ResultadosContainer from './components/Resultados/ResultadosContainer';
import CaracterizarContainer from './components/Caracterizar/CaracterizarContainer';
import ResultadoEntrenarContainer from './components/ResultadoEntrenar/ResultadoEntrenarContainer';
import CrearConfiguracionMultimediaContainer from './components/CrearConfiguracionMultimedia/CrearConfiguracionMultimediaContainer';
import VerConfiguracionDetalleContainer from './components/VerConfiguracionDetalle/VerConfiguracionDetalleContainer';
import CrearProtocoloContainer from './components/CrearProtocolo/CrearProtocoloContainer';
import VerInicioContainer from './components/VerInicio/VerInicioContainer';
import { useCustomSelector } from '../redux/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const isLogged = useCustomSelector((state) => state.login.isLogged);
  const loading = useCustomSelector((state) => state.status.isLoading);
  console.log(isLogged);
  if (isLogged) {
    return (
      <div>
        <NavegacionContainer />
        <CssBaseline />
        <Container maxWidth={false}>
          <br />
          <Routes>
            <Route path="/verInicio" element={<VerInicioContainer />} />
            <Route path="/" element={<PacientesContainer />} />
            <Route path="/crearAnalisis" element={<CrearAnalisisContainer />} />
            <Route path="/verPaciente" element={<VerPacienteContainer />} />
            <Route
              path="/agregarPaciente"
              element={<AgregarPacienteContainer />}
            />
            <Route
              path="/resultadosAnalisis"
              element={<ResultadosAnalisisContainer />}
            />
            <Route
              path="/resultadoEntrenar"
              element={<ResultadoEntrenarContainer />}
            />
            <Route
              path="/verConfiguracion"
              element={<VerConfiguracionContainer />}
            />
            <Route
              path="/verConfiguracionDetalle"
              element={<VerConfiguracionDetalleContainer />}
            />
            <Route
              path="/crearProtocolo"
              element={<CrearProtocoloContainer />}
            />
            <Route path="/caracterizar" element={<CaracterizarContainer />} />
            <Route path="/resultados" element={<ResultadosContainer />} />
            <Route
              path="/escogerConfiguracion"
              element={<EscogerConfiguracionContainer />}
            />
            <Route
              path="/crearConfigMultimedia"
              element={<CrearConfiguracionMultimediaContainer />}
            />
            <Route
              path="/colocacionMuestra"
              element={<ColocacionMuestraContainer />}
            />
            <Route path="/videoDemo" element={<VideoDemoContainer />} />
            <Route path="/video" element={<VideoContainer />} />
            <Route
              path="/CrearConfiguracion"
              element={<CrearConfiguracionContainer />}
            />
            <Route
              path="/probarSensores"
              element={<ProbarSensoresContainer />}
            />
            <Route path="/verAnalisis" element={<VerAnalisisContainer />} />
            <Route
              path="/verConfiguracion"
              element={<VerConfiguracionContainer />}
            />
          </Routes>
          <>{loading && <Loading />}</>
        </Container>
      </div>
    );
  }
  return <LoginContainer />;
}
