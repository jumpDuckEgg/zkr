<template>
    <div class="app-container">
        <el-row type="flex" justify="end">
            <el-col style="width:400px;margin-bottom:10px;">
                <el-input placeholder="请输入合同名称" v-model="searchText" class="input-with-select" size='mini'>
                    <el-button slot="append" icon="el-icon-search" @click="sreachData"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" justify="start">
            <el-col>
                <el-button size="mini" type="primary" plain @click="createContract('zhu')">添加主包合同</el-button>
                <el-button size="mini" type="success" plain @click="createContract('fen')">添加分包合同</el-button>
                <el-button size="mini" type="info" plain @click="modifyContract">修改合同</el-button>
                <el-button size="mini" type="info" plain @click="deleteContract">删除合同</el-button>
                <el-button size="mini" type="danger" plain @click="showContract">预览</el-button>
            </el-col>
        </el-row>
        <div class="table-box">
            <tree-grid :columns="columns" :loading='loading' :tree-structure="true" :data-source="tableData" style="margin-top:10px;" @sort='tableSort' @multipleSelection='handleSelectionChange'></tree-grid>

            <div class="pagination-box">
                <el-pagination small layout="prev, pager,next,sizes,total" :total="total" :page-sizes="[10, 15, 20,25]" :page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <!-- 新增用户 -->
        <el-dialog :visible.sync="dialogVisible" width="1200px" center lock-scroll @close='closeDialog'>
            <div class="dialog-title">{{dialogTitle}}</div>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="合同编号：" prop="contractNo">
                            <el-input size="mini" v-model="form.contractNo" clearable class="input_width"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="合同名称：" prop="name">
                            <el-input size="mini" v-model="form.name" clearable class="input_width"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="对方单位：" prop="originName">
                            <el-input size="mini" v-model="form.originName" clearable class="input_width"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="院签/自签：" prop="signType">
                            <el-select size="mini" v-model="form.signType" placeholder="请选择" style="width:90px;">
                                <el-option label="院签" value="院签"></el-option>
                                <el-option label="自签" value="自签"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="合同额：" prop="price">
                            <el-input size="mini" type="number" v-model="form.price" clearable class="input_width">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="已支付金额：" prop="payment">
                            <el-input size="mini" type="number" v-model="form.payment" clearable class="input_width">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="文件上传：" prop="remark">
                            <upload v-bind="uploadData" :materialfileList.sync='uploadData.materialfileList' :buttonFlag.sync='uploadData.buttonFlag'></upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="工作内容：" prop="content">
                            <el-input size="mini" type="textarea" v-model="form.content" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工程进度：" prop="progress">
                            <el-input size="mini" type="textarea" v-model="form.progress" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="金额说明（勘察设计费）：" prop="priceDesc">
                            <editor ref="priceDesc" key="priceDesc" :parentsContent='form.priceDesc' toolbarName='priceDesc'></editor>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="支付条款：" prop="paymentTerms">
                            <editor ref="paymentTerms" key="paymentTerms" :parentsContent='form.paymentTerms' toolbarName='paymentTerms'></editor>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="支付明细：" prop="paymentItems">
                            <editor ref="paymentItems" key="paymentItems" :parentsContent='form.paymentItems' toolbarName='paymentItems'></editor>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注：" prop="remark">
                            <el-input size="mini" type="textarea" v-model="form.remark" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="submitContract('form')" :disabled='uploadData.buttonFlag'>确 定</el-button>
                <el-button size="mini" type="danger" @click="cancelSubmit('form')" :disabled='uploadData.buttonFlag'>取 消</el-button>
            </span>
        </el-dialog>
        <!-- 预览 -->
        <el-dialog :visible.sync="showVisible" width="1000px" top='3vh'>
            <div class="dialog-title">合同详情</div>
            <el-row class="content">
                <el-col :span="12">
                    <svg-icon icon-class='process'></svg-icon>
                    合同编号：{{multipleSelection[0]?multipleSelection[0].contractNo:''}}
                </el-col>
                <el-col :span="12">
                    <svg-icon icon-class='logistic'></svg-icon>
                    合同名称：{{multipleSelection[0]?multipleSelection[0].name:''}}
                </el-col>
            </el-row>
            <el-row class="content">
                <el-col :span="12">
                    <svg-icon icon-class='bussiness-man'></svg-icon>
                    对方单位：{{multipleSelection[0]?multipleSelection[0].originName:''}}
                    <template v-if="multipleSelection[0]&& !multipleSelection[0].originName">
                        <el-tag size="mini" type="danger">暂无对方单位</el-tag>
                    </template>
                </el-col>
                <el-col :span="12">
                    <svg-icon icon-class='gonglue'></svg-icon>
                    院签/自签：{{multipleSelection[0]?multipleSelection[0].signType:''}}
                    <template v-if="multipleSelection[0]&& !multipleSelection[0].signType">
                        <el-tag size="mini" type="danger">暂无院签/自签</el-tag>
                    </template>
                </el-col>
            </el-row>
            <el-row class="content">
                <el-col :span="12">
                    <svg-icon icon-class='dollar'></svg-icon>
                    合同额：{{multipleSelection[0]?multipleSelection[0].price:''}}元
                    <template v-if="multipleSelection[0]&& !multipleSelection[0].price">
                        <el-tag size="mini" type="danger">暂无合同额</el-tag>
                    </template>
                </el-col>
                <el-col :span="12">
                    <svg-icon icon-class='dollar'></svg-icon>
                    已支付金额：{{multipleSelection[0]?multipleSelection[0].payment:''}}元
                    <template v-if="multipleSelection[0]&& !multipleSelection[0].payment">
                        <el-tag size="mini" type="danger">暂无合同额</el-tag>
                    </template>
                </el-col>
            </el-row>
            <div class="content">
                <svg-icon icon-class='feiji' style="color:#a7a7a7"></svg-icon>
                文件列表：
                <template v-if="multipleSelection[0]&& multipleSelection[0].fileRecordList">
                    <span class="fileItem" :key="index" v-for="(item,index) in multipleSelection[0].fileRecordList ">{{item.name}}
                        <el-tag size="mini" @click.native="turnUrl('182.61.47.252:9998/zkr/page/file/get?id='+item.id)" style="cursor:pointer">下载</el-tag>
                    </span>
                </template>
                <template v-if="multipleSelection[0]&& multipleSelection[0].fileRecordList&& multipleSelection[0].fileRecordList.length==0">
                    <el-tag size="mini" type="danger">暂无文件</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='code'></svg-icon>
                工作内容：{{multipleSelection[0]?multipleSelection[0].content:''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].content">
                    <el-tag size="mini" type="danger">暂无工作内容</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='code'></svg-icon>
                工程进度：{{multipleSelection[0]?multipleSelection[0].progress:''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].progress">
                    <el-tag size="mini" type="danger">暂无工程进度</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='dollar'></svg-icon>
                金额说明（勘察设计费）：
                <template v-if="multipleSelection[0]">
                    <div style="margin-left:30px;" v-html="multipleSelection[0].priceDesc"></div>
                </template>
                <template v-if="multipleSelection[0]&& !multipleSelection[0].priceDesc">
                    <el-tag size="mini" type="danger">暂无金额说明（勘察设计费）</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='dollar'></svg-icon>
                支付条款：
                <template v-if="multipleSelection[0]">
                    <div style="margin-left:30px;" v-html="multipleSelection[0].paymentTerms"></div>
                </template>
                <template v-if="multipleSelection[0]&& !multipleSelection[0].paymentTerms">
                    <el-tag size="mini" type="danger">暂无支付条款</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='dollar'></svg-icon>
                支付明细：
                <template v-if="multipleSelection[0]">
                    <div style="margin-left:30px;" v-html="multipleSelection[0].paymentItems"></div>
                </template>
                <template v-if="multipleSelection[0]&& !multipleSelection[0].paymentItems">
                    <el-tag size="mini" type="danger">暂无支付明细</el-tag>
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
    </div>
</template>

<script>
import {
    getContracts,
    addContract,
    updateContract,
    removeContract
} from "@/api/contract";
import TreeGrid from "@/components/treetable/vue/treegrid.vue";
import upload from "@/components/UpLoad";
import editor from "@/components/editor";
export default {
    components: {
        editor,
        upload,
        TreeGrid
    },
    data() {
        return {
            contractType: "",
            dialogTitle: "新增主包合同",
            showVisible: false,
            uploadData: {
                uploadFolder: "合同管理",
                materialfileList: [],
                limitFlieNumber: 100,
                buttonFlag: false
            },

            parentId: "0",
            tempParentId: "0",
            searchText: "",
            select: "",
            multipleSelection: [],
            tableData: [],
            loading: false,
            total: 0,
            pageIndex: 1,
            pageSize: 15,
            currentPage: 1,
            orderBy: "create_date desc",
            dialogVisible: false,
            columns: [
                {
                    text: "类型",
                    field: "type",
                    width: "85",
                    type: "text",
                    prop: "type",
                    sort: false,
                    textAlign: "left"
                },
                {
                    text: "合同编号",
                    field: "contractNo",
                    width: "100",
                    type: "text",
                    prop: "contract_no",
                    sort: "custom",
                    textAlign: "center"
                },
                {
                    text: "合同名称",
                    field: "name",
                    width: "130",
                    type: "text",
                    prop: "name",
                    sort: "custom",
                    textAlign: "center"
                },
                {
                    text: "对方单位",
                    field: "originName",
                    width: "140",
                    type: "text",
                    prop: "origin_name",
                    sort: "custom",
                    textAlign: "center"
                },
                {
                    text: "院签/自签",
                    field: "signType",
                    width: "100",
                    type: "text",
                    prop: "sign_type",
                    sort: "custom",
                    textAlign: "center"
                },
                {
                    text: "合同额",
                    field: "price",
                    width: "90",
                    type: "text",
                    prop: "price",
                    sort: "custom",
                    textAlign: "center"
                },
                {
                    text: "已支付金额",
                    field: "payment",
                    width: "105",
                    type: "text",
                    prop: "payment",
                    sort: "custom",
                    textAlign: "center"
                },
                {
                    text: "工作内容",
                    field: "content",
                    width: "130",
                    type: "text",
                    sort: false,
                    textAlign: "center"
                },
                {
                    text: "工程进度",
                    field: "progress",
                    width: "130",
                    type: "text",
                    sort: false,
                    textAlign: "center"
                },
                {
                    text: "金额说明（勘察设计费）",
                    field: "priceDesc",
                    width: "160",
                    type: "text",
                    sort: false,
                    textAlign: "center"
                },
                {
                    text: "支付条款",
                    field: "paymentTerms",
                    width: "120",
                    type: "text",
                    sort: false,
                    textAlign: "center"
                },
                {
                    text: "支付明细",
                    field: "paymentItems",
                    width: "120",
                    type: "text",
                    sort: false,
                    textAlign: "center"
                },
                {
                    text: "文件下载",
                    field: "paymentItems",
                    width: "120",
                    type: "file",
                    sort: false,
                    textAlign: "center"
                },
                {
                    text: "备注",
                    field: "remark",
                    width: "120",
                    type: "text",
                    sort: false,
                    textAlign: "center"
                }
            ],
            form: {
                contractNo: "",
                name: "",
                originName: "",
                signType: "院签",
                price: "",
                payment: "",
                content: "",
                progress: "",
                priceDesc: "",
                paymentTerms: "",
                paymentItems: "",
                remark: "",
                fileRecordList: []
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    }
                ],
                contractNo: [
                    {
                        required: true,
                        message: "请输入编号",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    filters: {},
    created() {
        this.loading = true;
        let data = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            orderBy: this.orderBy,
            parentId: this.parentId
        };
        getContracts(data)
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
        sreachData() {
            let data = {};
            data = {
                pageIndex: 1,
                pageSize: this.pageSize,
                orderBy: this.orderBy
            };
            if (this.searchText) {
                data["name"] = this.searchText;
            } else {
                data["parentId"] = this.parentId;
            }

            getContracts(data)
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
        tableSort(sortData) {
            let data = {};
            data = {
                pageIndex: 1,
                pageSize: this.pageSize,
                orderBy: sortData,
                parentId: this.parentId
            };
            this.loading = true;
            getContracts(data)
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
        submitContract(formName) {
            let dealFun = function() {};
            let submitData = {};
            let files = [];
            this.uploadData.materialfileList.forEach((value, index) => {
                files.push({ id: value.response.result });
            });

            this.form["fileRecordList"] = files;
            this.form.priceDesc = this.$refs.priceDesc.content;
            this.form.paymentTerms = this.$refs.paymentTerms.content;
            this.form.paymentItems = this.$refs.paymentItems.content;
            if (this.dialogTitle == "新增主包合同") {
                dealFun = addContract;
                submitData = this.form;
                submitData.type = "主包";
                submitData.parentId = 0;
            } else if (this.dialogTitle == "新增分包合同") {
                dealFun = addContract;
                submitData = this.form;
                submitData.type = "分包";
                submitData.parentId = this.tempParentId;
            } else {
                dealFun = updateContract;
                this.multipleSelection[0]._parent = {};
                this.multipleSelection[0].children = null;
                for (let val in this.multipleSelection[0]) {
                    if (this.form[val] !== undefined) {
                        this.multipleSelection[0][val] = this.form[val];
                    }
                }
                submitData = this.multipleSelection[0];
            }
            console.log(submitData);
            // return false;
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
                                    orderBy: this.orderBy,
                                    parentId: this.parentId
                                };
                                getContracts(data)
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
        closeDialog() {
            this.$refs["form"].resetFields();
            for (let value in this.form) {
                this.form[value] = "";
            }
            this.form.signType = "院签";
            this.uploadData.materialfileList = [];
        },
        cancelSubmit(formName) {
            this.dialogVisible = false;
        },
        createContract(type) {
            if (type == "zhu") {
                this.contractType = "主包";
                this.dialogTitle = "新增主包合同";
            } else {
                this.contractType = "分包";
                this.dialogTitle = "新增分包合同";
                if (
                    this.multipleSelection.length !== 1 ||
                    this.multipleSelection[0].parentId !== 0
                ) {
                    this.$message({
                        type: "warning",
                        message: "请选择一个主包合同"
                    });
                    return false;
                }
                this.tempParentId = this.multipleSelection[0].id;
            }
            this.dialogVisible = true;
        },
        modifyContract() {
            if (this.multipleSelection.length !== 1) {
                this.$message({
                    type: "warning",
                    message: "请选择一个合同进行修改"
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
            this.dialogTitle = "修改业绩";
            this.dialogVisible = true;
        },
        deleteContract() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    type: "warning",
                    message: "请选择至少一个合同进行删除"
                });
                return false;
            }
            this.$confirm("此操作将永久删除该合同信息, 是否继续?", "提示", {
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
                    removeContract(ids)
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
                                    orderBy: this.orderBy,
                                    parentId: this.parentId
                                };
                                getContracts(data)
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
        showContract() {
            if (this.multipleSelection.length != 1) {
                this.$message({
                    type: "warning",
                    message: "请选择一个合同进行查看"
                });
                return false;
            }
            this.showVisible = true;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
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
                data["name"] = this.searchText;
            } else {
                data["parentId"] = this.parentId;
            }
            getContracts(data)
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
                data["name"] = this.searchText;
            } else {
                data["parentId"] = this.parentId;
            }
            getContracts(data)
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
    max-width: 1696px;
}
.input_width {
    width: 180px;
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
</style>

