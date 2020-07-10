module.exports = async function(params) {
  const { name, roomid } = params;
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();
  const play = {};

  roomItem.players.forEach((cur) => {
    if (cur.name === name) {
      play.role = cur.role;
      play.status = cur.status;
    }
  });
  return {
    code: 200,
    data: play,
  };
};
