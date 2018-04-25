import { get_API_URL } from '../../misc';

export default (searchField) => {
  return new Promise((resolve, reject) => {
    const path = `${get_API_URL()}/search/${searchField}`;
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

    request.open('GET', path);
    request.send();
  });
}
