import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavegacionStyle.css';

export interface NavProps {
  onClickNav: (arg0: string) => void;
}

function Navegacion(props: NavProps) {
  const { onClickNav } = props;
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="nav-bar-background"
      variant="dark"
    >
      <Container style={{ margin: '0px' }}>
        <Navbar.Brand
          style={{ cursor: 'pointer' }}
          onClick={() => onClickNav('')}
        >
          Modular
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Inicio" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => onClickNav('')}>
                Inicio
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('probarSensores')}>
                Probar Sensores
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Análisis" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => onClickNav('crearAnalisis')}>
                Crear Analisis
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('verPrediccion')}>
                Predicción
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('entrenar')}>
                Entrenamiento
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('verAnalisis')}>
                Ver Análisis
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Protocolo Adquisición"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => onClickNav('crearProtocolo')}>
                Crear Protocolo
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('verProtocolo')}>
                Ver Protocolo
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pacientes" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => onClickNav('buscarPaciente')}>
                Buscar
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('agregarPaciente')}>
                Agregar
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Configuraciones" id="collasible-nav-dropdown">
              <NavDropdown.Item
                onClick={() => onClickNav('crearConfiguracion')}
              >
                Crear Configuración
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('verConfiguracion')}>
                Ver Configuraciones
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Algoritmo" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => onClickNav('verModelos')}>
                Ver Algoritmo
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('verImplementacion')}>
                Ver Modelo
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => onClickNav('crearImplementacion')}
              >
                Crear Modelo
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;
