module.exports = async function({ roomid }) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();

  const result = roomItem.players.map((cur) => ({
    name: cur.name,
    status: cur.status,
    role: cur.role,
  }));

  return {
    code: 200,
    data: result,
  };
};
