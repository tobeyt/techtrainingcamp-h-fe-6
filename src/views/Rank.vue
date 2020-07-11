<template>
    <div class="rank-container">
        <el-card header="【排行榜】" class="rank-card">
            <el-table
                :data="info"
                class="rank-table">
                <el-table-column
                    prop="name"
                    label="玩家名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="win"
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
                const win = nextInt(100);
                arr.push({name, win});
            }
            return arr;
        },
        async getRankData() {
            const res = await this.$http.get("https://afxltd.fn.thelarkcloud.com/getRank");
            const obj = {name: 'NO NAME', win: 0};
            return res.data.data.map(ii => ({...obj, ...ii}));
        }
    },
    async mounted() {
        // this.info = this.randomData(6)
        //     .sort((a, b) => a.wins > b.wins);
        this.info = await this.getRankData();
        console.log(this.info)
    }
}
</script>

<style type="text/css">
.rank-card {
    width: 20rem;
    margin: 6rem auto;
}

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
