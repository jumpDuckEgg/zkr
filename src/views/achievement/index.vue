<template>
    <div class="app-container">

        <div class="searchBox">
            <div class="searchBox-title">内容筛选</div>
            <i class="el-icon-arrow-up search_down" v-if="sreachBoxFlag" @click="sreachBoxFlag = !sreachBoxFlag"></i>
            <i class="el-icon-arrow-down search_down" v-if="!sreachBoxFlag" @click="sreachBoxFlag = !sreachBoxFlag"></i>
            <el-row class="searchBox-item" type="flex" justify="start" style="flex-wrap: wrap" v-if="sreachBoxFlag">
                <el-col style="margin-bottom:10px;width:460px">
                    <div>
                        工程类别：
                        <el-checkbox v-model="searchForm.workerEnum">工可</el-checkbox>
                        <el-checkbox v-model="searchForm.surveyEnum" class="searchBox_margin">勘察</el-checkbox>
                        <el-checkbox v-model="searchForm.designEnum" class="searchBox_margin">初步设计</el-checkbox>
                        <el-checkbox v-model="searchForm.constructionEnum" class="searchBox_margin">施工图设计</el-checkbox>
                        <el-checkbox v-model="searchForm.consultingEnum" class="searchBox_margin">咨询</el-checkbox>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:580px">
                    <div>
                        具备以下资料：
                        <el-checkbox v-model="searchForm.designReplyEnum">初步设计批复</el-checkbox>
                        <el-checkbox v-model="searchForm.constructionReplyEnum" class="searchBox_margin">施工图设计批复</el-checkbox>
                        <el-checkbox v-model="searchForm.attenderEnum" class="searchBox_margin">参加人员证明</el-checkbox>
                        <el-checkbox v-model="searchForm.evaluationEnum" class="searchBox_margin">项目评定表</el-checkbox>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;">
                    <div>
                        项目属性：
                        <el-checkbox v-model="searchForm.oversizeBridgeEnum">特大桥</el-checkbox>
                        <el-checkbox v-model="searchForm.interchangeEnum" class="searchBox_margin">互通立交</el-checkbox>
                        <el-checkbox v-model="searchForm.safetyFacilitiesEnum" class="searchBox_margin">安全设施</el-checkbox>
                        <el-checkbox v-model="searchForm.mechanicalEnum" class="searchBox_margin">机电工程</el-checkbox>
                        <el-checkbox v-model="searchForm.pipeGalleryEnum" class="searchBox_margin">综合管廊</el-checkbox>
                        <el-checkbox v-model="searchForm.specialSoilEnum" class="searchBox_margin">特殊土质</el-checkbox>
                        <el-checkbox v-model="searchForm.greeningEnum" class="searchBox_margin">绿化</el-checkbox>
                        <el-checkbox v-model="searchForm.housingEnum" class="searchBox_margin">房建</el-checkbox>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:250px">
                    <div>
                        项目名称：
                        <el-input size="mini" v-model="searchForm.name" clearable style="width:150px;"></el-input>
                    </div>

                </el-col>
                <el-col style="margin-bottom:10px;width:160px;">
                    <div>
                        类型：
                        <el-select size="mini" v-model="searchForm.type" placeholder="请选择" style="width:100px;">
                            <el-option label="市政工程" value="市政工程"></el-option>
                            <el-option label="高速公路" value="高速公路"></el-option>
                            <el-option label="一级公路" value="一级公路"></el-option>
                            <el-option label="二级公路" value="二级公路"></el-option>
                            <el-option label="三级公路" value="三级公路"></el-option>
                            <el-option label="四级公路" value="四级公路"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:200px;">
                    <div>
                        中标时间:
                        <el-date-picker type="date" size="mini" placeholder="选择日期" v-model="searchForm.biddingTime" style="width:130px;"></el-date-picker>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:200px;">
                    <div>
                        合同时间:
                        <el-date-picker type="date" size="mini" placeholder="选择日期" v-model="searchForm.contractTime" style="width:130px;"></el-date-picker>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:260px;">
                    <div>
                        初设批复时间:
                        <el-date-picker type="date" size="mini" placeholder="选择日期" v-model="searchForm.firstDesignTime" style="width:130px;"></el-date-picker>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:260px;">
                    <div>
                        施设批复时间:
                        <el-date-picker type="date" size="mini" placeholder="选择日期" v-model="searchForm.confirmTime" style="width:130px;"></el-date-picker>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:260px;">
                    <div>
                        项目负责人：
                        <el-input size="mini" v-model="searchForm.projectLeader" clearable style="width:150px;"></el-input>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:260px;">
                    <div>
                        分项负责人：
                        <el-input size="mini" v-model="searchForm.itemLeader" clearable style="width:150px;"></el-input>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:260px;">
                    项目里程大于：
                    <el-input size="mini" type="number" v-model="searchForm.projectMileage" clearable style="width:150px;">
                        <template slot="append">km</template>
                    </el-input>
                </el-col>
                <el-col style="margin-bottom:10px;width:300px;">
                    <div>
                        合同额大于：
                        <el-input size="mini" type="number" v-model="searchForm.contractPrice" clearable style="width:180px;">
                            <template slot="append">万元</template>
                        </el-input>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:300px;">
                    <div>
                        最大桥梁长度大于：
                        <el-input size="mini" type="number" v-model="searchForm.bridgeHeight" clearable style="width:150px;">
                            <template slot="append">m</template>
                        </el-input>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:300px;">
                    <div>
                        建安费大于：
                        <el-input size="mini" type="number" v-model="searchForm.builtSafeFee" clearable style="width:180px;">
                            <template slot="append">万元</template>
                        </el-input>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:300px;">
                    <div>
                        最大隧道长度大于：
                        <el-input size="mini" type="number" v-model="searchForm.tunnelHeight" clearable style="width:150px;">
                            <template slot="append">m</template>
                        </el-input>
                    </div>
                </el-col>
                <el-col style="margin-bottom:10px;width:260px;">
                    <div>
                        建筑面积大于：
                        <el-input size="mini" type="number" v-model="searchForm.builtUpArea" clearable style="width:150px;">
                            <template slot="append">㎡</template>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <div style="text-align:center;margin-top:10px;" v-if="sreachBoxFlag">
                <el-button type="primary" size="mini" @click="sreachData">搜索</el-button>
                <el-button type="primary" size="mini" @click="resetSreachData">重置</el-button>
            </div>
        </div>
        <el-row type="flex" justify="start">
            <el-col>
                <el-button size="mini" type="primary" plain @click="createdAchievement()">新增业绩</el-button>
                <el-button size="mini" type="success" plain @click="modifyAchievement()">修改业绩</el-button>
                <el-button size="mini" type="info" plain @click="deleteAchievement">删除业绩</el-button>
                <el-button size="mini" type="danger" plain @click="showAchievement">预览</el-button>
            </el-col>
        </el-row>
        <div class="table-box">
            <el-table v-loading="loading" :data="tableData" stripe size='mini' border @selection-change="handleSelectionChange" @sort-change='tableSort'>
                <el-table-column type="selection" width="55" align='center'></el-table-column>
                <el-table-column label="项目名称" width="240" prop="name" align='center' sortable='custom'>
                    <template slot-scope="scope">
                        <div class="overWord" style="cursor:pointer" @click="handleClipboard(scope.row.name,$event)">
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="100" align='center' sortable='custom'>
                </el-table-column>
                <el-table-column label="中标时间" width="100" align='center' prop="bidding_time" sortable='custom'>
                    <template slot-scope="scope">
                        <el-tag size='mini'>{{scope.row.biddingTime?scope.row.biddingTime:'暂无'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="合同时间" width="100" align='center' prop="contract_time" sortable='custom'>
                    <template slot-scope="scope">
                        <el-tag size='mini'>{{scope.row.contractTime?scope.row.contractTime:'暂无'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="初设批复时间" width="120" align='center' prop="first_design_time" sortable='custom'>
                    <template slot-scope="scope">
                        <el-tag size='mini'>{{scope.row.firstDesignTime?scope.row.firstDesignTime:'暂无'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="施设批复时间" width="120" align='center' prop="confirm_time" sortable='custom'>
                    <template slot-scope="scope">
                        <el-tag size='mini'>{{scope.row.confirmTime?scope.row.confirmTime:'暂无'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="工作内容" width="220" align='center' show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="cursor:pointer" @click="handleClipboard(scope.row.designWorkDesc,$event)">
                            {{scope.row.designWorkDesc}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="项目规模" width="220" align='center' show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span style="cursor:pointer" @click="handleClipboard(scope.row.projectScaleDesc,$event)">{{scope.row.projectScaleDesc}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="文件查看" width="120" align='center'>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="showFileList(scope.row.fileRecordList)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="备注" width="180" align='center'>
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
        <!-- 新增业绩 -->
        <el-dialog :visible.sync="dialogVisible" width="1000px" center lock-scroll top='5vh' @close='closeDialog'>
            <div class="dialog-title">{{dialogTitle}}</div>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="项目名称：" prop="name">
                            <el-input size="mini" v-model="form.name" clearable class="input_width"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="类型：" prop="type">
                            <el-select size="mini" v-model="form.type" placeholder="请选择" style="width:100px;">
                                <el-option label="市政工程" value="市政工程"></el-option>
                                <el-option label="高速公路" value="高速公路"></el-option>
                                <el-option label="一级公路" value="一级公路"></el-option>
                                <el-option label="二级公路" value="二级公路"></el-option>
                                <el-option label="三级公路" value="三级公路"></el-option>
                                <el-option label="四级公路" value="四级公路"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="中标时间:">
                            <el-date-picker type="date" size="mini" placeholder="选择日期" value-format='yyyy-MM-dd HH:mm:ss' v-model="form.biddingTime" style="width:130px;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="合同时间:">
                            <el-date-picker type="date" size="mini" placeholder="选择日期" value-format='yyyy-MM-dd HH:mm:ss' v-model="form.contractTime" style="width:130px;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="初设批复时间:">
                            <el-date-picker type="date" size="mini" placeholder="选择日期" value-format='yyyy-MM-dd HH:mm:ss' v-model="form.firstDesignTime" style="width:130px;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="施设批复时间:">
                            <el-date-picker type="date" size="mini" placeholder="选择日期" value-format='yyyy-MM-dd HH:mm:ss' v-model="form.confirmTime" style="width:130px;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="工程类别：">
                    <el-checkbox v-model="form.workerEnum">工可</el-checkbox>
                    <el-checkbox v-model="form.surveyEnum">勘察</el-checkbox>
                    <el-checkbox v-model="form.designEnum">初步设计</el-checkbox>
                    <el-checkbox v-model="form.constructionEnum">施工图设计</el-checkbox>
                    <el-checkbox v-model="form.consultingEnum">咨询</el-checkbox>
                </el-form-item>
                <el-form-item label="具备以下资料：">
                    <el-checkbox v-model="form.designReplyEnum">初步设计批复</el-checkbox>
                    <el-checkbox v-model="form.constructionReplyEnum">施工图设计批复</el-checkbox>
                    <el-checkbox v-model="form.attenderEnum">参加人员证明</el-checkbox>
                    <el-checkbox v-model="form.evaluationEnum">项目评定表</el-checkbox>
                </el-form-item>
                <el-form-item label="项目属性：">
                    <el-checkbox v-model="form.oversizeBridgeEnum">特大桥</el-checkbox>
                    <el-checkbox v-model="form.interchangeEnum">互通立交</el-checkbox>
                    <el-checkbox v-model="form.safetyFacilitiesEnum">安全设施</el-checkbox>
                    <el-checkbox v-model="form.mechanicalEnum">机电工程</el-checkbox>
                    <el-checkbox v-model="form.pipeGalleryEnum">综合管廊</el-checkbox>
                    <el-checkbox v-model="form.specialSoilEnum">特殊土质</el-checkbox>
                    <el-checkbox v-model="form.greeningEnum">绿化</el-checkbox>
                    <el-checkbox v-model="form.housingEnum">房建</el-checkbox>
                </el-form-item>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="项目里程：">
                            <el-input size="mini" type="number" v-model="form.projectMileage" clearable style="width:150px;">
                                <template slot="append">km</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合同额：">
                            <el-input size="mini" type="number" v-model="form.contractPrice" style="width:180px;">
                                <template slot="append">万元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="最大桥梁长度：">
                            <el-input size="mini" type="number" v-model="form.bridgeHeight" clearable style="width:150px;">
                                <template slot="append">m</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="建安费：">
                            <el-input size="mini" type="number" v-model="form.builtSafeFee" clearable style="width:180px;">
                                <template slot="append">万元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="最大隧道长度：">
                            <el-input size="mini" type="number" v-model="form.tunnelHeight" clearable style="width:150px;">
                                <template slot="append">m</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="建筑面积：">
                            <el-input size="mini" type="number" v-model="form.builtUpArea" clearable style="width:150px;">
                                <template slot="append">㎡</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="项目负责人：">
                            <el-input size="mini" v-model="form.projectLeader" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工作内容：">
                            <el-input size="mini" v-model="form.designWorkDesc" clearable></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="分项负责人：">
                            <editor ref="itemLeader" key="itemLeader" :parentsContent='form.itemLeader' toolbarName='itemLeader'></editor>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目规模：">
                            <el-input size="mini" type="textarea" v-model="form.projectScaleDesc" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="桥梁相关描述：">
                            <el-input size="mini" type="textarea" v-model="form.bridgeDesc" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="隧道相关描述：">
                            <el-input size="mini" type="textarea" v-model="form.tunnelDesc" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="文件上传：" prop="remark">
                    <upload v-bind="uploadData" :materialfileList.sync='uploadData.materialfileList' :buttonFlag.sync='uploadData.buttonFlag'></upload>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注：">
                            <el-input size="mini" type="textarea" v-model="form.remark" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="其他相关描述：">
                            <editor ref="otherDesc" key="otherDesc" :parentsContent='form.otherDesc' toolbarName='otherDesc'></editor>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="submitInfo('form')" :disabled='uploadData.buttonFlag'>确 定</el-button>
                <el-button size="mini" type="danger" @click="cancelSubmit('form')" :disabled='uploadData.buttonFlag'>取 消</el-button>
            </span>
        </el-dialog>
        <!-- 预览 -->
        <el-dialog :visible.sync="showVisible" width="1000px" top='3vh'>
            <div class="dialog-title">业绩详情</div>
            <div class="content">
                <svg-icon icon-class='process'></svg-icon>
                项目名称：{{multipleSelection[0]?multipleSelection[0].name:''}}
            </div>
            <div class="content">
                <svg-icon icon-class='logistic'></svg-icon>
                类型：{{multipleSelection[0]?multipleSelection[0].type:''}}
            </div>
            <el-row class="content">
                <el-col :span="6">
                    <svg-icon icon-class='clock'></svg-icon>
                    中标时间：{{multipleSelection[0]?multipleSelection[0].biddingTime:''}}
                    <template v-if="multipleSelection[0]&& !multipleSelection[0].biddingTime">
                        <el-tag size="mini" type="danger">暂无中标时间</el-tag>
                    </template>
                </el-col>
                <el-col :span="6">
                    <svg-icon icon-class='clock'></svg-icon>
                    合同时间：{{multipleSelection[0]?multipleSelection[0].contractTime:''}}
                    <template v-if="multipleSelection[0]&& !multipleSelection[0].contractTime">
                        <el-tag size="mini" type="danger">暂无合同时间</el-tag>
                    </template>
                </el-col>
                <el-col :span="6">
                    <svg-icon icon-class='clock'></svg-icon>
                    初设批复时间：{{multipleSelection[0]?multipleSelection[0].firstDesignTime:''}}
                    <template v-if="multipleSelection[0]&& !multipleSelection[0].firstDesignTime">
                        <el-tag size="mini" type="danger">暂无初设批复时间</el-tag>
                    </template>
                </el-col>
                <el-col :span="6">
                    <svg-icon icon-class='clock'></svg-icon>
                    施设批复时间：{{multipleSelection[0]?multipleSelection[0].confirmTime:''}}
                    <template v-if="multipleSelection[0]&& !multipleSelection[0].confirmTime">
                        <el-tag size="mini" type="danger">暂无施设批复时间</el-tag>
                    </template>
                </el-col>
            </el-row>
            <div class="content">
                <svg-icon icon-class='bussiness-man' style="color:#a7a7a7"></svg-icon>
                项目负责人：{{multipleSelection[0]?multipleSelection[0].projectLeader:''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].projectLeader">
                    <el-tag size="mini" type="danger">暂无项目负责人</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='bussiness-man' style="color:#a7a7a7"></svg-icon>
                分项负责人：
                <template v-if="multipleSelection[0]">
                    <div style="margin-left:30px;" v-html="multipleSelection[0].itemLeader"></div>
                </template>
                <template v-if="multipleSelection[0]&& !multipleSelection[0].itemLeader">
                    <el-tag size="mini" type="danger">暂无分项负责人</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='comments' style="color:#a7a7a7"></svg-icon>
                工作内容：{{multipleSelection[0]?multipleSelection[0].designWorkDesc:''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].designWorkDesc">
                    <el-tag size="mini" type="danger">暂无工作内容</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='all' style="color:#a7a7a7"></svg-icon>
                项目规模：{{multipleSelection[0]?multipleSelection[0].projectScaleDesc:''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].projectScaleDesc">
                    <el-tag size="mini" type="danger">暂无项目规模</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
                桥梁相关描述：{{multipleSelection[0]?multipleSelection[0].bridgeDesc:''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].bridgeDesc">
                    <el-tag size="mini" type="danger">暂无桥梁相关描述</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
                隧道相关描述：{{multipleSelection[0]?multipleSelection[0].tunnelDesc :''}}
                <template v-if="multipleSelection[0]&& !multipleSelection[0].tunnelDesc">
                    <el-tag size="mini" type="danger">暂无隧道相关描述</el-tag>
                </template>
            </div>
            <div class="content">
                <svg-icon icon-class='attachment' style="color:#a7a7a7"></svg-icon>
                其他相关描述：
                <template v-if="multipleSelection[0]">
                    <div style="margin-left:30px;" v-html="multipleSelection[0].otherDesc"></div>
                </template>
                <template v-if="multipleSelection[0]&& !multipleSelection[0].otherDesc">
                    <el-tag size="mini" type="danger">暂无其他相关描述</el-tag>
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
    getAchievements,
    addAchievement,
    removeAchievement,
    updateAchievement
} from "@/api/achievement";
import SERVER from '@/api/config';
import editor from "@/components/editor";
import upload from "@/components/UpLoad";
import clipboard from "@/utils/clipboard";
import files from "@/components/FileList";
export default {
    components: {
        editor,
        upload,
        files
    },
    data() {
        return {
            clearFlag: false,
            showFileVisible: false,
            fileListData: [],
            sreachBoxFlag: false,
            uploadData: {
                uploadFolder: "业绩管理",
                materialfileList: [],
                limitFlieNumber: 100,
                buttonFlag: false
            },
            dialogTitle: "新增业绩",
            orderBy: "create_date desc",
            multipleSelection: [],
            tableData: [],
            loading: false,
            total: 0,
            pageIndex: 1,
            pageSize: 15,
            currentPage: 1,
            orderBy: "create_date desc",
            dialogVisible: false,
            showVisible: false,
            searchForm: {
                name: "",
                type: "",
                biddingTime: "",
                contractTime: "",
                firstDesignTime: "",
                confirmTime: "",
                projectLeader: "",
                itemLeader: "",
                surveyEnum: "",
                designEnum: "",
                constructionEnum: "",
                consultingEnum: "",
                designReplyEnum: "",
                constructionReplyEnum: "",
                attenderEnum: "",
                evaluationEnum: "",
                oversizeBridgeEnum: "",
                interchangeEnum: "",
                safetyFacilitiesEnum: "",
                mechanicalEnum: "",
                pipeGalleryEnum: "",
                specialSoilEnum: "",
                greeningEnum: "",
                housingEnum: "",
                bridgeHeight: "",
                builtSafeFee: "",
                builtUpArea: "",
                contractPrice: "",
                tunnelHeight: "",
                projectMileage: ""
            },
            form: {
                name: "",
                type: "",
                bridgeHeight: "",
                builtSafeFee: "",
                builtUpArea: "",
                contractPrice: "",
                tunnelHeight: "",
                projectMileage: "",
                biddingTime: "",
                contractTime: "",
                firstDesignTime: "",
                confirmTime: "",
                projectLeader: "",
                itemLeader: "",
                designWorkDesc: "",
                projectScaleDesc: "",
                bridgeDesc: "",
                tunnelDesc: "",
                otherDesc: "",
                remark: "",
                surveyEnum: "",
                designEnum: "",
                constructionEnum: "",
                consultingEnum: "",
                designReplyEnum: "",
                constructionReplyEnum: "",
                attenderEnum: "",
                evaluationEnum: "",
                oversizeBridgeEnum: "",
                interchangeEnum: "",
                safetyFacilitiesEnum: "",
                mechanicalEnum: "",
                pipeGalleryEnum: "",
                specialSoilEnum: "",
                greeningEnum: "",
                housingEnum: ""
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
                        message: "请选择一个类型",
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
            orderBy: this.orderBy
        };
        getAchievements(data)
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
            console.log(data);
            this.showFileVisible = true;
        },
        downUrl(id) {
            window.open(SERVER.BASE_URL + "/file/get?id=" + id);
        },
        handleClipboard(text, event) {
            clipboard(text, event);
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
            let searchData = {};
            for (let val in this.searchForm) {
                if (this.searchForm[val]) {
                    searchData[val] = this.searchForm[val];
                }
            }
            Object.assign(data, searchData);
            this.loading = true;
            getAchievements(data)
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
        resetSreachData() {
            for (let val in this.searchForm) {
                this.searchForm[val] = "";
            }
        },
        sreachData() {
            let data = {};
            data = {
                pageIndex: 1,
                pageSize: this.pageSize,
                orderBy: this.orderBy
            };
            let searchData = {};
            for (let val in this.searchForm) {
                if (this.searchForm[val]) {
                    searchData[val] = this.searchForm[val];
                }
            }
            Object.assign(data, searchData);
            this.loading = true;
            getAchievements(data)
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
            let searchData = {};
            for (let val in this.searchForm) {
                if (this.searchForm[val]) {
                    searchData[val] = this.searchForm[val];
                }
            }
            Object.assign(data, searchData);
            getAchievements(data)
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
        showAchievement() {
            if (this.multipleSelection.length != 1) {
                this.$message({
                    type: "warning",
                    message: "请选择一个业绩进行查看"
                });
                return false;
            }
            this.showVisible = true;
        },
        createdAchievement() {
            this.dialogTitle = "新增业绩";
            this.dialogVisible = true;
        },
        modifyAchievement() {
            if (this.multipleSelection.length !== 1) {
                this.$message({
                    type: "warning",
                    message: "请选择一个业绩进行修改"
                });
                return false;
            }
            for (let value in this.form) {
                if (
                    this.multipleSelection[0][value] !== null ||
                    this.multipleSelection[0][value] !== undefined
                ) {
                    this.form[value] = this.multipleSelection[0][value];
                }
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
        deleteAchievement() {
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
                    removeAchievement(ids)
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
                                let searchData = {};
                                for (let val in this.searchForm) {
                                    this.searchForm[val] = "";
                                }
                                getAchievements(data)
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
        handleCurrentChange(val) {
            this.loading = true;
            let data = {};
            this.pageIndex = val;
            data = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                orderBy: this.orderBy
            };
            let searchData = {};
            for (let val in this.searchForm) {
                if (this.searchForm[val]) {
                    searchData[val] = this.searchForm[val];
                }
            }
            Object.assign(data, searchData);
            getAchievements(data)
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
            let dealFun = function() {};
            let submitData = {};
            let files = [];
            this.uploadData.materialfileList.forEach((value, index) => {
                files.push({ id: value.response.result });
            });
            this.form["fileRecordList"] = files;
            this.form.otherDesc = this.$refs.otherDesc.content;
            this.form.itemLeader = this.$refs.itemLeader.content;
            if (this.dialogTitle == "新增业绩") {
                dealFun = addAchievement;
                submitData = this.form;
            } else {
                dealFun = updateAchievement;
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
                                for (let val in this.searchForm) {
                                    this.searchForm[val] = "";
                                }
                                getAchievements(data)
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
            this.$refs.itemLeader.content = "";
            this.$refs.otherDesc.content = "";
            this.uploadData.materialfileList = [];
        }
    }
};
</script>
<style lang="scss" scoped>
.table-box {
    margin-top: 10px;
    max-width: 1576px;
}
.input_width {
    width: 200px;
}
.input_widthV2 {
    width: 120px;
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
.content {
    margin-bottom: 10px;
    margin-left: 10px;
    border: #eeeeee 1px solid;
    padding: 10px;
    border-radius: 5px;
}
.searchBox {
    position: relative;
    margin: 10px 0;
    //   background-color: burlywood;
    border: 1px #eee solid;
    padding: 10px;
    border-radius: 5px;
    font-size: 13px;
    color: #808183;
    &_margin {
        margin-left: 5px;
    }
    &-item {
        margin: 10px 0;
        margin-left: 5px;
    }
    &-title {
        border-left-width: 4px;
        border-left-color: deepskyblue;
        border-left-style: solid;
        padding-left: 10px;
    }
}
.search_down {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
}
.overWordV2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 50px;
}
.detail {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-20%, 40%);
    cursor: pointer;
}
</style>

