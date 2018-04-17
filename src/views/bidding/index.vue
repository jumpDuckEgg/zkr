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
                            <el-button slot="append" icon="el-icon-search" @click="sreachData"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col>
                        <el-button size="mini" type="primary" plain @click="addBidding">新增项目</el-button>
                        <el-button size="mini" type="success" plain @click="modifyBidding">修改项目</el-button>
                        <el-button size="mini" type="info" plain @click="deleteBidding">删除项目</el-button>
                        <el-button size="mini" type="danger" plain @click="showBidding">预览</el-button>
                        <el-button size="mini" type="danger" plain @click="changeStatusBidding('yes')">报名</el-button>
                        <el-button size="mini" type="danger" plain @click="changeStatusBidding('no')">不报名</el-button>
                    </el-col>
                </el-row>
                <normaltable tableType='跟踪中的项目' :loading='trackTable.loading' :tableMaxWidth='trackTable.tableMaxWidth' :columns='trackColumns' :tableData='trackTableData' @multipleSelection='multipleSelections' @sort='tableSort'></normaltable>
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
                            <el-button slot="append" icon="el-icon-search" @click="sreachData"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col>
                        <el-button size="mini" type="success" plain @click="modifyBidding">修改项目</el-button>
                        <el-button size="mini" type="info" plain @click="deleteBidding">删除项目</el-button>
                        <el-button size="mini" type="danger" plain @click="showBidding">预览</el-button>
                        <el-button size="mini" type="danger" plain @click="changeStatusBidding('yes')">中标</el-button>
                        <el-button size="mini" type="danger" plain @click="changeStatusBidding('no')">不中标</el-button>
                    </el-col>
                </el-row>
                <normaltable tableType='确定报名的项目' :loading='checkTable.loading' :tableMaxWidth='checkTable.tableMaxWidth' :columns='checkColumns' :tableData='checkTableData' @multipleSelection='multipleSelections' @sort='tableSort'></normaltable>
                <div class="pagination-box">
                    <el-pagination background layout="prev, pager, next,sizes,total" :total="checkTable.total" :page-sizes="[10, 15, 20,25]" :page-size="checkTable.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="确定不报名的项目" name="确定不报名的项目">
                <el-row type="flex" justify="end">
                    <el-col style="width:400px;margin-bottom:10px;">
                        <el-input placeholder="请输入内容" v-model="unCheckTable.searchText" class="input-with-select" size='mini'>
                            <el-select v-model="unCheckTable.select" slot="prepend" placeholder="请选择" style="width:100px;">
                                <el-option label="项目名称" value="name"></el-option>
                                <el-option label="编号" value="biddingNo"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search" @click="sreachData"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col>
                        <el-button size="mini" type="info" plain @click="deleteBidding">删除项目</el-button>
                        <el-button size="mini" type="danger" plain @click="showBidding">预览</el-button>
                        <el-button size="mini" type="danger" plain @click="changeStatusBidding">恢复</el-button>
                    </el-col>
                </el-row>
                <normaltable tableType='确定不报名的项目' :loading='unCheckTable.loading' :tableMaxWidth='unCheckTable.tableMaxWidth' :columns='unCheckColumns' :tableData='unCheckTableData' @multipleSelection='multipleSelections' @sort='tableSort'></normaltable>
                <div class="pagination-box">
                    <el-pagination background layout="prev, pager, next,sizes,total" :total="unCheckTable.total" :page-sizes="[10, 15, 20,25]" :page-size="unCheckTable.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已投标的项目中标" name="已投标的项目中标">
                <el-row type="flex" justify="end">
                    <el-col style="width:400px;margin-bottom:10px;">
                        <el-input placeholder="请输入内容" v-model="successTable.searchText" class="input-with-select" size='mini'>
                            <el-select v-model="successTable.select" slot="prepend" placeholder="请选择" style="width:100px;">
                                <el-option label="项目名称" value="name"></el-option>
                                <el-option label="编号" value="biddingNo"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search" @click="sreachData"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col>
                        <el-button size="mini" type="success" plain @click="modifyBidding">修改项目</el-button>
                        <el-button size="mini" type="info" plain @click="deleteBidding">删除项目</el-button>
                        <el-button size="mini" type="danger" plain @click="showBidding">预览</el-button>
                        <el-button size="mini" type="danger" plain @click="changeStatusBidding">弃标</el-button>
                    </el-col>
                </el-row>
                <normaltable tableType='已投标的项目中标' :loading='successTable.loading' :tableMaxWidth='successTable.tableMaxWidth' :columns='successColumns' :tableData='successTableData' @multipleSelection='multipleSelections' @sort='tableSort'></normaltable>
                <div class="pagination-box">
                    <el-pagination background layout="prev, pager, next,sizes,total" :total="successTable.total" :page-sizes="[10, 15, 20,25]" :page-size="successTable.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已投标的项目未中标" name="已投标的项目未中标">
                <el-row type="flex" justify="end">
                    <el-col style="width:400px;margin-bottom:10px;">
                        <el-input placeholder="请输入内容" v-model="failTable.searchText" class="input-with-select" size='mini'>
                            <el-select v-model="failTable.select" slot="prepend" placeholder="请选择" style="width:100px;">
                                <el-option label="项目名称" value="name"></el-option>
                                <el-option label="编号" value="biddingNo"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search" @click="sreachData"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col>
                        <el-button size="mini" type="success" plain @click="modifyBidding">修改项目</el-button>
                        <el-button size="mini" type="info" plain @click="deleteBidding">删除项目</el-button>
                        <el-button size="mini" type="danger" plain @click="showBidding">预览</el-button>
                    </el-col>
                </el-row>
                <normaltable tableType='已投标的项目中标' :loading='failTable.loading' :tableMaxWidth='failTable.tableMaxWidth' :columns='failColumns' :tableData='failTableData' @multipleSelection='multipleSelections' @sort='tableSort'></normaltable>
                <div class="pagination-box">
                    <el-pagination background layout="prev, pager, next,sizes,total" :total="failTable.total" :page-sizes="[10, 15, 20,25]" :page-size="failTable.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="弃标的项目" name="弃标的项目">
                <el-row type="flex" justify="end">
                    <el-col style="width:400px;margin-bottom:10px;">
                        <el-input placeholder="请输入内容" v-model="abandonTable.searchText" class="input-with-select" size='mini'>
                            <el-select v-model="abandonTable.select" slot="prepend" placeholder="请选择" style="width:100px;">
                                <el-option label="项目名称" value="name"></el-option>
                                <el-option label="编号" value="biddingNo"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search" @click="sreachData"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col>
                        <el-button size="mini" type="success" plain @click="modifyBidding">修改项目</el-button>
                        <el-button size="mini" type="info" plain @click="deleteBidding">删除项目</el-button>
                        <el-button size="mini" type="danger" plain @click="showBidding">预览</el-button>
                        <el-button size="mini" type="danger" plain @click="changeStatusBidding">恢复</el-button>
                    </el-col>
                </el-row>
                <normaltable tableType='已投标的项目中标' :loading='abandonTable.loading' :tableMaxWidth='abandonTable.tableMaxWidth' :columns='abandonColumns' :tableData='abandonTableData' @multipleSelection='multipleSelections' @sort='tableSort'></normaltable>
                <div class="pagination-box">
                    <el-pagination background layout="prev, pager, next,sizes,total" :total="abandonTable.total" :page-sizes="[10, 15, 20,25]" :page-size="abandonTable.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 新增投标 -->
        <el-dialog :visible.sync="dialogVisible" width="950px" center lock-scroll @close='closeDialog'>
            <div class="dialog-title">{{dialogTitle}}</div>
            <el-form ref="form" :model="form" :rules="rules" label-width="130px" :inline="true">
                <!-- 跟踪中 -->
                <template v-if="activeName == '跟踪中的项目'">
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
                    <el-form-item label="报名要求：" prop="registrationRequire">
                        <el-input size="mini" type="textarea" v-model="form.registrationRequire" clearable style="width:685px;"></el-input>
                    </el-form-item>
                    <el-form-item label="公告联系方式：" prop="announcementContactInfo">
                        <el-input size="mini" type="textarea" v-model="form.announcementContactInfo" clearable style="width:685px;"></el-input>
                    </el-form-item>
                </template>
                <!-- 确定报名的项目 -->
                <template v-if="activeName == '确定报名的项目'">
                    <el-form-item label="系统链接：" prop="systemLink">
                        <el-input size="mini" v-model="form.systemLink" clearable style="width:160px;"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：" prop="type">
                        <el-select size="mini" v-model="form.type" placeholder="请选择" style="width:120px;">
                            <el-option label="主标" value="主标"></el-option>
                            <el-option label="主标" value="主标"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开标时间: " prop="openingTime">
                        <el-date-picker size="mini" type="date" value-format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期" v-model="form.openingTime" style="width:135px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="答疑时间: " prop="answeringTime">
                        <el-date-picker size="mini" type="date" value-format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期" v-model="form.answeringTime" style="width:135px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="投标保证金: " prop="promisePrice">
                        <el-input size="mini" type="number" v-model="form.promisePrice" clearable style="width:180px;">
                            <template slot="append">万元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="保证金截止时间: " prop="cutOffTime">
                        <el-date-picker size="mini" type="date" value-format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期" v-model="form.cutOffTime" style="width:135px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="原件要求：" prop="originalRequirement">
                        <el-input size="mini" type="textarea" v-model="form.originalRequirement" clearable style="width:685px;"></el-input>
                    </el-form-item>
                    <el-form-item label="项目负责人：" prop="projectLeader">
                        <el-input size="mini" v-model="form.projectLeader" clearable style="width:140px;"></el-input>
                    </el-form-item>
                    <el-form-item label="标书制作人：" prop="biddingMaker">
                        <el-input size="mini" v-model="form.biddingMaker" clearable style="width:140px;"></el-input>
                    </el-form-item>
                    <el-form-item label="标书复核人：" prop="biddingReviewer">
                        <el-input size="mini" v-model="form.biddingReviewer" clearable style="width:140px;"></el-input>
                    </el-form-item>
                    <el-form-item label="开标人：" prop="biddingOpener">
                        <el-input size="mini" v-model="form.biddingOpener" clearable style="width:140px;"></el-input>
                    </el-form-item>
                    <el-form-item label="投标进度：" prop="biddingProgress">
                        <el-select size="mini" v-model="form.biddingProgress" placeholder="请选择" style="width:120px;">
                            <el-option label="已完成报名" value="已完成报名"></el-option>
                            <el-option label="保证金已提交" value="保证金已提交"></el-option>
                            <el-option label="标书制作中" value="标书制作中"></el-option>
                            <el-option label="标书核查中" value="标书核查中"></el-option>
                            <el-option label="出版封标" value="出版封标"></el-option>
                            <el-option label="已完成" value="已完成"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="系统联系方式：" prop="systemContactInfo">
                        <el-input size="mini" type="textarea" v-model="form.systemContactInfo" clearable style="width:685px;"></el-input>
                    </el-form-item>
                </template>
                <!-- 已投标的项目中标 -->
                <template v-if="activeName == '已投标的项目中标'">
                    <el-form-item label="中标金额: " prop="bidPrice">
                        <el-input size="mini" type="number" v-model="form.bidPrice" clearable style="width:180px;">
                            <template slot="append">万元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="项目进度：" prop="processProgress">
                        <el-select size="mini" v-model="form.processProgress" placeholder="请选择" style="width:120px;">
                            <el-option label="已领取中标通知书" value="已领取中标通知书"></el-option>
                            <el-option label="已签订合同" value="已签订合同"></el-option>
                            <el-option label="项目实施中" value="项目实施中"></el-option>
                            <el-option label="初步设计已完成" value="初步设计已完成"></el-option>
                            <el-option label="施工图设计已完成" value="施工图设计已完成"></el-option>
                            <el-option label="后续服务中" value="后续服务中"></el-option>
                            <el-option label="项目已完成" value="项目已完成"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <!-- 已投标的项目未中标 -->
                <template v-if="activeName == '已投标的项目未中标'||activeName == '已投标的项目中标'">
                    <el-form-item label="保证金退还情况：" prop="promisePriceStatus">
                        <el-select size="mini" v-model="form.promisePriceStatus" placeholder="请选择" style="width:120px;">
                            <el-option label="未退还" value="未退还"></el-option>
                            <el-option label="待确认" value="待确认"></el-option>
                            <el-option label="已退还" value="已退还"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="保证金退还说明：" prop="returnDesc">
                        <el-input size="mini" type="textarea" v-model="form.returnDesc" clearable style="width:685px;"></el-input>
                    </el-form-item>
                </template>
                <!-- 弃标的项目 -->
                <template v-if="activeName == '弃标的项目'">
                    <el-form-item label="弃标要求：" prop="giveUpRequire">
                        <el-input size="mini" type="textarea" v-model="form.giveUpRequire" clearable style="width:685px;"></el-input>
                    </el-form-item>
                </template>
                <!-- 通用 -->
                <el-form-item label="文件上传：" prop="remark">
                    <upload v-bind="uploadData" :materialfileList.sync='uploadData.materialfileList' :buttonFlag.sync='uploadData.buttonFlag'></upload>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input size="mini" type="textarea" v-model="form.remark" clearable style="width:685px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="submitBidding('form')" :disabled='uploadData.buttonFlag'>确 定</el-button>
                <el-button size="mini" type="danger" @click="cancelSubmit('form')" :disabled='uploadData.buttonFlag'>取 消</el-button>
            </span>
        </el-dialog>

        <!-- 预览模块 -->
        <el-dialog :visible.sync="showBiddingVisible" width="1200px" top='5vh'>
            <div class="dialog-title">投标详情</div>
            <div class="dialog-level">跟踪阶段：</div>
            <el-row class="content">
                <el-col :span="6">
                    <svg-icon icon-class='process'></svg-icon>
                    项目名字：{{tempBiddingData.name}}
                </el-col>
                <el-col :span="6">
                    <svg-icon icon-class='logistic'></svg-icon>
                    编号: {{tempBiddingData.biddingNo}}
                    <template v-if="tempBiddingData&& !tempBiddingData.biddingNo">
                        <el-tag size="mini" type="danger">暂无编号</el-tag>
                    </template>
                </el-col>
                <el-col :span="6">
                    <svg-icon icon-class='clock'></svg-icon>
                    公告时间: {{tempBiddingData.announcementTime}}
                    <template v-if="tempBiddingData&& !tempBiddingData.announcementTime">
                        <el-tag size="mini" type="danger">暂无公告时间</el-tag>
                    </template>
                </el-col>
                <el-col :span="6">
                    <svg-icon icon-class='logistic'></svg-icon>
                    预计得分: {{tempBiddingData.expectedScore}}
                    <template v-if="tempBiddingData&& !tempBiddingData.expectedScore">
                        <el-tag size="mini" type="danger">暂无预计得分</el-tag>
                    </template>
                </el-col>
            </el-row>
            <el-row class="content">
                <el-col :span="12">
                    <svg-icon icon-class='logistic'></svg-icon>
                    公告链接: {{tempBiddingData.announcementLink}}
                    <template v-if="tempBiddingData&& !tempBiddingData.announcementLink">
                        <el-tag size="mini" type="danger">暂无公告链接</el-tag>
                    </template>
                </el-col>
                <el-col :span="12">
                    <svg-icon icon-class='house'></svg-icon>
                    公告联系方式： {{tempBiddingData.announcementContactInfo}}
                    <template v-if="tempBiddingData&& !tempBiddingData.announcementContactInfo">
                        <el-tag size="mini" type="danger">暂无公告联系方式</el-tag>
                    </template>
                </el-col>
            </el-row>
            <div class="content">
                <svg-icon icon-class='attachment'></svg-icon>
                报名要求： {{tempBiddingData.registrationRequire}}
                <template v-if="tempBiddingData&& !tempBiddingData.registrationRequire">
                    <el-tag size="mini" type="danger">暂无报名要求</el-tag>
                </template>
            </div>
            <div class="dialog-level">通用阶段：</div>
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
            <template v-if="activeName == '确定报名的项目'||activeName=='已投标的项目中标'||activeName == '已投标的项目未中标'||activeName == '弃标的项目'">
                <div class="dialog-level">确定报名阶段：</div>
                <div class="content">
                    <svg-icon icon-class='logistic'></svg-icon>
                    系统链接: {{tempBiddingData.systemLink}}
                    <template v-if="tempBiddingData&& !tempBiddingData.systemLink">
                        <el-tag size="mini" type="danger">暂无系统链接</el-tag>
                    </template>
                </div>
                <el-row class="content">
                    <el-col :span="6">
                        <svg-icon icon-class='clock'></svg-icon>
                        开标时间: {{tempBiddingData.openingTime}}
                        <template v-if="tempBiddingData&& !tempBiddingData.openingTime">
                            <el-tag size="mini" type="danger">暂无开标时间</el-tag>
                        </template>
                    </el-col>
                    <el-col :span="6">
                        <svg-icon icon-class='clock'></svg-icon>
                        答疑时间: {{tempBiddingData.answeringTime}}
                        <template v-if="tempBiddingData&& !tempBiddingData.answeringTime">
                            <el-tag size="mini" type="danger">暂无答疑时间</el-tag>
                        </template>
                    </el-col>
                    <el-col :span="6">
                        <svg-icon icon-class='dollar'></svg-icon>
                        投标保证金: {{tempBiddingData.promisePrice}}
                        <template v-if="tempBiddingData&& !tempBiddingData.promisePrice">
                            <el-tag size="mini" type="danger">暂无投标保证金</el-tag>
                        </template>
                    </el-col>
                    <el-col :span="6">
                        <svg-icon icon-class='clock'></svg-icon>
                        保证金截止时间: {{tempBiddingData.cutOffTime}}
                        <template v-if="tempBiddingData&& !tempBiddingData.cutOffTime">
                            <el-tag size="mini" type="danger">暂无保证金截止时间</el-tag>
                        </template>
                    </el-col>
                </el-row>
                <el-row class="content">
                    <el-col :span="6">
                        <svg-icon icon-class='bussiness-man'></svg-icon>
                        项目负责人: {{tempBiddingData.projectLeader}}
                        <template v-if="tempBiddingData&& !tempBiddingData.projectLeader">
                            <el-tag size="mini" type="danger">暂无项目负责人</el-tag>
                        </template>
                    </el-col>
                    <el-col :span="6">
                        <svg-icon icon-class='bussiness-man'></svg-icon>
                        标书制作人: {{tempBiddingData.biddingMaker}}
                        <template v-if="tempBiddingData&& !tempBiddingData.biddingMaker">
                            <el-tag size="mini" type="danger">暂无标书制作人</el-tag>
                        </template>
                    </el-col>
                    <el-col :span="6">
                        <svg-icon icon-class='bussiness-man'></svg-icon>
                        标书复核人: {{tempBiddingData.biddingReviewer}}
                        <template v-if="tempBiddingData&& !tempBiddingData.biddingReviewer">
                            <el-tag size="mini" type="danger">暂无标书复核人</el-tag>
                        </template>
                    </el-col>
                    <el-col :span="6">
                        <svg-icon icon-class='bussiness-man'></svg-icon>
                        开标人: {{tempBiddingData.biddingOpener}}
                        <template v-if="tempBiddingData&& !tempBiddingData.biddingOpener">
                            <el-tag size="mini" type="danger">暂无开标人</el-tag>
                        </template>
                    </el-col>
                </el-row>
                <div class="content">
                    <svg-icon icon-class='feiji'></svg-icon>
                    投标进度: {{tempBiddingData.biddingProgress}}
                    <template v-if="tempBiddingData&& !tempBiddingData.biddingProgress">
                        <el-tag size="mini" type="danger">暂无投标进度</el-tag>
                    </template>
                </div>
                <div class="content">
                    <svg-icon icon-class='comments'></svg-icon>
                    原件要求: {{tempBiddingData.originalRequirement}}
                    <template v-if="tempBiddingData&& !tempBiddingData.originalRequirement">
                        <el-tag size="mini" type="danger">暂无原件要求</el-tag>
                    </template>
                </div>
                <div class="content">
                    <svg-icon icon-class='comments'></svg-icon>
                    系统联系方式: {{tempBiddingData.systemContactInfo}}
                    <template v-if="tempBiddingData&& !tempBiddingData.systemContactInfo">
                        <el-tag size="mini" type="danger">暂无系统联系方式</el-tag>
                    </template>
                </div>
            </template>
            <template v-if="activeName=='已投标的项目中标'||activeName == '弃标的项目'">
                <div class="dialog-level">已投标的项目中标：</div>
                <el-row class="content">
                    <el-col :span="8">
                        <svg-icon icon-class='dollar'></svg-icon>
                        中标金额: {{tempBiddingData.bidPrice}}
                        <template v-if="tempBiddingData&& !tempBiddingData.bidPrice">
                            <el-tag size="mini" type="danger">暂无中标金额</el-tag>
                        </template>
                    </el-col>
                    <el-col :span="8">
                        <svg-icon icon-class='feiji'></svg-icon>
                        项目进度: {{tempBiddingData.processProgress}}
                        <template v-if="tempBiddingData&& !tempBiddingData.processProgress">
                            <el-tag size="mini" type="danger">暂无项目进度</el-tag>
                        </template>
                    </el-col>
                    <el-col :span="8">
                        <svg-icon icon-class='logistic'></svg-icon>
                        投标保证金退还情况: {{tempBiddingData.promisePriceStatus}}
                        <template v-if="tempBiddingData&& !tempBiddingData.promisePriceStatus">
                            <el-tag size="mini" type="danger">暂无投标保证金退还情况</el-tag>
                        </template>
                    </el-col>
                </el-row>
                <div class="content">
                    <svg-icon icon-class='comments'></svg-icon>
                    投标保证金退还说明: {{tempBiddingData.returnDesc}}
                    <template v-if="tempBiddingData&& !tempBiddingData.returnDesc">
                        <el-tag size="mini" type="danger">暂无投标保证金退还说明</el-tag>
                    </template>
                </div>
            </template>
            <template v-if="activeName == '已投标的项目未中标'">
                <div class="dialog-level">已投标的项目未中标：</div>
                <div class="content">
                    <svg-icon icon-class='logistic'></svg-icon>
                    投标保证金退还情况: {{tempBiddingData.promisePriceStatus}}
                    <template v-if="tempBiddingData&& !tempBiddingData.promisePriceStatus">
                        <el-tag size="mini" type="danger">暂无投标保证金退还情况</el-tag>
                    </template>
                </div>
                <div class="content">
                    <svg-icon icon-class='comments'></svg-icon>
                    投标保证金退还说明: {{tempBiddingData.returnDesc}}
                    <template v-if="tempBiddingData&& !tempBiddingData.returnDesc">
                        <el-tag size="mini" type="danger">暂无投标保证金退还说明</el-tag>
                    </template>
                </div>
            </template>
            <template v-if="activeName == '弃标的项目'">
                <div class="dialog-level">弃标的项目：</div>
                <div class="content">
                    <svg-icon icon-class='comments'></svg-icon>
                    弃标要求: {{tempBiddingData.giveUpRequire}}
                    <template v-if="tempBiddingData&& !tempBiddingData.giveUpRequire">
                        <el-tag size="mini" type="danger">暂无弃标要求</el-tag>
                    </template>
                </div>
            </template>
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
            // 跟踪中的项目
            trackTable: {
                tableMaxWidth: "1331px",
                loading: false,
                searchText: "",
                select: "",
                total: 0,
                pageIndex: 1,
                pageSize: 15,
                currentPage: 1,
                orderBy: "create_date desc",
                status: "跟踪中的项目"
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
                    width: 100,
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
                    field: "registrationRequire",
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
            trackTableData: [],
            // 确定报名的项目
            checkTable: {
                tableMaxWidth: "1611px",
                loading: false,
                searchText: "",
                select: "",
                total: 0,
                pageIndex: 1,
                pageSize: 15,
                currentPage: 1,
                orderBy: "create_date desc",
                status: "确定报名的项目"
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
                    width: 220,
                    prop: "reqistration_require",
                    text: "报名要求",
                    field: "registrationRequire",
                    sort: false,
                    type: "text"
                },
                {
                    width: 80,
                    prop: "system_link",
                    text: "系统链接",
                    field: "systemLink",
                    sort: false,
                    type: "button"
                },
                {
                    width: 100,
                    prop: "opening_time",
                    text: "开标时间",
                    field: "openingTime",
                    sort: "custom",
                    type: "text"
                },
                {
                    width: 100,
                    prop: "answering_time",
                    text: "答疑时间",
                    field: "answeringTime",
                    sort: "custom",
                    type: "text"
                },
                {
                    width: 110,
                    prop: "promise_price",
                    text: "投标保证金",
                    field: "promisePrice",
                    sort: "custom",
                    type: "text"
                },
                {
                    width: 135,
                    prop: "cut_off_time",
                    text: "保证金截止时间 ",
                    field: "cutOffTime",
                    sort: "custom",
                    type: "text"
                },
                {
                    width: 160,
                    prop: "original_requirement",
                    text: "原件要求",
                    field: "originalRequirement",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "project_leader",
                    text: "项目负责人",
                    field: "projectLeader",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_maker",
                    text: "标书制作人",
                    field: "biddingMaker",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_reviewer",
                    text: "标书复核人",
                    field: "biddingReviewer",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_opener",
                    text: "开标人",
                    field: "biddingOpener",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_progress",
                    text: "投标进度",
                    field: "biddingProgress",
                    sort: false,
                    type: "text"
                },
                {
                    width: 160,
                    prop: "system_contact_info",
                    text: "系统联系方式",
                    field: "systemContactInfo",
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
                    width: 140,
                    prop: "remark",
                    text: "备注",
                    field: "remark",
                    sort: false,
                    type: "text"
                }
            ],
            checkTableData: [],
            // 确定不报名的项目
            unCheckTable: {
                tableMaxWidth: "1311px",
                loading: false,
                searchText: "",
                select: "",
                total: 0,
                pageIndex: 1,
                pageSize: 15,
                currentPage: 1,
                orderBy: "create_date desc",
                status: "确定不报名的项目"
            },
            unCheckBidding: [], //确定不报名的项目
            unCheckColumns: [
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
                    width: 100,
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
                    field: "registrationRequire",
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
            unCheckTableData: [],
            // 已投标的项目中标
            successTable: {
                tableMaxWidth: "1611px",
                loading: false,
                searchText: "",
                select: "",
                total: 0,
                pageIndex: 1,
                pageSize: 15,
                currentPage: 1,
                orderBy: "create_date desc",
                status: "已投标的项目中标"
            },
            successBidding: [], //跟踪中的项目
            successColumns: [
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
                    prop: "system_link",
                    text: "系统链接",
                    field: "systemLink",
                    sort: false,
                    type: "button"
                },
                {
                    width: 110,
                    prop: "bid_price",
                    text: "中标金额",
                    field: "bidPrice",
                    sort: "custom",
                    type: "text"
                },
                {
                    width: 220,
                    prop: "return_Desc",
                    text: "投标保证金退还说明",
                    field: "returnDesc",
                    sort: false,
                    type: "text"
                },
                {
                    width: 160,
                    prop: "promise_price_status",
                    text: "投标保证金退还情况",
                    field: "promisePriceStatus",
                    sort: "custom",
                    type: "text"
                },
                {
                    width: 120,
                    prop: "process_progress",
                    text: "项目进度",
                    field: "processProgress",
                    sort: "custom",
                    type: "text"
                },
                {
                    width: 90,
                    prop: "project_leader",
                    text: "项目负责人",
                    field: "projectLeader",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_maker",
                    text: "标书制作人",
                    field: "biddingMaker",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_reviewer",
                    text: "标书复核人",
                    field: "biddingReviewer",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_opener",
                    text: "开标人",
                    field: "biddingOpener",
                    sort: false,
                    type: "text"
                },
                {
                    width: 160,
                    prop: "system_contact_info",
                    text: "系统联系方式",
                    field: "systemContactInfo",
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
                    width: 140,
                    prop: "remark",
                    text: "备注",
                    field: "remark",
                    sort: false,
                    type: "text"
                }
            ],
            successTableData: [],
            // 已投标的项目未中标
            failTable: {
                tableMaxWidth: "1586px",
                loading: false,
                searchText: "",
                select: "",
                total: 0,
                pageIndex: 1,
                pageSize: 15,
                currentPage: 1,
                orderBy: "create_date desc",
                status: "已投标的项目未中标"
            },
            failBidding: [], //跟踪中的项目
            failColumns: [
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
                    prop: "system_link",
                    text: "系统链接",
                    field: "systemLink",
                    sort: false,
                    type: "button"
                },
                {
                    width: 220,
                    prop: "return_Desc",
                    text: "投标保证金退还说明",
                    field: "returnDesc",
                    sort: false,
                    type: "text"
                },
                {
                    width: 160,
                    prop: "promise_price_status",
                    text: "投标保证金退还情况",
                    field: "promisePriceStatus",
                    sort: "custom",
                    type: "text"
                },
                {
                    width: 90,
                    prop: "project_leader",
                    text: "项目负责人",
                    field: "projectLeader",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_maker",
                    text: "标书制作人",
                    field: "biddingMaker",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_reviewer",
                    text: "标书复核人",
                    field: "biddingReviewer",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_opener",
                    text: "开标人",
                    field: "biddingOpener",
                    sort: false,
                    type: "text"
                },
                {
                    width: 160,
                    prop: "system_contact_info",
                    text: "系统联系方式",
                    field: "systemContactInfo",
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
                    width: 140,
                    prop: "remark",
                    text: "备注",
                    field: "remark",
                    sort: false,
                    type: "text"
                }
            ],
            failTableData: [],
            // 弃标的项目
            abandonTable: {
                tableMaxWidth: "1586px",
                loading: false,
                searchText: "",
                select: "",
                total: 0,
                pageIndex: 1,
                pageSize: 15,
                currentPage: 1,
                orderBy: "create_date desc",
                status: "弃标的项目"
            },
            abandonBidding: [], //跟踪中的项目
            abandonColumns: [
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
                    prop: "system_link",
                    text: "系统链接",
                    field: "systemLink",
                    sort: false,
                    type: "button"
                },
                {
                    width: 220,
                    prop: "return_Desc",
                    text: "投标保证金退还说明",
                    field: "returnDesc",
                    sort: false,
                    type: "text"
                },
                {
                    width: 160,
                    prop: "promise_price_status",
                    text: "投标保证金退还情况",
                    field: "promisePriceStatus",
                    sort: "custom",
                    type: "text"
                },
                {
                    width: 90,
                    prop: "project_leader",
                    text: "项目负责人",
                    field: "projectLeader",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_maker",
                    text: "标书制作人",
                    field: "biddingMaker",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_reviewer",
                    text: "标书复核人",
                    field: "biddingReviewer",
                    sort: false,
                    type: "text"
                },
                {
                    width: 90,
                    prop: "bidding_opener",
                    text: "开标人",
                    field: "biddingOpener",
                    sort: false,
                    type: "text"
                },
                {
                    width: 160,
                    prop: "system_contact_info",
                    text: "系统联系方式",
                    field: "systemContactInfo",
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
                    width: 140,
                    prop: "remark",
                    text: "备注",
                    field: "remark",
                    sort: false,
                    type: "text"
                }
            ],
            abandonTableData: [],
            dialogVisible: false,
            form: {
                name: null,
                biddingNo: null,
                announcementLink: null,
                announcementTime: null,
                expectedScore: null,
                registrationRequire: "",
                weightEnum: null,
                fileRecordList: [],
                announcementContactInfo: null,
                remark: null,
                systemLink: null,
                openingTime: null,
                answeringTime: null,
                promisePrice: null,
                cutOffTime: null,
                originalRequirement: null,
                projectLeader: null,
                biddingMaker: null,
                biddingReviewer: null,
                biddingOpener: null,
                biddingProgress: null,
                systemContactInfo: null,
                bidPrice: null,
                processProgress: null,
                promisePriceStatus: null,
                returnDesc: null,
                giveUpRequire: null
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
    created() {
        this.trackTable.loading = true;
        let data = {
            pageIndex: this.trackTable.pageIndex,
            pageSize: this.trackTable.pageSize,
            orderBy: this.trackTable.orderBy,
            status: "跟踪中的项目"
        };
        getBiddings(data)
            .then(res => {
                if (res.success) {
                    this.trackTableData = res.result.records;
                    this.trackTable.loading = false;
                    this.trackTable.total = Number(res.result.total);
                    this.trackTable.currentPage = res.result.current;
                }
            })
            .catch(err => {
                this.trackTable.loading = false;
            });
    },
    methods: {
        sreachData() {
            let tempTable = {};
            let tempTableData = {};
            if (this.activeName == "跟踪中的项目") {
                tempTable = this.trackTable;
                tempTableData = this.trackTableData;
            }
            if (this.activeName == "确定报名的项目") {
                tempTable = this.checkTable;
                tempTableData = this.checkTableData;
            }
            if (this.activeName == "确定不报名的项目") {
                tempTable = this.unCheckTable;
                tempTableData = this.unCheckTableData;
            }
            if (this.activeName == "已投标的项目中标") {
                tempTable = this.successTable;
                tempTableData = this.successTableData;
            }
            if (this.activeName == "已投标的项目未中标") {
                tempTable = this.failTable;
                tempTableData = this.failTable;
            }
            if (this.activeName == "弃标的项目") {
                tempTable = this.abandonTable;
                tempTableData = this.abandonTableData;
            }
            if (!tempTable.select) {
                this.$message({
                    type: "warning",
                    message: "请选择一个类型"
                });
                return false;
            }
            tempTable.loading = true;
            let data = {};
            data = {
                pageIndex: 1,
                pageSize: tempTable.pageSize,
                orderBy: tempTable.orderBy,
                status: tempTable.status
            };
            data[tempTable.select] = tempTable.searchText;

            getBiddings(data)
                .then(res => {
                    if (res.success) {
                        this.refalshTableData(
                            res.result.records,
                            res.result.total,
                            res.result.current
                        );
                    }
                })
                .catch(err => {
                    tempTable.loading = false;
                });
        },
        changeStatusBidding(status) {
            let tempBidding = [];
            let tempTable = {};
            let type = "";
            let typeData = "";
            if (this.activeName == "跟踪中的项目") {
                tempTable = this.trackTable;
                tempBidding = this.trackBidding;
                type = "status";
                if (status == "yes") {
                    typeData = "确定报名的项目";
                } else {
                    typeData = "确定不报名的项目";
                }
            }
            if (this.activeName == "确定报名的项目") {
                tempTable = this.checkTable;
                tempBidding = this.checkBidding;
                type = "status";
                if (status == "yes") {
                    typeData = "已投标的项目中标";
                } else {
                    typeData = "已投标的项目未中标";
                }
            }
            if (this.activeName == "确定不报名的项目") {
                tempTable = this.unCheckTable;
                tempBidding = this.unCheckBidding;
                type = "status";
                typeData = "跟踪中的项目";
            }
            if (this.activeName == "已投标的项目中标") {
                tempTable = this.successTable;
                tempBidding = this.successBidding;
                type = "status";
                typeData = "弃标的项目";
            }
            if (this.activeName == "弃标的项目") {
                tempTable = this.abandonTable;
                tempBidding = this.abandonBidding;
                type = "status";
                typeData = "确定报名的项目";
            }
            if (tempBidding.length != 1) {
                this.$message({
                    type: "warning",
                    message: "请选择一个投标进行恢复"
                });
                return false;
            }
            tempBidding[0][type] = typeData;
            updateBidding(tempBidding[0])
                .then(res => {
                    if (res.success) {
                        tempTable.loading = true;
                        tempTable.searchText = "";
                        let data = {
                            pageIndex: tempTable.pageIndex,
                            pageSize: tempTable.pageSize,
                            orderBy: tempTable.orderBy,
                            status: tempTable.status
                        };
                        console.log();
                        getBiddings(data)
                            .then(res => {
                                if (res.success) {
                                    console.log("asdasd");
                                    this.refalshTableData(
                                        res.result.records,
                                        res.result.total,
                                        res.result.current
                                    );
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
        },
        showBidding() {
            let tempBidding = [];
            if (this.activeName == "跟踪中的项目") {
                tempBidding = this.trackBidding;
            }
            if (this.activeName == "确定报名的项目") {
                tempBidding = this.checkBidding;
            }
            if (this.activeName == "确定不报名的项目") {
                tempBidding = this.unCheckBidding;
            }
            if (this.activeName == "已投标的项目中标") {
                tempBidding = this.successBidding;
            }
            if (this.activeName == "已投标的项目未中标") {
                tempBidding = this.failBidding;
            }
            if (this.activeName == "弃标的项目") {
                tempBidding = this.abandonBidding;
            }
            if (tempBidding.length != 1) {
                this.$message({
                    type: "warning",
                    message: "请选择一个投标进行预览"
                });
                return false;
            }
            this.showBiddingVisible = true;
            this.tempBiddingData = tempBidding[0];
        },
        submitBidding(formName) {
            console.log(this.form);
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
                tempTable = this.trackTable;
                tempTableData = this.trackTableData;
                submitData = this.form;
            } else {
                dealFun = updateBidding;

                if (this.activeName == "跟踪中的项目") {
                    tempBiddingData = this.trackBidding[0];
                    tempTable = this.trackTable;
                    tempTableData = this.trackTableData;
                }
                if (this.activeName == "确定报名的项目") {
                    tempBiddingData = this.checkBidding[0];
                    tempTable = this.checkTable;
                    tempTableData = this.checkTableData;
                }
                if (this.activeName == "已投标的项目中标") {
                    tempBiddingData = this.successBidding[0];
                    tempTable = this.successTable;
                    tempTableData = this.successTableData;
                }
                if (this.activeName == "已投标的项目未中标") {
                    tempBiddingData = this.failBidding[0];
                    tempTable = this.failTable;
                    tempTableData = this.failTableData;
                }
                if (this.activeName == "弃标的项目") {
                    tempBiddingData = this.abandonBidding[0];
                    tempTable = this.abandonTable;
                    tempTableData = this.abandonTableData;
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
                                tempTable.loading = true;
                                tempTable.searchText = "";
                                console.log(tempTable);
                                let data = {
                                    pageIndex: tempTable.pageIndex,
                                    pageSize: tempTable.pageSize,
                                    orderBy: tempTable.orderBy,
                                    status: tempTable.status
                                };
                                getBiddings(data)
                                    .then(res => {
                                        if (res.success) {
                                            this.refalshTableData(
                                                res.result.records,
                                                res.result.total,
                                                res.result.current
                                            );
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
            if (this.activeName == "确定报名的项目") {
                tempBidding = this.checkBidding;
            }
            if (this.activeName == "已投标的项目中标") {
                tempBidding = this.successBidding;
            }
            if (this.activeName == "已投标的项目未中标") {
                tempBidding = this.failBidding;
            }
            if (this.activeName == "弃标的项目") {
                tempBidding = this.abandonBidding;
            }
            if (tempBidding.length != 1) {
                this.$message({
                    type: "warning",
                    message: "请选择一个投标进行修改"
                });
                return false;
            }
            for (let value in this.form) {
                this.form[value] = tempBidding[0][value]
                    ? tempBidding[0][value]
                    : "";
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
            if (this.activeName == "确定报名的项目") {
                tempBidding = this.checkBidding;
                tempTable = this.checkTable;
                tempTableData = this.checkTableData;
            }
            if (this.activeName == "确定不报名的项目") {
                tempBidding = this.unCheckBidding;
                tempTable = this.unCheckTable;
                tempTableData = this.unCheckTableData;
            }
            if (this.activeName == "已投标的项目中标") {
                tempBidding = this.successBidding;
                tempTable = this.successTable;
                tempTableData = this.successTableData;
            }
            if (this.activeName == "已投标的项目未中标") {
                tempBidding = this.failBidding;
                tempTable = this.failTable;
                tempTableData = this.failTableData;
            }
            if (this.activeName == "弃标的项目") {
                tempBidding = this.abandonBidding;
                tempTable = this.abandonTable;
                tempTableData = this.abandonTableData;
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
                    removeBidding(ids)
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
                                    orderBy: tempTable.orderBy,
                                    status: tempTable.status
                                };
                                getBiddings(data)
                                    .then(res => {
                                        if (res.success) {
                                            this.refalshTableData(
                                                res.result.records,
                                                res.result.total,
                                                res.result.current
                                            );
                                        }
                                    })
                                    .catch(err => {
                                        tempTable.loading = false;
                                    });
                            }
                        })
                        .catch(() => {
                            tempTable.loading = false;
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
            if (this.activeName == "确定报名的项目") {
                this.checkBidding = val;
            }
            if (this.activeName == "确定不报名的项目") {
                this.unCheckBidding = val;
            }
            if (this.activeName == "已投标的项目中标") {
                this.successBidding = val;
            }
            if (this.activeName == "已投标的项目未中标") {
                this.failBidding = val;
            }
            if (this.activeName == "弃标的项目") {
                this.abandonBidding = val;
            }
        },
        handleSizeChange(val) {
            let tempTable = {};
            let tempTableData = {};
            if (this.activeName == "跟踪中的项目") {
                tempTable = this.trackTable;
                tempTableData = this.trackTableData;
            }
            if (this.activeName == "确定报名的项目") {
                tempTable = this.checkTable;
                tempTableData = this.checkTableData;
            }
            if (this.activeName == "确定不报名的项目") {
                tempTable = this.unCheckTable;
                tempTableData = this.unCheckTableData;
            }
            if (this.activeName == "已投标的项目中标") {
                tempTable = this.successTable;
                tempTableData = this.successTableData;
            }
            if (this.activeName == "已投标的项目未中标") {
                tempTable = this.successTable;
                tempTableData = this.successTableData;
            }
            if (this.activeName == "弃标的项目") {
                tempTable = this.abandonTable;
                tempTableData = this.abandonTableData;
            }
            tempTable.loading = true;
            let data = {};
            tempTable.pageSize = val;
            data = {
                pageIndex: tempTable.pageIndex,
                pageSize: tempTable.pageSize,
                orderBy: tempTable.orderBy,
                status: tempTable.status
            };
            if (tempTable.select && tempTable.searchText) {
                data[tempTable.select] = tempTable.searchText;
            }
            getBiddings(data)
                .then(res => {
                    if (res.success) {
                        this.refalshTableData(
                            res.result.records,
                            res.result.total,
                            res.result.current
                        );
                    }
                })
                .catch(err => {
                    tempTable.loading = false;
                });
        },
        handleCurrentChange(val) {
            let tempTable = {};
            let tempTableData = {};
            let status = "";
            if (this.activeName == "跟踪中的项目") {
                tempTable = this.trackTable;
                tempTableData = this.trackTableData;
            }
            if (this.activeName == "确定报名的项目") {
                tempTable = this.checkTable;
                tempTableData = this.checkTableData;
            }
            if (this.activeName == "确定不报名的项目") {
                tempTable = this.unCheckTable;
                tempTableData = this.unCheckTableData;
            }
            if (this.activeName == "已投标的项目中标") {
                tempTable = this.successTable;
                tempTableData = this.successTableData;
            }
            if (this.activeName == "已投标的项目未中标") {
                tempTable = this.successTable;
                tempTableData = this.successTableData;
            }
            if (this.activeName == "弃标的项目") {
                tempTable = this.abandonTable;
                tempTableData = this.abandonTableData;
            }
            tempTable.loading = true;
            let data = {};
            tempTable.pageIndex = val;
            data = {
                pageIndex: tempTable.pageIndex,
                pageSize: tempTable.pageSize,
                orderBy: tempTable.orderBy,
                status: tempTable.status
            };
            if (tempTable.select && tempTable.searchText) {
                data[tempTable.select] = tempTable.searchText;
            }
            getBiddings(data)
                .then(res => {
                    if (res.success) {
                        this.refalshTableData(
                            res.result.records,
                            res.result.total,
                            res.result.current
                        );
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
                this.form[value] = null;
            }
            this.uploadData.materialfileList = [];
        },
        tableSort(row) {
            console.log(row);
            let sortData = "";
            if (row == null) {
                return false;
            }

            sortData = row;

            let tempTable = {};
            let tempTableData = {};
            if (this.activeName == "跟踪中的项目") {
                tempTable = this.trackTable;
                tempTableData = this.trackTableData;
            }
            if (this.activeName == "确定报名的项目") {
                tempTable = this.checkTable;
                tempTableData = this.checkTableData;
            }
            if (this.activeName == "确定不报名的项目") {
                tempTable = this.unCheckTable;
                tempTableData = this.unCheckTableData;
            }
            if (this.activeName == "已投标的项目中标") {
                tempTable = this.successTable;
                tempTableData = this.successTableData;
            }
            if (this.activeName == "已投标的项目未中标") {
                tempTable = this.successTable;
                tempTableData = this.successTableData;
            }
            if (this.activeName == "弃标的项目") {
                tempTable = this.abandonTable;
                tempTableData = this.abandonTableData;
            }
            tempTable.loading = true;
            let data = {};
            data = {
                pageIndex: 1,
                pageSize: tempTable.pageSize,
                orderBy: sortData,
                status: tempTable.status
            };
            // if (tempTable.select && tempTable.searchText) {
            //     data[tempTable.select] = tempTable.searchText;
            // }
            getBiddings(data)
                .then(res => {
                    if (res.success) {
                        this.refalshTableData(
                            res.result.records,
                            res.result.total,
                            res.result.current
                        );
                    }
                })
                .catch(err => {
                    tempTable.loading = false;
                });
        },
        handleClick(tab, event) {
            if (tab.name == "跟踪中的项目") {
                this.trackTable.loading = true;
                let data = {
                    pageIndex: this.trackTable.pageIndex,
                    pageSize: this.trackTable.pageSize,
                    orderBy: this.trackTable.orderBy,
                    status: "跟踪中的项目"
                };
                getBiddings(data)
                    .then(res => {
                        if (res.success) {
                            this.trackTableData = res.result.records;
                            this.trackTable.loading = false;
                            this.trackTable.total = Number(res.result.total);
                            this.trackTable.currentPage = res.result.current;
                        }
                    })
                    .catch(err => {
                        this.trackTable.loading = false;
                    });
            }
            if (tab.name == "确定报名的项目") {
                this.checkTable.loading = true;
                let data1 = {
                    pageIndex: this.checkTable.pageIndex,
                    pageSize: this.checkTable.pageSize,
                    orderBy: this.checkTable.orderBy,
                    status: "确定报名的项目"
                };
                getBiddings(data1)
                    .then(res => {
                        if (res.success) {
                            this.checkTableData = res.result.records;
                            this.checkTable.loading = false;
                            this.checkTable.total = Number(res.result.total);
                            this.checkTable.currentPage = res.result.current;
                        }
                    })
                    .catch(err => {
                        this.checkTable.loading = false;
                    });
            }
            if (tab.name == "确定不报名的项目") {
                this.unCheckTable.loading = true;
                let data2 = {
                    pageIndex: this.unCheckTable.pageIndex,
                    pageSize: this.unCheckTable.pageSize,
                    orderBy: this.unCheckTable.orderBy,
                    status: "确定不报名的项目"
                };
                getBiddings(data2)
                    .then(res => {
                        if (res.success) {
                            this.unCheckTableData = res.result.records;
                            this.unCheckTable.loading = false;
                            this.unCheckTable.total = Number(res.result.total);
                            this.unCheckTable.currentPage = res.result.current;
                        }
                    })
                    .catch(err => {
                        this.unCheckTable.loading = false;
                    });
            }
            if (tab.name == "已投标的项目中标") {
                this.successTable.loading = true;
                let data3 = {
                    pageIndex: this.successTable.pageIndex,
                    pageSize: this.successTable.pageSize,
                    orderBy: this.successTable.orderBy,
                    status: "已投标的项目中标"
                };
                getBiddings(data3)
                    .then(res => {
                        if (res.success) {
                            this.successTableData = res.result.records;
                            this.successTable.loading = false;
                            this.successTable.total = Number(res.result.total);
                            this.successTable.currentPage = res.result.current;
                        }
                    })
                    .catch(err => {
                        this.successTable.loading = false;
                    });
            }
            if (tab.name == "已投标的项目未中标") {
                this.failTable.loading = true;
                let data4 = {
                    pageIndex: this.failTable.pageIndex,
                    pageSize: this.failTable.pageSize,
                    orderBy: this.failTable.orderBy,
                    status: "已投标的项目未中标"
                };
                getBiddings(data4)
                    .then(res => {
                        if (res.success) {
                            this.failTableData = res.result.records;
                            this.failTable.loading = false;
                            this.failTable.total = Number(res.result.total);
                            this.failTable.currentPage = res.result.current;
                        }
                    })
                    .catch(err => {
                        this.failTable.loading = false;
                    });
            }
            if (tab.name == "弃标的项目") {
                this.abandonTable.loading = true;
                let data5 = {
                    pageIndex: this.abandonTable.pageIndex,
                    pageSize: this.abandonTable.pageSize,
                    orderBy: this.abandonTable.orderBy,
                    status: "弃标的项目"
                };
                getBiddings(data5)
                    .then(res => {
                        if (res.success) {
                            this.abandonTableData = res.result.records;
                            this.abandonTable.loading = false;
                            this.abandonTable.total = Number(res.result.total);
                            this.abandonTable.currentPage = res.result.current;
                        }
                    })
                    .catch(err => {
                        this.abandonTable.loading = false;
                    });
            }
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
        // 表格结果刷新
        refalshTableData(records, total, current) {
            if (this.activeName == "跟踪中的项目") {
                this.trackTableData = records;
                this.trackTable.loading = false;
                this.trackTable.total = Number(total);
                this.trackTable.currentPage = current;
            }
            if (this.activeName == "确定报名的项目") {
                this.checkTableData = records;
                this.checkTable.loading = false;
                this.checkTable.total = Number(total);
                this.checkTable.currentPage = current;
            }
            if (this.activeName == "确定不报名的项目") {
                this.unCheckTableData = records;
                this.unCheckTable.loading = false;
                this.unCheckTable.total = Number(total);
                this.unCheckTable.currentPage = current;
            }
            if (this.activeName == "已投标的项目中标") {
                this.successTableData = records;
                this.successTable.loading = false;
                this.successTable.total = Number(total);
                this.successTable.currentPage = current;
            }
            if (this.activeName == "已投标的项目未中标") {
                this.failTableData = records;
                this.failTable.loading = false;
                this.failTable.total = Number(total);
                this.failTable.currentPage = current;
            }
            if (this.activeName == "弃标的项目") {
                this.abandonTableData = records;
                this.abandonTable.loading = false;
                this.abandonTable.total = Number(total);
                this.abandonTable.currentPage = current;
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
.dialog-level {
    border-left-width: 4px;
    border-left-color: rgb(0, 255, 21);
    border-left-style: solid;
    padding-left: 10px;
    margin-bottom: 20px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.pagination-box {
    margin: 10px auto;
    text-align: center;
}
.content {
    margin-bottom: 10px;
    margin-left: 10px;
    border: #eeeeee 1px solid;
    padding:10px;
    border-radius: 5px;
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

