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
            role: "",
            status: "游戏中",
            name: "",
            roomId: "",
        }
    },
    created() {
        this.name = this.$route.query.name;
        this.roomId = this.$route.query.roomId;
        this.getRoleAndStatus();
    },
    methods:{
        //获取当前角色
        getRoleAndStatus(){
            this.$http(`getRoleAndStatus?name=${this.name}&roomid=${this.roomId}`)
            .then((res)=>{
                if(res.status == 200){
                    this.setRoleAndStatus(res.data)
                }
            }).catch((reason)=>{
                console.log(reason)
            })
        },
        // 状态刷新
        refresh() {
            this.getRoleAndStatus();
            console.log("状态刷新")
        },

        //查看比赛结果
        getResult() {
            console.log("查看结果")
        },

        // 设置角色和状态
        setRoleAndStatus(data){
            this.role = data.role;
            if(data.status){
                this.status = "游戏中"
            }else {
                this.status = "已死"
            }
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