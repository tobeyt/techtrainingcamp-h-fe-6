module.exports = async function({ roomid, data }) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();

  roomItem.players = data;
  await RoomTable.save(roomItem);
  return {
    code: 200,
    msg: "设置状态成功",
  };
};
