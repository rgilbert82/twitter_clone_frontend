import { get_API_URL } from '../../misc';

export default (tweetData) => {
  return new Promise((resolve, reject) => {
    const path = `${get_API_URL()}/tweets/${tweetData.id}`;
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

    request.open('PUT', path);
    request.withCredentials = true;
    request.setRequestHeader('Authorization', document.cookie || '');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(tweetData));
  });
}
