<template>
  <el-container>
      <el-card  header="【角色展示页】" class="player-card">
          <div class="show-role">
              <h4>您当前的角色是：</h4>
              <h2 v-loading="loading">{{ role }}</h2>
          </div>
          <div class="status">
              <p>状态: {{ status }}</p>         
          </div>
          <div class="handle">
              <el-button size="mini" @click="update">状态刷新</el-button>
              <el-button size="mini" @click="getResult" :type="!status?'success':''">查看结果</el-button>
          </div>
      </el-card>
  </el-container>
</template>
<script>
import { throttle } from  "../common"
export default {
    data(){
        return {
            role: "",
            status: "游戏中",
            name: "",
            roomId: "",
            loading: true
        }
    },
    created() {
        this.name = this.$route.query.name;
        this.roomId = this.$route.query.roomId;
        this.getRoleAndStatus();
    },
    methods:{
        //获取当前角色
        async getRoleAndStatus(){
            let result = await this.$http(`getRoleAndStatus?name=${this.name}&roomid=${this.roomId}`)
            if(result.status == 200){
                let {data} = result;
                this.setRoleAndStatus(data);
                this.loading = false;
            }else {
                this.loading = false;
                this.role = "身份加载失败";                
                this.$message.error("网络错误");
            }
        },
        // 状态刷新

        update: throttle(async function(){
                await this.getRoleAndStatus();
                this.$message({
                    message: "状态已刷新",
                    type: "success",
                    duration: 1000
                })
        },1000),
        
        //查看比赛结果
        getResult() {
            console.log("查看结果");
        },

        // 设置角色和状态
        setRoleAndStatus(data){
            this.role = data.data.role;
            if(data.data.status){
                this.status = "游戏中";
            }else {
                this.status = "已死";
            }
        },
        
        // 节流函数
        
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
    height: 40px;
    color: purple;
}
</style>
