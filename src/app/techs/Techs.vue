<template>
  <div class="techs-container">
    <h2 class="techs-h2">
      Cooked with all these awesome technologies:
    </h2>
    <div class="techs">
      <tech v-for="book in books" :book="book"></tech>
    </div>
  </div>
</template>

<script>

import tech from './Tech.vue';
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Techs',
  data() {
    return {
    };
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
  created() {
    this.$nextTick(function () {
      this.getAllBooks();
    })
  },
  components: {
    tech
  }
};
</script>
