<template>
  <div class="room-container">

    
    <el-card class="home-card">
      <el-row  type="flex" class="row-bg title" >
        <i class="el-icon-s-home"> [创建房间] </i>
      </el-row >
      <el-form @submit.native.prevent="enterTheRoom">

        <el-row type="flex" class="row-bg" justify="center">
          <el-form-item label="房间号" v-model="model.password" class="font">00000
          </el-form-item>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-button type="primary" native-type="submit" class="button"
            >创建房间</el-button>
        </el-row>

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
    enterTheRoom() {
      console.log(this.model);
    },
  },
};
</script>
<style>
.title{
  color: #7babeb;
}
.font{
  color:#F56C6C;
}
</style>
