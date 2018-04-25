export default (userId) => {
  return new Promise((resolve, reject) => {
    resolve({ status: 'success', message: 'user deleted' });
  });
}
