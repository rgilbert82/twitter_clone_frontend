export default(commentID) => {
  return new Promise((resolve, reject) => {
    resolve({ status: 'success', message: 'comment deleted' });
  });
}
