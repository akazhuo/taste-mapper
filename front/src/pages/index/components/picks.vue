<script lang="ts" setup>
  import horizontalList from './horizontal-list.vue'
  import { TagType, type Item } from '@/types/horizontal-list.ts';
  import muffinImg from '@/static/muffin.png'
  import coffee2Img from '@/static/coffee2.png'
  import pizzaImg from '@/static/pizza.png'
  const dataList : Item[] = [
    {
      name: '河内松饼店',
      delivery: {
        times: 16,
        distance: 5
      },
      tag: {
        title: '特价',
        type: TagType.tag
      },
      thumb: muffinImg
    },
    {
      name: '街角咖啡店',
      delivery: {
        times: 16,
        distance: 5
      },
      tag: {
        title: '特价',
        type: TagType.truck
      },
      thumb: coffee2Img
    },
    {
      name: '披萨店',
      delivery: {
        times: 16,
        distance: 5
      },
      tag: {
        title: '特价',
        type: TagType.tag
      },
      thumb: pizzaImg
    }
  ]
</script>

<template>
   <horizontal-list title="精选" :dataList="dataList"></horizontal-list>
</template>

<style scoped></style>