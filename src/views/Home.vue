<template>
  <div class="home-container">
    <el-card header="【首页】" class="home-card">
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
    enterTheGame() {
      console.log(this.model);
      // 路由传参
      this.$router.push({
        path: `/player`,
        query: {
          name: this.model.username,
          roomId: this.model.password
        }
      });
    },
  },
};
</script>

<style>
.home-card {
  width: 20rem;
  margin: 6rem auto;
}

.info {
  margin-left: 12rem;
}
</style>
