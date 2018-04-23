<template>
    <div class="upload">
        <el-row class="material" justify type="flex">
            <el-col>
                <el-upload :action="materialUploadUrl" :headers="headData" :on-preview="handleMaterialPreview" :on-remove="handleMaterialRemove" :before-remove="MaterialbeforeRemove" multiple :limit="limitFlieNumber" :on-success="handleMaterialSuccess" :file-list="materialfileList" :before-upload="beforeMaterialUpload" :on-exceed="handleMaterialExceed" :on-progress="handleProgress">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { deleteFile } from "@/api/file";
import { getToken } from "@/utils/auth";
import SERVER from "@/api/config";
export default {
    name: "upload",
    props: {
        uploadFolder: {
            type: String,
            default: "material"
        },
        materialfileList: {
            type: Array,
            default: []
        },
        limitFlieNumber: {
            type: Number,
            default: 3
        },
        buttonFlag: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            materialUploadUrl: "",
            headData: {}
        };
    },
    created() {
        let url = SERVER.BASE_URL + "/file/upload?type=" + this.uploadFolder;
        this.materialUploadUrl = url;

        this.headData = { Authorization: `Bearer ${getToken()}` };
    },
    methods: {
        handleProgress() {
            // console.log("我在上传了");

            this.$emit("update:buttonFlag", true);
        },
        // 课件资源
        handleMaterialSuccess(response, file, fileList) {
            // console.log(fileList);
            this.$emit("update:materialfileList", fileList);
            this.$emit("update:buttonFlag", false);
        },
        handleMaterialRemove(file, fileList) {
            let ids = [];
            if (file.response) {
                ids.push(file.response.result);
                this.$emit("update:buttonFlag", true);
                deleteFile(ids)
                    .then(res => {
                        if (res.success) {
                            this.$emit("update:materialfileList", fileList);
                            this.$emit("update:buttonFlag", false);
                        } else {
                            this.$emit("update:buttonFlag", false);
                        }
                    })
                    .catch(() => {
                        this.$emit("update:buttonFlag", false);
                    });
            } else {
                this.$emit("update:buttonFlag", false);
            }
        },
        handleMaterialPreview(file) {
            // console.log(file);
        },
        handleMaterialExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 ${this.limitFlieNumber} 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        MaterialbeforeRemove(file, fileList) {
            // return this.$confirm(`确定移除 ${file.name}？`);
            // 文件移除的时候触发的方法
        },
        beforeMaterialUpload(file) {
            return true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'scoped>
.upload {
    //   margin: 20px 0;
}
</style>