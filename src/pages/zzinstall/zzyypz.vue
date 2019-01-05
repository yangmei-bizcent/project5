<template>
  <div class="paddingX15">
    <div class="ts-bgcolor-white padding20X paddingX20 fontsize0">
      <el-form class="paddingtop20 paddingX20 ts-bgcolor-bg" label-width="80px" style="overflow: hidden">
        <div class="marginbottom20 paddingbottom20 borderbottom1">转诊医院配置</div>
        <el-row>
          <el-col :span="12" class="flex-parent">
            <el-form-item label="区域">
              <el-col :span="5" style='margin-right:15px;'>
                <el-select v-model="params.province" clearable filterable placeholder="选择省" @change='requestCityList'>
                  <el-option v-for="item in Province" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                </el-select>
              </el-col>
              <el-col :span="5" style='margin-right:15px;'>
                <el-select v-model="params.city" clearable filterable placeholder="选择市" :no-data-text="nodataText" @visible-change="visibleCity" @change='requestAreaList'>
                  <el-option v-for="item in City" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                </el-select>
              </el-col>
              <el-col :span="5" style='margin-right:15px;'>
                <el-select v-model="params.area" clearable filterable placeholder="选择区县" :no-data-text="nodataText" @visible-change="visibleArea"><!--  @change='requestCommunityHospList' -->
                  <el-option v-for="item in Area" :key="item.Code" :label="item.Name" :value="item.Code"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="转出设置">
              <el-select v-model="doubleturnOutTypes" multiple placeholder="请选择筛选条件">
                <el-option label="请选择筛选条件" @click.native="clearTurnout" value=""></el-option>
                <el-option v-for="item in transferOutOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="转入设置">
              <el-select v-model="doubleturnInValue" multiple placeholder="请选择筛选条件">
                <el-option label="请选择筛选条件" @click.native="clearTurnin" value=""></el-option>
                <el-option v-for="item in transferInOptions" :key="item.key" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="医院名称">
              <el-input v-model="params.hospitalName" placeholder="输入医院名称"></el-input>
              <!-- <el-select v-model="params.hospitalIds" value-key="Id" clearable filterable placeholder="选择医院名称">
                <el-option v-for="item in Hospital" :key="item.Id" :label="item.HospitalName" :value="item"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-button type="primary" @click="requestTransferHospList">查询</el-button>
            <el-button @click="clearOptions">清空</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" stripe border class="margintop20">
        <el-table-column type="index" label="编号" width="80px"></el-table-column>
        <el-table-column prop="TransHospitalName" label="医院名称" :min-width="isCommunity ? '25%' : '15%'"></el-table-column>
        <el-table-column label="转出设置" min-width="40%">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.IsAppointmentTransOut" label="门诊转诊" :disabled="scope.row.disabled" @change="saveTransferHospList"></el-checkbox>
            <el-checkbox v-model="scope.row.IsCheckTransferOut" label="检查检验转诊" :disabled="scope.row.disabled" @change="saveTransferHospList"></el-checkbox>
            <el-checkbox v-model="scope.row.IsHospitalizedTransferOut" label="住院转诊" :disabled="scope.row.disabled" @change="saveTransferHospList"></el-checkbox>
            <el-checkbox v-if="!isCommunity" v-model="scope.row.IsDowmTransfer" label="社区转诊" :disabled="scope.row.disabled" @change="saveTransferHospList"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="转入设置" :min-width="isCommunity ? '25%' : '35%'">
          <template slot-scope="scope">
            <el-checkbox v-if="isCommunity" v-model="scope.row.IsDowmTransfer" label="社区转诊" :disabled="scope.row.disabled" @change="saveTransferHospList"></el-checkbox>
            <el-checkbox v-if="!isCommunity" v-model="scope.row.IsAppointmentTrans" label="门诊转诊" :disabled="scope.row.disabled" @change="saveTransferHospList"></el-checkbox>
            <el-checkbox v-if="!isCommunity" v-model="scope.row.IsCheckTransfer" label="检查检验转诊" :disabled="scope.row.disabled" @change="saveTransferHospList"></el-checkbox>
            <el-checkbox v-if="!isCommunity" v-model="scope.row.IsHospitalizedTransfer" label="住院转诊" :disabled="scope.row.disabled" @change="saveTransferHospList"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="margintop20 textAlignRight"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="params.page"
        :page-sizes="[10, 20, 50]"
        :page-size="params.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { apiurl } from '../../service/api.js'
