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
                <el-button size="mini" type="primary" plain @click="dialogVisible=true">新增业绩</el-button>
                <el-button size="mini" type="success" plain>修改业绩</el-button>
                <el-button size="mini" type="info" plain>删除业绩</el-button>
                <el-button size="mini" type="danger" plain>预览</el-button>
            </el-col>
        </el-row>
        <div class="table-box">
            <el-table v-loading="loading" :data="tableData" stripe size='mini' border @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="项目名称" width="180">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="100">
                </el-table-column>
                <el-table-column label="中标时间" width="100">
                    <template slot-scope="scope">
                        <el-tag size='mini'>{{scope.row.biddingTime}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="合同时间" width="100">
                    <template slot-scope="scope">
                        <el-tag size='mini'>{{scope.row.contractTime}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="初设批复时间" width="100">
                    <template slot-scope="scope">
                        <el-tag size='mini'>{{scope.row.firstConfirmTime}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="施设批复时间" width="100">
                    <template slot-scope="scope">
                        <el-tag size='mini'>{{scope.row.confirmTime}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="工作内容" width="180">
                    <template slot-scope="scope">
                        <div class="overWord">
                            {{scope.row.designWorkDesc}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="项目规模" width="120">
                    <template slot-scope="scope">
                        {{scope.row.projectScaleDesc}}
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
        <!-- 新增业绩 -->
        <el-dialog :visible.sync="dialogVisible" width="900px" center lock-scroll>
            <div class="dialog-title">{{dialogTitle}}</div>
            <el-form ref="form" :model="form" :rules="rules" label-width="70px">
                
                <el-form-item label="项目名称：" prop="name">
                    <el-input size="mini" v-model="form.name" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="类型：" prop="type">
                    <el-select size="mini" v-model="form.type" placeholder="请选择" class="input_width">
                        <el-option label="市政工程" value="市政工程"></el-option>
                        <el-option label="高速公路" value="高速公路"></el-option>
                        <el-option label="一级公路" value="一级公路"></el-option>
                        <el-option label="二级公路" value="二级公路"></el-option>
                        <el-option label="三级公路" value="三级公路"></el-option>
                        <el-option label="四级公路" value="四级公路"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input size="mini" v-model="form.password" class="input_width" type="password" ref="password">
                        <i class="el-icon-view el-input__icon" slot="suffix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input size="mini" type="textarea" v-model="form.remark" clearable class="input_width"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini">确 定</el-button>
                <el-button size="mini" type="danger">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getPersonManagers } from "@/api/personManager";

export default {
    data() {
        return {
            dialogTitle: "新增业绩",
            searchText: "",
            select: "",
            multipleSelection: [],
            tableData: [
                {
                    name: "大型电视连续剧《西游记》剧组投资项目",
                    type: "市政工程",
                    projectLeader: "唐僧",
                    itemLeader: "孙悟空",
                    biddingTime: "2018-10-10",
                    contractTime: "2018-10-10",
                    firstConfirmTime: "2018-10-10",
                    confirmTime: "2018-10-10",
                    designWorkDesc:
                        "主要是孙悟空、猪八戒、沙和尚以及唐僧等人到西天取经",
                    projectScaleDesc: "大型电视连续剧",
                    remark: "真是太厉害啦，啊哈哈哈哈哈哈哈哈"
                }
            ],
            loading: false,
            total: 0,
            pageSize: 5,
            dialogVisible: false,
            form: {
                name: "",
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
    max-width: 1216px;
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

