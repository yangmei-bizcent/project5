<template>
  <div class="ts-content wrapper-datepicker newcss">
    <main class="main-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="85px" class="clearfix">
        <el-row>
          <el-col :span='6'>
            <el-form-item label="接收时间">
              <el-date-picker v-model="form.value" type="daterange" align="right" placeholder="选择日期范围" :picker-options="form.pickerOptions" @change='datavalue' range-separator="至">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="接诊机构">
              <el-select v-model="form.Hospitalselect" placeholder="请选择" clearable>
                <el-option v-for="item in form.jzjg" :key="item.HospitalId" :label="item.HospitalName" :value="item.HospitalId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="患者姓名">
              <el-input v-model="form.patientName" placeholder="请输入患者姓名" style='border-radion:0;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style='margin-right:15px;'>
            <el-form-item class='no_margin_left'>
              <el-button type="primary" @click='tabledata()'>查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span='1'>
            <el-form-item class='no_margin_left'>
              <el-button type="info" @click='exportexl()'>导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="tableCurrentChange">
        <el-table-column type="index" label="序号" width="65"> </el-table-column>
        <el-table-column prop="AppointmentHospitalName" label="接诊机构" width="180"></el-table-column>
        <el-table-column prop="PatientName" label="病人姓名" width="100"> </el-table-column>
        <!-- <el-table-column prop="ApplyHospitalName" label="送转医院" width="180"></el-table-column> -->
        <el-table-column prop="SectionName" label="送转科室" width="140"></el-table-column>
        <el-table-column prop="DoctorName" label="送转医生" width="140"></el-table-column>
        <el-table-column prop="LastUpdateTime" label="接收时间" width="140"> </el-table-column>
        <el-table-column prop="TransferTreatmentReason" label="转诊原因" width="140"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <span class="check_btn el-icon-ts-serch" @click='checkdetail(scope.row.Id,scope.row.AppointmentState,scope.row.PatientName)'>查看详情</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="AppointmentStateText" label="进度状态" width="100">
          <template slot-scope="scope">
            <div v-if='scope.row.AppointmentState==0' class="tag_text1">待接收
              <b></b>
            </div>
            <div v-if='scope.row.AppointmentState==1' class="tag_text2">已接收
              <b></b>
            </div>
            <div v-if='scope.row.AppointmentState=="已取消"' class="tag_text3">已取消
              <b></b>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20,30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import { mapGetters, mapActions } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js';
import axios from 'axios';
export default {
  name: 'table',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      currentNum: 10,
      total: 0,
      sqdata: '',
      form: {
        jzjg: [],
        Hospitalselect: '',
        patientName: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value: ''
      },
      newdatavalue: '',
      rules: {
        input5: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: this.checkWord, trigger: 'blur' }
        ]
      },

    };
  },
  computed: {
    ...mapGetters({
      token: 'token', seedpatiendid: 'seedpatiendid', waitid: 'waitid', waitstate: 'waitstate'
    })
  },
  mounted() {
    var self = this;
    // 接诊机构下拉框
    axios.get(apiurl.GetCooperateHospitalList, {
      params: {
        token: self.token
      }
    })
      .then(function(response) {
        var data = response.data.rows;
        self.form.jzjg = data;
      })
      .catch(function(error) {
        console.log(error);
      });
    // 表格
    axios.get(apiurl.GetPatientReceivedList, {
      params: {
        page: self.currentPage,
        rows: self.currentNum,
        applyDate: '',
        hospitalId: self.form.Hospitalselect,
        patientName: self.form.patientName,
        token: self.token
      }
    })
      .then(function(response) {
        var data = response.data.rows;
        self.tableData = data;
        self.total = response.data.total;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    ...mapActions([
      'set_waitid', 'set_waitstate'
    ]),
    datavalue(val) {
      var self = this;
      self.newdatavalue = val;
    },
    tableCurrentChange(val) {
      this.currentRow = val;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleSizeChange(val) {
      var self = this;
      self.currentNum = val;
      self.tabledata();
      console.log(self.sqdata);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      self.tabledata();
      console.log(`当前页: ${val}`);
    },
    tabledata() {
      var self = this;
      axios.get(apiurl.GetPatientReceivedList, {
        params: {
          page: self.currentPage,
          rows: self.currentNum,
          applyDate: self.newdatavalue,
          hospitalId: self.form.Hospitalselect,
          patientName: self.form.patientName,
          token: self.token
        }
      })
        .then(function(response) {
          var data = response.data.rows;
          self.tableData = data;
          self.total = response.data.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkdetail(waitid, waitstate,name) {
      var self = this;
      self.set_waitid(waitid);
      self.set_waitstate(waitstate);
      var param = {};
      param.method = "addTab";
      param.title = name+'-已接收';
      param.url = linkUrl + 'invaliddetail/invaliddetail?token=' + self.token + "&ttb_id=" + waitid + '&waitstate' + waitstate+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push('/invaliddetail/invaliddetail');
      console.log(self.waitstate)
    },
    // 导出
    exportexl() {
      var self = this;
      if (self.newdatavalue == undefined) {
        self.newdatavalue = ''
      }
      if (self.form.Hospitalselect == undefined) {
        self.form.Hospitalselect = ''
      }
      if (self.form.patientName == undefined) {
        self.form.patientName = ''
      }
      self.hrefvalue = apiurl.ExportPatientReceived + '?applyDate=' + self.newdatavalue + '&hospitalId=' + self.form.Hospitalselect + '&patientName=' + self.form.patientName + '&token=' + self.token;
      console.log(self.hrefvalue)
      window.open(self.hrefvalue, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.check_btn,
.cancel_btn,
.angin_btn {
  font-size: 12px;
  color: #539CDB;
  cursor: pointer;
}

.main-wrap {
  padding: 0;
}

.el-date-editor--daterange.el-input {
  width: 100%;
}

.wrapper-datepicker {
  .el-form-item {
    width: auto;
  }
  .demonstration {
    display: inline-block;
    width: 65px;
    margin-right: 20px;
    text-align: right;
  }
  .select_option {
    width: 200px;
    height: 34px;
  } // .el-date-editor{
  //   .el-input__icon{
  //     left:0;
  //   }
  // }  
  // .el-input__inner{
  //   padding-left: 35px;
  //   padding-right: 0;
  // }
  .el-table th {
    background-color: #FFFFFF !important;
  }

  .el-table__footer-wrapper thead div,
  .el-table__header-wrapper thead div {
    background-color: #FFFFFF !important;
  }

  .el-table tr {
    background-color: #F7F7F7 !important;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #FFFFFF none repeat scroll 0 0 padding-box;
  }
  .tag_text1 b,
  .tag_text2 b,
  .tag_text3 b {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
    margin-left: 5px;
  }
  .tag_text1 b {
    background: #539CDB;
  }
  .tag_text2 b {
    background: #58B957;
  }
  .tag_text3 b {
    background: #455667;
  } // 分页
  .pag-ul {
    padding: 0;
    list-style: none;
    overflow: hidden;
    .pag-li {
      text-align: center;
      float: left;
      width: 50%;
    }
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    line-height: 44px;
    margin-bottom: 10px;
  }
  .block {
    padding-left: 185px;
    margin-bottom: 60px;
  }
  .block-add {
    margin-top: 16px;
  }
  .el-pagination {
    text-align: right;
    margin-top: 50px;
  }
  .el-pagination__sizes {
    margin-left: 20px;
  }
}
</style>
            