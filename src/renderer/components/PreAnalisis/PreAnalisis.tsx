/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen,
} from '../VerPaciente/ButtonStyle';


export interface PreAnalisisProps {
  onClickNav: (arg0: React.FormEvent<HTMLFormElement>) => void;
}

const PreAnalisis = (props: PreAnalisisProps) => {
  const { onClickNav } = props;
  return (
    <div>
      <section className="display-center">
        <h1>Informacion Acerca de los Datos</h1>
      </section>
      <div className='display-center'>
      <form className="analisis-form" onSubmit={onClickNav}>

        <section className='display-center'>
          <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} variant="contained" component="label">Comenzar
          <input hidden type="submit" />
          </Button>
        </section>
      </form>
      </div>
      <br />
    </div>
  );
};

export default PreAnalisis;
