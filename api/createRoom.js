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
  const identifies = [
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
  let len = identifies.length;
  for (let i = len - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [identifies[i], identifies[j]] = [identifies[j], identifies[i]];
  }
  const roomItem = RoomTable.create({
    roomid: roomid,
    players: [],
    identifies,
  });
  await RoomTable.save(roomItem);
  return {
    code: 200,
    msg: "创建房间成功",
  };
};
