exports.run = (message) => {
  let nickname = null;
  if (message.member.nickname) {
    nickname = message.member.nickname;
  } else {
    nickname = message.author.username;
  }

  return nickname;
};