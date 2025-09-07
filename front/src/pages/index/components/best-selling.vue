<script lang="ts" setup>
  import horizontalList from './horizontal-list.vue'
  import { TagType, type Item } from '@/types/horizontal-list.ts';
  import stellarSipsImg from '@/static/stellar-sips.png'
  import zenPalaceCuisineImg from '@/static/zen-palace-cuisine.png'
  import unknownFoodImg from '@/static/unknown-food.png'
  const dataList : Item[] = [
    {
      name: '一流的饮品和小吃',
      delivery: {
        times: 16,
        distance: 5
      },
      tag: {
        title: '特价',
        type: TagType.thumbsUp
      },
      thumb: stellarSipsImg
    },
    {
      name: '禅宫料理',
      delivery: {
        times: 16,
        distance: 5
      },
      tag: {
        title: '特价',
        type: TagType.trendingUp
      },
      thumb: zenPalaceCuisineImg
    },
    {
      name: '未知料理',
      delivery: {
        times: 16,
        distance: 5
      },
      tag: {
        title: '特价',
        type: TagType.tag
      },
      thumb: unknownFoodImg
    }
  ]
</script>

<template>
   <horizontal-list title="热卖" :dataList="dataList"></horizontal-list>
</template>

<style lang="scss" scoped>
</style>