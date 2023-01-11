import AWS from 'aws-sdk';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import CrearAnalisis from './CrearAnalisis';
import { useCustomDispatch } from '../../../redux/hooks';

// Bucket Configurations

const bucketName = 'piediabe-modular';
const bucketRegion = 'us-west-1';
const IdentityPoolIdP = 'us-west-1:248d5035-efbc-4aea-b6a8-4ce21b5427c9';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolIdP,
  }),
});

/* AWS.config.update({
  accessKeyId: "AKIA2XIFUZRONKXNFOEB",
  secretAccessKey: "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",
}); // for simplicity. In prod, use loadConfigFromFile, or env variables */

const CrearAnalisisContainer = () => {
  const appDispatch = useCustomDispatch();
  const onClickUpload = () => {
    const filesObj = document.getElementById(
      'file-upload'
    ) as HTMLInputElement | null;
    // var filesObj = document.getElementById('file-upload');
    // const albumName = "photos";
    if (filesObj !== null) {
      // var s3 = new AWS.S3();
      appDispatch(setIsLoading(true));
      const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName },
      });
      const { files } = filesObj;
      const file = files![0];
      const fileName = file.name;
      const filePath = `my-first-bucket-path/${fileName}`;
      const params = {
        Bucket: 'piediabe-modular',
        Key: filePath,
        Body: file,
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

      /* var files = filesObj.files;
      var file = files[0];
      var fileName = file.name;
      // var albumPhotosKey = encodeURIComponent(albumName) + "/";

      var photoKey = 'my-first-bucket-path/' + fileName;

      // Use S3 ManagedUpload class as it supports multipart uploads
      var upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: bucketName,
          Key: photoKey,
          Body: file,
          ACL: 'public-read'
        }
      });

      var promise = upload.promise();

      promise.then(
        function(data) {
          alert("Successfully uploaded photo.");
        },
        function(err) {
          return alert("There was an error uploading your photo: ", err.message);
        }
      ); */

      /* var files = filesObj.files;
      var file = files[0];
      var fileName = file.name;
      var filePath = 'my-first-bucket-path/' + fileName;
      var fileUrl = 'https://' + 'us-west-1' + '.amazonaws.com/my-    first-bucket/' +  filePath;
      const params = {
        Key: filePath,
        Body: file,
        ACL: 'public-read'
      }
      s3.upload(params, (err, data) => {
        if (err) {
          alert(err)
        } else {
          alert(data.Location)
        }
      }); */
    }
    /* if (files) 
    {
      var file = files[0];
      var fileName = file.name;
      var filePath = 'my-first-bucket-path/' + fileName;
      var fileUrl = 'https://' + 'us-west-1' + '.amazonaws.com/my-    first-bucket/' +  filePath;
      s3.upload({
          Key: filePath,
          Body: file,
          ACL: 'public-read'
          }, function(err, data) {
          if(err) {
          reject('error');
          }
          alert('Successfully Uploaded!');
          }).on('httpUploadProgress', function (progress) {
          var uploaded = parseInt((progress.loaded * 100) / progress.total);
          $("progress").attr('value', uploaded);
        });
    } */
  };
  return <CrearAnalisis onClickUpload={onClickUpload} />;
};

export default CrearAnalisisContainer;
/* function reject(arg0: string) {
  throw new Error('Function not implemented.');
} */
