<template>
    <div>
        <div v-if="showListVisible">
            <div class="dialog-title">文件详情</div>
            <el-row type="flex" justify="start" style="flex-wrap:wrap">

                <span class='item' v-for="(item,index) in fileList" :key="index">
                    <span style="margin-right:10px;">{{item.name}}</span>
                    <el-button size="mini" type="text" @click="showFile(item.id,item.name)">查看</el-button>
                    <el-button size="mini" type="text" @click="downUrl(item.id)">下载</el-button>
                </span>
            </el-row>
        </div>

        <el-row v-if="fileList.length == 0">
            <div style="width:50%;margin:auto;text-align:center">
                <el-tag>暂无文件</el-tag>
            </div>
        </el-row>
        <div class="backBtn" v-if="showVisible||showDocument">
            <el-button type="primary" size="mini" plain @click="backList">返回</el-button>
        </div>
        <div v-if="showVisible">
            <div class="dialog-title">图片详情</div>
            <div class="imgBox" :style="{width:imgSize+'%'}">
                <img :src="imgUrl" alt="" class="imgStyle">
            </div>
            <el-slider v-model="imgSize" :min="10" show-input>
            </el-slider>
        </div>
        <div v-if="showDocument">
            <div class="dialog-title">PDF详情</div>
            <div v-loading='pdfloading'>
                <div class="documentBox">
                    <pdf style="padding:20px;" :src="pdfUrl" :page="page" @num-pages="numPages = $event" @loaded="loaded" @error="error"></pdf>
                </div>
                <el-row class="article-bar" type="flex" justify="space-around">
                    <el-col :span="12" class="article-bar__second-column">
                        <el-button-group>
                            <el-button size="small" @click="prePage">
                                <i class="el-icon-arrow-left el-icon--left"></i>
                                上一页
                            </el-button>
                            <el-button size="small" @click="nextPage">
                                下一页
                                <i class="el-icon-arrow-right el-icon--right"></i>
                            </el-button>
                        </el-button-group>
                    </el-col>
                    <el-col :span="12" class="article-bar__third-column">
                        {{page}}/{{numPages}}
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import SERVER from "@/api/config.js";
import pdf from "vue-pdf";
export default {
    components: {
        pdf
    },
    name: "files",
    props: {
        fileList: {
            type: Array,
            default: []
        },
        clearFlag: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            showDocument: false,
            showVisible: false,
            showListVisible: true,
            imgUrl: "",
            pdfUrl: "",
            imgSize: 50,
            page: 1,
            pdfloading: true,
            numPages: 0,
            pageInput: 1
        };
    },
    watch: {
        pageInput: function(newQuestion, oldQuestion) {
            if (!newQuestion) {
                this.page = 1;
            }
            if (newQuestion <= 0) {
                this.page = 1;
                this.pageInput = 1;
            }
            if (newQuestion > this.numPages) {
                this.page = this.numPages;
                this.pageInput = this.numPages;
            }
            if (newQuestion > 0 && newQuestion <= this.numPages) {
                this.page = newQuestion;
            }
            console.log(this.pageInput);
        },
        clearFlag: function(newQuestion, oldQuestion) {
            console.log(newQuestion);
            if (newQuestion) {
                this.showVisible = false;
                this.showDocument = false;
                this.showListVisible = true;
                this.$emit("update:clearFlag", false);
            }
        }
    },
    created() {
        console.log(this.fileList);
    },
    methods: {
        error: function(err) {
            this.pdfloading = false;
            console.log(err);
            this.$message({
                type:'danger',
                message:'网络问题加载失败,请刷新重试'
            })
		},
        downUrl(id) {
            window.open(SERVER.BASE_URL + "/file/get?id=" + id);
        },
        changeCurrentPage() {
            let pageNum = parseInt(this.pageInput);
            if (pageNum < 1) {
                this.page = this.pageInput = 1;
                return;
            }
            if (pageNum > this.docAllPage) {
                this.page = this.pageInput = this.numPages;
                return;
            }
            this.page = this.pageInput = pageNum;
        },
        backList() {
            this.showVisible = false;
            this.showDocument = false;
            this.showListVisible = true;
        },
        showFile(id, name) {
            let typeTemp = name.split(".");
            const isImage = /^(?:jpeg|png|jpg)$/i.test(
                typeTemp[typeTemp.length - 1]
            );
            const isPdf = /^(?:pdf)$/i.test(typeTemp[typeTemp.length - 1]);
            if (isImage) {
                this.imgUrl =
                    SERVER.BASE_URL+"/file/get?id=" + id;
                this.showVisible = true;
                this.showListVisible = false;
                return true;
            }
            if (isPdf) {
                this.pdfUrl =
                    SERVER.BASE_URL+"/file/get?id=" + id;
                this.showDocument = true;
                this.showListVisible = false;
                return true;
            }

            this.$message({
                type: "danger",
                message: "暂不支持此格式"
            });
        },
        loaded() {
            this.pdfloading = false;
        },
        prePage() {
            if (this.page > 1) {
                this.page--;
                this.pageInput--;
            }
        },
        nextPage() {
            if (this.page < this.numPages) {
                this.page++;
                this.pageInput++;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'scoped>
.item {
    background-color: rgba(64, 158, 255, 0.1);
    padding: 3px 10px;
    margin-right: 20px;
    margin-top: 10px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(64, 158, 255, 0.2);
}
.dialog-title {
    border-left-width: 4px;
    border-left-color: deepskyblue;
    border-left-style: solid;
    padding-left: 10px;
    margin-bottom: 20px;
}
.imgBox {
    width: 50%;
    margin: auto;
}
.imgStyle {
    width: 100%;
    border: #409eff 2px solid;
    margin: auto;
}
.backBtn {
    margin-bottom: 10px;
}
.documentBox {
    width: 80%;
    height: 800px;
    border: #409eff 2px solid;
    margin: auto;
}
.article-bar {
    width: 80%;
    margin: auto;
    background-color: #9dd0ed;
    padding: 10px;
    &__first-column {
        line-height: 36px;
        color: white;
        cursor: pointer;
        letter-spacing: 5px;
    }
    &__second-column {
        height: 36px;
    }
    &__third-column {
        height: 36px;
        width: 80px;
        font-size: 16px;
        text-align: center;
        line-height: 36px;
        border: 1px white solid;
        border-radius: 10px;
        color: white;
    }
    &__page-input {
        width: 80px;
        font-size: 16px;
        text-align: right;
    }
}
</style>