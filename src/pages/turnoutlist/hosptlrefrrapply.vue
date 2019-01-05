<template>
  <div class="ts-content wrapper-datepicker newcss nowidth form_refrrapply">
    <main class="main-wrap">
      <el-steps :active="1">
        <el-step title="住院转诊申请" description="" style="margin-left:15%;"></el-step>
        <el-step title="填写转诊信息" description=""></el-step>
        <el-step title="确认申请" description="" style='width:auto;'></el-step>
      </el-steps>
      <br>
      <el-form ref="extra" :model="extra" :rules="rules" label-width="120px" class="clearfix">
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否补录">
              <el-radio-group v-model="extra.IsSupplement" @change="supplemtChange">
                <el-radio class="radio" :label="true" >是</el-radio>
                <el-radio class="radio" :label="false" >否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="refftimeshow == true">
            <el-form-item label="转诊申请时间" prop="SupplementDate">
              <el-date-picker v-model="extra.SupplementDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" align="right" @change="getSupplementDate">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-breadcrumb-item>病人基本信息</el-breadcrumb-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="病人身份证号" prop="PatientCardId" class='cardk'>
              <el-input v-model="extra.PatientCardId" placeholder="身份证号" class='cardbtn'>
                <el-button slot="append">读身份证</el-button>
              </el-input>
              <div class="helpcon" @click="ReadIdCardNoticeVisible = true">
                <el-tooltip content="点击查看什么是读身份证" placement="bottom-start" effect="light">
                  <img src="../../assets/img/default/help_icon.png" alt="">
                </el-tooltip>
              </div>
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
            <el-form-item label="病人性别" prop="PatientSex">
              <el-radio class="radio" v-model="extra.PatientSex"  :label="1" >男</el-radio>
              <el-radio class="radio" v-model="extra.PatientSex"  :label="0" >女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class='datak'>
            <el-form-item label="病人出生日期">
              <el-date-picker v-model="extra.PatientBirthday" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" align="right" @change="getPatientBirthday">
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
              <el-select v-model="extra.MedicalType" clearable placeholder="医保报销类别" @change='medicalTypeChange'>
                <el-option v-for="items in MedicalTypes" :key="items.typeValue" :label="items.typeLabel" :value="items.typeValue" ></el-option>
              </el-select>
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
            <el-form-item label="家属姓名" size="small" prop="ContactName">
              <el-input v-model="extra.ContactName" placeholder="家属姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="家属手机号码" prop="EmergencyPhone">
              <el-input v-model="extra.EmergencyPhone" placeholder="家属手机号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='8'>
            <!-- <el-form-item label="" class='floatLeft' style="height: 38px;">&nbsp;</el-form-item> -->
            <el-form-item label="病人所属区域" prop="Province">
                <!-- <el-col :span="23"> -->
              <el-select v-model="extra.Province" clearable  placeholder="省" @change='getCity'>
                <el-option v-for="item in provinces" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
              </el-select>
                <!-- </el-col> -->
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item prop="City" class='no_margin_left'>
                <!-- <el-col :span="23"> -->
              <el-select v-model="extra.City" clearable placeholder="市" @change='getArea'>
                <el-option v-for="item in cities" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
              </el-select>
                <!-- </el-col> -->
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item prop="Area" class='no_margin_left'>
                <!-- <el-col :span="23"> -->
              <el-select v-model="extra.Area" clearable placeholder="区">
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
            <el-form-item label="转出科室" size="small" prop="ApplySectionId">
              <el-select v-model="extra.ApplySectionId" clearable filterable :disabled="disableSelect"  placeholder="转出科室" @change="applySectionChange">
                <el-option v-for="item in applySections" :key="item.Id" :label="item.SectionName" :value="item.Id" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="转出医院联系人" size="small" prop="ApplyDoctorId">
              <el-select v-model="extra.ApplyDoctorId" clearable filterable :disabled="disableSelect"  placeholder="转出医院联系人" @change="applyDoctorChange">
                <el-option v-for="item in applyDoctors" :key="item.DoctorId" :label="item.DoctorName" :value="item.DoctorId" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="转出医院联系人手机号" size="small" prop="ApplyDoctorPhone">
              <el-input v-model="extra.ApplyDoctorPhone" placeholder="转出医院联系人手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="firstStepDis" style="top:11px;">*</div>
          <el-col :span='20'>
            <el-form-item label="主要诊断" style="width:100%;overflow:hidden;clear:both">
              <template slot-scope="props">
                <!-- <el-col :span='20'> -->
                  <el-input class="diagsInput" v-model="diagnosis" placeholder="输入初步诊断的关键字或拼音首字母进行搜索" @change='tabledataseach()' @focus='inputfocus()' @blur='inputblur'></el-input>
                  <div class="seachtable" v-if='tableshow'>
                  <!-- <el-input v-model="diagnosis" placeholder="输入初步诊断的关键字或拼音首字母进行搜索" ref="diagnosisInput" @change='tabledataseach()' @focus='inputfocus()' @blur="tableshow=false"></el-input>
                  <div class="seachtable" v-show='tableshow || inTable' @mouseenter.native="inTable=true"  @mouseleave.native="outTable"> -->
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
                  <div style="height:80px;">
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
            <el-form-item label="病人主诉" prop="PatientComplaint">
                <el-input v-model="extra.PatientComplaint" type="textarea" :rows="4" placeholder="请输入病人的病人主诉"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='20'>
            <el-form-item label="病情描述" prop='PatientCondition'>
              <!-- <quill-editor 
                  v-model="extra.PatientComplaint"
                  ref="suitEditor"
                  :options="editorOption">
              </quill-editor> -->
                <el-input v-model="extra.PatientCondition" type="textarea" :rows="4" placeholder="请输入病人的病情描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='6'>
            <el-form-item label="生命体征检查" prop='ExaminationTemperature'>
              <el-input v-model="extra.ExaminationTemperature" placeholder="体温"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='5'>
            <el-form-item label="℃" class='formwidth1' prop='ExaminationPulse'>
              <el-input v-model.number="extra.ExaminationPulse" placeholder="脉搏"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='5'>
            <el-form-item label='次/分' class='formwidth2' prop='ExaminationBreathing'>
              <el-input v-model="extra.ExaminationBreathing" placeholder="呼吸"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='5'>
            <el-form-item  label='次/分' class='formwidth3' prop='ExaminationBloodPressure'>
              <el-input v-model="extra.ExaminationBloodPressure" placeholder="血压"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='2'>
            <el-form-item  label='mmHG' class='formwidth4'>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='20'>
            <el-form-item label="其他检查" prop='OthersRemark'>
              <el-input v-model="extra.OthersRemark" type="textarea" :rows="4" placeholder="请输入病人的其他检查信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='20'>
            <el-form-item label="其他说明" prop='OthersDescription'>
              <el-input v-model="extra.OthersDescription" type="textarea" :rows="4" placeholder="请输入其他补充说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="hospinformation">
          <span class="hospinformation_title">出院信息</span>
          <span class="more_zk" @click='zkbtnfun' v-if='zkbtn == true'>展开&nbsp;<i class="el-icon-arrow-down"></i></span><span class="more_zk" @click='sqbtnfun' v-if='sqbtn == true'>收起&nbsp;<i class="el-icon-arrow-up"></i></span>
        </div>
        <div v-if='zycon == true'>
          <el-row>
            <el-col :span="10">
              <el-form-item label="入院日期" prop="InApplyHospitalDate">
                <el-date-picker v-model="extra.InApplyHospitalDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" align="right" @change="getInApplyHospitalDate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="出院日期" prop="OutApplyHospitalDate">
                <el-date-picker v-model="extra.OutApplyHospitalDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" align="right" @change="getOutApplyHospitalDate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='20'>
              <el-form-item label="入院原因" prop='InApplyHospitalReason'>
                <el-input v-model="extra.InApplyHospitalReason" type="textarea" :rows="4" placeholder="请输入患者的入院原因"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='20'>
              <el-form-item label="入院情况" prop='InApplyHospitalRemark'>
                <el-input v-model="extra.InApplyHospitalRemark" type="textarea" :rows="4" placeholder="请输入患者的入院情况"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='20'>
              <el-form-item label="诊疗经过" prop='InApplyHospitalTreatment'>
                <el-input v-model="extra.InApplyHospitalTreatment" type="textarea" :rows="4" placeholder="请输入患者的诊疗经过"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='20'>
              <el-form-item label="出院情况" prop='InApplyHospitalDischargeSituation'>
                <el-input v-model="extra.InApplyHospitalDischargeSituation" type="textarea" :rows="4" placeholder="请输入患者的出院情况"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='10' class='update_con zzupdata_con'>
              <el-form-item label="附件">
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl1"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-progress="onUploadProcess"
                  :on-success="handlesuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-exceed="handleExceed"
                  :file-list="fileurlarr"
                  accept="application/pdf,image/jpeg,image/png,	aplication/zip,application/msword,application/vnd.ms-excel,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/x-rar-compressed">
                  <el-button size="small" type="primary" :disabled='isUploadDisabled'>本地上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    附件格式说明
                    <div class="helpcon">
                      <el-tooltip content="支持文件格式：pdf，jpg，jpeg，png，doc，docx，xls，xlsx，txt，单个可上传的文件大小不超过20M" placement="bottom-start" effect="light">
                        <img src="../../assets/img/default/help_icon.png" alt="">
                      </el-tooltip>
                    </div>
                  </div>
                </el-upload>
                <el-button size="small" type="info" class="btn-scanupload" @click="showScanCodeDlg">扫码上传</el-button>
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" v-show="imageFile" :src="dialogImageUrl" :alt="dialogImageAlt">
                  <div v-show="notImageFile">无法查看</div>
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='20'>
              <el-form-item label="附件说明" prop='InApplyHospitalFilesRemark'>
                <el-input v-model="extra.InApplyHospitalFilesRemark" type="textarea" :rows="4" placeholder="请输入附件的说明"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </main>
    <!-- 身份证阅读器介绍 -->
    <el-dialog
      :visible.sync="ReadIdCardNoticeVisible"
      width="30%">
      <div class="idCardNoticeDlg">
        <div class="dlg-tit">身份证阅读器介绍</div>
        <div class="dlg-con">
          <el-row>
            <el-col :span="8">
              <img src="../../assets/img/idCardRead.png" alt="">
            </el-col>
            <el-col :span="16">
              身份证阅读器，指的是采用IC卡阅读技术，完成对身份证有效性验证和信息的实时读取，并通过通讯口将身份证信息上传到计算机进行解码、显示、存储和查询等处理。在签约时，通过身份证阅读器，将居民身份证放置在机器上，即可一键读取居民信息并填入签约信息，减少输入，签约更快、更准确。
              <br>
              <p class="contact">联系我们购买设备：叶女士 15671682756</p>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      @close='closeScanCode'
      title="微信扫码上传"
      :visible.sync="scanCodeVisible"
      width="30%"
      center class='ewm_k'>
      <div v-show="useScan" class="logoewm">
        <div id="scanNode" ref="scanNode"></div>
      </div>
      <div class="img_k">
        <img src="" alt="" class="img_small">
      </div>
      <span class="ewmfont">微信扫一扫，通过手机相册上传图片</span>
    </el-dialog>

    <div class="page_footer">
      <el-row :gutter="20" class="flex-align">
        <el-col :span="24">
          <!-- <el-button type="default" @click="prevStep">上一步</el-button> -->
          <el-button type="primary" @click.native="nextStep">下一步</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import '../../assets/sass/addtransfer.scss';
