<template>
  <div class="ts-content wrapper-datepicker newcss nowidth">
      <main class="clearfix main-wrap" style="padding:0!important;">
        <div class="clearfix">
          <el-tabs   v-model="currentTab" type="card" @tab-click="tabClick">

            <el-tab-pane label="转诊详情" name="detail" v-if="hosType=='1'">
                <Detail :getInforli="getInforlist" :hopda="hopdate" :hopDe="hopDept" :inApplyHospital="inApplyHospitalFiles"></Detail>
            </el-tab-pane>
            <el-tab-pane label="转诊详情" name="detailCom"  v-if="hosType=='2'">
                <DetailCom  :turnli="turnlist"></DetailCom>
            </el-tab-pane>
            <el-tab-pane label="病程信息"  name="infor">
              <Infor  @clickDetail="clickDetails" :bingInfoli="bingInfolist" :inforDetail="inforDetail"></Infor>
            </el-tab-pane>
 
            <el-tab-pane label="检查单"  name="exam">
              <Exam   @clickExam="detailExams"  :Inspectli="Inspectlist"  :examDetail="examDetail"></Exam>
            </el-tab-pane>

            <el-tab-pane label="化验单"  name="check">
              <Check   @clickCheck="detailChecks"  :checkli="checklist" :checkDetail="checkDetail" :checkTitle="checkTitle"></Check>
            </el-tab-pane>

            <el-tab-pane label="医嘱记录"  name="docadvice"> 
              <DocAdvice  @clickDocAdvice="detailDocAdvices"  :docAdviceli="docAdvicelist" :docAdviceDetail="docAdviceDetail"></DocAdvice>
            </el-tab-pane>

            <el-tab-pane label="手术记录"  name="operation">
              <Operation   @clickOperation="detailOperations"  :operationli="operationlist" :operationDetail="operationDetail"></Operation>
            </el-tab-pane>

            <el-tab-pane label="出院小结"  name="discharge">
              <Discharge  :discharge="discharge" ></Discharge>
            </el-tab-pane>

          </el-tabs>
        </div>
      </main>
  </div>
</template>

