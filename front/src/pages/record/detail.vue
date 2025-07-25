<template>
  <view class="record-page">
    <uni-forms :modelValue="formData" :rules="rules" ref="formRef">
      <uni-forms-item label="菜品" name="title">
        <uni-easyinput v-model="formData.title" placeholder="输入菜品"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item label="照片" name="pics">
        <uni-file-picker 
        	v-model="formData.pics" 
        	fileMediatype="image" 
        	mode="grid"
          @select="selectFile"
        	@fail="imgFail" 
        />
      </uni-forms-item>
      <uni-forms-item label="日期时间" name="date">
        <uni-datetime-picker
        				type="datetime"
        				v-model="formData.date"
        			/>
      </uni-forms-item>
      <uni-forms-item label="评价" name="comment">
        <uni-easyinput v-model="formData.comment" type="textarea" autoHeight placeholder="输入评价"></uni-easyinput>
      </uni-forms-item>
    </uni-forms>
    <view class="page-footer">
      <button @click="submit(formRef)" type="primary">提 交</button>
    </view>
    <uni-popup ref="popupRef" type="message">
    	<uni-popup-message :type="popupType" :message="popupMsg" :duration="2000"></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { poiStore } from '@/stores/poi';

  const poiStoreInst = poiStore()
  const poiDetail = poiStoreInst.poi || {}
  const formData = ref({ title: '', comment: '', pics: [], date: '', shop: poiDetail.title ||'' })
  const rules = {
    title: {
      rules: [{ required: true, errorMessage: '请填写菜品' }]
    }
  }
  const formRef = ref('')
  const popupRef = ref('')
  const popupType = ref('success')
  const popupMsg = ref('')
  
  const selectFile = (res) => {
    console.log(res)
    uni.uploadFile({
      url: 'http://localhost:3000/file/upload',
      filePath: res.tempFilePaths[0],
      name: 'file',
        success(res) {
          const parseData = JSON.parse(res.data)
          formData.value.pics.push(parseData.data.fileName)
        },
        fail(err) {
          console.log(err)
        }
    })
  }
  const imgFail = (err) => {
    console.log(err)
  }
  const submit = (formRef) => {
    formRef.validate(valid => {
      formData.value.shop = poiDetail.title
      uni.request({
        url: 'http://localhost:3000/taste/add',
        method: 'POST',
        data: formData.value,
        success(res) {
          if ( res.data.code === 200 ) {
            popupType.value = 'success'
            popupMsg.value = '添加成功'
          } else {
            popupType.value = 'warn'
            popupMsg.value = '添加失败' 
          }
          popupRef.value.open()
        },
        fail(err) {
          console.log(err)
          popupType.value = 'warn'
          popupMsg.value = '添加失败'
          popupRef.value.open()
        }
      })
    })
  }
  
  uni.setNavigationBarTitle({
    title: poiDetail.title || '口味记录'
  })
</script>

<style lang="scss" scoped>
  .record-page {
    background-color: #fff;
    padding: 20px;
    
    .page-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      padding: 20px;
    }
  }
</style>
