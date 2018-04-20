<template>
  <div>
    <div class="table-box" :style="'max-width:'+tableMaxWidth">
      <el-table v-loading="loading" :data="tableData" stripe size='mini' border @selection-change="handleSelectionChange" @sort-change='tableSort'>
        <el-table-column type="selection" align="center" width="45"></el-table-column>
        <el-table-column :align="column.textStyle" header-align='center' show-overflow-tooltip :label="column.text" :prop="column.prop" v-for="(column,index) in columns" :key="index" :width="column.width" :sortable='column.sort'>
          <template slot-scope="scope">
            <template v-if="column.type=='text'">
              <template v-if="scope.row.weightEnum&&(scope.row.weightEnum=='较高'||scope.row.weightEnum=='高')&&column.text=='项目名称'">
                <el-tag type="danger" size="mini">F</el-tag>
              </template>
              <template v-if="checkDate(scope.row.createDate)&&column.text=='项目名称'">
                <el-tag size="mini">N</el-tag>
              </template>
              <template v-if="scope.row.type=='主标'&&column.text=='项目名称'&&(tableType!='跟踪中的项目'&&tableType!='确定不报名的项目')">
                <el-tag size="mini">主</el-tag>
              </template>
              <template v-if="scope.row.type=='陪标'&&column.text=='项目名称'&&(tableType!='跟踪中的项目'&&tableType!='确定不报名的项目')">
                <el-tag size="mini">陪</el-tag>
              </template>
              <span style="cursor:pointer" @click="handleClipboard(scope.row[column.field],$event)">
                {{ scope.row[column.field] }}
              </span>
            </template>
            <template v-if="column.type=='button'">
              <template v-if="!scope.row[column.field]">
                <el-tag size="mini" type="danger">暂无链接</el-tag>
              </template>
              <el-button v-if="scope.row[column.field]" type="danger" plain size="mini" @click="turnUrl(scope.row[column.field])">转跳</el-button>
            </template>
            <template v-if="column.type=='file'">
              <el-button type="danger" plain size="mini" @click="showFileList(scope.row.fileRecordList)">查看</el-button>
            </template>
            <template v-if="column.type=='enroll'">
              <el-button type="text" size="mini" @click="enroll(scope.row,'yes')">报名</el-button>
              <el-button type="text" size="mini" @click="enroll(scope.row,'no')">不报名</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import clipboard from "@/utils/clipboard";
export default {
    name: "normal-table",
    props: {
        tableType: {
            type: String
        },
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
        handleClipboard(text, event) {
            clipboard(text, event);
        },
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
        },
        checkDate: function(value) {
            let startDate = new Date(value);
            let nowDate = new Date();
            let limitTime = 1000 * 60 * 60 * 24 * 3;
            if (
                nowDate.getTime() - startDate.getTime() <
                1000 * 60 * 60 * 24 * 3
            ) {
                return true;
            } else {
                return false;
            }
        },
        enroll(data, status) {
            this.$emit("enroll", data, status);
        },
        showFileList(data) {
            this.$emit("fileList", data);
        }
    },
    filters: {}
};
</script>
<style lang="scss" scoped>
.table-box {
    margin-top: 10px;
    max-width: 1666px;
}
.overWord {
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
}
</style>

