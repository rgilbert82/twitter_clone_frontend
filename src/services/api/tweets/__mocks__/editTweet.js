export default (tweetData) => {
  return new Promise((resolve, reject) => {
    resolve({ id: 3, body: 'UPDATED', user_id: 5, slug: '12345', name: 'Ryan', username: 'RG', user_slug: 'rg' });
  });
}
