<template>
  <div class="home-container">
    <el-card v-loading="loading" class="home-card">
      <div class="header">
        <h3 slot="header">游戏结果</h3>
        <h3>
          {{
            winStatus === -1
              ? "获得结果中..."
              : winStatus === 0
              ? "平局"
              : winStatus === 1
              ? "好人胜利"
              : "狼人胜利"
          }}
        </h3>
      </div>
      <el-divider content-position="center" class="title">胜利</el-divider>
      <el-table stripe border :data="winnerData" style="width: 100%">
        <el-table-column align="center" prop="name" label="姓名"> </el-table-column>
        <el-table-column align="center" prop="role" label="身份"> </el-table-column>
      </el-table>
      <el-divider content-position="center" class="title">失败</el-divider>
      <el-table stripe border :data="loserData" style="width: 100%">
        <el-table-column align="center" prop="name" label="姓名"> </el-table-column>
        <el-table-column align="center" prop="role" label="身份"> </el-table-column>
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
      loading: true,
      winStatus: -1,
      winnerData: [],
      loserData: [],
    };
  },
  methods: {
    gotoHome() {
      this.$router.push("/");
    },
    gotoRank() {
      this.$router.push("/rank");
    },
    async getResult() {
      const res = await this.$http.get("getResult", { roomid: this.$route.params.roomid });
      if (!res.data || res.data.error !== 0) {
        this.$message({
          message: (res.data.data && res.data.msg) || "获取数据失败",
          type: "error",
        });
      } else {
        this.winStatus = (res.data.data && res.data.data.win) || 0;
        this.winnerData = (res.data.data && res.data.data.winner) || [];
        this.loserData = (res.data.data && res.data.data.loser) || [];
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getResult();
  },
};
</script>

<style scoped>
.el-divider__text.is-center {
  font-size: 1.2rem;
}
.header {
  text-align: center;
  font-size: 1.3rem;
}
.home-card {
  width: 20rem;
  margin: 6rem auto;
}
.info {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
}
</style>
