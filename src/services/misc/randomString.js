export default (strLength) => {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = strLength; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
