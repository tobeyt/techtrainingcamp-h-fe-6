<template>
  <div class="home-container">
    <el-card header="【首页】" class="card">
      <el-form @submit.native.prevent="enterTheGame">
        <el-form-item label="名字">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" class="button"
            >进入游戏</el-button
          >
        </el-form-item>
      </el-form>
      <div class="info">
        <el-link type="info" href="#">游戏规则说明</el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async enterTheGame() {
      const res = await this.$http.post("game", this.model);
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "加入房间成功",
      });
    },
  },
};
</script>

<style>
.card {
  width: 20rem;
  margin: 6rem auto;
}

.info {
  margin-left: 12rem;
}
</style>
