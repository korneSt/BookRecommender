<template>
  <parallax class="parallax" src="/assets/books.jpg" :height="300" :speed="0.2">
  <div class="techs-container">
    <el-row>
      <el-col :span="2" v-for="(b, index) in booksAll" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img src="/assets/book_diuna.jpg" class="image">
          <div style="padding: 14px;">
            <span>{{ b.name }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">Operating button</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  </parallax>

</template>

<script>

import book from './Book.vue';

import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Books',
  data() {
    return {
    };
  },
  computed: {
    booksAll () {
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
    book,
    'parallax': require('vue-parallax')

  }
};
</script>

<style>

  .parallax {
    margin-top: 50px;
  } 

  .el-row {
    overflow: scroll;
    display: flex;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
