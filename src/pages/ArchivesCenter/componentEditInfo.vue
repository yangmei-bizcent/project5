<template>
  <div class="detailBox">
    <div class="treatment_content clearfix flex3">
      <!-- <div class="x_title clearfix">个人信息</div> -->
      <!-- <el-button type="primary" class="editbtn" @click="clickPreserv">保存</el-button> -->
      <el-form :model="editPersonalInfo" :rules="rules" label-width="120px" class="clearfix editpersonak">
        <el-row>
          <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="身份证号" prop='PatientCardId'>
                <el-input v-model="editPersonalInfo.PatientCardId" disabled placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>            
          </el-col>
          <el-col :span="12">
            <el-col :span='15'>
              <el-form-item label="姓名" prop='PatientName'>
                <el-input v-model="editPersonalInfo.PatientName" disabled placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-col>     
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="本人联系方式" prop='PatientPhone'>
                <el-input v-model="editPersonalInfo.PatientPhone" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-col>           
          <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="医保卡号" prop='MedicalCardId'>
                <el-input v-model="editPersonalInfo.MedicalCardId" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-col> 
          <!-- <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="电话号码">
                <el-input v-model="editPersonalInfo.PatientTelePhone" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-col>  -->
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="医疗报销类型" prop='MedicalType'>
                <el-select v-model="editPersonalInfo.MedicalType" placeholder="请选择" clearable @change='GetMedicalType'>
                  <el-option v-for="item in editPersonalInfo.MedicalTypeData" :key="item.id" :label="item.text" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col> 
          <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="医保类型 " prop='MedicalCardType'>
                <el-select v-model="editPersonalInfo.MedicalCardType" placeholder="请选择" clearable @change='GetMedicalCard'>
                  <el-option v-for="item in editPersonalInfo.MedicalCardTypeData" :key="item.id" :label="item.text" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col> 
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="紧急联系人" prop='ContactName'>
                <el-input v-model="editPersonalInfo.ContactName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-col> 
          <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="紧急联系人电话" prop='EmergencyPhone'>
                <el-input v-model="editPersonalInfo.EmergencyPhone" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-col> 
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="紧急联系人关系" prop='ContactRelation'>
                <el-select v-model="editPersonalInfo.ContactRelationValue" placeholder="请选择" clearable @change='GetContactRelation'>
                  <el-option v-for="item in editPersonalInfo.ContactRelation" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col> 
          <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="方便联系人方式">
                <el-select v-model="editPersonalInfo.EasyContactWayCode" multiple placeholder="请选择" clearable @change='GetEasyContactWay'>
                  <el-option v-for="item in editPersonalInfo.EasyContactWay" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col> 
        </el-row>
        <el-row>
          <!-- <el-col :span='12'>
            <el-col :span='15'>
              <el-form-item label="医保卡号" prop='MedicalCardId'>
                <el-input v-model="editPersonalInfo.MedicalCardId" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-col>  -->
          <el-col :span="12">
            <el-form-item label="流动人口" prop='IsFloatPopulation'>
              <el-radio-group v-model="editPersonalInfo.IsFloatPopulation">
                <el-radio class="radio" :label="1">是</el-radio>
                <el-radio class="radio" :label="2">否</el-radio>
              </el-radio-group>                
            </el-form-item>
          </el-col>     
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-col :span='5' class='marginright20'>
              <el-form-item label="常住地址" prop='Provincevalue'>
                <el-select v-model="editPersonalInfo.Provincevalue" clearable placeholder="选择省" @change="CityData">
                  <el-option v-for="item in editPersonalInfo.Province" :key="item.Code" :label="item.Name" :value="item.Code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='3' class="no_margin_left marginright20">
              <el-form-item prop='Cityvalue'>
                <el-select v-model="editPersonalInfo.Cityvalue" clearable placeholder="选择市" @change="AreaData">
                  <el-option v-for="item in editPersonalInfo.City" :key="item.Code" :label="item.Name" :value="item.Code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='3' class="no_margin_left marginright20">
              <el-form-item prop='Areavalue'>
                <el-select v-model="editPersonalInfo.Areavalue" clearable placeholder="选择区" @change="Areachange">
                  <el-option v-for="item in editPersonalInfo.Area" :key="item.Code" :label="item.Name" :value="item.Code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='9' class="no_margin_left">
              <el-form-item prop='DetailedAddress'>
                <el-input v-model="editPersonalInfo.DetailedAddress" placeholder="请输入患者的详细地址"></el-input>
              </el-form-item>
            </el-col>
          </el-col> 
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="人群分类" prop="classificationValue">              
              <el-checkbox-group ref='checkboxclass' v-model="editPersonalInfo.classificationValue" @change="checkChange" :max="max">  
                <el-checkbox class="aaa" v-for='(item) in editPersonalInfo.classificationData' :key='item.Value' :label="item.Text" :value="item.Value">{{item.Text}}</el-checkbox>                
              </el-checkbox-group>
            </el-form-item>
          </el-col>     
        </el-row>
        <el-row v-if='editPersonalInfo.chronicflog'>
          <el-col :span="24">
            <el-form-item label="慢性病(可多选)">              
              <el-checkbox-group v-model="editPersonalInfo.chronicValue" @change="chronicflogChange">  
                <el-checkbox :disabled='false' v-for='item in editPersonalInfo.chronicData' :key='item.Value' :label="item.Text" :value="item.Value">{{item.Text}}</el-checkbox>                
              </el-checkbox-group>
            </el-form-item>
          </el-col>     
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>

