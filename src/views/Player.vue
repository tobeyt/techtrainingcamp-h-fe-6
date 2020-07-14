<template>
  <el-container>
    <el-card header="【角色展示页】" class="player-card">
      <div class="show-role">
        <h4>您当前的角色是：</h4>
        <h2 v-loading="loading">{{ role }}</h2>
      </div>
      <div class="status">
        <p>状态: {{ status }}</p>
      </div>
      <div class="handle">
        <el-button @click="update" type="primary">状态刷新</el-button>
        <el-button @click="getResult" :disabled="!isOver">查看结果</el-button>
      </div>
    </el-card>
  </el-container>
</template>
<script>
import { throttle } from "../common";
export default {
  data() {
    return {
      role: "",
      status: "游戏中",
      name: "",
      roomId: "",
      isOver: false,
      loading: true,
      timer: "",
    };
  },
  created() {
    this.name = this.$route.query.name;
    this.roomId = this.$route.query.roomId;
    this.getRoleAndStatus();
  },
  //页面挂载时设置一个定时器，每隔3s对当前状态进行一次刷新
  mounted() {
    this.timer = setInterval(this.update, 3000);
  },
  // 监控isOver的变化，当isOver发生改变时，清除定时器
  watch: {
    isOver(val, newVal) {
      console.log(val + " , " + newVal);
      clearInterval(this.timer);
    },
  },
  methods: {
    //获取当前角色
    async getRoleAndStatus() {
      try {
        let result = await this.$http(
          `getRoleAndStatus?name=${this.name}&roomid=${this.roomId}`
        );
        if (result.status == 200) {
          let { data } = result.data;
          //将获取的数据传入setRoleAndStatus中，以便设置当前的角色以及状态
          this.setRoleAndStatus(data);
          this.loading = false;
        }
        console.log(result);
      } catch (err) {
        this.loading = false;
        this.role = "身份加载失败";
      }
    },

    // 状态刷新
    update: throttle(async function() {
      try {
        await this.getRoleAndStatus();
        await this.getGameOverStatus(this.name, this.roomId);
        this.$message({
          message: "状态已刷新",
          type: "success",
          duration: 800,
        });
      } catch (err) {
        clearInterval(this.timer);
        this.$message({
          message: "网络错误",
          type: "error",
          duration: 800,
        });
        console.log(err);
      }
    }, 1000),

    //查看比赛结果
    getResult() {
      console.log("查看结果");
    },

    // 设置角色和状态
    setRoleAndStatus(data) {
      this.role = data.data.role;
      if (data.data.status) {
        this.status = "游戏中";
      } else {
        this.status = "已死";
      }
    },

    // 设置当前游戏是否结束
    setEndGame(flag) {
      this.isOver = flag;
    },

    //发起请求获取当前的游戏状态
    async getGameOverStatus(name, roomId) {
      let res = await this.$http(
        `getGameOverStatus?name=${name}&roomid=${roomId}`
      );
      if (res.status == 200) {
        let { gameover } = res.data;
        this.setEndGame(gameover);
        console.log(res);
      }
    },
  },
};
</script>
<style>
.player-card {
  width: 20rem;
  margin: 6rem auto;
}

.show-role,
.status,
.handle {
  text-align: center;
}

.show-role h2 {
  height: 40px;
  color: purple;
}
</style>
