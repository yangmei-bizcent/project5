<template>
  <div class="ts-content  wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" v-model="form" label-width="85px" class="clearfix">
        <el-row>
          <el-col :span='24'>
            <el-button type="primary" class='el-button--info' @click="addbtntitle()">新增</el-button>
            <el-form-item label=""> 
              
            </el-form-item>            
          </el-col>              
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row element-loading-text="数据加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" slot="empty">
        <el-table-column type="index" label="序号" width="60"> </el-table-column>
        <el-table-column prop="Year" label="年份" width="105"> </el-table-column>
        <el-table-column prop="TotalPopulationNum" label="所辖人口数" width="110"> </el-table-column>
        <el-table-column prop="FocalPopulationNum" label="所辖重点人口数" width="90"> </el-table-column>
        <el-table-column prop="HTNPopulationNum" label="所辖高血压人数" width="115"> </el-table-column>    
        <el-table-column prop="AgeOver65PopulationNum" label="所辖老年人人口数" width="115"> </el-table-column>     
        <el-table-column prop="DMPopulationNum" label="所辖糖尿病人口人数" width="115"> </el-table-column> 
        <el-table-column label="操作" width="90">
          <template slot-scope="props">
            <span class="check_btn el-icon-ts-bianji" @click="Infodata(props.row.Id)">编辑</span>
            <span class="angin_btn el-icon-ts-shanchu" @click='deleteDate(props.row.Id)'>删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
      <el-dialog :title="diaTitle" :visible.sync="dialogVisible" center class="messcon initialtk" ref="printContent">
        <el-form :model="usermess" :rules="rules2" ref="usermess" label-width="100px" class="clearfix worddisplay">
          <el-row>
            <el-col :span='12' class='datawidthauto'>
              <el-form-item label="年份" required>
                <el-date-picker v-model="newdatavalue" align="right" type="year" :picker-options="pickerOptions0" placeholder="选择年" @change='datavalue'>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="所辖人口人数" prop='TotalPopulationNum'>
                <el-input v-model="usermess.TotalPopulationNum" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="所辖重点人口人数" prop='FocalPopulationNum'>
                <el-input v-model="usermess.FocalPopulationNum" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="所辖糖尿病人口人数" prop='DMPopulationNum'>
                <el-input v-model="usermess.DMPopulationNum" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="所辖老年人人口数" prop='AgeOver65PopulationNum'>
                <el-input v-model.number="usermess.AgeOver65PopulationNum" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="所辖高血压人口人数" prop='HTNPopulationNum'>
                <el-input v-model.number="usermess.HTNPopulationNum" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addtemplate()" :disabled='adddisabled'>确 定</el-button>
        </div>
      </el-dialog>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import '../../assets/sass/message.scss';
