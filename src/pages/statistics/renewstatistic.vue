<template>
  <div class="ts-content  wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" v-model="form" label-width="76px" class="clearfix">
        <el-row>
          <el-col :span="6">
            <el-form-item label="时间">
              <el-date-picker v-model="datavalue1" type="year" align="right" :picker-options="pickerOptions0" placeholder="选择日期范围" @change='dataChange'>
              </el-date-picker>
            </el-form-item>
          </el-col> 
          <el-col :span="2" class='marginleft30'>
            <el-form-item label="所属区域">              
            </el-form-item> 
          </el-col>  
          <el-col :span="2" class='marginright20'>
            <el-select v-model="provCode" placeholder="请选择" clearable @change='cityDate' :disabled='proedisabled'>
              <el-option v-for="item in typeprovince" :key="item.Code" :label="item.Name" :value="item.Code">
              </el-option>
            </el-select>
          </el-col>   
          <el-col :span="2" class='marginright20'>
            <el-select v-model="cityCode" placeholder="请选择" clearable @change='areaDate' :disabled='citydisabled'>
              <el-option v-for="item in typecity" :key="item.Code" :label="item.Name" :value="item.Code">
              </el-option>
            </el-select>
          </el-col>        
          <el-col :span="2" class='marginright20'>
            <el-select v-model="areaCode" placeholder="请选择" clearable @change='hospitalDate' :disabled='areadisabled'>
              <el-option v-for="item in typearea" :key="item.Code" :label="item.Name" :value="item.Code">
              </el-option>
            </el-select>
          </el-col>        
          <el-col :span="2" class='marginright20'>
            <el-select v-model="hospitalId" placeholder="请选择" clearable @change='doctorDate' :disabled='hospdisabled'>
              <el-option v-for="item in typehospital" :key="item.Code" :label="item.Name" :value="item.Code">
              </el-option>
            </el-select>
          </el-col>        
          <el-col :span="2" class='marginright20'>
            <el-select v-model="doctorId" placeholder="请选择" clearable :disabled='doctdisabled'>
              <el-option v-for="item in typedoctor" :key="item.Code" :label="item.Name" :value="item.Code">
              </el-option>
            </el-select>
          </el-col>  
          <el-col :span='3'>
            <el-button type="primary" @click='GetQuery'>查询</el-button>
            <el-button type="success" class='el-button--info' @click='GetExport'>导出</el-button>
          </el-col>              
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row element-loading-text="数据加载中" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" slot="empty" :border='true'>
        <el-table-column label="签约服务续约率统计表" align='center'>
          <el-table-column prop="HospitalName" label="名称" width="100"> </el-table-column>
          <el-table-column prop="SignNumOfLastYear" label="上年度签约数" width="95"> </el-table-column>
          <el-table-column prop="SignNumOfThisYear" label="本年度签约数" width="100"> </el-table-column>
          <el-table-column prop="RenewNumOfThisYear" label="继续签约数" width="90"> </el-table-column>
          <el-table-column prop="NewAddNumOfThisYear" label="本年度新增签约数" width="105"> </el-table-column>
          <el-table-column prop="ExpiredNumOfThisYear" label="已到期签约数" width="105"> </el-table-column>
          <el-table-column prop="RenewRateOfThisYear" label="年度续约率" width="115"> </el-table-column>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import { mapGetters, mapActions } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js';
