module.exports = async function() {
  const PlayerTable = larkcloud.db.table("players");

  const rankList = await PlayerTable.where()
    .sort({ win: -1 })
    .find();
  const res = rankList.map((cur) => ({
    name: cur.name,
    win: cur.win,
  }));
  return {
    code: 200,
    data: res,
  };
};
