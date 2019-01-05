<template>
  <div class="ts-content wrapper-datepicker newcss nowidth">
    <main class="clearfix main-wrap" style="padding:0!important;">
      <div class="clearfix">
        <el-tabs v-model="currentTab" type="border-card" @tab-click="tabClick" style="height:100%;">
          <el-tab-pane label="个人信息及签约记录" name="infor">
            <div class="treatment_content clearfix flex3">
              <div class="x_title clearfix">个人信息</div> 
              <el-button type="primary" class="editbtn" @click="editbtn" v-if='checkpage'>编辑</el-button>  
              <el-button type="primary" class="editbtn" @click="preservbtn" v-if='!checkpage'>保存</el-button>            
              <Infor v-if='checkpage' :getInforli = 'getInforlist' element-loading-text="数据加载中" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" ></Infor>
              <EditInfor v-if='!checkpage' ref='preservData' :getEditInfor = 'getInforlist'></EditInfor>
            </div>
          </el-tab-pane>
          <el-tab-pane label="服务记录" name="servicerecord">
            <SeverRecord @click="seedbtn"></SeverRecord>
            <MessageMod :msg='msgdata' @closeX="closeX"></MessageMod>
            <iframe :src="servicereUrl" width="99%" height="99%" style="border:none;margin-top:10px;"></iframe>
          </el-tab-pane>
          <el-tab-pane label="监测记录"  name="monitorTab">
            <iframe :src="monitorUrl" width="99%" height="99%" style="border:none;"></iframe>
          </el-tab-pane>

          <el-tab-pane label="区健康记录"  name="areaMonitorTab">
            <iframe :src="areaMonitorUrl" width="99%" height="99%" style="border:none;" v-if='area=="330104"'></iframe>
          </el-tab-pane>

          <el-tab-pane label="市健康记录"  name="cityMonitorTab">
            <iframe :src="cityMonitorUrl" width="99%" height="99%" style="border:none;" v-if='area=="330104"'></iframe>
          </el-tab-pane>

          <el-tab-pane label="转诊记录"  name="referralRecordTab"> 
            <router-view></router-view>
          </el-tab-pane>

          <el-tab-pane label="随访记录"  name="flupTab">
            <iframe :src="flupUrl" width="99%" height="99%" style="border:none;"></iframe>
          </el-tab-pane>

        </el-tabs>
      </div>
    </main>
  </div>
</template>

