<template>
    <section class="messageMod" v-show="msg.msgMod">  
        
        <div class="box clearfix" v-show="msg.boxshow">
            <header class="clearfix" style="border-bottom:1px solid #ccc;padding:15px 10px;">
                <span style="float:left;font-size:18px;">{{msg.typeMsg==1 ?'单发短信提醒':'群发短信提醒'}}</span>
                <i class="el-icon-close" @click="closeX(false)" style=" cursor: pointer;color:#ddd;float:right;font-size:12px;" title="关闭"></i>
            </header>
               <div class="clearfix">
                    <el-col :span="14">
                    <el-form ref="form" :model="form" class="clearfix formClass formClass1">
                         <el-form-item  label="选择项"  v-if="msg.typeMsg==2" >
                            <span style="display:block;line-height:36px;font-weight: bold;">{{msg.titleText}}</span>
                        </el-form-item>
                        <el-form-item  label="短信标题输入"  >
                            <el-input  placeholder="输入标题..." v-model="form.messageName" style="margin-right:5px;" ></el-input>
                        </el-form-item>
                        <el-form-item  label="短信内容" class='towinput'>
                            <div class="noedit"  v-if='leftnoeditflog == -1'>{{noedittext}}</div>
                            <el-input class="messCon nopadding" type="textarea" 
                            :rows="4"  placeholder="请输入短信内容..."  v-model="form.messageContent"></el-input>
                            <span v-if="messContentError==1" class="el-form-item__error">请输入短信内容</span>
                        </el-form-item>
                        <el-form-item   label-width="0px" class="explain width100">
                            <i class="el-icon-ts-mark2" /> 目前还剩{{RechargeNum}}条短信可发送，可去续费，70个字以内为1条，每条5分钱。
                            <span class="messageSpan" ><a href="javascript:void(0);" @click='paybtn()' style="color: #539cdb;">去续费></a></span>
                        </el-form-item>
                        
                    </el-form>
                </el-col>
            
                <el-col :span="10">
                    <el-form ref="form2" class="formClass formClass2" v-model="form2"  :span="8">
                    <span style="display:block;margin-bottom:5px;">短信模板</span>
                        <el-form-item>
                            <el-select v-model="form2.region" @change="changeClick" placeholder="选择短信模板">
                            <el-option label="公用" value="1"></el-option>
                            <el-option label="个人" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="form2.messageTitle" @change="changeSelectValue(form2.messageTitle)" placeholder="选择短信">
                            <el-option v-for="(item,index) in fenLeiMessDrop" :key='index' :label="item.TemName" :value="item.Id">{{item.TemName}}</el-option>     
                            </el-select>
                        </el-form-item>
                        <el-form-item label="" class='towinput'>
                            <div class="noedit" style="color:#73879C;" v-if='noeditflog == -1'>{{noedittext}}</div>
                            <el-input type="textarea" :rows="4" class='nopadding'  placeholder="请输入短信内容..."  v-model="form2.messageContent2"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button  @click="setSelectContent" size="medium">使用此模板</el-button>
                        </el-form-item>
                    </el-form>   
                </el-col>
               </div>
            <footer class="clearfix" style="border-top:1px solid #ccc;padding:10px 20px;">
                 <el-button type="primary" @click="submitForm('form')" style="float:right;">确认发送</el-button>
                 <el-button @click="closeX(false)" style="float:right;margin-right:10px;">取消</el-button>
            </footer>
        </div>
         <!--新增弹框-->
        <div class="yzmMod" v-show="dialogFormVisible">
            <header class="clearfix" style="padding:20px 0;">
                <span style="font-size:20px;">验证码</span>
                <i class="el-icon-close" @click="canelSend" style=" cursor: pointer;color:#ddd;float:right;font-size:12px;" title="关闭"></i>
            </header>
            <div>
                <el-input placeholder="请输入验证码" style="width:260px;display: inline-block;" v-model="yanzhengCode"  auto-complete="off"></el-input>
                <span v-show="!yanzhengImg"  style="margin:0 0 2px 10px;vertical-align: middle;display: inline-block;">加载中...</span>
                 <img v-show="yanzhengImg" :src="yanzhengImg" title="点击刷新验证码" @click="getImg()" style="margin:0 0 2px 10px;vertical-align: middle;display: inline-block;cursor:pointer;" />
            </div>
            <span style="color:red">{{TiShiYanZheng}}</span>
            <div class="dialog-footer" style="margin-top:20px;text-align:right;">
                <el-button @click="canelSend">取 消</el-button>
                <el-button type="primary" @click="queDingSend" :loading="btnBool">确 定</el-button>
            </div>
        </div>
    </section>
