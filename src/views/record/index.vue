<template>
    <div class="app-container">
        <el-row type="flex" justify="end">
            <el-col style="width:300px;margin-bottom:10px;">
                <el-input placeholder="请输入系统名称" v-model="searchText" class="input-with-select" size='mini'>
                    <el-button slot="append" icon="el-icon-search" @click="sreachData"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" justify="start">
            <el-col>
                <el-button size="mini" type="primary" plain @click="createdRecord">新增备案</el-button>
                <el-button size="mini" type="success" plain @click="modifyRecord">修改备案</el-button>
                <el-button size="mini" type="info" plain @click="deleteRecord" v-if="rolesFlag">删除备案</el-button>
                <el-button size="mini" type="danger" plain @click="showRecord">预览</el-button>
            </el-col>
        </el-row>
        <div class="table-box">
            <el-table v-loading="loading" :data="tableData" size='mini' border @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @sort-change='tableSort'>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="region" label="地区" width="80" align="center" sortable='custom'>
                </el-table-column>
                <el-table-column prop="system_name" label="系统名称" width="150" align="center" sortable='custom'>
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.systemName}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="系统链接" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" plain size="mini" @click="turnUrl(scope.row.systemLink)">转跳</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="登入入口" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" plain size="mini" @click="turnUrl(scope.row.loginLink)">转跳</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="account" label="账号" width="100" align="center">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.account}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="password" label="密码" width="100" align="center">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.password}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="有效期" width="100" align="center" prop="validity_date" sortable='custom'>
                    <template slot-scope="scope">
                        <el-tag size='mini'>{{scope.row.validityDate?scope.row.validityDate:'暂无'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="tel" label="电话" width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="地址" width="200" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.address}}
                    </template>
                </el-table-column>
                <el-table-column label="相关文件" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" plain size="mini" @click="showFileList(scope.row.fileRecordList)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="办事指南" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" plain size="mini" @click="turnUrl(scope.row.guide)">转跳</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="系统数据描述" width="270" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.desc}}
                    </template>
                </el-table-column>
                <el-table-column label="备注" width="150" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.remark}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination background layout="prev, pager, next,sizes,total" :total="total" :page-sizes="[10, 15, 20,25]" :page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <!-- 新增用户 -->
        <el-dialog :visible.sync="dialogVisible" width="800px" :close-on-click-modal="false" @close='closeDialog' center lock-scroll top='8vh'>
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
                        <el-form-item label="有效期：" prop="validityDate">
                            <el-date-picker size="mini" type="date" value-format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期" v-model="form.validityDate" style="width:135px"></el-date-picker>
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
                            <el-input size="mini" v-model="form.tel" clearable style="width:135px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="系统链接：">
                            <el-input size="mini" v-model="form.systemLink" clearable>

                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="登入入口：">
                            <el-input size="mini" v-model="form.loginLink" clearable>

                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="办事指南：">
                            <el-input size="mini" v-model="form.guide" clearable>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="地址：">
                            <el-input size="mini" v-model="form.address" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="系统数据描述：">
                            <el-input size="mini" type="textarea" v-model="form.desc" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="备注：" prop="remark">
                            <el-input size="mini" type="textarea" v-model="form.remark" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="文件上传：" prop="remark">
                    <upload v-bind="uploadData" :materialfileList.sync='uploadData.materialfileList' :buttonFlag.sync='uploadData.buttonFlag'></upload>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="submitRecord('form')" :disabled='uploadData.buttonFlag'>确 定</el-button>
                <el-button size="mini" type="danger" @click="cancelSubmit('form')" :disabled='uploadData.buttonFlag'>取 消</el-button>
            </span>
        </el-dialog>

        <!-- 预览 -->
        <el-dialog :visible.sync="showRecordVisible" width="800px">
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
                        有效期：{{multipleSelection[0]?multipleSelection[0].validityDate:''}}
                        <template v-if="multipleSelection[0]&& !multipleSelection[0].validityDate">
                            <el-tag size="mini" type="danger">暂无有效期</el-tag>
                        </template>
                    </el-col>
                </el-row>
            </div>
            <div style="border-top:2px dashed #eee;margin:20px 0;"></div>
            <el-row class="content">
                <el-col :span="8">
                    <svg-icon icon-class='account' style="color:#a7a7a7"></svg-icon>
                    账号：{{multipleSelection[0]?multipleSelection[0].account:''}}
                    <template v-if="multipleSelection[0]&& !multipleSelection[0].account">
                        <el-tag size="mini" type="danger">暂无账号</el-tag>
                    </template>
                </el-col>
                <el-col :span="8">
                    <svg-icon icon-class='password' style="color:#a7a7a7"></svg-icon>
                    密码：{{multipleSelection[0]?multipleSelection[0].password:''}}
                    <template v-if="multipleSelection[0]&& !multipleSelection[0].password">
                        <el-tag size="mini" type="danger">暂无密码</el-tag>
                    </template>
                </el-col>

            </el-row>
            <div class="content">
                <svg-icon icon-class='phone' style="color:#a7a7a7"></svg-icon>
                电话：{{multipleSelection[0]?multipleSelection[0].tel:''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].tel">
                    <el-tag size="mini" type="danger">暂无电话</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
                系统链接：{{multipleSelection[0]?multipleSelection[0].systemLink:''}}
                <template v-if="multipleSelection[0]&& multipleSelection[0].loginLink">
                    <el-button type="text" size="mini" @click="turnUrl(multipleSelection[0].systemLink)">转跳</el-button>
                </template>
                <template v-if="multipleSelection[0]&& !multipleSelection[0].systemLink">
                    <el-tag size="mini" type="danger">暂无链接</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
                登入入口：{{multipleSelection[0]?multipleSelection[0].loginLink:''}}
                <template v-if="multipleSelection[0]&& multipleSelection[0].loginLink">
                    <el-button type="text" size="mini" @click="turnUrl(multipleSelection[0].loginLink)">转跳</el-button>
                </template>
                <template v-if="multipleSelection[0]&& !multipleSelection[0].loginLink">
                    <el-tag size="mini" type="danger">暂无入口</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
                办事指南：{{multipleSelection[0]?multipleSelection[0].guide:''}}
                <template v-if="multipleSelection[0]&& multipleSelection[0].guide">
                    <el-button type="text" size="mini" @click="turnUrl(multipleSelection[0].guide)">转跳</el-button>
                </template>
                <template v-if="multipleSelection[0]&& !multipleSelection[0].guide">
                    <el-tag size="mini" type="danger">暂无指南</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='house' style="color:#a7a7a7"></svg-icon>
                地址：{{multipleSelection[0]?multipleSelection[0].address:''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].address">
                    <el-tag size="mini" type="danger">暂无地址</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='feiji' style="color:#a7a7a7"></svg-icon>
                系统数据描述：{{multipleSelection[0]?multipleSelection[0].desc:''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].desc">
                    <el-tag size="mini" type="danger">暂无描述</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='feiji' style="color:#a7a7a7"></svg-icon>
                文件列表：
                <template v-if="multipleSelection[0]&& multipleSelection[0].fileRecordList">
                    <span class="fileItem" :key="index" v-for="(item,index) in multipleSelection[0].fileRecordList ">{{item.name}}
                        <el-tag size="mini" @click.native="downUrl(item.id)" style="cursor:pointer">下载</el-tag>
                    </span>
                </template>
                <template v-if="multipleSelection[0]&& multipleSelection[0].fileRecordList.length==0">
                    <el-tag size="mini" type="danger">暂无文件</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='comments' style="color:#a7a7a7"></svg-icon>
                备注：{{multipleSelection[0]?multipleSelection[0].remark:''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].remark">
                    <el-tag size="mini" type="danger">暂无备注</el-tag>
                </template>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="showFileVisible" width="800px" @close='closeFileDialog'>
            <files :fileList='fileListData' :clearFlag.sync='clearFlag'></files>
        </el-dialog>
    </div>
</template>

<script>
import {
    createRecord,
    updateRecord,
    getRecords,
    deleteRecord
} from "@/api/record";
import upload from "@/components/UpLoad";
import citys from "./city";
import recordImage from "@/assets/record/isalter.png";
import files from "@/components/FileList";
import SERVER from "@/api/config";
export default {
    components: {
        upload,
        files
    },
    data() {
        return {
            clearFlag: false,
            showFileVisible: false,
            fileListData: [],
            rolesFlag: true,
            uploadData: {
                uploadFolder: "备案管理",
                materialfileList: [],
                limitFlieNumber: 100,
                buttonFlag: false
            },
            recordImage,
            showRecordVisible: false,
            dialogTitle: "新增备案",
            searchText: "",
            select: "",
            cityArray: citys,
            multipleSelection: [],
            tableData: [],
            loading: false,
            total: 0,
            pageIndex: 1,
            pageSize: 15,
            currentPage: 1,
            orderBy: "create_date desc",
            dialogVisible: false,
            form: {
                region: "",
                systemName: "",
                systemLink: "",
                loginLink: "",
                account: "",
                password: "",
                validityDate: "",
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
    created() {
        let roles = this.$store.state.user.roles;
        if (roles == "普通用户") {
            this.rolesFlag = false;
        }
        this.loading = true;
        let data = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            orderBy: this.orderBy
        };
        getRecords(data)
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
        closeFileDialog() {
            this.clearFlag = true;
        },
        showFileList(data) {
            this.fileListData = data;
            this.showFileVisible = true;
        },
        downUrl(id) {
            window.open(SERVER.BASE_URL + "/file/get?id=" + id);
        },
        tableRowClassName({ row, rowIndex }) {
            let idValidity = row.validityDate
                ? row.validityDate.split("-")
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
            if (idValidityDate.getTime() < nowDay.getTime()) {
                return "danger-row";
            }
            if (idValidityDate.getTime() - nowDay.getTime() < limitTime) {
                // console.log("warning-row");
                return "warning-row";
            }
            return "";
        },
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
            getRecords(data)
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
            let data = {};
            data = {
                pageIndex: 1,
                pageSize: this.pageSize,
                orderBy: this.orderBy
            };
            data["systemName"] = this.searchText;
            getRecords(data)
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
        turnUrl(url) {
            if (url) {
                let urlHeader = url.split(":");
                if (urlHeader[0] == "https" || urlHeader[0] == "http") {
                    window.open(url);
                } else {
                    window.open("http://" + url);
                }
            } else {
                this.$message({
                    type: "warning",
                    message: "暂无链接"
                });
            }
        },
        closeDialog() {
            this.$refs["form"].resetFields();
            for (let value in this.form) {
                this.form[value] = "";
            }
            this.uploadData.materialfileList = [];
        },
        submitRecord(formName) {
            let dealFun = function() {};
            let submitData = {};
            let files = [];
            this.uploadData.materialfileList.forEach((value, index) => {
                files.push({ id: value.response.result });
            });
            this.form["fileRecordList"] = files;
            if (this.dialogTitle == "新增备案") {
                dealFun = createRecord;

                submitData = this.form;
            } else {
                dealFun = updateRecord;
                for (let val in this.multipleSelection[0]) {
                    if (this.form[val] !== undefined) {
                        this.multipleSelection[0][val] = this.form[val];
                    }
                }
                submitData = this.multipleSelection[0];
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.uploadData.buttonFlag = true;
                    dealFun(submitData)
                        .then(res => {
                            if (res.success) {
                                this.uploadData.buttonFlag = false;
                                this.dialogVisible = false;
                                this.loading = true;
                                this.searchText = "";
                                let data = {
                                    pageIndex: this.pageIndex,
                                    pageSize: this.pageSize,
                                    orderBy: this.orderBy
                                };
                                getRecords(data)
                                    .then(res => {
                                        if (res.success) {
                                            this.tableData = res.result.records;
                                            this.loading = false;
                                            this.total = Number(
                                                res.result.total
                                            );
                                            this.currentPage =
                                                res.result.current;
                                        }
                                    })
                                    .catch(err => {
                                        this.loading = false;
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
        cancelSubmit(formName) {
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
                    message: "请选择一个备案进行修改"
                });
                return false;
            }
            for (let value in this.form) {
                this.form[value] = this.multipleSelection[0][value]
                    ? this.multipleSelection[0][value]
                    : "";
            }
            this.multipleSelection[0].fileRecordList.forEach((value, index) => {
                this.uploadData.materialfileList.push({
                    name: value.name,
                    url: value.path,
                    response: {
                        result: value.id
                    }
                });
            });

            this.dialogTitle = "修改备案";
            this.dialogVisible = true;
        },
        showRecord() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    type: "warning",
                    message: "请选择一个备案进行预览"
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
                    let ids = [];
                    this.multipleSelection.map((value, index) => {
                        ids.push(value.id);
                    });
                    this.loading = true;
                    deleteRecord(ids)
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
                                getRecords(data)
                                    .then(res => {
                                        if (res.success) {
                                            this.tableData = res.result.records;
                                            this.loading = false;
                                            this.total = Number(
                                                res.result.total
                                            );
                                            this.currentPage =
                                                res.result.current;
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
            if (this.searchText) {
                data["systemName"] = this.searchText;
            }
            getRecords(data)
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
            if (this.searchText) {
                data["systemName"] = this.searchText;
            }
            getRecords(data)
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
    }
};
</script>
<style lang="scss" scoped>
.table-box {
    margin-top: 10px;
    max-width: 1666px;
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
    margin: 20px auto;
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
.fileItem {
    display: inline-block;
    margin: 0 10px;
}
</style>

