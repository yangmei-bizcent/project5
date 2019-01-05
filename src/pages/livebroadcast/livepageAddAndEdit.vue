<template>
  <div class="ts-content out-width">
    <div v-if="type == 'add'" class="titleStyle">新增信息</div>
    <div v-else-if="type == 'edit'" class="titleStyle">编辑信息</div>
    <main class="main-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="108px" class="clearfix">
        <el-row>
          <el-col :span="8">
            <el-form-item 
                prop="phase"
                label="期数"
                required>
              <el-input placeholder="请输入数字" type="number" v-model.number="form.phase" clearable></el-input>
            </el-form-item>
          </el-col>   
          <el-col :span="8">
            <el-form-item 
                prop="anchor"
                label="主讲人"
                required>
              <el-input placeholder="10字以内" v-model="form.anchor" clearable></el-input>
            </el-form-item>
          </el-col>  
          <el-col :span="8">
            <el-form-item 
            prop="position"
            label="主讲人职称"
            required>
              <el-input placeholder="20字以内" v-model="form.position" clearable></el-input>
            </el-form-item>
          </el-col>              
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item 
            prop="title"
            label="标题"
            required>
              <el-input placeholder="20字以内" v-model="form.title" clearable></el-input>
            </el-form-item>
          </el-col>   
          <el-col :span="8">
            <el-form-item 
            prop="link"
            label="链接地址"
            required>
              <el-input placeholder="输入地址" v-model="form.link" clearable></el-input>
            </el-form-item>
          </el-col>  
          <el-col :span="8">
            <el-form-item 
            prop="dataValue"
            label="直播时间"
            required>
              <el-date-picker
                v-model="form.dataValue"
                type="datetimerange"
                :clearable="true"
                placeholder="选择日期范围"
                style="width: 100%;"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>              
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                :action="uploadURL"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>   
          <el-col :span="8">
            <el-form-item label="banner图">
              <el-upload
                class="avatar-uploader"
                :action="uploadURL"
                :show-file-list="false"
                :on-success="handleAvatarSuccessBanner"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrlBanner" :src="imageUrlBanner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>              
            </el-form-item>
          </el-col>             
        </el-row>
        <el-row>
            <el-form-item 
                prop="desc"
                label="主讲人简介"                
                required>
                <el-input type="textarea" v-model="form.desc" placeholder="200字以内" :rows="5"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button v-if="willShow" type="primary" @click="backList()">返回</el-button>
            </el-form-item> 
        </el-row>             
      </el-form>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import { mapGetters } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js';
