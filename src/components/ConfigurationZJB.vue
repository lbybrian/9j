<template>
  <div class="config">
  	
			<el-cascader
		    v-model="addEditWorkerForm.department"
		    :options="departmentTree" :props="addWorkerPositionProps" @change="addWorkerDepartment" :show-all-levels="true">
		    <template slot-scope="{ node, data }">
		      <span>{{ data.label }}</span>
		      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
		    </template>
		  </el-cascader>
		  
  </div>
</template>

<script>
	export default {
		name: "ConfigurationZJB",
		props:['detail'],
    data() {
      return {
      	departmentTree:dict['012']['dataValue']?dict['012']['dataValue']:[]
      }
    },
    created() {
    	for(let i in this.formData.aggOutList){11111111111111111111
    		this.formData.aggOutList[i].arr=[]22222222222
    		
        // cascader 回显部门处理，只处理两级，如果多于两级需要改写成递归函数
        this.dict['012']['dataValue'].map(item => {333333333333333
        	
          if(item.value == this.formData.aggOutList[i].fieldName){4444444444444444
          	
            this.formData.aggOutList[i].arr.push(item.value)555555555555
            
          }else if(item.children && item.children.length > 0){666666666666666
          	
            for( let i in item.children){7777777777777777
            	
              if(item.children[i].value == this.formData.aggOutList[i].aggSign){8888888888888888
              	
                this.formData.aggOutList[i].arr.push(item.children[i].value)99999999999999
              }
            }
          }
        })
    	}
        
        
    	
    	//原版
//  	let departmentLable = data.department
//      let departmentArray = []
//      // cascader 回显部门处理，只处理两级，如果多于两级需要改写成递归函数
//      this.departmentTree.map(item => {
//        if(item.label == departmentLable){
//          departmentArray.push(item.id)
//        }else if(item.children && item.children.length > 0){
//          for( let i in item.children){
//            if(item.children[i].label == departmentLable){
//              departmentArray.push(item.children[i].parentId)
//              departmentArray.push(item.children[i].id)
//            }
//          }
//        }
//      })

    },
    mounted() {},
    beforeDestroy(){},
    methods: {
    	//多表单同时验证
//  	submitForm2(){
//  		let list =[]
//  		list.push(
//  			this.checkForm('formData'),
//  			this.checkForm('formData.bucketBO'),
//  			this.checkForm('formData.obj'),
//  		)
//  		Promise.all(list).then(()=>{
//  			this.checkSign=true
//    		this.$message.success('验证---通过！请点击下一步')
////  			this.$message.success('z验证---成功',this.checkSign)
////    	checkSign:false,//子表单验证标识
//  		}).catch(()=>{
////  			this.$message.error('z验证---失败',this.checkSign)
//    		this.$message.error('请填写必填项！')
//  			return false
//  		})
//  	},
    	//验证规则
    	checkForm(fm){
    		return new Promise((resolve,reject)=>{
	    		this.$refs[fm].validate(valid=>{
	    			if(valid){
	    				resolve()
	    			}else{
	    				reject()
	    			}
	    		})
    		})
    	},
//  	checkForm(fm){
//  		this.$refs[fm].validate(valid=>{
//  			if(valid){
//  				this.$message.success('z验证---成功')
//  			}else{
//  				this.$message.success('z验证---失败')
//  			}
//  		})
//  	},
    	
		  // 时间下拉
      cxTimeSelect(val) {
        if (val !== '') {
          this.diyTime = true
          this.formData.showTime=' '
          // this.formData.startTime = ''
          // this.formData.endTime = ' '
        } else {
          this.diyTime = false
        }
      },
      // 自定义事件
      cxDiyTime(val) {
        if (val !== null) {
          this.cxTime = true
          this.formData.timeRangeSign = ' '
        } else {
          this.cxTime = false
        }
      },
		  // 逻辑与下拉改变
      cxAndSelect(arr, index) {
        if (arr.length > 0) {
          if (arr[0]==='operationUserId'||arr[0]==='operationDesc'||arr[0]==='logCont') { // 二级
            this.formData.queryANDList[index].fieldName = arr[0] ? arr[0]: ''
            this.formData.queryANDList[index].relationSign = arr[1] ? arr[1] : ''
            // this.formData.queryANDList[index].targetValue =
          } else { // 三级
            this.formData.queryANDList[index].fieldName = arr[0] ? arr[0]: ''
            this.formData.queryANDList[index].relationSign = arr[1] ? arr[1] : ''
            this.formData.queryANDList[index].targetValue = arr[2] ? arr[2] : ''
          }
        } else {
          this.formData.queryANDList[index].targetValue = ''
        }
//      console.log(this.formData.queryANDList)
      },
      // 逻辑或下拉改变
      cxOrSelect(arr, index) {
        if (arr.length > 0) {
          if (arr[0]==='operationUserId'||arr[0]==='operationDesc'||arr[0]==='logCont') { // 二级
            this.formData.queryORList[index].fieldName = arr[0] ? arr[0]: ''
            this.formData.queryORList[index].relationSign = arr[1] ? arr[1] : ''
          } else { // 三级
            this.formData.queryORList[index].fieldName = arr[0] ? arr[0]: ''
            this.formData.queryORList[index].relationSign = arr[1] ? arr[1] : ''
            this.formData.queryORList[index].targetValue = arr[2] ? arr[2] : ''
          }
        } else {
          this.formData.queryORList[index].targetValue = ''
        }
//      console.log(this.formData.queryORList)
      },
      // 添加逻辑与行
      addAnd() {
        this.formData.queryANDList.push({
          fieldName: '',
          relationSign: '',
          targetValue: '',
          and: [],
        })
      },
      // 删除逻辑与行
      delAnd(row) {
        let index = this.formData.queryANDList.indexOf(row)
        if (index !== -1) {
          this.formData.queryANDList.splice(index, 1)
        }
      },
      // 逻辑与input变化必填
      andInputChange(val) {
        console.log(val)
      },
      // 逻辑或input变化必填
      orInputChange(val) {
        console.log(val)
      },
      // 添加逻辑或行
      addOr(row) {
        this.formData.queryORList.push({
          fieldName: '',
          relationSign: '',
          targetValue: '',
          or: [],
        })
      },
      // 删除逻辑或行
      delOr(row) {
        let index = this.formData.queryORList.indexOf(row)
        if (index !== -1) {
          this.formData.queryORList.splice(index, 1)
        }
      },
      // 选择分桶下拉时，设置桶别名
      selectBucket(val) {
        val !== '' ? this.formData.bucketBO.bucketName = val : this.formData.bucketBO.bucketName = ''
        if (val === 'collectTime' || val === 'operationTime') {
          this.formData.bucketBO.type = 'date'
        } else {
          this.formData.bucketBO.type = 'normal'
        }
//      this.formData.bucketBO.typ = this.formData.bucketBO.fieldName
        this.formData.bucketBO.fieldName = this.formData.bucketBO.typ
      },
      // 选择桶内聚合下拉
      selectInner(row, index) {
        if (row.arr.length > 0) {
          this.formData.bucketBO.aggregationBOList[index].fieldName = row.arr[0]
          this.formData.bucketBO.aggregationBOList[index].aggSign = row.arr[1]
          this.formData.bucketBO.aggregationBOList[index].aggName = row.arr[0] + row.arr[1] + index
        } else {
          this.formData.bucketBO.aggregationBOList[index].fieldName = ''
          this.formData.bucketBO.aggregationBOList[index].aggSign = ''
          this.formData.bucketBO.aggregationBOList[index].aggName = ''
        }
      },
      // 添加桶内行
      addInner(row) {
        this.formData.bucketBO.aggregationBOList.push({
          fieldName: '',
          aggName: '',
          aggSign: '',
          arr: [],
        })
      },
      // 删除桶内行
      delInner(row) {
        let index = this.formData.bucketBO.aggregationBOList.indexOf(row)
        if (index !== -1) {
          this.formData.bucketBO.aggregationBOList.splice(index, 1)
        }
      },
      // 选择桶外聚合下拉
      selectOuter(row, index) {
        if (row.arr.length > 0) {
          this.formData.aggOutList[index].fieldName = row.arr[0]
          this.formData.aggOutList[index].aggSign = row.arr[1]
          this.formData.aggOutList[index].aggName = row.arr[0] + row.arr[1] + index
        } else {
          this.formData.aggOutList[index].fieldName = ''
          this.formData.aggOutList[index].aggSign = ''
          this.formData.aggOutList[index].aggName = ''
        }
      },
      // 添加桶外行
      addOuter(row) {
        this.formData.aggOutList.push({
          fieldName: '',
          aggName: '',
          aggSign: '',
          arr: [],
        })
      },
      // 删除桶外行
      delOuter(row) {
        let index = this.formData.aggOutList.indexOf(row)
        if (index !== -1) {
          this.formData.aggOutList.splice(index, 1)
        }
      },
    }
	}
</script>
<style>
	.demo-form-inline >>> .el-form-item{
  	background-color: red;
  }
</style>
<style scoped>
  .box-card{
    margin-bottom: 10px;
  }
  .el-card__header{
    padding: 2px 20px;
  }
  
</style>
