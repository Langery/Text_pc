<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
window.onload=function(){

  //const loginInfo = sessionStorage.getItem('loginInfo');
 // debugger;
  // window.postMessage(sessionStorage.getItem('loginInfo'), "http://127.0.0.1:8080")
}

</script>

<style>
@import '../static/css/reset.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  /* margin-top: 60px; */
}
</style>
