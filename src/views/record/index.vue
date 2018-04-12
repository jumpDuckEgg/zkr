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
                <el-button size="mini" type="primary" plain @click="createdRecord">新增备案</el-button>
                <el-button size="mini" type="success" plain @click="modifyRecord">修改备案</el-button>
                <el-button size="mini" type="info" plain @click="deleteRecord">删除备案</el-button>
                <el-button size="mini" type="danger" plain @click="showRecord">预览</el-button>
            </el-col>
        </el-row>
        <div class="table-box">
            <el-table v-loading="loading" :data="tableData" stripe size='mini' border @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="region" label="地区" width="80">
                </el-table-column>
                <el-table-column label="系统名字" width="120">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.systemName}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="系统链接" width="80">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.systemLink" placement="bottom">
                            <el-button type="danger" plain size="mini">转跳</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="登入入口" width="80">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.loginLink" placement="bottom">
                            <el-button type="danger" plain size="mini">转跳</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="account" label="账号" width="100">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.account}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="password" label="密码" width="100">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.password}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="有效期" width="100">
                    <template slot-scope="scope">
                        <el-tag size='mini'>{{scope.row.validity}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="tel" label="电话" width="130">
                </el-table-column>
                <el-table-column label="地址" width="180">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.address}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="相关文件下载" width="100">
                    <template slot-scope="scope">
                        <el-button type="danger" plain size="mini">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="办事指南" width="80">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.guide" placement="bottom">
                            <el-button type="danger" plain size="mini">转跳</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="系统数据描述" width="180">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.desc}}
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
        <el-dialog :visible.sync="dialogVisible" width="900px" :close-on-click-modal="false" @close='closeDialog' center lock-scroll top='8vh'>
            <div class="dialog-title">{{dialogTitle}}</div>
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="地区：" prop="region">
                            <el-select size="mini" v-model="form.region" placeholder="请选择">
                                <template v-for="(item,index) in cityArray">
                                    <el-option :label="item.value" :value="item.label" :key="index"></el-option>
                                </template>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="系统名字：" prop="systemName">
                            <el-input size="mini" v-model="form.systemName" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="有效期：" prop="validity">
                            <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="form.validity"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="账号：">
                            <el-input size="mini" v-model="form.account" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="密码：">
                            <el-input size="mini" v-model="form.password" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="电话：">
                            <el-input size="mini" v-model="form.tel" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="系统链接：">
                            <el-input size="mini" v-model="form.systemLink" clearable>
                                <template slot="prepend">http://</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="登入入口：">
                            <el-input size="mini" v-model="form.loginLink" clearable>
                                <template slot="prepend">http://</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="办事指南：">
                            <el-input size="mini" v-model="form.guide" clearable>
                                <template slot="prepend">http://</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="地址：">
                            <el-input size="mini" v-model="form.address" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="系统数据描述：">
                            <el-input size="mini" type="textarea" v-model="form.desc" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="备注：" prop="remark">
                            <el-input size="mini" type="textarea" v-model="form.remark" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="合同扫描件:">
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="submitRecord('form')">确 定</el-button>
                <el-button size="mini" type="danger" @click="cancelSubmit('form')">取 消</el-button>
            </span>
        </el-dialog>

        <!-- 预览 -->
        <el-dialog :visible.sync="showRecordVisible" width="800px" center>
            <div class="dialog-title">备案详情</div>
            <div>
                <img :src="recordImage" alt="recordImage" class="recordImage">
            </div>
            <div class="InfoCenter">
                <div class="content">
                    <svg-icon icon-class='process'></svg-icon>
                    系统名字：{{multipleSelection[0]?multipleSelection[0].systemName:''}}
                </div>
                <el-row class="content">
                    <el-col :span="8">
                        <svg-icon icon-class='logistic'></svg-icon>
                        地区：{{multipleSelection[0]?multipleSelection[0].region:''}}
                    </el-col>

                    <el-col :span="8">
                        <svg-icon icon-class='clock'></svg-icon>
                        有效期：{{multipleSelection[0]?multipleSelection[0].validity:''}}
                    </el-col>
                </el-row>
            </div>
            <div style="border-top:2px dashed #eee;margin:20px 0;"></div>
            <el-row class="content">
                <el-col :span="8">
                    <svg-icon icon-class='account' style="color:#a7a7a7"></svg-icon>
                    账号：{{multipleSelection[0]?multipleSelection[0].account:''}}
                </el-col>
                <el-col :span="8">
                    <svg-icon icon-class='password' style="color:#a7a7a7"></svg-icon>
                    密码：{{multipleSelection[0]?multipleSelection[0].password:''}}
                </el-col>

            </el-row>
            <div class="content">
                <svg-icon icon-class='phone' style="color:#a7a7a7"></svg-icon>
                电话：{{multipleSelection[0]?multipleSelection[0].tel:''}}
            </div>
            <div class="content">
                <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
                系统链接：{{multipleSelection[0]?multipleSelection[0].systemLink:''}}
                <el-button type="text" size="mini" @click="turnUrl(multipleSelection[0].systemLink)">转跳</el-button>
            </div>
            <div class="content">
                <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
                登入入口：{{multipleSelection[0]?multipleSelection[0].loginLink:''}}
                <el-button type="text" size="mini" @click="turnUrl(multipleSelection[0].loginLink)">转跳</el-button>
            </div>
            <div class="content">
                <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
                办事指南：{{multipleSelection[0]?multipleSelection[0].guide:''}}
                <el-button type="text" size="mini" @click="turnUrl(multipleSelection[0].guide)">转跳</el-button>
            </div>
            <div class="content">
                <svg-icon icon-class='house' style="color:#a7a7a7"></svg-icon>
                地址：{{multipleSelection[0]?multipleSelection[0].address:''}}
            </div>
            <div class="content">
                <svg-icon icon-class='feiji' style="color:#a7a7a7"></svg-icon>
                系统数据描述：{{multipleSelection[0]?multipleSelection[0].desc:''}}
            </div>
            <div class="content">
                <svg-icon icon-class='comments' style="color:#a7a7a7"></svg-icon>
                备注：{{multipleSelection[0]?multipleSelection[0].remark:''}}
            </div>

        </el-dialog>
    </div>