</template>
   

<script>
    import '../../assets/sass/referralRecord.scss';
    import { mapGetters, mapActions } from 'vuex';
    import { apiurl,linkUrl,appid,linkUrlMsg } from '../../service/api.js'
    import axios from 'axios';
    import axion from '@/util/http_url.js'
    import qs from 'qs';
    export default {
        name: 'messageMod',
        data() {
            return{
                form: {
                    messageName: "",
                    messageContent: ""
                },
                form2: {
                    region: "1",
                    messageTitle: "",
                    messageContent2: ""
                },
                leftnoeditflog:1,
                messContentError:0,
                noeditflog:1,//是否显示不可编辑模板 1 编辑  -1 不可编辑
                fenLeiMessDrop: [],
                dialogFormVisible: false,
                yanzhengImg:"",//验证码二维码
                yanzhengCode:"",//验证码
                yanzhengcacheName:"",//验证码cacheName
                TiShiYanZheng:"",
                tags: [],    //name
                AvailableNum: 0, //可用的短信数量
                FreeNum: 1000, //免费的短信数量
                RechargeNum: 0, //已经用的短信数量
                btnBool:false,
                noedittext:'',//不可编辑模板文案
            }
        },
        props:{
            msg:{
                msgMod:{
                    type:Boolean,
                    default:false
                },
                boxshow:{
                    type:Boolean,
                    default:true
                },
                typeMsg:{
                    type:Number,
                    default:1//1代表单发、2代表群发
                },
                patientId:0,
                parDate:{//群发需要的传参
                    registerTime:"",
                    servicePackId:"",
                    servicePackItemId:"",
                    remainTimes:'',
                    keyWords:"",
                    doctorId:""
                },
                titleText:""

            }
            
        },
        created(){
            
        },
        computed: {
            ...mapGetters({
                token: 'token'
            }),
        },
        
        mounted() {
             this.MessagefenLeiDropList();
             this.GetAvaliableMsgInfo();
        },
        methods: {
            //去续费跳转
            paybtn() {
                var self=this;
                var param = {};
                param.method = "addTab";
                param.title = "购买短信";
                param.url = linkUrlMsg + 'message/messageBuy?token=' + this.token ;
                window.parent.postMessage(JSON.stringify(param), '*');
                
            },
            //获取可用的短信数量
            GetAvaliableMsgInfo() {
                var self = this;
                axios.get(apiurl.MessagaeAvaliableMsgInfo, {
                    headers: {
                        appId: appid,
                        token: self.token
                    }
                })
                .then(function(res) {
                    if (res.data.suc == true) {
                        self.AvailableNum = res.data.extra.AvailableNum; //可用的
                        self.FreeNum = res.data.extra.FreeNum; //免费的
                        self.RechargeNum =Number(res.data.extra.RechargeNum)+Number(res.data.extra.FreeNum); //剩下的
                    }
                });
            },
              //发送短信
            sendMessage() {
                var self = this;
                this.btnBool=true;
                var data={};
                var newmessage = '';
                if(this.leftnoeditflog == -1){
                    newmessage = this.noedittext+','+self.form.messageContent;
                }else{
                    newmessage = self.form.messageContent;
                }
                if(this.msg.typeMsg==1){
                    data={
                        patientId:this.msg.patientId,
                        message:newmessage,
                        temName:self.form.messageName,
                        code:self.yanzhengCode,
                        cacheName:self.yanzhengcacheName,
                    }
                }else if(this.msg.typeMsg==2){
                    data={
                        registerTime:this.msg.parDate.registerTime,
                        servicePackId:this.msg.parDate.servicePackId,
                        servicePackItemId:this.msg.parDate.servicePackItemId,
                        remainTimes:this.msg.parDate.remainTimes,
                        keyWords:this.msg.parDate.keyWords,
                        doctorId:this.msg.parDate.doctorId,
                        message:newmessage,
                        temName:self.form.messageName,
                        code:self.yanzhengCode,
                        cacheName:self.yanzhengcacheName,
                    }
                }
                axios.post(apiurl.MessagaeSend,data,{
                    headers: {
                        token: self.token
                    }
                    }).then(function(res) {
                        self.btnBool=false;
                        if (res.data.suc == true) {
                            self.$message({
                                type: "success",
                                message: res.data.mes
                            });
                            self.$emit("closeX",false);
                            self.dialogFormVisible = false;
                            self.GetAvaliableMsgInfo();//更新剩余短信条数

                            self.form2.messageTitle="";
                            self.form2.messageContent2="";
                            self.form.messageContent = '';
                            self.noeditflog = 1;
                            self.leftnoeditflog = 1;
                            self.form.messageName = '';
                            self.form2.region="1";
                            self.MessagefenLeiDropList();
                            $('.nopadding').find('.el-textarea__inner').attr('style','padding-top:5px!important;min-height: 33px;');
                        
                        } else {
                            self.getImg();
                            self.$message({
                            type: "warning",
                            message:res.data.mes
                            });
                        }
                });
            },
             //确定发送
            queDingSend() {
                var self=this;
                if(self.yanzhengCode==""){
                    self.TiShiYanZheng="请输入验证码";
                }else{
                    self.sendMessage();
                }
            },
            canelSend() {
                var self=this;
                self.dialogFormVisible=false;
                self.msg.boxshow=true;
                self.TiShiYanZheng="";
            },
            submitForm(formName) {
                var self=this;
                var isorno=true;
                self.TiShiYanZheng="";
                if(self.form.messageContent=="")
                {
                    isorno=false;
                    self.messContentError=1;
                    return false;
                }

                if(isorno) {
                    self.yanzhengCode="";
                    self.messContentError=0; self.messTagSError=0;
                    self.msg.boxshow=false;
                    self.dialogFormVisible = true;
                    self.getImg();
                }
               
            },
            //获取短信发送验证码
            getImg() {
                var self=this;
                axios.get(apiurl.MessageYanZhengImge,{
                headers: {
                    appId: appid,
                    token: self.token
                    }
                }).then(function(res) {
                    if(res.data.suc==true)
                    {
                        self.yanzhengImg=res.data.extra.url;
                        self.yanzhengcacheName=res.data.extra.cacheName;
                    }
                })
            },
            closeX(bool){
                this.$emit("closeX",bool);
            },
             changeClick(){
                var self=this;
                self.form2.messageTitle="";
                self.form2.messageContent2="";
                this.form.messageContent = '';
                this.noeditflog = 1;
                this.leftnoeditflog = 1;
                this.form.messageName = '';
                this.MessagefenLeiDropList();
                $('.nopadding').find('.el-textarea__inner').attr('style','padding-top:5px!important;min-height: 33px;')
             },
             MessagefenLeiDropList() {
                var self = this;
                axios.get(apiurl.MessageModelList, {
                    params: {
                    IsPublic: self.form2.region,
                    keyWord:""
                    },
                    headers: {
                    appId: appid,
                    token: self.token
                    }
                })
                .then(function(res) {
                    // console.log(res);
                    if (res.data.suc == true) {
                    self.fenLeiMessDrop = res.data.rows;
                    }
                });
            },
             setSelectContent() {
                var messageTitle = this.fenLeiMessDrop.find(
                    item => item.Id === this.form2.messageTitle
                )["TemName"]; //
                var messagecontext = this.form2.messageContent2;
                this.form.messageName = messageTitle; 
                this.form.messageContent = messagecontext;
                this.leftnoeditflog = this.noeditflog;
                if(this.leftnoeditflog == -1){
                    $('.messCon').find('.el-textarea__inner').attr('style','padding-top:35px!important;min-height: 33px;')
                }else{
                    $('.messCon').find('.el-textarea__inner').attr('style','padding-top:6px!important;min-height: 33px;')
                }
            },
            //选择模板内容
            changeSelectValue(val) {
                var self = this;
                this.form.messageContent = '';
                this.leftnoeditflog = 1;
                this.form.messageName = '';
                for (var i = 0; i < self.fenLeiMessDrop.length; i++) {
                    if (self.fenLeiMessDrop[i].Id == val) {
                    this.noeditflog = this.fenLeiMessDrop[i].TemType;
                    this.noedittext = self.fenLeiMessDrop[i].TemContent;
                    if(this.noeditflog == -1){
                        this.form2.messageContent2 = '';
                        $('.nopadding').find('.el-textarea__inner').attr('style','padding-top:35px!important;min-height: 33px;')
                    }else{
                        this.form2.messageContent2 = self.fenLeiMessDrop[i].TemContent;
                        $('.nopadding').find('.el-textarea__inner').attr('style','padding-top:6px!important;min-height: 33px;')
                    }
                    if(this.leftnoeditflog == -1){
                        $('.messCon').find('.el-textarea__inner').attr('style','padding-top:35px!important;min-height: 33px;')
                    }else{
                        $('.messCon').find('.el-textarea__inner').attr('style','padding-top:6px!important;min-height: 33px;')
                    }
                    // this.form2.messageContent2 = self.fenLeiMessDrop[i].TemContent;
                    break;
                    }
                }
            },

         },

}


