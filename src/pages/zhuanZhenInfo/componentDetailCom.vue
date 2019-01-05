<template>
  <div class="detailBox">
    <div class="treatment_state clearfix">
        <div class="cus_row clearfix">
          <label class="cus_label">转诊状态</label><div class="cus_content">{{turnli.ReferralModel.AppointmentStateText}}</div>
        </div>
        <div class="cus_row clearfix" v-if="turnli.ReferralModel.AppointmentState==3">
            <label class="cus_label">取消原因</label>
            <div class="cus_content" style="width:60%!important;">{{turnli.ReferralModel.CancelReason}}</div>
        </div>
        <div class="cus_row clearfix" v-if="turnli.ReferralModel.AppointmentState==2">
            <label class="cus_label">拒绝原因</label>
            <div class="cus_content" style="width:60%!important;">{{turnli.ReferralModel.RefuseReason}}</div>
        </div>
    </div>
    <div class="treatment_content clearfix flex3">
        <div class="x_title clearfix">转诊信息</div>
        <!--<div class="custom_width clearfix"></div>-->
        <label class="cus_label">转诊编号</label>
        <div class="cus_content">{{turnli.ReferralModel.TransferNo}}</div>
        <label class="cus_label">转入医院</label>
        <div class="cus_content">{{turnli.ReferralModel.ReferralHospitalName}}</div>
        <label class="cus_label">转入医院医生</label>
        <div class="cus_content">{{turnli.ReferralModel.ReferralDoctorName}}</div>
         
    </div>
    <div class="treatment_content  clearfix flex3">
          <label class="cus_label">转入医生手机号码</label>
         <div class="cus_content">{{turnli.ReferralModel.ReferralDoctorPhone}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">转诊原因</label>
         <div class="cus_content" style="width:500px!important;">{{turnli.ReferralModel.ReferralReason}}</div>
    </div>
    

    <div class="treatment_content clearfix flex3">
        <div class="x_title clearfix">病人基本信息</div>
        <label class="cus_label">病人姓名</label>
         <div class="cus_content">{{turnli.PatientModel.PatientName}}</div>
          <label class="cus_label">病人性别</label>
         <div class="cus_content">{{turnli.PatientModel.PatientSex=='0'?'女':'男'}}</div>
         <label class="cus_label">病人年龄</label>
         <div class="cus_content">{{turnli.PatientModel.PatientAge}}</div>
    </div>
    <div class="treatment_content clearfix flex3">
         <label class="cus_label">病人出生日期</label>
         <div class="cus_content">{{turnli.PatientModel.PatientBirth}}</div>
         <label class="cus_label">病人身份证号</label>
         <div class="cus_content">{{turnli.PatientModel.PatientCardId}}</div>
          <label class="cus_label">病人手机号码</label>
          <div class="cus_content">{{turnli.PatientModel.PatientPhone}}</div>
    </div>
    <div class="treatment_content clearfix flex3">
         <label class="cus_label">备用联系人</label>
         <div class="cus_content">{{turnli.PatientModel.ContactName}}</div>
         <label class="cus_label">备用联系人手机号码</label>
         <div class="cus_content">{{turnli.PatientModel.EmergencyPhone}}</div>
          <label class="cus_label">就诊卡ID</label>
          <div class="cus_content">{{turnli.PatientModel.MedicalCard}}</div>
    </div>
    <div class="treatment_content clearfix flex3">
         <label class="cus_label">医保报销类别</label>
         <div class="cus_content">{{turnli.PatientModel.MedicalTypeText}}</div>
         <label class="cus_label">医保卡类型</label>
         <div class="cus_content">{{turnli.PatientModel.MedicalCardTypeText}}</div>
         <label class="cus_label">医保卡卡号</label>
         <div class="cus_content">{{turnli.PatientModel.MedicalCardId}}</div>
         
    </div>
    <div class="treatment_content clearfix flex3">
        <label class="cus_label">病人身份职业</label>
         <div class="cus_content">{{turnli.PatientModel.PatientProfession}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">病人居住地址</label><div class="cus_content" style="width:60%!important;">{{turnli.PatientModel.Province}}{{turnli.PatientModel.City}}{{turnli.PatientModel.Area}}{{turnli.PatientModel.DetailedAddress}}</div>
    </div>


    <div class="treatment_content clearfix flex3">
        <div class="x_title clearfix">病人病情信息</div>
        <label class="cus_label">转出科室</label>
         <div class="cus_content">{{turnli.IllnessModel.SectionName}}</div>
          <label class="cus_label">转出医院联系人</label>
         <div class="cus_content">{{turnli.IllnessModel.DoctorName}}</div>
         <label class="cus_label">转出医院联系人手机号码</label>
         <div class="cus_content">{{turnli.IllnessModel.DoctorPhone}}</div>
    </div>
    <div class="treatment_content clearfix flex3">
            <label class="cus_label">入院日期</label>
            <div class="cus_content">{{turnli.IllnessModel.DateOfAdmission}}</div>
              <label class="cus_label">出院日期</label>
            <div class="cus_content">{{turnli.IllnessModel.DateOfDischarge}}</div>
            
        </div>
    
    <div class="treatment_content clearfix">
         <label class="cus_label">出院诊断</label><div class="cus_content" style="width:60%!important;">{{turnli.IllnessModel.DischargeDiagnosisDiseaseText}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">入院情况</label><div class="cus_content" style="width:60%!important;">{{turnli.IllnessModel.Admission}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">院内检查</label><div class="cus_content" style="width:60%!important;">{{turnli.IllnessModel.HospitalExamination}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">治疗过程</label><div class="cus_content" style="width:60%!important;">{{turnli.IllnessModel.TreatmentProcess}}</div>
    </div>
    
    <div class="treatment_content clearfix">
         <label class="cus_label">出院情况</label><div class="cus_content" style="width:60%!important;">{{turnli.IllnessModel.DischargeRecord}}</div>
    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">出院医嘱</label><div class="cus_content" style="width:60%!important;">{{turnli.IllnessModel.DischargeOrder}}</div>
    </div>
    
    <div class="treatment_content clearfix">
         <label class="cus_label">出院去向</label><div class="cus_content" style="width:60%!important;">{{turnli.IllnessModel.DischargeWhereabouts}}</div>
    </div>
    <div class="treatment_content clearfix">
      <label class="cus_label floatLeft">附件</label>
      <div v-if="turnli.IllnessModel.FileName">
        <div class="border cus_content" v-for="(files,index) in turnli.IllnessModel.FileName">
          <a :href="turnli.IllnessModel.FileUrl[index]" target="_self">{{files}}</a>
        </div>
      </div>

    </div>
    <div class="treatment_content clearfix">
         <label class="cus_label">附件说明</label><div class="cus_content" style="width:60%!important;">{{turnli.IllnessModel.AnnexDescription}}</div>
    </div>
    <!-- <el-button type="primary" class="priGoBack" @click="closeTab">返回</el-button> -->
    <div v-if="type=='toSelf'"  style="bottom:0;">
        <el-button type="primary" class="priGoBack priAgree" @click="dialogVisibleShow" style="left:115px;" v-if="turnli.ReferralModel.AppointmentState==0 && turnli.ReferralModel.ReferralHospitalId==loginID">同意</el-button>
        <el-button type="primary" class="priGoBack priRefuse" @click="refusedialogShow" style="left:200px;" v-if="turnli.ReferralModel.AppointmentState==0 && turnli.ReferralModel.ReferralHospitalId==loginID">拒绝</el-button>
    </div>
    <div v-if="type=='self'">
      <el-button type="primary" class="priGoBack priAgree" @click="openDetail" style="left:115px;" v-if="turnli.ReferralModel.AppointmentState==0 || turnli.ReferralModel.AppointmentState==4">打印转诊单</el-button>
    </div>

    <!--同意-->
    <el-dialog title="分配医生" class="agreeDia" :visible.sync="dialogVisible"  width="30%" >
      <div>
          <span><span class="red">*</span>选择医生</span>
          <el-select v-model="value1"  placeholder="请选择" class="dateinput" >
                <el-option v-for="item in options" @click.native="depp(item)" :key="item.Id"  :label="item.Name" :value="item.Id">
                </el-option>
          </el-select>
          <p v-html="tishiyu" class="margintop10"></p>
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
        type:thisType,
        loginID:'',
        getInfor:'',
        value1:'',
        text:'',
        Id:'',
        token:thisToken,
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
        GetLogin:{
          token:thisToken,
        },
        Getdoclist:{
          token:thisToken,
          patientCardId:''
        },
        text:'',
        loginID:'',
        refusedialog:false,
        dialogVisible:false,
        RefuseTurn:{
          TransferTreatmentBaseId:thistransferId,
          RefuseReason:'',
          token:thisToken
        },
        options:[],
        tishiyu:'',
        docId:'',
        AgreeTurnDown:{
          TransferTreatmentBaseId: '',
          AppointmentDoctorId: '',
          token:thisToken
        }
      }
    },
    mounted() {
      this.GetLoginInfo()
  },
    methods: {
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
            param.url = linkUrl + 'sqzhuanzhen/turnOut?token=' + this.token+'&ModelUrl='+this.$route.query.ModelUrl;

          }else{
            param.title = "社区转诊列表 （转入）";
            param.url = linkUrl + 'sqzhuanzhen/changeInTo?token=' + this.token+'&ModelUrl='+this.$route.query.ModelUrl;
          }
        }
        window.parent.postMessage(JSON.stringify(param), '*');
      },
      GetLoginInfo(){
        axion.GetLoginInfo(this.GetLogin).then(d => {
            this.loginID=d.data.extra.HospitalInfo.HosptialID;
        })
      },
      handleClose(done) {
        done();
      },
      GetTreatmentDoctorList(){
        var self =this;
        axion.GetTreatmentDoctorList(this.Getdoclist).then(d => {
          this.options=d.data.rows;
          this.options.forEach(function(v,index){
            if(v.Selected==true){
              self.tishiyu=v.HintInformation;
              self.value1=v.Name;
              self.docId=v.Id;
            }
          })
        })
      },
      depp(list){
        console.log(list)
        this.docId=list.Id;
      },
      openDetail(){
        var param = {};
        param.method = "addTab";
        param.title = '打印转诊单详情';
        param.url = linkUrl + 'zhuanZhenInfo/zhuanzhenShequ?token=' + thisToken+'&transferId='+thistransferId+'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');
      },
      dialogVisibleShow(){
        this.dialogVisible=true;
        this.Getdoclist.patientCardId=this.turnli.PatientModel.PatientCardId;
        this.GetTreatmentDoctorList()
      },
      refusedialogShow(){
        this.refusedialog=true;
      },
      refuseCom(){
        if(this.text.trim()==''){
          this.$message.error('请填写拒绝原因');
          return;
        }
        this.RefuseTurn.RefuseReason=this.text;
        axion.RefuseTurnDownTreatment(this.RefuseTurn).then(d => {
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
      dialogCom(){
        if(this.value1==''){
            this.$message.error('请选择医生');
          return;
        }
        this.AgreeTurnDown.TransferTreatmentBaseId=thistransferId;
        this.AgreeTurnDown.AppointmentDoctorId=this.docId;
        axion.AgreeTurnDownTreatment(this.AgreeTurnDown).then(d => {
              this.$message({
                message: '分配成功',
                type: 'success'
              });
              this.dialogVisible=false;
              this.closeTab()
          })
      }
    },
	props:['turnli']
}
</script>