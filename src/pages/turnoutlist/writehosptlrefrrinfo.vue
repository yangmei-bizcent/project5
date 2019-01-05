<template>
  <div class="ts-content wrapper-datepicker newcss nowidth write_hosptlrefrrinfo">
    <main class="main-wrap">
      <el-steps :active="2">
        <el-step title="住院转诊申请" description="" style="margin-left:15%;"></el-step>
        <el-step title="填写转诊信息" description=""></el-step>
        <el-step title="确认申请" description="" style='width:auto;'></el-step>
      </el-steps>
      <br>
      <el-form ref="extra" :model="extra" :rules="rules" label-width="120px" class="clearfix">
        <el-breadcrumb-item>转诊信息</el-breadcrumb-item>
        <el-row>
          <el-col :span='8'>
            <el-form-item label="申请转入医院" size="small" prop="AppointmentHospitalId">
              <el-select v-model="extra.AppointmentHospitalId" clearable @change="AppointmentHosChange" placeholder="请选择转入的医院">
                <el-option v-for="item in transferHospitals" :key="item.HospitalId" :label="item.HospitalName" :value="item.HospitalId" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="申请转入科室" size="small" prop="AppointmentSectionId">
              <el-select v-model="extra.AppointmentSectionId" clearable placeholder="请选择转入的科室" @change="appointmentSectionChange">
                <el-option v-for="item in AppointmentSections" :key="item.Id" :label="item.SectionName" :value="item.Id" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="医疗组" size="small" prop="">
              <el-select v-model="extra.MedicalGroupId" clearable placeholder="请选择医疗组" @change="medicalGroupChange">
                <el-option v-for="item in MedicalGroups" :key="item.Id" :label="item.SectionName" :value="item.Id" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class='datak'>
            <el-form-item label="入院类别" size="small" prop="">
              <el-select v-model="extra.AdmissionCategory" clearable placeholder="请选择入院类别" @change="getCategoryText">
                <el-option v-for="items in AdmissionCategorys" :key="items.typeValue" :label="items.typeLabel" :value="items.typeValue" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="申请入住日期" prop='AppointmentPlanDate'>
              <el-date-picker v-model="extra.AppointmentPlanDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" align="right" @change="getAppointmentPlanDate">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="预计住院天数" size="small" prop="AppointmentPlanDayNum">
              <el-input v-model="extra.AppointmentPlanDayNum" placeholder="请输入预计住院天数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="紧急程度" size="small" prop="">
              <el-select v-model="extra.UrgentState" clearable placeholder="请选择紧急程度" @change="getUrgentText">
                <el-option v-for="items in UrgentStates" :key="items.value" :label="items.label" :value="items.value" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="转诊原因" size="small" prop="TransferReason">
              <el-input v-model="extra.TransferReason" type="textarea" :rows="3"  placeholder="请输入转诊原因"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="转运工具" prop='TransportWay'>
              <el-radio-group v-model="extra.TransportWay">
                <el-radio class="radio" :label="1">救护车</el-radio>
                <el-radio class="radio" :label="2">患者自己转运</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="病情危重程度" prop='IllnessSeverity'>
              <el-radio-group v-model="extra.IllnessSeverity">
                <el-radio class="radio"  :label="1" >病情平缓</el-radio>
                <el-radio class="radio" :label="2" >急症</el-radio>
                <el-radio class="radio" :label="3" >危重症</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="转运评估" prop='TransferEvaluation'>
              <el-radio-group v-model="extra.TransferEvaluation">
                <el-radio class="radio" :label="1" >适合转运</el-radio>
                <el-radio class="radio" :label="2" >转运途中风险大，已充分告知家属，家属同意转运</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span='10' class="width-initial">
            <el-form-item label="隔离要求" prop='IsolationRequirementsText'>
              <el-checkbox-group v-model="extra.IsolationRequirementsText" @change="isolationReqChange">
                <el-checkbox v-for="item in IsolationReqs" :key="item.value" :label="item.label" :value="item.value"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span='10' class="width-initial IsolationRequirementsRemark" v-if="otherIsoReq==true" >
            <el-form-item label="" prop='IsolationRequirementsRemark'>
              <el-input v-model="extra.IsolationRequirementsRemark" class="otherIsoReq" placeholder="请输入其他隔离要求"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="病床要求" prop='ConditionRequirement'>
              <el-radio-group v-model="extra.ConditionRequirement">
                <el-radio class="radio" :label="1" >普通床</el-radio>
                <el-radio class="radio" :label="2" >加床</el-radio>
                <el-radio class="radio" :label="3" >特护床</el-radio>
                <el-radio class="radio" :label="4" >普通&加床</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="床位类型" prop='BedTypeText'>
              <el-checkbox-group v-model="extra.BedTypeText">
                <el-checkbox v-for="item in BedTypes" :key="item.value" :label="item.label" :value="item.value"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='20'>
            <el-form-item label="其他要求" prop='OtherRequired'>
                <el-input v-model="extra.OtherRequired" type="textarea" :rows="3" placeholder="请输入其他要求"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </main>

    <div class="page_footer">
      <el-row :gutter="20" class="flex-align">
        <el-col :span="24">
          <el-button type="default" @click.native="prevStep">上一步</el-button>
          <el-button type="primary" @click.native="nextStep">下一步</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import '../../assets/sass/addtransfer.scss';
