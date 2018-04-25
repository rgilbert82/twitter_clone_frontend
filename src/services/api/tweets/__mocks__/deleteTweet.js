export default (tweetID) => {
  return new Promise((resolve, reject) => {
    resolve({ status: 'success', message: 'tweet deleted' });
  });
}
