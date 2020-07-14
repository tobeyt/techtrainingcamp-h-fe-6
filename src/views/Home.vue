<template>
  <div class="home-container">
    <el-card header="【首页】" class="card">
      <el-form @submit.native.prevent="enterTheGame">
        <el-form-item label="名字">
          <el-input v-model="model.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input
            v-model="model.roomid"
            type="text"
            placeholder="请输入四位数字"
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
            size="mini"
            :loading="false"
            >进入游戏</el-button
          >
        </el-form-item>
      </el-form>
      <div>
        <el-button type="success" size="mini" @click="$router.push('/room')"
          >上帝点击进入管理页</el-button
        >
        <el-link class="info" type="info" @click="$router.push('/rule')"
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
    async enterTheGame() {
      const res = await this.$http.post(`joinRoom`, {
        name: this.model.name,
        roomid: this.model.roomid,
      });
      if (res.data.error === -1) {
        this.$message.error("房间号不存在,请重新输入。");
        return;
      }
      if (res.data.error === -2) {
        this.$message.error("本房间已有此重复昵称，请重新输入。");
        return;
      }
      // 路由传参
      this.$router.push({
        path: `/player`,
        query: {
          name: this.model.name,
          roomId: this.model.roomid,
        },
      });
    },
  },
};
</script>

<style scoped>
.info {
  margin-left: 1.25rem;
}
</style>
