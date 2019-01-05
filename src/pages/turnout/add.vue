<template>
	<div class="ts-content wrapper-steps clearfix newcss">
	<router-view></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},mounted(){
            this.$router.push("/turnout/add/addtransfer")

			
		}

	}
</script>