<template>
<div  v-loading="loading" class="divHtml" >
  <div  class="ts-content  wrapper-datepicker newcss nowidth">
    <main  class="main-wrap agreement" >
      <div class="agreement_title">家庭医生签约服务协议书</div>
  <el-row>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">甲方（医院）</label>
  <div class="el-form-item__content underline">{{xycon.PartyA}}</div>
  </div>
  </el-col>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">乙方</label>
  <div class="el-form-item__content underline">{{xycon.PartyB}}</div>
  </div>
  </el-col>
</el-row>
  <el-row>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">签约责任医生</label>
  <div class="el-form-item__content underline">{{headerVal.PartyA_DoctorName}}</div>
  </div>
  </el-col>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">乙方证件号码</label>
  <div class="el-form-item__content">{{headerVal.PartyB_PatientIdCard}}</div>
  </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">签约责任医生服务电话</label>
  <div class="el-form-item__content underline">{{headerVal.PartyA_DoctorPhone}}</div>
  </div>
  </el-col>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">乙方电话</label>
  <div class="el-form-item__content">{{headerVal.PartyB_PatientPhone}}</div>
  </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">签约时效</label>
  <div class="el-form-item__content underline">{{headerVal.PartyA_SignStartDate}}——{{headerVal.PartyA_SignEndDate}}</div>
  </div>
  </el-col>
  <el-col :span="12">
  <div class="agreement_top">
  <label class="el-form-item__label">乙方住址</label>
  <div class="el-form-item__content">{{headerVal.PartyB_PatientAddress}}</div>
  </div>
  </el-col>
</el-row>
<el-row v-if="PartyA_IsDoctorInTeam">
  <el-col :span="24">
  <div class="agreement_top">
  <label class="el-form-item__label">团队成员</label>
  <div class="el-form-item__content underline">{{headerVal.PartyA_TeamDoctorName}}</div>
  </div>
  </el-col>
</el-row>
<el-row >
  <el-col :span="24" >
  <div class="agreement_top">
  <label class="el-form-item__label">签约服务包</label>
  <div v-if="ServicePackInfo.ServicePackName==null" class="el-form-item__content underline">{{ServicePackInfo.ServicePackName}}</div>
  <div v-else class="el-form-item__content underline">{{ServicePackInfo.ServicePackName}}</div>
  </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="24">
  <div class="agreement_top">
  <label class="el-form-item__label">甲乙双方现共同确定</label>
  <div v-if="PartyA_IsDoctorInTeam==true" class="el-form-item__content underline">{{xycon.PartyA}}社区卫生服务站{{headerVal.PartyA_TeamName}}团队，为乙方的家庭医生团队。</div>
  <div v-if="PartyA_IsDoctorInTeam==false" class="el-form-item__content underline">{{headerVal.PartyA_DoctorName==""?"":headerVal.PartyA_DoctorName+"医生，为乙方的家庭医生"}}。</div>
  </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="24"><div class="protocol">经双方协议，签订此协议并接受以下条款的约定：</div></el-col>
</el-row>
<el-row>
 <el-col :span="24" :class="{'noprint':isOrNoPrint==0}">
    <div class="protocol_content" >
    <pre>{{editorRemark.content}}</pre>
</div></el-col>
</el-row>


<el-row>
  <el-col :span="24"><div class="protocol">本协议书一式两份，甲方、乙方各执一份，自双方签字之日起生效，有效期为一年。期满后如需解约，乙方需告知甲方，双方签字确认。不提出解约视为自动续约。</div></el-col>
</el-row>
<el-row>
  <el-col :span="8">
  <div class="agreement_bottom">
  <label class="el-form-item__label">甲方签字</label>
  <div class="el-form-item__content"></div>
  </div>
  </el-col>
  <el-col :span="8"><div class="agreement_bottom"><label class="el-form-item__label"></label><div class="el-form-item__content"></div></div></el-col>
  <el-col :span="8">
  <div class="agreement_bottom">
  <label class="el-form-item__label">乙方签字</label>
  <div class="el-form-item__content"></div>
  </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="8">
  <div class="agreement_bottom">
  <label class="el-form-item__label">签字日期：</label>
  <div class="el-form-item__content">{{footerVal.PartyA_SignDate}}</div>
  </div>
  </el-col>
  <el-col :span="8"><div class="agreement_bottom"><label class="el-form-item__label"></label><div class="el-form-item__content"></div></div></el-col>
  <el-col :span="8">
  <div class="agreement_bottom">
  <label class="el-form-item__label">签字日期：</label>
  <div class="el-form-item__content">{{footerVal.PartyB_SignDate}}</div>
  </div>
  </el-col>
</el-row>
<span class="agreement_save">
  <el-button v-if="isOrNoEdit==1"  class=" noprint" @click="editContent" style="margin-right:30px">编辑</el-button> 
    <el-button v-if="isOrNoPrint==0"  type="primary" @click="print" class=" noprint">打印空白协议</el-button>
    <el-button v-else  type="primary" @click="print" class=" noprint">打印协议</el-button>
