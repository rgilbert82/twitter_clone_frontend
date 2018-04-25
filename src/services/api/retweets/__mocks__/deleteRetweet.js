export default (retweetID) => {
  return new Promise((resolve, reject) => {
    resolve({ status: 'success', message: 'retweet deleted' });
  });
}
