<template>
  <div class="home-container">
    <el-card header="游戏结果" class="home-card">
      <el-divider content-position="center" class="title">胜利</el-divider>
      <el-table :data="winnerData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="role" label="身份"> </el-table-column>
      </el-table>
      <el-divider content-position="center" class="title">失败</el-divider>
      <el-table :data="loserData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="role" label="身份"> </el-table-column>
      </el-table>
      <div class="info">
        <el-button type="primary" @click="gotoHome">回到首页</el-button>
        <el-button type="primary" @click="gotoRank">排行版</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Result",
  data() {
    return {
      winnerData: [],
      loserData: []
    };
  },
  methods: {
    gotoHome() {
      this.$router.push("/");
    },
    gotoRank() {
      this.$router.push("/rank");
    },
    async getResultData() {
      const res = await this.$http.get("getResult", { roomid: this.id });
      if (!res.data || res.data.code !== 200) {
        this.$message({
          message: (res.data && res.data.msg) || "获取数据失败",
          type: "warning"
        });
      } else {
        this.winnerData = (res.data.data && res.data.data.winner) || [];
        this.loserData = (res.data.data && res.data.data.loser) || [];
      }
    }
  },
  mounted() {
    this.getResultData();
  }
};
</script>

<style scoped>
.el-divider__text.is-center {
  font-size: 1.3rem;
}
.home-card {
  width: 20rem;
  margin: 6rem auto;
}

.info {
  display: flex;
  justify-content: space-around;
}
</style>