<script>
import "../../assets/sass/zhuanzheninfo.scss";
import axion from '@/util/http_url.js'
import { apiurl, appid } from "../../service/api.js";
import Detail from './componentDetail'
import DetailCom from './componentDetailCom'
import Infor from './componentInfor'
import Check from './componentCheck'
import Exam from './componentExam'
import DocAdvice from './componentDocAdvice'
import Discharge from './componentDischarge'
import Operation from './componentOperation'
const url = window.location.href.split('?')[1];
const thisToken=url.split('&')[0].split('=')[1];
const thistransferId=url.split('&')[1].split('=')[1];
const thisType=url.split('&')[2].split('=')[1];
const hosType=url.split('&')[3].split('=')[1];
export default {
  data() {
    return {
        currentTab:'detail',
        type:thisType,
        hosType:hosType,
        hopdate:'',
        hopDept:'',
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
        getInfor:{
            token:thisToken,
            transferId:thistransferId,
        },
        turnDetail:{
          token:thisToken,
          ttb_id:thistransferId
        },
        getCourceList:{
          token:thisToken,
          TransferId:thistransferId,
          page:'',
          rows:'99'
        },
        GetInspectList:{
          token:thisToken,
          TransferId:thistransferId,
          page:'',
          rows:'99'
        },
        GetHospitalizedList:{
           token:thisToken,
            TransferId:thistransferId,
            page:'',
            rows:'99'
        },
        GetDocAdviceList:{
            token:thisToken,
            TransferId:thistransferId,
            page:'',
            rows:'99'
        },
        GetOperationList:{
            token:thisToken,
            TransferId:thistransferId,
            page:'',
            rows:'99'
        },
        Getdischarge:{
            token:thisToken,
            TransferId:thistransferId,
        },
        getCourceDetail:{
          token:thisToken,
          HospitalizedCourceInformationId:''          
        },
        GetInspectDetail:{
          token:thisToken,
          HospitalizedInspectRecordId:''      
        },
        GetHospitalizedDetail:{
          token:thisToken,
          HospitalizedLaboratoryRecordId:'',
          page:'',
          rows:'99'
        },
        GetDocAdviceDetail:{
          token:thisToken,
          HospitalizedDoctorAdviceId:'' 
        },
        GetOperationDetail:{
          token:thisToken,
          HospitalizedOperationRecordId:''      
        },
    }
  },
  components:{
    'Detail':Detail,
    'DetailCom':DetailCom,
    'Infor':Infor,
    'Check':Check,
    'Exam':Exam,
    'DocAdvice':DocAdvice,
    'Operation':Operation,
    'Discharge':Discharge
  },
  methods: {
    tabClick(tab, event){
      this.currentTab = tab.name;
			if (tab.name == 'infor'){
        this.GetCourceInformationList()
			}else if(tab.name == 'exam'){
        this.GetInspectRecordList()
      }else if(tab.name == 'check'){
        this.GetHospitalizedLaboratoryRecordList()
      }else if(tab.name == 'docadvice'){
        this.GetHospitalizedDoctorAdviceList()
      }else if(tab.name == 'operation'){
        this.GetHospitalizedOperationRecordList()
      }else if(tab.name == 'discharge'){
        this.GetDischarge()
      }else if(tab.name == 'detail'){
        this.GetTranferInfo()
      }else if(tab.name == 'detailCom'){
        this.GetTurnDownDetail()
      }
    },
    //诊断详情
    GetTranferInfo() {
      axion.GetTranferInfo(this.getInfor).then(d => {
        console.log(d,'a')
        this.getInforlist=d.data.rows;
        this.inApplyHospitalFiles=this.getInforlist.InApplyHospitalFiles.split(',');
        this.hopdate=this.getInforlist.AppointmentPlanDate;
        this.hopDept=this.getInforlist.AppointmentSectionName;
      })
    },
     GetTurnDownDetail() {
      axion.GetTurnDownDetail(this.turnDetail).then(d => {
        this.turnlist=d.data.extra;
        
      })
    },
    // 病程记录列表
    GetCourceInformationList() {
      axion.GetCourceInformationList(this.getCourceList).then(d => {
        // console.log(d.data.rows)
        this.bingInfolist=d.data.rows;
        this.getCourceDetail.HospitalizedCourceInformationId=d.data.rows[0].Id;
        this.GetCourceInformationDetail()
      })
    },
    // 病程记录详情
    GetCourceInformationDetail() {
      axion.GetCourceInformationDetail(this.getCourceDetail).then(d => {
        this.inforDetail=d.data.extra;
      })
    },

    //点击切换病程记录详情
    clickDetails(id){
      console.log(id)
      this.getCourceDetail.HospitalizedCourceInformationId=id;
      this.GetCourceInformationDetail()
    },

    // 检查记录列表
    GetInspectRecordList() {
      axion.GetInspectRecordList(this.GetInspectList).then(d => {
        // console.log(d.data.rows)
        this.Inspectlist=d.data.rows;
        this.GetInspectDetail.HospitalizedInspectRecordId=d.data.rows[0].Id;
        this.GetInspectRecordDetail()
      })
    },
     // 检查记录详情
    GetInspectRecordDetail() {
      axion.GetInspectRecordDetail(this.GetInspectDetail).then(d => {
        this.examDetail=d.data.extra;
      })
    },

    //点击切换检查记录详情
    detailExams(id){
      console.log(id)
      this.GetInspectDetail.HospitalizedInspectRecordId=id;
      this.GetInspectRecordDetail()
    },

    // 化验单记录列表
    GetHospitalizedLaboratoryRecordList() {
      axion.GetHospitalizedLaboratoryRecordList(this.GetHospitalizedList).then(d => {
        // console.log(d.data.rows)
        this.checklist=d.data.rows;
        this.checkTitle=d.data.rows[0];
        this.GetHospitalizedDetail.HospitalizedLaboratoryRecordId=d.data.rows[0].Id;
        this.GetHospitalizedLaboratoryRecordDetailList(d.data.rows[0].Id);
      })
    },
     // 化验单记录详情
    GetHospitalizedLaboratoryRecordDetailList(id) {
      axion.GetHospitalizedLaboratoryRecordDetailList(this.GetHospitalizedDetail).then(d => {
        console.log(d.data.rows)
        this.checkDetail=d.data.rows;
      })
    },

    //点击切换化验单记录详情
    detailChecks(bing){
      this.checkTitle=bing;
      this.GetHospitalizedDetail.HospitalizedLaboratoryRecordId=bing.Id;
      this.GetHospitalizedLaboratoryRecordDetailList(bing.Id)
    },


    //医嘱记录列表
    GetHospitalizedDoctorAdviceList() {
      axion.GetHospitalizedDoctorAdviceList(this.GetDocAdviceList).then(d => {
        // console.log(d.data.rows)
        this.docAdvicelist=d.data.rows;
        this.GetDocAdviceDetail.HospitalizedDoctorAdviceId=d.data.rows[0].Id;
        this.GetHospitalizedDoctorAdviceDetail()
      })
    },
     // 医嘱记录详情
    GetHospitalizedDoctorAdviceDetail() {
      axion.GetHospitalizedDoctorAdviceDetail(this.GetDocAdviceDetail).then(d => {
        this.docAdviceDetail=d.data.extra;
      })
    },

    //点击切换医嘱记录详情
    detailDocAdvices(id){
      console.log(id)
      this.GetDocAdviceDetail.HospitalizedDoctorAdviceId=id;
      this.GetHospitalizedDoctorAdviceDetail()
    },


    //手术记录列表
    GetHospitalizedOperationRecordList() {
      axion.GetHospitalizedOperationRecordList(this.GetOperationList).then(d => {
        // console.log(d.data.rows)
        this.operationlist=d.data.rows;
        this.GetOperationDetail.HospitalizedOperationRecordId=d.data.rows[0].Id;
        this.GetHospitalizedOperationRecordDetail()
      })
    },
     // 手术记录详情
    GetHospitalizedOperationRecordDetail() {
      axion.GetHospitalizedOperationRecordDetail(this.GetOperationDetail).then(d => {
        this.operationDetail=d.data.extra;
      })
    },

    //点击切换手术记录详情
    detailOperations(id){
      this.GetOperationDetail.HospitalizedOperationRecordId=id;
      this.GetHospitalizedOperationRecordDetail()
    },
    //出院小结
    GetDischarge() {
      axion.GetDischarge(this.Getdischarge).then(d => {
        this.discharge=d.data.extra;
      })
    },
  },
  mounted() {
    if(hosType=='2'){
      this.currentTab='detailCom'
      this.GetTurnDownDetail()
    }else{
      this.currentTab='detail'
      this.GetTranferInfo()
    }
    
  }
};
</script>
