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
import VerProtocoloContainer from './components/VerProtocolo/VerProtocoloContainer';
import VerProtocolo2Container from './components/VerProtocolo2/VerProtocolo2Container';
import VerAlgoritmoContainer from './components/VerAlgoritmo/VerAlgoritmoContainer';
import ProbarSensoresContainer from './components/ProbarSensores/ProbarSensoresContainer';
import LoginContainer from './components/Login/LoginContainer';
import PacientesContainer from './components/Pacientes/PacientesContainer';
import VerPacienteContainer from './components/VerPaciente/VerPacienteContainer';
import CrearConfiguracionContainer from './components/CrearConfiguracion/CrearConfiguracionContainer';
import Loading from './components/Loading/Loading';
import AgregarPacienteContainer from './components/AgregarPaciente/AgregarPacienteContainer';
import EscogerConfiguracionContainer from './components/EscogerConfiguracion/EscogerConfiguracionContainer';
import ColocacionMuestraContainer from './components/ColocacionMuestra/ColocacionMuestraContainer';
import VideoDemoContainer from './components/VideoDemo/VideoDemoContainer';
import VideoContainer from './components/Video/VideoContainer';
import ResultadosAnalisisContainer from './components/ResultadosAnalisis/ResultadosAnalisisContainer';
import ResultadosContainer from './components/Resultados/ResultadosContainer';
import ResultadoEntrenarContainer from './components/ResultadoEntrenar/ResultadoEntrenarContainer';
import CrearConfiguracionMultimediaContainer from './components/CrearConfiguracionMultimedia/CrearConfiguracionMultimediaContainer';
import VerConfiguracionDetalleContainer from './components/VerConfiguracionDetalle/VerConfiguracionDetalleContainer';
import CaracterizarContainer from './components/Caracterizar/CaracterizarContainer';
import CaracterizarParte2Container from './components/CaracterizarParte2/CaracterizarParte2Container';
import CrearProtocoloContainer from './components/CrearProtocolo/CrearProtocoloContainer';
import VerInicioContainer from './components/VerInicio/VerInicioContainer';
import VerConfiguracionContainer from './components/VerConfiguracion/VerConfiguracionContainer';
import PreAnalisisContainer from './components/PreAnalisis/PreAnalisisContainer';
import CreadoExitosamente from './components/Modales/CreadoExitosamente';
import ErrorCrear from './components/Modales/ErrorCrear';
import ErrorModal from './components/Modales/ErrorModal';
import CargaExitosaModal from './components/Modales/CargaExitosaModal';
import Blank from './components/Caracterizar/Blank';
import { useCustomSelector } from '../redux/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CrearImplementacionContainer from './components/CrearAlgoritmo/CrearAlgoritmoContainer';
import VerAlgoritmosContainer from './components/VerAlgoritmos/VerAlgoritmosContainer';
import VerModeloContainer from './components/VerModelo/VerModeloContainer';
import VerModelosContainer from './components/VerModelos/VerModelosContainer';
import Test from './components/CaracterizarParte2/Test';
import ResultsTableContainer from './components/Utilities/ResultsTableContainer';
import GuardarModeloContainer from './components/GuardarModelo/GuardarModeloContainer';
import ProcesamientoPrevioBlankContainer from './components/Video/ProcesamientoPrevioBlankContainer';

export default function App() {
  const isLogged = useCustomSelector((state) => state.login.isLogged);
  const loading = useCustomSelector((state) => state.status.isLoading);
  const subidaExitosa = useCustomSelector((state) => state.status.isUploaded);
  const subidaFallo = useCustomSelector((state) => state.status.failUpload);
  const subidaExitosaS3 = useCustomSelector(
    (state) => state.status.isUploadedS3
  );
  const subidaFalloS3 = useCustomSelector((state) => state.status.failUploadS3);
  console.log(isLogged);
  if (isLogged) {
    return (
      <div>
        <NavegacionContainer />
        <CssBaseline />
        <Container maxWidth={false}>
          <br />
          <Routes>
            <Route path="/blank" element={<Blank />} />
            <Route path="/guardarModelo" element={<GuardarModeloContainer />} />

            <Route path="/test" element={<Test />} />
            {/* <Route path="/resTable" element={<ResultsTableContainer />} /> */}

            <Route path="/" element={<VerInicioContainer />} />
            <Route path="/caracterizar" element={<CaracterizarContainer />} />
            <Route
              path="/caracterizar2"
              element={<CaracterizarParte2Container />}
            />
            <Route path="/buscarPaciente" element={<PacientesContainer />} />
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
              path="/entrenar"
              element={<ComenzarAnalisisEntrenamientoContainer />}
            />
            <Route
              path="/resultadoEntrenar"
              element={<ResultadoEntrenarContainer />}
            />
            <Route path="/preAnalisis" element={<PreAnalisisContainer />} />
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
            <Route
              path="/crearImplementacion"
              element={<CrearImplementacionContainer />}
            />
            <Route path="/verModelo" element={<VerModeloContainer />} />
            <Route path="/verModelos" element={<VerModelosContainer />} />
            <Route path="/verProtocolo" element={<VerProtocoloContainer />} />
            <Route
              path="/verProtocoloDetalle"
              element={<VerProtocolo2Container />}
            />
            <Route path="/resultados" element={<ResultadosContainer />} />
            <Route
              path="/escogerConfiguracion"
              element={<EscogerConfiguracionContainer />}
            />
            <Route path="/prediccion" element={<PrediccionContainer />} />
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
            <Route path="/procesamientoPrevio" element={<ProcesamientoPrevioBlankContainer />} />
            
            <Route
              path="/CrearConfiguracion"
              element={<CrearConfiguracionContainer />}
            />
            <Route
              path="/probarSensores"
              element={<ProbarSensoresContainer />}
            />
            <Route path="/verAnalisis" element={<VerAnalisisContainer />} />
            <Route path="/verAnalisis2" element={<VerAnalisis2Container />} />
            <Route path="/verAlgoritmos" element={<VerAlgoritmosContainer />} />
            <Route path="/verAlgoritmo" element={<VerAlgoritmoContainer />} />
          </Routes>
          <>{loading && <Loading />}</>
          <>{subidaExitosa && <CreadoExitosamente />}</>
          <>{subidaFallo && <ErrorCrear />}</>
          <>{subidaExitosaS3 && <CargaExitosaModal />}</>
          <>{subidaFalloS3 && <ErrorModal />}</>
        </Container>
      </div>
    );
  }
  return <LoginContainer />;
}