</span>
    
    </main>
  </div>
</div>
</template>

<script>
import "../../assets/sass/addtransfer.scss";
import "../../assets/sass/agreement.scss";
import { apiurl,linkUrl } from "../../service/api.js";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      xycon: {},
      headerVal:{},
      footerVal:{},
      ServicePackInfo:{},
      editorRemark: {
        content: "",
        id: 0
      },
     registerRecordId:0,	//协议记录id
     registerDoctorId:0,  //医生id
     isOrNoEdit:1,        //是否可编辑
     isOrNoPrint:0,       //是否打印空白协议0空白 1非空白
     PartyA_IsDoctorInTeam:false,//是否团队医生
     loading:true,
    };
  },
  created() {},
  //获取session对象
  computed: {
    ...mapGetters({
      hosptialid: "hosptialid",
      hosptialname: "hosptialname",
      province: "province",
      provincename: "provincename",
      city: "city",
      cityname: "cityname",
      area: "area",
      area: "areaname",
      token: "token"
    })
  },

  //mounted
  mounted() {
    this.QianYueGetHeaderAndFooter();
    this.getContent();
    this.GetUrlParam();
    this.getUrl();
  },
  //
  methods: {
    getUrl:function()
    {
      var urlValue= document.referrer;
      console.log(urlValue,"urlValue");
    },
    //获取签约协议头部和尾部
    QianYueGetHeaderAndFooter() {
      var self = this;
      function UrlSearch() {
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?")
        str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        for(var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if(num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                this[name] = value;
            }
        }
      }
      var Request = new UrlSearch(); //实例化
      self.registerRecordId=Request.registerRecordId;
      self.registerDoctorId=Request.registerDoctorId;
      axios
        .get(apiurl.QianYueGetHeaderAndFooter, {
          params: {
            registerRecordId: Request.registerRecordId,
            registerDoctorId: Request.registerDoctorId
          },
          headers: {
            //self.token
            token:self.token
          }
        })
        .then(function(res) {
          if (res.data.suc == true) {
            self.loading=false;
            self.xycon = res.data.extra;
            self.headerVal=self.xycon.Header;
            self.footerVal=self.xycon.Footer;
            self.ServicePackInfo=self.xycon.ServicePackInfo;
            console.log(self.xycon,'xycon')
            self.PartyA_IsDoctorInTeam= res.data.extra.Header.PartyA_IsDoctorInTeam;
          }
        });
    },
    //获取所在医院的协议内容
    getContent: function() {
      var self = this;
      axios
        .get(apiurl.QianYueGetContent+"?registerRecordId="+self.registerRecordId, {
          headers: {
            
            token: self.token
          }
        })
        .then(function(res) {
          if (res.data.suc == true) {
            self.editorRemark.content = res.data.extra.Content;
            self.editorRemark.id = res.data.extra.Id;
          }
        })
        .catch(function(error) {});
    },
    //保存签约内容
    saveQianYueContent: function() {
      var self = this;
      axios
        .post(
          apiurl.QianYueAddOrUpdateContent,
          {
            Id: self.editorRemark.id,
            Content: self.editorRemark.content
          },
          {
            headers: {
              //self.token
              token: self.token
            }
          }
        )
        .then(function(res) {
          if (res.data.suc == true) {
            self.$message({
              type: "success",
              message: res.data.mes
            });
          } else {
            self.$message({
              type: "warning",
              message: res.data.mes
            });
          }
        });
    },
    //编辑
    editContent()
    {
      var self = this;
      // var param = {};
      // param.method = "addTab";
      // param.title = '签约编辑页';
      // param.url = linkUrl + 'qianyueagreement/agreementpageEdit?token='+this.token+'&registerRecordId='+self.registerRecordId+'&registerDoctorId='+self.registerDoctorId;
      // window.parent.postMessage(JSON.stringify(param), '*');

        this.$router.push({
            path:'/qianyueagreement/agreementpageEdit?registerRecordId='+self.registerRecordId+"&registerDoctorId="+self.registerDoctorId+"&edit="+self.isOrNoEdit+"&print="+self.isOrNoPrint+'&ModelUrl='+this.$route.query.ModelUrl
        });
    },
    print()
    {
    
    window.print();
    },
    UrlSearch(Id) {
      var name, value;
      var str = location.href; //取得整个地址栏
      var num = str.indexOf("?")
      str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]

      var arr = str.split("&"); //各个参数放到数组里
      for(var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf("=");
          if(num > 0) {
              name = arr[i].substring(0, num);
              value = arr[i].substr(num + 1);
              this[name] = value;
          }
      }
    },

    //获取url参数值
    GetUrlParam()
    {
      var self=this;
      self.registerRecordId= this.$route.query.registerRecordId;
      self.registerDoctorId= this.$route.query.registerDoctorId;
      self.isOrNoEdit=this.$route.query.edit==null?1:this.$route.query.edit;//1可编辑0不可
      self.isOrNoPrint=this.$route.query.print==null?0:this.$route.query.print;
    }
  }
};
</script>