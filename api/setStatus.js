module.exports = async function({ roomid, index }) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();

  roomItem.players[index].status = false;
  await RoomTable.save(roomItem);
  return {
    error: 0,
    msg: "请求成功",
    data: "设置状态成功",
  };
};
