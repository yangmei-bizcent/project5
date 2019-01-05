<template>
  <div class="ts-content  wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" v-model="form" label-width="76px" class="clearfix">
        <el-row>
          <el-col :span="6" class='textalign'>
            <el-form-item label="时间">
              <el-date-picker v-model="datavalue1" type="year" align="right" :picker-options="pickerOptions0" @change='dataChange'>
              </el-date-picker>
            </el-form-item>
          </el-col> 
          <el-col :span="2">
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
        <el-row style='margin-bottom:20px;'>
          <el-col :span="24">
            <p class="ts-notice" v-if='noticefalg==false'>
              <i class="el-icon-ts-mark2" style="font-size:15px;color:#00bc9c;"></i>
              <span>相关数据指标缺失，请联系管理员设定初始统计数据</span>
            </p>
          </el-col>           
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row element-loading-text="数据加载中" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" slot="empty" :border='true'>
        <el-table-column prop="HospitalName" label="名称" width="110"> </el-table-column>
        <el-table-column label="签约总数" align='center'>
          <el-table-column prop="TotalPopulationNum" label="辖区总人口数" width="105"> </el-table-column>
          <el-table-column prop="TotalSignRate" label="签约率(%)" width="110"> </el-table-column>
          <el-table-column prop="TotalSignPayNum" label="有偿签约人数" width="90"> </el-table-column>
          <el-table-column prop="TotalSignPayRate" label="有偿签约率" width="90"> </el-table-column>
        </el-table-column>
        <el-table-column label="重点人群(特困人群、失独家庭成员、残疾人、孕妇、精神病、结核病、老年人、儿童、慢性病)" align='center'> 
          <el-table-column prop="FocalPopulationNum" label="辖区重点人群数" width="115"> </el-table-column>
          <el-table-column prop="FocalSignRate" label="重点人群签约率(%)" width="115"> </el-table-column>
          <el-table-column prop="FocalSignPayNum" label="重点人群有偿签约数" width="115"> </el-table-column>
          <el-table-column prop="FocalSignPayRate" label="重点人群有偿签约率(%)" width="115"> </el-table-column>
        </el-table-column>
        <el-table-column label="老年人" align='center'> 
          <el-table-column prop="ElderPopulationNum" label="辖区老年人人群数" width="115"> </el-table-column>
          <el-table-column prop="ElderSignRate" label="老年人人群签约率(%)" width="115"> </el-table-column>
          <el-table-column prop="ElderSignPayNum" label="老年人人群有偿签约数" width="115"> </el-table-column>
          <el-table-column prop="ElderSignPayRate" label="老年人人群有偿签约率(%)" width="115"> </el-table-column>
        </el-table-column>
        <el-table-column label="高血压" align='center'> 
          <el-table-column prop="HTNPopulationNum" label="辖区高血压人群数" width="115"> </el-table-column>
          <el-table-column prop="HTNSignRate" label="高血压人群签约率(%)" width="115"> </el-table-column>
          <el-table-column prop="HTNSignPayNum" label="高血压人群有偿签约数" width="115"> </el-table-column>
          <el-table-column prop="HTNSignPayRate" label="高血压人群有偿签约率(%)" width="115"> </el-table-column>
        </el-table-column>
        <el-table-column label="糖尿病" align='center'> 
          <el-table-column prop="DMPopulationNum" label="辖区糖尿病人群数" width="115"> </el-table-column>
          <el-table-column prop="DMSignRate" label="糖尿病人群签约率(%)" width="115"> </el-table-column>
          <el-table-column prop="DMSignPayNum" label="糖尿病人群有偿签约数" width="115"> </el-table-column>
          <el-table-column prop="DMSignPayRate" label="糖尿病人群有偿签约率(%)" width="115"> </el-table-column>
        </el-table-column>
        <el-table-column label="其他重点人群" align='center'> 
          <el-table-column prop="OtherPopulationNum" label="辖区其他重点人群数" width="115"> </el-table-column>
          <el-table-column prop="OtherCrowdSignRate" label="其他重点人群签约率(%)" width="115"> </el-table-column>
          <el-table-column prop="OtherCrowdSignPayNum" label="其他重点人群有偿签约数" width="115"> </el-table-column>
          <el-table-column prop="OtherCrowdSignPayRate" label="其他重点人群有偿签约率(%)" width="115"> </el-table-column>
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

      noticefalg:true
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
      
    //   var newpower=localStorage.getItem('powerL');
    // // if(this.power != null){
    //   JSON.parse(newpower).forEach(function(v,i){
    //     if(v.ModuleID == 799999){
    //       switch(v.DataRange){
    //         case 100:
    //           self.proedisabled = true;
    //           self.citydisabled = true;
    //           self.areadisabled = true;
    //           self.hospdisabled = true;
    //           self.doctdisabled = true;
    //           break;
    //         case 300:
    //           self.proedisabled = true;
    //           self.citydisabled = true;
    //           self.areadisabled = true;
    //           self.hospdisabled = true;
    //           break;
    //         case 430:
    //           self.proedisabled = true;
    //           self.citydisabled = true;
    //           self.areadisabled = true;
    //           break;
    //         case 440:
    //           self.proedisabled = true;
    //           self.citydisabled = true;
    //           break;
    //         case 450:
    //           self.proedisabled = true;
    //           break;
    //         case 600:
    //       }
    //     }
    //   })
    // }    
      self.qianyuestatisticDate();
    },500) 
  },
  computed: {
    ...mapGetters(['token','hosptialid','province','city','area','doctorid','power'])
  },
  methods: {
    dataChange(val) {
      this.datavalue1=val;
      this.qianyuestatisticDate();
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
          // self.nextTick(function () {            
            // self.provCode=self.province;
            // self.cityCode=self.city;
            // self.areaCode=self.area;
            // self.hospitalId=self.hosptialid;
            // self.doctorId=self.doctorid;
          // })
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
    qianyuestatisticDate() {
      var self =this;
      axios.get(apiurl.GetSignNumStatistics, {
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
            if(res.data.total == 0){              
              self.noticefalg=false;
            }else{
              res.data.rows.forEach(function(v,i){
                if(v.TotalPopulationNum == 0){
                  console.log('这里？')
                  self.noticefalg=false;
                }else{
                  self.noticefalg=true
                }
              })
            }            
            self.total=res.data.total
          } else {
            self.$alert(res.data.mes, '提示', )
          }
      }).catch(function(error) {
          console.log(error);
      }); 
    }, 
    handleSizeChange(val) {
      this.currentNum = val;
      this.qianyuestatisticDate();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.qianyuestatisticDate();
      console.log(`当前页: ${val}`);
    },
    GetQuery() {
      this.qianyuestatisticDate();
    },
    GetExport() {
      var self = this;
      self.hrefvalue=apiurl.DownloadSignNumStatistics+'?token='+this.token+'&prov='+this.provCode+'&city='+this.cityCode+'&area='+this.areaCode+'&year='+this.datavalue1+'&hospitalId='+this.hospitalId+'&doctorId='+this.doctorId;
      window.open(self.hrefvalue,'_blank');
    }
  }
}
</script>