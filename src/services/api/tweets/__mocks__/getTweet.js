export default (tweetSlug) => {
  return new Promise((resolve, reject) => {
    resolve({ id: 1, body: 'Hello World', user_id: 5, slug: '12345', name: 'Ryan', username: 'RG', user_slug: 'rg' });
  });
}
