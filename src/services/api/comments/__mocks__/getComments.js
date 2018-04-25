export default (tweetID) => {
  return new Promise((resolve, reject) => {
    resolve([{id: 1, user_id: 2, tweet_id: 3, body: 'Hello World', name: 'Ryan', username: 'RG', slug: 'rg', }]);
  });
}
