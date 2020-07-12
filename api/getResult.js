module.exports = async function({ roomid }, context) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();
  if (!roomItem.gameOver) {
    context.status(422);
    return {
      error: -1,
      msg: "请求失败",
      data: "游戏还没结束，无法获取游戏结果",
    };
  }
  
  return {
    error: 0,
    msg: "请求成功",
    data: {
      winner: roomItem.winner,
      loser: roomItem.loser,
    },
  };
};
