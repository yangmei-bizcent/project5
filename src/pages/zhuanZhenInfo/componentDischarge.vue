<template>
<div  >
      <div class="leave_hospital  clearfix" v-if="discharge">
          <div class="custom_width clearfix">
            <label class="cus_label">住院号</label><div class="cus_content">{{discharge.HospitalNo}}</div>
          </div>
          <div class="custom_width clearfix">
            <label class="cus_label">科室名称</label><div class="cus_content">{{discharge.SectionName}}</div>
          </div>
          <div class="custom_width clearfix">
            <label class="cus_label">入院日期</label><div class="cus_content">{{discharge.HospitalizedInDate}}</div>
          </div>
          <div class="custom_width clearfix">
            <label class="cus_label">出院日期</label><div class="cus_content">{{discharge.HospitalizedOutDate}}</div>
          </div>
          <div class="custom_width2 clearfix">
            <label class="cus_label">入院诊断</label><div class="cus_content">
            {{discharge.HospitalizedInDiagnosis}}</div>
          </div>
          <div class="custom_width2 clearfix">
            <label class="cus_label">出院诊断</label><div class="cus_content">{{discharge.HospitalizedOutDiagnosis}}</div>
        </div>
        <div class="custom_width2 clearfix">
          <label class="cus_label">入院情况</label><div class="cus_content">{{discharge.HospitalizedInSituation}}</div>
          </div>
            <div class="custom_width2 clearfix">
          <label class="cus_label">院内检查</label><div class="cus_content">{{discharge.HospitalizedInInspect}}</div>
          </div>
            <div class="custom_width2 clearfix">
          <label class="cus_label">治疗过程</label><div class="cus_content">{{discharge.TreatmentProcess}}</div>
          </div>
            <div class="custom_width2 clearfix">
          <label class="cus_label">出院情况</label><div class="cus_content">{{discharge.DischargeSituation}}</div>
          </div>
            <div class="custom_width2 clearfix">
          <label class="cus_label">出院医嘱</label><div class="cus_content">{{discharge.DischargeAdvice}}</div>
          </div>
            <div class="custom_width2 clearfix">
          <label class="cus_label">出院去向</label><div class="cus_content">{{discharge.DischargeWhere}}</div>
          </div>
            <div class="custom_width2 clearfix">
          <label class="cus_label">主任医师</label><div class="cus_content">{{discharge.DirectorDoctor}}</div>
          </div>
            <div class="custom_width2 clearfix">
          <label class="cus_label">主治医师</label><div class="cus_content">{{discharge.MajorDoctor}}</div>
          </div>
            <div class="custom_width2 clearfix">
          <label class="cus_label">住院医师</label><div class="cus_content">{{discharge.HospitalDoctor}}</div>
          </div>
          </div>
          <div class="textAlignCenter margintop30" v-if="discharge==null">
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
      
    },
    
	props:['discharge']
}
</script>