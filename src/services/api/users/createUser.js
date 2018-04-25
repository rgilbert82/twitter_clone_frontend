import { get_API_URL } from '../../misc';

export default (userData) => {
  return new Promise((resolve, reject) => {
    const path = `${get_API_URL()}/users`;
    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject(request.responseText);
        }
      }
    }

    request.open('POST', path);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(userData));
  });
}
