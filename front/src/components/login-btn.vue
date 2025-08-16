<script lang="ts" setup>
  import { checkLoginSession, codeLogin } from '@/composables/user'
 const login = () => {
   checkLoginSession().then(() =>{
     console.log('resolve')
   }).catch(() => {
     console.log('reject')
   })
 }
</script>

<template>
  <button @click="login">
    <slot></slot>
  </button>
</template>

<style>

</style>