import axios from 'axios';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      doubleturnOutTypes: [],
      doubleturnInValue: [],
      params: {
        province: '',
        city: '',
        area: '',
        hospitalName: '',
        page: 1,
        rows : 10,
        hospitalIds: ''
      },
      Province: [],
      City: [],
      Area: [],
      Hospital: [],
      transferOutOptions: [
        {key: 1, value: '门诊转诊'},
        {key: 2, value: '检查检验转诊'},
        {key: 3, value: '住院转诊'},
        {key: 4, value: '社区转诊'},
      ],
      transferInOptions: [
        {key: 1, value: '门诊转诊'},
        {key: 2, value: '检查检验转诊'},
        {key: 3, value: '住院转诊'},
      ],
      tableData: [],
      totalCount: 0,
      nodataText: ''
    }
  },
  computed: {
    ...mapGetters({
      token: 'token', hosptialid: 'hosptialid'
    }),
    isCommunity() {
      return this.$route.query.type === 'sq' ? true : false
    }
  },
  mounted() {
    if(this.isCommunity) {
      this.transferOutOptions.pop()
      this.transferInOptions = [{key: 4, value: '社区转诊'}]
    }
    this.requestTransferHospList().then(() => {
      this.requestProvList()
    })
  },
  methods: {
    // 清空选项
    clearOptions() {
      this.params.province = ''
      this.params.city = ''
      this.params.area = ''
      this.params.hospitalName = ''
      this.params.turnInThospitalIdsypes = ''
      this.doubleturnOutTypes = []
      this.doubleturnInValue = []
    },
    clearTurnout() {
      this.doubleturnOutTypes = []
    },
    clearTurnin() {
      this.doubleturnInValue = []
    },
    // 请求表格-转诊医院
    requestTransferHospList() {
      return new Promise((resolve, reject) => {
        this.params.turnOutTypes = this.doubleturnOutTypes.join(',')
        this.params.turnInTypes = this.doubleturnInValue.join(',')
        axios.get(apiurl.GetTransferHospitalList, {
          params: this.params,
          headers: {
            token: this.token
          }
        }).then(response => {
          this.tableData = response.data.rows || []
          this.totalCount = response.data.total
          this.tableData.forEach(element => {
            if(element.TransHospitalId === this.hosptialid) {
              element.disabled = true
            }
          });
          resolve()
        }).catch(error => {
          console.log(error)
          resolve()
        })
      })
    },
    // 保存表格-转诊医院多选框
    saveTransferHospList() {
      return new Promise((resolve, reject) => {
        axios.post(apiurl.AddTransferHospital, {
          transferHospitalArr: JSON.stringify(this.tableData)
        }, {
          headers: {
            token: this.token
          }
        }).then(response => {
          this.requestTransferHospList()
          resolve()
        }).catch(error => {
          console.log(error)
          resolve()
        })
      })
    },
    // 筛选列表-省
    requestProvList() {
      axios.get(apiurl.GetRegions, {
        params: {
          code: ''
        }
      }).then(response => {
        this.Province = response.data.rows;
      }).catch(error => {
        console.log(error)
      });
    },
    // 筛选列表-市
    requestCityList(val) {
      val = val || -1
      axios.get(apiurl.GetRegions, {
        params: {
          code: val
        }
      }).then(response => {
        this.City = response.data.rows;
        this.params.city = ''
        // this.requestCommunityHospList()
      }).catch(error => {
        console.log(error)
      });
    },
    // 筛选列表-区
    requestAreaList(val) {
      val = val || -1
      axios.get(apiurl.GetRegions, {
        params: {
          code: val
        }
      }).then(response => {
        this.Area = response.data.rows;
        this.params.area = '';
        // this.requestCommunityHospList()
      }).catch(error => {
        console.log(error)
      });
    },
    // 筛选列表-社区医院
    requestCommunityHospList() {
      axios.get(apiurl.GetCommunityHospitalList, {
        params: {
          p_code:this.params.province,
          c_code:this.params.city,
          a_code:this.params.area
        }, headers: {
          token: this.token
        }
      }).then(response => {
        this.Hospital = response.data.rows;
        // this.params.hospitalIds = '';
      }).catch(error => {
        console.log(error)
      });
    },
    // 进入选择之前
    visibleCity(val) {
      if(val) {
        if(!this.params.province) {
          this.nodataText = '请先选择省'
        }
      }
    },
    visibleArea(val) {
      if(val) {
        if(!this.params.province) {
          this.nodataText = '请先选择省'
        } else if(!this.params.city) {
          this.nodataText = '请先选择市'
        }
      }
    },
    handleSizeChange(val) {
      this.params.rows = val
      this.requestTransferHospList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.requestTransferHospList()
    }
  }
}
</script>
