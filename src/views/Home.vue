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
          <el-button type="primary" native-type="submit">进入游戏</el-button>
        </el-form-item>
      </el-form>
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
    },
  },
};
</script>

<style>
.home-card {
  width: 25rem;
  margin: 6rem auto;
}
</style>
