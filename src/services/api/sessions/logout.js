import { get_API_URL } from '../../misc';

export default () => {
  return new Promise((resolve, reject) => {
    const path = `${get_API_URL()}/sessions/1`;
    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject(request.responseText);
        }
      }
    };

    request.open('DELETE', path);
    request.withCredentials = true;
    request.setRequestHeader('Authorization', document.cookie || '');
    request.send();
  });
}