import '../../assets/sass/zz.scss';
import { mapGetters,mapActions } from 'vuex';
import axios from 'axios';
import { apiurl } from '../../service/api.js';
var readIDCard = function() {
    var result;
    axios.get('http://localhost:7181/', {
        data: { funType: 'readIDCard' },
    }).then(function(res) {
        result = res;
    }).catch(function(error) {
        alert('读取失败！错误：服务可能未启动');
    });
    return result;
};

export default {
    data() {
      // 验证预计住院天数
      var validateDayNum = (rule, value, callback) => {
        if(value > 9999) {
          // 超出取边界值
          this.extra.AppointmentPlanDayNum = 9999;
        }
        if(!/^\d+$/.test(value) || value < 1)
        {
          return callback(new Error('请输入1~9999的纯数字'));
        }else {
          return callback();
        }
      };
      return {
        transferHospitals: [],  //可转诊医院列表
        AppointmentSections: [],  // 可转入科室
        MedicalGroups: [],  //  医疗组
        otherIsoReq: false,
        prevAppointmtHosId: '',
        transferInfo: {},
        // 入院类别
        AdmissionCategorys: [{
            typeValue: '1',
            typeLabel: "手术"
        }, {
            typeValue: '2',
            typeLabel: "介入"
        },{
            typeValue: '3',
            typeLabel: "放疗"
        },{
            typeValue: '4',
            typeLabel: "临床药理"
        },{
            typeValue: '5',
            typeLabel: "伽马刀"
        },{
            typeValue: '6',
            typeLabel: "复查"
        },{
            typeValue: '7',
            typeLabel: "待查"
        },{
            typeValue: '8',
            typeLabel: "其他"
        }],

        // 紧急程度
        UrgentStates: [{
            value: '1',
            label: "一级（紧急）"
        }, {
            value: '2',
            label: "二级（平级）"
        },{
            value: '3',
            label: "三级（择期）"
        }],
        // 隔离要求
        IsolationReqs: [{
            value: 1,
            label: "无"
        }, {
            value: 2,
            label: "接触"
        },{
            value: 3,
            label: "飞沫"
        }, {
            value: 4,
            label: "空气"
        },{
            value: 5,
            label: "其他"
        }],
        // 床位类型
        BedTypes: [{
            value: 1,
            label: "普通"
        }, {
            value: 2,
            label: "100/天-200/天"
        },{
            value: 3,
            label: "500/天"
        }, {
            value: 4,
            label: "1000/天"
        }],


        extra: {
          AppointmentHospitalId: '',  // 申请转入医院
          AppointmentHospitalName: '',
          AppointmentSectionId: '', //申请转入科室
          AppointmentSectionName: '',
          MedicalGroupId: '', //医疗组
          MedicalGroupName: '',
          AdmissionCategory: '',  //入院类别
          AdmissionCategoryText: '',
          AppointmentPlanDate: '',  //申请入住日期
          AppointmentPlanDayNum: '',  //预计住院天数
          UrgentState: '',  //紧急程度
          UrgentStateText: '',
          TransferReason: '', //转诊原因
          TransportWay: '', //转运工具
          TransportWayText: '', //转运工具说明
          IllnessSeverity: '',  //病情危重程度
          IllnessSeverityText: '',
          TransferEvaluation: '', //转运评估id
          TransferEvaluationText: '', //转运评估说明
          IsolationRequirements: [],  //隔离要求id（多选，英文逗号隔开）
          IsolationRequirementsText: [],  //隔离要求中文，逗号隔开
          IsolationRequirementsRemark: '',  // 其他隔离要求
          ConditionRequirement: '', //病床要求id
          ConditionRequirementText: '',
          BedType: [],  //  床位类型
          BedTypeText: [],
          OtherRequired: '',  //其他要求
        },
        rules: {
          AppointmentHospitalId: [
            { required: true, message: '转入医院必填'}
          ],
          AppointmentSectionId: [
            { required: true, message: '转入科室必填'}
          ],
          TransferReason: [
            { required: true, message: '转诊原因必填'},
            { min: 0, max: 100, message: '转诊原因应在100字符以内', trigger: 'blur' }
          ],
          TransportWay: [
            { required: true, message: '转运工具必选'}
          ],
          OtherRequired: [
            { min: 0, max: 200, message: '其他要求应在200字符以内', trigger: 'blur' }
          ],
          IllnessSeverity: [
            { required: true, message: '病情危重程度必选'}
          ],
          TransferEvaluation: [
            { required: true, message: '转运评估必选'}
          ],
          IsolationRequirementsText: [
            { required: true, message: '隔离要求必选'}
          ],
          IsolationRequirementsRemark: [
            { required: true, message: '选中其他时，其他隔离要求必填'},
            { min: 0, max: 50, message: '其他隔离要求应在50字符以内', trigger: 'blur' }
          ],
          ConditionRequirement: [
            { required: true, message: '病床要求必选'}
          ],
          BedTypeText: [
            { required: true, message: '床位类型必选'}
          ],
          AppointmentPlanDate: [
            { required: true, message: '申请入住日期必填'}
          ],
          AppointmentPlanDayNum: [
            { required: true, message: '预计住院天数必填'},
            { validator: validateDayNum, trigger: 'blur'}
          ],
        },
        extraOut:{

        },

        d: '',


        index: 0,
        keyindex:[11,22,33,44],

        getPatientInfoflog:false//判断是否返填
      }
    },
    computed: {
       ...mapGetters({
          token:'token'
        }),
    },
    mounted() {
        var self = this;
        self.hoslistdata(); 
        self.getTranferInfo();
      //如果是第三步返回
        if(localStorage.getItem('secondExtra') != undefined && localStorage.getItem('steptwoisfirst') == 'false') {
          self.extra = $.parseJSON(localStorage.getItem('secondExtra'));
          var checkedText = self.extra.IsolationRequirementsText.toString();
          if(checkedText.indexOf('其他') != -1) {
            self.otherIsoReq = true;
            //self.extra.IsolationRequirementsRemark = localStorage.getItem('IsolationRequirementsRemark');
            //console.log('缓存中其他隔离要求：'+self.extra.IsolationRequirementsRemark);
          }
          else {
            self.otherIsoReq = false;
          }
          //console.log('第三步返回：'+JSON.stringify(self.extra));
        }
    },
    methods: {
      getTranferInfo() {
        var self = this;
        if(localStorage.getItem('transferInfo') != undefined) {
          localStorage.removeItem('secondExtra');
          self.transferInfo = $.parseJSON(localStorage.getItem('transferInfo'));
          self.extra.AppointmentHospitalId = self.transferInfo.AppointmentHospitalId;
          self.extra.AppointmentSectionId = self.transferInfo.AppointmentSectionId;
          self.extra.MedicalGroupId = self.transferInfo.MedicalGroupId;
          self.extra.AdmissionCategory = self.transferInfo.AdmissionCategory;
          self.extra.AppointmentPlanDate = self.transferInfo.AppointmentPlanDate;
          self.extra.AppointmentPlanDayNum = self.transferInfo.AppointmentPlanDayNum;
          self.extra.UrgentState = self.transferInfo.UrgentState;
          self.extra.TransferReason = self.transferInfo.TransferReason;
          console.log('转运工具是：'+typeof self.extra.TransportWay);
          self.extra.TransportWay = ~~self.transferInfo.TransportWay;
          self.extra.IllnessSeverity = ~~self.transferInfo.IllnessSeverity;
          self.extra.TransferEvaluation = ~~self.transferInfo.TransferEvaluation;
          var ioslat = self.transferInfo.IsolationRequirementsText;
          self.extra.IsolationRequirementsText = ioslat==''?'':ioslat.split(',');
          self.isolationReqChange();
          self.extra.IsolationRequirementsRemark = self.transferInfo.IsolationRequirementsRemark;
          self.extra.ConditionRequirement = ~~self.transferInfo.ConditionRequirement;
          var bedtype = self.transferInfo.BedTypeText;
          self.extra.BedTypeText = bedtype==''?'':bedtype.split(',');
          self.extra.OtherRequired = self.transferInfo.OtherRequired;

          console.log('首次进第二个页面获取的缓存转诊信息是：',JSON.stringify(self.transferInfo));
          console.log('首次进第二个页面从缓存赋值的extra', JSON.stringify(self.extra));
        }
      },
      hoslistdata() {
        var self = this;
        var transType = $.parseJSON(localStorage.getItem("firstExtra")).thisType;
        console.log(transType);
        axios.get(apiurl.GetTransferHosList, {
          params: {
              type: 'self',
              token: self.token
          }
        }).then(function (res) {
          if(res.data.suc == true){
              self.transferHospitals = res.data.rows;
        console.log(self.transferHospitals,'bbb')
          } else {
              self.$alert(res.data.mes, '提示', )
          }
        }).catch(function(error) {
            console.log(error);
        });
      },
      //入院类别
      getCategoryText(){
        var self = this;
        var selectedIndex = self.extra.AdmissionCategory;
        var text = self.AdmissionCategorys.find((value, index, item) => {
          return index == selectedIndex-1;
        });
        self.extra.AdmissionCategoryText = text.typeLabel;
      },
      getAppointmentPlanDate(value) {
        var self = this;
        self.extra.AppointmentPlanDate = value;
      },
      //紧急程度
      getUrgentText(){
        var self = this;
        var selectedIndex = self.extra.UrgentState;
        var text = self.UrgentStates.find((value, index, item) => {
          return index == selectedIndex-1;
        });
        self.extra.UrgentStateText = text.label;
      },
      // 数组排序比较
      compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
      },
      // 隔离要求
      getIsolationReq() {
        var self = this;
        var reqstextArr = self.extra.IsolationRequirementsText;  //隔离要求文本arr
        var reqsArr = []; //选中的包含隔离要求id和隔离要求文本的数组

        if(reqstextArr.length > 0) {
          var selectedText = '';
          self.extra.IsolationRequirements=[];

          reqstextArr.forEach(function(value){
            selectedText = value;
            self.IsolationReqs.find((item)=>{
              if(item.label == selectedText && self.extra.IsolationRequirements.indexOf(item.value) == -1) {
                reqsArr.push(item);
              }
            });
          });
        }
        //console.log('已选中的隔离要求整个数组是：'+JSON.stringify(reqsArr));
        if(reqsArr.length > 0) {
          self.extra.IsolationRequirementsText = [];
          reqsArr.sort(self.compare('value'));  // 对包含隔离要求id和隔离要求文本的数组进行排序
          reqsArr.forEach(function(item){
            if(self.extra.IsolationRequirements.indexOf(item.value) == -1) {
              self.extra.IsolationRequirements.push(item.value);
              self.extra.IsolationRequirementsText.push(item.label);
            }
          });
        }
        //console.log('已选中的隔离要求整个数组是：'+JSON.stringify(reqsArr));
      },
      //隔离要求更改时
      isolationReqChange() {
        var self = this;
        var checkedText = self.extra.IsolationRequirementsText.toString();
        if(checkedText.indexOf('其他') != -1) {
          self.otherIsoReq = true;
        }
        else {
          //localStorage.removeItem('IsolationRequirementsRemark');
          self.otherIsoReq = false;
        }
      },
      // 床位类型
      BedTypeChange() {
        var self = this;
        var bedTypeTextArr = self.extra.BedTypeText;  //床位类型文本arr
        var bedTypeArr = []; //选中的包含床位类型id和床位类型文本的数组
        if(bedTypeTextArr.length > 0) {
          var selectedText = '';
          self.extra.BedType = [];
          bedTypeTextArr.forEach(function(value){
            selectedText = value;
            self.BedTypes.find((item)=>{
              if(item.label == selectedText && self.extra.BedType.indexOf(selectedText) == -1) {
                bedTypeArr.push(item);
              }
            });
          });
        }
        if(bedTypeArr.length > 0) {
          self.extra.BedTypeText = [];
          bedTypeArr.sort(self.compare('value'));  // 对包含床位类型id和床位类型文本的数组进行排序
          bedTypeArr.forEach(function(item){
            if(self.extra.BedType.indexOf(item.value) == -1) {
              self.extra.BedType.push(item.value);
              self.extra.BedTypeText.push(item.label);
            }
          });
        }
      },
      //获取可转入医院名称；可转诊科室
      AppointmentHosChange: function(){
        var self = this;             
        var selectedIndex = self.extra.AppointmentHospitalId;
        if(self.prevAppointmtHosId!= '' && self.prevAppointmtHosId != selectedIndex) {
          self.extra.AppointmentSectionId = '';
          self.extra.MedicalGroupId = '';
        }
        if(selectedIndex != '') {
          axios.get(apiurl.GetSectionByHospitalId, {
            params: {
                hospitalId: selectedIndex,
                token: self.token
            }
          }).then(function (res) {
            if(res.data.suc == true){
                self.AppointmentSections = res.data.rows;
                self.MedicalGroups = res.data.footer; 
                var itemObj = self.transferHospitals.find((value, index, item) => {
                  console.log(value,index,item,'a')
                  return value.HospitalId == selectedIndex;
                });
                self.extra.AppointmentHospitalName = itemObj.HospitalName;
                self.prevAppointmtHosId = self.extra.AppointmentHospitalId;  // 暂存填好的转入医院
            } else {
                self.$alert(res.data.mes, '提示', )
            }
          }).catch(function(error) {
              console.log(error);
          });
        }
      },
      // 申请转入科室 更改
      appointmentSectionChange() {
        var self = this;
        var selectedIndex = self.extra.AppointmentSectionId;
        setTimeout(function(){
          var itemObj = self.AppointmentSections.find((value, index, item) => {
            console.log(value.Id == selectedIndex,value.Id,selectedIndex)
            return value.Id == selectedIndex;
          });
          self.extra.AppointmentSectionName = itemObj.SectionName;
        },500);
        
      }, 
      localSaveExtra() {
        var self = this;
        // 获取'转运工具'文字
        var transportWay = parseInt(self.extra.TransportWay);
        switch(transportWay) {
          case 1:
            self.extra.TransportWayText = '救护车';
            break;
          case 2:
            self.extra.TransportWayText = '患者自己转运';
            break;
        }
        // 获取'病情危重程度'文字
        var illnessSeverity = parseInt(self.extra.IllnessSeverity);
        switch(illnessSeverity) {
          case 1:
            self.extra.IllnessSeverityText = '病情平缓';
            break;
          case 2:
            self.extra.IllnessSeverityText = '急症';
            break;
          case 3:
            self.extra.IllnessSeverityText = '危重症';
            break;
        }
        // 获取'转运评估'文字
        var transferEvaluation = parseInt(self.extra.TransferEvaluation);
        switch(transferEvaluation) {
          case 1:
            self.extra.TransferEvaluationText = '适合转运';
            break;
          case 2:
            self.extra.TransferEvaluationText = '转运途中风险大，已充分告知家属，家属同意转运';
            break;
        }// 获取'病情要求'文字
        var conditionRequirement = parseInt(self.extra.ConditionRequirement);
        switch(conditionRequirement) {
          case 1:
            self.extra.ConditionRequirementText = '普通床';
            break;
          case 2:
            self.extra.ConditionRequirementText = '加床';
            break;
          case 3:
            self.extra.ConditionRequirementText = '特护床';
            break;
          case 4:
            self.extra.ConditionRequirementText = '普通&加床';
            break;
        }
        // localStorage.removeItem('IsolationRequirementsRemark');
        // localStorage.setItem('IsolationRequirementsRemark', self.extra.IsolationRequirementsRemark);
        self.getIsolationReq();
        self.BedTypeChange();
        localStorage.removeItem('secondExtra');
        localStorage.setItem("secondExtra",JSON.stringify(self.extra));
        localStorage.removeItem('steptwoisfirst');
        localStorage.setItem('steptwoisfirst', 'false');
      }, 
      medicalGroupChange() {
        var self = this;
        var selectedIndex = self.extra.MedicalGroupId;
        setTimeout(function(){
          var itemObj = self.MedicalGroups.find((value, index, item) => {
            return value.Id == selectedIndex;
          });
          self.extra.MedicalGroupName = itemObj.SectionName;
        },500);
      },    
      clearFillContent() {
        const self = this;
        // self.extra.PatientName = "";
      },

      prevStep(){
        var self = this;
        self.localSaveExtra();
        self.$router.push({
            path: 'hosptlrefrrapply',
            query:{
                  ModelUrl: self.$route.query.ModelUrl
            }
        })
      },
      nextStep(){
          var self = this;
          self.$refs['extra'].validate((valid) => {
              if (valid) {
                //是否需要传到后面？
                self.localSaveExtra();
                self.$router.push({
                    path: 'hosptlrefrrconfirm',
                    query:{
                          ModelUrl: self.$route.query.ModelUrl
                    }
                })
              } else {
                  self.$alert('请对有错误提示的信息进行修改','提示',)
                  return false;
              }
          });
      },
    },
}
</script>
<style>
.ql-container.ql-snow {
    height: 150px;
}
.ql-snow .ql-picker {
    line-height: 24px;
}
.firstStepDis {
    content: "*";
    color: #ff4949;
    position: absolute;
    top: 69px;
    left: 34px;
}
</style>
