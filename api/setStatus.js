module.exports = async function({ roomid, data }) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();

  roomItem.players = data;
  await RoomTable.save(roomItem);
  return {
    error: 0,
    msg: "请求成功",
    data: "设置状态成功",
  };
};
