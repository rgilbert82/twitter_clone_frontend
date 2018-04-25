import AWS from 'aws-sdk';

export default (userID) => {
  return new Promise((resolve, reject) => {
    const photo = document.getElementById('photo_upload').files[0];
    const dtString = new Date().toISOString().replace(/\W/g, '');
    let photoPath = '';
    let s3;

    if (photo) {
      AWS.config.update({
        credentials: new AWS.Credentials(process.env.REACT_APP_AWS_ID, process.env.REACT_APP_AWS_SECRET),
        region: 'us-east-1'
      });

      s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: process.env.REACT_APP_AWS_BUCKET }
      });

      s3.upload({
        Key: `photos/${userID}/${dtString}/${photo.name}`,
        Body: photo,
        'ContentType': 'image/jpeg',
        ACL: 'public-read'
      }, (err, data) => {
        if (err) {
          this.props.displayMessage('There was an error uploading the photo');
        } else {
          photoPath = data.Location;
        }

        resolve(photoPath);
      });
    } else {
      resolve(photoPath);
    }
  });
}
