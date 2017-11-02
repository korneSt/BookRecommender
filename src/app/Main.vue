<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <books-component></books-component>
      <br><br><br>
      <router-view></router-view>
      <br><br><br>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './Header.vue';
import Title from './Title.vue';
import Books from './Books.vue';
import Footer from './Footer.vue';
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Main',
  components: {
    'header-component': Header,
    'title-component': Title,
    'books-component': Books,
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
