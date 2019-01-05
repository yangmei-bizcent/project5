<template>
  <div class="ts-content wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="85px" class="clearfix">
        <el-row>
          <el-col :span='6'>
            <el-form-item label="申请日期">
              <el-date-picker v-model="form.datavalue1" type="daterange" align="right" placeholder="选择日期范围" :picker-options="form.pickerOptions1" range-separator="至">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item label="送转医院">
              <el-select v-model="form.hosi" placeholder="请选择" clearable>
                <el-option v-for="item in form.zzhosi" :key="item.HospitalId" :label="item.HospitalName" :value="item.HospitalId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item label="患者姓名">
              <el-input v-model="form.PatientName" placeholder="请输入患者姓名" style='border-radion:0;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='5'>
            <el-form-item label="预约状态">
              <el-select v-model="form.tagvalue" placeholder="请选择" clearable>
                <el-option v-for="item in form.yytag" :key="item.id" :label="item.text" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='1'>
            <el-form-item class='widthauto no_margin_left'>
              <el-button type="primary" @click='check_btn()'>查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='6'>
            <el-form-item label="预约日期">
              <el-date-picker v-model="form.datavalue2" type="daterange" align="right" placeholder="选择日期范围" :picker-options="form.pickerOptions1" range-separator="至">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item label="预约医院">
              <el-select v-model="form.yyhosivalue" placeholder="请选择" disabled>
                <el-option v-for="item in form.yyhosi" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item label="项目名称">
              <el-input v-model="form.projectName" placeholder="请输入" style='border-radion:0;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='5'>
            <el-form-item label="设备名称">
              <el-input v-model="form.deviceName" placeholder="请输入" style='border-radion:0;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='1'>
            <el-form-item class='no_margin_left widthauto'>
              <el-button @click='clearinput()'>清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="tableCurrentChange">
        <el-table-column type="index" label="编号" width="65"> </el-table-column>
        <!-- <el-table-column prop="TransferNo" label="预约号" width="100"> </el-table-column> -->
        <el-table-column prop="CreateDate" label="申请日期" width="140"> </el-table-column>
        <el-table-column prop="AppointmentDate" label="预约日期" width="140"> </el-table-column>
        <!-- <el-table-column prop="RegNo" label="预约就诊序号" width="140"> </el-table-column> -->
        <!-- <el-table-column prop="ExaminationId" label="检查单号" width="100"> </el-table-column> -->
        <el-table-column prop="PatientName" label="居民姓名" width="100"> </el-table-column>
        <el-table-column prop="PatientPhone" label="联系方式" width="140"> </el-table-column>
        <el-table-column prop="ApplyHospitalName" label="送转机构" width="100"> </el-table-column>
        <!-- <el-table-column prop="AppointmentHospitalName" label="预约医院" width="180"> </el-table-column> -->
        <el-table-column prop="ExaminationItemName" label="检查项目名称" width="140"> </el-table-column>
        <el-table-column prop="ExaminationDeviceName" label="检查设备名称" width="140"> </el-table-column>
        <!-- <el-table-column prop="ExaminationDeviceAddress" label="检查设备地址" width="140"> </el-table-column> -->
        <el-table-column prop="AppointmentStateText" label="状态" width="65"> </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <span class="check_btn el-icon-ts-serch" @click="checkdetail(scope.row.Id)">查看详情</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
      
      <el-dialog :title="tankuangdata.ApplyHospitalName+'转诊单'" :visible.sync="dialogFormVisible" ref="printContent" class='mymzDial'>
        <el-breadcrumb-item>送转信息</el-breadcrumb-item>
          <el-form v-model="tankuangdata" label-width="100px" class="clearfix worddisplay">
            <el-row>
              <el-col :span='12'>
                <el-form-item label="预约号：">{{tankuangdata.TransferNo}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="预约序号：">{{tankuangdata.RegNo}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="预约医院：">{{tankuangdata.AppointmentHospitalName}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="预约日期：">{{tankuangdata.AppointmentDate}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="就诊时间：">{{tankuangdata.ClinicTime}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="检查单号：">{{tankuangdata.ExaminationId}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="检查项目：">{{tankuangdata.ExaminationItemName}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="检查设备：">{{tankuangdata.ExaminationDeviceName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="检查地址：">{{tankuangdata.ExaminationDeviceAddress}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="联系电话：">{{tankuangdata.PatientPhone}}</el-form-item>
              </el-col>
            </el-row>
            <el-breadcrumb-item>病人信息</el-breadcrumb-item>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="性别：">{{tankuangdata.PatientName}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="性别：">{{tankuangdata.PatientSex}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="证件号码：">{{tankuangdata.PatientCardId}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="年龄：">{{tankuangdata.PatientAge}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="联系电话：">{{tankuangdata.PatientPhone}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="地址：">{{tankuangdata.Address}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <el-form-item label="初步诊断：">{{tankuangdata.Diagnose}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <el-form-item label="病情描述：">{{tankuangdata.PatientCondition}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <el-form-item label="病情体征：">{{tankuangdata.PatientComplaint}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <el-form-item label="检验检查：">{{tankuangdata.OthersRemark}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-breadcrumb-item>温馨提示</el-breadcrumb-item>
          <div class="con_ul clearfix">
            <div class="con_li" style="width:100%;">
              <span class="con_title" style="display:block">1.凭此检查单，携带本人身份证或医保卡于检查当日到缴费；</span>
              <span class="con_con">2.请在就诊开始时间前缴费，取消预约请在前一天24点前联系送转医院；</span>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="printBtn">打印</el-button>
          </div>
      </el-dialog>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import { mapGetters, mapActions } from 'vuex';
import { apiurl } from '../../service/api.js';
import axios from 'axios';
export default {
  name: 'table',
  data() {
    return {
      tankuangdata: [],
      tableData: [],
      ApplyHospitalId: '',//发起转诊申请医院
      AppointmentHospitalId: '',//被转诊申请医院
      AppointmentSectionId: '',//被转诊申请科室
      AppointmentDoctorId: '',//被转诊申请医生
      ExaminationItemName: '',//项目名称
      ExaminationDeviceName: '',//设备名称
      CreateDateStart: '',//发起转诊开始时间
      CreateDateEnd: '',//发起转诊结束时间
      AppointmentDateStart: '',//申请的转诊日期开始时间
      AppointmentDateEnd: '',//申请的转诊日期结束时间
      currentPage: 1,  //页码
      currentNum: 10,   //每页数量
      total: 0,
      AppointmentState: -1,
      form: {
        zzhosi: [],//送转医院
        yytag: [],//预约状态
        projectName: '',
        yyhosi: [],//预约医院
        xmname: [],
        sbname: [],
        hosi: '',
        PatientName: '',
        deviceName: '',
        tagvalue: '',
        yyhosivalue: '',
        xmvalue: '',
        sbnamevalue: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        datavalue1: '',
        pickerOptions1: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        datavalue2: ''
      },
      rules: {
        input5: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: this.checkWord, trigger: 'blur' }
        ]
      },
      newdatavalue: '',
      dialogFormVisible: false,
      form1: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    };
  },
  computed: {
    ...mapGetters({
      hosptialid: 'hosptialid', hosptialname: 'hosptialname', token: 'token'
    }),
  },
  mounted() {
    var self = this;
    self.form.yyhosivalue = self.hosptialname;
    self.GetCheckState();
    // 送转医院
    axios.get(apiurl.GetIsCheckTransferCommunityHospitalList, {
      params: {
        token: self.token
      }
    })
      .then(function(response) {
        var data = response.data.rows;
        self.form.zzhosi = data;
        console.log(self.form.zzhosi)
      })
      .catch(function(error) {
        console.log(error);
      });
    // 检验检查记录
    axios.get(apiurl.GetTransferList, {
      params: {
        PatientName: self.form.PatientName,//患者姓名
        ApplyHospitalId: self.form.hosi,//送转医院
        // AppointmentHospitalId:self.hosptialid,//接诊医院
        AppointmentHospitalId: self.form.yyhosivalue,
        AppointmentSectionId: '',//接诊科室
        AppointmentDoctorId: '',//接诊医生
        ExaminationItemName: self.form.projectName,
        ExaminationDeviceName: self.form.deviceName,
        CreateDateStart: '',
        CreateDateEnd: '',
        AppointmentDateStart: self.AppointmentDate,
        AppointmentDateEnd: self.AppointmentDate1,
        page: self.currentPage,
        rows: self.currentNum,
        AppointmentType: 2,//1门诊转诊 2检查转诊
        AppointmentState: self.form.tagvalue,//1成功2失败3取消
        token: self.token,
        RollInRollOutType: 1
      }
    })
      .then(function(response) {
        var data = response.data.rows;
        self.tableData = data;
        self.total = response.data.total;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    ...mapActions([
      'set_hosptialid', 'set_hosptialname'
    ]),
    //状态接口
    GetCheckState(){
      var self=this;
      axios.get(apiurl.GetCheckState, {
        
      })
      .then(function(response) {
        var data = response.data.rows;
        self.form.yytag = data;
        console.log(data)
      })
      .catch(function(error) {
        console.log(error);
      });
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
        .el-form-item__content {line-height: 20px;font-size: 14px;margin-top: 10px;}</style>`
      );
      newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
      newWindow.document.close();     //关闭document的输出流, 显示选定的数据
      newWindow.print();   //打印当前窗口
      console.log(self.$refs.printContent)
      newWindow.close();
      $(".dialog-footer").show();
      return true;
    },
    checkdetail(id) {
      var self = this;
      self.dialogFormVisible = true;
      axios.get(apiurl.GetInspectAppointment, {
        params: {
          transferId: id,
          token: self.token
        }
      })
        .then(function(response) {
          self.tankuangdata = response.data.extra;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    tableCurrentChange(val) {
      this.currentRow = val;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleSizeChange(val) {
      var self = this;
      self.currentNum = val;
      self.check_btn();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.check_btn();
      console.log(`当前页: ${val}`);
    },
    tableDatajk(CreateDate, CreateDate1, AppointmentDate, AppointmentDate1) {
      var self = this;
      axios.get(apiurl.GetTransferList, {
        params: {
          PatientName: self.form.PatientName,//患者姓名
          ApplyHospitalId: self.form.hosi,//送转医院
          // AppointmentHospitalId:self.hosptialid,//接诊医院
          AppointmentHospitalId: '',
          AppointmentSectionId: '',//接诊科室
          AppointmentDoctorId: '',//接诊医生
          ExaminationItemName: self.form.projectName,//项目名称
          ExaminationDeviceName: self.form.deviceName,//设备名称
          CreateDateStart: CreateDate,
          CreateDateEnd: CreateDate1,
          AppointmentDateStart: AppointmentDate,
          AppointmentDateEnd: AppointmentDate1,
          page: self.currentPage,
          rows: self.currentNum,
          AppointmentType: 2,//1门诊转诊 2检查转诊
          AppointmentState: self.form.tagvalue,//1成功2失败3取消
          token: self.token
        }
      })
        .then(function(response) {
          var data = response.data.rows;
          self.tableData = data;
          self.total = response.data.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    check_btn() {
      var self = this;
      // 转诊日期开始
      self.CreateDate = new Date(self.form.datavalue1[0]).getFullYear() + '-' + ((new Date(self.form.datavalue1[0]).getMonth() + 1) > 10 ? (new Date(self.form.datavalue1[0]).getMonth() + 1) : '0' + (new Date(self.form.datavalue1[0]).getMonth() + 1)) + '-' + ((new Date(self.form.datavalue1[0]).getDate()) > 10 ? (new Date(self.form.datavalue1[0]).getDate()) : '0' + (new Date(self.form.datavalue1[0]).getDate()));
      // 转诊日期结束
      self.CreateDate1 = new Date(self.form.datavalue1[1]).getFullYear() + '-' + ((new Date(self.form.datavalue1[1]).getMonth() + 1) > 10 ? (new Date(self.form.datavalue1[1]).getMonth() + 1) : '0' + (new Date(self.form.datavalue1[1]).getMonth() + 1)) + '-' + ((new Date(self.form.datavalue1[1]).getDate()) > 10 ? (new Date(self.form.datavalue1[1]).getDate()) : '0' + (new Date(self.form.datavalue1[1]).getDate()));
      // 就诊日期开始
      self.AppointmentDate = new Date(self.form.datavalue2[0]).getFullYear() + '-' + ((new Date(self.form.datavalue2[0]).getMonth() + 1) > 10 ? (new Date(self.form.datavalue2[0]).getMonth() + 1) : '0' + (new Date(self.form.datavalue2[0]).getMonth() + 1)) + '-' + ((new Date(self.form.datavalue2[0]).getDate()) > 10 ? (new Date(self.form.datavalue2[0]).getDate()) : '0' + (new Date(self.form.datavalue2[0]).getDate()));
      // 就诊日期结束     
      self.AppointmentDate1 = new Date(self.form.datavalue2[1]).getFullYear() + '-' + ((new Date(self.form.datavalue2[1]).getMonth() + 1) > 10 ? (new Date(self.form.datavalue2[1]).getMonth() + 1) : '0' + (new Date(self.form.datavalue2[1]).getMonth() + 1)) + '-' + ((new Date(self.form.datavalue2[1]).getDate()) > 10 ? (new Date(self.form.datavalue2[1]).getDate()) : '0' + (new Date(self.form.datavalue2[1]).getDate()));
      self.CreateDate !== 'NaN-0NaN-0NaN' ? self.CreateDate : self.CreateDate = '';
      self.CreateDate1 !== 'NaN-0NaN-0NaN' ? self.CreateDate1 : self.CreateDate1 = '';
      self.AppointmentDate !== 'NaN-0NaN-0NaN' ? self.AppointmentDate : self.AppointmentDate = '';
      self.AppointmentDate1 !== 'NaN-0NaN-0NaN' ? self.AppointmentDate1 : self.AppointmentDate1 = '';
      self.tableDatajk(self.CreateDate, self.CreateDate1, self.AppointmentDate, self.AppointmentDate1)
      console.log(self.CreateDate, self.CreateDate1, self.AppointmentDate, self.AppointmentDate1)
    },
    //清空
    clearinput() {
      var self = this;
      self.PatientName = '';
      self.ApplyHospitalId = '';
      self.AppointmentHospitalId = '';
      self.AppointmentSectionId = '';
      self.AppointmentDoctorId = '';
      self.ExaminationItemName = '';
      self.ExaminationDeviceName = '';
      self.CreateDateStart = '';
      self.CreateDateEnd = '';
      self.AppointmentDateStart = '';
      self.AppointmentDateEnd = '';
      self.form.datavalue1 = '';
      self.form.hosi = '';
      self.form.PatientName = '';
      self.form.tagvalue = '';
      self.form.datavalue2 = '';
      self.form.projectName = '';
      self.form.jzksvalue = '';
      self.form.deviceName = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.con_li {
  width: 50%;
  float: left;
}

.check_btn,
.cancel_btn,
.angin_btn {
  font-size: 12px;
  color: #539CDB;
  cursor: pointer;
}

.main-wrap {
  padding: 0;
}

.el-date-editor--daterange.el-input {
  width: 100%;
}

.wrapper-datepicker {
  // .el-form-item{
  //   width: 22%;
  // }
  .demonstration {
    display: inline-block;
    width: 65px;
    margin-right: 20px;
    text-align: right;
  }
  .select_option {
    width: 200px;
    height: 34px;
  } // .el-date-editor{
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
    background: #539CDB;
  }
  .tag_text2 b {
    background: #58B957;
  }
  .tag_text3 b {
    background: #455667;
  } // 分页
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
  .el-pagination {
    text-align: right;
    margin-top: 50px;
  }
  .el-pagination__sizes {
    margin-left: 20px;
  }
}
</style>
            