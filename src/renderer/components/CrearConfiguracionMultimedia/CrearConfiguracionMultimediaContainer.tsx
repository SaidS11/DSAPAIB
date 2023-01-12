/* eslint-disable prettier/prettier */
import AWS from 'aws-sdk';
import { useNavigate } from 'react-router-dom';
import CrearConfiguracionMultimedia from './CrearConfiguracionMultimedia';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch , useCustomSelector } from '../../../redux/hooks';

const bucketName = 'piediabe-modular';
const bucketRegion = 'us-west-1';
const IdentityPoolIdP = 'us-west-1:248d5035-efbc-4aea-b6a8-4ce21b5427c9';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolIdP,
  }),
});

const CrearConfiguracionMultimediaContainer = () => {
  const navigate = useNavigate();
  const loggedUser = useCustomSelector((state) => state.login.loggedUser);
  console.log('key to upload ', loggedUser)
  const appDispatch = useCustomDispatch();
  const onClickNav = () => {
    // navigate('/escogerConfiguracion');
  };
  const onClickUpload = () => {
    const imgObj = document.getElementById(
      'file-upload'
    ) as HTMLInputElement | null;
    const videoObj = document.getElementById(
      'video-upload'
    ) as HTMLInputElement | null;
  
    if (imgObj !== null && videoObj!== null) {
      if (imgObj.value !== '' && videoObj.value!== '') {
        console.log(imgObj.value)
        appDispatch(setIsLoading(true));
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
        });
      }
      else {
        console.log('nada');
        alert('Seleccione los archivos');
      }
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
  return <CrearConfiguracionMultimedia onClickNav={onClickNav} onClickUpload={onClickUpload} />;
};

export default CrearConfiguracionMultimediaContainer;