import axios from 'axios';
import qs from 'qs';
export default {
  data() {
    return {
      datavalue1: new Date().getFullYear().toString(),      
      pickerOptions0: {
        disabledDate(time) {
          // 获取系统当前的时间
          let curDate = (new Date()).getTime();
          let agoYearsTime = (365*5+366)*24*60*60*1000;
          let years2000 = curDate - agoYearsTime;
          return time.getTime() > Date.now() || time.getTime() < years2000;;
        }
      },
      form: {

      },      
      value:'',
      typeprovince: [],
      provCode: null,
      typecity: [],
      cityCode: null,
      typearea: [],
      areaCode: null,
      typehospital:[],
      hospitalId:null,
      typedoctor: [],
      doctorId:null,
      tableData: [],
      currentPage:1,
      currentNum:10,
      total: null,
      loading: true,
      hrefvalue: '',
      proedisabled:false,
      citydisabled:false,
      areadisabled:false,
      hospdisabled:false,
      doctdisabled:false,
      //判断省市区选择时是否有变化
      pdprov:'',
      pdcity:'',
      pdarea:'',
      pdhospt:'',
      pddoct:'',
    }
  },
  created() {
  },
  mounted() { 
    var self = this; 
    setTimeout(function(){
      self.provinceDate();
      self.provCode=localStorage.getItem('provinceL');
      self.cityCode=localStorage.getItem('cityL');
      self.areaCode=localStorage.getItem('areaL');
      self.hospitalId=localStorage.getItem('hosptialidL');
      self.doctorId=localStorage.getItem('doctoridL');  

      self.pdprov = localStorage.getItem('provinceL');
      self.pdcity=localStorage.getItem('cityL');
      self.pdarea=localStorage.getItem('areaL');
      self.pdhospt=localStorage.getItem('hosptialidL');
      self.pddoct=localStorage.getItem('doctoridL'); 

      if(localStorage.getItem('doctoridL') != ''){
        self.proedisabled = true;
        self.citydisabled = true;
        self.areadisabled = true;
        self.hospdisabled = true;
        self.doctdisabled = true;
        console.log(1)
      }else if(localStorage.getItem('hosptialidL') != '' && localStorage.getItem('doctoridL') == ''){
        self.proedisabled = true;
        self.citydisabled = true;
        self.areadisabled = true;
        self.hospdisabled = true;
        self.doctdisabled = false;
        console.log(2)
      }else if(localStorage.getItem('areaL')!=''&&localStorage.getItem('hosptialidL') == ''){
        self.proedisabled = true;
        self.citydisabled = true;
        self.areadisabled = true;
        self.hospdisabled = false;
        self.doctdisabled = false;
        console.log(3)
      }else if(localStorage.getItem('cityCode')!=''&&localStorage.getItem('areaCode') == ''){
        self.proedisabled = true;
        self.citydisabled = true;
        self.areadisabled = false;
        self.hospdisabled = false;
        self.doctdisabled = false;
        console.log(4)
      }else if(localStorage.getItem('provinceCode')!=''&&localStorage.getItem('cityCode') == ''){
        self.proedisabled = true;
        self.citydisabled = false;
        self.areadisabled = false;
        self.hospdisabled = false;
        self.doctdisabled = false;
        console.log(5)
      }else{
        self.proedisabled = false;
        self.citydisabled = false;
        self.areadisabled = false;
        self.hospdisabled = false;
        self.doctdisabled = false;
        console.log(6)
      }
      
      self.renewstatisticDate();
      // var newpower=localStorage.getItem('powerL');
      // JSON.parse(newpower).forEach(function(v,i){
      //   if(v.ModuleID == 799999){
      //     switch(v.DataRange){
      //       case 100:
      //         self.proedisabled = true;
      //         self.citydisabled = true;
      //         self.areadisabled = true;
      //         self.hospdisabled = true;
      //         self.doctdisabled = true;
      //         break;
      //       case 300:
      //         self.proedisabled = true;
      //         self.citydisabled = true;
      //         self.areadisabled = true;
      //         self.hospdisabled = true;
      //         break;
      //       case 430:
      //         self.proedisabled = true;
      //         self.citydisabled = true;
      //         self.areadisabled = true;
      //         break;
      //       case 440:
      //         self.proedisabled = true;
      //         self.citydisabled = true;
      //         break;
      //       case 450:
      //         self.proedisabled = true;
      //         break;
      //       case 600:
      //     }
      //   }
      // })
      console.log(self.token,self.doctorid)
    },500) 
  },
  computed: {
    ...mapGetters(['token','hosptialid','province','city','area','doctorid','power'])
  },
  methods: {
    // 日期选择
    dataChange(val) {
      this.datavalue1=val;
      this.renewstatisticDate();
    },
    // 省
    provinceDate() {
      var self = this;
      axios.get(apiurl.GetRegions, {
        params:{
          code:0
        }
      }).then(function (res) {
        if(res.data.suc == true){
          self.typeprovince=res.data.rows;
          // self.provCode=self.province;
          // self.cityCode=self.city;
          // self.areaCode=self.area;
          // self.hospitalId=self.hosptialid;
          // self.doctorId=self.doctorid;
        } else {
          self.$alert(res.data.mes, '提示', )
        }        
      }).catch(function(error) {
          console.log(error);
      }); 
    },
    // 市
    cityDate(val) {
      var self = this;
      axios.get(apiurl.GetRegions, {
        params:{
          code:val
        }
      }).then(function (res) {
        if(res.data.suc == true){
          self.typecity=res.data.rows;
          if(self.pdprov !=self.provCode){
            self.pdprov = self.provCode;
            self.typearea=[];
            self.typehospital=[];
            self.typedoctor=[];
            self.cityCode='';
            self.areaCode='';
            self.hospitalId='';
            self.doctorId='';
          }   
        } else {
          self.$alert(res.data.mes, '提示', )
        }  
        
      }).catch(function(error) {
          console.log(error);
      }); 
    },
    // 区
    areaDate(val) {
      var self = this;
      if(self.cityCode != ''){
        axios.get(apiurl.GetRegions, {
          params:{
            code:val
          }
        }).then(function (res) {
          if(res.data.suc == true){
            self.typearea=res.data.rows;
            if(self.pdcity !=self.cityCode){
              self.pdcity = self.cityCode;
              self.typehospital=[];
              self.typedoctor=[];
              self.areaCode='';
              self.hospitalId='';
              self.doctorId='';
            } 
          } else {
            self.$alert(res.data.mes, '提示', )
          }         
        }).catch(function(error) {
            console.log(error);
        }); 
      }else{
        self.typearea=[];
        self.typehospital=[];
        self.typedoctor=[];
        self.areaCode='';
        self.hospitalId='';
        self.doctorId='';
      }  
    },
    // 医院
    hospitalDate(val) {
      var self = this;
      if(self.areaCode != ''){
        axios.get(apiurl.GetHospitalsByRegion, {
          params:{
            region:val,
            // token:self.token
          }
        }).then(function (res) {
          if(res.data.suc == true){
            console.log(res)
            self.typehospital=res.data.rows;
            if(self.pdarea !=self.areaCode){
              self.pdarea = self.areaCode;
              self.typedoctor=[];
              self.hospitalId='';
              self.doctorId='';
            }  
          } else {
            self.$alert(res.data.mes, '提示', )
          }
        }).catch(function(error) {
            console.log(error);
        }); 
      }else{ 
        self.typehospital=[];       
        self.typedoctor=[];
        self.hospitalId='';
        self.doctorId='';
      }  
    },
    //医生
    doctorDate(val) {
      var self = this;
      if(self.hospitalId != ''){
        axios.get(apiurl.GetDoctorsByHospitalId, {
          params:{
            hospitalId:val,
            // token:self.token
          }
        }).then(function (res) {
          if(res.data.suc == true){
            console.log(res)
            self.typedoctor=res.data.rows;
            if(self.pdhospt !=self.hospitalId){
              self.pdhospt = self.hospitalId;
              self.doctorId='';
            }  
          } else {
            self.$alert(res.data.mes, '提示', )
          }
        }).catch(function(error) {
            console.log(error);
        }); 
      }else{
        self.typedoctor=[];
        self.doctorId='';
      }    
    },
    renewstatisticDate() {
      var self =this;
      console.log(this.datavalue1)
      axios.get(apiurl.GetRenewNumStatistics, {
        params:{
          page:this.currentPage,
          rows:this.currentNum,
          prov:this.provCode||'',
          city:this.cityCode||'',
          area:this.areaCode||'',
          year:this.datavalue1,
          hospitalId:this.hospitalId,
          doctorId:this.doctorId,
          token: this.token
        },            
      }).then(function (res) {
          if(res.data.suc == true){
            self.loading = false;
            console.log(res)
            self.tableData=res.data.rows;
            self.total=res.data.total
          } else {
            self.$alert(res.data.mes, '提示', )
          }
      }).catch(function(error) {
          console.log(error);
      }); 
    },    
    handleSizeChange(val) {
      this.currentNum=val;
      this.renewstatisticDate();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.renewstatisticDate();
      console.log(`当前页: ${val}`);
    },
    GetQuery() {
      this.renewstatisticDate();
    },    
    GetExport() {
      var self = this;
      self.hrefvalue=apiurl.DownloadRenewNumStatistics+'?token='+this.token+'&prov='+this.provCode+'&city='+this.cityCode+'&area='+this.areaCode+'&year='+this.datavalue1+'&hospitalId='+this.hospitalId+'&doctorId='+this.doctorId;
      window.open(self.hrefvalue,'_blank');
    }
  }
}
</script>