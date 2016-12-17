<template>
  <parallax class="parallax" src="/assets/books.jpg" :height="300" :speed="0.2">
    <div slot="loading">loading...</div>
    <div>
      <div>
         <books></books>
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
