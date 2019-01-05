<template>
  <div class="ts-content wrapper-datepicker newcss sign-list">
    <main class="main-wrap">
      <el-form ref="form" :model="form" label-width="85px" class="clearfix">
        <el-form-item class='floatLeft no_margin_left' style='width:auto;'>
          <el-dropdown @command="handleCommand">
            <el-button type="info">
              手动新增转诊
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='门诊转诊'>门诊转诊</el-dropdown-item>
              <!-- <el-dropdown-item command='检查检验转诊'>检查检验转诊</el-dropdown-item> -->
              <el-dropdown-item command='住院转诊'>住院转诊</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item class='floatLeft'>
          <el-col :span="24">
            <el-input v-model="form.input" placeholder="输入居民姓名、身份证号搜索" style='border-radion:0;'></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class='floatLeft no_margin_left' style='width:auto;'>
          <el-button type="primary" @click="GetTransferRegisterList">查询</el-button>
          <el-button @click="Clear">清空</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row v-loading="loading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" slot="empty">
        <el-table-column type="index" label="编号" width="60"> </el-table-column>
        <el-table-column prop="PatientName" label="居民姓名" width="90"> </el-table-column>
        <el-table-column prop="PatientCardId" label="身份证号" width="165"> </el-table-column>
        <el-table-column prop="PatientPhone" label="联系方式" width="100">
          <template slot-scope="scope">
            {{ scope.row.PatientPhone||scope.row.PatientTelePhone}}</template>
        </el-table-column>
        <el-table-column prop="PatientAddress" label="常住地址" width="180"> </el-table-column>
        <!-- <el-table-column prop="PersonsClassStr" label="人群分类" width="100"></el-table-column> -->
        <el-table-column prop="RegisteredDoctorName" label="签约医生" width="90"> </el-table-column>
        <!-- <el-table-column prop="MedicalOrgName" label="签约机构" width="150"></el-table-column> -->
        <el-table-column prop="TermOfValidity" label="签约有效期" width="120"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" class="padding0X fontsize-2" @click="handleCheck_mzzz(scope.row.PatientCardId)">
              <i class="marginright5"></i>门诊转诊
            </el-button>
            <!-- <el-button type="text" class="padding0X fontsize-2" @click="handleCheck_jyjc(scope.row.PatientCardId)">
              <i class="marginright5"></i>检验检查转诊
            </el-button> -->
            <el-button type="text" class="padding0X fontsize-2" @click="handleCheck_zyzz(scope.row.PatientCardId)">
              <i class="marginright5"></i>住院转诊
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import axion from '@/util/http_url.js'
import '../../assets/sass/addtransfer.scss';
import '../../assets/sass/patient.css';
import '../../assets/sass/zz.scss';
import { mapGetters, mapActions } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js';
// const _currentToken = localStorage.getItem('tokenL');
export default {
  data() {
    return {
      form: { input: '' },
      tableData: [],
      currentPage: 1,
      currentNum: 10,
      total: 0,
      loading: true
    };
  },
  computed: {
    ...mapGetters({
      token: 'token'
    }),
  },
  mounted() {
    this.GetTransferRegisterList();

  },
  methods: {
    handleCommand(command) {
      console.log(command)
      if(command == '门诊转诊'){
        var param = {};
        param.method = "addTab";
        param.title = '门诊转诊';
        param.url = linkUrl + 'sign-person-list/mzzzsqsr?token=' + this.token+'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');

        // this.$router.push({
        //   path: '/sign-person-list/mzzzsqsr',
        // })
      }else if(command == '检查检验转诊'){
        var param = {};
        param.method = "addTab";
        param.title = '检验检查转诊';
        param.url = linkUrl + 'sign-person-list/yyjyjcsr?token=' + this.token+'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');
        // this.$router.push({
        //   path: '/sign-person-list/yyjyjcsr',
        // })
      }else if(command == '住院转诊'){
        var param = {};
        param.method = "addTab";
        param.title = '住院转诊申请';
        param.url = linkUrl + 'turnoutlist/hosptlrefrrapply?token=' + this.token+'&type='+this.$route.query.type+'&handAdd=true'+'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');
        // this.$router.push({
        //   path: '/turnoutlist/hospitalone'
        // })
      }
    },
    handleSizeChange(val) {
      this.currentNum = val;
      this.GetTransferRegisterList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetTransferRegisterList();
      console.log(`当前页: ${val}`);
    },
    Clear() {
      this.form.input = ""
    },
    GetTransferRegisterList() {
      axion.GetTransferRegisterList({
        page: this.currentPage,
        rows: this.currentNum,
        KeyWords: this.form.input,
        token: this.token
      }).then(d => {
        this.tableData = d.data.rows;
        this.total = d.data.total;
        if (this.total > 0 || this.total == 0|| d.data.suc == false) {
          this.loading = false
        }
      })
    },
    addtransfer() {
      this.$router.push({
        path: '/sign-person-list/mzzzsqsr'
      })
    },
    handleCheck_mzzz(id) {
      var param = {};
      param.method = "addTab";
      param.title = '门诊转诊';
      param.url = linkUrl + 'sign-person-list/mzzzsqsr?token=' + this.token + '&id=' + id +'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');

      // this.$router.push({
      //   path: '/sign-person-list/mzzzsqsr',
      //   query: {
      //     id: id
      //   }
      // })
    },
    handleCheck_jyjc(id) {
      var param = {};
      param.method = "addTab";
      param.title = '检验检查转诊';
      param.url = linkUrl + 'sign-person-list/yyjyjcsr?token=' + this.token + '&id=' + id +'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push({
      //   path: '/sign-person-list/yyjyjcsr',
      //   query: {
      //     id: id
      //   }
      // })
    },
    handleCheck_zyzz(id) {
      var param = {};
      param.method = "addTab";
      param.title = '住院转诊申请';
      param.url = linkUrl + 'turnoutlist/hosptlrefrrapply?token=' + this.token + '&id=' + id+'&type='+this.$route.query.type+'&handAdd=true'+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push({
      //   path: '/turnoutlist/hosptlrefrrapply',
      //   query: {
      //     id: id
      //   }
      // })
    }
  }
};
</script>
<style lang="scss" scoped>
  * {
    font-size: 12px;
  }
</style>

            