<template>
<div>

    <div class="course_disease" v-if="checkli.length!=0">
      <div class="course_disease_left">
        <ul>
            <li  @click="detailCheck(bing)"  v-for="(bing,index) in checkli">
              {{bing.Title}}<div>检验时间：{{bing.RecordDate}}</div>
            </li>
            
        </ul>
      </div>
      <div class="course_disease_right">
        <div class="x_title">{{checkTitle.Title}}<span>检验单号：{{checkTitle.RecordNo}}</span></div>
        <el-table :data="checkDetail" stripe style="width: 100%">
          <el-table-column  prop="LaboratoryProject"  label="项目"  width="180">

          </el-table-column>
          <el-table-column prop="LaboratoryResult" label="检验结果" width="180">
          
          </el-table-column>
          <el-table-column prop="LaboratoryUnit" label="单位">
          
          </el-table-column>
          
          <el-table-column label="参考范围" >
								<template slot-scope="scope">{{scope.row.ReferenceRangeLow}}-{{scope.row.ReferenceRangeHigh}}</template>
					</el-table-column>
          
          <el-table-column  prop="LaboratoryState" label="状态">
          
          </el-table-column>
        </el-table>
        <div class="docname">
            检验医生：<span class="docmargin">{{checkTitle.InspectDoctorName}}</span>审核医生：<span>{{checkTitle.CheckDoctorName}}</span>
        </div>
      </div>
    </div>
    <div class="textAlignCenter margintop30" v-if="checkli.length==0">
        <img src="../../assets/img/nodata.png" alt="">
        <p>暂无数据</p>
    </div>
</div>
</template>
<script>
export default {
    data() {
      return {
        
      }
    },
    methods: {
      detailCheck(bing){
        this.$emit('clickCheck',bing)
      },
    },
    
	props:['checkli','checkDetail','checkTitle']
}
</script>