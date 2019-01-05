<template>
  <div class="detailBox">
    <div class="treatment_state clearfix">
        <div class="cus_row clearfix">
          <label class="cus_label">转诊状态</label><div class="cus_content" v-html="getInforli.HospitalizedState==1?'待审核':getInforli.HospitalizedState==2?'预住院':getInforli.HospitalizedState==3?'已拒绝':getInforli.HospitalizedState==4?'已取消':getInforli.HospitalizedState==5?'已作废':getInforli.HospitalizedState==6?'未入院':getInforli.HospitalizedState==7?'已入院':getInforli.HospitalizedState==8?'已出院':'补录'"></div>
        </div>
        <div class="cus_row clearfix" v-if="getInforli.HospitalizedState==3">
            <label class="cus_label">拒绝原因</label>
            <div class="cus_content" style="width:60%!important;">{{getInforli.RefusalReason}}</div>
        </div>
        <div class="cus_row clearfix" v-if="getInforli.HospitalizedState==4">
            <label class="cus_label">取消原因</label>
            <div class="cus_content">{{getInforli.CancelReason}}</div>
        </div>
        <div class="cus_row clearfix" v-if="getInforli.HospitalizedState==5">
            <label class="cus_label">作废原因</label>
            <div class="cus_content">{{getInforli.DeleteReason}}</div>
        </div>
    </div>
    <div class="treatment_content clearfix flex3">
        <div class="x_title clearfix">转诊信息</div>
        <!--<div class="custom_width clearfix"></div>-->
        <label class="cus_label">转诊编号</label>
        <div class="cus_content">{{getInforli.TransferNo}}</div>
        <label class="cus_label">申请转入医院</label>
        <div class="cus_content">{{getInforli.AppointmentHospitalName}}</div>
         <label class="cus_label">申请转入科室</label>
         <div class="cus_content">{{getInforli.AppointmentSectionName}}</div>
    </div>
    <div class="treatment_content  clearfix flex3">
         <label class="cus_label">医疗组</label>
         <div class="cus_content">{{getInforli.MedicalGroupName}}</div>
          <label class="cus_label">紧急程度</label>
         <div class="cus_content">{{getInforli.UrgentStateText}}</div>
         <label class="cus_label">转运工具</label>
         <div class="cus_content">{{getInforli.TransportWayText}}</div>
    </div>
    <div class="treatment_content  clearfix flex3">
         <label class="cus_label">病情危重程度</label>
         <div class="cus_content">{{getInforli.IllnessSeverityText}}</div>
          <label class="cus_label">转运评估</label>
         <div class="cus_content">{{getInforli.TransferEvaluationText}}</div>
         <label class="cus_label">入院类别</label>
         <div class="cus_content">{{getInforli.AdmissionCategoryText}}</div>
    </div>
     <div class="treatment_content  clearfix flex3">
         <label class="cus_label">转诊原因</label>
         <div class="cus_content">{{getInforli.TransferReason}}</div>
          <label class="cus_label">病床要求</label>
         <div class="cus_content">{{getInforli.ConditionRequirementText}}</div>
         <label class="cus_label">安排转入科室</label>
        <div class="cus_content">{{getInforli.SureAppointmentSectionName}}</div>
    </div>
    <div class="treatment_content  clearfix flex3">
         <label class="cus_label">申请入住日期</label>
         <div class="cus_content">{{jiequ(getInforli.AppointmentPlanDate)}}</div>
          <label class="cus_label">预计住院天数</label>
         <div class="cus_content">{{getInforli.AppointmentPlanDayNum==0?'':getInforli.AppointmentPlanDayNum}}</div>
         <label class="cus_label">安排入住日期</label>
         <div class="cus_content">{{jiequ(getInforli.SureHospitalzedDate)}}</div>
    </div>
    <div class="treatment_content  clearfix flex3">
         <label class="cus_label">床位类型</label>
         <div class="cus_content">{{getInforli.BedTypeText}}</div>
          <label class="cus_label">隔离要求</label>
         <div class="cus_content">{{removeOther(getInforli.IsolationRequirementsText)}}{{getInforli.IsolationRequirementsRemark==''?'':'，'+getInforli.IsolationRequirementsRemark}}</div>
    </div>
    <div class="treatment_content  clearfix">
         <label class="cus_label" >其他要求</label>
         <div class="cus_content" style="width:500px!important;">{{getInforli.OtherRequired}}</div>
    </div>

    <div class="treatment_content clearfix flex3">
        <div class="x_title clearfix">病人基本信息</div>
         <label class="cus_label">病人姓名</label>
         <div class="cus_content">{{getInforli.PatientName}}</div>
         <label class="cus_label">病人身份证号</label>
         <div class="cus_content">{{getInforli.PatientCardId}}</div>
         <label class="cus_label">病人性别</label>
         <div class="cus_content">{{getInforli.PatientSex=='0'?'女':'男'}}</div>
    </div>
    <div class="treatment_content clearfix flex3">
         
         <label class="cus_label">病人出生日期</label>
         <div class="cus_content">{{jiequ(getInforli.PatientBirthday)}}</div>
          <label class="cus_label">病人年龄</label>
          <div class="cus_content">{{getInforli.PatientAge}}</div>
          <label class="cus_label">医保报销类别</label>
         <div class="cus_content">{{getInforli.MedicalTypeName}}</div>
    </div>
    <div class="treatment_content clearfix flex3">
         
         <label class="cus_label">病人手机号码</label>
         <div class="cus_content">{{getInforli.PatientPhone}}</div>
          <label class="cus_label">家属姓名</label>
          <div class="cus_content">{{getInforli.ContactName}}</div>
          <label class="cus_label">家属手机号码</label>
         <div class="cus_content">{{getInforli.EmergencyPhone}}</div>
    </div>
    <div class="treatment_content clearfix flex3">
         
         <label class="cus_label">病人居住地址</label>
         <div class="cus_content" style="width:60%!important;">{{getInforli.Province}}{{getInforli.City}}{{getInforli.Area}}{{getInforli.DetailedAddress}}</div>
    </div>
  


    <div class="treatment_content clearfix flex3">
        <div class="x_title clearfix">病人病情信息</div>
        <label class="cus_label">转出科室</label>
         <div class="cus_content">{{getInforli.ApplySectionName}}</div>
          <label class="cus_label">转出医院联系人</label>
         <div class="cus_content">{{getInforli.ApplyDoctorName}}</div>
         <label class="cus_label">转出医院联系人手机号码</label>
         <div class="cus_content">{{getInforli.ApplyDoctorPhone}}</div>
    </div>

    <div class="treatment_content clearfix">
         <label class="cus_label">主要诊断</label>
         <div class="cus_content" style="width:500px!important;">{{getInforli.Diagnose}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">病情描述</label><div class="cus_content" style="width:60%!important;">{{getInforli.PatientCondition}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">病人主诉</label><div class="cus_content" style="width:60%!important;">{{getInforli.PatientComplaint}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">生命体征检查</label><div class="cus_content"  style="width:60%!important;" v-if="getInforli.ExaminationTemperature!=0 && getInforli.ExaminationTemperature!='' && getInforli.ExaminationTemperature!='null' && getInforli.ExaminationTemperature!=0">T：{{getInforli.ExaminationTemperature}}℃；  P：{{getInforli.ExaminationPulse}}次/分；  R：{{getInforli.ExaminationBreathing}}次/分；  B/P：{{getInforli.ExaminationBloodPressure}}mmHG；</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">其他检查</label><div class="cus_content" style="width:60%!important;">{{getInforli.OthersRemark}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">其他说明</label><div class="cus_content" style="width:60%!important;">{{getInforli.OthersDescription}}</div>
    </div>


    <div class="treatment_content clearfix flex3">
        <div class="x_title clearfix">出院信息</div>
        <label class="cus_label">入院日期</label>
         <div class="cus_content">{{jiequ(getInforli.InApplyHospitalDate)}}</div>
          <label class="cus_label">出院日期</label>
         <div class="cus_content">{{jiequ(getInforli.OutApplyHospitalDate)}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">入院原因</label><div class="cus_content" style="width:60%!important;">{{getInforli.InApplyHospitalReason}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">入院情况</label><div class="cus_content" style="width:60%!important;">{{getInforli.InApplyHospitalRemark}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">治疗经过</label><div class="cus_content" style="width:60%!important;">{{getInforli.InApplyHospitalTreatment}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">出院情况</label><div class="cus_content" style="width:60%!important;">{{getInforli.InApplyHospitalDischargeSituation}}</div>
    </div>

    <div class="treatment_content clearfix">
      <label class="cus_label floatLeft">附件</label>
      <div v-if="getInforli.InApplyHospitalFiles">
        <div class="border cus_content " v-for="(filesName,index) in spli(getInforli.InApplyHospitalFileNames)">
          <span v-if="fileJudge(filesName)==true" @click="openImg(spli(getInforli.InApplyHospitalFiles)[index])">{{filesName}}</span>
          <a v-if="fileJudge(filesName)==false" :href="spli(getInforli.InApplyHospitalFiles)[index]" target="_self">{{filesName}}</a>
          
        </div>
      </div>

    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">附件说明</label><div class="cus_content" style="width:60%!important;">{{getInforli.InApplyHospitalFilesRemark}}</div>
    </div>
    <!-- <el-button type="primary" class="priGoBack" @click="closeTab">返回</el-button> -->
    <div v-if="type=='toSelf'"  style="bottom:0;">
        <el-button type="primary" class="priGoBack priAgree" @click="dialogVisibleShow" style="left:115px;" v-if="getInforli.HospitalizedState==1 && getInforli.AppointmentHospitalId == loginID">同意</el-button>
        <el-button type="primary" class="priGoBack priRefuse" style="left:200px;"  @click="refusedialogShow" v-if="getInforli.HospitalizedState==1 && getInforli.AppointmentHospitalId == loginID">拒绝</el-button>
    </div>
    <div v-if="type=='self'" >
      <!-- <el-button type="primary" class="priGoBack" @click="closeTab">返回</el-button> -->
      <el-button type="primary" class="priGoBack"  style="left:115px;"  v-if="getInforli.HospitalizedState==1 || getInforli.HospitalizedState == 2|| getInforli.HospitalizedState == 9" @click="openDetail">打印转诊单</el-button>
    </div>
    
    <el-dialog :visible.sync="imgShow" class="imgshow">
      <img :src=imgUrl alt="">
    </el-dialog>
    
    <!--同意-->
    <el-dialog title="同意" class="agreeDia" :visible.sync="dialogVisible"  width="30%" >
      <div>
          <span><span class="red">*</span>安排入住日期</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-d"
            value-format="yyyy-MM-dd"  @change="datechange" class="dateinput" >
          </el-date-picker>

      </div>
      <div class="margintop20">
        <span><span  class="red">*</span>安排转入科室</span>
        <el-select v-model="value"  placeholder="请选择" class="dateinput" >
          <el-option v-for="item in options" @click.native="depp(item)" :key="item.Id"  :label="item.SectionName" :value="item.Id">
          </el-option>
  </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogCom">确 定</el-button>
      </span>
    </el-dialog>

    <!--拒绝-->
    <el-dialog title="拒绝原因" :visible.sync="refusedialog" width="500px" :before-close="handleClose">
      <section>
        <span>拒绝原因</span>
        <el-input type="textarea" :rows="2" placeholder="请输入拒绝原因" v-model="text" class="margintop10">
        </el-input>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refusedialog = false">取 消</el-button>
        <el-button type="primary" @click="refuseCom">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// const thisToken = '103dadc14a954119d9ef2b68d38f854264f';
const url = window.location.href.split('?')[1];
const thisToken=url.split('&')[0].split('=')[1];
const thistransferId=url.split('&')[1].split('=')[1];
const thisType=url.split('&')[2].split('=')[1];
const hosType=url.split('&')[3].split('=')[1];

import { apiurl,linkUrl } from '../../service/api.js';
import axios from 'axios';
import axion from '@/util/http_url.js'
export default {
    data() {
      return {
        getInfor:'',
        value1:'',
        value2:'',
        value:'',
        Id:'',
        token:thisToken,
        imgShow:false,
        imgUrl:'',
        type:thisType,
        hostype:hosType,
        GetLogin:{
          token:thisToken,
        },
        transferId:thistransferId,
        dialogVisible: false,
        options:[],
        GetSection:{
          token:thisToken,
          hospitalID:'',
          isGroup:''
        },
        text:'',
        loginID:'',
        refusedialog:false,
        refuseOrder:{
          token:thisToken,
          transferId:thistransferId,
          reason:''
        }
      }
    },
    mounted() {
      this.GetLoginInfo()
      var self = this;
      this.getInfor=this.getInforli;
      setTimeout(function(){

        self.value1=self.hopda;
        self.value=self.hopDe;
        self.Id=self.getInforli.AppointmentSectionId;
        // console.log(self.getInforli)
        // console.log(self.getInforli.ApplyDoctorId)
        // console.log(self.getInforli.InApplyHospitalFiles)
      },100)
  },
    methods: {
      sub(str){
        return str.substring(str.lastIndexOf('/')+1,str.length)
      },
      depp(list){
        console.log(list)
        this.Id=list.Id;
        this.value=list.SectionName;
      },
      fileJudge(fileName){
        var filena=fileName.split('.')[1];
        if(filena=='jpeg' || filena == 'png' || filena == 'jpg'){
          return true;
        }else{
          return false;
        }
      },
      openImg(str){
        this.imgShow=true;
        this.imgUrl=str;
      },
      removeOther(str){
        var st=str.split(',');
        var arr=[];
        st.forEach(function(item){
          if(item=='其他'){

          }else{
            arr.push(item)
          }
        })
        var str=arr.join('，')
         return str;
      },
      jiequ(str){
        return str.split(' ')[0];
      },
      spli(str){
        return str.split(',');
      },
      timetrans(date1){
          date1=Number(date1.slice(6,-2));
          var date = new Date(date1);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
          var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
          var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
          var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
          return Y+M+D;
      },
      closeTab(){
        var param = {};
        param.method = "closeThisTab";
        window.parent.postMessage(JSON.stringify(param), '*');
        
        param.method = "addTab";
        if(this.hostype=='1'){
          if(this.type=='self'){
            param.title = "住院转诊列表 （转出）";
          }else{
            param.title = "住院转诊列表 （转入）";
          }
          param.url = linkUrl + 'referral/referralList?token=' + this.token + '&type=' + this.type+'&ModelUrl='+this.$route.query.ModelUrl;
        }else{
          if(this.type=='self'){
            param.title = "社区转诊列表 （转出）";
            param.url = linkUrl + '/sqzhuanzhen/turnOut?token=' + this.token+'&ModelUrl='+this.$route.query.ModelUrl;

          }else{
            param.title = "社区转诊列表 （转入）";
            param.url = linkUrl + '/sqzhuanzhen/changeInTo?token=' + this.token+'&ModelUrl='+this.$route.query.ModelUrl;
          }
        }
        window.parent.postMessage(JSON.stringify(param), '*');
      },
      GetSectionByHospitalID() {
        this.GetSection.hospitalID=this.loginID;
        axion.GetSectionByHospitalID(this.GetSection).then(d => {
            this.options=d.data.rows;
        })
      },
      GetLoginInfo(){
        axion.GetLoginInfo(this.GetLogin).then(d => {
            this.loginID=d.data.extra.HospitalInfo.HosptialID;
        })
      },
      datechange(val){
        this.value1=val;
      },
      dialogVisibleShow(){
        this.value = this.hopDe;
        this.value1 = this.hopda;
        this.dialogVisible=true;
        this.GetSectionByHospitalID()
      },
      dialogCom(){
        if(this.value1==''){
          this.$message.error('请输入日期');
          return;
        }
        if(this.value==''){
          this.$message.error('请选择科室');
          return;
        }
          var condition='';
          condition = {
            "SureHospitalzedDate":this.value1,
            "SureAppointmentSectionName": this.value,
            "SureAppointmentSectionId": this.Id
          }
          condition = JSON.stringify(condition);
          axion.AgreeOrder(thisToken, this.transferId, condition).then(d => {
              this.$message({
                message: '审核成功',
                type: 'success'
              });
              this.dialogVisible=false;
              this.closeTab()
          })
      },
      refusedialogShow(){
        this.refusedialog=true;
      },
      refuseCom(){
        if(this.text.trim()==''){
          this.$message.error('请填写拒绝原因');
          return;
        }
        if(this.text.trim().length>50){
          this.$message.error('原因不能超过50个字');
          return;
        }
        this.refuseOrder.reason=this.text;
        axion.RefuseOrder(this.refuseOrder).then(d => {
          if(d.data.code==200){
            this.$message({
              message: '拒绝成功',
              type: 'success',
            });
            this.refusedialog=false;
            this.closeTab()
          }else{
            this.$message({
              message: '拒绝失败，请重新填写',
            });
          }
          
        })
      },
      handleClose(done) {
        done();
      },
      openDetail(){
        var param = {};
        param.method = "addTab";
        param.title = '打印转诊单详情';
        param.url = linkUrl + 'zhuanZhenInfo/zhuanzhenZhuyuan?token=' + thisToken+'&transferId='+thistransferId+'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');
      }
    },
	props:['getInforli','inApplyHospital','hopda','hopDe']
}
</script>