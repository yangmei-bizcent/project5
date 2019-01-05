<template>
  <div class="ts-content wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="85px" class="clearfix searchForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="转诊日期">
              <!-- <el-date-picker v-model="form.datavalue1" type="date" placeholder="选择日期"></el-date-picker> -->
              <el-date-picker v-model="form.datavalue1" type="daterange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="送转医院">
              <el-select v-model="form.hosi" placeholder="请选择" clearable>
                <el-option v-for="item in form.zzhosi" :key="item.HospitalId" :label="item.HospitalName" :value="item.HospitalId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="患者姓名">
              <el-input v-model="form.PatientName" placeholder="请输入患者姓名" style='border-radion:0;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="预约状态">
              <el-select v-model="form.tagvalue" placeholder="请选择" clearable>
                <el-option v-for="item in form.yytag" :key="item.id" :label="item.text" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='1'>
            <el-form-item class='no_margin_left widthauto'>
              <el-button type="primary" @click='check_btn()'>查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="就诊日期">
              <!-- <el-date-picker v-model="form.datavalue2" type="date" placeholder="选择日期"></el-date-picker> -->
              <el-date-picker v-model="form.datavalue2" type="daterange" align="right" placeholder="选择日期范围" :picker-options="form.pickerOptions1" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="接诊医院">
              <el-select v-model="form.jzhosivalue" placeholder="请选择" disabled>
                <el-option v-for="item in form.jzhosi" :key="item.Id" :label="item.label" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="接诊科室">
              <el-select v-model="form.jzksvalue" placeholder="请选择" @change='doctordata()' clearable>
                <el-option v-for="item in form.jzks" :key="item.Id" :label="item.SectionName" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="接诊医生">
              <el-select v-model="form.jzdoctvalue" placeholder="请选择" clearable>
                <el-option v-for="item in form.jzdoct" :key="item.Id" :label="item.DoctorName" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item class='no_margin_left widthauto'>
              <el-button @click='clearinput()'>清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
        <el-table-column type="index" label="编号" width="65"> </el-table-column>
        <!-- <el-table-column prop="TransferNo" label="预约号" width="100"> </el-table-column> -->
        <el-table-column prop="CreateDate" label="转诊日期" width="140"> </el-table-column>
        <el-table-column prop="AppointmentDate" label="预约就诊日期" width="140"> </el-table-column>
        <!-- <el-table-column prop="RegNo" label="预约就诊序号" width="140"> </el-table-column> -->
        <el-table-column prop="PatientName" label="居民姓名" width="100"> </el-table-column>
        <el-table-column prop="PatientPhone" label="联系方式" width="140"> </el-table-column>
        <!-- <el-table-column prop="ApplyHospitalName" label="转诊机构" width="100"> </el-table-column> -->
        <el-table-column prop="ApplyHospitalName" label="送转医院" width="160"></el-table-column>
        <!-- <el-table-column prop="AppointmentHospitalName" label="接诊机构" width="180"> </el-table-column> -->
        <el-table-column prop="AppointmentSectionName" label="接诊科室" width="140"></el-table-column>
        <el-table-column prop="AppointmentDoctorName" label="接诊医生" width="100"> </el-table-column>
        <el-table-column prop="AppointmentStateText" label="状态" width="80"></el-table-column>
        </el-table-column>
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
              <!-- <el-col :span='12'>
                <el-form-item label="预约序号：">{{mzDetails.RegNo}}</el-form-item>
              </el-col> -->
              <el-col :span='12'>
                <el-form-item label="预约医院：">{{tankuangdata.AppointmentHospitalName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="预约科室：">{{tankuangdata.AppointmentSectionName}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="预约专家：">{{tankuangdata.AppointmentDoctorName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="就诊时间：">{{tankuangdata.AppointmentDate}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="就诊序号：">{{tankuangdata.RegClass==1?"上午":"下午"}}/{{tankuangdata.RegNo}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="送转医院：">{{tankuangdata.ApplyHospitalName}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="送转科室：">{{tankuangdata.ApplySectionName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="送转医生：">{{tankuangdata.ApplyDoctorName}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="联系电话：">{{tankuangdata.CreatePhone}}</el-form-item>
              </el-col>
            </el-row>
            <el-breadcrumb-item>病人信息</el-breadcrumb-item>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="病人姓名：">{{tankuangdata.PatientName}}</el-form-item>
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
                <el-form-item label="地址：">{{tankuangdata.DetailedAddress}}</el-form-item>
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
              <p class="con_con">1.凭此预约单，携带本人身份证或就诊卡于就诊当日到门诊自助机或挂号收费窗口取号；</p>
              <p class="con_con">2.请在就诊开始时间前取号，取消预约请在前一天24点前联系送转医院；</p>
              <p class="con_con">3.如遇专家门诊时间改变，请关注手机短信通知或专家医院公布的门诊排班表；</p>
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
        zzhosi: [],
        yytag: [],
        jzhosi: [],
        jzks: [],
        jzdoct: [],
        hosi: '',
        PatientName: '',
        tagvalue: '',
        jzhosivalue: '',
        jzksvalue: '',
        jzdoctvalue: '',
        daterange: '',
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
        // datavalue2:[new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
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
    console.log(self.hosptialname)
    self.GetOutpatientState();
    self.form.jzhosivalue = self.hosptialname;
    console.log(self.hosptialid)
    self.form.AppointmentState = self.form.tagvalue;
    self.form.AppointmentState == '' ? self.form.AppointmentState = -1 : self.form.AppointmentState;
    // 送转医院
    axios.get(apiurl.GetIsAppointmentCommunityHospitalList, {
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
    //根据医院获取科室
    axios.get(apiurl.GetSectionByHospitalIdOutpatient, {
      params: {
        HospitalID: self.hosptialid,
        token: self.token
      }
    })
      .then(function(response) {
        var data = response.data.rows;
        self.form.jzks = data;
      })
      .catch(function(error) {
        console.log(error);
      }),
      // 门诊转诊记录
      axios.get(apiurl.GetTransferList, {
        params: {
          PatientName: self.form.PatientName,//患者姓名
          ApplyHospitalId: self.form.hosi,//送转医院
          // AppointmentHospitalId:self.hosptialid,//接诊医院
          AppointmentHospitalId: '',
          AppointmentSectionId: self.form.jzksvalue,//接诊科室
          AppointmentDoctorId: self.form.jzdoctvalue,//接诊医生
          ExaminationItemName: '',
          ExaminationDeviceName: '',
          CreateDateStart: '',
          CreateDateEnd: '',
          AppointmentDateStart: '',
          AppointmentDateEnd: '',
          page: self.currentPage,
          rows: self.currentNum,
          AppointmentType: 1,//1门诊转诊 2检查转诊
          // AppointmentState:self.form.AppointmentState,//1成功2失败3取消
          AppointmentState: self.form.tagvalue,
          token: self.token,
          RollInRollOutType: 1
        }
      })
      .then(function(response) {
        var data = response.data.rows;
        self.tableData = data;
        self.total = response.data.total;
        console.log("response")
        console.log(response)
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
    GetOutpatientState(){
      var self=this;
      axios.get(apiurl.GetOutpatientState, {
        
      })
      .then(function(response) {
        console.log(response,'response')
        var data = response.data.rows;
        self.form.yytag = data;
        console.log(self.form.yytag,'row')
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
      return true;
    },
    checkdetail(id) {
      var self = this;
      self.dialogFormVisible = true;
      axios.get(apiurl.GetOutPatientAppointmentView, {
        params: {
          id: id,
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
    datavalue(val) {
      var self = this;
      console.log(val)
    },
    // 根据科室获取医生
    doctordata() {
      var self = this;
      //根据科室获取医生
      axios.get(apiurl.GetSchedulingDoctorsBySectionID, {
        params: {
          SectionId: self.form.jzksvalue,
          token: self.token
        }
      })
        .then(function(response) {
          var data = response.data.rows;
          console.log(data.length)
          if (data.length <= 0) {
            self.form.jzdoct = data;
            self.form.jzdoctvalue = '';
          } else {
            self.form.jzdoct = data;
          }

        })
        .catch(function(error) {
          console.log(error);
        })
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
      self.form.AppointmentState = self.form.tagvalue;
      self.form.AppointmentState == '' ? self.form.AppointmentState = -1 : self.form.AppointmentState;
      axios.get(apiurl.GetTransferList, {
        params: {
          PatientName: self.form.PatientName,//患者姓名
          ApplyHospitalId: self.form.hosi,//送转医院
          // AppointmentHospitalId:self.hosptialid,//接诊医院
          AppointmentHospitalId: '',
          AppointmentSectionId: self.form.jzksvalue,//接诊科室
          AppointmentDoctorId: self.form.jzdoctvalue,//接诊医生
          ExaminationItemName: '',
          ExaminationDeviceName: '',
          CreateDateStart: CreateDate,
          CreateDateEnd: CreateDate1,
          AppointmentDateStart: AppointmentDate,
          AppointmentDateEnd: AppointmentDate1,
          page: self.currentPage,
          rows: self.currentNum,
          AppointmentType: 1,//1门诊转诊 2检查转诊
          // AppointmentState:self.form.AppointmentState,//1成功2失败3取消
          AppointmentState: self.form.tagvalue,
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
    // 查询
    check_btn() {
      var self = this;
      // console.log(this.form.datavalue1,'aaaa')
      if(this.form.datavalue1){

      // console.log(this.form.datavalue1,'bbbb')
        // 转诊日期开始
        self.CreateDateStart = this.form.datavalue1[0];
        // 转诊日期结束
        self.CreateDateEnd = this.form.datavalue1[1]
        // self.CreateDateStart = new Date(self.form.datavalue1[0]).getFullYear() + '-' + ((new Date(self.form.datavalue1[0]).getMonth() + 1) > 10 ? (new Date(self.form.datavalue1[0]).getMonth() + 1) : '0' + (new Date(self.form.datavalue1[0]).getMonth() + 1)) + '-' + ((new Date(self.form.datavalue1[0]).getDate()) > 10 ? (new Date(self.form.datavalue1[0]).getDate()) : '0' + (new Date(self.form.datavalue1[0]).getDate()));
        // // 转诊日期结束
        // self.CreateDateEnd = new Date(self.form.datavalue1[1]).getFullYear() + '-' + ((new Date(self.form.datavalue1[1]).getMonth() + 1) > 10 ? (new Date(self.form.datavalue1[1]).getMonth() + 1) : '0' + (new Date(self.form.datavalue1[1]).getMonth() + 1)) + '-' + ((new Date(self.form.datavalue1[1]).getDate()) > 10 ? (new Date(self.form.datavalue1[1]).getDate()) : '0' + (new Date(self.form.datavalue1[1]).getDate()));
      }
      if(this.form.datavalue2){
        // 就诊日期开始
        self.AppointmentDateStart = this.form.datavalue2[0];
        // 就诊日期结束
        self.AppointmentDateEnd = this.form.datavalue2[0];
      }
      // 就诊日期开始
      // self.AppointmentDateStart = new Date(self.form.datavalue2[0]).getFullYear() + '-' + ((new Date(self.form.datavalue2[0]).getMonth() + 1) > 10 ? (new Date(self.form.datavalue2[0]).getMonth() + 1) : '0' + (new Date(self.form.datavalue2[0]).getMonth() + 1)) + '-' + ((new Date(self.form.datavalue2[0]).getDate()) > 10 ? (new Date(self.form.datavalue2[0]).getDate()) : '0' + (new Date(self.form.datavalue2[0]).getDate()));
      // // 就诊日期结束     
      // self.AppointmentDateEnd = new Date(self.form.datavalue2[1]).getFullYear() + '-' + ((new Date(self.form.datavalue2[1]).getMonth() + 1) > 10 ? (new Date(self.form.datavalue2[1]).getMonth() + 1) : '0' + (new Date(self.form.datavalue2[1]).getMonth() + 1)) + '-' + ((new Date(self.form.datavalue2[1]).getDate()) > 10 ? (new Date(self.form.datavalue2[1]).getDate()) : '0' + (new Date(self.form.datavalue2[1]).getDate()));
      // self.CreateDateStart !== 'NaN-0NaN-0NaN' ? self.CreateDateStart : self.CreateDateStart = '';
      // self.CreateDateEnd !== 'NaN-0NaN-0NaN' ? self.CreateDateEnd : self.CreateDateEnd = '';
      // self.AppointmentDateStart !== 'NaN-0NaN-0NaN' ? self.AppointmentDateStart : self.AppointmentDateStart = '';
      // self.AppointmentDateEnd !== 'NaN-0NaN-0NaN' ? self.AppointmentDateEnd : self.AppointmentDateEnd = '';
      console.log(self.CreateDateStart)
      self.tableDatajk(self.CreateDateStart, self.CreateDateEnd, self.AppointmentDateStart, self.AppointmentDateEnd)
      console.log(self.CreateDateStart)
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
      self.form.jzhosi = '';
      self.form.jzksvalue = '';
      self.form.jzdoctvalue = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.con_li {
  width: 50%;
  float: left;
  .con_title {
    width: 100px;
    text-align: right;
    display: inline-block;
    line-height: 30px;
  }
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
  width: auto;
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
            