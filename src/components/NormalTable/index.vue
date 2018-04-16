<template>
    <div>
        <div class="table-box" :style="'max-width:'+tableMaxWidth">
            <el-table v-loading="loading" :data="tableData" stripe size='mini' border @selection-change="handleSelectionChange" @sort-change='tableSort'>
                <el-table-column type="selection" align="center" width="45"></el-table-column>
                <el-table-column align="center" :label="column.text" :prop="column.prop" v-for="(column,index) in columns" :key="index" :width="column.width" :sortable='column.sort'>
                    <template slot-scope="scope">
                        <div class="overWord" v-if="column.type=='text'">
                            {{ scope.row[column.field] }}
                        </div>
                        <template v-if="column.type=='button'">
                            <template v-if="!scope.row[column.field]">
                                <el-tag size="mini" type="danger">暂无链接</el-tag>
                            </template>
                            <el-tooltip v-if="scope.row[column.field]" class="item" effect="dark" :content="scope.row[column.field]" placement="bottom">
                                <el-button type="danger" plain size="mini" @click="turnUrl(scope.row[column.field])">转跳</el-button>
                            </el-tooltip>
                        </template>
                        <template v-if="column.type=='file'">
                            <el-button type="danger" plain size="mini">查看</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "normal-table",
    props: {
        tableMaxWidth: {
            type: String
        },
        loading: {
            type: Boolean,
            default: function() {
                return false;
            }
        },
        // 这是相应的字段展示(width:表示宽度;prop:用于升降序排序用的;text:列名称;field:列属性;sort:排序[true,false,'custom'];type:['text','button','file'])
        columns: {
            type: Array,
            default: function() {
                return [];
            }
        },
        // 这是数据源
        tableData: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {};
    },
    created() {},
    methods: {
        turnUrl(url) {
            if (url) {
                window.open("http://" + url);
            } else {
                this.$message({
                    type: "warning",
                    message: "暂无链接"
                });
            }
        },
        handleSelectionChange(val) {
            this.$emit("multipleSelection", val);
        },
        tableSort(row) {
            let sortData = "";
            if (row.order == "descending") {
                sortData = row.prop + " desc";
            } else {
                sortData = row.prop;
            }
            // console.log(sortData)
            this.$emit("sort", sortData);
        }
    }
};
</script>
<style lang="scss" scoped>
.table-box {
    margin-top: 10px;
    max-width: 1666px;
}
.overWord {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

