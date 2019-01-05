<template>
    <div class="ts-content wrapper-datepicker newcss nowidth">
        <main class="main-wrap">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px" class="clearfix formClass">
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="展示终端" prop="DisplayPosition">
                            <el-radio-group v-model="ruleForm.DisplayPosition" @change='changeDisplayPosition'>
                                <el-radio class="radio" :label="2">PC官网</el-radio>
                                <el-radio class="radio" :label="3">居民微信端</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="标题" prop="NewsTitle">
                            <el-input v-model="ruleForm.NewsTitle" placeholder="50字以内" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="跳转链接">
                            <el-input v-model="ruleForm.NewsLinkUrl" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="分类" prop="NewsTypeId">
                            <el-select v-model="ruleForm.NewsTypeId" @change="changeNewsType" placeholder="请选择">
                                <el-option v-for="item in BMCodeList" :key="item.Id" :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="来源" prop="NewsAuthor">
                            <el-input v-model="ruleForm.NewsAuthor" placeholder="25字以内" :maxlength="25"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="排序" class="titleInner" prop="Sort">
                            <el-input type='number' v-model.number="ruleForm.Sort" placeholder="" :min="1" :max="5000"></el-input>
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
                                <span>发布时间为新闻资讯在各个端开始显示的时间</span>
                            </div>-->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter" style="margin-top: 20px;">
                    <el-col :span="23" style="margin-right: 30px">
                        <el-form-item label="封面图片" required>
                            <el-upload style="padding-top:12px;width: 300px;" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" accept="image/jpg,image/png,image/jpeg,image/bmp">
                                <img v-if="NewsImageUrl!=''" width="100%" height="100%" :src="ruleForm.NewsImageUrl" alt="替换图片">
                                <i v-else class="el-icon-plus"></i>
                            </el-upload>
                            <!-- <el-dialog v-model="dialogVisible" size="tiny">
                                <img width="100%" :src="resList.dialogImageUrl" alt="">5
                            </el-dialog> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--<el-row>
                    <quill-editor v-model="ruleForm.NewsContent" ref="conditionEditor">
                    </quill-editor>
                </el-row>-->
                <el-row>
                    <quill-editor v-model="content" ref="myTextEditor" :options="editorOption" @change="onChange">
                        <div id="toolbar" slot="toolbar">
                            <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
                            <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>

                            <span class="ql-formats"><select class="ql-size">
        <option value="small"></option>
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select></span>
                            <span class="ql-formats"><select class="ql-header" >
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option selected="selected"></option>
      </select></span>
                            <span class="ql-formats"><select class="ql-color">
        <option selected="selected"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option value="#ffffff"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
                            <span class="ql-formats"> <select class="ql-background">
        <option value="#000000"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option selected="selected"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
                            <span class="ql-formats"><select class="ql-font">
        <option selected="selected"></option>
        <option value="serif"></option>
        <option value="monospace"></option>
      </select></span>
                            <span class="ql-formats">
        <select class="ql-align">
        <option selected="selected"></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      </span>
                            <span class="ql-formats"><button type="button" class="ql-clean"></button></span>
                            <span class="ql-formats"><button type="button" class="ql-link"></button></span>
                            <!--图片按钮点击事件-->
                            <span class="ql-formats"><button type="button" @click="imgClick">
        <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
      </button></span>
                            <span class="ql-formats"><button type="button" class="ql-video"></button></span>
                        </div>
                    </quill-editor>
                </el-row>
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
        props: {
            value: {
                type: String
            },
            /*上传图片的file控件name*/
            fileName: {
                type: String,
                default: 'upload_file'
            }
        },
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
                content: '',
                flag: false,
                options: [],
                editorOption: {
                    modules: {
                        toolbar: '#toolbar'
                    }
                },
                informationId: this.$route.query.informationId,
                uploadUrl: '',
                ruleForm: {},
                strPublishTime: [],
                PublishStartTime: '',
                PublishEndTime: '',
                BMCodeList: [], //类别
                rules: {
                    NewsTitle: [{
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
                    NewsTypeId: [{
                        type: 'number',
                        required: true,
                        message: '类型不可为空',
                        trigger: 'change'
                    }],
                    DisplayPosition: [{
                        type: 'number',
                        required: true,
                        message: '展示终端不可为空',
                        trigger: 'change'
                    }],
                    NewsAuthor: [{
                        required: true,
                        message: '来源不可为空',
                        trigger: 'blur'
                    }],
                },
                NewsImageUrl: '',
                imgDelete: '', //待删除图片
                orderShow: true,
                dateShow: true,
                dialogVisible: false, //预览视图
                resList: {
                    replaceCurrentPic: '',

                }
            }
        },
        computed: {
            ...mapGetters({
                token: 'token',
            }),
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
        methods: {
            onChange() {
                this.$emit('input', this.content)
            },
            /*选择上传图片切换*/
            onFileChange(e) {
                var self = this
                var fileInput = e.target
                if(fileInput.files.length == 0) {
                    return
                }
                this.editor.focus()
                console.log(fileInput.files)
                if(fileInput.files[0].size > 1024 * 1024 * 100) {
                    this.$alert('图片不能大于600KB', '图片尺寸过大', {
                        confirmButtonText: '确定',
                        type: 'warning',
                    })
                }
                var data = new FormData
                data.append(this.fileName, fileInput.files[0])
                axios.post(this.uploadUrl, data).then(function(res) {
                    if(res.data.extra) {
                        self.editor.insertEmbed(self.editor.getSelection().index, 'image', res.data.extra.url)
                    } else {
                        self.$message.error('图片过大或格式不正确');
                    }
                })
            },
            /*点击上传图片按钮*/
            imgClick() {
                if(!this.uploadUrl) {
                    console.log('no editor uploadUrl')
                    return;
                }
                /*内存创建input file*/
                var input = document.createElement('input')
                input.type = 'file'
                input.name = this.fileName
                input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
                input.onchange = this.onFileChange
                input.click()
            },
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
                console.log(this.informationId)
                if(!this.informationId) {
                    return
                }
                const that = this
                axios.get(apiurl.GetNewsInfo, {
                        params: {
                            "informationId": that.informationId,
                            "token": that.token,
                        }
                    })
                    .then(function(res) {
                        that.ruleForm = res.data.extra
                        that.content = that.ruleForm.NewsContent
                        that.NewsImageUrl = res.data.extra.NewsImageUrl
                        that.NewsImage = res.data.extra.NewsImage
                        that.PublishStartTime = new Date(Date.parse(res.data.extra.strPublishStartTime))
                        //                      var begin = new Date(Date.parse(res.data.extra.strPublishStartTime))
                        //                      var end = new Date(Date.parse(res.data.extra.strPublishEndTime))
                        //                      that.strPublishTime = [begin, end]
                        that.$nextTick(function() {
                            that.flag = true
                        })
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            },
            //获取类别
            GetBMCodeList() {
                const that = this
                axios.get(apiurl.GetBMCodeList, {
                        params: {
                            "token": that.token,
                            'type': "NewsType",
                        }
                    })
                    .then(function(res) {
                        that.BMCodeList = res.data.rows
                        that.getInfo()
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            },
            //根据类别id获取类别名
            changeNewsType(value) {
                let obj = {}
                obj = this.BMCodeList.find((item) => {
                    return item.Id === value
                })
                if(obj) {
                    this.ruleForm.NewsTypeName = obj.Name
                } else {
                    this.ruleForm.NewsTypeName = ''
                }
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
                this.NewsImageUrl = res.extra.url;
                this.ruleForm.NewsImageUrl = res.extra.url;
                this.ruleForm.NewsImage = res.extra.resource;
                this.imgDelete = res.extra.url;
            },
            //上传之前的检测
            beforeAvatarUpload(file) {
                console.log("beforeUpload", file);
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp';
                var isLt = file.size / 1024;
                console.log(isLt)
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
                axios.post(apiurl.DeleteBannerNewsImg, {
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
                if(this.flag) {
                    this.ruleForm.DisplayPagePosition = ''
                }
            },
            changeDisplayPosition() {
                if(this.flag) {
                    this.ruleForm.DisplayPage = ''
                }
            },
            //提交表单
            submitForm(formName) {
                console.log(this.ruleForm.NewsTypeName)
                var that = this
                that.ruleForm.NewsContent = that.content
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        if(!that.ruleForm.NewsImageUrl || that.ruleForm.NewsImageUrl == '') {
                            that.$message({
                                message: '请上传图片',
                                type: 'warning'
                            })
                            return false;
                        }
                        if(!that.ruleForm.NewsContent || that.ruleForm.NewsContent == '') {
                            that.$message({
                                message: '请输入资讯内容',
                                type: 'warning'
                            })
                            return false;
                        }
                        axios.post(apiurl.SaveInformation, {
                                "id": that.informationId,
                                "NewsTitle": that.ruleForm.NewsTitle,
                                "NewsAuthor": that.ruleForm.NewsAuthor,
                                "NewsTypeId": that.ruleForm.NewsTypeId,
                                "NewsTypeName": that.ruleForm.NewsTypeName,
                                "NewsImageUrl": that.ruleForm.NewsImageUrl,
                                "NewsImage": that.ruleForm.NewsImage,
                                "NewsLinkUrl": that.ruleForm.NewsLinkUrl,
                                "DisplayPosition": that.ruleForm.DisplayPosition,
                                "Sort": that.ruleForm.Sort,
                                "PublishStartTime": that.PublishStartTime,
                                "PublishEndTime": that.PublishEndTime,
                                "NewsContent": that.ruleForm.NewsContent,
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
                                    sessionStorage.setItem("DisplayPosition2", that.ruleForm.DisplayPosition);
                                    //                                                                      that.$router.push({
                                    //                                                                          name: "xwzx",
                                    //                                                                      })
                                    var param = {};
                                    param.method = "closeThisTab";
                                    window.parent.postMessage(JSON.stringify(param), '*');
                                    param.method = "addTab";
                                    param.title = '新闻资讯管理';
                                    param.url = linkUrl + 'newsManage/xwzx?token=' + that.token+'&ModelUrl='+this.$route.query.ModelUrl;
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
            console.log(this.informationId)
            this.uploadUrl = apiurl.UploadInformationImg + '?token=' + this.token
            this.GetBMCodeList()
        },
        mounted() {
            this.content = this.value
        },
        watch: {
            'value' (newVal, oldVal) {
                if(this.editor) {
                    if(newVal !== this.content) {
                        this.content = newVal
                    }
                }
            },
        }
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
        width: 90%;
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
    
    .ql-formats {
        margin-right: 5px!important;
    }
    
    .ql-video,
    .ql-blockquote,
    .ql-code-block {
        display: none!important;
    }
</style>