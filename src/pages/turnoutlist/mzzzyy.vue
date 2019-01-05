<template>
  <div class="ts-content mzzzyy">
    <main class="main-wrap">
      <el-steps v-if="!readonly" :active="2">
        <el-step title="填写基本情况" description="" style="margin-left:15%;"></el-step>
        <el-step title="填写转诊预约" description=""></el-step>
        <el-step title="确认并完成申请" description="" style='width:auto;'></el-step>
      </el-steps>
      <br>
      <el-form label-width="85px" style="margin-top: 20px">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="接诊医院">
              <el-select v-model="transferInfo.AppointmentHospitalId" clearable filterable placeholder="请选择" @change="selectHosp">
                <el-option v-for="item in hospitals" :key="item.HospitalId" :label="item.HospitalName" :value="item.HospitalId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接诊科室">
              <el-select v-model="transferInfo.AppointmentSectionId" clearable filterable placeholder="请选择" :disabled="!transferInfo.AppointmentHospitalId" @visible-change="visibleChangeDept" @change="selectDept" @clear="selectDept">
                <el-option v-for="item in sections" :key="item.Id" :label="item.SectionName" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接诊医生">
              <el-select v-model="transferInfo.doctorid" clearable filterable placeholder="请选择" :disabled="!transferInfo.AppointmentHospitalId || !transferInfo.AppointmentSectionId" @visible-change="visibleChangeDoct" @change="requestTable">
                <el-option v-for="item in doctors" :key="item.DoctorId" :label="item.DoctorName" :value="item.DoctorId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="textAlignRight">
          <el-button type="primary" :disabled="!transferInfo.AppointmentHospitalId || !transferInfo.AppointmentSectionId" @click="thisWeek">本周号源</el-button>
          <el-button type="info" :disabled="!transferInfo.AppointmentHospitalId || !transferInfo.AppointmentSectionId" @click="nextWeek">下周号源</el-button>
        </el-row>
      </el-form>
      <el-table :data="scheduletable" border style="margin-top: 20px" class="scheduletTable" :span-method="arraySpanMethod">
        <el-table-column prop="scheduletable" label="医生" min-width="9%">
          <template slot-scope="scope">
            <el-button type="text" @click="openIntro(scope.row.DoctorId)" class="paddingbottom0" :style="scope.row.DoctorId=='*'?'color:#539cdb;text-decoration:none;cursor:auto':''">{{scope.row.DoctorName}} {{scope.row.Professional}}</el-button>
            <p style="color: #425B77">{{scope.row.SectionName}}</p>
          </template>
        </el-table-column>
        <!--item表示日期-->
        <el-table-column v-for="(item, index) in weekdays" :key="index" :label="item">
          <el-table-column prop="scheduletable.SchedulingInfo" label="上午" min-width="6.5%">
            <template slot-scope="scope">
              <!-- <div>{{scope.row.SchedulingInfo[0].PlanDate==item}}{{scope.row.SchedulingInfo[0].AmOrPm}}--{{item}}</div>
              <div>{{scope.row.SchedulingInfo[1].PlanDate==item}}{{scope.row.SchedulingInfo[1].AmOrPm}}--{{item}}</div> -->
              <div v-if="(scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午')).length>0)">
                <!--停诊-->
                <div v-if="scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0].IsStop" class="ts-bgcolor-red">停诊</div>
                <div v-else-if="scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0].Total>0">
                  <!--号源没用完-->
                  <el-tooltip v-if="scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0].Total-scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0].ReservedQuantity>0" effect="light" placement="top">
                    <!--文字提示-->
                    <div slot="content">
                      <i class="el-icon-ts-mark2 ts-color-orange"></i>
                      剩余{{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0].Total-scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0].ReservedQuantity}}个号源
                    </div>
                    <!--号源-->
                    <div :class="['ts-bgcolor-theme', {'cursorPointer': !readonly}]" @click="selectVisit(scope.row,scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0])">
                      {{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0].ReservedQuantity}}/{{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0].Total}}
                    </div>
                  </el-tooltip>
                  <!--号源用完-->
                  <div v-else class="ts-bgcolor-7A">
                    {{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0].ReservedQuantity}}/{{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='上午'))[0].Total}}
                  </div>

                </div>

              </div>
            </template>
          </el-table-column>
          <el-table-column prop="scheduletable.SchedulingInfo" label="下午" min-width="6.5%">
            <template slot-scope="scope">
              <div v-if="(scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午')).length>0)">
                <div v-if="scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0].IsStop" class="ts-bgcolor-red">停诊</div>
                <div v-else-if="scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0].Total>0">
                  <el-tooltip v-if="scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0].Total-scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0].ReservedQuantity>0" effect="light" placement="top">
                    <div slot="content">
                      <i class="el-icon-ts-mark2 ts-color-orange"></i>
                      剩余{{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0].Total-scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0].ReservedQuantity}}个号源
                    </div>
                    <div :class="['ts-bgcolor-theme', {'cursorPointer': !readonly}]" @click="selectVisit(scope.row,scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0])">
                      {{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0].ReservedQuantity}}/{{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0].Total}}
                    </div>
                  </el-tooltip>
                  <div v-else class="ts-bgcolor-7A">
                    {{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0].ReservedQuantity}}/{{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='下午'))[0].Total}}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="scheduletable.SchedulingInfo" label="全天" min-width="6.5%" v-if='transferInfo.alldayflog'>
            <template slot-scope="scope">
              <div v-if="(scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天')).length>0)">
                <div v-if="scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0].IsStop" class="ts-bgcolor-red">停诊</div>
                <div v-else-if="scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0].Total>0">
                  <el-tooltip v-if="scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0].Total-scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0].ReservedQuantity>0" effect="light" placement="top">
                    <div slot="content">
                      <i class="el-icon-ts-mark2 ts-color-orange"></i>
                      剩余{{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0].Total-scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0].ReservedQuantity}}个号源
                    </div>
                    <div :class="['ts-bgcolor-theme', {'cursorPointer': !readonly}]" @click="selectVisit(scope.row,scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0])">
                      {{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0].ReservedQuantity}}/{{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0].Total}}
                    </div>
                  </el-tooltip>
                  <div v-else class="ts-bgcolor-7A">
                    {{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0].ReservedQuantity}}/{{scope.row.SchedulingInfo.filter(obj=>(obj.PlanDate==item&&obj.AmOrPm=='全天'))[0].Total}}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </main>
    <div v-if="!readonly" style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 20px">
      <el-button @click="lastStep">上一步</el-button>
      <el-button type="primary" @click="nextStep">下一步</el-button>
    </div>
    <el-dialog v-if="dialogDocVisible" class="el-width-50 olt-doc-ins" :title="`${docInfo.DoctorName}简介`" :visible.sync="dialogDocVisible">
      <img class="olt-doc-name-bg" src="../../assets/img/default/olt-doc-name-bg.png" />
      <hr>
      <div class="olt-doc-imfo">
        <div class="olt-doc-img">
          <img v-if="docInfo.PhotoUrl" :src="docInfo.PhotoUrl" width="100%" height="100%" />
          <img v-else src="../../assets/img/default/olt-doc-img.png" width="100%" height="100%" />
        </div>
        <div class="olt-doc-list">
          <span class="olt-doc-name">{{docInfo.DoctorName}}</span>
          <label>{{docInfo.Professional}}</label>
        </div>
        <div class="olt-doc-list">
          <label>手机号码</label>
          <span>{{docInfo.MobilePhone}}</span>
        </div>
        <div class="olt-doc-list">
          <label>医生工号</label>
          <span>{{docInfo.SignedDoctorNO}}</span>
        </div>
        <div class="olt-doc-list">
          <label>隶属医院</label>
          <span>{{docInfo.HospitalName}}</span>
        </div>
        <div class="olt-doc-list">
          <label>隶属科室</label>
          <span>{{docInfo.SectionName}}</span>
        </div>
      </div>
      <div class="olt-doc-good">
        <label>擅长治疗</label>
        <span>{{docInfo.SpecitialTech}}</span>
      </div>
      <div class="olt-doc-good">
        <label>名医简介</label>
        <span>{{docInfo.DoctorIntroduce}}</span>
      </div>
    </el-dialog>
    <!--点击号源弹出-->
    <el-dialog v-if="!readonly && dialogFormVisible" class="el-width-50 olt-display" title="选择就诊序号" :visible.sync="dialogFormVisible" :before-close="closeDialogSource">
      <el-row>
        <el-form label-width="100px" class="worddisplay">
          <el-form-item label="患者姓名" size="small" class='floatLeft'>{{transferInfo.PatientName}}</el-form-item>
          <el-form-item label="性别" class='floatLeft'>
            <span v-if="transferInfo.PatientSex==1">男</span>
            <span v-else-if="transferInfo.PatientSex==0">女</span>
          </el-form-item>
          <el-form-item label="身份证号" class='floatLeft'>{{transferInfo.PatientCardId}}</el-form-item>
          <el-form-item label="预约医院" size="small" class='floatLeft'>{{transferInfo.AppointmentHospitalName}}</el-form-item>
          <el-form-item label="预约科室" class='floatLeft'>{{transferInfo.AppointmentSectionName}}</el-form-item>
          <el-form-item label="预约医生" class='floatLeft'>{{transferInfo.AppointmentDoctorName}}</el-form-item>
          <el-form-item label="预约就诊日期" class='floatLeft'>{{transferInfo.AppointmentDate}}&nbsp;
            <span v-if="transferInfo.RegClass==1">上午</span>
            <span v-else-if="transferInfo.RegClass==2">下午</span>
          </el-form-item>
        </el-form>
      </el-row>
      <h4>可预约的号源信息</h4>
      <el-table :data="sourceTable" style="width: 100%">
        <el-table-column prop="RegNo" label="就诊序号" min-width="20%">
          <template slot-scope="scope">
            <el-radio v-model="radiovalue" :label="scope.row.RegNo" @change.native="getSelection(scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="ClinicTime" label="预计就诊时间" min-width="30%"> </el-table-column>
        <el-table-column prop="RegFee" label="挂号费（元）" min-width="25%"> </el-table-column>
        <el-table-column prop="ClinicFee" label="诊疗费（元）" min-width="25%"> </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogSource">取消</el-button>
        <el-button type="primary" @click="saveSource">确定选择</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import { mapGetters, mapActions } from 'vuex';
