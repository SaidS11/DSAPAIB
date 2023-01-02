// import { Client } from "pg";
// eslint-disable-next-line import/no-named-as-default
import Login from './Login';
// import { Pool } from "pg";
// import { useNavigate } from "react-router-dom";
import { useCustomDispatch } from '../../../redux/hooks';
import { setIsLogged } from '../../../redux/slices/LoginSlice';

const LoginContainer = () => {
  // const navigate = useNavigate();
  const appDispatch = useCustomDispatch();

  async function loadData() {
    window.Bridge.selectPaciente();
  }
  const onClickLogin = () => {
    // navigate("/base");
    appDispatch(setIsLogged(true));
    loadData();
  };

  /* const credenciales = {
    user: "postgres",
    host: "modulardb.coxrmuefwyts.us-east-1.rds.amazonaws.com",
    database: "ModularDB",
    password: "219748227",
  };
  const pool = new Pool(credenciales);

  async function prueba2() {
    const query = await pool.query("select * from paciente");
    console.log(query.rows);
  }
  void prueba2();
 */
  /* const client = new Client({
    user: "postgres",
    host: "modulardb.coxrmuefwyts.us-east-1.rds.amazonaws.com",
    database: "ModularDB",
    password: "219748227",
    port: 5432,
    ssl: { rejectUnauthorized: false },
  });
  client.connect();
  client
    .query("select * from paciente")
    .then((response) => {
      console.log(response.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    }); */

  return <Login onClickLogin={onClickLogin} />;
};

export default LoginContainer;
