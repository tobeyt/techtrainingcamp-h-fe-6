module.exports = async function({ name, roomid }) {
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();
  const play = {};

  roomItem.players.some((cur) => {
    if (cur.name === name) {
      play.role = cur.role;
      play.status = cur.status;
      return true;
    }
  });
  return {
    error: 0,
    msg: "请求成功",
    data: {
      role: play.role,
      status: play.status,
    },
  };
};