import { apiurl } from '../../service/api.js';
import axios from 'axios'
var weekdays = []
var currentFirstDate = new Date();
var formatDate = function(date) {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1);
  var day = date.getDate();
  if (day.toString().length == 1) {
    day = '0' + day
  }
  if (month.toString().length == 1) {
    month = '0' + month
  }
  return year + '-' + month + '-' + day;
};
var addDate = function(date, n) {
  date.setDate(date.getDate() + n);
  return date;
};
var setDate = function(date) {
  currentFirstDate = new Date();
  weekdays = []
  for (var i = 0; i < 7; i++) {
    weekdays.push(formatDate(i == 0 ? date : addDate(date, 1)));
  }
  return weekdays
};
export default {
  data() {
    return {
      hospitals: [],
      sections: [],
      doctors: [],
      type: 1,
      scheduletable: [],        //日历表上的数据
      weekdays: [],

      dialogDocVisible: false,
      docInfo: {},
      dialogFormVisible: false,
      sourceTable: [],          //号源弹窗上的表数据
      radiovalue: '',
      sourceSelection: '',      //存储号源弹窗中，选中的行
      fillBackRadioEnd: {                 //用于回填选中的挂号源--最终区        
        toAppointmentHospitalNameEnd: '', //医院
        toAppointmentSectionNameEnd: '',  //科室
        toDoctorNameEnd: '',              //医生
        toPlanDateEnd: '',                //预约就诊日期
        toAmOrPmEnd: '',                  //上午/下午
        toRegNoEnd: '',                   //号源
        toClinicTime: '',                 //就诊时间
        alldayflog: false
      },    
      transferInfo: Object.assign({
        isfirst: true,
        doctorid: '',
        AppointmentHospitalId: '',
        AppointmentSectionId: '',
        AppointmentDoctorId: '',
        alldayflog: false
      }, this.$route.query.transferInfo),

      readonly: '',
    };
  },
  computed: {
    ...mapGetters({
      token: 'token'
    }),
  },
  beforeMount() {
    var self = this
    self.weekdays = setDate(new Date())
  },
  mounted() {
    var self = this
    self.requestHosplist()
    self.weekdays = setDate(new Date())
    console.log("第二步加载self.transferInfo",self.transferInfo)
    //不是第一次
    if (self.transferInfo.isfirst === false) {
      self.requestDeptlist()
      self.requestDoctlist()
      self.requestTable()
      self.radiovalue = self.transferInfo.RegNo   //如果有回退的操作，将之前的记录赋值到此变量
      self.fillBackRadioEnd.toAppointmentHospitalNameEnd = self.transferInfo.AppointmentHospitalName  //医院名
      self.fillBackRadioEnd.toAppointmentSectionNameEnd = self.transferInfo.AppointmentSectionName    //科室
      self.fillBackRadioEnd.toDoctorNameEnd = self.transferInfo.AppointmentDoctorName;                //医生名
      self.fillBackRadioEnd.toPlanDateEnd = self.transferInfo.AppointmentDate;                        //预约日期
      self.fillBackRadioEnd.toAmOrPmEnd = self.transferInfo.RegClass;                                 //排班时间段
      self.fillBackRadioEnd.toRegNoEnd = self.transferInfo.RegNo                                      //序号
      self.fillBackRadioEnd.toClinicTime = self.transferInfo.ClinicTime
      self.readonly = false
      console.log("下一步或者上一步返回",self.radiovalue)
    } else {
      if (self.$route.name == 'ckpb') {
        self.readonly = true
      } else {
        self.readonly = false
      }
      self.transferInfo.doctorid = ''
      self.transferInfo.AppointmentHospitalId = ''
      self.transferInfo.AppointmentSectionId = ''
      self.transferInfo.AppointmentDoctorId = ''
    }
  },
  watch: {
    '$route': function(val) {
      if (this.transferInfo.isfirst !== false) {
        this.readonly = false
      } else {
        if (val.name == 'ckpb') {
          this.readonly = true
        } else {
          this.readonly = false
        }
        this.transferInfo.doctorid = ''
        this.transferInfo.AppointmentHospitalId = ''
        this.transferInfo.AppointmentSectionId = ''
        this.transferInfo.AppointmentDoctorId = ''
      }
    },
    'transferInfo.AppointmentHospitalId': function(val) {
      if (!val) {
        this.transferInfo.AppointmentHospitalId = ''
        this.transferInfo.AppointmentHospitalName = ''
        this.transferInfo.AppointmentSectionId = ''
        this.transferInfo.doctorid = ''
      }
    },
    'transferInfo.AppointmentSectionId': function(val) {
      if (!val) {
        this.transferInfo.AppointmentSectionId = ''
        this.transferInfo.AppointmentSectionName = ''
        this.transferInfo.doctorid = ''
      }
    },
    'transferInfo.AppointmentDoctorId': function(val) {
      if (!val) {
        this.transferInfo.AppointmentDoctorId = ''
        this.transferInfo.AppointmentDoctorName = ''
      }
    }
  },
  methods: {
    // 上一步按钮
    lastStep() {
      var self = this
      self.transferInfo.isfirst = false
      self.transferInfo.steponeisfirst = false
      console.log("转诊预约的transferInfo",self.transferInfo);
      //防止取消的时候，transferInfo存储的依然是旧值
      self.transferInfo.AppointmentHospitalName = self.fillBackRadioEnd.toAppointmentHospitalNameEnd;  //医院名
      self.transferInfo.AppointmentSectionName = self.fillBackRadioEnd.toAppointmentSectionNameEnd;    //科室
      self.transferInfo.AppointmentDoctorName = self.fillBackRadioEnd.toDoctorNameEnd;                //医生名
      self.transferInfo.AppointmentDate = self.fillBackRadioEnd.toPlanDateEnd;                        //预约日期
      self.transferInfo.RegClass = self.fillBackRadioEnd.toAmOrPmEnd;                                 //排班时间段
      self.transferInfo.RegNo = self.fillBackRadioEnd.toRegNoEnd;                                      //序号
      self.transferInfo.ClinicTime = self.fillBackRadioEnd.toClinicTime;
      console.log("跳转第一步",self.transferInfo)
      self.$router.push({
        path: 'mzzzsqsr',
        query: {
          transferInfo: self.transferInfo,
          ModelUrl: self.$route.query.ModelUrl
        }
      })
    },
    // 下一步按钮
    nextStep() {
      var self = this;
      //防止取消的时候，transferInfo存储的依然是旧值
      self.transferInfo.AppointmentHospitalName = self.fillBackRadioEnd.toAppointmentHospitalNameEnd;  //医院名
      self.transferInfo.AppointmentSectionName = self.fillBackRadioEnd.toAppointmentSectionNameEnd;    //科室
      self.transferInfo.AppointmentDoctorName = self.fillBackRadioEnd.toDoctorNameEnd;                //医生名
      self.transferInfo.AppointmentDate = self.fillBackRadioEnd.toPlanDateEnd;                        //预约日期
      self.transferInfo.RegClass = self.fillBackRadioEnd.toAmOrPmEnd;                                 //排班时间段
      self.transferInfo.RegNo = self.fillBackRadioEnd.toRegNoEnd;                                      //序号
      self.transferInfo.ClinicTime = self.fillBackRadioEnd.toClinicTime;
      if (!self.transferInfo.AppointmentHospitalId) {
        self.$message('请选择接诊医院')
        return
      }
      if (!self.fillBackRadioEnd.toRegNoEnd) {
        self.$message('请选择就诊序号')
        return
      }
      console.log("转诊预约的transferInfo",self.transferInfo);
      self.$router.push({
        path: 'mzzzqr',
        query: {
          transferInfo: self.transferInfo,
          ModelUrl: self.$route.query.ModelUrl
        }
      })
    },
    // 本周号源按钮
    thisWeek(val) {
      var self = this
      self.type = 1
      self.weekdays = setDate(new Date())
      self.requestTable()
    },
    // 下周号源按钮
    nextWeek() {
      var self = this
      self.type = 2
      self.weekdays = setDate(addDate(currentFirstDate, 7))
      self.requestTable()
    },
    // 打开医生简介
    openIntro(val) {
      var self = this
      axios.get(apiurl.GetDoctorCustom, {
        params: {
          token: self.token,
          id: val
        }
      })
        .then(function(response) {
          if (response.data.suc == true) {
            self.docInfo = response.data.extra
            self.dialogDocVisible = true
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 点击排班表中可预约的号源
    selectVisit(row, col) {
      var self = this
      self.radiovalue = ""
      if (!self.readonly) {
        let noon
        if (col.AmOrPm == '上午') { noon = 1 } else { noon = 2 }
        self.transferInfo.AppointmentDoctorId = row.DoctorId;       //预约医生编号
        self.transferInfo.AppointmentDoctorName = row.DoctorName;   //预约医生名称           
        self.transferInfo.AppointmentDate = col.PlanDate;           //预约日期
        self.transferInfo.ArrangeId = col.PlanId;                   //排班编号
        self.transferInfo.RegClass = noon;                          //挂号班次（上午/下午）
        axios.get(apiurl.GetSchedulingNumList, {
          params: {
            token: self.token,
            hospitalId: self.transferInfo.AppointmentHospitalId,
            // hospitalId:'1118041211284592167',
            sectionId: self.transferInfo.AppointmentSectionId,
            doctorId: row.DoctorId,
            planId: col.PlanId,
            regClass: noon
          }
        })
          .then(function(response) {
            if (response.data.suc == true) {
              self.sourceTable = response.data.rows
              // console.log(response.data.rows, '号源对应弹窗中的数据:')
              self.sourceTable.forEach(function(element) {
                element.ClinicFee = col.ClinicFee
                element.RegFee = col.RegFee
              }, this);
              //判断就诊序号回填:如果最终区中的信息和
              console.log("现在self.fillBackRadioEnd.toRegNoEnd的radiovalue--",self.fillBackRadioEnd.toRegNoEnd);
              console.log("现在self.radiovalue的radiovalue--",self.radiovalue);
              console.log("self.fillBackRadioEnd",self.fillBackRadioEnd);
              console.log("self.transferInfo",self.transferInfo);
              if(self.fillBackRadioEnd.toAppointmentHospitalNameEnd == self.transferInfo.AppointmentHospitalName && self.fillBackRadioEnd.toAppointmentSectionNameEnd == self.transferInfo.AppointmentSectionName && self.fillBackRadioEnd.toDoctorNameEnd == self.transferInfo.AppointmentDoctorName && self.fillBackRadioEnd.toPlanDateEnd == self.transferInfo.AppointmentDate && self.fillBackRadioEnd.toAmOrPmEnd == self.transferInfo.RegClass && self.fillBackRadioEnd.toRegNoEnd == self.transferInfo.RegNo) {
                self.radiovalue = self.fillBackRadioEnd.toRegNoEnd;
                console.log("回填",self.radiovalue)
              }else {
                console.log("回填",self.radiovalue)
              }
              //显示弹窗
              self.dialogFormVisible = true
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 选择号源
    getSelection(row) {
      var self = this
      self.sourceSelection = row
      console.log("选择弹窗sourceSelection--选择并存储某行信息row",row);
    },
    //关闭选择号源弹窗【点击取消，关闭，点击遮罩】
    closeDialogSource() {
      var self = this;
      self.sourceSelection = '';
      self.radiovalue = '';        
      self.dialogFormVisible = false
    },
    // 选择号源确定按钮
    saveSource() {
      var self = this
      if (self.radiovalue == '') {
        self.$message('请选择就诊序号')
        return
      }
      self.transferInfo.ClinicTime = self.sourceSelection.ClinicTime||self.fillBackRadioEnd.toClinicTime;   //预约时间段
      if(self.sourceSelection.RegNo) {
          self.transferInfo.RegNo = self.sourceSelection.RegNo;             //挂号序号
      }      
      self.transferInfo.RegFee = self.sourceSelection.RegFee;           //挂号费
      self.transferInfo.ClinicFee = self.sourceSelection.ClinicFee;     //诊疗费


      //将结果存储在最终区
      self.fillBackRadioEnd.toAppointmentHospitalNameEnd = self.transferInfo.AppointmentHospitalName  //医院名
      self.fillBackRadioEnd.toAppointmentSectionNameEnd = self.transferInfo.AppointmentSectionName    //科室
      self.fillBackRadioEnd.toDoctorNameEnd = self.transferInfo.AppointmentDoctorName;                //医生名
      self.fillBackRadioEnd.toPlanDateEnd = self.transferInfo.AppointmentDate;                        //预约日期
      self.fillBackRadioEnd.toAmOrPmEnd = self.transferInfo.RegClass;                                 //排班时间段
      self.fillBackRadioEnd.toRegNoEnd = self.transferInfo.RegNo                                      //序号
      self.fillBackRadioEnd.toClinicTime = self.transferInfo.ClinicTime;
      console.log("最终区:",self.fillBackRadioEnd);
      //改变radiovalue值
      self.radiovalue = self.fillBackRadioEnd.toRegNoEnd;
      console.log("最终radiovalue--",self.fillBackRadioEnd.toRegNoEnd,self.radiovalue);

      self.dialogFormVisible = false  //关闭弹窗
    },
    // 合并单元
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row,column,rowIndex,columnIndex,'bbbb')
      if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
    },
    // 获取门诊转诊排班表
    requestTable() {
      var self = this
      self.fillBackRadioEnd.arrtableday = [];
      console.log(self.transferInfo.doctorid,'aaaa')
      if (!self.transferInfo.AppointmentSectionId) {
        self.scheduletable = []
      } else {
        axios.get(apiurl.GetSchedulingList, {
          params: {
            token: self.token,
            doctorId: self.transferInfo.doctorid,
            type: self.type,
            hospitalId: self.transferInfo.AppointmentHospitalId,
            // hospitalId:'1118041211284592167',
            sectionId: self.transferInfo.AppointmentSectionId
          }
        })
          .then(function(response) {
            self.scheduletable = []
            if (response.data.suc == true) {
              self.scheduletable = response.data.rows;
              // console.log(self.fillBackRadioEnd.arrtableday.filter(obj=>(obj.PlanDate!='2018-06-21')))
              console.log("获取到的门诊列表集合scheduletable:",self.scheduletable,self.fillBackRadioEnd.arrtableday)
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 获取医院下拉列表
    requestHosplist(val) {
      var self = this
      axios.get(apiurl.GetIsAppointmentHigherHospitalList, {
        params: {
          token: self.token
        }
      })
        .then(function(response) {
          if (response.data.suc == true) {
            self.hospitals = response.data.rows;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 获取科室下拉列表
    requestDeptlist(val) {
      var self = this
      axios.get(apiurl.GetSmallSectionByHospitalIdOutpatient, {
        params: {
          token: self.token,
          hospitalID: self.transferInfo.AppointmentHospitalId
          // hospitalID:'1118041211284592167'
        }
      })
        .then(function(response) {
            console.log(response)
          if (response.data.suc == true) {
            self.sections = response.data.rows;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 获取医生下拉列表
    requestDoctlist() {
      var self = this
      axios.get(apiurl.GetDoctorsBySectionID, {
        params: {
          token: self.token,
          sectionId: self.transferInfo.AppointmentSectionId,
          hospitalId: self.transferInfo.AppointmentHospitalId
          // sectionId: '31',
          // hospitalId: '1118041211284592167'
        }
      })
        .then(function(response) {
          if (response.data.suc == true) {
            self.doctors = response.data.rows;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 医院下拉列表change事件
    selectHosp(val) {
      var self = this
      let cur = self.hospitals.filter(obj => obj.HospitalId == val)
      console.log(cur,'cur')
      if (cur.length > 0) {
        self.transferInfo.AppointmentHospitalName = cur[0].HospitalName || ''
      } else {
        self.transferInfo.AppointmentHospitalName = ''
      }
      cur[0].SchedulingType == 2 ? self.transferInfo.alldayflog = true : self.transferInfo.alldayflog = false;
      console.log(self.transferInfo.alldayflog,'self.transferInfo.alldayflog',cur)
      console.log("选中的医院",self.transferInfo.AppointmentHospitalName)
      self.fillBackRadioEnd.toAppointmentHospitalNameEnd = self.transferInfo.AppointmentHospitalName  //医院名
      //清空存储中的科室和医生
      self.transferInfo.AppointmentSectionId = "";
      self.transferInfo.doctorid = "";
    },
    // 科室下拉列表change事件
    selectDept(val) {
      var self = this
      let cur = self.sections.filter(obj => obj.Id == val)
      if (cur.length > 0) {
        self.transferInfo.AppointmentSectionName = cur[0].SectionName || ''
      } else {
        self.transferInfo.AppointmentSectionName = ''
      }
      console.log("选中的科室",self.transferInfo.AppointmentSectionName)
      self.fillBackRadioEnd.toAppointmentSectionNameEnd = self.transferInfo.AppointmentSectionName    //科室     
      //清空存储中的医生并加载列表
      self.transferInfo.doctorid = "";
      self.requestTable()
    },
    // 科室下拉列表出现时触发
    visibleChangeDept(val) {
      var self = this
      if (val) {
        self.requestDeptlist()
      }
    },
    // 医生下拉列表出现时触发
    visibleChangeDoct(val) {
      var self = this
      if (val) {
        self.requestDoctlist()
      }
    }
  }
};
</script>

<style lang="scss">
.mzzzyy {
  .scheduletTable.el-table {
    td {
      height: 100%;
      color: #fff;
      .cell {
        padding-left: 0;
        padding-right: 0;
        text-align: center;
      }
    }
    .ts-bgcolor-7A {
      background: #7A7A7A;
    }
  }
  .olt-doc-img {
    // box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 20px;
    width: 100px;
    height: 100px;
    padding: 3px;
    border-radius: 100px;
    margin-top: -50px;
    overflow: hidden;
    border: 1px solid #e6e6e6;
  }
  .olt-doc-list {
    margin: 6px 0;
    font-size: 14px;
    color: #333;
  }
  .olt-doc-list label {
    display: inline-block;
    color: #73879C;
    margin-left: 20px;
  }
  .olt-doc-list span {
    display: inline-block;
    margin-left: 20px;
    margin-right: 30px;
  }
  .olt-doc-list .olt-doc-name {
    margin-right: 0;
    font-size: 18px;
    color: #73879C;
  }
  .olt-doc-good {
    position: relative;
    padding: 20px 10px;
    font-size: 14px;
    color: #333;
  }
  .olt-doc-good:hover {
    background: #EAF1FF;
  }
  .olt-doc-good label {
    position: absolute;
    left: 20px;
    top: 20px;
    color: #73879C;
  }
  .olt-doc-good span {
    display: inline-block;
    margin-left: 85px;
  }
  .olt-doc-imfo {
    position: relative;
    min-height: 140px;
    padding: 15px 0;
    padding-left: 120px;
  }
  .olt-doc-name-bg {
    width: 100%;
  }
  .olt-doc-ins hr {
    margin: 0;
  }
  .olt-doc-ins .el-dialog__body {
    padding: 0;
    font-size: 0;
  }
  .worddisplay .el-form-item__label {
    width: 110px!important;
  }
  .worddisplay .el-form-item__content {
    margin-left: 110px!important;
  }
  .olt-display .el-form-item {
    width: 45%;
  }
}
</style>
            