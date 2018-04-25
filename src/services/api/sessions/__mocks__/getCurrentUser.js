export default () => {
  return new Promise((resolve, reject) => {
    resolve({ id: 1, name: 'Ryan', username: 'RG', token: '123', slug: 'rg', followers: 1, following: 1, tweet_count: 1, retweet_count: 1 });
  });
}
