<template>
  <div class="home-container">
    <el-card header="【首页】" class="card">
      <el-form @submit.native.prevent="enterTheGame">
        <el-form-item label="名字">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input
            v-model="model.roomid"
            type="text"
            placeholder="请输入四位字符"
            minlength="4"
            maxlength="4"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            class="button"
            :loading="false"
            >进入游戏</el-button
          >
        </el-form-item>
      </el-form>
      <div class="info">
        <el-link type="info" @click="$router.push('/rule')"
          >游戏规则说明</el-link
        >
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
          name: this.model.name,
          roomId: this.model.roomid
        }
      });
    },
  },
};
</script>

<style scoped>
.home-card {
  width: 25rem;
  margin: 6rem auto;
}

.info {
  margin-left: 12rem;
}
</style>
