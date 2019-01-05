<template>
  <div class="ts-content wrapper-datepicker newcss mzzzqr nowidth">
    <main class="main-wrap">
			<el-steps :active="3">
				<el-step title="填写基本情况" description="" style="margin-left:15%;"></el-step>
				<el-step title="门诊转诊预约" description=""></el-step>
				<el-step title="确认并完成申请" description="" style='width:auto;'></el-step>
			</el-steps>
      <el-form label-width="100px" class="clearfix worddisplay" ref="printContent">
        <h2>*********&nbsp;{{transferInfo.originHospitalName}} 检查转诊预约确认单&nbsp;*********</h2>
        <el-breadcrumb-item>预约信息</el-breadcrumb-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预约序号">{{transferInfo.RegNo}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预约医院">{{transferInfo.AppointmentHospitalName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预约日期">{{transferInfo.AppointmentDate}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="就诊时间">{{transferInfo.ClinicTime}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查单号" size="small">{{transferInfo.ExaminationId}}</el-form-item> 
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查项目">{{transferInfo.ExaminationItemName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查设备">{{transferInfo.ExaminationDeviceName}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查地址">{{transferInfo.ExaminationDeviceAddress}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="送转医院">{{transferInfo.originHospitalName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="送转科室">{{transferInfo.originSectionName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="送转医生">{{transferInfo.originDoctorName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">{{transferInfo.originDoctorPhone}}</el-form-item>
          </el-col>
        </el-row>
			    <el-breadcrumb-item>患者信息</el-breadcrumb-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="患者姓名" size="small">{{transferInfo.PatientName}}
            </el-form-item>   
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">{{transferInfo.PatientSex==0?'女':'男'}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件号码">{{transferInfo.PatientCardId}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
	          <el-form-item label="年龄" size="small">{{transferInfo.PatientAge}}</el-form-item>   
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式">{{transferInfo.PatientPhone}}</el-form-item>
          </el-col>
          <el-col :span="12">  
            <el-form-item label="地址">{{transferInfo.ChinaProvince}}{{transferInfo.ChinaCity}}{{transferInfo.ChinaArea}}{{transferInfo.DetailedAddress}}</el-form-item>  
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
			<!-- <el-breadcrumb-item>诊断信息</el-breadcrumb-item> -->
            <el-form-item label="病人诊断" style='width:100%;'>{{transferInfo.dynamicTags.toString()}}
            </el-form-item>   
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="病情描述" style='width:100%;'>
              <p v-html="transferInfo.PatientCondition"></p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="病人主诉" style='width:100%;'>
              <p v-html="transferInfo.PatientComplaint"></p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="检查检验" style='width:100%;'>
              <p v-html="transferInfo.OthersRemark"></p>
            </el-form-item> 
          </el-col>
        </el-row>
        <h4>温馨提示</h4>
        <div style="margin-bottom: 20px;">
  	      <p class="mzzz-tip">1.凭此检查单，携带本人身份证或医保卡于检查当日到缴费</p>
  	      <p class="mzzz-tip">2.请在就诊开始时间前缴费，取消预约请在前一天24点前联系送转医院；</p>
        </div>               
      </el-form>
		</main>
    <div class="page_footer">
      <el-row :gutter="20" class="flex-align">
        <el-col :span="24">
          <el-button @click="lastStep" :disabled="clickForbidden">上一步</el-button>
          <el-button type="primary" @click="insertbtn" :disabled="clickForbidden">确认预约</el-button>
          <el-button type="primary" @click="backToList" style="float: right">返回检查检验列表</el-button>
        </el-col>
      </el-row>
    </div>
	</div>
</template>

<script>
	import '../../assets/sass/addtransfer.scss';
  import '../../assets/sass/patient.css';
  import { mapGetters,mapActions } from 'vuex';
  import {apiurl,linkUrl} from '../../service/api.js';
  import axios from 'axios'
	export default {
  data() {
    return {
      transferInfo: this.$route.query.transferInfo,  //检查转诊预约入参（从上一步传过来）
      transferInfo: Object.assign({
        originHospitalName:'',
        originSectionName: '',
        originDoctorName: '',
        originDoctorPhone: '',
        steponeisfirst:false
      }, this.$route.query.transferInfo),
      clickForbidden: false,
    }
  },
  computed: {
     ...mapGetters({
        token:'token'
      }),
  },
  mounted() {
    var self=this;
    // 检查转诊确认单送转信息：从登录用户信息拿
    axios.get(apiurl.GetLoginInfo, {
      params: {
        token:self.token
      }
    })
    .then(function (response) {
      console.log(response.data.extra.DoctorInfo.MobilePhone)
      if(response.data.suc == true) {
        // self.transferInfo=this.$route.query.transferInfo;
        self.transferInfo.originHospitalName = response.data.extra.HospitalInfo.HosptialName;  //送转医院
        self.transferInfo.originSectionName = response.data.extra.HospitalInfo.SectionName;  //送转科室
        self.transferInfo.originDoctorName = response.data.extra.DoctorInfo.DoctorName;  //送转医生
        self.transferInfo.originDoctorPhone=response.data.extra.DoctorInfo.MobilePhone;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(self.transferInfo)
    console.log(self.transferInfo)
  },
  methods: {
    // 上一步按钮
    lastStep(){
      var self = this
      self.transferInfo.isfirst = false
      self.$router.push({
        path: 'jyjcyy',
        query: {
          transferInfo: self.transferInfo,
          ModelUrl: self.$route.query.ModelUrl
        }
      })
    },
    sureAppointment() {
      var self=this;
      this.$confirm('预约成功，是否打印转诊单？', '预约成功', {
        confirmButtonText: '打印',
        cancelButtonText: '不打印',
        callback: action => {
          if(action=='confirm'){
            let newWindow = window.open("self");   //打开新窗口
            let codestr = self.$refs.printContent.$el.innerHTML;   //获取需要生成pdf页面的div代码
            newWindow.document.write(`<style>
              .el-row,el-col{border-box;overflow:hidden}
              .el-col-12 {float:left;width: 49%;overflow:hidden}
              h2 {font-size: 18px;text-align: center;font-weight: 500;margin-top: 60px;}
              .el-breadcrumb__item{display:block; height: 44px; width: 100%; line-height: 44px; margin-bottom: 10px; margin-top: 20px; border-bottom:1px solid black;clear:both;}
              .el-form-item {float:left;display:inline-block;padding-right: 10px; box-sizing:border-box;overflow:hidden; }
              .el-form-item__label{float:left;width:100px;text-align: right;vertical-align: middle;font-size: 16px;line-height: 1; padding: 11px 12px 11px 0;box-sizing: border-box;}
              .el-form-item__content {line-height: 20px;font-size: 14px;margin-top: 10px;}</style>`);
            newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
            newWindow.document.close();     //关闭document的输出流, 显示选定的数据
            newWindow.print();   //打印当前窗口
            console.log(self.$refs.printContent)
            newWindow.close();
            return true;
          }else{
            var param = {};
            param.method = "addTab";
            param.title = '检查检验列表';
            param.url = linkUrl + 'turnoutlist/jyjc?token='+self.token+'&ModelUrl='+this.$route.query.ModelUrl;
            window.parent.postMessage(JSON.stringify(param), '*');
            // this.$router.push('/turnoutlist/jyjc');
          }
        }
      });
    },
    backToList() {
      var param = {};
      param.method = "addTab";
      param.title = '检查检验列表';
      param.url = linkUrl + 'turnoutlist/jyjc?token='+this.token+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
          // this.$router.push('/turnoutlist/mzzz');
    },    
    insertbtn(){
      var self=this;
      axios.post(apiurl.AddInspectAppointment, {
        RegNo:self.transferInfo.RegNo,
        ExaminationId:self.transferInfo.ExaminationId,
        PatientId:self.transferInfo.PatientId,
        DiagnoseICD:self.transferInfo.DiagnoseICD,
        Diagnose:self.transferInfo.Diagnose,
        PatientCondition:self.transferInfo.PatientCondition,
        PatientComplaint:self.transferInfo.PatientComplaint,
        OthersRemark:self.transferInfo.OthersRemark,
        AppointmentHospitalId:self.transferInfo.AppointmentHospitalId,
        AppointmentHospitalName:self.transferInfo.AppointmentHospitalName,
        AppointmentDate:self.transferInfo.AppointmentDate,
        ClinicTime:self.transferInfo.ClinicTime,
        ExaminationItemId:self.transferInfo.ExaminationItemId,
        ExaminationItemName:self.transferInfo.ExaminationItemName,
        ExaminationDeviceName:self.transferInfo.ExaminationDeviceName,
        ExaminationDeviceAddress:self.transferInfo.ExaminationDeviceAddress,
        PatientName:self.transferInfo.PatientName,
        PatientCardId:self.transferInfo.PatientCardId,
        PatientPhone:self.transferInfo.PatientPhone,
        Province:self.transferInfo.ChinaProvince,
        City:self.transferInfo.ChinaCity,
        Area:self.transferInfo.ChinaArea,
        DetailAddress:self.transferInfo.DetailedAddress,
      },{
        headers: {
          'token':self.token
        }
      })
      .then(function (response) {
        if(response.data.suc) {
          self.clickForbidden = true;          
          console.log(response.data);
          self.sureAppointment();
        }else{
          self.$alert(response.data.mes,'提示',)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>         
<style lang="scss" scoped>
</style>
            