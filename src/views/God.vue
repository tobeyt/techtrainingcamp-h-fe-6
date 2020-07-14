<template>
  <el-container>
    <el-card header="【上帝操作页】" class="god-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="角色" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ `${scope.row.name}  是` }}</span>
            <span style="margin-left: 10px" class="role-span">{{
              `${scope.row.role}`
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === true"
              type="primary"
              size="mini"
              @click="handleKill(scope.$index, scope.row)"
              >被刀</el-button
            >
            <el-button
              v-if="scope.row.status === true"
              type="success"
              size="mini"
              @click="handleKill(scope.$index, scope.row)"
              >猎杀</el-button
            >
            <el-button
              v-if="scope.row.role !== '女巫' && scope.row.status === true"
              type="warning"
              size="mini"
              @click="handleKill(scope.$index, scope.row)"
              >毒死</el-button
            >
            <el-button
              v-if="scope.row.status === false"
              type="danger"
              size="mini"
              disabled
              >已死亡</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button type="danger" @click="endGame(0)">强行结束</el-button>
        <el-button type="primary" @click="endGame(1)">神民胜利</el-button>
        <el-button type="warning" @click="endGame(2)">狼人胜利</el-button>
      </div>
    </el-card>
  </el-container>
</template>
<script>
export default {
  name: "God",
  props: ["roomId"],
  data() {
    return {
      tableData: [],
    };
  },
  mounted: function() {
    this.queryuser(); //需要触发的函数
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.status) {
        return "success-row";
      } else {
        return "warning-row";
      }
    },
    async handleKill(index, row) {
      console.log(index, row);
      this.tableData[index].status = false;
      console.log(this.tableData);
      await this.$http(`setStatus?index=${index}&&roomid=${this.roomId}`);
    },
    async queryuser() {
      this.roomId = 1234;
      let result = await this.$http(`getStatus?roomid=${this.roomId}`);
      this.tableData = result.data.data.allPlayerStatus;
    },
    async endGame(type) {
      console.log(type);
      await this.$http(`endGame?win=${type}&&roomid=${this.roomId}`);
      if (type === 0) {
        this.$router.push("/room");
      } else {
        this.$router.push("/result");
      }
    },
  },
};
</script>
<style>
.god-card {
  width: 40rem;
  margin: 6rem auto;
}

.endGame-button {
  width: 20%;
  position: relative;
  left: 40%;
  top: 10px;
}

.role-span {
  color: crimson;
  font-weight: bold;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
