module.exports = async function({ roomid }) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();

  const result = roomItem.players.map((cur) => ({
    name: cur.name,
    status: cur.status,
    role: cur.role,
  }));

  return {
    error: 0,
    msg: "请求成功",
    data: {
      allPlayerStatus: result,
    },
  };
};
