module.exports = async function({ roomid, win }) {
  //win=0 都不得分 win=1 好人获胜 win=2 狼人获胜
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();
  const data = {
    winner: [],
    loser: [],
  };
  if (win === 0) {
    return {
      code: 422,
      msg: "此局游戏无效",
    };
  } else if (win === 1) {
    roomItem.players.forEach((cur) => {
      if (
        cur.role === "预言家" ||
        cur.role === "女巫" ||
        cur.role === "猎人" ||
        cur.role === "平民"
      ) {
        data.winner.push({ [cur.name]: cur.role });
      } else {
        data.loser.push({ [cur.name]: cur.role });
      }
    });
  } else if (win === 2) {
    if (cur.role === "狼人") {
      data.winner.push({ [cur.name]: cur.role });
    } else {
      data.loser.push({ [cur.name]: cur.role });
    }
  }
  return {
    code: 200,
    data,
  };
};
