module.exports = async function({ name, roomid }) {
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
    return {
      error: -1,
      msg: "请求失败",
      data: "房间号不存在",
    };
  }
  console.log(name)
  // 判断昵称时候重复
  const flag = roomItem.players.some((cur) =>
    cur.name === name ? true : false
  );

  if (flag) {
    return {
      error: -2,
      msg: "请求失败",
      data: "用户昵称有重复",
    };
  }

  // 校验成功
  roomItem.players.push({
    name: name,
    role: roomItem.identities.pop(),
    status: true,
  });

  await RoomTable.save(roomItem);
  await PlayerTable.save(playerItem);

  return {
    error: 0,
    msg: "请求成功",
    data: "加入房间成功",
  };
};
