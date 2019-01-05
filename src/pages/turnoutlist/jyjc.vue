<template>
  <div class="ts-content wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" v-model="form" label-width="85px" class="clearfix">
        <el-row>
          <el-col :span="6">
            <el-form-item label="申请日期">
              <el-date-picker v-model="datavalue1" type="daterange" align="right" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="送转医院">
              <el-input v-model="applyHos" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="患者姓名">
              <el-input v-model="form.patientName" placeholder="请输入患者姓名" style='border-radion:0;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="预约状态">
              <el-select v-model="form.appointmentState" placeholder="请选择" clearable>
                <el-option v-for="item in applyStateOptions" :key="item.id" :label="item.text" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item class='no_margin_left widthauto'>
              <el-button type="primary" @click="GetTransferList">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="预约日期">
              <el-date-picker v-model="datavalue2" type="daterange" align="right" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预约医院">
              <el-select v-model="form.appointmentHospitalId" placeholder="请选择" clearable>
                <el-option v-for="item in appointHosOptions" :key="item.HospitalId" :label="item.HospitalName" :value="item.HospitalId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目名称">
              <el-input v-model="form.examinationItemName" placeholder="请输入项目名称" style='border-radion:0;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="设备名称">
              <el-input v-model="form.examinationDeviceName" placeholder="请输入设备名称" style='border-radion:0;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item class='no_margin_left widthauto'>
              <el-button @click="Clear">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row v-loading="loading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" slot="empty">
        <el-table-column type="index" label="编号" width="60"> </el-table-column>
        <!-- <el-table-column prop="TransferNo" label="预约号" width="80"> </el-table-column> -->
        <el-table-column prop="ApplyDateFormat" label="申请日期" width="105"> </el-table-column>
        <el-table-column prop="AppointmentDate" label="预约日期" width="110"> </el-table-column>
        <!-- <el-table-column prop="RegNo" label="预约就诊序号" width="110"> </el-table-column> -->
        <!-- <el-table-column prop="ExaminationId" label="检查单号" width="130"> </el-table-column> -->
        <!-- <el-table-column prop="ClinicTime" label="预约时间" width="100"> </el-table-column> -->
        <el-table-column prop="PatientName" label="病人姓名" width="90"> </el-table-column>
        <el-table-column prop="PatientPhone" label="联系方式" width="115"> </el-table-column>
        <!-- <el-table-column prop="ApplyHospitalName" label="送转医院" width="150"> </el-table-column> -->
        <el-table-column prop="AppointmentHospitalName" label="预约医院" width="150"> </el-table-column>
        <el-table-column prop="ExaminationItemName" label="检查项目名称" width="110"> </el-table-column>
        <el-table-column prop="ExaminationDeviceName" label="检查设备名称" width="110"></el-table-column>
        <!-- <el-table-column prop="ExaminationDeviceAddress" label="检查设备地点" width="110"> </el-table-column> -->
        <el-table-column prop="AppointmentStateText" label="状态" width="80"> </el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <span class="check_btn" @click="showDetail(scope.row.Id,scope.row.ApplyHospitalName)">查看详情</span><br>
            <span class="angin_btn" @click="cancle(scope.row.Id,scope.row.PatientName,scope.row.CreateDate)" v-if='scope.row.AppointmentState==1&&newdata<(new Date(scope.row.AppointmentDate).getTime())'>取消预约</span>
            <span class="angin_btn" @click="reApply(scope.row.PatientCardId)" v-if='scope.row.AppointmentState==2||scope.row.AppointmentState==3'>重新预约</span>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="diaTitle" :visible.sync="dialogVisible" center class="mymzDial" ref="printContent">
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
              <el-form-item label="就诊日期：">{{mzDetails.AppointmentDate}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <el-form-item label="就诊时间：">{{mzDetails.ClinicTime}}</el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="检查单号：">{{mzDetails.ExaminationId}}</el-form-item>
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
              <el-form-item label="性别：">{{mzDetails.PatientSex}}</el-form-item>
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
              <el-form-item label="地址：">{{mzDetails.Address}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <el-form-item label="初步诊断：" style="width:100%">{{mzDetails.Diagnose}}</el-form-item>
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
              <el-form-item label="检验检查：" style="width:100%">{{mzDetails.OthersRemark}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <h4>温馨提示</h4>
        <div style="margin-bottom: 20px;" class="tipsDiv">
          <p class="mzzz-tip">1.凭此检查单，携带本人身份证或医保卡于检查当日到缴费；</p>
          <p class="mzzz-tip">2.请在就诊开始时间前缴费，取消预约请在前一天24点前联系送转医院；</p>
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
import axion from '@/util/http_url.js'
import { apiurl,linkUrl } from '../../service/api.js';
const _currentToken = localStorage.getItem('tokenL'); //f0149dc9861d4028b580b644499b95e4
const _curHosName = localStorage.getItem('hosptialnameL');
const _curHosId = localStorage.getItem('hosptialidL');
export default {
  name: 'table',
  data() {
    return {
      dialogVisible: false,
      mzDetails: [],
      diaTitle: "",
      tableData: [],
      currentPage: 1,
      currentNum: 10,
      total: 0,
      datavalue1: '',
      datavalue2: '',
      applyHos: _curHosName.substring(1, _curHosName.length - 1),
      applyStateOptions: [],
      applyHosOptions: [],
      appointHosOptions: [],
      form: {
        patientName: '',
        applyHospitalId: _curHosId,
        appointmentHospitalId: '',
        appointmentSectionId: '',
        appointmentDoctorId: '',
        examinationItemName: '',
        examinationDeviceName: '',
        createDateStart: '',
        createDateEnd: '',
        appointmentDateStart: '',
        appointmentDateEnd: '',
        page: 1,
        appointmentType: '2',
        rows: 10,
        appointmentState: '',
        token: _currentToken,
        RollInRollOutType: 2
      },
      newdata: '',
      loading: true
    };
  },
  mounted() {
    this.GetTransferList()
    this.GetCheckState()
    this.GetIsAppointmentHigherHospitalList();
    this.newdata = new Date().getTime()
  },
  methods: {
    handleSizeChange(val) {
      var self = this;
      self.currentNum = val;
      self.GetTransferList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.GetTransferList();
      console.log(`当前页: ${val}`);
    },
    GetTransferList() {
      this.form.page = this.currentPage
      this.form.rows = this.currentNum
      if (this.datavalue1 != '') {
        this.form.createDateStart = this.datavalue1[0];
        this.form.createDateEnd = this.datavalue1[1];
      }
      if (this.datavalue2 != '') {
        this.form.appointmentDateStart = this.datavalue2[0];
        this.form.appointmentDateEnd = this.datavalue2[1];
      }
      axion.GetTransferList(this.form).then(d => {
        this.tableData = d.data.rows;
        this.total = d.data.total;
        if (this.total > 0 || this.total == 0 || d.data.suc == false) {
          this.loading = false;
        }
      })
    },
    GetCheckState() {
      axion.GetCheckState().then(d => {
        this.applyStateOptions = d.data.rows;
      })
    },
    Clear() {
      this.form.patientName = '';
      this.form.appointmentHospitalId = '';
      this.form.appointmentSectionId = '';
      this.form.appointmentDoctorId = '';
      this.form.examinationItemName = '';
      this.form.examinationDeviceName = '';
      this.form.createDateStart = '';
      this.form.createDateEnd = '';
      this.form.appointmentDateStart = '';
      this.form.appointmentDateEnd = '';
      this.form.appointmentState = '';
      this.datavalue1 = '';
      this.datavalue2 = '';
    },
    GetIsAppointmentHigherHospitalList() {
      axion.GetIsAppointmentHigherHospitalList({
        token: _currentToken
      }).then(d => {
        this.appointHosOptions = d.data.rows;
      })
    },
    cancle(id, name, date) {
      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('p', null, '取消' + name + date + '的预约申请？')
        ]),
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            done();
            console.log(id)
            axion.CancelInspectAppointment({
              transferId: id,
              token: _currentToken
            }).then(res => {
              if (res.data.suc == true) {
                this.$message({
                  type: 'success',
                  message: res.data.mes
                });
                this.GetTransferList()
              } else {
                this.$alert(res.data.mes, '提示', )
              }
            })
          } else {
            done();
          }
        }
      }).then(action => {

      });
    },
    showDetail(id, hosName) {
      $(".dialog-footer").show();
      this.dialogVisible = true;
      this.diaTitle = hosName + '  转诊单';
      axion.GetInspectAppointment({
        transferId: id,
        token: _currentToken
      }).then(d => {
        this.mzDetails = d.data.extra;
      })
    },
    //打印
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
        h4,.tipsDiv{display:block;float:left; width:100%}</style>`);
      newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
      newWindow.document.close();     //关闭document的输出流, 显示选定的数据
      newWindow.print();   //打印当前窗口
      console.log(self.$refs.printContent)
      newWindow.close();
      return true;
    },
    //重新预约
    reApply(cardId) {
      var param = {};
      param.method = "addTab";
      param.title = '检查检验列表';
      param.url = linkUrl + 'sign-person-list/yyjyjcsr?token=' + _currentToken + '&id=' + cardId +'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
    }
  }
};
</script>
            