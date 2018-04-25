export default () => {
  return new Promise((resolve, reject) => {
    resolve([{ id: 1, name: 'Ryan', username: 'RG', slug: 'rg', followers: 1, following: 1 }]);
  });
}
