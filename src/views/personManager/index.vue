<template>
  <div class="app-container">
    <el-row type="flex" justify="end">
      <el-col style="width:400px;margin-bottom:10px;">
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select" size='mini'>
          <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:90px;">
            <el-option label="姓名" value="name"></el-option>
            <el-option label="身份证号" value="idCardNo"></el-option>
            <el-option label="学位" value="degree"></el-option>
            <el-option label="职称" value="title"></el-option>
            <el-option label="等级" value="grade"></el-option>
            <el-option label="类型" value="type"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="sreachData"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col>
        <el-button size="mini" type="primary" plain @click="createdPerson">新增人员</el-button>
        <el-button size="mini" type="success" plain @click="modifyPerson">修改人员</el-button>
        <el-button size="mini" type="info" plain @click="deletePerson">删除人员</el-button>
        <el-button size="mini" type="danger" plain @click="showPerson">预览</el-button>
      </el-col>
    </el-row>
    <div class="table-box">
      <el-table v-loading="loading" :data="tableData" size='mini' border @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @sort-change='tableSort'>
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80" align='center' sortable='custom'>
          <template slot-scope="scope">
            <div class="overWord hand" @click="handleClipboard(scope.row.name,$event)">
              {{scope.row.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="idCardNo" label="身份证号" width="145" align='center'>
          <template slot-scope="scope">
            <div class="overWord hand" @click="handleClipboard(scope.row.idCardNo,$event)">
              {{scope.row.idCardNo}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id_validity_date" label="身份证有效期" width="120" align='center' sortable='custom'>
          <template slot-scope="scope">
            {{scope.row.idValidityDate}}
          </template>
        </el-table-column>
        <el-table-column label="毕业信息" width="145" align='center'>
          <template slot-scope="scope">
            <div class="overWord hand" @click="handleClipboard(scope.row.graduationInfo,$event)">
              {{scope.row.graduationInfo}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="diploma" label="学历" width="70" align='center' sortable='custom'>
        </el-table-column>
        <el-table-column prop="degree" label="学位" width="70" align='center' sortable='custom'>
        </el-table-column>
        <el-table-column prop="title" label="职称" width="90" align='center'>
          <template slot-scope="scope">
            <div class="overWord hand" @click="handleClipboard(scope.row.title,$event)">
              {{scope.row.title}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="grade" label="等级" width="70" align='center' sortable='custom'>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="70" align='center'>
        </el-table-column>
        <el-table-column prop="qualification" label="执业资格" width="70" align='center'>
          <template slot-scope="scope">
            <div class="overWord hand" @click="handleClipboard(scope.row.qualification,$event)">
              {{scope.row.qualification}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="注册有效期" prop="validity_period" width="110" align='center' sortable='custom'>
          <template slot-scope="scope">
            {{scope.row.validityPeriod}}
          </template>
        </el-table-column>
        <el-table-column prop="currentPosition" label="当前职位" width="100" align='center'>
        </el-table-column>
        <el-table-column prop="social_security" label="社保所在地" width="105" align='center' sortable='custom'>
          <template slot-scope="scope">
            {{scope.row.socialSecurity}}
          </template>
        </el-table-column>
        <el-table-column label="社保号" width="110" align='center'>
          <template slot-scope="scope">
            <div class="overWord hand" @click="handleClipboard(scope.row.socialNo,$event)">
              {{scope.row.socialNo}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="获奖情况" width="130" align='center'>
          <template slot-scope="scope">
            <div class="overWord">
              {{scope.row.winnings}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="150" align="center">
          <template slot-scope="scope">
            <div class="overWord">
              {{scope.row.remark}}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination background layout="prev, pager, next,sizes,total" :total="total" :page-sizes="[10, 15, 20,25]" :page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <!-- 新增用户 -->
    <el-dialog :visible.sync="dialogVisible" width="1030px" :close-on-click-modal="false" center lock-scroll>
      <div class="dialog-title">{{dialogTitle}}</div>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" :inline="true">
        <el-form-item label="姓名:" prop="name" label-width="100px">
          <el-input size="mini" v-model="form.name" clearable style="width:100px;"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" prop="idCardNo" label-width="90px">
          <el-input size="mini" v-model="form.idCardNo" clearable style="width:170px;"></el-input>
        </el-form-item>
        <el-form-item label="身份证有效期:" prop="idValidityDate" label-width="110px">
          <el-date-picker type="date" size="mini" value-format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期" v-model="form.idValidityDate" style="width:130px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="当前职位:" prop="currentPosition" label-width="80px">
          <el-input size="mini" v-model="form.currentPosition" clearable style="width:110px;"></el-input>
        </el-form-item>
        <el-form-item label="学历:" prop="diploma">
          <el-select size="mini" v-model="form.diploma" placeholder="请选择" style="width:100px;">
            <el-option label="专科" value="专科"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
            <el-option label="博士" value="博士"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学位:" prop="degree" label-width="50px">
          <el-select size="mini" v-model="form.degree" placeholder="请选择" style="width:90px;">
            <el-option label="学士" value="学士"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业信息:" prop="graduationInfo" label-width="80px">
          <el-input size="mini" v-model="form.graduationInfo" clearable style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="社保所在地:" prop="socialSecurity" label-width="90px">
          <el-select size="mini" v-model="form.socialSecurity" placeholder="请选择" style="width:90px">
            <el-option label="分院" value="分院"></el-option>
            <el-option label="总院" value="总院"></el-option>
            <el-option label="均有" value="均有"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社保号:" prop="socialNo" label-width="65px">
          <el-input size="mini" v-model="form.socialNo" clearable style="width:110px"></el-input>
        </el-form-item>
        <el-form-item label="职称:" prop="title">
          <el-input size="mini" v-model="form.title" clearable style="width:100px;"></el-input>
        </el-form-item>
        <el-form-item label="等级:" prop="grade" label-width="50px">
          <el-select size="mini" v-model="form.grade" placeholder="请选择" style="width:90px;">
            <el-option label="助理级" value="助理级"></el-option>
            <el-option label="中级" value="中级"></el-option>
            <el-option label="副高级" value="副高级"></el-option>
            <el-option label="正高级" value="正高级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型:" prop="type" label-width="50px">
          <el-select size="mini" v-model="form.type" placeholder="请选择" style="width:90px;">
            <el-option label="路桥" value="路桥"></el-option>
            <el-option label="隧道" value="隧道"></el-option>
            <el-option label="给排水" value="给排水"></el-option>
            <el-option label="造价" value="造价"></el-option>
            <el-option label="绿化" value="绿化"></el-option>
            <el-option label="测量" value="测量"></el-option>
            <el-option label="电气" value="电气"></el-option>
            <el-option label="岩土" value="岩土"></el-option>
            <el-option label="交通" value="交通"></el-option>
            <el-option label="暖通" value="暖通"></el-option>
            <el-option label="房建" value="房建"></el-option>
            <el-option label="市政" value="市政"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执业资格:" prop="qualification" label-width="80px">
          <el-select size="mini" v-model="form.qualification" placeholder="请选择" style="width:90px;">
            <el-option label="造价" value="造价"></el-option>
            <el-option label="结构" value="结构"></el-option>
            <el-option label="岩土" value="岩土"></el-option>
            <el-option label="电气" value="电气"></el-option>
            <el-option label="建筑" value="建筑"></el-option>
            <el-option label="给排水" value="给排水"></el-option>
            <el-option label="暖通" value="暖通"></el-option>
            <el-option label="岩土" value="岩土"></el-option>
            <el-option label="动力" value="动力"></el-option>
            <el-option label="环保" value="环保"></el-option>
            <el-option label="建造师" value="建造师"></el-option>
            <el-option label="监理" value="监理"></el-option>
            <el-option label="规划" value="规划"></el-option>
            <el-option label="道路" value="道路"></el-option>
            <el-option label="测绘" value="测绘"></el-option>
            <el-option label="咨询" value="咨询"></el-option>
            <el-option label="安全" value="安全"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册有效期:" prop="validityPeriod" label-width="95px">
          <el-date-picker type="date" size="mini" value-format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期" v-model="form.validityPeriod" style="width:130px"></el-date-picker>
        </el-form-item>

        <el-form-item label="获奖情况:" prop="winnings">
          <el-input size="mini" type="textarea" v-model="form.winnings" clearable style="width:830px"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input size="mini" type="textarea" v-model="form.remark" clearable style="width:830px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submitInfo('form')" v-loading='submitFlag'>确 定</el-button>
        <el-button size="mini" type="danger" @click="cancelSubmit('form')" v-loading='submitFlag'>取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showPersonVisible" width="800px">
      <div class="dialog-title">用户详情</div>
      <el-row class="userInfo-title">
        <el-col :span="4"><img :src="user" alt="userImage" class="userImage"></el-col>
        <el-col :span="10">
          <div>
            <svg-icon icon-class='account' style="color:#a7a7a7"></svg-icon>
            姓名：{{multipleSelection[0]?multipleSelection[0].name:''}}
          </div>
          <div>
            <svg-icon icon-class='bussiness-card' style="color:#a7a7a7"></svg-icon>
            身份证号：{{multipleSelection[0]?multipleSelection[0].idCardNo:''}}
          </div>
          <div>
            <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
            学历：{{multipleSelection[0]?multipleSelection[0].diploma:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].diploma">
              <el-tag size="mini" type="danger">暂无学历</el-tag>
            </template>
          </div>
          <div>
            <svg-icon icon-class='personal-center' style="color:#a7a7a7"></svg-icon>
            当前职位：{{multipleSelection[0]?multipleSelection[0].currentPosition:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].currentPosition">
              <el-tag size="mini" type="danger">暂无当前职位</el-tag>
            </template>
          </div>
        </el-col>
      </el-row>
      <div style="border-top: 2px dotted #eeeeee"></div>
      <div class="userInfo-content">
        <el-row class="userInfo-content__item">
          <el-col :span="8">
            <svg-icon icon-class='clock' style="color:#a7a7a7"></svg-icon>
            身份证有效期：{{multipleSelection[0]?multipleSelection[0].idValidityDate:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].idValidityDate">
              <el-tag size="mini" type="danger">暂无身份证有效期</el-tag>
            </template>
          </el-col>
          <el-col :span="8">
            <svg-icon icon-class='gonglue' style="color:#a7a7a7"></svg-icon>
            学位：{{multipleSelection[0]?multipleSelection[0].degree:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].degree">
              <el-tag size="mini" type="danger">暂无学位</el-tag>
            </template>
          </el-col>
          <el-col :span="8">
            <svg-icon icon-class='gonglue' style="color:#a7a7a7"></svg-icon>
            职称：{{multipleSelection[0]?multipleSelection[0].title:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].title">
              <el-tag size="mini" type="danger">暂无职称</el-tag>
            </template>
          </el-col>
        </el-row>
        <el-row class="userInfo-content__item">
          <el-col :span="8">
            <svg-icon icon-class='gonglue' style="color:#a7a7a7"></svg-icon>
            等级：{{multipleSelection[0]?multipleSelection[0].grade:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].grade">
              <el-tag size="mini" type="danger">暂无等级</el-tag>
            </template>
          </el-col>
          <el-col :span="8">
            <svg-icon icon-class='gonglue' style="color:#a7a7a7"></svg-icon>
            类型：{{multipleSelection[0]?multipleSelection[0].type:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].type">
              <el-tag size="mini" type="danger">暂无类型</el-tag>
            </template>
          </el-col>
          <el-col :span="8">
            <svg-icon icon-class='gonglue' style="color:#a7a7a7"></svg-icon>
            执业资格：{{multipleSelection[0]?multipleSelection[0].qualification:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].qualification">
              <el-tag size="mini" type="danger">暂无执业资格</el-tag>
            </template>
          </el-col>
        </el-row>
        <el-row class="userInfo-content__item">
          <el-col :span="8">
            <svg-icon icon-class='clock' style="color:#a7a7a7"></svg-icon>
            注册有效期：{{multipleSelection[0]?multipleSelection[0].validityPeriod:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].validityPeriod">
              <el-tag size="mini" type="danger">暂无注册有效期</el-tag>
            </template>
          </el-col>
          <el-col :span="8">
            <svg-icon icon-class='house' style="color:#a7a7a7"></svg-icon>
            社保所在地：{{multipleSelection[0]?multipleSelection[0].socialSecurity:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].socialSecurity">
              <el-tag size="mini" type="danger">暂无社保所在地</el-tag>
            </template>
          </el-col>
          <el-col :span="8">
            <svg-icon icon-class='house-line' style="color:#a7a7a7"></svg-icon>
            社保号：{{multipleSelection[0]?multipleSelection[0].socialNo:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].socialNo">
              <el-tag size="mini" type="danger">暂无社保号</el-tag>
            </template>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="userInfo-content__item">
            <svg-icon icon-class='feiji' style="color:#a7a7a7"></svg-icon>
            毕业信息：{{multipleSelection[0]?multipleSelection[0].graduationInfo:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].graduationInfo">
              <el-tag size="mini" type="danger">暂无毕业信息</el-tag>
            </template>
          </el-col>
          <el-col class="userInfo-content__item">
            <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
            获奖情况：{{multipleSelection[0]?multipleSelection[0].winnings:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].winnings">
              <el-tag size="mini" type="danger">暂无获奖情况</el-tag>
            </template>
          </el-col>
          <el-col class="userInfo-content__item">
            <svg-icon icon-class='text' style="color:#a7a7a7"></svg-icon>
            备注：{{multipleSelection[0]?multipleSelection[0].remark:''}}
            <template v-if="multipleSelection[0]&& !multipleSelection[0].remark">
              <el-tag size="mini" type="danger">暂无备注</el-tag>
            </template>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPersonManagers,
  addPerson,
  modifyPerson,
  deletePerson
} from "@/api/personManager";
import user from "@/assets/user/user.gif";
import clipboard from "@/utils/clipboard";

export default {
  data() {
    return {
      user,
      dialogTitle: "新增人员",
      searchText: "",
      select: "",
      multipleSelection: [],
      tableData: [],
      loading: false,
      total: 0,
      pageIndex: 1,
      pageSize: 15,
      currentPage: 1,
      dialogVisible: false,
      submitFlag: false,
      orderBy: "create_date desc",
      form: {
        name: "",
        idCardNo: "",
        idValidityDate: "",
        graduationInfo: "",
        diploma: "",
        degree: "",
        title: "",
        grade: "",
        type: "",
        qualification: "",
        validityPeriod: "",
        currentPosition: "",
        socialSecurity: "",
        socialNo: "",
        winnings: "",
        remark: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        idCardNo: [
          {
            required: true,
            message: "请输入身份证",
            trigger: "blur"
          }
        ],
        idValidityDate: [
          {
            required: true,
            message: "请选择有效时间",
            trigger: "change"
          }
        ]
      },
      showPersonVisible: false
    };
  },
  filters: {},
  created() {
    this.loading = true;
    let data = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      orderBy: this.orderBy
    };
    getPersonManagers(data)
      .then(res => {
        if (res.success) {
          this.tableData = res.result.records;
          this.loading = false;
          this.total = Number(res.result.total);
          this.currentPage = res.result.current;
        }
      })
      .catch(err => {
        this.loading = false;
      });
  },
  methods: {
    tableSort(row) {
      let sortData = "";
      if (row.order == "descending") {
        sortData = row.prop + " desc";
      } else {
        sortData = row.prop;
      }
      let data = {};
      data = {
        pageIndex: 1,
        pageSize: this.pageSize,
        orderBy: sortData
      };
      this.loading = true;
      getPersonManagers(data)
        .then(res => {
          if (res.success) {
            this.tableData = res.result.records;
            this.loading = false;
            this.total = Number(res.result.total);

            this.currentPage = res.result.current;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    sreachData() {
      if (!this.select) {
        this.$message({
          type: "warning",
          message: "请选择一个类型"
        });
        return false;
      }
      let data = {};
      data = {
        pageIndex: 1,
        pageSize: this.pageSize,
        orderBy: this.orderBy
      };
      data[this.select] = this.searchText;
      getPersonManagers(data)
        .then(res => {
          if (res.success) {
            this.tableData = res.result.records;
            this.loading = false;
            this.total = Number(res.result.total);

            this.currentPage = res.result.current;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    submitInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let dealFun = function() {};
          let submitData = {};
          let remindMsg = "";
          this.submitFlag = true;
          if (this.dialogTitle == "新增人员") {
            dealFun = addPerson;
            submitData = this.form;
            remindMsg = "添加成功";
          }
          if (this.dialogTitle == "修改人员") {
            dealFun = modifyPerson;
            for (let val in this.multipleSelection[0]) {
              if (this.form[val] !== undefined) {
                this.multipleSelection[0][val] = this.form[val];
              }
            }
            submitData = this.multipleSelection[0];
            remindMsg = "修改成功";
          }

          dealFun(submitData)
            .then(res => {
              if (res.success) {
                this.submitFlag = false;
                this.dialogVisible = false;
                for (let val in this.form) {
                  this.form[val] = "";
                }
              }
              return Promise.resolve();
            })
            .then(() => {
              this.$message({
                type: "success",
                message: remindMsg
              });
              this.loading = true;
              let data = {};
              this.searchText = "";
              data = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                orderBy: this.orderBy
              };
              getPersonManagers(data)
                .then(res => {
                  if (res.success) {
                    this.tableData = res.result.records;
                    this.loading = false;
                    this.total = Number(res.result.total);
                    this.currentPage = res.result.current;
                  }
                })
                .catch(err => {
                  this.loading = false;
                });
            })
            .catch(() => {
              this.submitFlag = false;
            });
        } else {
          console.log("error submit!!");

          return false;
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      let idValidity = row.idValidityDate
        ? row.idValidityDate.split("-")
        : "2080-10-30".split("-");
      let validity = row.validityPeriod
        ? row.validityPeriod.split("-")
        : "2080-10-30".split("-");
      let nowDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      let idValidityDate = new Date(
        idValidity[0],
        idValidity[1] - 1,
        idValidity[2]
      );
      let limitTime = 1000 * 60 * 60 * 24 * 60; //两个月
      let validityPeriod = new Date(validity[0], validity[1] - 1, validity[2]);
      if (
        validityPeriod.getTime() < nowDay.getTime() ||
        idValidityDate.getTime() < nowDay.getTime()
      ) {
        return "danger-row";
      }
      if (
        validityPeriod.getTime() - nowDay.getTime() < limitTime ||
        idValidityDate.getTime() - nowDay.getTime() < limitTime
      ) {

        return "warning-row";
      }
      return "";
    },
    handleClipboard(text, event) {
      clipboard(text, event);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.loading = true;
      let data = {};
      this.pageSize = val;
      data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        orderBy: this.orderBy
      };
      if (this.select && this.searchText) {
        data[this.select] = this.searchText;
      }
      getPersonManagers(data)
        .then(res => {
          if (res.success) {
            this.tableData = res.result.records;
            this.loading = false;
            this.total = Number(res.result.total);
            this.currentPage = res.result.current;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    handleCurrentChange(val) {
      this.loading = true;
      let data = {};
      this.pageIndex = val;
      data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        orderBy: this.orderBy
      };
      if (this.select && this.searchText) {
        data[this.select] = this.searchText;
      }
      getPersonManagers(data)
        .then(res => {
          if (res.success) {
            this.tableData = res.result.records;
            this.loading = false;
            this.total = Number(res.result.total);
            this.currentPage = res.result.current;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    createdPerson() {
      this.dialogTitle = "新增人员";
      this.dialogVisible = true;
    },
    cancelSubmit(formName) {
      this.$refs[formName].resetFields();
      for (let value in this.form) {
        this.form[value] = "";
      }
      this.dialogVisible = false;
    },
    modifyPerson() {
      if (!(this.multipleSelection.length == 1)) {
        this.$message({
          type: "warning",
          message: "请选择一个人员进行修改"
        });
        return false;
      }
      for (let value in this.form) {
        this.form[value] = this.multipleSelection[0][value]
          ? this.multipleSelection[0][value]
          : "";
      }
      this.dialogTitle = "修改人员";
      this.dialogVisible = true;
    },
    deletePerson() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择至少一个人员进行删除"
        });
        return false;
      }
      this.$confirm("此操作将永久删除该人员信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = [];
          this.multipleSelection.map((value, index) => {
            ids.push(value.id);
          });
          this.loading = true;
          deletePerson(ids)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.loading = true;
                let data = {};
                this.searchText = "";
                data = {
                  pageIndex: this.pageIndex,
                  pageSize: this.pageSize,
                  orderBy: this.orderBy
                };
                getPersonManagers(data)
                  .then(res => {
                    if (res.success) {
                      this.tableData = res.result.records;
                      this.loading = false;
                      this.total = Number(res.result.total);
                      this.currentPage = res.result.current;
                    }
                  })
                  .catch(err => {
                    this.loading = false;
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
    showPerson() {
      if (!(this.multipleSelection.length == 1)) {
        this.$message({
          type: "warning",
          message: "请选择一个人员进行查看"
        });
        return false;
      }
      this.showPersonVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 10px;
  max-width: 1677px;
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
  margin: 20px auto;
  text-align: center;
}
.overWord {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.userImage {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #eeeeee;
}
.userInfo {
  &-title {
    width: 98%;
    margin: auto;
  }
  &-content {
    width: 98%;
    margin: 10px auto;
    &__item {
      // margin: 5px 0;
      margin-bottom: 10px;
      // margin-left: 10px;
      border: #eeeeee 1px solid;
      padding: 10px;
      border-radius: 5px;
    }
  }
}
.svg-icon {
  margin-right: 6px;
}
.hand {
  cursor: pointer;
}
</style>

