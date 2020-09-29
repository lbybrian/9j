<template>
  <div class="auditResult">
    <el-page-header @back="goBack" content="审计结果"></el-page-header>
  </div>
</template>

<script>
	export default {
		name: "AuditResult",
    data() {
      return {
        id: '',
        params: {}
      }
    },
    created() {
      this.id = this.$route.query.id
    },
    mounted() {},
    methods: {
      goBack() {
        this.$router.push({
          path: '/rule'
        })
      },
    }
	}
</script>

<style scoped>
  .auditResult{
    padding: 20px;
    height: 100%;
    overflow-y: auto;
  }
  .auditResult::-webkit-scrollbar {display: none;}
  .auditResult { -ms-overflow-style: none; }
  .auditResult { overflow: -moz-scrollbars-none; }
  .center{
    text-align: center;
  }
</style>
