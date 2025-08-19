<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { codeLogin } from '@/composables/user'


onLaunch(() => {
  console.log("App Launch");
  // #ifdef MP
  uni.checkSession({
    success() {
      console.log('check session success')
      
      const accessToken = uni.getStorageSync('accessToken')
      if ( !accessToken) {
        codeLogin()
      }
    },
    fail() {
      console.log('check session fail')
      codeLogin()
    }
  })
  // #endif
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<script lang="ts">
  export default {
    globalData: {
      imgUrl: 'http://localhost:3000'
    }
  }
</script>
<style></style>
