<template>
<div>

    <div class="course_disease" v-if="operationli.length!=0">
      <div class="course_disease_left">
        <ul v-for="(bing,index) in operationli">
            <li  @click="detailOperation(bing.Id)">
              {{bing.Title}}<div>手术开始时间：{{bing.RecordDate}}</div>
            </li>
            
        </ul>
      </div>
      <div class="course_disease_right">
        <div class="x_title">{{operationDetail.Title}}<span>手术编号：{{operationDetail.RecordNo}}</span></div>
        <div class="title">· 手术诊断</div>
        <div class="content">{{operationDetail.Diagnosis}}</div>
        <div  class="title"> · 手术过程</div>
        <div class="content">{{operationDetail.Process}}</div>
        <div  class="title"> · 手术室</div>
        <div class="content">{{operationDetail.OperationRoom}}</div>
        <div class="docname">
            手术师：<span class="docmargin">{{operationDetail.OperateDoctor}}</span>麻醉师：<span>{{operationDetail.Anesthesiologist}}</span>
        </div>
      </div>
    </div>
    <div class="textAlignCenter margintop30" v-if="operationli.length==0">
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
      detailOperation(id){
        this.$emit('clickOperation',id)
      },
    },
    
	props:['operationli','operationDetail']
}
</script>