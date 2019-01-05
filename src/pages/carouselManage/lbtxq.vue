<template>
    <div class="ts-content wrapper-datepicker newcss nowidth">
        <main class="main-wrap">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px" class="clearfix formClass">
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="展示终端" prop='DisplayPosition'>
                            <el-radio-group v-model="ruleForm.DisplayPosition" @change='changeDisplayPosition'>
                                <el-radio class="radio" :label="2">PC官网</el-radio>
                                <el-radio class="radio" :label="3">居民微信端</el-radio>
                                <el-radio class="radio" :label="4">医护app端</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="显示位置" prop='DisplayPagePosition'>
                            <el-select v-model="ruleForm.DisplayPage" @change="" placeholder="请选择" style='width: 49%;display: inline-block!important;' @change='changeDisplayPage' @visible-change='(flag) => clickDisplayPage(flag)'>
                                <el-option key=1 value=1 label="官网首页模块" v-if="ruleForm.DisplayPosition==2"></el-option>
                                <el-option key=2 value=2 label="官网介绍模块" v-if="ruleForm.DisplayPosition==2"></el-option>
                                <el-option key=3 value=3 label="官网解决方案模块" v-if="ruleForm.DisplayPosition==2"></el-option>
                                <el-option key=4 value=4 label="标杆用户模块" v-if="ruleForm.DisplayPosition==2"></el-option>
                                <el-option key=5 value=5 label="关于我们模块" v-if="ruleForm.DisplayPosition==2"></el-option>
                                <el-option key=6 value=6 label="医护版首页" v-if="ruleForm.DisplayPosition==4"></el-option>
                                <el-option key=7 value=7 label="用户端首页" v-if="ruleForm.DisplayPosition==3"></el-option>
                            </el-select>
                            <el-select v-model="ruleForm.DisplayPagePosition" @change="" placeholder="请选择" style='width: 49%;display: inline-block!important;' @visible-change='(flag) => clickDisplayPagePosition(flag)'>
                                <el-option key=1 value=1 label="顶部轮播图" v-if="ruleForm.DisplayPage"></el-option>
                                <el-option key=2 value=2 label="省级标杆用户" v-if="ruleForm.DisplayPage==4"></el-option>
                                <el-option key=3 value=3 label="市级标杆用户" v-if="ruleForm.DisplayPage==4"></el-option>
                                <el-option key=4 value=4 label="社区级标杆用户" v-if="ruleForm.DisplayPage==4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="标题" prop="BannerTitle">
                            <el-input v-model="ruleForm.BannerTitle" placeholder="" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="跳转链接">
                            <el-input v-model="ruleForm.BannerImageLinkUrl" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="排序" class="titleInner" prop="Sort">
                            <el-input type='number' v-model.number="ruleForm.Sort" placeholder="" :min="0" :max="5000"></el-input>
                            <div class="alertFontPos">
                                <i class="el-icon-ts-mark1"></i>
                                <span>数值越大越靠前</span>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="发布时间" class="titleInner" required>
                            <el-form-item prop="PublishStartTime">
                                <el-date-picker v-model="PublishStartTime" type="date" placeholder="选择日期" style="width:100%" @change="changeTime(PublishStartTime)" :editable=false>
                                </el-date-picker>
                            </el-form-item>
                            <!--<div class="alertFontPos">
                                <i class="el-icon-ts-mark1"></i>
                                <span>发布时间为轮播图在各个端开始显示的时间</span>
                            </div>-->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter" style="margin-top: 20px;">
                    <el-col :span="23" style="margin-right: 30px">
                        <el-form-item label="上传图片" required>
                            <el-upload style="padding-top:12px;width: 300px;" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" accept="image/jpg,image/png,image/jpeg,image/bmp">
                                <img v-if="BannerImageUrl!=''" width="100%" height="100%" :src="ruleForm.BannerImageUrl" alt="替换图片">
                                <i v-else class="el-icon-plus"></i>
                            </el-upload>
                            <!-- <el-dialog v-model="dialogVisible" size="tiny">
                                <img width="100%" :src="resList.dialogImageUrl" alt="">5
                            </el-dialog> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--<el-row>
                    <quill-editor v-model="inputvalue" ref="conditionEditor">
                    </quill-editor>
                    <img :src="imgurl" />
                </el-row>-->
                <el-row class="titleOuter">
                    <el-col :span="20" style="position: relative">
                        <button type="button" class="el-button el-button--primary" @click="submitForm('ruleForm')" style="float:right;margin-bottom:20px"><span>提交</span></button>
                    </el-col>
                </el-row>
            </el-form>
        </main>

    </div>
</template>

