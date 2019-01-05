<template>
  <div class="ts-content wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-steps :active="1">
        <el-step title="填写基本情况" description="" style="margin-left:15%;"></el-step>
        <el-step title="填写转诊预约" description=""></el-step>
        <el-step title="确认并完成申请" description="" style='width:auto;'></el-step>
      </el-steps>
      <br>
      <el-form ref="extra" :model="extra" :rules="rules" label-width="120px" class="clearfix">
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否补录">
              <el-radio class="radio" v-model="extra.MakeupIf"  :label="1" >是</el-radio>
              <el-radio class="radio" v-model="extra.MakeupIf"  :label="0" >否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="转诊申请时间">
              <el-date-picker v-model="extra.datavalue1" type="date" placeholder="选择日期" align="right">
              </el-date-picker>
            </el-form-item>
          </el-col>          
        </el-row>
        <el-breadcrumb-item>病人基本信息</el-breadcrumb-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="身份证号" prop="PatientCardId" class='cardk'>
              <el-input v-model="extra.PatientCardId" placeholder="身份证号" class='cardbtn'>
                <el-button slot="append">读身份证</el-button>
              </el-input>
              <div class="helpcon"><img src="../../assets/img/default/help_icon.png" alt=""></div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病人姓名" size="small" prop="PatientName">
              <el-input v-model="extra.PatientName" placeholder="病人姓名"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="2">
            <el-button type="info" @click="readPatientInfo">读身份证</el-button>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="性别" prop="PatientSex">
              <el-radio class="radio" v-model="extra.PatientSex"  :label="1" >男</el-radio>
              <el-radio class="radio" v-model="extra.PatientSex"  :label="0" >女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class='datak'>
            <el-form-item label="病人出生日期">
              <el-date-picker v-model="extra.datavalue1" type="date" placeholder="选择日期" align="right">
              </el-date-picker>
            </el-form-item>
          </el-col> 
          <el-col :span='8'>
            <el-form-item label="病人年龄" size="small" prop="PatientAge">
              <el-input v-model="extra.PatientAge" placeholder="病人年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="医保报销类别" size="small" prop="MedicalType">
              <!-- <el-col :span="24" class='floatLeft'> -->
              <el-select v-model="extra.MedicalType" placeholder="医保报销类别">
                <el-option label="社会基本医疗保险" :value="1" ></el-option>
                <el-option label="商业医疗保险" :value="2"></el-option>
                <el-option label="大病统筹" :value="3"></el-option>
                <el-option label="新型农村合作医疗" :value="4"></el-option>
                <el-option label="城镇居民基本医疗保险" :value="5"></el-option>
                <el-option label="全公费" :value="6"></el-option>
                <el-option label="全自费" :value="7"></el-option>                      
                <el-option label="城镇职工基本医疗保险" :value="8"></el-option>
                <el-option label="贫困救助" :value="9"></el-option>
                <el-option label="其他" :value="10"></el-option>
              </el-select>
              <!-- </el-col> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='8'>
            <el-form-item label="病人手机号码" prop="PatientPhone">
              <el-input v-model="extra.PatientPhone" placeholder="手机号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="家属姓名" size="small" prop="MedicalCardId">
              <el-input v-model="extra.MedicalCardId" placeholder="家属姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="家属手机号码" prop="MedicalCardType">
              <el-input v-model="extra.MedicalCardId" placeholder="家属手机号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>                
        <el-row>
          <el-col :span='8'>
            <!-- <el-form-item label="" class='floatLeft' style="height: 38px;">&nbsp;</el-form-item> -->
            <el-form-item label="所属区域" prop="Province">
                <!-- <el-col :span="23"> -->
              <el-select v-model="extra.Province" placeholder="省" @change='getCity'>
                <el-option v-for="item in provinces" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
              </el-select>
                <!-- </el-col> -->
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item prop="City" class='no_margin_left'>
                <!-- <el-col :span="23"> -->
              <el-select v-model="extra.City" placeholder="市" @change='getArea'>
                <el-option v-for="item in cities" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
              </el-select>
                <!-- </el-col> -->
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item prop="Area" class='no_margin_left'>
                <!-- <el-col :span="23"> -->
              <el-select v-model="extra.Area" placeholder="区">
                <el-option v-for="item in areas" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
              </el-select>
                <!-- </el-col> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="详细地址" style="width:82%;" prop="DetailedAddress">
              <el-input v-model="extra.DetailedAddress" type="textarea" :rows="2" placeholder="详细地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-breadcrumb-item>病人病情信息</el-breadcrumb-item>
        <el-row>
          <el-col :span='8'>
            <el-form-item label="医保报销类别" size="small" prop="MedicalType">
              <el-select v-model="extra.MedicalType" placeholder="医保报销类别">
                <el-option label="社会基本医疗保险" :value="1" ></el-option>
                <el-option label="商业医疗保险" :value="2"></el-option>
                <el-option label="大病统筹" :value="3"></el-option>
                <el-option label="新型农村合作医疗" :value="4"></el-option>
                <el-option label="城镇居民基本医疗保险" :value="5"></el-option>
                <el-option label="全公费" :value="6"></el-option>
                <el-option label="全自费" :value="7"></el-option>                      
                <el-option label="城镇职工基本医疗保险" :value="8"></el-option>
                <el-option label="贫困救助" :value="9"></el-option>
                <el-option label="其他" :value="10"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="转出医院联系人" size="small">
              <el-input v-model="extra.MedicalCardId" placeholder="转出医院联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="转出医院联系人手机号" size="small">
              <el-input v-model="extra.MedicalCardId" placeholder="转出医院联系人手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="firstStepDis" style="top:11px;">*</div>
          <el-col :span='20'>
            <el-form-item label="主要诊断" style="width:100%;overflow:hidden;clear:both">
              <template slot-scope="props">
                <!-- <el-col :span='20'> -->
                  <el-input v-model="diagnosis" placeholder="初步诊断" @change='tabledataseach()' @focus='inputfocus()'></el-input>
                  <div class="seachtable" v-if='tableshow'>
                    <el-table :data="diagnosisData" border @row-click='rowclick'>
                      <el-table-column type="index" label=" " width="30"></el-table-column>
                      <el-table-column prop="ICD" label="编号" width="80"></el-table-column>
                      <el-table-column prop="DiseaseName" label="诊断名称" width="100"></el-table-column>
                      <el-table-column prop="MnemonicCode" label="诊断拼音" width="100"></el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="currentNum" layout="sizes, prev, pager, next, total" :total="total" style="margin-top:5px">
                    </el-pagination>
                  </div>
                <!-- </el-col> -->
                  <div style="margin-top:55px;height:50px;">
                    <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" data-num=''>{{tag}}</el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="PreliminaryDiagnosis" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>
                  </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span='20'>
            <el-form-item label="病人主诉">
                <el-input v-model="extra.PatientCondition" type="textarea" :rows="4" placeholder="病人主诉"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='20'>
            <el-form-item label="病情描述">
              <!-- <quill-editor 
                  v-model="extra.PatientComplaint"
                  ref="suitEditor"
                  :options="editorOption">
              </quill-editor> -->
                <el-input v-model="extra.PatientComplaint" type="textarea" :rows="4" placeholder="病情描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='6'>
            <el-form-item label="生命体征检查 ">
              <el-input v-model="extra.MedicalCardId" placeholder="体温"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='5'>
            <el-form-item label="℃" class='formwidth1'>
              <el-input v-model="extra.MedicalCardId" placeholder="脉搏"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='5'>
            <el-form-item label='次/分' class='formwidth2'>
              <el-input v-model="extra.MedicalCardId" placeholder="呼吸"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='5'>
            <el-form-item  label='次/分' class='formwidth3'>
              <el-input v-model="extra.MedicalCardId" placeholder="血压"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='2'>
            <el-form-item  label='mmHG' class='formwidth4'>
            </el-form-item>
          </el-col>
        </el-row>       
        <el-row>
          <el-col :span='20'>
            <el-form-item label="其他检查">
              <el-input v-model="extra.OthersRemark" type="textarea" :rows="4" placeholder="请输入病人的其他检查信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>      
        <el-row>
          <el-col :span='20'>
            <el-form-item label="其他说明">
              <el-input v-model="extra.OthersRemark" type="textarea" :rows="4" placeholder="请输入其他补充说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="hospinformation">
          <span class="hospinformation_title">出院信息</span>
          <span class="more_zk" @click='zkbtnfun' v-if='zkbtn == true'>展开<i class="el-icon-arrow-down"></i></span><span class="more_zk" @click='sqbtnfun' v-if='sqbtn == true'>收起<i class="el-icon-arrow-up"></i></span>
        </div>
        <div v-if='zycon == true'>
          <el-row>
            <el-col :span="10">
              <el-form-item label="入院日期">
                <el-date-picker v-model="extra.datavalue1" type="date" placeholder="选择日期" align="right">
                </el-date-picker>
              </el-form-item>
            </el-col>   
            <el-col :span="10">
              <el-form-item label="出院日期">
                <el-date-picker v-model="extra.datavalue1" type="date" placeholder="选择日期" align="right">
                </el-date-picker>
              </el-form-item>
            </el-col>           
          </el-row>     
          <el-row>
            <el-col :span='20'>
              <el-form-item label="入院原因">
                <el-input v-model="extra.OthersRemark" type="textarea" :rows="4" placeholder="请输入患者的入院原因"></el-input>
              </el-form-item>
            </el-col>
          </el-row>     
          <el-row>
            <el-col :span='20'>
              <el-form-item label="入院情况">
                <el-input v-model="extra.OthersRemark" type="textarea" :rows="4" placeholder="请输入患者的入院原因"></el-input>
              </el-form-item>
            </el-col>
          </el-row>     
          <el-row>
            <el-col :span='20'>
              <el-form-item label="诊疗经过">
                <el-input v-model="extra.OthersRemark" type="textarea" :rows="4" placeholder="请输入患者的诊疗经过"></el-input>
              </el-form-item>
            </el-col>
          </el-row>     
          <el-row>
            <el-col :span='20'>
              <el-form-item label="出院情况">
                <el-input v-model="extra.OthersRemark" type="textarea" :rows="4" placeholder="请输入患者的出院原因"></el-input>
              </el-form-item>
            </el-col>
          </el-row>        
          <el-row>
            <el-col :span='24' class='update_con'>
              <el-form-item label="附件" class='no_margin_left'>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="small" type="primary">本地上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="" class='no_margin_left smbtn'>
                <span class="smbtn1">扫码上传</span>
              </el-form-item>
            </el-col>
          </el-row>     
          <el-row>
            <el-col :span='20'>
              <el-form-item label="附件说明">
                <!-- <quill-editor 
                    v-model="extra.OthersRemark"
                    ref="otherEditor"
                    :options="editorOption">
                </quill-editor> -->
                <el-input v-model="extra.OthersRemark" type="textarea" :rows="4" placeholder="请输入附件的说明"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </main>
    <div class="page_footer">
      <el-row :gutter="20" class="flex-align">
        <el-col :span="24">
          <el-button type="primary" @click="nextStep">下一步</el-button>
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
        const self = this;
        if(!value) {
          //清空
          self.clearFillContent();
          self.patiendIdStore = "000";
          return callback(new Error('请填写身份证号码'));
        }else if(value.length == 15){
          //校验身份证                
          if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(value)) return callback(new Error('15位身份证号码填写错误'));
          //校验地址码
          if(!idCardNoUtil.checkAddressCode(value.substring(0,6))) return callback(new Error('15位身份证号码地址填写错误'));
          //校验日期码
          if(!idCardNoUtil.checkBirthDayCode('19' + value.substring(6,12))) return callback(new Error('15位身份证号码出生日期填写错误'));
          //校验正确以后，获取需要信息
          //如果身份证号不同，回填信息
          if(value != self.patiendIdStore) {
              self.getPatientInfo();
          } 
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
          console.log(value);
          console.log(self.patiendIdStore)
          if(value != self.patiendIdStore) {
            self.getPatientInfo();
          }
          return callback();
        }else {                
          return callback(new Error('身份证号码填写错误'));
        }
      }      
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        provinces: [],                  //绑定省份代码
        cities: [],                     //绑定城市代码
        areas: [],               //绑定区域代码

        zycon:false,
        zkbtn:false,
        sqbtn:true,

        extra: {              //存放病人身份证读取的信息
          MakeupIf: 1,
          datavalue1:'',
          PatientCondition: '',                 //病人病情
          PatientComplaint: '',                  //病人主诉
          OthersRemark: '',                   //其他说明
          DiagnoseICD: '',                   //初步诊断编号
          Diagnose: '',
          PatientId: "",
          PatientName: "",
          PatientSex: 1,
          PatientAge: "",
          PatientPhone: "",
          PatientTelePhone: "",
          ContactName: "",
          ContactRelation: "",
          Province: null,
          ChinaProvince:'',
          City: null,
          ChinaCity:'',
          Area: null,
          ChinaArea:'',
          DetailedAddress: "",
          MedicalType: "",
          MedicalCardType: "",
          MedicalCardId: "",
          PersonsClassStr: "",
          MedicalOrgName: "",
          RegisteredDoctorName: "",
          RegisteredDoctorPhone: "",
          TermOfValidity: "",                  //初步诊断内容
          dynamicTags: [],                       //初步诊断标签 来管理反填值  禁止输入
          PatientCardId: "",
          storeItem: []
        }, 
        extraOut:{

        },
        rules: {
          PatientName: [
            { required: true, message: '患者姓名必填', },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          PatientCardId: [
            { required: true, validator: validPCard, trigger: 'blur' }
          ],
          PatientSex: [
            { required: true, message: '患者性别必填', }
          ],
          PatientAge: [
            { required: true, message: '患者年龄必填' }
          ],
          PatientPhone: [
            { required: true, message: '患者手机号必填', }
          ],
          Province: [
            { required: true, message: '省必选', }
          ],
          City: [
            { required: true, message: '市必选', }
          ],
          Area: [
            { required: true, message: '区必选', }
          ],
          DetailedAddress: [
            { required: true, message: '详细地址必填必填', }
          ],
          City: [
            { required: true, message: '市必选',}
          ],
          Area: [
            { required: true, message: '区必选',}
          ],
          DetailedAddress: [
            { required: true, message: '详细地址必填必填', }
          ],
          MedicalType: [
            { required: true, message: '医保报销类别必填', }
          ],
          MedicalCardType: [
            { required: true, message: '医保卡类型必填', }
          ],
          MedicalCardId: [
            { required: true, message: '医保卡卡号必填', }
          ],
        },

        d: '',

        diagnosis: '',              //初步诊断输入框  绑定的值

        diagnosisData: [],             //初步诊断表格绑定的数据

        tableshow: false,              //初步诊断的表格是否显示
        currentPage: 1,
        currentNum: 10,
        total: 0,
        ICDarr: [],

        index: 0,
        keyindex:[11,22,33,44],
        PreliminaryDiagnosis: '',                 //初步诊断
        inputVisible: false,                  //初步诊断输入框
        DiagnoseNames: [],                   //初步诊断所有名称
        textarea: '',
        dynamicTags: [],
        editorOption: {},                        //富文本框的配置
        patiendIdStore: '000',               //暂存上次身份证号
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
        //如果路由跳转携带Id
        if(self.$route.query.id!=undefined){
          self.extra.PatientCardId=self.$route.query.id;
          //回填病人信息
          self.getPatientInfo()
        }
        console.log(self.$route.query.id)
        self.getProvince();
        //如果是第二步返回
        if(self.$route.query.transferInfo != undefined && self.$route.query.transferInfo.steponeisfirst == false){
            self.extra = self.$route.query.transferInfo;
            self.getPatientInfo()
            console.log("返回时加载",self.extra)
            console.log(self.extra.PatientCondition);
            console.log(self.extra.PatientComplaint);
            console.log(self.extra.OthersRemark);
            self.dynamicTags = self.extra.dynamicTags;
        }
    },
    methods: {
      //住院信息 展开收起
      zkbtnfun() {
        this.sqbtn = true;
        this.zkbtn = false;
        this.zycon = false;
      },
      sqbtnfun() {
        this.sqbtn = false;
        this.zkbtn = true;
        this.zycon = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      formateDateCN: function(day){
        var yyyy =day.substring(0,4);
        var mm = day.substring(4,6);
        var dd = day.substring(6);
        return yyyy;
      },
      //获取信息
      getIdCardInfo: function(idCardNo){
        var idCardInfo = {
          gender:"",   //性别
          birthday:"" // 出生日期
        };
        if(idCardNo.length==15){
          var aday = '19' + idCardNo.substring(6,12);
          idCardInfo.birthday=aday.substring(0,4);
          if(parseInt(idCardNo.charAt(14))%2==0){
            idCardInfo.gender="female";
          }else{
            idCardInfo.gender="male";
          }     
        }else if(idCardNo.length==18){
          var aday = idCardNo.substring(6,14);
          idCardInfo.birthday=aday.substring(0,4);
          if(parseInt(idCardNo.charAt(16))%2==0){
            idCardInfo.gender="female";
          }else{
            idCardInfo.gender="male";
          } 
            
        }
        return idCardInfo;
      },        
      clearFillContent() {
        const self = this;
        self.extra.PatientName = "";
        self.extra.PatientCardId = "";
        self.extra.PatientSex = 3;
        self.extra.PatientAge = "";
        self.extra.PatientPhone = "";
        self.extra.Province = "";
        self.extra.City = "";
        self.extra.Area = "";
        self.extra.DetailedAddress = "";
        self.extra.MedicalType = "";
        self.extra.MedicalCardType = "";
        self.extra.MedicalCardId = "";
        self.diagnosis = "";
        self.dynamicTags = [];
        self.extra.PatientCondition = "";
        self.extra.PatientComplaint = "";
        self.extra.OthersRemark = "";
      },
      getPatientInfo() {                                //根据病人身份证号获取信息
        var self = this;
        // self.patiendIdStore = self.extra.PatientCardId;  //将输入的身份证存储在patiendIdStore
        axios.get(apiurl.GetReferralPatientView, {
          params: {
            token: self.token,
            cardId:self.extra.PatientCardId
          }   
        }).then(function (res) {
          if(res.data.suc){
            if(res.data.extra) {                        
              // self.extra = res.data.extra;
              //写法错误，因为对extra进行了重写
              if(!self.getPatientInfoflog){
                self.getPatientInfoflog=true;
                self.extra.PatientName = res.data.extra.PatientName;
                self.extra.PatientCardId = res.data.extra.PatientCardId;
                self.extra.PatientSex = res.data.extra.PatientSex;
                self.extra.PatientAge = res.data.extra.PatientAge;
                self.extra.PatientPhone = res.data.extra.PatientPhone;
                self.extra.Province = res.data.extra.Province;
                self.extra.City = res.data.extra.City;
                self.extra.Area = res.data.extra.Area;
                self.extra.DetailedAddress = res.data.extra.DetailedAddress;
                self.extra.MedicalType = res.data.extra.MedicalType;
                self.extra.MedicalCardType = res.data.extra.MedicalCardType;
                self.extra.MedicalCardId = res.data.extra.MedicalCardId;
                console.log("请求患者基本信息",self.extra);
                self.patiendIdStore = res.data.extra.PatientCardId; //请求完以后将Id存到临时变量区
              }                    
            }else {
              if(self.extra.PatientCardId != self.patiendIdStore) {
                self.extra.PatientName = "";
                self.extra.PatientPhone = "";
                self.extra.Province = "";
                self.extra.City = "";
                self.extra.Area = "";
                self.extra.DetailedAddress = "";
                self.extra.MedicalType = "";
                self.extra.MedicalCardType = "";
                self.extra.MedicalCardId = "";
              }
              console.log(res.data.mes == "未查到患者信息");
              self.patiendIdStore = '111';
              let date = new Date();
              let age = Number(date.getFullYear()) - self.getIdCardInfo(self.extra.PatientCardId).birthday + 1;
              let gender = self.getIdCardInfo(self.extra.PatientCardId).gender;
              console.log(age);
              self.extra.PatientAge = age;
              if(gender=="female") {
                  self.extra.PatientSex = 0;
              }else if(gender=="male") {
                  self.extra.PatientSex = 1;
              }
            }
          }
        }).catch(function(error) {
            console.log(error);
        });
      },
      readPatientInfo() {
          var self = this;
          axios.get('http://localhost:7181/', {
            data: {
              funType: 'test'
            }
          }).then(function(res) {
            console.log(res);
            if (res.retCode != 0) {
                this.$alert('服务未启动', '提示');
            } else {
              var result = self.readIDCard();
              console.log("inner",2222222)
              var dataStr;
              if (result.retCode == 0) {
                dataStr = result.retInfo;
              } else {
                dataStr = result.retInfo;
                layer.open({ title: '提示', content: dataStr });
                return false;
              }
              var data = JSON.parse(dataStr);
              var patientCardId = data.Sfzh;
              if (patientCardId != ''){
                if(this.IdentityCodeValid(this.extra.PatientCardId)){
                  axios.get(apiurl.GetReferralPatientView, {
                    params: {
                      token:self.token,
                      cardId:self.extra.PatientCardId
                    }   
                  }).then(function (res) {
                    console.log(res);
                    if (res.data.suc == true) {
                      self.extra = res.data.extra;
                    }
                  }).catch(function(error) {
                    console.log(error);
                  });
                }
              }
            }
          }).catch(function(error) {
            console.log("111111111catch");
            self.$confirm('未安装读卡器插件，是否安装？?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var url = "http://jthy.zwjk.com/Upload/file/template/setup.exe";
              window.location.href = url;
            }).catch(() => {
            });
          });
          
      },
      getProvince() {                                 //获取省
        var self = this;
        axios.get(apiurl.GetRegions, {
                code: '',
        }).then(function (res) {
            if(res.data.suc == true){
                self.provinces = res.data.rows;
            } else {
                self.$alert(res.data.mes, '提示', )
            }
        }).catch(function(error) {
            console.log(error);
        });
      },
      getCity(val) {                                        //获取市
        var self = this;
        axios.get(apiurl.GetRegions, {
            params:{
                code: parseInt(val),
            }
        }).then(function(res) {
            if (res.data.suc == true) {
                self.cities = res.data.rows;
                console.log(self.extra.City)
                if(self.extra.City.substring(0,2) != self.extra.Province.substring(0,2)){
                    self.extra.City = '';
                }
                // self.extra.City = '';
            } else {
                self.$alert(res.data.mes, '提示', )
            }
        }).catch(function(error) {
            console.log(error);
        });
      },
      getArea(val) {                                //获取区
        var self = this;
        axios.get(apiurl.GetRegions, {
            params:{
                code: parseInt(val),
            }
        }).then(function(res) {
            if (res.data.suc == true) {
                self.areas = res.data.rows;
                if(self.extra.City.substring(0,4) != self.extra.Area.substring(0,4)){
                    self.extra.Area = '';
                }
                // self.extra.Area = '';
            } else {
                self.$alert(res.data.mes, '提示', )
            }
        }).catch(function(error) {
            console.log(error);
        });
      },
      tabledataseach(){                               //出院诊断输入框聚焦时    发送请求   展示的表格
          var self=this;
          console.log(apiurl,'apiurl')
          axios.get(apiurl.GetDiseaseOptions, {
              params:{
              page:self.currentPage,
              rows:self.currentNum,
              kw:self.diagnosis,
              token:self.token
              }     
          }).then(function (response) {
              if(response.data.suc == true){
                  self.tableshow=true;
                  self.diagnosisData=response.data.rows;
                  self.total=response.data.total;
              }else{
                  self.$alert(response.data.mes,'提示',)
              }
          }).catch(function(error) {
              console.log(error);
          });
      },
      handleSizeChange(val) {               //初步诊断表格每页展示条数发生改变
          this.currentNum = val;
          this.tabledataseach();
      },
      handleCurrentChange(val) {               //初步诊断表格当前页码发生改变
          this.currentPage = val;
          this.tabledataseach();
      },
      inputfocus(){                     //初步诊断输入框聚焦
          var self=this;
          setTimeout(() => {  
              self.diagnosis='';
              self.tabledataseach();  
          },500)
      },
      rowclick(val) {                    //点击初步诊断的表格   获取表格该行内容
          var self = this;
          this.index = this.index+1;
          this.textarea += self.index + ':'+ val.ICD + val.DiseaseName + '(' + val.MnemonicCode + ')' + '\n';
          this.tableshow=false;
          this.diagnosis = val.DiseaseName;

          // var inputdata = val.ICD + ':' + val.DiseaseName + '(' + val.MnemonicCode + ')';
          var inputdata = val.DiseaseName;
          let inputValue = inputdata;
          if (self.dynamicTags.length > 0) {
              var tagFlag = true
              this.dynamicTags.forEach(function(element) {        //初步诊断去重
                  if (element == inputValue) {
                      tagFlag = false;
                  }
              }, this);
              if (tagFlag) {
                  this.dynamicTags.push(inputValue);
              } else {
                  this.$alert('该初步诊断已选择', '提示', )
              }
          } else {
              this.dynamicTags.push(inputValue);
          }
          console.log("初步诊断存储字段：",this.dynamicTags)
          this.inputVisible = false;
          this.PreliminaryDiagnosis = '';
          if (self.ICDarr.length > 0) {
              var ICDflag = true;
              self.ICDarr.forEach(function(element) {       //ICDarr去重
                  if (element == val.ICD) {
                      ICDflag = false;
                  }
              }, this);
              if (ICDflag) {
                  self.ICDarr.push(val.ICD);
                  this.DiagnoseNames.push(val.DiseaseName)
              }
          } else {
              self.ICDarr.push(val.ICD);
              this.DiagnoseNames.push(val.DiseaseName)
          }
          this.extra.DiagnoseICD = this.ICDarr.toString();
          this.extra.Diagnose = this.DiagnoseNames.toString();
      } ,
      handleClose(tag) {
        if(this.dynamicTags.length > 0){
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
          // this.ICDarr.splice(this.ICDarr.indexOf(tag.split(':')[0]), 1)
          this.ICDarr.splice(this.dynamicTags.indexOf(tag), 1)
          this.extra.DiagnoseICD = this.ICDarr.toString();
          // this.DiagnoseNames.splice(this.ICDarr.indexOf(tag.split(':')[1].split('(')[1].split(")")[0]), 1)
          this.DiagnoseNames.splice(this.dynamicTags.indexOf(tag), 1)
          this.extra.Diagnose = this.DiagnoseNames.toString();
        }
        if(this.dynamicTags.length == 0){
          this.diagnosis = '';
        }
      },
      handleInputConfirm() {
          let inputValue = this.PreliminaryDiagnosis;
          if (inputValue) {
              this.dynamicTags.push(inputValue);
          }
          this.inputVisible = false;
          this.PreliminaryDiagnosis = '';
      },
      nextStep(){
          var self = this;
          self.extra.dynamicTags = self.dynamicTags;
          self.provinces.forEach(function(ele){
              if(ele.Code == self.extra.Province){
                  self.extra.ChinaProvince = ele.Name;
              }
          })
          self.cities.forEach(function(ele){
              if(ele.Code == self.extra.City){
                  self.extra.ChinaCity = ele.Name;
              }
          })
          self.areas.forEach(function(ele){
              if(ele.Code == self.extra.Area){
                  self.extra.ChinaArea = ele.Name;
              }
          })
          console.log(self.extra,"??????");
          // self.extraOut.PatientName = self.extra.PatientName;
          // self.extraOut.PatientPhone = self.extra.PatientPhone;
          // self.extraOut.Province = self.extra.Province;
          // self.extraOut.City = self.extra.City;
          // self.extraOut.Area = self.extra.Area;
          // self.extraOut.DetailedAddress = self.extra.DetailedAddress;
          // self.extraOut.MedicalType = self.extra.MedicalType;
          // self.extraOut.MedicalCardType = self.extra.MedicalCardType;
          // self.extraOut.MedicalCardId = self.extra.MedicalCardId;
          self.$refs['extra'].validate((valid) => {
              if (valid) {
                if(self.extra.dynamicTags.length!=0){  
                    self.extra.storeItem = self.extra.dynamicTags;
                  axios.post(apiurl.UpdatePatient, {
                      PatientCardId:self.extra.PatientCardId,
                      PatientName:self.extra.PatientName,
                      PatientPhone:self.extra.PatientPhone,
                      Province:self.extra.Province,
                      City:self.extra.City,
                      Area:self.extra.Area,
                      MedicalType:self.extra.MedicalType,
                      MedicalCardType:self.extra.MedicalCardType,
                      MedicalCardId:self.extra.MedicalCardId,
                      PatientTelePhone:self.extra.PatientTelePhone,                      
                      ContactName:"",
                      ContactRelation:"",
                      DetailedAddress:self.extra.DetailedAddress,
                  },{
                    headers:{
                      token:self.token
                    }
                  }).then(function (res) {
                      console.log("第一步跳转之前",self.extra)
                      if(res.data.suc){
                        self.extra.PatientId=res.data.mes;
                        //是否需要传到后面？
                        self.$router.push({
                            path: 'writehosptlrefrrinfo',
                            query: {
                                transferInfo: self.extra,
                                ModelUrl: self.$route.query.ModelUrl
                            }
                        })
                          
                      }else{
                          self.$alert(res.data.mes,'提示',)
                      }
                  }).catch(function (error) {
                      console.log(error);
                  }); 
                  
                }else{
                  self.$alert('初步诊断必填','提示',)
                }
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