</script>
<style lang="scss" scoped>
   .messageMod{
        position: fixed;
        left:0;
        top:0;
        width:100%;
        height: 100%;
        padding: 10px;
        z-index: 9;
        overflow-y: auto;
        filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#7F000000', endColorstr='#7F000000');background:rgba(0,0,0,0.5);
        .box{
            margin: 6% auto 0;
            width:70%;
            background: #fff;
            border-radius: 5px;
           .formClass{
                background:#fff;
                padding:10px 20px;
               
           }
           .formClass{
               padding-top:20px;
           }
        }
        .el-icon-ts-mark2{
            font-size: 20px;
            vertical-align: middle;
            color: #F6A810;
            margin-right: 5px;
        }
        .noedit{
            position: absolute;
            left: 1px;
            top: 2px;
            font-size: 12px;
            width: calc(100% - 2px);
            height: 29px;
            line-height: 29px;
            padding-left: 16px;
            background: #F7F7F7;
            border-bottom: 1px solid #e6e6e6;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        .el-textarea__inner {
            display: block;
            resize: vertical;
            padding: 5px 15px;
            line-height: 1.5;
            box-sizing: border-box;
            width: 100%;
            font-size: inherit;
            color: #606266;
            background-color: #fff;
            background-image: none;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        }
        .el-textarea__inne{
                border-radius: 0;
                font-size: 14px;
                width: calc(100% - 80px);
        }
        .formClass1 .el-textarea__inner {
            border-radius: 0;
            font-size: 14px;
            width: calc(100% - 80px);
        }
        .el-form-item__content {
            width: calc(100% - 120px);
            margin: 0;
            float: left;
        }
        .yzmMod{
            position: absolute;
            left:50%;
            top:200px;
            margin-left:-25%;
            background: #fff;
            width:50%;
            height: 180px;
            border-radius: 5px;
            padding: 0 20px;
            min-width: 450px;
            header{
                span{
                    float: left;
                    font-weight:bold;
                }
            }
        }
       
   }
</style>