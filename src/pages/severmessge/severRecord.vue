<template>
    <section>  
        <el-button type="primary" @click="$emit('click',1)">单发服务提醒</el-button>
        <el-button type="info" @click="groupbtn">群发服务提醒</el-button>
    </section>
</template>


<script>
  import { linkUrl } from '../../service/api.js';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'severRecordbtn',
    data() {
      return{
      }
    },
    created(){
    },
    computed: {
    ...mapGetters(['token'])
    },     
    mounted() {
    },
    
    methods: {
      groupbtn() {
        console.log(linkUrl,this.$route.query.ModelUrl)
        var param = {};
        param.method = "addTab";
        param.title = '群发服务';
        param.url = linkUrl + 'ArchivesCenter/groupServicePage?token='+this.token+'&ModelUrl='+this.$route.query.ModelUrl;
        window.parent.postMessage(JSON.stringify(param), '*');
        
        // this.$router.push({
        //   name: "GroupServicePage",
        // })
      }
    },
  }
</script>
<style lang="scss" scoped>
   
</style>