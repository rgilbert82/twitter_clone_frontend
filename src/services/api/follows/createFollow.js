import { get_API_URL } from '../../misc';

export default (user_id) => {
  return new Promise((resolve, reject) => {
    const path = `${get_API_URL()}/follows`;
    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          resolve(JSON.parse(request.responseText));
        } else {
          resolve(request.responseText);
        }
      }
    }

    request.open('POST', path);
    request.withCredentials = true;
    request.setRequestHeader('Authorization', document.cookie || '');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({ user_id: user_id }));
  });
}
