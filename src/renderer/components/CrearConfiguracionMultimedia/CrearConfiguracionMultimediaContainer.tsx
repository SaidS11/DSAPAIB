/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-inner-declarations */
/* eslint-disable prettier/prettier */
import AWS from 'aws-sdk';
import { useNavigate } from 'react-router-dom';
import CrearConfiguracionMultimedia from './CrearConfiguracionMultimedia';
import { setFailUploadS3, setIsLoading, setIsUploadedS3 } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch , useCustomSelector } from '../../../redux/hooks';

/* const bucketName = 'piediabe-modular';
const bucketRegion = 'us-west-1';
const IdentityPoolIdP = 'us-west-1:248d5035-efbc-4aea-b6a8-4ce21b5427c9';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolIdP,
  }),
});
*/
const CrearConfiguracionMultimediaContainer = () => {
  const navigate = useNavigate();
  const loggedUser = useCustomSelector((state) => state.login.loggedUser);
  console.log('key to upload ', loggedUser)
  const primerConfig = useCustomSelector((state) => state.config.configPrimerPaso);
  console.log(primerConfig);
  const appDispatch = useCustomDispatch();
  const fileName = '';
  let fileNameVideo = '';

  const onClickBack = () => {
    navigate('/CrearConfiguracion');
  };
  const onClickUpload = async () => {
    const imgObj = document.getElementById(
      'file-upload'
    ) as HTMLInputElement | null;
    const videoObj = document.getElementById(
      'video-upload'
    ) as HTMLInputElement | null;

    if (imgObj !== null && videoObj!== null) {
      if (imgObj.value !== '' && videoObj.value!== '') {
        // console.log(imgObj.value)
        // appDispatch(setIsLoading(true));
        /*
        const s3 = new AWS.S3({
          apiVersion: '2006-03-01',
          params: { Bucket: bucketName },
        });
        // Image
        let { files } = imgObj;
        const file = files![0];
        const fileName = file.name;
        const filePath = `Imagenes/${loggedUser}/${fileName}`;
        fileImagenDB = `https://piediabe-modular.s3.us-west-1.amazonaws.com/Imagenes/${loggedUser}/${fileName}`
        const params = {
          Bucket: 'piediabe-modular',
          Key: filePath,
          Body: file,
          ACL: 'public-read',
        };
        s3.upload(params, function (err: any, res: any) {
          if (err) {
            // alert(err);
            appDispatch(setFailUploadS3(true));
          } else {
            // alert('Successfully uploaded data img');
            appDispatch(setIsUploadedS3(true));
          }
        });
        // Video
        files = videoObj.files;
        const fileVideo = files![0];
        const fileNameVideo = fileVideo.name;
        const filePathVideo = `Videos/${loggedUser}/${fileNameVideo}`;
        fileVideoDB = `https://piediabe-modular.s3.us-west-1.amazonaws.com/Videos/${loggedUser}/${fileNameVideo}`
        const paramsVideo = {
          Bucket: 'piediabe-modular',
          Key: filePathVideo,
          Body: fileVideo,
          ACL: 'public-read',
        };
        s3.upload(paramsVideo, function (err: any, res: any) {
          if (err) {
            appDispatch(setIsLoading(false));
            // alert(err);
            appDispatch(setFailUploadS3(true));
          } else {
            appDispatch(setIsLoading(false));
            appDispatch(setIsUploadedS3(true));
            // alert('Successfully uploaded data Video');
            insertConf(primerConfig);

          }
        }); */
        const {files} = imgObj
        const file = files![0]
        const fileNameImagen = file.name
        console.log(fileNameImagen)
        const rutaImagen = file.path
        console.log(rutaImagen)
        const destinoImagen = `.\\src\\main\\public\\${fileNameImagen}`
        const datosImagen = {
          ruta: rutaImagen
        }
        /* const response = await fetch("http://localhost:8000/moverArchivos", {
          method: 'POST',
          body: JSON.stringify(datosImagen),
          headers: {'Content-Type': 'application/json'}
        }); */
        // window.electron.ipcRenderer.copiarArchivo(fileImagenDB, destino);


        const files2 = videoObj.files
        const file2 = files2![0]
        fileNameVideo = file2.name
        const rutaVideo = file2.path
        console.log(rutaVideo)
        console.log(fileNameVideo)
        const destinoVideo = `.\\src\\main\\public\\${fileNameVideo}`
        const datosVideo = {
          ruta: rutaVideo
        }

        const response2 = await fetch("http://localhost:8000/moverArchivos", {
          method: 'POST',
          body: JSON.stringify(datosVideo),
          headers: {'Content-Type': 'application/json'}
        });


        // bawait window.electron.ipcRenderer.copiarArchivo(fileVideoDB, destino);
        // insertConf(primerConfig);

      }
      else {
        console.log('nada');
        alert('Seleccione los archivos');
      }

      window.electron.ipcRenderer.copiarAr((event: any, resp: any) => {
        if (resp > 0) {
          console.log(resp);
        } else {
          console.log(resp);
        }
      });

      async function insertConf(data: any) {
        appDispatch(setIsLoading(true));
        window.Bridge.insertConfiguracion(data.nombreConfig, data.giroscopio, data.frecuencia, data.ritmo, data.canales, data.acelerometro, "1", data.descripcion );
      }
      window.Bridge.insertC((event: any, resp: any) => {
        if (resp.length > 0) {
          console.log('si es', resp);
        } else {
          console.log('nada');
        }
        appDispatch(setIsLoading(false));
        insertFiles(fileNameVideo, fileName, primerConfig);
      });

      async function insertFiles(link_video: string, link_img: string, data: any) {
        appDispatch(setIsLoading(true));
        window.Bridge.insertMultimedia("Multimedia", link_video, link_img, "1", data.nombreConfig );
      }
      window.Bridge.insertM((event: any, resp: any) => {
        if (resp.length > 0) {
          console.log('si es', resp);
        } else {
          console.log('nada');
        }
        appDispatch(setIsLoading(false));
        navigate('/verConfiguracion');
      });
      /* appDispatch(setIsLoading(true));
      const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName },
      });
      const { files } = imgObj;
      const file = files![0];
      const fileName = file.name;
      const filePath = `Imagenes/${loggedUser}/${fileName}`;
      const params = {
        Bucket: 'piediabe-modular',
        Key: filePath,
        Body: file,
        ACL: 'public-read',
      };
      s3.upload(params, function (err: any, res: any) {
        if (err) {
          appDispatch(setIsLoading(false));
          alert(err);
        } else {
          appDispatch(setIsLoading(false));
          alert('Successfully uploaded data to myBucket/myKey');
        }
      }); */
    }
    else {
      alert('Seleccione los archivos');
    }
  };
  return <CrearConfiguracionMultimedia onClickBack={onClickBack} onClickUpload={onClickUpload} />;
};

export default CrearConfiguracionMultimediaContainer;
