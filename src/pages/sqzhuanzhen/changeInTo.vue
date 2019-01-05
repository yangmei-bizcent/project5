<template>
  <div class="bgcolor-white">
    <main class="main-wrap">
      <div class="form-head ts-bgcolor-bg">
        <div class="fhtitle ">社区转诊</div>
        <el-form ref="form" :model="form" label-width="76px" class="clearfix">
          <el-row>
             <el-col :span="6">
              <el-form-item label="转出医院">
                <el-select v-model="form.hospital" @change="selectHos" clearable placeholder="请选择">
                    <el-option
                      v-for="item in hospitals"
                      :key="item.HospitalId"
                      :label="item.HospitalName"
                      :value="item.HospitalId">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>  
            <el-col :span="6">
              <el-form-item label="申请日期">
                <el-date-picker
                  v-model="form.applytime" format="yyyy-MM-dd"
                  type="daterange" range-separator=" 至 " 
                  value-format="yyyy-MM-dd" @change="getApplyDate"
                  placeholder="选择日期范围">
                </el-date-picker>
              </el-form-item>
            </el-col>   
            <el-col :span="6">
              <el-form-item label="患者姓名">
                <el-input placeholder="请输入患者的姓名" v-model="form.name" clearable></el-input>
              </el-form-item>
            </el-col>  
            <el-col :span='6' class="pl10">
              <el-button type="success" class='el-button--primary' @click='choose(status, "current")'>查询</el-button>      
              <el-button type="" @click="clearform()">清空</el-button>          
            </el-col>                
          </el-row>
          <el-row >
              <el-form-item label="预约状态" >
                <div class="statuscon">
                  <el-badge :value="oneMore<99?oneMore:'99+'" :hidden='oneMore>0?false:hideBadge' :class="'item '+(status==0?'badgeactive':'')" v-show="diction==10">
                    <el-button size="small"  @click="choose(0, 'current')">待审核</el-button>
                  </el-badge>
                  <el-badge value="0" :hidden='hideBadge' :class="'item '+(status==2?'badgeactive':'')" v-show="diction==10">
                    <el-button size="small"  @click="choose(2, 'current')">已拒绝</el-button>
                  </el-badge>
                  <el-badge value="0" :hidden='hideBadge' :class="'item '+(status==3?'badgeactive':'')" v-show="diction==10">
                    <el-button size="small" @click="choose(3, 'current')">已取消</el-button>
                  </el-badge>
                  <el-badge value="0" :hidden='hideBadge' :class="'item '+(status==1?'badgeactive':'')">
                    <el-button size="small"  @click="choose(1, 'current')">已接收</el-button>
                  </el-badge>
                  <el-badge value="0" :hidden='hideBadge' :class="'item '+(status==4?'badgeactive':'')" v-show="diction==10">
                    <el-button size="small" @click="choose(4, 'current')">补录</el-button>
                  </el-badge>
                  </div>
              </el-form-item>
          </el-row>
        </el-form>
      </div>
        <el-table :data="tableData" stripe border style="width: 100%" highlight-current-row >
        <el-table-column type="index" label="编号" width="65"> </el-table-column>
        <el-table-column prop="PatientName" label="病人姓名" width="100"> </el-table-column>
        <el-table-column label="时间" width="140">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p class="textAlignCenter">{{ timetooltip }}</p>
              <div slot="reference" class="name-wrapper" v-if="status==2||status==3">
                {{ scope.row.LastUpdateTime }}
              </div>
              <div slot="reference" class="name-wrapper" v-else-if="status==4">
                {{ scope.row.AppointmentDate }}
              </div>
              <div slot="reference" class="name-wrapper" v-else>
                {{ scope.row.CreateDate }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="AppointmentDoctorName" label="转入医生" width="140"> </el-table-column>
        <el-table-column prop="ApplyHospitalName" label="转出医院" width="140"></el-table-column>
        <el-table-column prop="SectionName" label="转出科室" width="140"></el-table-column>
        <el-table-column prop="DoctorName" label="转出医院联系人" width="140"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <!-- <span  class="check_btn ts-color-blue el-icon-ts-serch" @click='checkdetail()' v-show="activeclass!='active1'">查看详情</span>
            <span v-if="activeclass=='active1'" class="check_btn el-icon-ts-X ts-color-blue" @click='cancle()'>取消预约</span>
            <span v-else-if="(activeclass=='active2'||activeclass=='active3')" class="check_btn ts-color-blue" @click='applyagain()'>重新预约</span> -->
            <el-button type="text" size="small" @click="goReviewed(scope.row.Id, scope.row.PatientName)" v-show="status==0">
                <i class="el-icon-ts-watch"></i> 审核
            </el-button>
            <el-button type="text" size="small" @click="checkdetail(scope.row.Id, scope.row.PatientName)" v-show="status!=0">
              <i class="el-icon-search"></i> 查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block textAlignRight" v-show="total>0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20,30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import httpUrl from "../../util/http_url.js";
import { linkUrl } from "../../service/api.js";
export default {
  data() {
    return {
      token: '',
      form: {
        applytime:'',//申请日期  
        name: "",//患者名字
        hospital: "",//医院
        applyType:""//预约状态
      }, 
      applytime: '',
      hosId: '',
      timetooltip:'申请时间',
      loading: false,
      hospitals:[],
      total: 0,
      oneMore: 0,
      currentPage:1,
      currentNum:10,
      status: 0,
      tableData:[],
      hideBadge: true,
      diction: 0, //权限 1-个人,10-管理员
    }
  },
  mounted () {
    this.token = this.$route.query.token;
    httpUrl.GetUserJurisdiction({token: this.token}).then(res=>{
      if(res.data.suc == true){
        this.diction = res.data.extra.ReferralJurisdiction;
        if(this.diction == 1){
          this.status = 1;
        }
        this.getHosList();
        this.choose(this.status, 'current');
      }
    })
  },
  methods: {
    selectHos(value) {
      this.hosId = value;
    },
    //获取上级医院列表
    getHosList() {
      httpUrl.GetIsDowmTransferHigherHospitalList({ keyWord: '', token:this.token }).then(res=>{
        if(res.data.suc==true){
          this.hospitals = res.data.rows;
        }
      })
    },
    //查询列表
    searchContent(num, status){
      this.currentPage = num;
      status = status || 0;
      let pama = {
        token: this.token,
        AppointmentState: this.status,
        patientName: this.form.name,
        applyDate: this.applytime,
        HospitalId: this.hosId,
        rows: this.currentNum,
        page: this.currentPage
      };
      httpUrl.GetTurnDownListByCommunity(pama).then(res=>{
        if(res.data.suc==true){
          this.tableData = res.data.rows;
          this.total = res.data.total;
          if(this.total>0&&this.tableData[0].AppointmentState==0){
            this.oneMore = res.data.total;
          }
        }
      })
    },
    //清空form表单
    clearform(){
      this.hosId = '';
      this.form.applytime="";
      this.applytime = '';
      this.form.name="";
      this.form.hospital="";
    },
    //选择预约状态
    choose(status, str){
      this.status = status;
      if(str == 'current'){
        this.currentPage = 1;
      }
      switch(status){
        case 0:this.timetooltip="申请时间";break;
        case 2:this.timetooltip="拒绝时间";break;
        case 3:this.timetooltip="取消时间";break;
        case 1:this.timetooltip="申请时间";break;
        case 4:this.timetooltip="申请时间";break;
      };
      this.searchContent(this.currentPage, this.status);
    },
    //审核
    goReviewed(id, PatientName){
      this.checkdetail(id, PatientName);
      this.choose(0);
    },
    //查看详情
    checkdetail(id, PatientName){
      var param = {};
      param.method = "closeThisTab";
      window.parent.postMessage(JSON.stringify(param), '*');
      param.method = "addTab";
      if(this.status==0){
        param.title = PatientName + "-待审核详情";
      }else if(this.status==1){
        param.title = PatientName + "-已接收详情";
      }else if(this.status==2){
        param.title = PatientName + "-已拒绝详情";
      }else if(this.status==3){
        param.title = PatientName + "-已取消详情";
      }else if(this.status==4){
        param.title = PatientName + "-补录详情";
      }
      param.url = linkUrl + 'zhuanZhenInfo/zhuanzhenHop?token=' + this.token
      +'&transferId='+ id + '&type=toSelf'+ '&hosType=2' +'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
    },
    handleSizeChange(val) {
      this.currentNum = val;
      this.choose(this.status);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.choose(this.status);
    },
    getApplyDate(value) {
      this.applytime = value;
    },
  }
}
</script>
<style lang="scss" scoped>
.form-head{
  padding:0px 20px;
  margin-bottom:20px;
 .fhtitle{
    line-height:60px;
    border-bottom:1px solid #E6E6E6;
    margin-bottom:20px;
  }
  .pl10{
      padding-left:20px;
  }
  .item {
    margin-top: 10px;
    margin-right: 20px;
    button{
      border-radius:30px;
    }
  }
  .badgeactive button{
    color:#00A085;
    border-color:#00A085;
  }
  .statuscon {
    margin-top:-8px;
  }
}
.block{
    margin-top:20px;
}

 .check_btn{
  cursor: pointer;
  margin-right:10px;
}
</style>