module.exports = async function({ roomid }) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();
  const count = roomItem.players.length;
  if (count > roomItem.playersNumber) {
    return {
      error: -1,
      msg: "请求失败",
      data: "超出人数限制",
    };
  }
  return {
    error: 0,
    msg: "请求成功",
    data: {
      count,
    },
  };
};
