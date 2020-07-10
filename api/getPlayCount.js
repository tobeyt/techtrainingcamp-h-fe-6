module.exports = async function({ roomid }) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();

  return {
    code: 200,
    count: roomItem.players.length,
  };
};
