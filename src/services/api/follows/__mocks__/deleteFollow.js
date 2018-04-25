export default (user_id) => {
  return new Promise((resolve, reject) => {
    resolve({ status: 'success', message: 'follow deleted' });
  });
}
