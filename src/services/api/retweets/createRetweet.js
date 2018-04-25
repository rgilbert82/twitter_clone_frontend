import { get_API_URL } from '../../misc';

export default (tweetID) => {
  return new Promise((resolve, reject) => {
    const path = `${get_API_URL()}/tweets/${tweetID}/retweet`;
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
    request.withCredentials = true;
    request.setRequestHeader('Authorization', document.cookie || '');
    request.send();
  });
}
