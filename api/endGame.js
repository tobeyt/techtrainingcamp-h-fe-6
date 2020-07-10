module.exports = async function({ roomid, win }) {
  //win=0 都不得分 win=1 好人获胜 win=2 狼人获胜
  const RoomTable = larkcloud.db.table("rooms");
  const roomItem = await RoomTable.where({ roomid }).findOne();

  const winers = [];
  if (win === 0) {
    return {
      code: 200,
      msg: "都不得分",
    };
  } else if (win === 1) {
    roomItem.players.forEach((cur) => {
      if (
        cur.role === "预言家" ||
        cur.role === "女巫" ||
        cur.role === "猎人" ||
        cur.role === "平民"
      ) {
        winers.push(cur.name);
      }
    });
  } else if (win === 2) {
    roomItem.players.forEach((cur) => {
      if (cur.role === "狼人") {
        winers.push(cur.name);
      }
    });
  }

  const PlayerTable = larkcloud.db.table("players");
  const playerList = await PlayerTable.where().find();
  for (let i = 0; i < playerList.length; i++) {
    for (let j = 0; j < winers.length; j++) {
      if (playerList[i].name === winers[j]) {
        playerList[i].win++;
      }
    }
  }

  await PlayerTable.save(playerList);
  return {
    code: 200,
    msg: `${win === 1 ? "好人" : "狼人"}获胜`,
  };
};
