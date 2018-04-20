<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="其他文件管理" name="其他文件管理">
        <el-row type="flex" justify="end">
          <el-col style="width:400px;margin-bottom:10px;">
            <el-input placeholder="请输入文件类型" v-model="searchText" class="input-with-select" size='mini'>
              <el-button slot="append" icon="el-icon-search" @click="sreachData"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col>
            <el-button size="mini" type="primary" plain @click="createFile">新增文件</el-button>
            <el-button size="mini" type="success" plain @click="modifyFile">修改文件</el-button>
            <el-button size="mini" type="info" plain @click="removeFile">删除文件</el-button>
            <el-button size="mini" type="danger" plain @click="showFile">预览</el-button>
          </el-col>
        </el-row>
        <div class="table-box">
          <el-table v-loading="loading" :data="tableData" stripe size='mini' border @selection-change="handleSelectionChange" @sort-change='tableSort'>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="file_type_name" label="文件类型" width="180" align="center" show-overflow-tooltip sortable='custom'>
              <template slot-scope="scope">
                {{scope.row.fileTypeName}}
              </template>
            </el-table-column>
            <el-table-column prop="resume" label="文件内容简介" width="240" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="文件查看" width="120" align="center">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="showFileList(scope.row.fileRecordList)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="备注" width="180" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.remark}}
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-box">
            <el-pagination small layout="prev, pager, next,sizes,total" :total="total" :page-sizes="[10, 15, 20,25]" :page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="数据备份" name="数据备份" v-if="rolesFlag">
        <el-row type="flex" justify="start">
          <el-col>
            <el-button size="mini" type="primary" plain @click="createSqlFile">数据库备份</el-button>
            <el-button size="mini" type="success" plain @click="restoreSqlFile">数据库还原</el-button>
            <el-button size="mini" type="info" plain @click="deleteSqlFile">删除数据库备份</el-button>
          </el-col>
        </el-row>
        <div class="table-boxV2">
          <el-table v-loading="sqlData.loading" :data="sqlData.tableData" stripe size='mini' border @selection-change="handleSelectionChange" @sort-change='tableSort'>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="180" align="center" show-overflow-tooltip sortable='custom'>
              <template slot-scope="scope">
                {{scope.row.id}}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="文件名称" width="240" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="path" label="文件路径" width="240" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="创建时间" width="180" prop="create_date" align="center" show-overflow-tooltip sortable='custom'>
              <template slot-scope="scope">
                <el-tag size="mini" type="danger">{{scope.row.createDate}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-box">
            <el-pagination small layout="prev, pager, next,sizes,total" :total="sqlData.total" :page-sizes="[10, 15, 20,25]" :page-size="sqlData.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 新增文件 -->
    <el-dialog :visible.sync="dialogVisible" width="530px" center lock-scroll @close='closeDialog'>
      <div class="dialog-title">{{dialogTitle}}</div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="文件类型：" prop="file_type_name">
          <el-input size="mini" v-model="form.fileTypeName" clearable style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="文件上传：">
          <upload v-bind="uploadData" :materialfileList.sync='uploadData.materialfileList' :buttonFlag.sync='uploadData.buttonFlag'></upload>
        </el-form-item>
        <el-form-item label="文件内容简介：" prop="resume">
          <el-input size="mini" type='textarea' v-model="form.resume" clearable style="width:300px;"></el-input>
        </el-form-item>

        <el-form-item label="备注：" prop="remark">
          <el-input size="mini" type="textarea" v-model="form.remark" clearable style="width:300px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submitFile('form')" :disabled='uploadData.buttonFlag'>确 定</el-button>
        <el-button size="mini" type="danger" @click="cancelSubmit('form')" :disabled='uploadData.buttonFlag'>取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showVisible" width="800px">
      <div class="dialog-title">文件详情</div>
      <div class="content">
        <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
        文件类型：{{multipleSelection[0]?multipleSelection[0].fileTypeName:''}}
        <template v-if="multipleSelection[0]&& !multipleSelection[0].fileTypeName">
          <el-tag size="mini" type="danger">暂无文件类型</el-tag>
        </template>
      </div>
      <div class="content">
        <svg-icon icon-class='logistic' style="color:#a7a7a7"></svg-icon>
        文件内容简介：{{multipleSelection[0]?multipleSelection[0].resume:''}}
        <template v-if="multipleSelection[0]&& !multipleSelection[0].resume">
          <el-tag size="mini" type="danger">暂无文件内容简介</el-tag>
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
    getFileCommon,
    addFileCommon,
    updateFileCommon,
    removeFileCommon
} from "@/api/fileCommon";
import SERVER from '@/api/config';
import { getSQLFile, addSQLFile, resetSQLFile, deleteFile } from "@/api/file";
import upload from "@/components/UpLoad";
import files from "@/components/FileList";
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
            sqlData: {
                loading: false,
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageIndex: 1,
                pageSize: 15,
                currentPage: 1,
                orderBy: "create_date desc"
            },
            activeName: "其他文件管理",
            uploadData: {
                uploadFolder: "公共文件",
                materialfileList: [],
                limitFlieNumber: 100,
                buttonFlag: false
            },
            showVisible: false,
            dialogTitle: "新增文件",
            searchText: "",
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
                fileTypeName: "",
                resume: "",
                remark: ""
            },
            rules: {
                fileTypeName: [
                    {
                        required: true,
                        message: "请输入文件类型",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    filters: {},
    created() {
        let roles = this.$store.state.user.roles;
        if (roles == "管理员") {
            this.rolesFlag = false;
        }
        this.loading = true;
        let data = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            orderBy: this.orderBy
        };
        getFileCommon(data)
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
        downUrl(id) {
            window.open(SERVER.BASE_URL + "/file/get?id=" + id);
        },
        closeFileDialog() {
            this.clearFlag = true;
        },
        showFileList(data) {
            this.fileListData = data;
            this.showFileVisible = true;
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
        createSqlFile() {
            addSQLFile()
                .then(res => {
                    if (res.success) {
                        this.$message({
                            type: "success",
                            message: "数据备份成功"
                        });
                        this.sqlData.loading = true;
                        let data = {
                            pageIndex: this.sqlData.pageIndex,
                            pageSize: this.sqlData.pageSize,
                            orderBy: this.sqlData.orderBy,
                            type: "数据库管理"
                        };
                        getSQLFile(data)
                            .then(res => {
                                if (res.success) {
                                    this.sqlData.tableData = res.result.records;
                                    this.sqlData.loading = false;
                                    this.sqlData.total = Number(
                                        res.result.total
                                    );
                                    this.sqlData.currentPage =
                                        res.result.current;
                                }
                            })
                            .catch(err => {
                                this.sqlData.loading = false;
                            });
                    } else {
                        this.sqlData.loading = false;
                    }
                })
                .catch(err => {
                    this.sqlData.loading = false;
                });
        },
        restoreSqlFile() {
            if (this.sqlData.multipleSelection.length != 1) {
                this.$message({
                    type: "warning",
                    message: "请选择一个文件进行还原"
                });
                return false;
            }
            this.$confirm("此操作将还原数据库信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let id = "";
                    id = this.sqlData.multipleSelection[0].id;
                    this.sqlData.loading = true;

                    resetSQLFile({ id: id })
                        .then(res => {
                            if (res.success) {
                                this.$message({
                                    type: "success",
                                    message: "数据库还原成功!"
                                });
                                this.sqlData.loading = true;
                                let data = {};
                                data = {
                                    pageIndex: this.sqlData.pageIndex,
                                    pageSize: this.sqlData.pageSize,
                                    orderBy: this.sqlData.orderBy,
                                    type: "数据库管理"
                                };
                                getSQLFile(data)
                                    .then(res => {
                                        if (res.success) {
                                            this.sqlData.tableData =
                                                res.result.records;
                                            this.sqlData.loading = false;
                                            this.sqlData.total = Number(
                                                res.result.total
                                            );
                                            this.sqlData.currentPage =
                                                res.result.current;
                                        }
                                    })
                                    .catch(err => {
                                        this.sqlData.loading = false;
                                    });
                            }
                        })
                        .catch(() => {
                            this.sqlData.loading = false;
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        deleteSqlFile() {
            if (this.sqlData.multipleSelection.length == 0) {
                this.$message({
                    type: "warning",
                    message: "请选择至少一个文件进行删除"
                });
                return false;
            }
            this.$confirm("此操作将删除数据库信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let ids = [];
                    this.sqlData.multipleSelection.map((value, index) => {
                        ids.push(value.id);
                    });
                    this.sqlData.loading = true;

                    deleteFile(ids)
                        .then(res => {
                            if (res.success) {
                                this.$message({
                                    type: "success",
                                    message: "数据库备份删除成功!"
                                });
                                this.sqlData.loading = true;
                                let data = {};
                                data = {
                                    pageIndex: this.sqlData.pageIndex,
                                    pageSize: this.sqlData.pageSize,
                                    orderBy: this.sqlData.orderBy,
                                    type: "数据库管理"
                                };
                                getSQLFile(data)
                                    .then(res => {
                                        if (res.success) {
                                            this.sqlData.tableData =
                                                res.result.records;
                                            this.sqlData.loading = false;
                                            this.sqlData.total = Number(
                                                res.result.total
                                            );
                                            this.sqlData.currentPage =
                                                res.result.current;
                                        }
                                    })
                                    .catch(err => {
                                        this.sqlData.loading = false;
                                    });
                            }
                        })
                        .catch(() => {
                            this.sqlData.loading = false;
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        sreachData() {
            let data = {};
            data = {
                pageIndex: 1,
                pageSize: this.pageSize,
                orderBy: this.orderBy
            };
            data["fileTypeName"] = this.searchText;
            getFileCommon(data)
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
        submitFile(formName) {
            let dealFun = function() {};
            let submitData = {};
            let files = [];
            this.uploadData.materialfileList.forEach((value, index) => {
                files.push({ id: value.response.result });
            });
            this.form["fileRecordList"] = files;
            if (this.dialogTitle == "新增文件") {
                dealFun = addFileCommon;

                submitData = this.form;
            } else {
                dealFun = updateFileCommon;
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
                                getFileCommon(data)
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
        closeDialog() {
            this.$refs["form"].resetFields();
            for (let value in this.form) {
                this.form[value] = "";
            }
            this.uploadData.materialfileList = [];
        },
        createFile() {
            this.dialogTitle = "新增文件";
            this.dialogVisible = true;
        },
        modifyFile() {
            if (this.multipleSelection.length!=1) {
                this.$message({
                    type: "warning",
                    message: "请选择一个文件进行修改"
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

            this.dialogTitle = "修改文件";
            this.dialogVisible = true;
        },
        removeFile() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    type: "warning",
                    message: "请选择至少一个文件进行删除"
                });
                return false;
            }
            this.$confirm("此操作将永久删除该文件信息, 是否继续?", "提示", {
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
                    removeFileCommon(ids)
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
                                getFileCommon(data)
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
        showFile() {
            if (this.multipleSelection.length !=1) {
                this.$message({
                    type: "warning",
                    message: "请选择一个文件类型进行预览"
                });
                return false;
            }
            this.showVisible = true;
        },
        handleSelectionChange(val) {
            if (this.activeName == "其他文件管理") {
                this.multipleSelection = val;
            } else {
                this.sqlData.multipleSelection = val;
            }
        },
        handleSizeChange(val) {
            if (this.activeName == "数据备份") {
                let data = {};
                this.sqlData.pageSize = val;
                data = {
                    pageIndex: this.sqlData.pageIndex,
                    pageSize: this.sqlData.pageSize,
                    orderBy: this.sqlData.orderBy,
                    type: "数据库管理"
                };
                this.sqlData.loading = true;
                getSQLFile(data)
                    .then(res => {
                        if (res.success) {
                            this.sqlData.tableData = res.result.records;
                            this.sqlData.loading = false;
                            this.sqlData.total = Number(res.result.total);
                            this.sqlData.currentPage = res.result.current;
                        }
                    })
                    .catch(err => {
                        this.sqlData.loading = false;
                    });
            } else {
                let data = {};
                this.pageSize = val;
                data = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    orderBy: this.orderBy
                };
                if (this.searchText) {
                    data["fileTypeName"] = this.searchText;
                }
                this.loading = true;
                getFileCommon(data)
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
        },
        handleCurrentChange(val) {
            if (this.activeName == "数据备份") {
                let data = {};
                this.sqlData.pageIndex = val;
                data = {
                    pageIndex: this.sqlData.pageIndex,
                    pageSize: this.sqlData.pageSize,
                    orderBy: this.sqlData.orderBy,
                    type: "数据库管理"
                };
                this.sqlData.loading = true;
                getSQLFile(data)
                    .then(res => {
                        if (res.success) {
                            this.sqlData.tableData = res.result.records;
                            this.sqlData.loading = false;
                            this.sqlData.total = Number(res.result.total);
                            this.sqlData.currentPage = res.result.current;
                        }
                    })
                    .catch(err => {
                        this.sqlData.loading = false;
                    });
            } else {
                this.loading = true;
                let data = {};
                this.pageIndex = val;
                data = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    orderBy: this.orderBy
                };
                if (this.searchText) {
                    data["fileTypeName"] = this.searchText;
                }
                getFileCommon(data)
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
        },
        tableSort(row) {
            let sortData = "";
            if (row.order == "descending") {
                sortData = row.prop + " desc";
            } else {
                sortData = row.prop;
            }
            if (this.activeName == "数据备份") {
                let data = {};
                data = {
                    pageIndex: this.sqlData.pageIndex,
                    pageSize: this.sqlData.pageSize,
                    orderBy: sortData,
                    type: "数据库管理"
                };
                this.sqlData.loading = true;
                getSQLFile(data)
                    .then(res => {
                        if (res.success) {
                            this.sqlData.tableData = res.result.records;
                            this.sqlData.loading = false;
                            this.sqlData.total = Number(res.result.total);
                            this.sqlData.currentPage = res.result.current;
                        }
                    })
                    .catch(err => {
                        this.sqlData.loading = false;
                    });
            } else {
                let data = {};
                data = {
                    pageIndex: 1,
                    pageSize: this.pageSize,
                    orderBy: sortData
                };
                if (this.searchText) {
                    data["fileTypeName"] = this.searchText;
                }
                this.loading = true;
                getFileCommon(data)
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
        },
        handleClick(tab, event) {
            if (tab.name == "其他文件管理") {
                this.loading = true;
                let data = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    orderBy: this.orderBy
                };
                getFileCommon(data)
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
            if (tab.name == "数据备份") {
                this.sqlData.loading = true;
                let data = {
                    pageIndex: this.sqlData.pageIndex,
                    pageSize: this.sqlData.pageSize,
                    orderBy: this.sqlData.orderBy,
                    type: "数据库管理"
                };
                getSQLFile(data)
                    .then(res => {
                        if (res.success) {
                            this.sqlData.tableData = res.result.records;
                            this.sqlData.loading = false;
                            this.sqlData.total = Number(res.result.total);
                            this.sqlData.currentPage = res.result.current;
                        }
                    })
                    .catch(err => {
                        this.sqlData.loading = false;
                    });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.table-box {
    margin-top: 10px;
    max-width: 776px;
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
    border: #eeeeee 1px solid;
    padding: 10px;
    border-radius: 5px;
}
.table-boxV2 {
    margin-top: 10px;
    max-width: 896px;
}
</style>

