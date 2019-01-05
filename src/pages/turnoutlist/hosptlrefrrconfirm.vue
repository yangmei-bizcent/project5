<template>
  <div class="ts-content wrapper-datepicker newcss nowidth confirm_hosptlrefrr nobottom">
    <main class="main-wrap">
      <el-steps :active="3">
        <el-step title="住院转诊申请" description="" style="margin-left:15%;"></el-step>
        <el-step title="填写转诊信息" description=""></el-step>
        <el-step title="确认申请" description="" style='width:auto;'></el-step>
      </el-steps>
      <br>
      <el-form ref="extra" :model="extra" label-width="120px" class="clearfix">
        <el-breadcrumb-item>转诊信息</el-breadcrumb-item>
        <el-row>
          <el-col :span='8'>
            <el-form-item label="转入医院">{{ extra.AppointmentHospitalName }}</el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="转入科室">{{ extra.AppointmentSectionName }}</el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="医疗组">{{ extra.MedicalGroupName }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="紧急程度">{{ extra.UrgentStateText }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="隔离要求">{{ IsolationRequireTextAll }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="转运工具">{{ extra.TransportWayText }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="病情危重程度">{{ extra.IllnessSeverityText }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="转运评估">{{ extra.TransferEvaluationText }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入院类别">{{ extra.AdmissionCategoryText }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="转诊原因">{{ extra.TransferReason }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病床要求">{{ extra.ConditionRequirementText }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请入住日期">{{ extra.AppointmentPlanDate }}</el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="安排转入科室">{{ extra.AppointmentSectionName }}</el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预计住院天数">{{ extra.AppointmentPlanDayNum }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="床位类型">{{ extra.BedTypeText }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="其他要求">{{ extra.OtherRequired }}</el-form-item>
          </el-col>
        </el-row>   
        <el-breadcrumb-item>患者基本信息</el-breadcrumb-item>
        <el-row>
          <!-- <el-col :span="8">
            <el-form-item label="病人住院号">住院号</el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="病人姓名">{{ extra.PatientName }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病人身份证号">{{ extra.PatientCardId }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病人性别">{{ extra.PatientSex==0?'女':'男' }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="病人出生日期">{{ extra.PatientBirthday }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病人年龄">{{ extra.PatientAge }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="医保报销类别">{{ extra.MedicalTypeText }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="病人手机号码">{{ extra.PatientPhone }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="家属姓名">{{ extra.ContactName }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="家属手机号码">{{ extra.EmergencyPhone }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="病人居住地址">{{ extra.ChinaProvince+extra.ChinaCity+extra.ChinaArea+extra.DetailedAddress }}</el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="20">
            <el-form-item label="详细地址">{{ extra.DetailedAddress }}</el-form-item>
          </el-col>
        </el-row>    -->
        <el-breadcrumb-item>病人病情信息</el-breadcrumb-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="转出科室">{{ extra.ApplySectionName }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="转出医院联系人">{{ extra.ApplyDoctorName }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="转出医院联系人手机号码">{{ extra.ApplyDoctorPhone }}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="主要诊断">{{ extra.dynamicTags.toString() }}</el-form-item>
          </el-col>
        </el-row>   
        <el-row>
          <el-col :span="20">
            <el-form-item label="病情描述">{{ extra.PatientCondition }}</el-form-item>
          </el-col>
        </el-row>      
        <el-row>
          <el-col :span="20">
            <el-form-item label="病人主诉">{{ extra.PatientComplaint }}</el-form-item>
          </el-col>
        </el-row>         
        <el-row>
          <el-col :span="6">
            <el-form-item label="生命体征检查"><span v-if='extra.ExaminationTemperature!=null'>T： {{ extra.ExaminationTemperature }}℃</span></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" v-if='extra.ExaminationPulse!=null'>P： {{ extra.ExaminationPulse }}次/分</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" v-if='extra.ExaminationBreathing!=null'>R： {{ extra.ExaminationBreathing }}次/分</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" v-if='extra.ExaminationBloodPressure!=null'>B/P： {{ extra.ExaminationBloodPressure }}mmHG</el-form-item>
          </el-col>
        </el-row>      
        <el-row>
          <el-col :span="20">
            <el-form-item label="其他检查">{{ extra.OthersRemark }}</el-form-item>
          </el-col>
        </el-row>         
        <el-row>
          <el-col :span="20">
            <el-form-item label="其他说明">{{ extra.OthersDescription }}</el-form-item>
          </el-col>
        </el-row>
        <div class="hospinformation">
          <span class="hospinformation_title">出院信息</span>
          <span class="more_zk" @click='zkbtnfun' v-if='zkbtn == true'>展开&nbsp;<i class="el-icon-arrow-down"></i></span><span class="more_zk" @click='sqbtnfun' v-if='sqbtn == true'>收起&nbsp;<i class="el-icon-arrow-up"></i></span>
        </div>
        <div v-if='zycon == true'>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="入院日期">{{ extra.InApplyHospitalDate }}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="出院日期">{{ extra.OutApplyHospitalDate }}</el-form-item>
                </el-col>
            </el-row>         
            <el-row>
                <el-col :span="20">
                    <el-form-item label="入院原因">{{ extra.InApplyHospitalReason }}</el-form-item>
                </el-col>
            </el-row>         
            <el-row>
                <el-col :span="20">
                    <el-form-item label="入院情况">{{ extra.InApplyHospitalRemark }}</el-form-item>
                </el-col>
            </el-row>        
            <el-row>
                <el-col :span="20">
                    <el-form-item label="治疗经过">{{ extra.InApplyHospitalTreatment }}</el-form-item>
                </el-col>
            </el-row>       
            <el-row>
                <el-col :span="20">
                    <el-form-item label="出院情况">{{ extra.InApplyHospitalDischargeSituation }}</el-form-item>
                </el-col>
            </el-row>       
            <el-row>
                <el-col :span="20">
                    <el-form-item label="附件">
                      <div v-show="fileurlarr.length==0?false:true">
                        <span v-for="item in fileurlarr" :key="item.name" class="file-item" @click="previewFile(item.name)">{{ item.name }}</span>
                      </div>
                      <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" v-show="imageFile" :src="dialogImageUrl" :alt="dialogImageAlt">
                        <div v-show="notImageFile">无法查看</div>
                      </el-dialog>
                    </el-form-item>
                </el-col>
            </el-row>       
            <el-row>
                <el-col :span="20">
                    <el-form-item label="附件说明">{{ extra.InApplyHospitalFilesRemark }}</el-form-item>
                </el-col>
            </el-row>
        </div>      
      </el-form>
    </main>

    <div class="page_footer">
      <el-row :gutter="20" class="flex-align">
        <el-col :span="24">
          <el-button type="default" @click.native="prevStep">上一步</el-button>
          <el-button type="primary" @click.native="submitConfirm" :disabled='yydisabled'>确认预约</el-button>
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
import { linkUrl,apiurl } from '../../service/api.js';

export default {
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        zycon:false,
        zkbtn:true,
        sqbtn:false,
        fileurlarr: [],
        dialogImageAlt: '',
        dialogImageUrl: '',
        dialogVisible: false, // 图片预览
        IsolationRequireTextAll: [],
        extra: {},
        thisType: '',

        imageFile: true,  // 预览附件时，是否是图片
        notImageFile: false, // 预览附件时，是否是图片
        
        extraOut:{

        },
        

        d: '',
        
        patiendIdStore: '000',               //暂存上次身份证号
        getPatientInfoflog:false,//判断是否返填
        yydisabled:false
      }
    },
    computed: {
       ...mapGetters({
          token:'token'
        }),
    },
    mounted() {
        var self = this;
        var firstExtra_infos = $.parseJSON(localStorage.getItem("firstExtra"));
        var secondExtra_infos = $.parseJSON(localStorage.getItem("secondExtra"));
        self.extra = Object.assign(firstExtra_infos, secondExtra_infos);
        // var IsolationRequirementsRemark = localStorage.getItem('IsolationRequirementsRemark');  //其他隔离要求
        var IsolationRequirements = self.extra.IsolationRequirements;
        self.fileurlarr = $.parseJSON(localStorage.getItem('fileurlarr'));
        self.extra.BedTypeText = self.extra.BedTypeText.toString();
        self.thisType = self.extra.thisType;
        // self.extra.IsolationRequirementsText.forEach(function(v,i){
        //   if(v == '其他'){
        //     self.extra.IsolationRequirementsText.pop();
        //     self.extra.IsolationRequirementsText = self.extra.IsolationRequirementsText.push(IsolationRequirementsRemark);
        //   }
        // })
        // 若有其他隔离要求，将其他隔离要求替换掉'其他'文字展示
        var checkedText = self.extra.IsolationRequirementsText.toString();
        if(checkedText.indexOf('其他') != -1) {
            self.IsolationRequireTextAll = self.extra.IsolationRequirementsText.toString().replace("其他", self.extra.IsolationRequirementsRemark);
        }
        else {
          self.IsolationRequireTextAll = self.extra.IsolationRequirementsText.toString();
        }
        self.IsolationRequireTextAll = self.IsolationRequireTextAll.toString();
        // if(self.extra.BedTypeText != '') {
        //   self.extra.BedType = self.extra.BedType.join(",");
        //   self.extra.BedTypeText = self.extra.BedTypeText.toString();
        // }
        
        // if(IsolationRequirements != '') {
        //   IsolationRequirements = IsolationRequirements.push(IsolationRequirements.length());
        //   self.extra.IsolationRequirements = IsolationRequirements.toString();
        // }
    },
    methods: {
      //住院信息 展开收起
      zkbtnfun() {
        this.sqbtn = true;
        this.zkbtn = false;
        this.zycon = true;
      },
      sqbtnfun() {
        this.sqbtn = false;
        this.zkbtn = true;
        this.zycon = false;
      },
      previewFile(fileName) {
        var self = this;
        var previewFileName = fileName;

        var itemObj = self.fileurlarr.find((value, index, item) => {
          return value.name == previewFileName;
        });
        self.dialogImageUrl = itemObj.url;
        self.dialogImageAlt = itemObj.name;

        var isImage = previewFileName.split('.')[1];
        const isImg = isImage == 'jpeg' || isImage == 'png' || isImage == 'jpg';
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
      prevStep(){
        var self = this;
        localStorage.removeItem('steptwoisfirst');
        localStorage.setItem('steptwoisfirst', 'false');
        self.$router.push({
            path: 'writehosptlrefrrinfo',
            query: {
                ModelUrl: self.$route.query.ModelUrl
            }
        }) 
      },
      submitConfirm(){
          var self = this;
          console.log(JSON.stringify(self.extra));
          delete self.extra.dynamicTags;
          delete self.extra.storeItem;
          delete self.extra.uploadurl;
          delete self.extra.uploadUrl1;
          self.extra.IsolationRequirements=self.extra.IsolationRequirements.toString();
          self.extra.IsolationRequirementsText = self.extra.IsolationRequirementsText.toString();
          self.extra.BedTypeText = self.extra.BedTypeText.toString();
          self.extra.BedType = self.extra.BedType.toString();
          self.extra.InApplyHospitalFileNames = self.extra.InApplyHospitalFileNames.toString();
          console.log(self.token);
          
          console.log('确认页面要传的type是：'+ self.thisType);
          axios.post(apiurl.SaveTransferInfo,self.extra, {
            headers: {
              "token": self.token
            }
          }).then(function (res) {
              if(res.data.suc){
                self.extra.PatientId=res.data.mes;
                self.$alert('预约成功', '预约', {
                  confirmButtonText: '确定',
                  callback: action => {
                    self.yydisabled=true;
                    var param = {};
                    param.method = "closeThisTab";
                    window.parent.postMessage(JSON.stringify(param), '*');
                    param.method = "addTab";
                    param.title = "住院转诊列表（转出）";
                    param.url = linkUrl + 'referral/referralList?token=' + self.token+'&type=self'+'&hospitalId='+localStorage.getItem('hospitalId')+'&ModelUrl='+self.$route.query.ModelUrl;
                    window.parent.postMessage(JSON.stringify(param), '*');
                    localStorage.clear();
                  }
                });
                //是否需要传到后面？
                //跳转到门诊转诊列表
                /* self.$router.push({
                    path: 'mzzz',
                    query: {}
                }) */
                
              }else{
                  self.$alert(res.data.mes,'提示',)
              }
          }).catch(function (error) {
              console.log(error);
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
