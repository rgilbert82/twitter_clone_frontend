export default () => {
  if (process.env.NODE_ENV === 'development') {
    return "http://localhost:3001/api/v1";
  } else {
    return process.env.REACT_APP_API_URL;
  }
}
