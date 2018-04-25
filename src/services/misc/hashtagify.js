export default (tweet) => {
  let tweetStr = '';

  if (typeof tweet === 'string') {
    tweetStr = tweet.replace(/\B#(\w|\d){1,}/g, (str) => {
      return "<a href=''>" + str + "</a>";
    });

    return tweetStr;
  } else {
    return tweetStr;
  }
}
