module.exports = async function(params, context) {
  const roomid = params.roomid;
  const RoomTable = larkcloud.db.table("rooms");
  const res = await RoomTable.where({ roomid }).findOne();
  if (res) {
    return {
      code: 422,
      msg: "房间号已存在",
    };
  }
  const identities = [
    "狼人",
    "狼人",
    "狼人",
    "预言家",
    "女巫",
    "猎人",
    "平民",
    "平民",
  ];
  // 洗牌算法
  let len = identities.length;
  for (let i = len - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [identities[i], identities[j]] = [identities[j], identities[i]];
  }
  const roomItem = RoomTable.create({
    roomid: roomid,
    players: [],
    identities,
  });
  await RoomTable.save(roomItem);
  return {
    code: 200,
    msg: "创建房间成功",
  };
};
