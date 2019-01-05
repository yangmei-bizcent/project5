<template>
  <div class="ts-content wrapper-datepicker newcss">
    <main class="main-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="85px" class="clearfix">
        <el-row>
          <el-col :span="6">
            <el-form-item label="拒绝时间">
              <el-date-picker v-model="form.value" type="daterange" range-separator="至" placeholder="选择日期范围" :picker-options="form.pickerOptions" @change='datavalue'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="送转医院">
              <el-select v-model="form.value1" placeholder="请选择" @change="changeVal()" clearable>
                <el-option v-for="item in form.jzjg" :label="item.HospitalName" :value="item.HospitalId" :key="item.HospitalId">
                </el-option>
              </el-select>
              <!-- <el-select v-model="form.value2" placeholder="请选择" @change="changeDept()">
                      <el-option v-for="item in form.dept" :label="item.SectionName" :value="item.Id" :key="item.Id">
                      </el-option>
                    </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="患者姓名">
              <el-input v-model="form.input1" placeholder="请输入患者姓名" style='border-radion:0;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='1' style='margin-right:15px;'>
            <el-form-item class='no_margin_left'>
              <el-button type="primary" @click="search()">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span='1'>
            <el-form-item class='no_margin_left'>
              <el-button type="info" @click="waitExport()">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData.rows" stripe style="width: 100%" highlight-current-row>
        <el-table-column label="序号" type='index' width="65">
        </el-table-column>
        <!-- <el-table-column prop="AppointmentHospitalName" label="接诊机构" width="180"></el-table-column> -->
        <el-table-column prop="PatientName" label="病人姓名" width="140"></el-table-column>
        <el-table-column prop="ApplyHospitalName" label="送转医院" width="140"></el-table-column>
        <el-table-column prop="SectionName" label="送转科室" width="100"></el-table-column>
        <el-table-column prop="DoctorName" label="送转医生" width="80"></el-table-column>
        <!-- <el-table-column prop="AppointmentStateText" label="进度状态" width="100">
              <template slot-scope="scope">
                <div v-if='scope.row.AppointmentState==2' class="tag_text3">已拒绝
                  <b></b>
                </div>
              </template>
            </el-table-column> -->
        <el-table-column prop="RefusalReasonText" label="拒绝原因" width="180">
          <template slot-scope="scope">
            <label v-html="scope.row.RefusalReasonText==null?'暂无':scope.row.RefusalReasonText"></label>
          </template>
        </el-table-column>
        <el-table-column prop="AppointmentDateFormat" label="拒绝时间" width="120"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <span class="check_btn el-icon-ts-serch" @click='checkdetail(scope.row.Id,scope.row.AppointmentState,scope.row.PatientName)'>查看详情</span>
            <!-- <span class="cancel_btn el-icon-ts-cehui" @click="handleTransfer(scope.$index, scope.row)">重新送转</span> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="sizepage" layout="total, prev, pager, next, sizes" :total="tableData.total">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import '../../assets/sass/patient.css';
// const token = '14613b590745435082e43b902a2ced94';
import { mapGetters, mapActions } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js';
import axios from 'axios';
export default {
  name: 'table',
  data() {
    return {
      tableData: [],
      currentVal: '',
      hospitalID: '',
      applySectionId: '',
      applyHospitalId: '',
      ttb_id: '',
      form: {
        jzjg: [],
        dept: [],
        value1: '',
        value2: '',
        input1: '',
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
      rules: {
        input5: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          { validator: this.checkWord, trigger: 'blur' }
        ]
      },
      page: 1,
      rows: 10,
      sizepage: 0,
      newdatavalue: ''
    };
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  mounted() {
    //列表
    this.GetRefusedlist()
    // 下拉框医院
    this.GetHospitalList()

  },
  methods: {
    ...mapActions([
      'set_waitid', 'set_waitstate'
    ]),
    //显示的日期
    datavalue(val) {
      var self = this;
      self.newdatavalue = val;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      val = parseInt(val)
      this.sizepage = val;
      this.rows = val;
      this.GetRefusedlist()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      val = parseInt(val)
      console.log(val)
      this.currentVal = val - 1;
      this.page = val
      this.GetRefusedlist()
    },
    //列表
    GetRefusedlist() {
      var self = this;
      axios.get(apiurl.GetRefusedTreatmentPatientList, {
        params: {
          token: self.token,
          page: self.page,
          rows: self.rows,
          applyHospitalId: self.applyHospitalId,
          applySectionId: self.applySectionId,
          applyDate: self.newdatavalue,
          patientName: self.form.input1
        }
      })
        .then(function(response) {
          self.tableData = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 医院token
    GetHospitalList() {
      var self = this;
      axios.get(apiurl.GetIsDowmTransferHigherHospitalList, {
        params: {
          token: self.token
        }
      })
        .then(function(response) {
          console.log(response)
          self.form.jzjg = response.data.rows;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 科室下拉
    GetSectionByHospitalID() {
      var self = this;
      axios.get(apiurl.GetSectionByHospitalID, {
        params: {
          token: self.token,
          hospitalID: this.hospitalID
        }
      })
        .then(function(response) {
          self.form.dept = response.data.rows;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    TransferAgain() {
      var self = this;
      axios.post(apiurl.TransferAgain, {
        ttb_id: this.ttb_id
      }, {
          headers: {
            token: self.token,
          }
        })
        .then(function(response) {
          self.GetRefusedlist();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeVal() {
      this.hospitalID = this.form.value1;
      this.applyHospitalId = this.form.value1;
      this.GetSectionByHospitalID()
    },
    changeDept() {
      this.applySectionId = this.form.value2;
    },
    //查询
    search() {
      this.GetRefusedlist()
    },
    //导出
    waitExport() {
      var self = this;
      if (self.newdatavalue == undefined) {
        self.newdatavalue = ''
      }
      if (self.applyHospitalId == undefined) {
        self.applyHospitalId = ''
      }
      if (self.form.input1 == undefined) {
        self.form.input1 = ''
      }
      self.hrefvalue = apiurl.ExportRefusedTreatmentPatient + '?applyDate=' + self.newdatavalue + '&applyHospitalId=' + self.applyHospitalId + '&patientName=' + self.form.input1 + '&token=' + self.token;
      window.open(self.hrefvalue, '_blank');
    },
    //查看详情
    checkdetail(waitid, waitstate, name) {
      var self = this;
      self.set_waitid(waitid);
      self.set_waitstate(waitstate);
      var param = {};
      param.method = "addTab";
      param.title = name + "-已拒绝";
      param.url = linkUrl + 'invaliddetail/invaliddetail?token=' + self.token + "&ttb_id=" + waitid + '&waitstate' + waitstate +'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // this.$router.push('/invaliddetail/invaliddetail');
      console.log(self.waitstate)
    },
    cancelbtn() {
      this.$confirm('取消此条转诊申请？', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${action}`
          // });
        }
      });
    },
    passbtn() {
      this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      });
    },
    //   handleTransfer(index, row) {
    // 	console.log(index, row);
    // 	console.log(row.Id);
    //       this.ttb_id=row.Id
    //       this.open()
    // },
    open() {
      this.$alert('将此条转诊重新申请？', '提示', {
        confirmButtonText: '确认',
        callback: action => {
          this.TransferAgain()
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-wrap {
  padding: 0;
}

.check_btn,
.cancel_btn,
.angin_btn {
  font-size: 12px;
  color: #539CDB;
  cursor: pointer;
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
    background: #455667!important;
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

.tag_text3 b {
  background: red!important;
}
</style>
