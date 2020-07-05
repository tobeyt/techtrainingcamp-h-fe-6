<template>
    <el-container>
        <el-card  header="【上帝操作页】" class="god-card">
            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column label="角色" width="300">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ `${scope.row.name}  是` }}</span>
                        <span style="margin-left: 10px" class="role-span">{{ `${scope.row.role}` }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                v-if="scope.row.status===true"
                                type="primary"
                                size="mini"
                                @click="handleDao(scope.$index, scope.row)">被刀</el-button>
                        <el-button
                                v-if="scope.row.status===true"
                                type="success"
                                size="mini"
                                @click="handleLie(scope.$index, scope.row)">猎杀</el-button>
                        <el-button
                                v-if="scope.row.role!=='女巫'&&scope.row.status===true"
                                type="warning"
                                size="mini"
                                @click="handleDu(scope.$index, scope.row)">毒死</el-button>
                        <el-button
                                v-if="scope.row.status===false"
                                type="danger"
                                size="mini"
                                disabled>已死亡</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button type="danger" class="endGame-button" @click="endGame">强行结束</el-button>
            </div>
        </el-card>
    </el-container>
</template>
<script>
    export default {
        name: 'God',
        data(){
            return {
                tableData: [{
                    name: 'wang',
                    role:'预言家',
                    status:true,
                }, {
                    name: 'dong',
                    role:'平民',
                    status:true,
                }, {
                    name: 'li',
                    role:'平民',
                    status:false,
                }, {
                    name: 'zhang',
                    role:'狼人',
                    status:true,
                }, {
                    name: 'yang',
                    role:'猎人',
                    status:true,
                }, {
                    name: 'huang',
                    role:'女巫',
                    status:true,
                }]
            }
        },
        mounted:function(){
            this.queryuser();//需要触发的函数
        },
        methods: {
            tableRowClassName({ row}) {
                if (row.status) {
                    return 'success-row';
                } else  {
                    return 'warning-row';
                }

            },
            handleDao(index, row) {
                console.log(index, row);
            },
            handleLie(index, row) {
                console.log(index, row);
            },
            handleDu(index, row) {
                console.log(index, row);
            },
            queryuser(){
                /*在这里进行跨域请求*/
                // this.axios({
                //     method: "post",
                //     url: "/api/"
                // })
                //     .then(res => {
                //         console.log(res);
                //         console.log(res.data);
                //         this.tableData=res.data;
                //     }).catch(function(err) {
                //     console.log(err);
                // });
                /*在这里进行跨域请求*/
            },
            endGame(){

            },
        }
    }
</script>
<style>
    .god-card {
        width: 40rem;
        margin: 6rem auto;
    }

    .endGame-button{
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
