import { useState } from 'react';
import './Login.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { styleButtonBiggerGreen, styleButtonLogin, styleButtonVisibility } from '../VerPaciente/ButtonStyle';

export interface LoginProps {
  onClickLogin: (arg0: React.FormEvent<HTMLFormElement>) => void;
  passwordShown: boolean
  togglePassword: (arg0: React.FormEvent<HTMLFormElement>) => void;
  setPasswordShown: any;
  onClickPasswForgotten: () => void;
  onClickPasswForgottenNew: () => void;
}

export const Login = (props: LoginProps) => {
  const { onClickLogin, passwordShown, togglePassword, setPasswordShown, onClickPasswForgotten, onClickPasswForgottenNew} = props;



  return (
    <div className="general-style">
      <div className="login">
        <div className="login-screen">
        <form onSubmit={onClickLogin}>
          <div className="app-title">
            <h1 id="my-h1login">Iniciar Sesión</h1>
          </div>
          <div className="login-form">

              <h2 className="h2-styled">Usuario</h2>
              <input
                className="input-styled"
                type="text"
                name="username"
                placeholder="Usuario"
                id="user"
              />
              <br />
              <br />
              <h2 className="h2-styled">Contraseña</h2>

              <div style={{display: "flex", marginLeft: "7%"}}>
                <input
                  className="input-styled"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  id="password"
                />
                {
                  !passwordShown &&
                <Button sx={styleButtonVisibility} onClick={() => setPasswordShown(!passwordShown)} style={{position: "absolute", padding: "10px", marginLeft: "200px", color: "#302b63"}}>
                  <VisibilityIcon/>
                </Button>
                } {
                  passwordShown &&
                <Button sx={styleButtonVisibility} onClick={() => setPasswordShown(!passwordShown)} style={{position: "absolute", padding: "10px", marginLeft: "200px", color: "#302b63"}}>
                  <VisibilityOffIcon/>
                </Button>
                }
              </div>
            <br />
            <Button sx={styleButtonLogin} variant="contained" component="label" id="boton_ingresar">Ingresar
              <input hidden type="submit" />
            </Button>
            <div>
              <h2 className="login-link" onClick={onClickPasswForgotten}>Crear Cuenta</h2>
            </div>
            <div>
              <h2 className="login-link" onClick={onClickPasswForgottenNew}>¿Olvido su contraseña?</h2>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