export default {
  data() {
      var validPhase = (rule, value, callback) => {
          var vm = this;
          var flag = false;
          var regu = /^[1-9]\d*$/;
          if(!value){
              return callback(new Error('请填写期数'));
          }else if(!regu.test(value)||String(value).indexOf(".")!=-1){
              return callback(new Error('期数需正整数'));
          }else if(flag) {
              return callback(new Error('期数重复'));
          }else {
              callback();
          }
      }
      var validDesc = (rule, value, callback) => {
          if(!value){
              return callback(new Error('请填写主讲人简介'));
          }else if(value.length>200){
              return callback(new Error('主讲人简介最多200个字'));
          }else {
              callback();
          }
      }
      var validTime = (rule, value, callback) => {
          console.log(value)
          if(!value) {
              return callback(new Error('请选择日期'));
          }else {
              if(!value[0]) {
                  return callback(new Error('请选择日期'));
              }else {
                  callback();
              }
          }
      }
      return {
          form: {
              phase: '',
              anchor: '',
              position: '',
              title: '',
              desc: '',
              link: '',
              dataValue: []
          },
          rules: {
              phase: [
                  { required: true, validator: validPhase, trigger:'change,blur'}
              ],
              anchor: [
                  {required: true, message: '请输入主讲人姓名', trigger: 'change,blur'},
                  {min: 1, max: 10, message:'主讲人名称最多10个字', trigger:'change'},
                  
              ],
              position: [
                  {min: 1, max: 20, message:'主讲人名称最多20个字', trigger:'change'},
                  {required: true, message: '请填写主讲人职称', trigger: 'change,blur'}                  
              ],
              title: [
                  {min: 1, max: 20, message:'直播标题最多20个字', trigger:'change'},
                  {required: true, message: '请填写直播标题', trigger: 'change,blur'}                  
              ],
              link: [
                  {required: true, message: '请填写链接地址', trigger: 'change,blur'}
              ],
              dataValue: [
                  {type: 'date', required: true, validator: validTime, trigger: 'change'}
              ],
              desc: [
                  { required: true, validator: validDesc, trigger:'blur,change'}
              ]
          },
          pickerOptions: {
            disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
            }
          },
          dataValue: '',
          imageUrl: '',
          imageUrlBanner: '',
          uploadURL: '',
          type: '',
          commitId: 0,   //新增ID传0
          willShow: false,
      }
  },
    computed: {
        ...mapGetters({
            token: 'token'
        })
    },
    created () {
      this.uploadURL = apiurl.BroadcastUploadImg + '?token=' + this.token;
      console.log('222',this.$route)
      //根据路由query中state的值，显示新增或者编辑
      this.type = this.$route.query.state;
      
    },
    mounted () {
        if(this.type =="edit"){
            this.loadInfo(this.$route.query.transeId);
            this.willShow = true;
        }else {
            this.commitId = this.$route.query.transeId;
            this.willShow = false;
        }
    },
    methods: {
      //上传结果头像
      handleAvatarSuccess(res, file) {
        var that = this;
        if(res.code==200){
            this.$message({
                message: '头像上传成功',
                type: 'success'
            });
            this.imageUrl = res.extra;         
        }else{
            this.$message.error('头像上传失败');                
        }       
      },
      //上传结果Banner
      handleAvatarSuccessBanner(res, file) {
        var that = this;
        if(res.code==200){
            this.$message({
                message: 'banner图上传成功',
                type: 'success'
            });
            this.imageUrlBanner = res.extra;
        }else{
            this.$message.error('banner图上传失败');                
        }       
      },
      //上传文件限制
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg')||(file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //提交数据
      submitForm(formName) {
        //   if(!this.imageUrl) {
        //       this.$message.error('请上传头像');
        //       return;
        //   }
            this.$refs[formName].validate((valid) => {             
            if (valid) {
                //执行提交方法，然后跳转
                axios.post(apiurl.BroadcastSaveOrEdit,qs.stringify({
                    "Id": this.commitId,
                    "Phase": this.form.phase,
                    "Anchor": this.form.anchor,
                    "Appellation": this.form.position,
                    "Title": this.form.title,
                    "LiveLink": this.form.link,
                    "StartTime": this.form.dataValue[0],
                    "EndTime": this.form.dataValue[1],
                    "HeadPortrait": this.imageUrl,
                    "Banner": this.imageUrlBanner,
                    "Profile": this.form.desc,
                    'token': this.token
                })).then((response)=>{
                    if(response.data.suc){
                        this.$message({
                            message: response.data.mes,
                            type: 'success'
                        });
                        setTimeout(()=>{
                            var param = {};
                            param.method = "addTab";
                            param.title = '直播列表页';
                            param.url = linkUrl + 'livebroadcast/livepage?token='+this.token+'&ModelUrl='+this.$route.query.ModelUrl;
                            window.parent.postMessage(JSON.stringify(param), '*');
                            // this.$router.push({
                            //     path: 'livepage'
                            // })
                        },4000)
                    }else {
                        this.$message.error(response.data.mes);
                        return;
                    }
                }).catch(function(error){
                    console.log(error)
                })

            } else {
                console.log('前端验证失败');
                return false;
            }
        });
      },
      //返回按钮
      backList() {
        // this.$router.push({
        //     path: 'livepage'
        // })
        var param = {};
        param.method = "addTab";
        param.title = '直播列表页';
        param.url = linkUrl + 'livebroadcast/livepage?token='+this.token+'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');        
      },
      //如果是编辑，则回填数据
      loadInfo(transeId) {
          axios.get(apiurl.BroadcastFill,{
              params: {
                  id: transeId
              },
              headers: {
                  'token': this.token
              }
          }).then((response)=>{
              if(response.data.suc){
                var extra = response.data.extra;
                this.form.phase = extra.Phase;
                this.form.anchor = extra.Anchor;
                this.form.position = extra.Appellation;                
                this.form.title = extra.Title;
                this.form.desc = extra.Profile;
                this.form.link = extra.LiveLink;               
                this.form.dataValue = [extra.StartTime,extra.EndTime];
                this.imageUrlBanner = extra.Banner;
                this.imageUrl = extra.HeadPortrait;
                this.commitId = extra.Id;
              }
          }).catch((err)=>{
              console.log(err)
          })
      }
    },
}
</script>

<style>
    .out-width {
        min-width: 980px;       
    }
    .titleStyle {
        font-size: 18px;
        color: #425B77;
        padding-bottom: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #E6E6E6;
    }
    .main-wrap .el-form-item {
        margin-right: 10px;
    }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }    
</style>
