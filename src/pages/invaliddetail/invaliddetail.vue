<template>
  <div class="ts-content wrapper-steps clearfix newcss">
    <main class="main-wrap clearfix">
      <div class="zj_title el-icon-warning">
        <b>{{state}}</b>
      </div>
      <br>
      <el-breadcrumb-item>患者基本信息</el-breadcrumb-item>
      <ul class="con_ul">
        <li class="con_li">
          <span class="con_title">姓名：</span>
          <span class="con_con">{{PatientName}}</span>
        </li>
        <li class="con_li">
          <span class="con_title">出生日期：</span>
          <span class="con_con">{{PatientBirth}}</span>
        </li>
        <li class="con_li">
          <span class="con_title">性别：</span>
          <span class="con_con">{{PatientSex}}</span>
        </li>
        <li class="con_li">
          <span class="con_title">身份证号：</span>
          <span class="con_con">{{PatientCardId}}</span>
        </li>
        <li class="con_li">
          <span class="con_title">年龄：</span>
          <span class="con_con">{{PatientAge}}</span>
        </li>
        <li class="con_li">
          <span class="con_title">手机号码：</span>
          <span class="con_con">{{PatientPhone}}</span>
        </li>
        <li class="con_li" style="width:100%;">
          <span class="con_title">居住地址：</span>
          <span class="con_con">{{Province}}{{City}}{{Area}}{{DetailedAddress}}</span>
        </li>
      </ul>
      <el-breadcrumb-item>患者病情信息</el-breadcrumb-item>
      <ul class="con_ul">
        <li class="con_li">
          <span class="con_title">医生姓名：</span>
          <span class="con_con">{{DoctorName}}</span>
        </li>
        <li class="con_li">
          <span class="con_title">医生电话：</span>
          <span class="con_con">{{DoctorPhone}}</span>
        </li>
        <li class="con_li">
          <span class="con_title">科室：</span>
          <span class="con_con">{{SectionName}}</span>
        </li>
        <li class="con_li" style="width:100%;">
          <span class="con_title">出院诊断：</span>
          <span class="con_con">{{DischargeDiagnosisDiseaseText}}</span>
        </li>
        <li class="con_li" style="width:100%;">
          <span class="con_title">出院记录：</span>
          <div class="con_record" :class='{autoheight:DischargeRecord.length<600}' v-if='DischargeRecord'>
            <ul class="record_ul clearfix" :class='{autoheight:DischargeRecord.length<600}'>
              <li class="record_li">
                <!--  -->
                <span class="record_title">{{DischargeRecord}}</span>
              </li>
            </ul>
            <span class="record_more" @click='moreclick()' v-if='DischargeRecord.length>600&morebtn==false'>查看更多</span>
            <span class="record_more" @click='smoreclick()' v-if='DischargeRecord.length>600&morebtn' style="bottom:20px;">收起</span>
          </div>
        </li>
        <li class="con_li" style="width:80%;">
          <span class="con_title">图片：</span>
          <div class="img_con">
            <ul class="img_ul clearfix">
              <li class="img_li" v-for="(item,i) in images.ImageUrl">
                <img :src="item" alt="" class="con_img" @click='bigimg(item)'>
              </li>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </ul>
          </div>
        </li>
      </ul>
      <el-breadcrumb-item>转诊信息</el-breadcrumb-item>
      <ul class="con_ul">
        <li class="con_li">
          <span class="con_title">接诊机构：</span>
          <span class="con_con">{{ReferralHospitalName}}</span>
        </li>
        <li class="con_li">
          <span class="con_title">转诊原因：</span>
          <span class="con_con">{{ReferralReason}}</span>
        </li>
        <li class="con_li" v-if='state!="已拒绝"'>
          <span class="con_title">申请时间：</span>
          <span class="con_con">{{ApplyTime}}</span>
        </li>
        <li class="con_li" v-if='state=="已拒绝"'>
          <span class="con_title">拒绝时间：</span>
          <span class="con_con">{{ApplyTime}}</span>
        </li>
        <li class="con_li" v-if='state!="已拒绝"'>
          <span class="con_title" v-if='state!="已取消"'>接收时间</span>
          <span class="con_title" v-if='state=="已取消"'>取消时间</span>
          <span class="con_con">{{ReceiveTime}}</span>
        </li>
        <li class="con_li" v-if='state=="已拒绝"'>
          <span class="con_title">拒绝原因：</span>
          <span class="con_con">{{RefuseReason}}</span>
        </li>
        <li class="con_li" v-if='state=="已拒绝"'>
          <span class="con_title">操作人：</span>
          <span class="con_con">{{OperatorName}}</span>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import '../../assets/sass/addtransfer.scss';
