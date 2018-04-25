export default (slug) => {
  return new Promise((resolve, reject) => {
    resolve({ id: 1, name: 'Ryan', username: 'RG', slug: 'rg', followers: 2, following: 1, tweet_count: 0, retweet_count: 0 });
  });
}
