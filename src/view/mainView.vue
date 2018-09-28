<template>
  <div class="mainView">
    <side-bar></side-bar>
    <top-bar></top-bar>
    <keep-alive>
         <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    'SideBar': () => import('@/view/Components/sideBar'),
    'TopBar': () => import('@/view/Components/topNavBar')
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';

.mainView{
  ::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
    background-color:#f0f0f0;
  }
  ::-webkit-scrollbar {//滚动条的宽度
    width:5px;
    height:5px;
  }
  ::-webkit-scrollbar-thumb {//滚动条的设置
    background-color:#dddddd;
    background-clip:padding-box;
    min-height:30px;
  }
  ::-webkit-scrollbar-thumb:hover {//当鼠标浮动到滚动条上时的属性
    background-color:#bbb;
  }
}
</style>
