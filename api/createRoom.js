module.exports = async function({ roomid, playersNumber }, context) {
  if (!playersNumber) {
    context.status(423);
    return {
      error: -2,
      msg: "请求失败",
      data: "请选择本局游戏人数",
    };
  }
  const RoomTable = larkcloud.db.table("rooms");
  const res = await RoomTable.where({ roomid }).findOne();
  if (res) {
    context.status(422);
    return {
      error: -1,
      msg: "请求失败",
      data: "房间号已存在",
    };
  }
  // 6人：杀死所有狼人或者消灭所有村民
  // 7人：
  // 8人：
  const identities = [
    ["狼人", "狼人", "女巫", "平民", "平民", "平民"],
    ["狼人", "狼人", "女巫", "平民", "平民", "平民", "预言家"],
    ["狼人", "狼人", "狼人", "预言家", "女巫", "猎人", "平民", "平民"],
  ];
  // 洗牌算法
  let len = identities.length;
  for (let i = 0; i < identities.length; i++) {
    for (let j = identities[i].length - 1; j > 0; j--) {
      let k = Math.floor(Math.random() * (j + 1));
      [identities[i][j], identities[i][k]] = [
        identities[i][k],
        identities[i][j],
      ];
    }
  }

  const roomItem = RoomTable.create({
    roomid: roomid,
    players: [],
    playersNumber,
    identities: identities[playersNumber - 6],
    winner: [],
    loser: [],
    gameOver: false,
  });
  await RoomTable.save(roomItem);
  return {
    error: 0,
    msg: "请求成功",
    data: "创建房间成功",
  };
};
