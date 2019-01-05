<template>
  <div class="ts-content wrapper-datepicker newcss nowidth">
    <main class="main-wrap">
      <el-form ref="form" :model="form" label-width="85px" class="clearfix">
        <el-row>
          <el-col :span="6">
            <el-form-item label="停诊医院">
              <el-select v-model="form.hospitalId" placeholder="请选择" @change="GetSmallSectionByHospitalID" clearable>
                <el-option v-for="item in hosOptions" :key="item.HospitalId" :label="item.HospitalName" :value="item.HospitalId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="停诊科室">
              <el-select v-model="form.sectionId" placeholder="请选择" @change="GetDoctorsBySectionID" clearable>
                <el-option v-for="item in secOptions" :key="item.Id" :label="item.SectionName" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="停诊医生">
              <el-select v-model="form.doctorId" placeholder="请选择" clearable>
                <el-option v-for="item in docOptions" :key="item.Id" :label="item.DoctorName" :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item class='floatLeft no_margin_left widthauto height38'>
              <el-button type="primary" @click="GetSchedulingStopList">查询</el-button>
              <el-button @click="Clear">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column type="index" label="编号" width="60"> </el-table-column>
        <el-table-column prop="HospitalName" label="医院名称" width="180"> </el-table-column>
        <el-table-column prop="SectionName" label="科室名称" width="130"> </el-table-column>
        <el-table-column prop="DoctorName" label="医生名称" width="100"> </el-table-column>
        <el-table-column prop="StartDate" label="停诊开始日期" width="140"> </el-table-column>
        <el-table-column prop="EndDate" label="停诊结束日期" width="140"> </el-table-column>
        <el-table-column prop="Remark" label="备注" width=""> </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="currentNum" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import '../../assets/sass/addtransfer.scss';
import axion from '@/util/http_url.js'
const _currentToken = localStorage.getItem('tokenL'); //f0149dc9861d4028b580b644499b95e4

export default {
  name: 'table',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      currentNum: 10,
      total: 0,
      hosOptions: [],
      secOptions: [],
      docOptions: [],
      form: {
        hospitalId: '',
        sectionId: '',
        doctorId: '',
        page: 1,
        rows: 10,
        token: _currentToken
      }
    };
  },
  mounted() {
    this.GetSchedulingStopList()
    this.GetIsAppointmentHigherHospitalList()
  },
  methods: {
    handleSizeChange(val) {
      this.currentNum = val;
      this.GetSchedulingStopList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetSchedulingStopList();
      console.log(`当前页: ${val}`);
    },
    Clear() {
      this.form.hospitalId = '';
      this.form.sectionId = '';
      this.form.doctorId = '';
      this.secOptions = [];
      this.docOptions = [];
    },
    GetSchedulingStopList() {
      this.form.page = this.currentPage
      this.form.rows = this.currentNum
      axion.GetSchedulingStopList(this.form).then(d => {
        this.tableData = d.data.rows;
        this.total = d.data.total;
      })
    },
    // 医院下拉
    GetIsAppointmentHigherHospitalList() {
      axion.GetIsAppointmentHigherHospitalList({
        keyWord: this.form.hospitalId,
        token: _currentToken
      }).then(d => {
        this.hosOptions = d.data.rows;
      })
    },
    // 科室下拉
    GetSmallSectionByHospitalID() {
      axion.GetSmallSectionByHospitalID({
        hospitalID: this.form.hospitalId,
        token: _currentToken
      }).then(d => {
        this.secOptions = d.data.rows;
        this.form.sectionId = '';
        this.form.doctorId = '';
      })
    },
    // 医生下拉
    GetDoctorsBySectionID() {
      if (this.form.sectionId != "") {
        axion.GetDoctorsBySectionID({
          sectionId: this.form.sectionId,
          token: _currentToken
        }).then(d => {
          this.docOptions = d.data.rows;
          this.form.doctorId = '';
        })
      }
    }
  }
};
</script>
 