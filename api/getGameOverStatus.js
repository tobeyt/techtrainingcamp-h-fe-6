module.exports = async function({ roomid }) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();
  return {
    error: 0,
    msg: "请求成功",
    data: {
      gameOver: roomItem.gameOver,
    },
  };
};