import { apiurl,linkUrl } from '../../service/api.js';
import '../../assets/sass/addtransfer.scss';
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    var validPCard = (rule,value,callback) => {
      var idCardNoUtil = {
        /*省,直辖市代码表*/
        provinceAndCitys: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
        31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",
        45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
        65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},

        /*每位加权因子*/
        powers: ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],

        /*第18位校检码*/
        parityBit: ["1","0","X","9","8","7","6","5","4","3","2"],

        /*性别*/
        genders: {male:"男",female:"女"},

        /*校验地址码*/
        checkAddressCode: function(addressCode){
          var check = /^[1-9]\d{5}$/.test(addressCode);
          if(!check) return false;
          if(idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0,2))]){
            return true;
          }else{
            return false;
          }
        },
        /*校验日期码*/
        checkBirthDayCode: function(birDayCode){
          var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
          if(!check) return false;
          var yyyy = parseInt(birDayCode.substring(0,4),10);
          var mm = parseInt(birDayCode.substring(4,6),10);
          var dd = parseInt(birDayCode.substring(6),10);
          var xdata = new Date(yyyy,mm-1,dd);
          if(xdata > new Date()){
            return false;//生日不能大于当前日期
          }else if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) ){
            return true;
          }else{
            return false;
          }
        },

        /*计算校检码*/
        getParityBit: function(idCardNo){
          var id17 = idCardNo.substring(0,17);
          /*加权 */
          var power = 0;
          for(var i=0;i<17;i++){
            power += parseInt(id17.charAt(i),10) * parseInt(idCardNoUtil.powers[i]);
          }
          /*取模*/
          var mod = power % 11;
          return idCardNoUtil.parityBit[mod];
        },

        /*验证校检码*/
        checkParityBit: function(idCardNo){
          var parityBit = idCardNo.charAt(17).toUpperCase();
          if(idCardNoUtil.getParityBit(idCardNo) == parityBit){
            return true;
          }else{
            return false;
          }
        },

      };
      var idCardInfo = {
        gender:"",   //性别
        birthday:"" // 出生日期
      };
      var check = false;
      if(!value) {
        return callback(new Error('请填写身份证号码'));
      }else if(value.length == 15){
        //校验身份证
        if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(value)) return callback(new Error('15位身份证号码填写错误'));
        //校验地址码
        if(!idCardNoUtil.checkAddressCode(value.substring(0,6))) return callback(new Error('15位身份证号码地址填写错误'));
        //校验日期码
        if(!idCardNoUtil.checkBirthDayCode('19' + value.substring(6,12))) return callback(new Error('15位身份证号码出生日期填写错误'));
        
        return callback();
      }else if(value.length == 18){
        //校验身份证
        if(!/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(value)) return callback(new Error('18位身份证号码填写错误'));
        //校验地址码
        if(!idCardNoUtil.checkAddressCode(value.substring(0,6))) return callback(new Error('18位身份证号码地址填写错误'));
        //校验日期码
        if(!idCardNoUtil.checkBirthDayCode(value.substring(6,14))) return callback(new Error('18位身份证号码出生日期填写错误'));
        //验证校检码
        if(!idCardNoUtil.checkParityBit(value)) return callback(new Error('18位身份证号码校验位填写错误'));
        //校验正确以后
        return callback();
      }else {
        return callback(new Error('身份证号码填写错误'));
      }
    }
    //验证必填手机号码
    var validateRequiedTelePhone = (rule, value, callback) => {
      if(!/\d([-]\d)?$/.test(value) || value.length != 11)
      {
        return callback(new Error('请输入正确的手机号码'));
      }else {
        return callback();
      }
    };
    return {
      editPersonalInfo:{
        MakeupIf:'',
        PatientName:'',//居民姓名
        PatientCardId: '',//居民身份证号
        PatientTelePhone: '',//电话号码
        PatientSex: 0,
        Province: [],
        Provincevalue: '',//省编号
        ProvinceChinese: '',//省
        City: [],
        Cityvalue: '',//市编号
        CityChinese: '',//市
        Area: [],
        Areavalue: '',//区编号
        AreaChinese: '',//区
        DetailedAddress: '',//地址
        PatientPhone: '',//手机号码
        EmergencyPhone: '',//紧急联系人方式
        ContactName: '',//紧急联系人姓名
        ContactRelationValue: null,
        ContactRelation: [],//紧急联系人关系：1，配偶2,监护人3，家人4，工作单位5，居委会6，其他
        MedicalCardType: '',//医保卡类型
        MedicalCardTypeData: [],
        MedicalCardId: '',//医保卡号
        PatientSort: [],//人群分类
        PatientSortCode: [],//人群分类code
        DiseaseLabel: [],//疾病分类
        DiseaseLabelCode: [],//疾病分类code
        EasyContactWay: [],//方便联系方式
        EasyContactWayCode: [],//方便联系方式code
        EasyContactWayValue: [],
        MedicalType: "",//医保报销类型10,其他1，社会基本医疗保险2,商业医疗保险,3,大病统筹4,新型农村合作医疗5,城镇居民基本医疗保险6,全公费7,全自费8,城镇职工基本医疗保险9,贫困救助
        MedicalTypeData: [],
        IsFloatPopulation: null,//是否流动人口0未知1是2否
        classificationValue: [],
        classificationData: [],    
        chronicflog: false,//是否显示慢性病
        chronicData: [],//慢性病    
        chronicValue: [],
      },
      tableData: [],
      currentPage:1,
      currentNum:10,
      total:null,
      loading: false,
      disabled: false,
      max:100,
      rules: {
        PatientName: [
          { required: true, message: '居民姓名必填',  trigger: 'blur'},
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        PatientCardId: [
          { required: true, validator: validPCard, trigger: 'blur' }
        ],
        PatientPhone: [
          { required: true, message: '本人联系方式必填', },
            {min: 11, max: 10, validator: validateRequiedTelePhone, trigger: 'blur' }
        ],
        MedicalCardType: [
          { required: true, message: '医保类型必选',  trigger: 'change'},
        ],
        MedicalType: [
          { required: true, message: '医疗报销类型必选',  trigger: 'change'},
        ],
        IsFloatPopulation: [{ required: true},],
        Provincevalue: [
          { required: true, message: '省必填', }
        ],
        Cityvalue: [
          { required: true, message: '市必填', }
        ],
        Areavalue: [
          { required: true, message: '区必填', }
        ],
        DetailedAddress: [
          { required: true, message: '详细地址必填', }
        ],
        classificationValue: [
          { required: true, message: '人群分类必填', }
        ],
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.Getclassification();
      this.editPersonalInfo.PatientName = this.getEditInfor.PatientName;
      this.editPersonalInfo.PatientPhone = this.getEditInfor.PatientPhone;
      this.editPersonalInfo.PatientCardId = this.getEditInfor.PatientCardId;
      this.editPersonalInfo.PatientTelePhone = this.getEditInfor.PatientTelePhone;
      this.editPersonalInfo.PatientAge = this.getEditInfor.PatientAge;
      this.editPersonalInfo.Provincevalue = this.getEditInfor.ProvinceCode;
      this.editPersonalInfo.Cityvalue = this.getEditInfor.CityCode;
      this.editPersonalInfo.Areavalue = this.getEditInfor.AreaCode;
      this.editPersonalInfo.MedicalCardType = this.getEditInfor.MedicalCardTypeCode.toString();
      this.editPersonalInfo.MedicalCardId = this.getEditInfor.MedicalCardId;
      this.editPersonalInfo.MedicalType = this.getEditInfor.MedicalType.toString();
      this.editPersonalInfo.ContactName = this.getEditInfor.ContactName;
      this.editPersonalInfo.EmergencyPhone = this.getEditInfor.EmergencyPhone;
      this.editPersonalInfo.DetailedAddress = this.getEditInfor.DetailedAddress;
      this.editPersonalInfo.IsFloatPopulation = this.getEditInfor.IsFloatPopulation;
      this.editPersonalInfo.PatientSort = this.getEditInfor.PatientSort;
      this.editPersonalInfo.PatientSortCode = this.getEditInfor.PatientSortCode;
      if(this.getEditInfor.PatientSort){
        this.editPersonalInfo.classificationValue = this.getEditInfor.PatientSort.split(',');
        this.editPersonalInfo.classificationValue.forEach((v,i) => {
          if(v == '慢性病'){
            this.editPersonalInfo.chronicflog = true
          }
          // v == '慢性病' ? this.editPersonalInfo.chronicflog = true : this.editPersonalInfo.chronicflog = false;
          v == '一般人群' ? this.max = 1 : this.max = 100;
        })
      }else{
        this.editPersonalInfo.classificationValue = [];
      }
      
      this.editPersonalInfo.chronicValue = this.getEditInfor.DiseaseLabel.split(',');
      this.editPersonalInfo.DiseaseLabel = this.getEditInfor.DiseaseLabel;
      this.editPersonalInfo.DiseaseLabelCode = !this.getEditInfor.DiseaseLabelCode ? [] : this.getEditInfor.DiseaseLabelCode;
      this.editPersonalInfo.ContactRelationValue = !this.getEditInfor.ContactRelation ? '' : this.getEditInfor.ContactRelation.toString();
      this.editPersonalInfo.EasyContactWayCode =!this.getEditInfor.EasyContactWay ? [] : this.getEditInfor.EasyContactWay.split(',');
      this.ProvinceData();
      this.GetMedicalCard();
      this.GetMedicalType();
      
      this.Getchronic();
      this.GetContactRelation();
      this.GetEasyContactWay();
      
    },500)
    
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    // 人群分类 change
    checkChange(val,val1) {
      console.log(val,val1,'val+++')
      this.editPersonalInfo.chronicflog = false;
      this.editPersonalInfo.PatientSortCode = [];
      if(val){
        this.editPersonalInfo.PatientSort = val;
      }
      val.forEach((v,i) => {
        console.log(v,'vvvvvv')
        this.editPersonalInfo.classificationData.forEach((v1,i1) => {
          if(v == v1.Text){
            this.editPersonalInfo.PatientSortCode.push(v1.Value)
          }
        }) 
        if(v == '一般人群'){
          this.editPersonalInfo.PatientSortCode = [];
          this.editPersonalInfo.DiseaseLabelCode = [];
          this.editPersonalInfo.DiseaseLabel = '';
          this.editPersonalInfo.chronicValue = [];
          this.editPersonalInfo.classificationData.forEach((v1,i1) => {
            if(v == v1.Text){
              this.editPersonalInfo.PatientSortCode.push(v1.Value)
            }
          })
          this.editPersonalInfo.classificationValue = [v];
          this.editPersonalInfo.PatientSort = [v];
          this.editPersonalInfo.chronicflog = false;
          this.max = 1;
        }else{
          this.max = 100;
        }
        if(v == '慢性病'){
          this.editPersonalInfo.chronicflog = true;
        }
      })
      if(this.editPersonalInfo.chronicflog == false) {
        // this.editPersonalInfo.chronicflog = false;
        this.editPersonalInfo.DiseaseLabelCode = [];
        this.editPersonalInfo.DiseaseLabel = '';
        this.editPersonalInfo.chronicValue = [];
      }
    },
    // 疾病分类change
    chronicflogChange(val) {
      this.editPersonalInfo.DiseaseLabelCode = [];
      if(val){
        this.editPersonalInfo.DiseaseLabel = val;
      }
      val.forEach((v,i) => {
        this.editPersonalInfo.chronicData.forEach((v1,i1) => {
          if(v == v1.Text){
            this.editPersonalInfo.DiseaseLabelCode.push(v1.Value)
          }
        })
      })
    },
    // clickPreserv() {
    //   this.$emit('clickPreserv')
    // },
    // 省
    ProvinceData() {
      console.log('省')
      axios.get(apiurl.GetRegions, {
        params:{
          code: ''
        },            
      }).then( (res) =>{
        if(res.data.suc == true){
          this.editPersonalInfo.Province=res.data.rows;
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      });       
    },
    // 市
    CityData(val) {
      console.log('市')
      setTimeout(() => {
        var selectedIndex = this.editPersonalInfo.Provincevalue;
        if(!selectedIndex == false){
          var itemObj = this.editPersonalInfo.Province.find((value, index, item) => {
            return value.Code == selectedIndex;
          });
          console.log(itemObj,itemObj.Name,'itemObj')
          this.editPersonalInfo.ProvinceChinese =itemObj.Name;
        } 
      },500); 
      axios.get(apiurl.GetRegions, {
        params:{
          code: val
        },            
      }).then( (res) =>{
        if(res.data.suc == true){
          this.editPersonalInfo.City=res.data.rows;
          if(this.editPersonalInfo.Cityvalue.substring(0,2) != this.editPersonalInfo.Provincevalue.substring(0,2)){
            this.editPersonalInfo.Cityvalue = '';
          }
          if(this.editPersonalInfo.Provincevalue == ''){
            this.editPersonalInfo.City = [];
          }
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    },
    // 区
    AreaData(val) {
      console.log('区')
      setTimeout(() => {
        var selectedIndex = this.editPersonalInfo.Cityvalue;
        if(!selectedIndex == false){
          var itemObj = this.editPersonalInfo.City.find((value, index, item) => {
            return value.Code == selectedIndex;
          });
          this.editPersonalInfo.CityChinese =itemObj.Name;
        } 
      },500); 
      axios.get(apiurl.GetRegions, {
        params:{
          code: val
        },            
      }).then( (res) =>{
        if(res.data.suc == true){
          this.editPersonalInfo.Area=res.data.rows;
          console.log(this.editPersonalInfo.Areavalue.substring(0,4),this.editPersonalInfo.Cityvalue.substring(0,4))
          if(this.editPersonalInfo.Areavalue.substring(0,4) != this.editPersonalInfo.Cityvalue.substring(0,4)){
            this.editPersonalInfo.Areavalue = '';
          }
          if(this.editPersonalInfo.Cityvalue == ''){
            this.editPersonalInfo.Area = [];
          }
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    },
    //Area Change事件
    Areachange(val) {
      setTimeout(() => {
        var selectedIndex = this.editPersonalInfo.Areavalue;
        if(!selectedIndex == false){
          var itemObj = this.editPersonalInfo.Area.find((value, index, item) => {
            return value.Code == selectedIndex;
          });
          this.editPersonalInfo.AreaChinese =itemObj.Name;
        } 
      },500); 
    },
    // 医保类型
    GetMedicalCard(val) {
      axios.get(apiurl.GetMedicalCardType, {
        params:{
        },            
      }).then( (res) =>{
        if(res.data.suc == true){
          this.editPersonalInfo.MedicalCardTypeData=res.data.rows;
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    },  
    //医保促销类别  
    GetMedicalType() {
      axios.get(apiurl.GetMedicalReimburseType, {
        params:{
        },            
      }).then( (res) =>{
        if(res.data.suc == true){
          this.editPersonalInfo.MedicalTypeData=res.data.rows;
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    },
    //人群分类
    Getclassification(val) {   
      axios.get(apiurl.GetCrowdClassify, {
        params:{
          token: this.token
        },            
      }).then( (res) =>{
        if(res.status == 200){
          this.editPersonalInfo.classificationData=res.data;
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    },  
    //疾病分类
    Getchronic() {
      axios.get(apiurl.GetChronicDiseaseOption, {
        params:{
          token: this.token
        },            
      }).then( (res) =>{
        if(res.status == 200){
          this.editPersonalInfo.chronicData=res.data;
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    }, 
    //LabelTypeCode=6是人员关系，5是医保类型，7是报销类型，4是方便联系方式
    //人员关系
    GetContactRelation() {
      axios.get(apiurl.GetLabelList, {
        params:{
          token: this.token,
          LabelTypeCode: 6
        },            
      }).then( (res) =>{
        if(res.status == 200){
          this.editPersonalInfo.ContactRelation=res.data.rows;
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    },  
    //方便联系方式
    GetEasyContactWay(val) {
      this.editPersonalInfo.EasyContactWayValue = [];
      axios.get(apiurl.GetLabelList, {
        params:{
          token: this.token,
          LabelTypeCode: 4
        },            
      }).then( (res) =>{
        if(res.status == 200){
          this.editPersonalInfo.EasyContactWay=res.data.rows;
          val.forEach((v,i) => {
            res.data.rows.forEach((v1,i1) => {
              if(v == v1.value){
                this.editPersonalInfo.EasyContactWayValue.push(v1.name)
              }
            })
          })
        } else {
          this.$alert(res.data.mes, '提示', )
        }
      }).catch((error) => {
        console.log(error);
      }); 
    },        
    handleSizeChange(val) {
      this.currentNum = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
	props:['getEditInfor']
}
</script>
<style lang='scss'>
  .treatment_content{
    position: relative;
    .editbtn{
      position: absolute;
      right: 0;
      top: 5px;
    } 
    .editpersonak{
      margin-top: 20px;
    }
    .el-select__tags{
      height: 30px !important;
      overflow: hidden;
      float: left;
      white-space: nowrap;
    }
  }
</style>