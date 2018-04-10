<template>
    <div class="app-container">
        <el-row type="flex" justify="end">
            <el-col style="width:400px;margin-bottom:10px;">
                <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select" size='mini'>
                    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:90px;">
                        <el-option label="姓名" value="1"></el-option>
                        <el-option label="身份证号" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" justify="start">
            <el-col>
                <el-button size="mini" type="primary" plain @click="dialogVisible=true">新增人员</el-button>
                <el-button size="mini" type="success" plain @click="modifyPerson">修改人员</el-button>
                <el-button size="mini" type="info" plain @click="deletePerson">删除人员</el-button>
                <el-button size="mini" type="danger" plain @click="showPerson">预览</el-button>
            </el-col>
        </el-row>
        <div class="table-box">
            <el-table v-loading="loading" :data="tableData" stripe size='mini' border @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" width="90">
                </el-table-column>
                <el-table-column prop="idCardNo" label="身份证号" width="180">
                </el-table-column>
                <el-table-column label="身份证有效期" width="130">
                    <template slot-scope="scope">
                        {{scope.row.idCardNoTime}}
                    </template>
                </el-table-column>
                <el-table-column label="毕业信息" width="180">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.graduationInfo}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="diploma" label="学历" width="80">
                </el-table-column>
                <el-table-column prop="degree" label="学位" width="80">
                </el-table-column>
                <el-table-column prop="title" label="职称" width="100">
                </el-table-column>
                <el-table-column prop="grade" label="等级" width="80">
                </el-table-column>
                <el-table-column prop="type" label="类型" width="80">
                </el-table-column>
                <el-table-column prop="qualification" label="执业资格" width="80">
                </el-table-column>
                <el-table-column label="注册有效期" width="130">
                    <template slot-scope="scope">
                        {{scope.row.registerTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="currentPosition" label="当前职位" width="100">
                </el-table-column>
                <el-table-column prop="socialSecurity" label="社保所在地" width="90">
                </el-table-column>
                <el-table-column prop="socialId" label="社保号" width="180">
                </el-table-column>
                <el-table-column label="获奖情况" width="180">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.winnings}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="备注" width="180">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.remark}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination small layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <!-- 新增用户 -->
        <el-dialog :visible.sync="dialogVisible" width="1100px" :close-on-click-modal="false" center lock-scroll>
            <div class="dialog-title">新增人员</div>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline="true">
                <el-form-item label="姓名:" prop="name">
                    <el-input size="mini" v-model="form.name" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="身份证号:" prop="idCardNo">
                    <el-input size="mini" v-model="form.idCardNo" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="身份证有效期:" prop="idCardNoTime">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.idCardNoTime" class="input_width"></el-date-picker>
                </el-form-item>

                <el-form-item label="学历:" prop="diploma">
                    <el-select size="mini" v-model="form.diploma" placeholder="请选择" class="input_width">
                        <el-option label="专科" value="专科"></el-option>
                        <el-option label="本科" value="本科"></el-option>
                        <el-option label="研究生" value="研究生"></el-option>
                        <el-option label="博士" value="博士"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学位:" prop="degree">
                    <el-select size="mini" v-model="form.degree" placeholder="请选择" class="input_width">
                        <el-option label="学士" value="学士"></el-option>
                        <el-option label="硕士" value="硕士"></el-option>
                        <el-option label="博士" value="博士"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职称:" prop="title">
                    <el-input size="mini" v-model="form.title" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="等级:" prop="degree">
                    <el-select size="mini" v-model="form.degree" placeholder="请选择" class="input_width">
                        <el-option label="助理级" value="助理级"></el-option>
                        <el-option label="中级" value="中级"></el-option>
                        <el-option label="副高级" value="副高级"></el-option>
                        <el-option label="副高级" value="副高级"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="等级:" prop="type">
                    <el-select size="mini" v-model="form.type" placeholder="请选择" class="input_width">
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
                <el-form-item label="执业资格:" prop="qualification">
                    <el-select size="mini" v-model="form.qualification" placeholder="请选择" class="input_width">
                        <el-option label="造价" value="造价"></el-option>
                        <el-option label="结构" value="结构"></el-option>
                        <el-option label="岩土" value="岩土"></el-option>
                        <el-option label="电气" value="电气"></el-option>
                        <el-option label="建筑" value="建筑"></el-option>
                        <el-option label="给排水" value="给排水"></el-option>
                        <el-option label="暖通" value="电气"></el-option>
                        <el-option label="岩土" value="暖通"></el-option>
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
                <el-form-item label="注册有效期:" prop="registerTime">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.registerTime" class="input_width"></el-date-picker>
                </el-form-item>
                <el-form-item label="当前职位:" prop="currentPosition">
                    <el-input size="mini" v-model="form.currentPosition" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="社保所在地:" prop="socialSecurity">
                    <el-select size="mini" v-model="form.socialSecurity" placeholder="请选择" class="input_width">
                        <el-option label="分院" value="分院"></el-option>
                        <el-option label="总院" value="总院"></el-option>
                        <el-option label="均有" value="均有"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="社保号:" prop="socialId">
                    <el-input size="mini" v-model="form.socialId" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="毕业信息:" prop="graduationInfo">
                    <el-input size="mini" type="textarea" v-model="form.graduationInfo" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="获奖情况:" prop="winnings">
                    <el-input size="mini" type="textarea" v-model="form.winnings" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                    <el-input size="mini" type="textarea" v-model="form.remark" clearable class="input_width"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini">确 定</el-button>
                <el-button size="mini" type="danger" @click="cancelSubmit('form')">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getPersonManagers } from "@/api/personManager";

