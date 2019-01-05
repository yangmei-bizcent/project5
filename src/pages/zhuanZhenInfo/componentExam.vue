<template>
<div>

    <div class="course_disease" v-if="Inspectli.length!=0">
      <div>
        <div class="course_disease_left">
          <ul v-for="(bing,index) in Inspectli">
              <li  @click="detailExam(bing.Id)">
                {{bing.Title}}<div>检查时间：{{bing.RecordDate}}<span></span></div>
              </li>
              
          </ul>
        </div>
        <div class="course_disease_right">
          <div class="x_title">{{examDetail.Title}}<span>报告单号：{{examDetail.RecordNo}}</span></div>
          <div class="title">· 检查结果</div>
          <div class="content">{{examDetail.InspectResult}}</div>
          <div  class="title"> · 检查结论</div>
          <div class="content">{{examDetail.InspectConclusion}}</div>
          <div class="docname">
              检查医生:<span class="docmargin">{{examDetail.InspectDoctorName}}</span>审核医生：<span>{{examDetail.CheckDoctorName}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="textAlignCenter margintop30" v-if="Inspectli.length==0">
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
      detailExam(id){
        this.$emit('clickExam',id)
      },
    },
    
	props:['Inspectli','examDetail']
}
</script>