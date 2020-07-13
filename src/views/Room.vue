<template>
  <div class="room-container">
    <el-card class="card">
      <el-row type="flex" class="row-bg title">
        <i class="el-icon-s-home"> [创建房间] </i>
        <el-dropdown>
        <span class="el-dropdown-link row-bg" type="flex" justify="end">
          参加游戏人数<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="getPlayerNumber(num = 6)">6</el-dropdown-item>
          <el-dropdown-item @click.native="getPlayerNumber(num = 7)">7</el-dropdown-item>
          <el-dropdown-item @click.native="getPlayerNumber(num = 8)">8</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </el-row>

      <div class="show-room">
        <h4>您的房间号是:</h4>
        <h2>{{ id }}</h2>
      </div>
      <p class="wait" v-show="flag">正在等待其他玩家进入（ <span>{{enterNumber}}</span> 人 )</p>
      <div class="create">
        <el-button
          type="primary"
          native-type="submit"
          class="button"
          @click="getRoomId(len = 4,num = 0)"
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
      mark:false,
      playNumber: 0,
      enterNumber:0,
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
      this.flag = true;
      // console.log(this.id,this.playNumber);
      const res = await this.$http.post(
        "createRoom",
        { roomid: this.id,
          playNumber: this.playNumber
        }
      );
      // console.log(res);
      if (res.status !== 200) return this.$message.error('创建房间失败')
        await this.$message.success('创建房间成功')

        //轮询显示进入房间人数
        let timer = setInterval(res=> {
          this.$http.get(
            "getPlayCount",
          )
          this.enterNumber = res.data.data.count;
          console.log(res.data.data.count);
        },6000);

        //判断房间人数是否已满
        if(this.playNumber == this.enterNumber){
          clearInterval(timer);
          this.mark = !this.mark;
        } 
    },  

    //获取选择的房间人数
    getPlayerNumber(number) {
      this.playNumber = number;
      console.log(this.playNumber);
     },

     //开始游戏
     startPlay() {
       this.$router.push({path:'/gud', query:{roomid:this.id}})
     }
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
.el-dropdown {
    right: -55%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
