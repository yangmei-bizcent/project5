<template>
  <div class="ts-content wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" v-model="form" label-width="85px" class="clearfix">
        <el-row>
          <el-col :span="6">
            <el-form-item label="转诊日期">
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
          <el-col :span='1'>
            <el-form-item class='no_margin_left widthauto'>
              <el-button type="primary" @click='GetTransferList'>查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="就诊日期">
              <el-date-picker v-model="datavalue2" type="daterange" align="right" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="接诊医院">
              <el-select v-model="form.appointmentHospitalId" placeholder="请选择" @change="GetSmallSectionByHospitalIdOutpatient" clearable>
                <el-option v-for="item in appointHosOptions" :key="item.HospitalId" :label="item.HospitalName" :value="item.HospitalId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="接诊科室">
              <el-select v-model="form.appointmentSectionId" placeholder="请选择" @change="GetSchedulingDoctorsBySectionID" clearable>
                <el-option v-for="item in appointSecOptions" :key="item.Id" :label="item.SectionName" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="接诊医生">
              <el-select v-model="form.appointmentDoctorId" placeholder="请选择" clearable>
                <el-option v-for="item in appointDocOptions" :key="item.Id" :label="item.DoctorName" :value="item.Id">
                </el-option>
              </el-select>
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
        <el-table-column prop="CreateDate" label="转诊日期" width="105"> </el-table-column>
        <el-table-column prop="AppointmentDate" label="预约就诊日期" width="110"> </el-table-column>
        <!-- <el-table-column prop="RegNo" label="预约序号" width="90"> </el-table-column> -->
        <el-table-column prop="PatientName" label="病人姓名" width="90"> </el-table-column>
        <el-table-column prop="PatientPhone" label="联系方式" width="115"> </el-table-column>
        <!-- <el-table-column prop="ApplyHospitalName" label="转诊机构" width="150"> </el-table-column> -->
        <el-table-column prop="ApplyDoctorName" label="送转医生" width="90"> </el-table-column>
        <el-table-column prop="AppointmentHospitalName" label="接诊医院" width="150"> </el-table-column>
        <el-table-column prop="AppointmentSectionName" label="接诊科室" width="120"></el-table-column>
        <el-table-column prop="AppointmentDoctorName" label="接诊医生" width="90"> </el-table-column>
        <el-table-column prop="AppointmentStateText" label="状态" width="80"> </el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <span class="check_btn" @click="showDetail(scope.row.Id,scope.row.ApplyHospitalName)">查看详情</span><br>
            <span class="angin_btn" @click="cancle(scope.row.Id,scope.row.PatientName,scope.row.AppointmentDate)" v-if='scope.row.AppointmentState==1&&newdata<(new Date(scope.row.AppointmentDate).getTime())'>取消预约</span>
            <span class="angin_btn" @click="reApply(scope.row.PatientCardId)" v-if='scope.row.AppointmentState==2||scope.row.AppointmentState==3||scope.row.AppointmentState==6'>重新预约</span>
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
              <el-form-item label="联系电话：">{{mzDetails.CreatePhone}}</el-form-item>
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
              <el-form-item label="地址：">{{mzDetails.DetailedAddress}}</el-form-item>
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
import axion from '@/util/http_url.js'
import { apiurl,linkUrl } from '../../service/api.js';
const _currentToken = localStorage.getItem('tokenL'); //f0149dc9861d4028b580b644499b95e4
// const _currentToken = '103481891fa468862331078e4eb75b53389'
const _curHosName = localStorage.getItem('hosptialnameL');
const _curHosId = localStorage.getItem('hosptialidL');
export default {
  name: 'table',
  data() {
    return {
      dialogVisible: false,
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
      appointSecOptions: [],
      appointDocOptions: [],
      mzDetails: [],
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
        appointmentType: '1',
        rows: 10,
        appointmentState: '',
        token: _currentToken,
        RollInRollOutType: 2
      },
      newdata: '',//当前时间
      loading: true
    };
  },
  mounted() {
    this.GetTransferList()
    this.GetOutpatientState()
    this.GetIsAppointmentHigherHospitalList()
    this.newdata = new Date().getTime();
  },
  methods: {
    handleSizeChange(val) {
      this.currentNum = val;
      this.GetTransferList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetTransferList();
      console.log(`当前页: ${val}`);
    },
    GetTransferList() {
      this.form.page = this.currentPage
      this.form.rows = this.currentNum
      console.log(this.datavalue1[0])
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
        console.log(d.data.suc)
        if (this.total > 0 || this.total == 0 || d.data.suc == false) {
          this.loading = false
        }
      })
    },
    GetOutpatientState() {
      axion.GetOutpatientState().then(d => {
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
      this.form.appointmentState = '',
        this.datavalue1 = '';
      this.datavalue2 = '';
      this.appointSecOptions = [];
      this.appointDocOptions = [];
    },
    GetIsAppointmentHigherHospitalList() {
      axion.GetIsAppointmentHigherHospitalList({
        token: _currentToken
      }).then(d => {
        this.appointHosOptions = d.data.rows;
      })
    },
    GetSmallSectionByHospitalIdOutpatient() {
      axion.GetSmallSectionByHospitalIdOutpatient({ 
        hospitalID: this.form.appointmentHospitalId,
        token: _currentToken
      }).then(d => {
        this.appointSecOptions = d.data.rows;
        this.form.appointmentSectionId = '';
        this.form.appointmentDoctorId = '';
      })
    },
    GetSchedulingDoctorsBySectionID() {
      if (this.form.appointmentSectionId != "") {
        axion.GetSchedulingDoctorsBySectionID({
          sectionId: this.form.appointmentSectionId,
          hospitalId: _curHosId,
          token: _currentToken
        }).then(d => {
          this.appointDocOptions = d.data.rows;
          this.form.appointmentDoctorId = '';
        })
      }
    },
    cancle(id, PatientName, AppointmentDate) {
      this.$confirm('取消' + PatientName + AppointmentDate + '的预约申请？', '提示', {
        confirmButtonText: '确定',
        concelButtonText: '取消',
        callback: action => {
          console.log(action)
          if (action === 'confirm') {
            axion.CancelAppointment({
              id: id,
              token: _currentToken
            }).then(d => {
              if (d.data.suc == true) {
                this.$message({
                  type: 'success',
                  message: d.data.mes
                });
                this.GetTransferList();
              }
            })
          } else {
          }

        }
      })
    },
    showDetail(id, hosName) {
      $(".dialog-footer").show();
      this.dialogVisible = true;
      this.diaTitle = hosName + '  转诊单';
      axion.GetOutPatientAppointmentView({
        id: id,
        token: _currentToken
      }).then(d => {
        this.mzDetails = d.data.extra;
      })
    },
    //打印
    printBtn() {
      var self = this;
      $(".dialog-footer").hide();
      self.dialogVisible = false;
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
         h4,.tipsDiv{display:block;float:left; width:100% }</style>`
      );
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
      param.title = '门诊转诊';
      param.url = linkUrl + 'sign-person-list/mzzzsqsr?token=' + _currentToken + '&id=' + cardId+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      console.log(cardId,'cancle')
      // this.$router.push({
      //   path: '/sign-person-list/mzzzsqsr',
      //   query: {
      //     id: cardId
      //   }
      // })
    }
  }
};
</script>
            