<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <title-component></title-component>
      <techs></techs>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './Header.vue';
import Title from './Title.vue';
import Techs from './techs/Techs.vue';
import Footer from './Footer.vue';

import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Book',
  components: {
    'header-component': Header,
    'title-component': Title,
    'techs': Techs,
    'footer-component': Footer
  },
  data() {
    return {
      
    }
  },
  computed: {
    books () {
      return this.$store.state.books
    }
  },
  methods: {
    ...mapActions([
      'getAllBooks'
    ])
  },
  mounted: function () {
    this.$nextTick(function () {
      // this.getAllBooks();
    })
  }
};
</script>
