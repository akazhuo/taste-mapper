<template>
  <div class="index-component category">
    <div class="header">
      <div class="title">美食分类</div>
      <div class="browser">
        <span>更多</span>
        <img class="chevron-right" src="@/static/chevron-right.svg" alt="" />
      </div>
    </div>
    <view class="body">
      <div class="cate-list">
        <div class="cate-item">
          <img class="img" src="@/static/breakfast.svg" alt="" />
          <div class="text">早餐</div>
        </div>
        <div class="cate-item">
          <img class="img" src="@/static/hamburger.svg" alt="" />
          <div class="text">汉堡包</div>
        </div>
        <div class="cate-item">
          <img class="img" src="@/static/pizza.svg" alt="" />
          <div class="text">披萨</div>
        </div>
        <div class="cate-item">
          <img class="img" src="@/static/coffee.png" alt="" />
          <div class="text">咖啡</div>
        </div>
      </div>
    </view>
  </div>
</template>

<script setup>
  
</script>

<style lang="scss" scoped>
  @use '@/styles/colors.scss';
.category {
  padding-bottom: 16px;
  
  .cate-list {
    display: grid;
    margin-top: 16px;
    grid-template-columns: repeat(4, 1fr);
    
    .cate-item {
      text-align: center;
      
      .img {
        height: 40px;
        width: 40px;
      }
      
      .text {
        color: colors.$Gray-90;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }
}
</style>