import { mapGetters,mapActions } from 'vuex';
import {apiurl,linkUrl} from '../../service/api.js'
import axios from 'axios';
import qs from 'qs';
export default {
  data() {
    var checkTotalPopulation = (rule, value, callback) => {
      var regu = /[^\d]/;
      console.log(regu.test(value),value)
      setTimeout(() => {
        if (regu.test(value)) {
          callback(new Error('请输入正整数'));
        } else if(value == '') {
          callback();
        }else if(value>10000000){
          callback(new Error('输入的数值大于1000万'));
        }else{          
          callback();
        }
      }, 1000);
    };
    return {
      rules2: {
        TotalPopulationNum: [
          { validator: checkTotalPopulation, trigger: 'blur' }
        ],
        FocalPopulationNum: [
          { validator: checkTotalPopulation, trigger: 'blur' }
        ],
        DMPopulationNum: [
          { validator: checkTotalPopulation, trigger: 'blur' }
        ],
        AgeOver65PopulationNum: [
          { validator: checkTotalPopulation, trigger: 'blur' }
        ],
        HTNPopulationNum: [
          { validator: checkTotalPopulation, trigger: 'blur' }
        ],
      },
      value5: '',
      datavalue1: '',
      diaTitle: "新增",
      dialogVisible:false,
      newdatavalue:new Date().getFullYear().toString(),
      usermess: {
        Year:'',
        TotalPopulationNum:null,
        FocalPopulationNum:null,
        DMPopulationNum:null,
        AgeOver65PopulationNum:null,
        HTNPopulationNum:null
      }, 
      pickerOptions0: {
        disabledDate(time) {
          // 获取系统当前的时间
          let curDate = (new Date()).getTime();
          let agoYearsTime = (365*17+366)*24*60*60*1000;
          let years2000 = curDate - agoYearsTime;
          return time.getTime() > new Date().setFullYear(new Date().getFullYear()+1) || time.getTime() < years2000;;
        }
      },
      form: {   
      },      
      value:'',
      tableData: [],
      currentPage:1,
      currentNum:10
      ,
      total:null,
      loading: true,
      Id:null,
      adddisabled:false,//提交按钮是否不可点
    }
  },  
  computed: {
    ...mapGetters({
      token:'token'
    }),
  },
  mounted() {
    this.templateDate(this.currentPage,this.currentNum); 
  },
  created() {
  },
  methods: {
    handleSizeChange(val) {
      this.currentNum=val;
      this.templateDate(this.currentPage,this.currentNum,this.form.value,this.form.templatename);
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.templateDate(this.currentPage,this.currentNum,this.form.value,this.form.templatename);
    },
    datavalue(val) {
      var self = this;
      self.newdatavalue = val;
    },
    //查询
    inquirybtn() {
      this.templateDate(this.currentPage,this.currentNum,this.form.value,this.form.templatename)
    },
    //详情
    Infodata(Id) {
      var self = this;  
      this.diaTitle='编辑';    
      this.adddisabled = false; 
      console.log(Id,'Id')
      this.Id=Id;
      axios.get(apiurl.StatisticsEdit, {
        params:{
          id: Id,
        },
        headers:{
          "token": self.token
        }              
      }).then(function (res) {
          if(res.data.suc == true){
            console.log(res.data.extra.Year);
            console.log(res.data.extra.Year.toString())
            self.newdatavalue=res.data.extra.Year.toString();
            self.usermess.TotalPopulationNum=res.data.extra.TotalPopulationNum;
            self.usermess.FocalPopulationNum=res.data.extra.FocalPopulationNum;
            self.usermess.DMPopulationNum=res.data.extra.DMPopulationNum;
            self.usermess.AgeOver65PopulationNum=res.data.extra.AgeOver65PopulationNum;
            self.usermess.HTNPopulationNum=res.data.extra.HTNPopulationNum;
            self.dialogVisible = true;  
          } else {
              self.$alert(res.data.mes, '提示', )
          }
      }).catch(function(error) {
          console.log(error);
      });
    },
    //新增模版
    addbtntitle() {
      this.diaTitle='新增';
      this.dialogVisible = true; 
      this.Id=0;
      this.newdatavalue=new Date().getFullYear().toString();
      this.usermess.TotalPopulationNum=null;
      this.usermess.FocalPopulationNum=null;
      this.usermess.DMPopulationNum=null;
      this.usermess.AgeOver65PopulationNum=null;
      this.usermess.HTNPopulationNum=null;
      this.adddisabled = false; 
    },
    addtemplate() {
      var self = this; 
      self.adddisabled = true;    
      axios.post(apiurl.AddOrUpdate, qs.stringify({'Id':this.Id,'Year': this.newdatavalue,'AgeOver65PopulationNum': this.usermess.AgeOver65PopulationNum,'DMPopulationNum': this.usermess.DMPopulationNum,'FocalPopulationNum':this.usermess.FocalPopulationNum ,'HTNPopulationNum':this.usermess.HTNPopulationNum ,'TotalPopulationNum':this.usermess.TotalPopulationNum }), 
      {
        headers: {
          "token": self.token
        }
      })
      .then(function(response) {
        if (response.data.suc == true) {  
          self.dialogVisible = false;    
          self.templateDate(self.currentPage,self.currentNum);  
        } else {
          self.adddisabled = false; 
          self.$alert(response.data.mes, '提示', )
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    //获取初始数据统计列表
    templateDate(currentPage,currentNum) {
      var self = this;
      axios.get(apiurl.StatisticsGetList, {
        params:{
          page:currentPage,
          rows:currentNum,
        },
        headers:{
          "token": self.token
        }              
      }).then(function (res) {
          if(res.data.suc == true){
            self.tableData=res.data.rows;
            console.log(res)
            self.total=res.data.total;
          } else {
              self.$alert(res.data.mes, '提示', )
          }
      }).catch(function(error) {
          console.log(error);
      });
    },
    deleteDate(id, name, date) {
      var self = this;
      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('p', null, '是否要删除此年数据，删除后此年的统计指标将部分缺失！')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            done();
            console.log(id)
            axios.post(apiurl.StatisticsDelete+'?id='+id, {},
            {
              headers: {
                "token": self.token
              }
            })
            .then(function(response) {
              if (response.data.suc == true) {  
                self.$message({
                  type: 'success',
                  message: response.data.mes
                });
                self.templateDate(self.currentPage,self.currentNum);  
              } else {
                self.$alert(response.data.mes, '提示', )
              }
            })
            .catch(function(error) {
              console.log(error);
            });
          } else {
            done();
          }
        }
      }).then(action => {

      });
    },
  }
}
</script>