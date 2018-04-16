<template>
    <div class="app-container">

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="跟踪中的项目" name="跟踪中的项目">
                <el-row type="flex" justify="end">
                    <el-col style="width:400px;margin-bottom:10px;">
                        <el-input placeholder="请输入内容" v-model="trackTable.searchText" class="input-with-select" size='mini'>
                            <el-select v-model="trackTable.select" slot="prepend" placeholder="请选择" style="width:100px;">
                                <el-option label="项目名称" value="name"></el-option>
                                <el-option label="编号" value="biddingNo"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col>
                        <el-button size="mini" type="primary" plain @click="addBidding">新增项目</el-button>
                        <el-button size="mini" type="success" plain @click="modifyBidding">修改项目</el-button>
                        <el-button size="mini" type="info" plain @click="deleteBidding">删除项目</el-button>
                        <el-button size="mini" type="danger" plain @click="showTrackBidding">预览</el-button>
                        <el-button size="mini" type="danger" plain>报名</el-button>
                        <el-button size="mini" type="danger" plain>不报名</el-button>
                    </el-col>
                </el-row>
                <normaltable tableType='跟踪中的项目' :loading='trackTable.loading' :tableMaxWidth='trackTable.tableMaxWidth' :columns='trackColumns' :tableData='trackTableData' @multipleSelection='multipleSelections' @sort='trackTableSort'></normaltable>
                <div class="pagination-box">
                    <el-pagination background layout="prev, pager, next,sizes,total" :total="trackTable.total" :page-sizes="[10, 15, 20,25]" :page-size="trackTable.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="确定报名的项目" name="确定报名的项目">
                <el-row type="flex" justify="end">
                    <el-col style="width:400px;margin-bottom:10px;">
                        <el-input placeholder="请输入内容" v-model="checkTable.searchText" class="input-with-select" size='mini'>
                            <el-select v-model="checkTable.select" slot="prepend" placeholder="请选择" style="width:100px;">
                                <el-option label="项目名称" value="name"></el-option>
                                <el-option label="编号" value="biddingNo"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col>
                        <el-button size="mini" type="success" plain @click="modifyBidding">修改项目</el-button>
                        <el-button size="mini" type="info" plain @click="deleteBidding">删除项目</el-button>
                        <el-button size="mini" type="danger" plain @click="showTrackBidding">预览</el-button>
                        <el-button size="mini" type="danger" plain>中标</el-button>
                        <el-button size="mini" type="danger" plain>不中标</el-button>
                        <el-button size="mini" type="danger" plain>弃标</el-button>
                    </el-col>
                </el-row>
                <normaltable tableType='跟踪中的项目' :loading='checkTable.loading' :tableMaxWidth='checkTable.tableMaxWidth' :columns='checkColumns' :tableData='checkTableData' @multipleSelection='multipleSelections' @sort='trackTableSort'></normaltable>
                <div class="pagination-box">
                    <el-pagination background layout="prev, pager, next,sizes,total" :total="checkTable.total" :page-sizes="[10, 15, 20,25]" :page-size="checkTable.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="确定不报名的项目" name="确定不报名的项目">确定不报名的项目</el-tab-pane>
            <el-tab-pane label="已投标的项目中标" name="已投标的项目中标">已投标的项目(中标)</el-tab-pane>
            <el-tab-pane label="已投标的项目未中标" name="已投标的项目未中标">已投标的项目(未中标)</el-tab-pane>
            <el-tab-pane label="弃标的项目" name="弃标的项目">弃标的项目</el-tab-pane>
        </el-tabs>
        <!-- 新增投标 -->
        <el-dialog :visible.sync="dialogVisible" width="900px" center lock-scroll @close='closeDialog'>
            <div class="dialog-title">{{dialogTitle}}</div>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline="true">
                <el-form-item label="项目名称：" prop="name">
                    <el-input size="mini" v-model="form.name" clearable style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="权重：" prop="weightEnum">
                    <el-select size="mini" v-model="form.weightEnum" placeholder="请选择" style="width:85px;">
                        <el-option label="低" value="低"></el-option>
                        <el-option label="较低" value="较低"></el-option>
                        <el-option label="一般" value="一般"></el-option>
                        <el-option label="较高" value="较高"></el-option>
                        <el-option label="高" value="高"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="编号：" prop="biddingNo">
                    <el-input size="mini" v-model="form.biddingNo" clearable style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="公告链接：" prop="announcementLink">
                    <el-input size="mini" v-model="form.announcementLink" clearable style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="公告时间：" prop="announcementTime">
                    <el-date-picker size="mini" type="date" value-format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期" v-model="form.announcementTime" style="width:135px"></el-date-picker>
                </el-form-item>
                <el-form-item label="预计得分：" prop="expectedScore">
                    <el-input size="mini" type="number" v-model="form.expectedScore" clearable style="width:100px;"></el-input>
                </el-form-item>
                <el-form-item label="报名要求：" prop="reqistrationRequire">
                    <el-input size="mini" type="textarea" v-model="form.reqistrationRequire" clearable style="width:652px;"></el-input>
                </el-form-item>
                <el-form-item label="公告联系方式：" prop="announcementContactInfo">
                    <el-input size="mini" type="textarea" v-model="form.announcementContactInfo" clearable style="width:652px;"></el-input>
                </el-form-item>
                <el-form-item label="文件上传：" prop="remark">
                    <upload v-bind="uploadData" :materialfileList.sync='uploadData.materialfileList' :buttonFlag.sync='uploadData.buttonFlag'></upload>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input size="mini" type="textarea" v-model="form.remark" clearable style="width:652px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="submitBidding('form')" :disabled='uploadData.buttonFlag'>确 定</el-button>
                <el-button size="mini" type="danger" @click="cancelSubmit('form')" :disabled='uploadData.buttonFlag'>取 消</el-button>
            </span>
        </el-dialog>

        <!-- 预览模块 -->
        <el-dialog :visible.sync="showBiddingVisible" width="700px">
            <div class="dialog-title">投标详情</div>
            <div class="content">
                <svg-icon icon-class='process'></svg-icon>
                项目名字：{{tempBiddingData.name}}
            </div>
            <div class="content">
                <el-row>
                    <el-col :span="8">
                        <svg-icon icon-class='logistic'></svg-icon>
                        编号: {{tempBiddingData.biddingNo}}
                        <template v-if="tempBiddingData&& !tempBiddingData.biddingNo">
                            <el-tag size="mini" type="danger">暂无编号</el-tag>
                        </template>
                    </el-col>
                    <el-col :span="8">
                        <svg-icon icon-class='clock'></svg-icon>
                        公告时间: {{tempBiddingData.announcementTime}}
                        <template v-if="tempBiddingData&& !tempBiddingData.announcementTime">
                            <el-tag size="mini" type="danger">暂无公告时间</el-tag>
                        </template>
                    </el-col>
                    <el-col :span="8">
                        <svg-icon icon-class='logistic'></svg-icon>
                        预计得分: {{tempBiddingData.expectedScore}}
                        <template v-if="tempBiddingData&& !tempBiddingData.expectedScore">
                            <el-tag size="mini" type="danger">暂无预计得分</el-tag>
                        </template>
                    </el-col>
                </el-row>

            </div>
            <div class="content">
                <svg-icon icon-class='logistic'></svg-icon>
                公告链接: {{tempBiddingData.announcementLink}}
                <template v-if="tempBiddingData&& !tempBiddingData.announcementLink">
                    <el-tag size="mini" type="danger">暂无公告链接</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='attachment'></svg-icon>
                报名要求： {{tempBiddingData.reqistrationRequire}}
                <template v-if="tempBiddingData&& !tempBiddingData.reqistrationRequire">
                    <el-tag size="mini" type="danger">暂无报名要求</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='house'></svg-icon>
                公告联系方式： {{tempBiddingData.announcementContactInfo}}
                <template v-if="tempBiddingData&& !tempBiddingData.announcementContactInfo">
                    <el-tag size="mini" type="danger">暂无公告联系方式</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='feiji'></svg-icon>
                文件上传：
                <template v-if="tempBiddingData.fileRecordList&& tempBiddingData.fileRecordList.length!=0">
                    <span class="fileItem" :key="index" v-for="(item,index) in tempBiddingData.fileRecordList ">{{item.name}}
                        <el-tag size="mini" @click.native="turnUrl('182.61.47.252:9998/zkr/page/file/get?id='+item.id)" style="cursor:pointer">下载</el-tag>
                    </span>
                </template>
                <template v-if="tempBiddingData.fileRecordList&& tempBiddingData.fileRecordList.length==0">
                    <el-tag size="mini" type="danger">暂无文件</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='comments' style="color:#a7a7a7"></svg-icon>
                备注：{{tempBiddingData.remark}}
                <template v-if="tempBiddingData&& !tempBiddingData.remark">
                    <el-tag size="mini" type="danger">暂无备注</el-tag>
                </template>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import {
  getBiddings,
  removeBidding,
  updateBidding,
  addBidding
} from "@/api/bidding";
import normaltable from "@/components/NormalTable";
import upload from "@/components/UpLoad";
export default {
  components: {
    normaltable,
    upload
  },
  data() {
    return {
      dialogTitle: "新增项目",
      showBiddingVisible: false,
      tempBiddingData: {}, //其展示过渡作用(打勾增删改查)
      uploadData: {
        uploadFolder: "投标管理",
        materialfileList: [],
        limitFlieNumber: 100,
        buttonFlag: false
      },
      activeName: "跟踪中的项目",
      trackTable: {
        tableMaxWidth: "1311px",
        loading: false,
        searchText: "",
        select: "",
        total: 0,
        pageIndex: 1,
        pageSize: 15,
        currentPage: 1,
        orderBy: "create_date desc"
      },
      trackBidding: [], //跟踪中的项目
      trackColumns: [
        {
          width: 220,
          prop: "name",
          text: "项目名称",
          field: "name",
          sort: "custom",
          type: "text"
        },
        {
          width: 120,
          prop: "bidding_no",
          text: "编号",
          field: "biddingNo",
          sort: "custom",
          type: "text"
        },
        {
          width: 80,
          prop: "announcement_link",
          text: "公告链接",
          field: "announcementLink",
          sort: false,
          type: "button"
        },
        {
          width: 100,
          prop: "announcement_time",
          text: "公告时间",
          field: "announcementTime",
          sort: "custom",
          type: "text"
        },
        {
          width: 95,
          prop: "expected_score",
          text: "预计得分",
          field: "expectedScore",
          sort: "custom",
          type: "text"
        },
        {
          width: 220,
          prop: "reqistration_require",
          text: "报名要求",
          field: "reqistrationRequire",
          sort: false,
          type: "text"
        },
        {
          width: 50,
          prop: "weight_enum",
          text: "权重",
          field: "weightEnum",
          sort: false,
          type: "text"
        },
        {
          width: 80,
          prop: "file_record_list",
          text: "文件上传",
          field: "fileRecordList",
          sort: false,
          type: "file"
        },
        {
          width: 160,
          prop: "announcementContactInfo",
          text: "公告联系方式",
          field: "announcementContactInfo",
          sort: false,
          type: "text"
        },
        {
          width: 140,
          prop: "remark",
          text: "备注",
          field: "remark",
          sort: false,
          type: "text"
        }
      ],
      trackTableData: [
        {
          name: "aaa",
          biddingNo: "00061516161",
          announcementLink:
            "www.baidu.comwww.baidu.comwww.baidu.comwww.baidu.comwww.baidu.com",
          announcementTime: "2018-10-10",
          expectedScore: "80",
          reqistrationRequire:
            "必须具备一定的条件才可以必须具备一定的条件才可以",
          weightEnum: "高",
          fileRecordList: [],
          announcementContactInfo: "请上官网联系客服人员进行办理相关手续",
          remark: "啊实打实大苏打实打实"
        }
      ],
      checkTable: {
        tableMaxWidth: "1311px",
        loading: false,
        searchText: "",
        select: "",
        total: 0,
        pageIndex: 1,
        pageSize: 15,
        currentPage: 1,
        orderBy: "create_date desc"
      },
      checkBidding: [], //跟踪中的项目
      checkColumns: [
        {
          width: 220,
          prop: "name",
          text: "项目名称",
          field: "name",
          sort: "custom",
          type: "text"
        },
        {
          width: 120,
          prop: "bidding_no",
          text: "编号",
          field: "biddingNo",
          sort: "custom",
          type: "text"
        },
        {
          width: 80,
          prop: "announcement_link",
          text: "公告链接",
          field: "announcementLink",
          sort: false,
          type: "button"
        },
        {
          width: 100,
          prop: "announcement_time",
          text: "公告时间",
          field: "announcementTime",
          sort: "custom",
          type: "text"
        },
        {
          width: 95,
          prop: "expected_score",
          text: "预计得分",
          field: "expectedScore",
          sort: "custom",
          type: "text"
        },
        {
          width: 220,
          prop: "reqistration_require",
          text: "报名要求",
          field: "reqistrationRequire",
          sort: false,
          type: "text"
        },
        {
          width: 50,
          prop: "weight_enum",
          text: "权重",
          field: "weightEnum",
          sort: false,
          type: "text"
        },
        {
          width: 80,
          prop: "file_record_list",
          text: "文件上传",
          field: "fileRecordList",
          sort: false,
          type: "file"
        },
        {
          width: 160,
          prop: "announcementContactInfo",
          text: "公告联系方式",
          field: "announcementContactInfo",
          sort: false,
          type: "text"
        },
        {
          width: 140,
          prop: "remark",
          text: "备注",
          field: "remark",
          sort: false,
          type: "text"
        }
      ],
      checkTableData: [
        {
          name: "aaa",
          biddingNo: "00061516161",
          announcementLink:
            "www.baidu.comwww.baidu.comwww.baidu.comwww.baidu.comwww.baidu.com",
          announcementTime: "2018-10-10",
          expectedScore: "80",
          reqistrationRequire:
            "必须具备一定的条件才可以必须具备一定的条件才可以",
          weightEnum: "高",
          fileRecordList: [],
          announcementContactInfo: "请上官网联系客服人员进行办理相关手续",
          remark: "啊实打实大苏打实打实"
        }
      ],
      dialogVisible: false,
      form: {
        name: "",
        biddingNo: "",
        announcementLink: "",
        announcementTime: "",
        expectedScore: "",
        reqistrationRequire: "",
        weightEnum: "",
        fileRecordList: [],
        announcementContactInfo: "",
        remark: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
          }
        ],
        weightEnum: [
          {
            required: true,
            message: "请选择权重类型",
            trigger: "change"
          }
        ],
        biddingNo: [
          {
            required: true,
            message: "请输入编号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  filters: {},
  created() {},
  methods: {
    showTrackBidding() {
      if (this.trackBidding.length != 1) {
        this.$message({
          type: "warning",
          message: "请选择一个投标进行预览"
        });
        return false;
      }
      this.showBiddingVisible = true;
      this.tempBiddingData = this.trackBidding[0];
    },
    submitBidding(formName) {
      let dealFun = function() {};
      let submitData = {};
      let tempBiddingData = [];
      let tempTable = {};
      let tempTableData = {};
      let files = [];
      this.uploadData.materialfileList.forEach((value, index) => {
        files.push({ id: value.response.result });
      });
      this.form["fileRecordList"] = files;
      if (this.dialogTitle == "新增项目") {
        dealFun = addBidding;
        submitData = this.form;
      } else {
        dealFun = updateBidding;

        if (this.activeName == "跟踪中的项目") {
          tempBiddingData = this.trackBidding[0];
          tempTable = this.trackTable;
          tempTableData = this.trackTableData;
        }
        for (let val in tempBiddingData) {
          if (this.form[val] !== undefined) {
            tempBiddingData[val] = this.form[val];
          }
        }
        submitData = tempBiddingData;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.uploadData.buttonFlag = true;
          dealFun(submitData)
            .then(res => {
              if (res.success) {
                this.uploadData.buttonFlag = false;
                this.dialogVisible = false;
                tempTableloading = true;
                tempTable.searchText = "";
                let data = {
                  pageIndex: tempTable.pageIndex,
                  pageSize: tempTable.pageSize,
                  orderBy: tempTable.orderBy
                };
                getBiddings(data)
                  .then(res => {
                    if (res.success) {
                      tempTableData = res.result.records;
                      tempTable.loading = false;
                      tempTable.total = Number(res.result.total);
                      tempTable.currentPage = res.result.current;
                    }
                  })
                  .catch(err => {
                    tempTable.loading = false;
                  });
              }
            })
            .catch(() => {
              this.uploadData.buttonFlag = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addBidding() {
      this.dialogTitle = "新增项目";
      this.dialogVisible = true;
    },
    modifyBidding() {
      let tempBidding = [];
      if (this.activeName == "跟踪中的项目") {
        tempBidding = this.trackBidding;
      }
      if (tempBidding.length != 1) {
        this.$message({
          type: "warning",
          message: "请选择一个投标进行修改"
        });
        return false;
      }
      for (let value in this.form) {
        this.form[value] = tempBidding[0][value] ? tempBidding[0][value] : "";
      }
      tempBidding[0].fileRecordList.forEach((value, index) => {
        this.uploadData.materialfileList.push({
          name: value.name,
          url: value.path,
          response: {
            result: value.id
          }
        });
      });
      this.dialogTitle = "修改项目";
      this.dialogVisible = true;
    },
    deleteBidding() {
      let tempBidding = [];
      let tempTable = {};
      let tempTableData = {};
      if (this.activeName == "跟踪中的项目") {
        tempBidding = this.trackBidding;
        tempTable = this.trackTable;
        tempTableData = this.trackTableData;
      }
      if (tempBidding.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择至少一个投标进行删除"
        });
        return false;
      }
      this.$confirm("此操作将永久删除该投标信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = [];
          tempBidding.map((value, index) => {
            ids.push(value.id);
          });
          tempTable.loading = true;
          deleteRecord(ids)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                tempTable.loading = true;
                let data = {};
                tempTable.searchText = "";
                data = {
                  pageIndex: tempTable.pageIndex,
                  pageSize: tempTable.pageSize,
                  orderBy: tempTable.orderBy
                };
                getRecords(data)
                  .then(res => {
                    if (res.success) {
                      tempTableData = res.result.records;
                      tempTable.loading = false;
                      tempTable.total = Number(res.result.total);
                      tempTable.currentPage = res.result.current;
                    }
                  })
                  .catch(err => {
                    tempTable.loading = false;
                  });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    multipleSelections(val) {
      if (this.activeName == "跟踪中的项目") {
        this.trackBidding = val;
      }
    },
    handleSizeChange(val) {
      let tempTable = {};
      let tempTableData = {};
      if (this.activeName == "跟踪中的项目") {
        tempTable = this.trackTable;
        tempTableData = this.trackTableData;
      }
      tempTable.loading = true;
      let data = {};
      tempTable.pageSize = val;
      data = {
        pageIndex: tempTable.pageIndex,
        pageSize: tempTable.pageSize,
        orderBy: tempTable.orderBy
      };
      if (tempTable.select && tempTable.searchText) {
        data[tempTable.select] = tempTable.searchText;
      }
      getBiddings(data)
        .then(res => {
          if (res.success) {
            tempTableData = res.result.records;
            tempTable.loading = false;
            tempTable.total = Number(res.result.total);
            tempTable.currentPage = res.result.current;
          }
        })
        .catch(err => {
          tempTable.loading = false;
        });
    },
    handleCurrentChange(val) {
      let tempTable = {};
      let tempTableData = {};
      if (this.activeName == "跟踪中的项目") {
        tempTable = this.trackTable;
        tempTableData = this.trackTableData;
      }
      tempTable.loading = true;
      let data = {};
      tempTable.pageIndex = val;
      data = {
        pageIndex: tempTable.pageIndex,
        pageSize: tempTable.pageSize,
        orderBy: tempTable.orderBy
      };
      if (tempTable.select && tempTable.searchText) {
        data[tempTable.select] = tempTable.searchText;
      }
      getBiddings(data)
        .then(res => {
          if (res.success) {
            tempTableData = res.result.records;
            tempTable.loading = false;
            tempTable.total = Number(res.result.total);
            tempTable.currentPage = res.result.current;
          }
        })
        .catch(err => {
          tempTable.loading = false;
        });
    },
    cancelSubmit(formName) {
      this.dialogVisible = false;
    },
    closeDialog() {
      this.$refs["form"].resetFields();
      for (let value in this.form) {
        this.form[value] = "";
      }
      this.uploadData.materialfileList = [];
    },
    trackTableSort(val) {
      console.log(val);
    },
    handleClick(tab, event) {
      console.log(tab.name);
    }
  }
};
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 10px;
  // width: 776px;
}
.input_width {
  width: 200px;
}
.dialog-title {
  border-left-width: 4px;
  border-left-color: deepskyblue;
  border-left-style: solid;
  padding-left: 10px;
  margin-bottom: 20px;
}
.pagination-box {
  margin: 10px auto;
  text-align: center;
}
.content {
  margin-bottom: 10px;
  margin-left: 10px;
}
.recordImage {
  width: 110px;
  height: 85px;
  position: absolute;
  top: 50px;
  right: 40px;
}
.svg-icon {
  margin-right: 6px;
}
.fileItem {
  display: inline-block;
  margin: 0 10px;
}
</style>

