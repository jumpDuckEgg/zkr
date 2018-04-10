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
                <el-button size="mini" type="success" plain>修改人员</el-button>
                <el-button size="mini" type="info" plain>删除人员</el-button>
                <el-button size="mini" type="danger" plain>预览</el-button>
            </el-col>
        </el-row>
        <div class="table-box">
            <el-table v-loading="loading" :data="tableData" stripe size='mini' border @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" width="90">
                </el-table-column>
                <el-table-column prop="idCardNo" label="身份证号" width="180">
                </el-table-column>
                <el-table-column label="身份证有效期" width="180">
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
                <el-table-column label="注册有效期" width="180">
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
        <el-dialog :visible.sync="dialogVisible" width="800px" :close-on-click-modal="false" center lock-scroll>
            <div class="dialog-title">新增人员</div>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline="true">
                <el-form-item label="姓名：" prop="name">
                    <el-input size="mini" v-model="form.name" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" prop="idCardNo">
                    <el-input size="mini" v-model="form.idCardNo" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="身份证有效期：" prop="idCardNoTime">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.idCardNoTime"  class="input_width" ></el-date-picker>
                </el-form-item>
                <el-form-item label="类型：" prop="type">
                    <el-select size="mini" v-model="form.type" placeholder="请选择" class="input_width">
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="管理员" value="管理员"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注：" prop="remark">
                    <el-input size="mini" type="textarea" v-model="form.remark" clearable class="input_width"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini">确 定</el-button>
                <el-button size="mini" type="danger" @click="dialogVisible =false">取 消</el-button>
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
                idCardNo:'',
                type: "",
                password: "",
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
                type: [
                    {
                        required: true,
                        message: "请选择一个用户类型",
                        trigger: "change"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ],
                remark: [
                    {
                        required: true,
                        message: "请填写备注",
                        trigger: "blur"
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
        handleCurrentChange(val) {}
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
    margin-right: 50px;
}
</style>

