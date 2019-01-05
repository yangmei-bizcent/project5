<template>
  <div class="detailBox">
    <div class="treatment_content clearfix flex3">
      <!-- <div class="x_title clearfix">个人信息</div> -->
      <!-- <el-button type="primary" class="editbtn" @click="editbtn">编辑</el-button> -->
      <el-form v-model="personalInfo" label-width="120px" class="clearfix personak">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="姓名">{{getInforli.PatientName}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="性别">{{getInforli.PatientSex == 1 ? '男' :'女'}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="电话号码">{{getInforli.PatientPhone}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="年龄">{{getInforli.PatientAge}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="医保类型 ">{{getInforli.MedicalCardType}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="医保卡号">{{getInforli.MedicalCardId}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="身份证号码">{{getInforli.PatientCardId}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="医疗报销类型">{{MedicalType}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="人群分类">{{PatientSort.join(',')}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="紧急联系人">{{getInforli.ContactName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="方便联系方式">{{EasyContactWay.toString()}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="流动人口">{{IsFloatPopulation}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="紧急联系人电话">{{getInforli.EmergencyPhone}}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="常住地址">{{getInforli.Province + getInforli.City + getInforli.Area + getInforli.DetailedAddress}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="疾病分类">{{getInforli.DiseaseLabel}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="treatment_content clearfix flex3">
      <div class="x_title clearfix">签约记录</div>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row element-loading-text="数据加载中" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" slot="empty" :border='true'>
        <el-table-column prop="MedicalOrgName" label="签约社区" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="RegisteredDoctorName" label="签约医生" min-width="80"> </el-table-column>
        <el-table-column prop="OperationDate" label="签约日期 " min-width="60" show-overflow-tooltip></el-table-column>
        <el-table-column prop="IncomeOfPayServcie" label="签约周期" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="">{{scope.row.StartDate + '到' + scope.row.EndDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ServicePackName" label="签约服务包" min-width="115" show-overflow-tooltip> </el-table-column>
        <el-table-column label="签约状态" min-width="60">
          <template slot-scope="scope">
            <div v-if='scope.row.RegisteredState==1' class="tag_text2">签约成功
              <b></b>
            </div>
            <div v-if='scope.row.RegisteredState==2' class="tag_text1">撤销签约
              <b></b>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="treatment_content clearfix flex3">
      <div class="x_title clearfix">最近一月就诊信息</div>
      <el-table :data="medicalInfoTableData" stripe style="width: 100%" highlight-current-row element-loading-text="数据加载中" v-loading="medicalInfoloading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" slot="empty" :border='true'>
        <el-table-column prop="HospitalName" label="就诊医院" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="SectionName" label="就诊科室" min-width="105"> </el-table-column>
        <el-table-column prop="DoctorName" label="就诊医生" min-width="60"> </el-table-column>
        <el-table-column prop="VisitTime" label="就诊时间" min-width="90"> </el-table-column>
        <el-table-column prop="Diagnose" label="诊断疾病 " min-width="115"> </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </div>  
  </div>
</template>
<script>
import '../../assets/sass/addtransfer.scss';
import { apiurl,linkUrl } from '../../service/api.js';
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      personalInfo:{},
      tableData: [],
      medicalInfoTableData: [],
      currentPage:1,
      currentNum:10,
      total:null,
      loading: true,
      medicalInfoloading: true,
      MedicalType: '',//医保报销类型
      EasyContactWay: [],//方便联系人方式
      IsFloatPopulation: '',//是否流动人口
      PatientSort: []//人群分类
    }
  },
  mounted() {
    this.tableDataGet();
    setTimeout(() => {
      this.MedicalTypeChina();    
      this.EasyContactWayChina();
      this.IsFloatPopulationChina();
      this.tableDataMedicalInfo();
      this.GlPatientSort();
      console.log(this.getInforli,'this')
    },500)
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    //过滤慢性病
    GlPatientSort() {      
      this.getInforli.PatientSort.split(',').forEach((v,i) => {
        console.log(v,'vvvv+++')
        if(v != '慢性病'){
          this.PatientSort.push(v)
        }
      })
    },
    // 医疗报销类型
    MedicalTypeChina() {
      axios.get(apiurl.GetMedicalReimburseType, {
        params:{
        },            
      }).then( (res) =>{
        if(res.data.suc == true){
          res.data.rows.forEach((v,i) => {
            if(this.getInforli.MedicalType == v.id){
              this.MedicalType = v.text;
            }
          })
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
    // 流动人口
    IsFloatPopulationChina() {
      if(this.getInforli.IsFloatPopulation == 0) {
        this.IsFloatPopulation = '未知'
      }else if(this.getInforli.IsFloatPopulation == 1) {
        this.IsFloatPopulation = '是'
      }else if(this.getInforli.IsFloatPopulation == 2) {
        this.IsFloatPopulation = '否'
      }
    },
    editbtn() {
      console.log('bbbb')
      this.$emit('clickCheck')
    },
    // 签约记录
    tableDataGet() {
      axios.get(apiurl.GetPatientRegisterList, {
        params:{
          patientId:this.$route.query.patientId,
          token: this.token,
          page: this.currentPage,
          rows: this.currentNum
        },            
      }).then( (res) =>{
        if(res.data.suc == true){
          this.loading = false;
          this.tableData=res.data.rows;
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    },
    // 最近一月就诊信息
    tableDataMedicalInfo() {
      axios.get(apiurl.GetMedicalInfo, {
        params:{
          patientCardId:this.getInforli.PatientCardId,
          // patientCardId:'330125194811030420',
          token: this.token,
          page: this.currentPage,
          rows: this.currentNum
        },            
      }).then( (res) =>{
        console.log(res)
        if(res.data.suc == true){
          this.medicalInfoloading = false;
          this.medicalInfoTableData=res.data.rows;
          this.total = res.data.total;
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    },
    handleSizeChange(val) {
      this.currentNum = val;
      this.tableDataMedicalInfo();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableDataMedicalInfo();
      console.log(`当前页: ${val}`);
    },
  },
	props:['getInforli']
}
</script>
<style lang='scss'>
  .treatment_content{
    position: relative;
    .el-tooltip{ 
      width: auto!important;
    }
    .editbtn{
      position: absolute;
      right: 0;
      top: 5px;
    } 
    .personak{
      .el-form-item{
        margin-bottom: 0;
      }
    }    
    .tag_text1 b,
    .tag_text2 b,
    .tag_text3 b {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
      margin-left: 5px;
    }
    .tag_text1 b {
      background: #DB524B;
    }
    .tag_text2 b {
      background: #58B957;
    }
    .tag_text3 b {
      background: #455667;
    }
  }
</style>