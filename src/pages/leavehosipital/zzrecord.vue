
<template>
  <div class="ts-content wrapper-datepicker newcss">
    <main class="main-wrap"> 
      <div class="tab_k">
        <ul class="tab_ul clearfix">
           <li :class="{active:index == num}" class="tab_li" v-for='(item,index) in tabe_btn' @click='tabclick(index)' ref='tabli' :key="index">{{item}}</li>
        </ul>
      </div>     
      <!-- 转出记录 -->
      <el-table :data="tableData" stripe style="width: 100%"  v-show='table_show==0' highlight-current-row>
        <el-table-column type="index" label="序号" width="65"> </el-table-column>
        <el-table-column prop="AppointmentHospitalName" label="接诊机构 " width="100"></el-table-column>
        <el-table-column prop="PatientName" label="病人姓名" width="100"> </el-table-column>
        <el-table-column prop="ApplyHospitalName" label="送转医院" width="120"></el-table-column>
        <el-table-column prop="ApplySectionName" label="送转科室 " width="180"></el-table-column>
        <el-table-column prop="ApplyDoctorName" label="送转医生 " width="120"> </el-table-column>
        <el-table-column prop="ApplyDateFormat" label="申请时间" width="120"></el-table-column>
        <el-table-column prop="TransferTreatmentReason" label="转诊原因" width="120"></el-table-column>
        <el-table-column prop="AppointmentStateText" label="进度状态" width="100">
          <template slot-scope="scope">
            <div v-if='scope.row.AppointmentState==0' class="tag_text1">{{scope.row.AppointmentStateText}}<b></b></div>
            <div v-if='scope.row.AppointmentState==1' class="tag_text2">{{scope.row.AppointmentStateText}}<b></b></div>
            <div v-if='scope.row.AppointmentState==2' class="tag_text3">{{scope.row.AppointmentStateText}}<b></b></div>
            <div v-if='scope.row.AppointmentState==3' class="tag_text3">{{scope.row.AppointmentStateText}}<b></b></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <span class="check_btn el-icon-ts-serch" @click='checkdetail(scope.row.TransferId,scope.row.AppointmentState,scope.row.PatientName,scope.row.AppointmentStateText)'>查看详情</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 转入检验检查 -->
      <el-table :data="tableData1" stripe style="width: 100%" highlight-current-row v-show='table_show==1'>
        <el-table-column type="index" label="序号" width="65"> </el-table-column>
        <!-- <el-table-column prop="TransferNo" label="预约号" width="100"></el-table-column> -->
        <el-table-column prop="CreateDate" label="申请日期" width="100"></el-table-column>
        <el-table-column prop="AppointmentDate" label="预约日期" width="100"></el-table-column>
        <!-- <el-table-column prop="ClinicTime" label="预约时间" width="100"></el-table-column> -->
        <el-table-column prop="PatientName" label="居民姓名" width="80"> </el-table-column>
        <el-table-column prop="PatientPhone" label="病人联系方式" width="100"></el-table-column>
        <el-table-column prop="ApplyHospitalName" label="送转医院" width="120"></el-table-column>
        <el-table-column prop="AppointmentHospitalName" label="预约医院 " width="120"> </el-table-column>
        <el-table-column prop="ExaminationItemName" label="检查项目名称 " width="180"></el-table-column>
        <!-- <el-table-column prop="ExaminationDeviceName" label="检查设备名称 " width="180"></el-table-column> -->
        <!-- <el-table-column prop="ExaminationDeviceAddress" label="检查设备地点 " width="180"></el-table-column> -->
        <el-table-column prop="AppointmentStateText" label="进度状态" width="100"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <span class="check_btn el-icon-ts-serch" @click='ondetail1(scope.row.Id,scope.row.ApplyHospitalName)'>查看详情</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 转入门诊 -->
      <el-table :data="tableData2" stripe style="width: 100%" highlight-current-row v-show='table_show==2'>
        <el-table-column type="index" label="序号" width="65"> </el-table-column>
        <!-- <el-table-column prop="TransferNo" label="预约号" width="100"></el-table-column> -->
        <el-table-column prop="CreateDate" label="转诊日期" width="100"></el-table-column>
        <el-table-column prop="AppointmentDate" label="预约就诊日期" width="100"></el-table-column>
        <!-- <el-table-column prop="RegNo" label="预约就诊序号" width="100"></el-table-column> -->
        <el-table-column prop="PatientName" label="居民姓名" width="80"> </el-table-column>
        <el-table-column prop="PatientPhone" label="病人联系方式" width="100"></el-table-column>
        <el-table-column prop="ApplyHospitalName" label="送转医院" width="120"></el-table-column>
        <el-table-column prop="ApplyDoctorName" label="送转医生 " width="120"> </el-table-column>
        <el-table-column prop="AppointmentHospitalName" label="接诊医院 " width="180"></el-table-column>
        <el-table-column prop="AppointmentSectionName" label="接诊科室 " width="180"></el-table-column>
        <el-table-column prop="AppointmentDoctorName" label="接诊医生 " width="180"></el-table-column>
        <el-table-column prop="AppointmentStateText" label="进度状态" width="100"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <span class="check_btn el-icon-ts-serch" @click='ondetail(scope.row.Id,scope.row.ApplyHospitalName,scope.row.PatientName,scope.row.AppointmentStateText)'>查看详情</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 弹框转入检验检查 -->
      <el-dialog :title="diaTitle1" :visible.sync="dialogVisible1" center class="mymzDial" ref="printContent1">
        <el-breadcrumb-item>送转信息</el-breadcrumb-item>
        <el-form v-model="mzDetails" label-width="100px" class="clearfix worddisplay">
          <el-row>
            <el-col :span='12'>
              <el-form-item label="预约号：">{{mzDetails.TransferNo}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="预约序号：">{{mzDetails.RegNo}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="预约医院：">{{mzDetails.AppointmentHospitalName}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="预约日期：">{{mzDetails.AppointmentDate}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="就诊时间：">{{mzDetails.ClinicTime}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="检查单号：">{{mzDetails.ExaminationNo}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="检查项目：">{{mzDetails.ExaminationItemName}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="检查设备：">{{mzDetails.ExaminationDeviceName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="检查地址：">{{mzDetails.ExaminationDeviceAddress}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="送转医院：">{{mzDetails.ApplyHospitalName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="送转科室：">{{mzDetails.ApplySectionName}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="送转医生：">{{mzDetails.ApplyDoctorName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="联系电话：">{{mzDetails.ApplyDoctorPhone}}</el-form-item>
            </el-col>
          </el-row>
          <el-breadcrumb-item>患者信息</el-breadcrumb-item>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="患者姓名：">{{mzDetails.PatientName}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="性别：">{{mzDetails.PatientSex==1?'男':'女'}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="证件号码：">{{mzDetails.PatientCardId}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="年龄：">{{mzDetails.PatientAge}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="联系方式：">{{mzDetails.PatientPhone}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="地址：">{{mzDetails.PatientAddress}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <el-form-item label="初步诊断：" style="width:100%">{{mzDetails.PatientDiagnose}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>            
            <el-col :span='24'>
              <el-form-item label="病情描述：" style="width:100%">{{mzDetails.PatientCondition}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <el-form-item label="病情体征：" style="width:100%">{{mzDetails.PatientComplaint}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <el-form-item label="检查检验：" style="width:100%">{{mzDetails.InspectionDetail}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <h4>温馨提示</h4>
        <div style="margin-bottom: 20px;">
          <p class="mzzz-tip">1.凭此检查单，携带本人身份证或医保卡于检查当日到缴费；</p>
          <p class="mzzz-tip">2.请在就诊开始时间前缴费，取消预约请在前一天24点前联系送转医院；</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="printBtn1">打 印</el-button>
        </span>
      </el-dialog>
      <!-- 弹框转入门诊 -->
      <el-dialog :title="diaTitle" :visible.sync="dialogVisible" center class="mymzDial" ref="printContent">
        <el-breadcrumb-item>送转信息</el-breadcrumb-item>
        <el-form v-model="mzDetails" label-width="100px" class="clearfix worddisplay">
          <el-row>
            <el-col :span='12'>
              <el-form-item label="预约号：">{{mzDetails.TransferNo}}</el-form-item>
            </el-col>
            <<!-- el-col :span='12'>
              <el-form-item label="预约序号：">{{mzDetails.RegNo}}</el-form-item>
            </el-col> -->
            <el-col :span='12'>
              <el-form-item label="预约医院：">{{mzDetails.AppointmentHospitalName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="预约科室：">{{mzDetails.AppointmentSectionName}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="预约专家：">{{mzDetails.AppointmentDoctorName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="就诊时间：">{{mzDetails.AppointmentDate}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="就诊序号：">{{mzDetails.RegClass=="1"?"上午":"下午"}}/{{mzDetails.RegNo}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="送转医院：">{{mzDetails.ApplyHospitalName}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="送转科室：">{{mzDetails.ApplySectionName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="送转医生：">{{mzDetails.ApplyDoctorName}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="联系电话：">{{mzDetails.ApplyDoctorPhone}}</el-form-item>
            </el-col>
          </el-row>
          <el-breadcrumb-item>患者信息</el-breadcrumb-item>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="患者姓名：">{{mzDetails.PatientName}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="性别：">{{mzDetails.PatientSex==1?'男':'女'}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="证件号码：">{{mzDetails.PatientCardId}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="年龄：">{{mzDetails.PatientAge}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="联系方式：">{{mzDetails.PatientPhone}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="地址：">{{mzDetails.PatientAddress}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <el-form-item label="初步诊断：" style="width:100%">{{mzDetails.PatientDiagnose}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>            
            <el-col :span='24'>
              <el-form-item label="病情描述：" style="width:100%">{{mzDetails.PatientCondition}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <el-form-item label="病情体征：" style="width:100%">{{mzDetails.PatientComplaint}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <el-form-item label="检查检验：" style="width:100%">{{mzDetails.InspectionDetail}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <h4>温馨提示</h4>
        <div style="margin-bottom: 20px;">
          <p class="mzzz-tip">1.凭此预约单，携带本人身份证或就诊卡于就诊当日到门诊自助机或挂号收费窗口取号；</p>
          <p class="mzzz-tip">2.请在就诊开始时间前取号，取消预约请在前一天24点前联系送转医院；</p>
          <p class="mzzz-tip">3.如遇专家门诊时间改变，请关注手机短信通知或专家医院公布的门诊排班表；</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="printBtn">打 印</el-button>
        </span>
      </el-dialog>

      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import { mapGetters,mapActions } from 'vuex';
import {apiurl,linkUrl} from '../../service/api.js'
import axios from 'axios';
export default {
  name: 'table',
  data() {
    return {
      tabe_btn:['转出记录','转入检查检验','转入门诊'],
      num:0,//0 显示转出记录    1 转入检查检验 2 转入门诊
      table_show:0,
      tableData: [],
      tableData1: [],
      tableData2:[],
      currentPage: 1,  
      currentNum:10,   
      total:0,
      mzDetails: [],
      dialogVisible:false,
      diaTitle:'',
      dialogVisible1:false,
      diaTitle1:''
    };
  },
  computed: {
     ...mapGetters({
         idcard:'idcard',patientid:'patientid',token:'token',waitid:'waitid',waitstate:'waitstate'
      }),
  },
  mounted(){
    var self=this;
    self.set_idcard(self.idcard);
    axios.get(apiurl.GetTurnDownList, {
      params: {
        dPatientId:self.patientid,
        page:self.currentPage,
        rows:self.currentNum,
        token:self.token
      }      
    })
    .then(function (response) {
      console.log(response);
      var data=response.data.rows
      self.tableData=data;
      self.tableData.forEach(function(v,i){
        v.PatientSex==1?v.PatientSex='男':v.PatientSex='女'; 
        v.ApplyDateFormat=new Date(v.ApplyDateFormat).getFullYear()+'-'+((new Date(v.ApplyDateFormat).getMonth()+1)>10?(new Date(v.ApplyDateFormat).getMonth()+1):'0'+(new Date(v.ApplyDateFormat).getMonth()+1))+'-'+((new Date(v.ApplyDateFormat).getDate())>10?(new Date(v.ApplyDateFormat).getDate()):'0'+(new Date(v.ApplyDateFormat).getDate()));
        console.log(v.ApplyDateFormat)
      })
      self.total=response.data.total;
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    ...mapActions([
      'set_idcard','set_patientid','set_waitid','set_waitstate'
    ]),
    addtransfer(){
      this.$router.push('/turnout/add/addtransfer');
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleSizeChange(val) {
      var self=this;
      self.currentNum=val;
      self.jkdata(self.table_show)
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {  
      var self=this;    
      self.currentPage=val;
      self.jkdata(self.table_show)
      console.log(val);
    },
    jkdata(index){
      var self=this;
      console.log(index,'index')
      if(index==2){
        axios.get(apiurl.GetTurnOnMZList, {
          params: {
            dPatientSfz:self.idcard,
            page:self.currentPage,
            rows:self.currentNum,
            token:self.token
          }      
        })
        .then(function (response) {
          var data=response.data.rows
          self.tableData2=data;
        })
        .catch(function (error) {
          console.log(error);
        });
      }else if(index==1){
        axios.get(apiurl.GetTurnOnJCList, {
          params: {
            dPatientSfz:self.idcard,
            page:self.currentPage,
            rows:self.currentNum,
            token:self.token
          }      
        })
        .then(function (response) {
          var data=response.data.rows
          self.tableData1=data;
          self.total=response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        axios.get(apiurl.GetTurnDownList, {
          params: {
            dPatientId:self.patientid,
            page:self.currentPage,
            rows:self.currentNum,
            token:self.token
          }      
        })
        .then(function (response) {
          console.log(response);
          var data=response.data.rows
          self.tableData=data;
          self.tableData.forEach(function(v,i){
            v.PatientSex==1?v.PatientSex='男':v.PatientSex='女'; 
            v.ApplyDateFormat=new Date(v.ApplyDateFormat).getFullYear()+'-'+((new Date(v.ApplyDateFormat).getMonth()+1)>10?(new Date(v.ApplyDateFormat).getMonth()+1):'0'+(new Date(v.ApplyDateFormat).getMonth()+1))+'-'+((new Date(v.ApplyDateFormat).getDate())>10?(new Date(v.ApplyDateFormat).getDate()):'0'+(new Date(v.ApplyDateFormat).getDate()));
            console.log(v.ApplyDateFormat)
            self.total=response.data.total;
          })
          
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    tabclick(index){
      var self=this;
      self.num = index;
      self.table_show=self.num;
      console.log(self.table_show==1?self.idcard:self.patientid)
      self.jkdata(self.table_show)      
    },
    //转入检验检查
    ondetail(id,hosName) {
      var self=this;
      self.dialogVisible = true;
      self.diaTitle = hosName + '  转诊单';
      axios.get(apiurl.GetTurnOnDetail, {
        params:{
          ttb_id: id,
          token: self.token
        }        
      }).then(d => {
        console.log(id,d)
        this.mzDetails = d.data.extra;
        console.log(this.mzDetails)
      })
    },
    //转入门诊弹窗详情
    ondetail1(id,hosName) {
      var self=this;
      self.dialogVisible1 = true;
      self.diaTitle1 = hosName + '  转诊单';
      axios.get(apiurl.GetTurnOnDetail, {
        params:{
          ttb_id: id,
          token: self.token
        }        
      }).then(d => {
        console.log(id,d)
        this.mzDetails = d.data.extra;
        console.log(this.mzDetails)
      })
    },
    //打印
    printBtn1() {
      var self = this;  
      self.dialogVisible = false;  
      $(".dialog-footer").hide();    
      let newWindow = window.open("_blank");   //打开新窗口
      let codestr = self.$refs.printContent1.$el.innerHTML;   //获取需要生成pdf页面的div代码
      newWindow.document.write(`<style>
        .el-row,el-col{border-box;overflow:hidden}
        .el-col-12 {float:left;width: 49%;overflow:hidden}
        h2 {font-size: 18px;text-align: center;font-weight: 500;margin-top: 60px;}
        .el-breadcrumb__item{display:block; height: 44px; width: 100%; line-height: 44px; margin-bottom: 10px; margin-top: 20px; border-bottom:1px solid black;clear:both;}
        .el-form-item {float:left;display:inline-block;padding-right: 10px; box-sizing:border-box;overflow:hidden; }
        .el-form-item__label{float:left;width:100px;text-align: right;vertical-align: middle;font-size: 16px;line-height: 1; padding: 11px 12px 11px 0;box-sizing: border-box;}
        .el-form-item__content {line-height: 20px;font-size: 14px;margin-top: 10px;}</style>`
      );
      newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
      newWindow.document.close();     //关闭document的输出流, 显示选定的数据
      newWindow.print();   //打印当前窗口
      console.log(self.$refs.printContent1)
      newWindow.close();
      $(".dialog-footer").show();   
      return true;
    },
    printBtn() {
      var self = this;  
      self.dialogVisible = false;   
      $(".dialog-footer").hide();   
      let newWindow = window.open("_blank");   //打开新窗口
      let codestr = self.$refs.printContent.$el.innerHTML;   //获取需要生成pdf页面的div代码
      newWindow.document.write(`<style>
        .el-row,el-col{border-box;overflow:hidden}
        .el-col-12 {float:left;width: 49%;overflow:hidden}
        h2 {font-size: 18px;text-align: center;font-weight: 500;margin-top: 60px;}
        .el-breadcrumb__item{display:block; height: 44px; width: 100%; line-height: 44px; margin-bottom: 10px; margin-top: 20px; border-bottom:1px solid black;clear:both;}
        .el-form-item {float:left;display:inline-block;padding-right: 10px; box-sizing:border-box;overflow:hidden; }
        .el-form-item__label{float:left;width:100px;text-align: right;vertical-align: middle;font-size: 16px;line-height: 1; padding: 11px 12px 11px 0;box-sizing: border-box;}
        .el-form-item__content {line-height: 20px;font-size: 14px;margin-top: 10px;}
        .el-dialog__footer{display:none;}</style>`
      );
      newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
      newWindow.document.close();     //关闭document的输出流, 显示选定的数据
      newWindow.print();   //打印当前窗口
      console.log(self.$refs.printContent)
      newWindow.close();
      $(".dialog-footer").show();   
      return true;
    },
    checkdetail(waitid,waitstate,name,zttext){
      var self=this;
      self.set_waitid(waitid);
      self.set_waitstate(waitstate);
      var param = {};
      param.method = "addTab";
      param.title = name + '-' + zttext;
      param.url = linkUrl + 'invaliddetail/invaliddetail?token='+self.token+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push('/invaliddetail/invaliddetail');
      console.log(self.waitstate)
    }
  }
};
</script>

<style lang="scss" scoped>
  *{
    font-size: 12px;
  }  
  .tab_k{
    .tab_ul{
      border: 1px solid #ddd;
      border-radius:5px ;
      width: 278px;
      padding-left: 0;
      .tab_li{
        width: 92px;
        height: 30px;
        float: left;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        border-radius:0 5px 5px  0;
        font-size: 14px;
      }
      .tab_li:first-child{
        border-radius:5px 0 0 5px ;
      }
      .tab_li.active{
        background: #3987CC;
        color: #fff;
      }
    }
  }
  .displayshow{
    display: block;
  }
  .displaynone{
    display: none;
  }
  .check_btn,.cancel_btn,.angin_btn{
    font-size: 12px;
    color: #539CDB;
    cursor: pointer;
  }
  .main-wrap{
    padding: 0;
  }
  .el-date-editor--daterange.el-input{
    width: 200px;
  }
  .wrapper-datepicker {
    .el-form-item{
      width: auto;
    }
    .demonstration {
      display: inline-block;
      width: 65px;
      margin-right: 20px;
      text-align: right;
    }
    .select_option{
      width: 200px;
      height: 34px;
    }
    // .el-date-editor{
    //   .el-input__icon{
    //     left:0;
    //   }
    // }  
    // .el-input__inner{
    //   padding-left: 35px;
    //   padding-right: 0;
    // }
    .el-table th {
      background-color: #FFFFFF !important;
    }

    .el-table__footer-wrapper thead div,
    .el-table__header-wrapper thead div {
      background-color: #FFFFFF !important;
    }

    .el-table tr {
      background-color: #F7F7F7 !important;
    }

    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background: #FFFFFF none repeat scroll 0 0 padding-box;
    }
    // 分页
    .tag_text1 b,.tag_text2 b,.tag_text3 b{
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
      margin-left: 5px;
    }
    .tag_text1 b{
      background: #539CDB;
    }
    .tag_text2 b{
      background: #58B957;
    }
    .tag_text3 b{
      background: #455667;
    }
    .pag-ul {
      padding: 0;
      list-style: none;
      overflow: hidden;
      .pag-li {
        text-align: center;
        float: left;
        width: 50%;
      }
    }
    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 14px;
      line-height: 44px;
      margin-bottom: 10px;
    }
    .block {
      padding-left: 185px;
      margin-bottom: 60px;
    }
    .block-add {
      margin-top: 16px;
    }
    .el-pagination{
      text-align: right;
      margin-top: 50px;
    }
    .el-pagination__sizes{
      margin-left: 20px;
    }
  }
</style>

            