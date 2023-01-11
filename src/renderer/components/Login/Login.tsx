import './Login.css';

export interface LoginProps {
  onClickLogin: () => void;
}

export const Login = (props: LoginProps) => {
  const { onClickLogin } = props;
  return (
    <div className="general-style">
      <div className="login">
        <div className="login-screen">
          <div className="app-title">
            <h1 id="my-h1login">Iniciar Sesión</h1>
          </div>
          <div className="login-form">
            <form>
              <h2 className="h2-styled">Usuario</h2>
              <input
                className="input-styled"
                type="text"
                name="username"
                placeholder="username"
                id="user"
              />
              <br />
              <br />
              <h2 className="h2-styled">Contraseña</h2>
              <input
                className="input-styled"
                type="password"
                name="password"
                placeholder="password"
                id="password"
              />
            </form>
            <br />
            <input
              id="boton_ingresar"
              className="button-styled"
              type="submit"
              value="Ingresar"
              onClick={onClickLogin}
            />
            <div>
              <h2 className="login-link">¿Olvido su contraseña?</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
