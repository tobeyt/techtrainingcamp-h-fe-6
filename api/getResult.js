module.exports = async function({ roomid }) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();
  if (!roomItem.gameOver) {
    return {
      error: -1,
      msg: "请求失败",
      data: "游戏还没结束，无法获取游戏结果",
    };
  }
  if (
    roomItem.winner[0].role === "预言家" ||
    roomItem.winner[0].role === "女巫" ||
    roomItem.winner[0].role === "猎人" ||
    roomItem.winner[0].role === "平民"
  ) {
    win = 1;
  } else if (roomItem.winner[0].role === "狼人") {
    win = 2;
  }
  return {
    error: 0,
    msg: "请求成功",
    data: {
      win,
      winner: roomItem.winner,
      loser: roomItem.loser,
    },
  };
};
