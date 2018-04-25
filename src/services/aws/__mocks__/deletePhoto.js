import AWS from 'aws-sdk';

export default (photoKey) => {
  return new Promise((resolve, reject) => {
    resolve({ status: 'SUCCESS', message: 'image deleted' });
  });
}
