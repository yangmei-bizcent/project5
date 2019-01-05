<template>
    <div class="printDetail"  ref="printContent">
        <div class="textAlignCenter title">{{turnlist.ReferralModel.ApplyHospitalName}}转诊单</div>
        <el-breadcrumb-item class="formWidth">送转信息</el-breadcrumb-item>
          <el-form v-model="turnlist" label-width="110px" class="clearfix worddisplay">
            <el-row>
              <el-col :span='12'>
                <el-form-item label="转诊编号：">{{turnlist.ReferralModel.TransferNo}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="转入医院：">{{turnlist.ReferralModel.ReferralHospitalName}}</el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="转出医院：">{{turnlist.ReferralModel.ApplyHospitalName}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="转出科室：">{{turnlist.IllnessModel.SectionName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="转出医院联系人：">{{turnlist.IllnessModel.DoctorName}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="手机号码：">{{turnlist.IllnessModel.DoctorPhone}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <el-form-item label="转诊原因：">{{turnlist.ReferralModel.ReferralReason}}</el-form-item>
              </el-col>
            </el-row>
            <el-breadcrumb-item class="formWidth">病人信息</el-breadcrumb-item>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="病人姓名：">{{turnlist.PatientModel.PatientName}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="性别：">{{turnlist.PatientModel.PatientSex=='0'?'女':'男'}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="身份证号码：">{{turnlist.PatientModel.PatientCardId}}</el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="年龄：">{{turnlist.PatientModel.PatientAge}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="手机号码：">{{turnlist.PatientModel.PatientPhone}}</el-form-item>
              </el-col>
              
            </el-row>
            <el-row>
            <el-col :span='24'>
                <el-form-item label="病人居住地址：">{{turnlist.PatientModel.Province}}{{turnlist.PatientModel.City}}{{turnlist.PatientModel.Area}}{{turnlist.PatientModel.DetailedAddress}}</el-form-item>
              </el-col>
              
            </el-row>
            <el-row>
              <el-col :span='24'>
                <el-form-item label="出院诊断：">{{turnlist.IllnessModel.DischargeDiagnosisDiseaseText}}</el-form-item>
              </el-col>
            </el-row>
            
          </el-form>
          <div class="posbottom">
                <el-breadcrumb-item class="formWidth margintop50">温馨提示</el-breadcrumb-item>
                <div class="con_ul clearfix marginleft20">
                    <div class="con_li" style="width:100%;">
                    <p class="con_con">1.凭此预约单携带身份证,医保卡等前往社区医院进行治疗。</p>
                    <p class="con_con">2.如需要临时取消转诊申请，请提前告知转出医院。</p>
                    <p class="con_con">3.如果转诊安排有变化，我们将会短信通知到您填写的手机，请注意相关短信通知。</p>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer textAlignCenter margintop20 paddingbottom20">
                    <el-button type="primary" @click="printBtn">打印</el-button>
                </div>
          </div>
          
    </div>
</template>
<script>
import "../../assets/sass/zhuanzheninfo.scss";
// const thisToken = '103dadc14a954119d9ef2b68d38f854264f';
const url = window.location.href.split('?')[1];
const thisToken=url.split('&')[0].split('=')[1];
const thistransferId=url.split('&')[1].split('=')[1];

import { apiurl,linkUrl } from '../../service/api.js';
import axios from 'axios';
import axion from '@/util/http_url.js'
export default {
    data() {
      return {
        turnDetail:{
          token:thisToken,
          ttb_id:thistransferId
        },
        turnlist:[]
      }
    },
    mounted() {
      this.GetTurnDownDetail()
  },
    methods: {
        GetTurnDownDetail() {
            axion.GetTurnDownDetail(this.turnDetail).then(d => {
                this.turnlist=d.data.extra;
            })
        },
        printBtn() {
            var self = this;
            $(".dialog-footer").hide();
            let newWindow = window.open("_blank");   //打开新窗口
            let codestr = self.$refs.printContent.innerHTML;   //获取需要生成pdf页面的div代码
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
    },
	
}
</script>