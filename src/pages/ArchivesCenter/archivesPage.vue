<template>
  <div class="ts-content  wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" v-model="form" label-width="76px" class="clearfix">
        <el-row>
          <el-col :span="5">
            <el-form-item label="签约时间">
              <el-select v-model="form.DateValue" placeholder="请选择" clearable @change="dataChange">
                <el-option v-for="item in form.Datearr" :key="item.datavalue" :label="item.datavalue" :value="item.datavalue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="医生">
              <el-select v-model="form.DoctorValue" placeholder="请选择" clearable @change='DoctorChange'>
                <el-option v-for="item in form.DoctorData" :key="item.Id" :label="item.Name" :value="item.Id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>   
          <el-col :span="8">
            <el-form-item label="分类"> 
              <el-col :span="11" class='marginright20'>
                <el-select v-model="form.ClassifyValue" placeholder="请选择" clearable @change='ClassifyChange'>
                  <el-option v-for="item in form.ClassifyData" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>   
              <el-col :span="11">
                <el-select v-model="form.ClassifyConValue" placeholder="请选择" clearable @change='ClassifyConChange'>
                  <el-option v-for="item in form.ClassifyConData" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>                
            </el-form-item>
          </el-col>  
          <el-col :span="6">
            <el-form-item label="搜索"> 
              <el-input placeholder="请输入居民姓名" :maxlength='10' v-model="form.SearchValue" class="input-with-select">
                <el-button slot="append" class="el-icon-ts-serch" @click='SearchBtn'></el-button>
              </el-input>             
            </el-form-item>
            </el-col>             
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row element-loading-text="数据加载中" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" slot="empty" :border='true'>
        <el-table-column type="index" label="序号" width="70"> </el-table-column>
        <el-table-column prop="PatientName" label="姓名" min-width="105"> </el-table-column>
        <el-table-column prop="PatientAge" label="年龄" min-width="90"> </el-table-column>
        <el-table-column prop="PatientPhone" label="联系电话" min-width="90"> </el-table-column>
        <el-table-column label="签约时间" min-width="115">
          <template slot-scope="scope">
            <span>{{scope.row.StartDate + '至' + scope.row.EndDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PatientLabel" label="分类" min-width="115" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <span class="check_btn el-icon-ts-serch" @click="checkbtn(scope.row.PatientId,scope.row.Id,scope.row.PatientName,scope.row.PatientCardId)">查看</span>
          </template>
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
// import '../../assets/sass/message.scss';
export default {
  data() {
    return {
      form: {
         Datearr:[
          {
            datavalue: new Date().getFullYear()-1
          },
          {
            datavalue: new Date().getFullYear()
          },
          {
            datavalue: new Date().getFullYear()+1
          }
        ],
        DateValue: new Date().getFullYear(),
        DoctorData:[],
        DoctorValue: '',
        ClassifyData:[],
        ClassifyValue: '',
        ClassifyConData:[],
        ClassifyConValue: '',
        personClass: '',
        SearchValue: '',
      },  
      tableData: [],
      currentPage:1,
      currentNum:10,
      total:null,
      loading: true,
    }
  },
  created() {
  },
  mounted() { 
    // this.GetPatientManagementListGet();  
    this.DoctorDataGet();
    this.ClassifyDataGet();
  },
  computed: {
    ...mapGetters(['token','hosptialid','province','city','area','doctorid','power'])
  },
  methods: {
    dataChange(val) {
      this.GetPatientManagementListGet();
      console.log(val)  
    },
    // 医生change事件
    DoctorChange(val) {
      setTimeout(() => {
        this.GetPatientManagementListGet();
      },500);      
    },
    // 分类
    ClassifyChange(val) {
      console.log('1')
      this.form.ClassifyConValue = '';   
      this.ClassifyDataGet(val);
      setTimeout(() => {
        this.GetPatientManagementListGet();
      },500)      
      console.log(this.form.ClassifyConData,'aaaa')
    },
    ClassifyConChange(val) {
      val == '请选择' ? this.form.personClass = '' : this.form.personClass = val; 
      setTimeout(() =>{
        this.GetPatientManagementListGet(); 
      },500)  
        
    },
    // 搜索
    SearchBtn() {
      this.GetPatientManagementListGet();    
    },
    // 医生下拉数据
    DoctorDataGet() {
      axios.get(apiurl.GetCurrentDoctorOptionList, {
        params:{
          token: this.token
        },            
      }).then( (res) =>{
          if(res.data.suc == true){
            res.data.rows.forEach((v,i) => {
              if(v.Selected == true){
                this.form.DoctorValue = v.Id;
              }
            })
            this.form.DoctorData = res.data.rows;
          } else {
            this.$alert(res.data.mes, '提示', )
          }
      }).catch((error) => {
          console.log(error);
      });       
    },
    // 分类下拉数据
    ClassifyDataGet(val) {
      axios.get(apiurl.GetPatientLabel, {
        params:{
          PreCode: val,
          token: this.token
        },            
      }).then( (res) =>{
          if(res.data.suc == true){
            if(!val){
              this.form.ClassifyData = res.data.rows;
              this.form.ClassifyConData = [];
              this.form.ClassifyConValue = '请选择'; 
              console.log('大分类')
            }else{
              this.form.ClassifyConData = res.data.rows;
              console.log('小分类',this.form.ClassifyConData)
            }
            // !val ? this.form.ClassifyData = res.data.rows : this.form.ClassifyConData = res.data.rows;
          } else {
            this.$alert(res.data.mes, '提示', )
          }
      }).catch((error) => {
          console.log(error);
      }); 
    },

    GetPatientManagementListGet() {
      axios.get(apiurl.GetPatientManagementList, {
        params:{
          page:this.currentPage,
          rows:this.currentNum,
          personClass:this.form.personClass, //分类
          patientName:this.form.SearchValue, //居民姓名
          registeredYear:this.form.DateValue,//年份
          doctorId:this.form.DoctorValue,//医生编号
          token: this.token
        },            
      }).then( (res) =>{
          if(res.data.suc == true){
            this.loading = false;
            this.tableData=res.data.rows;
            this.total=res.data.total
          } else {
            this.$alert(res.data.mes, '提示', )
          }
      }).catch((error) => {
          console.log(error);
      }); 
    },   
    handleSizeChange(val) {
      this.currentNum = val;
      this.GetPatientManagementListGet();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetPatientManagementListGet();
      console.log(`当前页: ${val}`);
    },
    checkbtn(id,registerid,PatientName,cardId) {
      var param = {};
      param.method = "addTab";
      param.title = PatientName+'-档案中心';
      param.url = linkUrl + 'ArchivesCenter/archivesmaink?token='+this.token+'&patientId='+id+'&ModelUrl='+this.$route.query.ModelUrl + '&registerId=' + registerid + '&cardId=' + cardId;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push({
      //   name: "ArchivesMainK",
      //   query: {
      //       patientId: id,
      //       registerId: registerid,
      //       cardId: cardId
      //   }
      // })
    }
  }
}
</script>
<style>
</style>
