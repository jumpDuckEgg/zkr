<template>
    <div class="app-container">

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="跟踪中的项目" name="跟踪中的项目">
                <el-row type="flex" justify="start">
                    <el-col>
                        <el-button size="mini" type="primary" plain @click="dialogVisible =true">新增项目</el-button>
                        <el-button size="mini" type="success" plain>修改项目</el-button>
                        <el-button size="mini" type="info" plain>删除项目</el-button>
                        <el-button size="mini" type="danger" plain>预览</el-button>
                    </el-col>
                </el-row>
                <normaltable :loading='trackLoading' :tableMaxWidth='trackTableMaxWidth' :columns='trackColumns' :tableData='trackTableData' @multipleSelection='trackMultipleSelection' @sort='trackTableSort'></normaltable>
            </el-tab-pane>
            <el-tab-pane label="确定报名的项目" name="确定报名的项目">确定报名的项目</el-tab-pane>
            <el-tab-pane label="确定不报名的项目" name="确定不报名的项目">确定不报名的项目</el-tab-pane>
            <el-tab-pane label="已投标的项目中标" name="已投标的项目中标">已投标的项目(中标)</el-tab-pane>
            <el-tab-pane label="已投标的项目未中标" name="已投标的项目未中标">已投标的项目(未中标)</el-tab-pane>
            <el-tab-pane label="弃标的项目" name="弃标的项目">弃标的项目</el-tab-pane>
        </el-tabs>
        <!-- 新增用户 -->
        <el-dialog :visible.sync="dialogVisible" width="900px" center lock-scroll>
            <div class="dialog-title">新增用户</div>
            <el-form ref="form" :model="form" :rules="rules" label-width="70px">
                <el-form-item label="项目名称：" prop="name">
                    <el-input size="mini" v-model="form.name" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="权重：" prop="weightEnum">
                    <el-select size="mini" v-model="form.weightEnum" placeholder="请选择" class="input_width">
                        <el-option label="低" value="低"></el-option>
                        <el-option label="较低" value="较低"></el-option>
                        <el-option label="一般" value="一般"></el-option>
                        <el-option label="较高" value="较高"></el-option>
                        <el-option label="高" value="高"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="编号：" prop="biddingNo">
                    <el-input size="mini" v-model="form.biddingNo" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="公告链接：" prop="announcementLink">
                    <el-input size="mini" v-model="form.announcementLink" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="公告时间：" prop="announcementTime">
                    <el-input size="mini" v-model="form.announcementTime" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="预计得分：" prop="expectedScore">
                    <el-input size="mini" type="number" v-model="form.expectedScore" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="报名要求：" prop="reqistrationRequire">
                    <el-input size="mini" type="textarea" v-model="form.reqistrationRequire" clearable class="input_width"></el-input>
                </el-form-item>
                <el-form-item label="公告联系方式：" prop="announcementContactInfo ">
                    <el-input size="mini" type="textarea" v-model="form.announcementContactInfo" clearable class="input_width"></el-input>
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
import normaltable from "@/components/NormalTable";
import upload from "@/components/UpLoad";
export default {
    components: {
        normaltable,
        upload
    },
    data() {
        return {
            uploadData: {
                uploadFolder: "投标管理",
                materialfileList: [],
                limitFlieNumber: 100,
                buttonFlag: false
            },
            activeName: "跟踪中的项目",
            trackTableMaxWidth: "1251px",
            trackLoading: false,
            trackColumns: [
                {
                    width: 180,
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
                    width: 160,
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
                    width: 180,
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
                    announcementLink: "www.baidu.com",
                    announcementTime: "2018-10-10",
                    expectedScore: "80",
                    reqistrationRequire:
                        "必须具备一定的条件才可以必须具备一定的条件才可以",
                    weightEnum: "高",
                    fileRecordList: [],
                    announcementContactInfo:
                        "请上官网联系客服人员进行办理相关手续",
                    remark: "啊实打实大苏打实打实"
                }
            ],
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
        handleClick(tab, event) {
            console.log(tab.name);
        },
        trackMultipleSelection(val) {
            console.log(val);
        },
        trackTableSort(val) {
            console.log(val);
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
</style>

