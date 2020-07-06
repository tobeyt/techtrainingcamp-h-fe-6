<template>
    <div class="rank-container">
        <el-card header="【排行榜】" class="card">
            <el-table
                :data="info"
                class="rank-table">
                <el-table-column
                    prop="name"
                    label="玩家名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="wins"
                    label="获胜数"
                    width="90">
                </el-table-column>
            </el-table>
            <div class="buttons-container">
                <el-button
                    type="primary"
                    class="back-to-home"
                    @click="() => $router.push('/')">
                    回到首页
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import {nextInt, nextString} from "../common/helpers";

export default {
    data() {
        return {
            info: []
        }
    },
    methods: {
        randomData(cnt) {
            let arr = [];
            while (cnt --) {
                const len = nextInt(18, 6);
                const name = nextString(len);
                const wins = nextInt(100);
                arr.push({name, wins});
            }
            return arr;
        }
    },
    mounted() {
        // TODO: 上一个页面可能需要传入玩家信息，让我查询这一局游戏的玩家获胜情况
        // TODO: 换成加载数据
        this.info = this.randomData(6)
            .sort((a, b) => a.wins > b.wins);
    }
}
</script>

<style type="text/css">
.rank-table {
    width: 90%;
    margin-bottom: 28px;
}

.back-to-home {
    align-self: center;
}

.buttons-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