export default {
  data() {
    return {
      searchText: "",
      select: "",
      multipleSelection: [],
      tableData: [
        {
          name: "欧阳震华",
          idCardNo: "441522199610300633",
          idCardNoTime: "2018-10-10",
          graduationInfo: "广州大学华软软件学院",
          diploma: "专科",
          degree: "学士",
          title: "初级工程师",
          grade: "助理级",
          type: "隧道",
          qualification: "造价",
          registerTime: "2018-10-10",
          currentPosition: "初级工程师",
          socialSecurity: "分院",
          socialId: "441522199610306333",
          winnings: "获得了土木建筑一等奖",
          remark: "备注备注"
        },
        {
          name: "欧阳震华",
          idCardNo: "441522199610300633",
          idCardNoTime: "2018-10-10",
          graduationInfo: "广州大学华软软件学院",
          diploma: "专科",
          degree: "学士",
          title: "初级工程师",
          grade: "助理级",
          type: "隧道",
          qualification: "造价",
          registerTime: "2018-10-10",
          currentPosition: "初级工程师",
          socialSecurity: "分院",
          socialId: "441522199610306333",
          winnings: "获得了土木建筑一等奖",
          remark: "备注备注"
        }
      ],
      loading: false,
      total: 0,
      pageSize: 5,
      dialogVisible: false,
      form: {
        name: "",
        idCardNo: "",
        idCardNoTime: "",
        graduationInfo: "",
        diploma: "",
        degree: "",
        title: "",
        grade: "",
        type: "",
        qualification: "",
        registerTime: "",
        currentPosition: "",
        socialSecurity: "",
        socialId: "",
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
        idCardNoTime: [
          {
            required: true,
            message: "请选择有效时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  filters: {},
  created() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {},
    cancelSubmit(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    modifyPerson() {
      if (!(this.multipleSelection.length == 1)) {
        this.$message({
          type: "warning",
          message: "请选择一个用户进行修改"
        });
        return false;
      }
    },
    deletePerson() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择至少一个用户进行删除"
        });
        return false;
      }
    },
    showPerson() {
      if (!(this.multipleSelection.length == 1)) {
        this.$message({
          type: "warning",
          message: "请选择一个用户进行查看"
        });
        return false;
      }
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
.overWord {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