import '../../assets/sass/zz.scss';
import QRCode from 'qrcodejs2'
import { mapGetters,mapActions } from 'vuex';
import axios from 'axios';
import qs from 'qs';
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
          self.extra.PatientAge = '';
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
          self.extra.PatientAge = '';
          return callback(new Error('身份证号码填写错误'));
        }
      }
      // 验证姓名
      // var validatePersonName = (rule, value, callback) => {
      //   if(!/^[\u4e00-\u9fa5]{0,10}$/.test(value))
      //   {
      //      return callback(new Error('姓名必须由2到10个汉字组成'));
      //   }else {
      //     return callback();
      //   }
      // };
      //验证年龄
      var validateAge = (rule, value, callback) => {
        if(!/^\d{1,3}$/.test(value))
        {
           return callback(new Error('请输入0~999的纯数字'));
        }else {
          return callback();
        }
      };
      //验证可为空手机号码
      var validateTelePhone = (rule, value, callback) => {
        if(!/\d([-]\d)?$/.test(value))
        {
          if(value == '' || value == undefined || value == null) {
            return callback();
          }
           return callback(new Error('请输入正确的手机号码'));
        }else {
          return callback();
        }
      };
      //验证必填手机号码
      var validateRequiedTelePhone = (rule, value, callback) => {
        if(!/\d([-]\d)?$/.test(value))
        {
           return callback(new Error('请输入正确的手机号码'));
        }else {
          return callback();
        }
      };
      //验证体温
      var validateTemperature = (rule, value, callback) => {
        console.log('体温'+value)
        if(value == undefined || value == ''){
          callback();
        }else{
          if(!/^\d{1,2}(\.\d{1})?$/.test(value))
          {
             return callback(new Error('体温可输入0-99'));
          }else {
            return callback();
          }
        }
        
      };      
      //验证脉搏
      var checkExaminationPulse = (rule, value, callback) => {
        var regu = /[^\d]/;
        if (value == undefined) {
          callback();
        } else {
          if(regu.test(value)) {
            callback(new Error('请输入正整数'));
          }else{
            if(value>999){
              callback(new Error('脉搏可输入0-999'));
            }else{          
              callback();
            }
          }
        }
        
      };
      //验证呼吸
      var checkExaminationBreathing = (rule, value, callback) => {
        var regu = /[^\d]/;
        if (value == undefined) {
          callback();
        } else {
          if(regu.test(value)) {
            callback(new Error('请输入正整数'));
          }else{
            if(value>99){
              callback(new Error('呼吸可输入0-99'));
            }else{          
              callback();
            }
          }
        }
      };
      //验证血压
      var checkExaminationBloodPressure = (rule, value, callback) => {
        var regu = /[^\d]/;
        if (value == undefined) {
          callback();
        } else {
          if(regu.test(value)) {
            callback(new Error('请输入正整数'));
          }else{
            if(value>999){
              callback(new Error('血压可输入0-999'));
            }else{          
              callback();
            }
          }
        }
      };
      // 验证入院日期
      var checkInApplyHosDate = (rule, value, callback) => {
        var self = this;
        var OutTime = self.extra.OutApplyHospitalDate;
        if (OutTime != '' && new Date(value).getTime() > new Date(OutTime).getTime()) {
          callback(new Error('入院日期不能大于出院日期'));
        } else {
          callback();
        }
      };
      // 验证出院日期
      var checkOutApplyHosDate = (rule, value, callback) => {
        var self = this;
        var InTime = self.extra.InApplyHospitalDate;
        if (InTime != '' && new Date(value).getTime() < new Date(InTime).getTime()) {
          callback(new Error('出院日期不能小于入院日期'));
        } else {
          callback();
        }
      };
      return {
        loginDoctorId: '',
        loginDoctorName: '',
        loginMobilePhone: '',

        disableSelect: false,

        provinces: [],                  //绑定省份代码
        cities: [],                     //绑定城市代码
        areas: [],               //绑定区域代码
        hospitalId: 0,
        applySections: [],      //转出科室
        applyDoctors: [],      //转出医院医生列表（供‘转出医院联系人’选择）
        prevApplySection: '', //保存上一次选择的转出科室,解决如‘上一步’返回到本页时和点击下一步有验证报错信息时，转出科室更改引起的，转出科室联系人被清空的问题
        applyDoctorCode: '',
        isUploadDisabled: false, // 本地上传按钮是否禁用
        transferInfo: {}, // 转诊信息

        MedicalTypes: [{
            typeValue: 1,
            typeLabel: "社会基本医疗保险"
        }, {
            typeValue: 2,
            typeLabel: "商业医疗保险"
        },{
            typeValue: 3,
            typeLabel: "大病统筹"
        },{
            typeValue: 4,
            typeLabel: "新型农村合作医疗"
        },{
            typeValue: 5,
            typeLabel: "城镇居民基本医疗保险"
        },{
            typeValue: 6,
            typeLabel: "全公费"
        },{
            typeValue: 7,
            typeLabel: "全自费"
        },{
            typeValue: 8,
            typeLabel: "城镇职工基本医疗保险"
        },{
            typeValue: 9,
            typeLabel: "贫困救助"
        },{
            typeValue: 10,
            typeLabel: "其他"
        }, ],

        zycon:false,
        zkbtn:true,
        sqbtn:false,

        refftimeshow: false,

        ReadIdCardNoticeVisible: false,   //身份证阅读器介绍弹窗显示/隐藏
        scanCodeVisible: false,

        //附件
        fileurlarr: [],
        fileUrl:[],//提交保存时的文件链接
        dialogImageAlt: '',
        dialogImageUrl: '',
        dialogVisible: false, // 图片预览
        imageFile: true,  // 预览附件时，是否是图片
        notImageFile: false, // 预览附件时，是否是图片

        useScan: false,
        longPollingUrl : "https://diagnose.zwjk.com",
        scan_caseId : "",   //随机生成数
        scan_type : 1,      //上传的类型
        scan_count : "",    //扫码上传的文件显示。空表示不限制，1表示1个。
        scan_upload_local_type : 0 ,//本地上传的方式。0腾讯云服务器，1cos服务器。

        extra: {              //存放病人身份证读取的信息
          thisType: '', //转入还是转出
          TransferId: '', // 转诊编号
          IsSupplement: false,
          SupplementDate: '',
          PatientCardId: '',
          PatientName: "",
          PatientSex: 0,
          PatientBirthday: '',
          PatientAge: null,
          MedicalType: "",
          PatientPhone: '',
          ContactName: "",
          EmergencyPhone: "",
          ApplySectionId: null,
          ApplySectionName: '',

          Province: null,
          ChinaProvince: '',
          City: null,
          ChinaCity: '',
          Area: null,
          ChinaArea: '',
          DetailedAddress: "",
          ApplyDoctorName: '',  //转出医院联系人
          ApplyDoctorId: '',
          ApplyDoctorPhone: '',
          DiagnoseICD: '',                   //初步诊断编号
          Diagnose: '',
          PatientComplaint: '',
          PatientCondition: '',
          ExaminationTemperature: null,//体温
          ExaminationPulse: null,//脉搏
          ExaminationBreathing: null,//呼吸
          ExaminationBloodPressure: null,//血压
          //生命体征检查
          OthersRemark: '',
          OthersDescription: '',
          InApplyHospitalDate: '',
          OutApplyHospitalDate: '',
          InApplyHospitalReason: '',
          InApplyHospitalRemark: '',
          InApplyHospitalTreatment: '',
          InApplyHospitalDischargeSituation: '',
          //附件上传
          uploadurl: apiurl + 'PC/DischargedPatient/UploadDischargeRecordImg',
          uploadUrl1:'',
          InApplyHospitalFiles: '',
          InApplyHospitalFileNames: '',//附件名
          InApplyHospitalFilesRemark: '',
        },
        // filesizecont: 0,
        extraOut:{

        },
        rules: {
          PatientCardId: [
            { required: true, validator: validPCard, trigger: 'blur' }
          ],
          PatientName: [
            { required: true, message: '患者姓名必填',  trigger: 'blur'},
            // { validator: validatePersonName, trigger: 'blur' }
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          SupplementDate: [
            { required: true, message: '转诊申请时间必填'}
          ],
          PatientSex: [
            { required: true, message: '患者性别必填'}
          ],
          PatientAge: [
            { required: true, message: '患者年龄必填' },
            { validator: validateAge, message: '请输入0~999的纯数字', trigger: 'blur' }
          ],
          PatientPhone: [
            { required: true, message: '患者手机号必填', },
            { validator: validateRequiedTelePhone, trigger: 'blur' }
          ],
          ContactName: [
            // { validator: validatePersonName, trigger: 'blur' }
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          EmergencyPhone: [
            { validator: validateTelePhone, trigger: 'blur' }
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
            { required: true, message: '详细地址必填'},
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          ApplySectionId: [
            { required: true, message: '转出科室必填'}
          ],
          ApplyDoctorId: [
            { required: true, message: '转出医院联系人必填'}
          ],
          ApplyDoctorPhone: [
            { required: true, message: '转出医院联系人手机号必填'},
            { validator: validateTelePhone, trigger: 'blur' }
          ],
          // 主要诊断必填
          PatientComplaint: [
            { required: true, message: '主要诊断必填', trigger: 'blur'}
          ],
          PatientCondition: [
            { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
          ],
          PatientComplaint: [
            { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
          ],
          ExaminationTemperature: [
            { validator: validateTemperature, trigger: 'blur' }
          ],
          ExaminationPulse: [
            {validator: checkExaminationPulse, trigger: 'blur'},
          ],
          ExaminationBreathing: [
            {validator: checkExaminationBreathing, trigger: 'blur'},
          ],
          ExaminationBloodPressure: [
            {validator: checkExaminationBloodPressure, trigger: 'blur'},
          ],
          OthersRemark: [
            { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
          ],
          OthersDescription: [
            { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
          ],
          InApplyHospitalDate: [
            {validator: checkInApplyHosDate, trigger: 'change'}
          ],
          OutApplyHospitalDate: [
            {validator: checkOutApplyHosDate, trigger: 'change'}
          ],
          InApplyHospitalReason: [
            { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
          ],
          InApplyHospitalRemark: [
            { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
          ],
          InApplyHospitalTreatment: [
            { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
          ],
          InApplyHospitalDischargeSituation: [
            { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
          ],
          InApplyHospitalFilesRemark: [
            { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
          ]
        },

        d: '',

        diagnosis: '',              //初步诊断输入框  绑定的值

        diagnosisData: [],             //初步诊断表格绑定的数据

        tableshow: false,              //初步诊断的表格是否显示
        tableflag:0,//为0时，table消失
        tablePagitnClick: 1,  // 判断表格显示后，点击的控件是不是页码区域, 0是，1否

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
       ...mapGetters(['token', 'hosptialid', 'sectionid', 'doctorid', 'zzpower']),
    },
    mounted() {
        var self = this;
        // localStorage.clear();
        
        if(self.zzpower == 1) {
          self.disableSelect = true;  //如果有转诊记录，且是社区医生身份登录，则‘转出科室’‘转出医院联系人’下拉禁用
        }
        localStorage.removeItem('transferInfo');
        self.extra.thisType = self.$route.query.type;
        self.extra.TransferId = self.$route.query.TransferId;
        console.log('申请页面获取到的type是：'+ self.extra.thisType);
        document.addEventListener('click',function(e){
          if(e.target.className!='cell' && e.target.className!='number' && e.target.className!='el-select-dropdown__item' && e.target.className!='el-pagination__sizes' && e.target.className!='el-input' && e.target.className!='el-input__icon' && e.target.tagName!='span' && e.target.tagName!='el-input__inner'){
              self.tablePagitnClick = 1;
              self.tableflag = 0;
              self.tableshow = false;
          }
        })
        // self.hospitalId = self.hosptialid;
        // self.getApplySections();  //获取转出科室
        // self.extra.ApplySectionId = self.sectionid;  //  转出科室初始设置成登录医生所在科室
        // self.applySectionChange();
        // self.extra.ApplyDoctorId = self.doctorid; //  转出医院联系人初始设置成登录医生
        // self.applyDoctorChange();
        // console.log('本医院ID是：'+self.hospitalId);
        axios.get(apiurl.GetLoginInfo, {
          params: {
            token:self.token
          }
        })
        .then(function (response) {
          if(response.data.suc == true) {
            self.loginDoctorId = response.data.extra.DoctorID;
            self.loginDoctorName = response.data.extra.ActualName;
            self.loginMobilePhone = response.data.extra.MobilePhone;
            
            self.hospitalId = response.data.extra.HospitalInfo.HosptialID;
            self.getApplySections();  //获取转出科室
            self.extra.ApplySectionId = response.data.extra.HospitalInfo.SectionID;  //  转出科室初始设置成登录医生所在科室
            self.applySectionChange();
            self.extra.ApplyDoctorId = response.data.extra.DoctorID; //  转出医院联系人初始设置成登录医生
            self.applyDoctorChange();
            
            

            console.log('本医院ID是：'+self.hospitalId);
            console.log('token',self.token);
            console.log('hosptialid',self.hospitalId);
            console.log('sectionid',self.extra.ApplySectionId);
            console.log('doctorid',self.extra.ApplyDoctorId);
            console.log('zzpower',self.zzpower);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

        

        console.log('获取到的转诊编号是：'+self.$route.query.TransferId);
        if(self.$route.query.TransferId!=undefined) {
          self.getTranferInfo();
        }
        //如果路由跳转携带Id
        if(self.$route.query.id!=undefined){
          self.extra.PatientCardId=self.$route.query.id;
          //回填病人信息
          self.getPatientInfo()
        }
        //如果是从列表页面，手动新增转诊跳转至本页面的话，判断路由跳转携带handAdd
        if(self.$route.query.handAdd!=undefined && self.$route.query.handAdd == 'true'){
          localStorage.removeItem('firstExtra');
          localStorage.removeItem('secondExtra');
          localStorage.removeItem('fileurlarr');
          localStorage.removeItem('transferInfo');
          localStorage.removeItem('otherIsolationReq');
          localStorage.removeItem('steponeisfirst');
          localStorage.removeItem('steptwoisfirst');
        }
        console.log(self.$route.query.id)

        self.getProvince();

        //如果是第二步返回
        if(localStorage.getItem('firstExtra') != undefined && localStorage.getItem('steponeisfirst') == 'false') {
          var self = this;
          self.hospitalId = localStorage.getItem('hospitalId');
          self.extra = $.parseJSON(localStorage.getItem('firstExtra'));
          console.log('第二部返回：'+JSON.stringify(self.extra));
          self.dynamicTags = self.extra.dynamicTags;
          self.fileurlarr = $.parseJSON(localStorage.getItem("fileurlarr"));
          self.fileUrl=self.extra.InApplyHospitalFiles.split(',');
        }
    },
    created(){
      var self = this;
      self.uploadUrl1 = apiurl.UploadDischargeRecordImg+'?token='+self.token
    },
    methods: {
      //住院信息 展开收起
      zkbtnfun() {
        var self = this;
        self.sqbtn = true;
        self.zkbtn = false;
        self.zycon = true;
      },
      sqbtnfun() {
        var self = this;
        self.sqbtn = false;
        self.zkbtn = true;
        self.zycon = false;
      },
      // 鼠标离开主要诊断表格
      // outTable() {
      //   // this.$refs["diagnosisInput"].focus();
      //   this.inTable = false;
      // },

      // 获取转诊信息
      getTranferInfo() {
        var self = this;
        axios.get(apiurl.GetTranferInfo, {
          params: {
            token:self.token,
            TransferId: self.extra.TransferId
          }
        }).then(function (response) {
          if(response.data.suc == true) {
            self.transferInfo = response.data.rows;
            localStorage.removeItem('transferInfo');
            localStorage.removeItem('steponeisfirst');
            localStorage.removeItem('steptwoisfirst');
            localStorage.removeItem('firstExtra');
            localStorage.removeItem('secondExtra');
            localStorage.removeItem('fileurlarr');
            localStorage.setItem('transferInfo', JSON.stringify(self.transferInfo));
            console.log('转诊信息为：', response.data.rows);
            console.log('所存的转诊信息是：',localStorage.getItem('transferInfo'));
            
            // if(self.transferInfo.SupplementDate != '') {
            //   var suppleDate = self.transferInfo.SupplementDate;
            //   self.extra.IsSupplement = true;
            //   self.extra.SupplementDate = suppleDate;
            //   self.supplemtChange();
            //   self.getSupplementDate();
            // }
            // else {
            //   self.extra.IsSupplement = false;
            //   self.supplemtChange();
            // }
            self.extra.ApplySectionId = self.transferInfo.ApplySectionId;
            self.extra.ApplyDoctorId = self.transferInfo.ApplyDoctorId;
            self.extra.ApplyDoctorPhone = self.transferInfo.ApplyDoctorPhone;
            var diagnos = self.transferInfo.Diagnose;
            if(diagnos.indexOf(',') != -1) {
              self.dynamicTags = diagnos.split(',');
            }
            else {
              self.dynamicTags.length = 0;
              self.dynamicTags.push(diagnos);
            }
            self.extra.DiagnoseICD = self.transferInfo.DiagnoseICD;
            self.extra.Diagnose = diagnos;
            self.extra.PatientComplaint = self.transferInfo.PatientComplaint;
            self.extra.PatientCondition = self.transferInfo.PatientCondition;
            self.extra.ExaminationTemperature = self.transferInfo.ExaminationTemperature;
            self.extra.ExaminationPulse = self.transferInfo.ExaminationPulse;
            self.extra.ExaminationBreathing = self.transferInfo.ExaminationBreathing;
            self.extra.ExaminationBloodPressure = self.transferInfo.ExaminationBloodPressure;
            self.extra.OthersRemark = self.transferInfo.OthersRemark;
            self.extra.OthersDescription = self.transferInfo.OthersDescription;
            
            self.extra.InApplyHospitalDate = self.transferInfo.InApplyHospitalDate;
            self.extra.OutApplyHospitalDate = self.transferInfo.OutApplyHospitalDate;
            self.getInApplyHospitalDate();
            self.getOutApplyHospitalDate();
            self.extra.InApplyHospitalReason = self.transferInfo.InApplyHospitalReason;
            self.extra.InApplyHospitalRemark = self.transferInfo.InApplyHospitalRemark;
            self.extra.InApplyHospitalTreatment = self.transferInfo.InApplyHospitalTreatment;
            self.extra.InApplyHospitalDischargeSituation = self.transferInfo.InApplyHospitalDischargeSituation;
            
            var inApplyFiles = self.transferInfo.InApplyHospitalFiles;
            var inApplyFilesName = self.transferInfo.InApplyHospitalFileNames;

            self.extra.InApplyHospitalFiles = inApplyFiles;
            self.extra.InApplyHospitalFileNames = inApplyFilesName;
            if(inApplyFiles.length > 0) {
              if(inApplyFiles.indexOf(',') != -1) {
                self.fileurlarr.length = 0;
                inApplyFilesName = inApplyFilesName.split(',');
                inApplyFiles = inApplyFiles.split(',');

                inApplyFiles.forEach(function(v,i){
                  self.fileurlarr.push({name:inApplyFilesName[i], url: v});
                })
              }
              else {
                self.fileurlarr.length = 0;
                self.fileurlarr.push({name:inApplyFilesName, url:inApplyFiles});
              }
            }
            self.extra.InApplyHospitalFilesRemark = self.transferInfo.InApplyHospitalFilesRemark;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      supplemtChange() {
        var self = this;
        console.log('单选框修改了');
        if(!self.extra.IsSupplement) {
          self.refftimeshow = false;
        }
        else {
          self.refftimeshow = true;
        }
      },
      // 格式上传
      beforeAvatarUpload(file) {
        // this.filesizecont=this.filesizecont + file.size;
        const isTxt = file.type === 'text/plain';
        const isPdf = file.type === 'application/pdf';
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
        const isDoc = file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
          this.$message.error('单个上传图片大小不能超过 20MB!');
          //this.filesizecont=this.filesizecont-file.size;
          return false;
        }

        if(isTxt || isPdf || isImg || isDoc || isExcel) {
          return true;
        }else {
          this.$alert('请上传pdf，jpg，jpeg，png，doc，docx，xls，xlsx，txt格式的文件', '提示');
          return false;
        }
      },
      handleRemove(file, fileList) {
        var self = this;
        console.log('removeFileList:',fileList);
        if (file.status == 'success') {
          axios.post(apiurl.DeleteDischargeRecordImg + '?resource=' + file.url, {
          }, {
            headers: {
              'token': self.token
            }
          })
          .then(function(response) {
            var ii=0;
            self.fileurlarr.forEach(function(v,i){
              if(v.url==file.url){
                self.fileurlarr.splice(i,1)
                self.fileUrl.splice(i, 1);
                //self.filesizecont = self.filesizecont - v.size;
                //console.log('删除后文件总大小：' + self.filesizecont);
              }
            })
          })
          .catch(function(error) {
            console.log(error);
          });
          
        }
      },
      onUploadProcess() {
        var self = this;
        self.isUploadDisabled = true;
      },
      handlePictureCardPreview(file) {
        var self = this;
        this.dialogImageUrl = file.url;
        this.dialogImageAlt = file.name;
        var isImage = file.name.split('.')[1];
        var isImg = isImage == 'jpeg' || isImage == 'png' || isImage == 'jpg';
        this.dialogVisible = true;
        if(!isImg) {
          self.imageFile = false;
          self.notImageFile = true;
        }
        else{
          self.imageFile = true;
          self.notImageFile = false;
        }
      },
      handlesuccess(file, fileList, res) {
        var self = this;
        self.isUploadDisabled = false;
        console.log('地址',file);
        self.fileurlarr.push({name: fileList.name, url: file.extra.url, size: fileList.size});
        self.fileUrl.push(file.extra.url);
        //console.log('uploadPC:'+self.fileurlarr);
        console.log(self.fileUrl);
      },
      handleExceed(files, fileList) {
        // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      //获取信息
      getIdCardInfo: function(idCardNo){
        var idCardInfo = {
          gender:"",   //性别
          birthday:"", // 出生日期
          fullbirth: "" // 出生年月日
        };
        if(idCardNo.length==15){
          var aday = '19' + idCardNo.substring(6,12);
          idCardInfo.birthday=aday.substring(0,4);
          idCardInfo.fullbirth = idCardInfo.birthday +'-'+ aday.substring(4,6) +'-'+ aday.substring(6,8);
          if(parseInt(idCardNo.charAt(14))%2==0){
            idCardInfo.gender="female";
          }else{
            idCardInfo.gender="male";
          }
        }else if(idCardNo.length==18){
          var aday = idCardNo.substring(6,14);
          idCardInfo.birthday=aday.substring(0,4);
          idCardInfo.fullbirth = idCardInfo.birthday +'-'+ aday.substring(4,6) +'-'+ aday.substring(6,8);
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
            self.extra.EmergencyPhone = "";
            self.extra.Province = "";
            self.extra.City = "";
            self.extra.Area = "";
            self.extra.DetailedAddress = "";
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
              console.log('转诊的病人信息是：', res.data.extra);
              // self.extra = res.data.extra;
              //写法错误，因为对extra进行了重写
                self.getPatientInfoflog=false;
              if(!self.getPatientInfoflog){
                self.getPatientInfoflog=true;
                self.extra.PatientName = res.data.extra.PatientName;
                console.log('病人基本信息返回',res.data.extra)
                self.extra.PatientCardId = res.data.extra.PatientCardId;
                self.extra.PatientSex = res.data.extra.PatientSex;
                self.extra.PatientAge = res.data.extra.PatientAge;
                self.extra.PatientPhone = res.data.extra.PatientPhone;
                self.extra.ContactName = res.data.extra.ContactName;
                self.extra.EmergencyPhone = res.data.extra.EmergencyPhone;
                self.extra.PatientBirthday = res.data.extra.PatientBirthday;
                self.extra.Province = res.data.extra.Province;
                self.extra.City = res.data.extra.City;
                self.extra.Area = res.data.extra.Area;
                self.extra.DetailedAddress = res.data.extra.DetailedAddress;
                // 医保报销类别有疑问 START
                self.extra.MedicalType = (~~res.data.extra.MedicalType)==0?'':res.data.extra.MedicalType;
                // self.extra.MedicalCardType = res.data.extra.MedicalCardType;
                //  医保报销类别有疑问 END
                // self.extra.MedicalCardId = res.data.extra.MedicalCardId;
                console.log("请求患者基本信息",self.extra);
                self.patiendIdStore = res.data.extra.PatientCardId; //请求完以后将Id存到临时变量区
              }
            }else {
              console.log(res.data.mes == "未查到患者信息");
              // self.clearFillContent();
              self.patiendIdStore = '111';
              let date = new Date();
              let age = Number(date.getFullYear()) - self.getIdCardInfo(self.extra.PatientCardId).birthday;
              let gender = self.getIdCardInfo(self.extra.PatientCardId).gender;
              let birth = self.getIdCardInfo(self.extra.PatientCardId).fullbirth;
              console.log(age);
              self.extra.PatientAge = age;
              self.extra.PatientBirthday = birth;
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
      // 获取可转出科室列表
      getApplySections() {
        var self = this;
        console.log(self);
        console.log('000000000000000'+self.hospitalId+'111111111111');
        
        if(self.hospitalId != '' && self.hospitalId != null) {
          axios.get(apiurl.GetSectionByHospitalId, {
          params: {
            hospitalId: self.hospitalId,
            isGroup: 'yes',
            token:self.token
          }
        }).then(function (res) {

              if(res.data.suc == true){
                  self.applySections = res.data.rows;
              } else {
                  self.$alert(res.data.mes, '提示', )
              }
          }).catch(function(error) {
              console.log(error);
          });
        }
      },
      // 获取转出医院医生列表
      getDoctors() {
        var self = this;
        self.applyDoctors = [];
        if(self.extra.ApplySectionId != '' && self.extra.ApplySectionId != null) {
          
          axios.get(apiurl.GetDoctorsBySectionId, {
          params: {
            hospitalId: self.hospitalId,
            sectionId: self.extra.ApplySectionId,
            token:self.token
          }
        }).then(function (res) {
              if(res.data.suc == true){
                  console.log('已选科室ID：'+self.ApplySectionId);
                  self.applyDoctors = res.data.rows;
                  if(self.zzpower==10) {
                    let item = {
                      DoctorId: self.loginDoctorId,
                      DoctorName: self.loginDoctorName,
                      MobilePhone: self.loginMobilePhone,
                    }
                    self.applyDoctors.push(item);
                  }
              } else {
                  self.$alert(res.data.mes, '提示', )
              }
          }).catch(function(error) {
              console.log(error);
          });
        }
      },
      // 医保报销类别
      medicalTypeChange(){
        var self = this;
        var selectedIndex = self.extra.MedicalType;
        if(self.MedicalTypes.length > 0){
          var itemObj = self.MedicalTypes.find((value, index, item) => {
            return value.typeValue == selectedIndex;
          });
          self.extra.MedicalTypeText = itemObj.typeLabel;
        }
      },
      // 出生日期
      getPatientBirthday(value) {
        var self = this;
        self.extra.PatientBirthday = value;
      },
      // 转诊申请时间
      getSupplementDate(value) {
        var self = this;
        self.extra.SupplementDate = value;
      },
      // 入院日期
      getInApplyHospitalDate(value) {
        var self = this;
        self.extra.InApplyHospitalDate = value;
      },
      // 出院日期
      getOutApplyHospitalDate(value) {
        var self = this;
        self.extra.OutApplyHospitalDate = value;
      },

      // ‘转出医院联系人’改变时，获取转出医院联系人姓名；同步更新‘转出医院联系人手机号’
      applyDoctorChange(){
        var self = this;
        var selectedIndex = self.extra.ApplyDoctorId;
        setTimeout(function(){
          var itemObj = self.applyDoctors.find((value, index, item) => {
            return value.DoctorId  == selectedIndex;
          });
          self.extra.ApplyDoctorName = itemObj.DoctorName;
          self.extra.ApplyDoctorPhone = itemObj.MobilePhone;
          self.extra.ApplyDoctorId = itemObj.DoctorId;
        },500)
        
      },
      //转出科室改变时，获取转出科室文字
      applySectionChange(){
        var self = this;
        var selectedIndex = self.extra.ApplySectionId;
        self.getDoctors();  //获取转出医院医生列表
        if(self.prevApplySection!= '' && self.prevApplySection != selectedIndex) {
          self.extra.ApplyDoctorId = '';
          self.extra.ApplyDoctorPhone = '';
        }
        console.log('转出科室ID为：'+selectedIndex);
        setTimeout(function(){
          var itemObj = self.applySections.find((value, index, item) => {
            return value.Id == selectedIndex;
          });
          self.extra.ApplySectionName = itemObj.SectionName;
        },500)
        self.prevApplySection = self.extra.ApplySectionId;  // 暂存填好的转出科室
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
      bigimg(item){
        var self=this;
        self.dialogVisible=true;
        self.dialogImageUrl = item;
      },
      // 二维码START
      //打开二维码弹框
      showScanCodeDlg() {
        var self = this;
        self.scanCodeVisible = true;
        self.scan_initializeScanPopup([]);
      },
      /***********************************二维码扫描相关代码******************/
      //初始化二维码【节点、URL地址】
      initQR(qrcodeNode,qrcodeNodeURL) {

        let qrcode = new QRCode(qrcodeNode, {
          text: qrcodeNodeURL,
          width: 140,
          height: 140,
          colorDark: "#000000",
          colorLight: "#ffffff"
        });
      },
      //打开二维码事件
      scan_initializeScanPopup (fileList) {
        const self = this;
        //创建弹窗元素
        self.scan_createAllElement();
        //每一次打开都是一次新的id
        self.scan_caseId = self.scan_getGuid();
        //初始化上传张数
        self.scan_count = 2;
        //创建扫描二维码
        self.scan_createQrcode();
        //向后台请求是否有照片上传，没有的话反复请求，有的话则执行
        self.scan_getScanFile(self.scan_caseId);
      },
      scan_createAllElement () {
        this.useScan = true;
      },
      //获取uuid
      scan_getGuid() {
        return '1xxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 10 | 0;
          return r.toString(10);
        });
      },
      //创建二维码
      scan_createQrcode () {
        const self = this;
        axios.post(self.longPollingUrl + "/longPolling/createContent.htm", qs.stringify({
          "caseId": self.scan_caseId,
          "type": self.scan_type,
          "count": self.scan_count
        }))
        .then(function(response) {
          var resData = response.data;
          var qrl = null;
          var scanNode = null;
          if(resData.ret_code === 0){
            qrl = resData.content;

            scanNode = self.$refs.scanNode;
            console.log(scanNode)
            self.initQR(scanNode,qrl);
          } else {
            alert(resData.ret_info);
          }
        })
        .catch(function(error) {
          console.log(error)
        });
      },
      closeScanCode() {
        $('.el-dialog__body').find('canvas').remove();
        $('.el-dialog__body').find('img').remove();
      },
      //根据二维码id向后台发送请求
      scan_getScanFile(caseIdTemp){
        const self = this;
        const count = 0;
        //如果扫码Id不一致
        if(self.scan_caseId != caseIdTemp) {
          return;
        }
        axios.post(self.longPollingUrl + "/longPolling/getScanFile.htm", qs.stringify({
          "caseId": self.scan_caseId,
          "type": self.scan_type,
          "count": self.scan_count
        }))
        .then(function(response) {
          var resData = response.data;
          if(resData.ret_code == 0) {
            //获取后台传回的链接数组
            self.scan_addFile(resData.fileList);
          }
          //再次上传
          self.scan_getScanFile(caseIdTemp);
        })
        .catch(function(error) {
          console.log("请求cos签名出现错误");
          if(self.count<5){
            self.count++;
            self.scan_getScanFile(caseIdTemp);
          }
        });
      },
      scan_addFile(fileList){
        if(fileList == null || fileList == "" || fileList.length == 0){
          return;
        }
        console.log(fileList)
        for(var i=0; i<fileList.length;i++){
          this.fileurlarr.push({name: fileList[i].fileName, url: fileList[i].url});
          this.fileUrl.push(fileList[i].url);
        }
      },
      // 二维码END



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
          this.tablePagitnClick = 0;
          this.tabledataseach();
      },
      handleCurrentChange(val) {               //初步诊断表格当前页码发生改变
          this.currentPage = val;
          this.tablePagitnClick = 0;
          this.tabledataseach();
      },
      inputblur(){
        setTimeout(() => {
          if(this.tableflag != 1 && this.tablePagitnClick == 1){
            this.tableshow=false; 
          }
        },500)        
      },
      inputfocus(){                     //初步诊断输入框聚焦
          var self=this;
          this.tableflag = 0;
          this.tablePagitnClick = 1;
          setTimeout(() => {
              self.diagnosis='';
              self.tabledataseach();
          },500)
      },
      rowclick(val) {                    //点击初步诊断的表格   获取表格该行内容
          var self = this;
          this.tableflag = 1;
          this.tablePagitnClick = 1;
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
          self.extra.InApplyHospitalFileNames = [];
          self.extra.dynamicTags = self.dynamicTags;
          self.prevApplySection = self.extra.ApplySectionId;  // 暂存填好的转出科室
          console.log(self.dynamicTags,'self.dynamicTags')
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
          self.fileurlarr.forEach(function(v,i){
            self.$set(self.extra.InApplyHospitalFileNames,i,v.name);
          })
          console.log(self.extra,"??????");
          self.$refs['extra'].validate((valid) => {
              if (valid) {
                if(self.extra.dynamicTags.length!=0){
                    self.extra.storeItem = self.extra.dynamicTags;
                    self.extra.InApplyHospitalFiles = self.fileUrl.toString();
                    console.log('附件列表'+self.fileUrl);

                    //是否需要传到后面？
                    localStorage.removeItem('hospitalId');
                    localStorage.setItem("hospitalId",JSON.stringify(self.hospitalId));
                    localStorage.removeItem('firstExtra');
                    localStorage.setItem("firstExtra",JSON.stringify(self.extra));
                    localStorage.removeItem('fileurlarr');
                    localStorage.setItem("fileurlarr",JSON.stringify(self.fileurlarr));
                    localStorage.removeItem('steponeisfirst');
                    localStorage.setItem('steponeisfirst', 'false');

                    self.$router.push({
                      path: 'writehosptlrefrrinfo',
                      query: {
                          ModelUrl: self.$route.query.ModelUrl
                      }
                    })
                }else{
                  self.$alert('主要诊断必填','提示',)
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
