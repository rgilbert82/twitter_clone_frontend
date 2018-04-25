export default (tweetData) => {
  return new Promise((resolve, reject) => {
    resolve({ body: 'Hello World', user_id: 5, slug: '12345' });
  });
}
