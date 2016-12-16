<template>
  <parallax class="parallax" src='/assets/books.jpg' height="300" speed="0.2">
    <div slot="loading">loading...</div>
    <div>
      <div>
        <h2 class="title-h2">{{ $t('header.info') }}</h2>
        <img class="title-logo" src="http://fountainjs.io/assets/imgs/yeoman.png"/>
        <img class="title-logo" src="http://fountainjs.io/assets/imgs/fountain.png"/>
      </div>
    </div>
    </div>
  </parallax>
</template>

<script>
export default {
  components: {
  'parallax': require('vue-parallax')
  },
  name: 'Title'
};
</script>

<style>
 .parallax {
   margin-top: 50px;
 } 
 .title-h2 {
   color: white;
 }
</style>