import { mapGetters, mapActions } from 'vuex';
import { apiurl } from '../../service/api.js';
import axios from 'axios';
export default {
  data() {
    return {
      PatientName: '',
      PatientBirth: '',
      PatientSex: 1,
      PatientCardId: '',
      DetailedAddress: '',
      Province: '',
      City: '',
      Area: '',
      PatientAge: '',
      PatientPhone: '',
      DoctorName: '',
      DoctorPhone: '',
      DischargeDiagnosisDiseaseText: '',
      TurnOnTreatmentDetail: '',
      ReferralHospitalName: '',
      ReferralReason: '',
      ApplyTime: '',
      ReceiveTime: '',
      SectionName: '',
      state: '',
      images: {},
      DischargeRecord: '',//出院记录
      dialogVisible: false,
      dialogImageUrl: '',
      morebtn: false//查看更多按钮
    }
  },
  computed: {
    ...mapGetters({
      waitid: 'waitid', token: 'token', waitstate: 'waitstate'
    })
  },
  watch: {
    '$route'() {
      this.$router.go(0);
    }
  },
  mounted() {
    this.loadPage()
  },
  methods: {
    ...mapActions([
      'set_waitid'
    ]),
    bigimg(item) {
      var self = this;
      self.dialogVisible = true;
      self.dialogImageUrl = item;
    },
    // 查看更多
    moreclick() {
      var self = this;
      self.morebtn = true;
      $('.record_ul').css('height', 'auto');
      $('.con_record').css('height', 'auto');
    },
    //收起
    smoreclick() {
      var self = this;
      self.morebtn = false;
      $('.record_ul').css('height', '192px');
      $('.con_record').css('height', '267px');
    },
    loadPage() {
      var self = this;
      axios.get(apiurl.GetTurnDownDetail, {
        params: {
          ttb_id: self.waitid,
          token: self.token
        }
      })
        .then(function(response) {
          console.log(response.data, self.state, 'self.state')
          if (response.data.suc == true) {
            switch (self.waitstate) {
              case 0:
                self.state = '待接收';
                break;
              case 1:
                self.state = '已接收';
                break;
              case 2:
                self.state = '已拒绝';
                break;
              case 3:
                self.state = '已取消';
                break;
            }
          } else {
            self.$message.error(response.data.mes, '提示', )
          }

          self.PatientName = response.data.extra.PatientModel.PatientName;
          self.PatientBirth = response.data.extra.PatientModel.PatientBirth;
          // self.PatientSex=response.data.extra.PatientModel.PatientSex
          response.data.extra.PatientModel.PatientSex == 1 ? self.PatientSex = '男' : self.PatientSex = '女';
          self.PatientCardId = response.data.extra.PatientModel.PatientCardId;
          self.DetailedAddress = response.data.extra.PatientModel.DetailedAddress;
          self.Province = response.data.extra.PatientModel.Province;
          self.City = response.data.extra.PatientModel.City;
          self.Area = response.data.extra.PatientModel.Area;
          self.PatientAge = response.data.extra.PatientModel.PatientAge;
          self.PatientPhone = response.data.extra.PatientModel.PatientPhone;
          self.DoctorName = response.data.extra.IllnessModel.DoctorName;
          self.SectionName = response.data.extra.IllnessModel.SectionName;
          self.DoctorPhone = response.data.extra.IllnessModel.DoctorPhone;
          self.DischargeDiagnosisDiseaseText = response.data.extra.IllnessModel.DischargeDiagnosisDiseaseText;
          self.TurnOnTreatmentDetail = response.data.extra.ReferralModel.TurnOnTreatmentDetail;
          self.ReferralHospitalName = response.data.extra.ReferralModel.ReferralHospitalName;
          self.ReferralReason = response.data.extra.ReferralModel.ReferralReason;
          self.ApplyTime = response.data.extra.ReferralModel.ApplyTime;
          self.ReceiveTime = response.data.extra.ReferralModel.ReceiveTime;
          self.images = { ImageUrl: response.data.extra.IllnessModel.ImageUrl };
          self.DischargeRecord = response.data.extra.IllnessModel.DischargeRecord;
          self.RefusalReasonText = response.data.extra.ReferralModel.RefusalReasonText;
          if (self.state == "已拒绝") {
            self.OperatorName = response.data.extra.ReferralModel.OperatorName;
          }
          if (self.state == "已拒绝") {
            self.RefuseReason = response.data.extra.ReferralModel.RefuseReason;
          }
        })
        .then(function(response) {
          switch (self.waitstate) {
            case 0:
              self.state = '待接收';
              break;
            case 1:
              self.state = '已接收';
              break;
            case 2:
              self.state = '已拒绝';
              break;
            case 3:
              self.state = '已取消';
              break;
          }
          self.PatientName = response.data.extra.PatientModel.PatientName;
          self.PatientBirth = response.data.extra.PatientModel.PatientBirth;
          // self.PatientSex=response.data.extra.PatientModel.PatientSex
          response.data.extra.PatientModel.PatientSex == 1 ? self.PatientSex = '男' : self.PatientSex = '女';
          self.PatientCardId = response.data.extra.PatientModel.PatientCardId;
          self.PatientAddress = response.data.extra.PatientModel.PatientAddress;
          self.Province = response.data.extra.PatientModel.Province;
          self.City = response.data.extra.PatientModel.City;
          self.Area = response.data.extra.PatientModel.Area;
          self.PatientAge = response.data.extra.PatientModel.PatientAge;
          self.PatientPhone = response.data.extra.PatientModel.PatientPhone;
          self.DoctorName = response.data.extra.IllnessModel.DoctorName;
          self.DoctorPhone = response.data.extra.IllnessModel.DoctorPhone;
          self.DischargeDiagnosisDiseaseText = response.data.extra.IllnessModel.DischargeDiagnosisDiseaseText;
          self.TurnOnTreatmentDetail = response.data.extra.ReferralModel.TurnOnTreatmentDetail;
          self.ReferralHospitalName = response.data.extra.ReferralModel.ReferralHospitalName;
          self.ReferralReason = response.data.extra.ReferralModel.ReferralReason;
          self.ApplyTime = response.data.extra.ReferralModel.ApplyTime;
          self.ReceiveTime = response.data.extra.ReferralModel.ReceiveTime;
          self.images = { ImageUrl: response.data.extra.IllnessModel.ImageUrl };
          self.DischargeRecord = response.data.extra.IllnessModel.DischargeRecord;
          self.RefusalReasonText = response.data.extra.ReferralModel.RefusalReasonText;
          self.OperatorName = response.data.extra.ReferralModel.OperatorName;
          self.RefuseReason = response.data.extra.ReferralModel.RefuseReason;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
}
</script>
<style scoped lang="scss">
.autoheight {
  height: auto!important;
}

.nodis {
  display: none;
}

.zj_title {
  color: #F6A810;
  width: 100%;
  text-align: center;
  font-size: 40px;
  b {
    font-size: 18px;
    display: inline-block;
    font-weight: normal;
    position: relative;
    top: -10px;
    padding-bottom: 20px;
    margin-left: 20px;
  }
}

.el-select {
  width: 100%;
}

.ts-notice {
  margin-left: 20px;
}

.map_title {
  color: #73879C;
  margin-left: 23px;
}

.con_li {
  width: 50%;
  float: left;
  margin-bottom: 16px;
}

.con_title {
  width: 80px;
  display: inline-block;
  font-weight: normal;
  position: relative; // top: -10px;
  padding-bottom: 20px;
  margin-left: 20px;
}


.el-select {
  width: 100%;
}

.ts-notice {
  margin-left: 20px;
}

.map_title {
  color: #73879C;
  margin-left: 23px;
}

.con_li {
  width: 50%;
  float: left;
  margin-bottom: 16px;
}

.con_title {
  width: 80px;
  display: inline-block;
}

.con_record {
  position: relative;
  width: 900px;
  height: 267px;
  border: 1px solid #ddd;
  margin: -58px 0 0 100px;
  border-radius: 5px;
  padding-top: 17px;
}

.record_ul {
  height: 225px;
  overflow: hidden;
}

.record_li {
  width: 30%;
  float: left;
  margin-bottom: 20px;
}

.record_title {
  width: 56px;
  margin-right: 20px;
}

.record_text {
  width: 591px;
}

.record_more {
  color: #539CDB;
  position: absolute;
  right: 80px;
  font-size: 12px;
  top: 225px;
}

.img_con {
  margin: -20px 0 0 43px; // width: 150px;
  height: 150px;
  border-radius: 5px;
  .img_li {
    float: left;
  }
}

.el-notification {
  top: 50%!important;
  left: 50%!important;
}

.el-notification__title {
  font-size: 50px;
}
</style>
