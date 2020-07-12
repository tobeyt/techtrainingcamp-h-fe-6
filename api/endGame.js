module.exports = async function({ roomid, win }, context) {
  //win=0 都不得分 win=1 好人获胜 win=2 狼人获胜
  const RoomTable = larkcloud.db.table("rooms");
  const PlayerTable = larkcloud.db.table("players");

  const roomItem = await RoomTable.where({ roomid }).findOne();
  const playerList = await PlayerTable.where().find();


  roomItem.gameOver = true;

  if (win === 0) {
    context.status(422);
    return {
      error: -1,
      msg: "请求失败",
      data: "手动强制结束游戏，都不的分",
    };
  } else if (win === 1) {
    roomItem.players.forEach((cur) => {
      if (
        cur.role === "预言家" ||
        cur.role === "女巫" ||
        cur.role === "猎人" ||
        cur.role === "平民"
      ) {
        roomItem.winner.push({ name: cur.name, role: cur.role });
      } else {
        roomItem.loser.push({ name: cur.name, role: cur.role });
      }
    });
  } else if (win === 2) {
    roomItem.players.forEach((cur) => {
      if (cur.role === "狼人") {
        roomItem.winner.push({ name: cur.name, role: cur.role });
      } else {
        roomItem.loser.push({ name: cur.name, role: cur.role });
      }
    });
  }

  for (let i = 0; i < playerList.length; i++) {
    for (let j = 0; j < roomItem.winner.length; j++) {
      if (playerList[i].name === roomItem.winner[j].name) {
        playerList[i].win++;
      }
    }
  }
  await RoomTable.save(roomItem);
  await PlayerTable.save(playerList);

  return {
    error: 0,
    msg: "请求成功",
    data: `${win === 1 ? "好人" : "狼人"}获胜`,
  };
};
