<template>
  <div class="room-container">
    <el-card class="card">
      <el-row type="flex" class="row-bg title">
        <i class="el-icon-s-home"> [创建房间] </i>
      </el-row>
      <div class="show-room">
        <h4>您的房间号是:</h4>
        <h2>{{ id }}</h2>
      </div>
      <p class="wait" v-show="flag">正在等待其他玩家进入...</p>
      <div class="create">
        <el-button
          type="primary"
          native-type="submit"
          class="button"
          @click="getRoomId((len = 4))"
          >创建房间</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "0000",
      flag: false,
    };
  },
  methods: {
    //生成四位不重复的随机房间号
    async getRoomId(length) {
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.id = arr
        .sort(() => Math.random() - 0.5)
        .slice(0, length)
        .join("")
        .toString();
      this.flag = true;
      console.log(this.id);
      const res = await this.$http.post(
        "createRoom",
        { roomid: this.id }
      );
      console.log(res);
      if (res.data.code == 422) {
        console.log("房间号已存在");
      } else if (res.data.code == 200) {
        console.log("创建房间成功");
      }
      // this.$router.push("/gud");
      // this.$message({
      //   type: "success",
      //   message: "创建房间成功",
      // });
    },
  },
};
</script>
<style>
.title {
  color: #7babeb;
}
.show-room,
.create,
.wait {
  text-align: center;
}
h2 {
  color: #f56c6c;
}
</style>