<script>
import "../../assets/sass/zhuanzheninfo.scss";
import { apiurl,linkUrl,iframeUrl,iframeUrl1 } from '../../service/api.js';
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
import Infor from './componentinformation.vue'
import EditInfor from './componentEditInfo.vue'
import SeverRecord from '../severmessge/severRecord.vue'
import MessageMod from '../severmessge/messageMod.vue'
import qs from 'qs';
export default {
  data() {
    return {
      servicereUrl: '',//服务记录
      areaMonitorUrl: '',//区健康监测
      cityMonitorUrl: '',//市健康监测
      monitorUrl: '',    //监测记录
      flupUrl: '',       //随访记录
      src: '',
      currentTab:'infor',
      getInforlist:'',
      bingInfolist:[],
      turnlist:[],
      inApplyHospitalFiles:[],
      Inspectlist:[],
      checklist:[],
      docAdvicelist:[],
      operationlist:[],
      checkTitle:[],
      discharge:'',
      inforDetail:'',
      examDetail:'',
      checkDetail:'',
      docAdviceDetail:'',
      operationDetail:'',
      checkpage: true,
      msgdata: {
        msgMod: false,
        boxshow: true,
        typeMsg: 1,
        patientId:0,
        parDate:{      //群发需要的传参
            registerTime:"",
            servicePackId:"",
            servicePackItemId:"",
            remainTimes:'',
            keyWords:"",
            doctorId:""
        },
        titleText:""
      },
      loading: true,
      registerId: this.$route.query.registerId
    }
  },
  mounted() {      
    this.getInforliGet();   
  },
  components:{
    'Infor':Infor,
    'EditInfor':EditInfor,
    'SeverRecord':SeverRecord,
    'MessageMod':MessageMod
  },
  computed: {
    ...mapGetters(['token','hosptialid','province','city','area','doctorid','power'])
  },
  methods: {
    editbtn() {
      this.checkpage = false;
    },
    //保存
    preservbtn() {
      this.loading = true;
      let model = this.$refs.preservData.editPersonalInfo;
      //判断人群分类是否为空
      var pdPatientSortCode = true;
      if(model.PatientSortCode == null){
        pdPatientSortCode = false
      }else if(model.PatientSortCode.length == 0){
        pdPatientSortCode = false
      }
      if(model.PatientName && model.PatientCardId && model.PatientPhone && model.MedicalCardType && model.MedicalType && model.Provincevalue && model.Cityvalue && model.Areavalue && pdPatientSortCode){
        var data = {
          RegisterId: this.$route.query.registerId,
          Id: this.$route.query.patientId,
          PatientName: model.PatientName,
          PatientCardId: model.PatientCardId,
          PatientTelePhone: model.PatientTelePhone,
          Province: model.ProvinceChinese,
          ProvinceCode: model.Provincevalue,
          City: model.CityChinese,
          CityCode: model.Cityvalue,
          Area: model.AreaChinese,
          AreaCode: model.Areavalue,
          DetailedAddress:model.DetailedAddress,
          PatientPhone: model.PatientPhone,
          EmergencyPhone: model.EmergencyPhone,
          ContactName: model.ContactName,
          ContactRelation: model.ContactRelationValue,
          MedicalCardType:model.MedicalCardType,
          MedicalCardId: model.MedicalCardId,
          PatientSort: typeof(model.PatientSort) == 'string' ? model.PatientSort : model.PatientSort.join(','),//人群分类
          PatientSortCode: typeof(model.PatientSortCode) == 'string' ? model.PatientSortCode : model.PatientSortCode.join(','),//人群分类code
          DiseaseLabel: typeof(model.DiseaseLabel) == 'string' ? model.DiseaseLabel : model.DiseaseLabel.join(','),//疾病分类
          DiseaseLabelCode: typeof(model.DiseaseLabelCode) == 'string' ? model.DiseaseLabelCode : model.DiseaseLabelCode.join(','),//疾病分类code
          EasyContactWay: typeof(model.EasyContactWayValue) == 'string' ? model.EasyContactWayValue : model.EasyContactWayValue.join(','),
          EasyContactWayCode: typeof(model.EasyContactWayCode) == 'string' ? model.EasyContactWayCode : model.EasyContactWayCode.join(','),
          MedicalType: model.MedicalType,
          IsFloatPopulation: model.IsFloatPopulation
        }
        axios.post(apiurl.EditPatientArchives,data
        ,{
            headers: {
              'token': this.token
            }
          }).then( (res) =>{
          if(res.data.suc == true){
            this.checkpage = true;
            console.log(res,'resres')
            this.getInforliGet();
            this.EasyContactWayChina();
          } else {
            this.$alert(res.data.mes, '提示', )
          }
        }).catch((error) => {
          console.log(error);
        }); 
      }else{
        this.$alert('请对有错误提示的信息进行修改', '提示', )
      }
    },
    tabClick(tab, event){
      // patient_name 姓名,  age 年龄,  patient_sex 性别, phone 电话,  patient_type 类型, id_no 身份证，token,
			if (tab.name == 'infor'){
        this.getInforliGet();

			}else if(tab.name == 'servicerecord'){
        this.servicereUrl = iframeUrl1 + 'UMS/ServicePack/ServicePackManage?registerId=' + this.registerId;
      }else if(tab.name == 'monitorTab'){
        this.monitorUrl = document.location.protocol + '//jkjcstg.zwjk.com/Telemonitor/TmIndex2?token=' + this.token + '&patient_name=' + this.getInforlist.PatientName + '&age=' + this.getInforlist.PatientAge + '&patient_sex=' + (this.getInforlist.PatientSex == 1 ? '男' : '女') + '&phone=' + this.getInforlist.PatientPhone + '&id_no=' + this.getInforlist.PatientCardId + '&patient_type=' + this.getInforlist.PatientLabel
      }else if(tab.name == 'areaMonitorTab'){
        if(this.area != "330104"){
          this.$alert('还未对接健康档案！', '提示', )
        }
        this.areaMonitorUrl = iframeUrl + 'ehrview/frame.action?zxwyh=' + this.getInforlist.PatientCardId;   
      }else if(tab.name == 'cityMonitorTab'){
        if(this.area != "330104"){
          this.$alert('还未对接健康档案！', '提示', )
        }
        this.cityMonitorUrl = document.location.protocol + '//192.168.0.169:92/api/Zwjk/GetHelthURLBytoken?token=' + this.token + '&patientName=' + this.getInforlist.PatientName + '&patientIdNo=' + this.getInforlist.PatientCardId + '&hospitalID=' + this.hosptialid;
      }else if(tab.name == 'referralRecordTab'){
        this.$router.replace(
          {
            name: 'ReferralRecord',
            query: {
              patientId: this.$route.query.patientId,
              ModelUrl: this.$route.query.ModelUrl,
              cardId: this.$route.query.cardId,
              registerId: this.$route.query.registerId
            }
          }
        )        
      }else if(tab.name == 'flupTab'){
        if(this.area == '330104'){
          this.flupUrl = document.location.protocol + '//nwsfzx.zwjk.com:8000/ZjWeb/FlupHistory?idNo=' + this.getInforlist.PatientCardId + '&token=' + this.token;
        }else{
          this.flupUrl = 'https://sfstg.zwjk.com/FlupCenter/PersonalFlupRecord?idno=' + this.getInforlist.PatientCardId + '&token=' + this.token;
        }
      }
    },
    seedbtn() {
      this.msgdata.patientId = this.$route.query.patientId;
      this.msgdata.msgMod = true;
      this.msgdata.boxshow=true;
    },
    closeX(data) {
      this.msgdata.msgMod = data;
    },
    // 个人信息数据
    getInforliGet() {
      axios.get(apiurl.GetPatientArchivesInfo, {
        params:{
          patientId:this.$route.query.registerId,
          token: this.token
        },            
      }).then( (res) =>{
        if(res.data.suc == true){
          this.loading = false;
          this.getInforlist=res.data.extra;
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    },
    // 方便联系方式
    EasyContactWayChina() { 
      this.EasyContactWay = [];
      axios.get(apiurl.GetLabelList, {
        params:{
          token: this.token,
          LabelTypeCode: 4
        },            
      }).then( (res) =>{
        if(res.status == 200){
          res.data.rows.forEach((v,i) => {
            if(this.getInforli.EasyContactWay){
              this.getInforli.EasyContactWay.split(',').forEach((v1,i1) => {
                if(v1 == v.value){
                  this.EasyContactWay.push(v.name);
                }
              })
            }
            
          })          
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
      
    },    
  },
};
</script>
<style lang='scss'>
.iframe {
  width: 100%;
  height: 600px;
  border: none;
}
</style>
