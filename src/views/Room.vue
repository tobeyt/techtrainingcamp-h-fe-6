<template>
  <div class="room-container">
    <el-card class="card">
      <div type="flex" class="row-bg title">
        <i class="el-icon-s-home"> [创建房间] </i>
        <div id="el">
          <el-dropdown>
            <span class="el-dropdown-link "
              >参加游戏人数
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="getPlayerNumber((num = 6))"
                >6</el-dropdown-item
              >
              <el-dropdown-item @click.native="getPlayerNumber((num = 7))"
                >7</el-dropdown-item
              >
              <el-dropdown-item @click.native="getPlayerNumber((num = 8))"
                >8</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="show-room">
        <h4>您的房间号是:</h4>
        <h2>{{ id }}</h2>
      </div>
      <p class="wait" v-show="flag">
        正在等待其他玩家进入（ <span>{{ enterNumber }}</span> 人/<span>{{
          playersNumber
        }}</span>
        人 )
      </p>
      <div class="create">
        <el-button
          type="primary"
          native-type="submit"
          class="button"
          @click="getRoomId((len = 4), (num = 0))"
          v-show="!flag"
          >创建房间</el-button
        >
        <el-button
          type="primary"
          native-type="submit"
          class="button"
          v-show="mark"
          @click="startPlay"
          >开始游戏</el-button
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
      mark: false,
      playersNumber: 0,
      enterNumber: 0,
    };
  },
  methods: {
    //生成四位不重复的随机房间号
    async getRoomId(length) {
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.id = arr
        .sort(() => Math.random() - 0.5)
        .slice(0, length)
        .join("");
      console.log(this.id, this.playersNumber);
      const res = await this.$http.post("createRoom", {
        roomid: this.id,
        playersNumber: this.playersNumber,
      });
      if (res.data.error === -2) {
        this.$message.error("请选择房间人数");
        return;
      }
      if (res.data.error === 0) {
        this.$message.success("创建房间成功");
        this.flag = true;
      }

      //轮询显示进入房间人数
      let timer = setInterval(async () => {
        const res = await this.$http.get(`getPlayCount?roomid=${this.id}`);
        this.enterNumber = res.data.data.count;
        //判断房间人数是否已满
        if (this.playersNumber === this.enterNumber) {
          this.$message.success("房间人已满，可以开始游戏！");
          clearInterval(timer);
          this.mark = !this.mark;
        }
      }, 3000);
    },

    //获取选择的房间人数
    getPlayerNumber(number) {
      this.playersNumber = number;
      this.$message.success("成功选择" + this.playersNumber + "人局");
    },

    //开始游戏
    startPlay() {
      this.$router.push({ path: "/god", query: { roomid: this.id } });
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
#el {
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: -20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