<script>
    import '../../assets/sass/addtransfer.scss';
    import { mapGetters, mapActions } from 'vuex';
    import { apiurl, linkUrl } from '../../service/api.js';
    import axios from 'axios';
    import VueQuillEditor from 'vue-quill-editor'
    export default {
        data() {
            var timeCheck = (rule, value, callback) => {
                var time = this.PublishStartTime
                if(!time || time == '') {
                    return callback(new Error('请选择时间'))
                } else {
                    callback()
                }
            };
            var sortCheck = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('排序不可为空'));
                } else {
                    if(!/^[0-9]*[0-9][0-9]*$/.test(value) || value > 5000) {
                        callback(new Error('请输入正确格式的排序'));
                    }
                    callback();
                }
            };
            return {
                flag: false,
                //              inputvalue:'',
                options: [],
                bannerId: this.$route.query.bannerId,
                uploadUrl: '',
                ruleForm: {
                    DisplayPosition: '',
                    DisplayPage: '',
                    DisplayPagePosition: '',
                },
                strPublishTime: [],
                PublishStartTime: '',
                PublishEndTime: '',
                rules: {
                    BannerTitle: [{
                        required: true,
                        message: '标题不可为空',
                        trigger: 'blur'
                    }],
                    Sort: [{
                        type: 'number',
                        required: true,
                        message: '排序不可为空',
                        trigger: 'blur'
                    }, {
                        validator: sortCheck,
                        trigger: 'change'
                    }],
                    strPublishTime: [{
                        validator: timeCheck,
                        trigger: 'change',
                    }],
                    DisplayPosition: [{
                        type: 'number',
                        required: true,
                        message: '展示终端不可为空',
                        trigger: 'change'
                    }],
                    DisplayPagePosition: [{
                        required: true,
                        message: '显示位置不可为空',
                        trigger: 'blur'
                    }],

                },
                BannerImageUrl: '',
                orderShow: true,
                dateShow: true,
                dialogVisible: false, //预览视图
                imgDelete: '', //待删除图片
                resList: {
                    replaceCurrentPic: '',

                }
            }
        },
        computed: {
            ...mapGetters({
                token: 'token',
            })
        },
        methods: {
            //时间转字符串
            dateToString(now) {
                if(!(now instanceof Date)) {
                    return now
                }
                var year = now.getFullYear();
                var month = (now.getMonth() + 1).toString();
                var day = (now.getDate()).toString();
                var hour = (now.getHours()).toString();
                var minute = (now.getMinutes()).toString();
                var second = (now.getSeconds()).toString();
                if(month.length == 1) {
                    month = "0" + month;
                }
                if(day.length == 1) {
                    day = "0" + day;
                }
                if(hour.length == 1) {
                    hour = "0" + hour;
                }
                if(minute.length == 1) {
                    minute = "0" + minute;
                }
                if(second.length == 1) {
                    second = "0" + second;
                }
                var dateTime = year + "-" + month + "-" + day;
                return dateTime;
            },
            getInfo() {
                this.flag = false
                if(!this.bannerId) {
                    return
                }
                const that = this
                axios.get(apiurl.CarouselMangeOfLook, {
                        params: {
                            "bannerId": that.bannerId,
                            "token": that.token,
                        }
                    })
                    .then(function(res) {
                        that.ruleForm = res.data.extra
                        that.BannerImageUrl = res.data.extra.BannerImageUrl
                        that.imgDelete = res.data.extra.BannerImageUrl
                        that.PublishStartTime = new Date(Date.parse(res.data.extra.strPublishStartTime))
                        //                      var begin = new Date(Date.parse(res.data.extra.strPublishStartTime))
                        //                      var end = new Date(Date.parse(res.data.extra.strPublishEndTime))
                        //                      that.strPublishTime = [begin, end]
                        that.ruleForm.DisplayPage = String(that.ruleForm.DisplayPage)
                        that.ruleForm.DisplayPagePosition = String(that.ruleForm.DisplayPagePosition)
                        that.$nextTick(function() {
                            that.flag = true
                        })
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            },
            changeTime(time) {
                if(!time) {
                    this.PublishStartTime = ''
                } else if(time != null) {
                    this.PublishStartTime = this.dateToString(time)
                }
            },
            //上传成功
            handleAvatarSuccess(res, file) {
                this.BannerImageUrl = res.extra.url;
                this.ruleForm.BannerImageUrl = res.extra.url;
                this.ruleForm.BannerImage = res.extra.resource;
                this.imgDelete = res.extra.url;
            },
            //上传之前的检测
            beforeAvatarUpload(file) {
                console.log("beforeUpload", file);
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp';
                var isLt = file.size / 1024;

                if(!isJPG) {
                    this.$message.error('上传图片只能是 JPG||PNG||BMP 格式!');
                    return false
                }
                if(!(isLt <= 2048)) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                    return false
                }
                //              if(this.ruleForm.radio == 1) {
                //                  if(!(isLt <= 2048)) {
                //                      this.$message.error('上传图片大小不能超过 2MB!');
                //                  }
                //              } else if(this.ruleForm.radio == 2) {
                //                  if(!(isLt <= 500)) {
                //                      this.$message.error('上传图片大小不能超过 500KB!');
                //                  }
                //              }
                //上传前删除上次的图片
                const that = this
                axios.post(apiurl.CarouselUploadDelete, {
                        "resource": that.imgDelete,
                    }, {
                        headers: {
                            'token': that.token
                        }
                    })
                    .then(function(res) {

                    })
                    .catch(function(err) {
                        console.log(err)
                    })
                return isJPG && isLt;
            },
            //上传失败
            handleAvatarError(err, file, fileList) {
                console.log("err", err);
                console.log("file", file);
                console.log("fileList", fileList);
                this.$message.error('图片过大或格式不正确');
            },
            //改变显示位置清空
            changeDisplayPage() {
                if(this.bannerId) {
                    if(this.flag) {
                        this.ruleForm.DisplayPagePosition = ''
                    }
                } else {
                    this.ruleForm.DisplayPagePosition = ''
                }
            },
            changeDisplayPosition() {
                if(this.bannerId) {
                    if(this.flag) {
                        this.ruleForm.DisplayPage = ''
                    }
                } else {
                    this.ruleForm.DisplayPage = ''
                }
            },
            //联动为空时提示
            clickDisplayPage(flag) {
                if(this.ruleForm.DisplayPosition == '' && flag == true) {
                    this.$message({
                        message: '请先选择展示终端',
                        type: 'warning'
                    })
                }
            },
            clickDisplayPagePosition(flag) {
                if(this.ruleForm.DisplayPage == '' && flag == true) {
                    this.$message({
                        message: '请先选择显示位置模块信息',
                        type: 'warning'
                    })
                }
            },
            //提交表单
            submitForm(formName) {
                var that = this
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        if(!that.ruleForm.BannerImageUrl || that.ruleForm.BannerImageUrl == '') {
                            that.$message({
                                message: '请上传图片',
                                type: 'warning'
                            })
                            return false;
                        }
                        axios.post(apiurl.CarouselSave, {
                                "id": that.bannerId,
                                "BannerTitle": that.ruleForm.BannerTitle,
                                "BannerImageUrl": that.ruleForm.BannerImageUrl,
                                "BannerImage": that.ruleForm.BannerImage,
                                "BannerImageLinkUrl": that.ruleForm.BannerImageLinkUrl,
                                "DisplayPosition": that.ruleForm.DisplayPosition,
                                "Sort": that.ruleForm.Sort,
                                "PublishStartTime": that.PublishStartTime,
                                //                              "PublishEndTime": that.PublishEndTime,
                                "DisplayPage": that.ruleForm.DisplayPage,
                                "DisplayPagePosition": that.ruleForm.DisplayPagePosition,
                            }, {
                                headers: {
                                    'token': that.token
                                }
                            })
                            .then(function(res) {
                                if(res.data.suc == true) {
                                    that.$message({
                                        message: '保存成功',
                                        type: 'success'
                                    })
                                    sessionStorage.setItem("DisplayPosition", that.ruleForm.DisplayPosition);
//                                  that.$router.push({
//                                      name: "lbtgl",
//                                  })
                                    var param = {};
                                    param.method = "closeThisTab";
                                    window.parent.postMessage(JSON.stringify(param), '*')
                                    param.method = "addTab";
                                    param.title = '轮播图管理';
                                    param.url = linkUrl + 'carouselManage/lbtgl?token=' + that.token +'&ModelUrl='+this.$route.query.ModelUrl;
                                    window.parent.postMessage(JSON.stringify(param), '*');
                                } else {
                                    that.$message({
                                        message: res.data.mes,
                                        type: 'warning'
                                    })
                                }
                            })
                            .catch(function(err) {
                                console.log(err)
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created() {
            this.uploadUrl = apiurl.CarouselUpload + '?token=' + this.token
            this.getInfo()
        },
        mounted() {

        },
    }
</script>
<style lang="scss">
    .nowidth {
        min-width: 1100px;
    }
    
    .formClass {
        line-height: 38px;
    }
    
    .el-icon-plus {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px dashed #ccc;
    }
    
    .quill-editor {
        height: 745px;
        .ql-container {
            height: 680px;
        }
    }
    
    .limit {
        height: 30px;
        border: 1px solid #ccc;
        line-height: 30px;
        text-align: right;
        span {
            color: #ee2a7b;
        }
    }
    
    .ql-snow .ql-editor img {
        max-width: 300px;
    }
    
    .ql-picker-label::before,
    .ql-picker-label svg {
        position: relative;
        bottom: 8px;
    }
    
    .titleOuter {
        .el-date-editor--daterange.el-input {
            width: 100%;
        }
        .titleInner {
            position: relative;
            .alertFontPos {
                position: absolute;
                top: 30;
                right: 0;
                font-size: 8px;
            }
            .el-icon-ts-mark1 {
                color: #00BC9C;
            }
        }
    }
</style>