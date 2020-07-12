module.exports = async function() {
  const PlayerTable = larkcloud.db.table("players");

  const rankList = await PlayerTable.where()
    .sort({ win: -1 })
    .limit(10)
    .find();

  const res = rankList.map((cur) => ({
    name: cur.name,
    win: cur.win,
  }));

  return {
    error: 0,
    msg: "请求成功",
    data: {
      rank: res,
    },
  };
};