</template>

<script>
import { getPersonManagers } from "@/api/personManager";

import citys from "./city";
import recordImage from "@/assets/record/isalter.png";
export default {
    data() {
        return {
            recordImage,
            showRecordVisible: false,
            dialogTitle: "新增备案",
            searchText: "",
            select: "",
            cityArray: citys,
            multipleSelection: [],
            tableData: [
                {
                    region: "广州市",
                    systemName: "信息管理系统信息管理系统",
                    systemLink: "www.baidu.com",
                    loginLink: "www.baidu.com",
                    account: "关羽",
                    password: "123456",
                    validity: "2018-10-10",
                    tel: "020-1154685",
                    address: "广东省广州市天河区林和西路8号",
                    guide: "www.baidu.com",
                    desc: "这个系统天生为我开发的，啊哈哈哈哈哈哈哈",
                    remark: "我是备注，你看看，啊啊哈哈哈哈哈哈"
                },
                {
                    region: "广州市",
                    systemName: "信息管理系统",
                    systemLink: "www.baidu.com",
                    loginLink: "www.baidu.com",
                    account: "关羽",
                    password: "123456",
                    validity: "2018-10-10",
                    tel: "020-1154685",
                    address: "广东省广州市天河区林和西路8号",
                    guide: "www.baidu.com",
                    desc: "这个系统天生为我开发的，啊哈哈哈哈哈哈哈",
                    remark: "我是备注，你看看，啊啊哈哈哈哈哈哈"
                }
            ],
            loading: false,
            total: 0,
            pageSize: 5,
            dialogVisible: false,
            form: {
                region: "",
                systemName: "",
                systemLink: "",
                loginLink: "",
                account: "",
                password: "",
                validity: "",
                tel: "",
                address: "",
                guide: "",
                desc: "",
                remark: ""
            },
            rules: {
                region: [
                    {
                        required: true,
                        message: "请选择地区",
                        trigger: "change"
                    }
                ],
                systemName: [
                    {
                        required: true,
                        message: "请输入系统名称",
                        trigger: "blur"
                    }
                ],
                validity: [
                    {
                        required: true,
                        message: "请选择有效期",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    filters: {},
    created() {},
    methods: {
        turnUrl(url) {
            window.location.href = "http://" + url;
        },
        closeDialog() {
            this.$refs["form"].resetFields();
            for (let value in this.form) {
                this.form[value] = "";
            }
        },
        submitRecord(formName) {
            this.$refs[formName].resetFields();
            for (let value in this.form) {
                this.form[value] = "";
            }
            this.dialogVisible = false;
        },
        cancelSubmit(formName) {
            this.$refs[formName].resetFields();
            for (let value in this.form) {
                this.form[value] = "";
            }
            this.dialogVisible = false;
        },
        createdRecord() {
            this.dialogTitle = "新增备案";
            this.dialogVisible = true;
        },
        modifyRecord() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    type: "warning",
                    message: "请选择至少一个备案进行修改"
                });
                return false;
            }
            for (let value in this.form) {
                this.form[value] = this.multipleSelection[0][value]
                    ? this.multipleSelection[0][value]
                    : "";
            }
            this.dialogTitle = "修改备案";
            this.dialogVisible = true;
        },
        showRecord() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    type: "warning",
                    message: "请选择至少一个备案进行预览"
                });
                return false;
            }
            this.showRecordVisible = true;
        },
        deleteRecord() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    type: "warning",
                    message: "请选择至少一个备案进行删除"
                });
                return false;
            }
            this.$confirm("此操作将永久删除该备案信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
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
    max-width: 1566px;
}
.input_width {
    width: 600px;
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
.InfoCenter {
    // background-color: deepskyblue;
    // width: 100%;
    // padding: 20px;
    // color: white;
    // border-radius: 10px;
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
</style>

