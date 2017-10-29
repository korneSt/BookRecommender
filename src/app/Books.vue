<template>
<div>
  <parallax class="parallax" src="/assets/books.jpg" :height="300" :speed="0.2">
  <div class="techs-container">
      <div class="new-books" v-for="(b, index) in booksAll"
        @click="dialogBookVisible = true; selBook = b">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="b.cover" class="image">
          <div style="padding: 14px;">
            <span>{{ b.title }}</span>
          </div>
        </el-card>
      </div>
  </div>
  </parallax>

<el-dialog :title="selBook && selBook.title" v-model="dialogBookVisible">
<el-row :gutter="20">
  <el-col :span="16">
  <div>Recommendations</div>
  </br>
  <el-table
    :data="booksAll.slice(5)"
    border
    style="width: 100%">
    <el-table-column
      inline-template
      label="Title">
      <div>
        <span style="margin-left: 10px">{{ row.title }}</span>
      </div>
    </el-table-column>
    <el-table-column
      prop="author"
      label="Author">
    </el-table-column>
    </el-table>
  </el-col>
  <el-col :span="8"><div>
    <img :src="selBook && selBook.cover" class="image">
    </br>
    <span><b>{{selBook && selBook.author}}</b></span>
  </div></el-col>
</el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogBookVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogBookVisible = false">Confirm</el-button>
  </span>
</el-dialog>

</div>

</template>

<script>

import book from './Book.vue';

import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Books',
  data() {
    return {
      dialogBookVisible: false,
      selBook: null
    };
  },
  computed: {
    booksAll () {
      // return this.$store.state.books
      return this.$store.getters.fiveBooks
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
    width: 100%;
  }
  .new-books {
    margin: 20px;
  }

  .parallax {
    margin-top: 50px;
  } 

  .el-card {
    height: 250px;
  }

  .techs-container {
    margin: 0!important;
    display: flex;
    /*width: 50%;*/

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
    /*width: 100%;*/
    width: 150px;
    height: 200px;
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
