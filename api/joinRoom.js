module.exports = async function(params, context) {
  // 获取参数
  const { name, roomid } = params;

  // 获得表对象
  const RoomTable = larkcloud.db.table("rooms");
  const PlayerTable = larkcloud.db.table("players");

  // 将用户插入排行榜，如果存在这不操作，如果不存在则初始化这个用户
  let playerItem = await PlayerTable.where({ name }).findOne();
  if (!playerItem) {
    playerItem = PlayerTable.create({ name, win: 0 });
  }

  // 判断房间号时候存在
  const roomItem = await RoomTable.where({
    roomid,
  }).findOne();

  if (!roomItem) {
    context.status(422);
    return {
      code: 422,
      msg: "房间号不存在",
    };
  }

  // 判断昵称时候重复
  roomItem.players.forEach((cur, index) => {
    if (cur.name === name) {
      context.status(422);
      return {
        code: 422,
        msg: "用户昵称有重复",
      };
    }
  });

  // 校验成功
  roomItem.players.push({
    name: name,
    role: roomItem.identifies.pop(),
    status: true,
  });

  await RoomTable.save(roomItem);
  await PlayerTable.save(playerItem);

  return {
    code: 200,
    msg: "加入房间成功",
  };
};
