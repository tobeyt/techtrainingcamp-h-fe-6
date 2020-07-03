<template>
  <el-container>
      <el-card  header="【角色展示页】" class="player-card">
          <div class="show-role">
              <h4>您当前的角色是：</h4>
              <h2>{{ role }}</h2>
          </div>
          <div class="status">
              <p>状态: {{ status }}</p>         
          </div>
          <div class="handle">
              <el-button size="mini" @click="refresh">状态刷新</el-button>
              <el-button size="mini" @click="getResult">查看结果</el-button>
          </div>
      </el-card>
  </el-container>
</template>
<script>
export default {
    // 设置默认提交分支
    data(){
        return {
            role: "预言家",
            status: "游戏中"
        }
    },
    methods:{
        //获取当前角色
        getRole(){
            let arr = ["预言家","狼人","守卫","猎人","女巫","平民"];
            let random = Math.ceil( Math.random()*5);
            this.role = arr[random];
        },

        // 状态刷新
        refresh() {
            this.getRole();
            console.log("状态刷新")
        },

        //查看比赛结果
        getResult() {
            console.log("查看结果")
        }
    }
}
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
    color: purple;
}
</style>