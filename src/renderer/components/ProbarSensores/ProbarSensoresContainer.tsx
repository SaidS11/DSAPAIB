import { useState } from 'react';
import { useCustomDispatch } from 'redux/hooks';
import { setIsLoading } from 'redux/slices/StatusSlice';
import ModalSensores from './ModalSensores';
import ProbarSensores from './ProbarSensores';

const ProbarSensoresContainer = () => {
  /* const dataX: Number[] = [];
  const dataY: Number[] = []; */
  const onClickAdd = () => {};
  const [dataXParam, setDataXParam] = useState([]);
  const [dataYParam, setDataYParam] = useState([]);
  const arr: any = [];
  const [sensoresSelected, setSensoresSelected] = useState(0);
  const appDispatch = useCustomDispatch();
  const [open, setOpen] = useState(true);
  const toggleModal = () => {
    if (sensoresSelected !== 0) {
      setOpen(!open);
    } else {
      alert('Seleccione una cantidad');
    }
  };
  async function loadSensores() {
    console.log('Getting message');
    window.Bridge.sensores();
  }
  window.Bridge.senso((event: any, resp: any) => {
    // console.log("Los arreglos", dataXParam);
    arr.push(resp);
    // console.log("Los arreglos 2", dataYParam);
    // const numY = dataYParam.at(-1) + 1;
    // setDataXParam(dataXParam.concat(parseInt(resp)));
    // setDataYParam(dataYParam.concat(numY));
    // let buffer = '';
    // let sum = 0;
    // let gsrAverage = 0;
    // let hr = 0;
    // for (let i = 0; i < 10; i++) {
    //   buffer = '';
    //   buffer += resp;
    //   console.log(buffer);
    //   sum += parseInt(buffer);
    // }
    // gsrAverage = sum / 10;
    // console.log('Gsr Average', gsrAverage);
    // hr = ((1024 + 2 * gsrAverage) * 1000) / (512 - gsrAverage);
    // console.log('GSR', hr);
  });

  // async function stopSensores() {
  //   console.log('Getting message stop');
  //   window.Bridge.sensoresStop();
  // }
  // window.Bridge.sensoStop((event: any, resp: any) => {
  //   appDispatch(setIsLoading(true));
  //   console.log(resp);
  //   console.log('This was collected', arr);
  //   const innerX: any = [...Array(arr.length).keys()];
  //   console.log('Inner', innerX);
  //   setDataYParam(arr);
  //   setDataXParam(innerX);
  //   appDispatch(setIsLoading(false));
  // });
  const onClickNav = () => {
    // loadSensores();
  };
  const onClickStop = () => {
    // stopSensores();
  };
  // return <ProbarSensores onClickAdd={onClickAdd} dataX={dataX} dataY={dataY} />;
  console.log('Seleccionados', sensoresSelected);
  return (
    <div>
      <ProbarSensores
        sensoresSelected={sensoresSelected}
        onClickNav={onClickNav}
        onClickStop={onClickStop}
        dataXParam={dataXParam}
        dataYParam={dataYParam}
      />
      ;
      {open && (
        <ModalSensores
          toggleModal={toggleModal}
          open={open}
          setSensoresSelected={setSensoresSelected}
        />
      )}
    </div>
  );
};

export default ProbarSensoresContainer;
