export default (userData) => {
  return new Promise((resolve, reject) => {
    resolve({ id: 1, name: 'Ryan', username: 'RG', password: 'password', token: '12345', slug: 'rg' });
  });
}
