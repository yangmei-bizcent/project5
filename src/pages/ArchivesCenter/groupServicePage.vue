<template>
  <div class="ts-content  wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" v-model="form" label-width="76px" class="clearfix">
        <el-row>
          <el-col :span="6">
            <el-form-item label="签约时效">
              <el-date-picker v-model="datavalue1" type="daterange" unlink-panels placeholder="选择日期范围" range-separator=" 至 " value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" :editable='false' @change="dataChange">
              </el-date-picker>
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
                  <el-option v-for="item in form.ClassifyData" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-col>   
              <el-col :span="11">
                <el-select v-model="form.ClassifyConValue" placeholder="请选择" clearable @change="ClassifyConChange">
                  <el-option v-for="item in form.ClassifyConData" :key="item.Id" :label="item.Name" :value="item.Id">
                  </el-option>
                </el-select>
              </el-col>                
            </el-form-item>
          </el-col>  
          <el-col :span="5">
            <el-form-item label="剩余次数"> 
              <el-select v-model="form.RemainderValue" placeholder="请选择" clearable @change="remainderChange">
                <el-option v-for="item in form.RemainderData" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>         
            </el-form-item>
          </el-col>             
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="搜索"> 
              <el-input placeholder="请输入居民姓名" v-model="form.SearchValue" class="input-with-select">
                <el-button slot="append" class="el-icon-ts-serch" @click='SearchBtn'></el-button>
              </el-input>             
            </el-form-item>
          </el-col> 
          <el-col :span="2">
            <el-button type="primary" @click="groupbtn">群发服务提醒</el-button>
          </el-col>    
        </el-row>
      </el-form>
      <!-- 群发弹框 -->
      <MessageMod :msg='msgdata' @closeX="closeX"></MessageMod>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row element-loading-text="数据加载中" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" slot="empty" :border='true'>
        <el-table-column type='index' label="序号" width="60"> </el-table-column>
        <el-table-column prop="PatientName" label="居民姓名" min-width="90"> </el-table-column>
        <el-table-column prop="PatientCardId" label="身份证号" min-width="105" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="PatientPhone" label="联系方式" min-width="90"> </el-table-column>
        <el-table-column prop="IncomeOfElderService" label="签约有效期" min-width="115" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.StartDate + '至' + scope.row.EndDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ServiceItemName" label="服务项目名称" min-width="115" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="ServicePackName" label="服务包" min-width="115" show-overflow-tooltip></el-table-column>
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
import MessageMod from '../severmessge/messageMod.vue'
// import '../../assets/sass/message.scss';
export default {
  data() {
    return {
      datavalue1: "",
      form: {
        DoctorData:[],
        DoctorValue: '',
        ClassifyData:[],
        ClassifyValue: '',
        ClassifyConData:[],
        ClassifyConValue: '',
        ClassifyConChinese: '',
        SearchValue: '',
        RemainderData: [
          {
            id: 0,
            name: '全部'
          },
          {
            id: 1,
            name: '大于0'
          },
          {
            id: 2,
            name: '等于0'
          }
        ],
        RemainderValue: 0
      },  
      tableData: [],
      currentPage:1,
      currentNum:10,
      total:null,
      loading: true,
      changeflog: 1,
      registerTime: '',
      msgdata: {
        msgMod: false,
        boxshow: true,
        typeMsg: 2,
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
    }
  },
  created() {
  },
  mounted() { 
    
    // this.GetPatientListDate();  
    this.DoctorDataGet();
    this.ClassifyDataGet();
  },
  components:{
    'MessageMod':MessageMod
  },
  computed: {
    ...mapGetters(['token','hosptialid','province','city','area','doctorid','power'])
  },
  methods: {
    //点击群发 显示弹框    
    groupbtn() {
      if(this.total == 0) {
        this.$alert('先选择发送人群', '提示', )
      }else{
        this.msgdata.msgMod = true;
        this.msgdata.boxshow=true;
        this.msgdata.parDate = {//群发需要的传参
          registerTime: this.registerTime,
          servicePackId: this.form.ClassifyValue,
          servicePackItemId: this.form.ClassifyConValue,
          remainTimes: this.form.RemainderValue,
          keyWords: this.form.SearchValue,
          doctorId: this.form.DoctorValue
        },
        this.msgdata.titleText = this.form.ClassifyConChinese + '服务项目' + this.total + '人';
      }      
    },
    closeX(data) {
      this.msgdata.msgMod = data;
    },
    dataChange(val) {
      this.registerTime = val;
      this.GetPatientListDate();
    },
    // 医生change事件
    DoctorChange(val) {
      setTimeout(() => {
        this.GetPatientListDate();
      },500)
    },
    // 分类 服务包
    ClassifyChange(val) {
      this.ClassifyConDataGet();
      
      setTimeout(() => {
        this.GetPatientListDate();
      },500)      
    },
    // 分类 服务项目
    ClassifyConChange(val) {      
      setTimeout(() => {
        var selectedIndex = this.form.ClassifyConValue;
        if(!selectedIndex == false){
          var itemObj = this.form.ClassifyConData.find((value, index, item) => {
            return value.Id == selectedIndex;
          });
          this.form.ClassifyConChinese =itemObj.Name;
        } 
      this.GetPatientListDate();
      },500); 
    },
    //剩余次数
    remainderChange() {
      this.GetPatientListDate();
    },
    // 搜索
    SearchBtn() {
      this.GetPatientListDate();
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
    // 分类 服务包 下拉数据
    ClassifyDataGet(val) {
      axios.get(apiurl.GetServicePackOptionList, {
        params:{
          PreCode: val,
          token: this.token
        },            
      }).then( (res) =>{
          if(res.data.suc == true){
            this.form.ClassifyValue = res.data.rows[0].Id;
            this.form.ClassifyData = res.data.rows;
            
          } else {
            this.$alert(res.data.mes, '提示', )
          }
      }).catch((error) => {
          console.log(error);
      }); 
    },
    //服务包下面的服务项目
    ClassifyConDataGet() {
      console.log(this.form.ClassifyValue)
      axios.get(apiurl.GetServicePackItemOptionList, {
        params:{
          servicePackId: this.form.ClassifyValue,
          token: this.token
        },            
      }).then( (res) =>{
          if(res.data.suc == true){
            this.form.ClassifyConValue = res.data.rows[0].Id;
            this.form.ClassifyConData = res.data.rows;
            
          } else {
            this.$alert(res.data.mes, '提示', )
          }
      }).catch((error) => {
          console.log(error);
      }); 
    },
    //表格数据
    GetPatientListDate() {
      axios.get(apiurl.GetPatientList, {
        params:{
          page:this.currentPage,
          rows:this.currentNum, 
          servicePackId:this.form.ClassifyValue || 0,
          servicePackItemId:this.form.ClassifyConValue || 0,
          remainTimes: this.form.RemainderValue,
          registerTime:this.registerTime,
          keyWords:this.form.SearchValue,
          doctorId:this.form.DoctorValue,
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
      this.GetPatientListDate();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetPatientListDate();
      console.log(`当前页: ${val}`);
    },
    checkbtn() {
      
    }
  }
}
</script>