<template>
  <div class="tech">
    <img class="tech-logo" v-bind:src="book.logo"/>
    <h3 class="tech-h3">
      {{ book.title }}
    </h3>
    <p>{{ book.text1 }}</p>
    <p>{{ book.text2 }}</p>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: ['book']
};
</script>
