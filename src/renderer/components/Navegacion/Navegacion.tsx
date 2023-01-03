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
        <Navbar.Brand href="#home">Modular</Navbar.Brand>
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
              <NavDropdown.Item>Predicción</NavDropdown.Item>
              <NavDropdown.Item>Entrenamiento</NavDropdown.Item>
              <NavDropdown.Item onClick={() => onClickNav('analisis')}>
                Ver Análisis
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Protocolo Adquisición"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>Crear Protocolo</NavDropdown.Item>
              <NavDropdown.Item>Ver Protocolo</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pacientes" id="collasible-nav-dropdown">
              <NavDropdown.Item>Buscar</NavDropdown.Item>
              <NavDropdown.Item>Agregar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Configuraciones" id="collasible-nav-dropdown">
              <NavDropdown.Item>Agregar Configuración</NavDropdown.Item>
              <NavDropdown.Item>Ver Configuraciones</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Modelo" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => onClickNav('verPaciente')}>
                Ver Modelos
              </NavDropdown.Item>
              <NavDropdown.Item>Implementación</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;
