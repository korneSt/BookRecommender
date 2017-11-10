<template>
  <div id="mybooklist">
  
    <!--<books-component></books-component>-->

    <el-table
      :data="myBooks"
      border
      size="medium"
      style="width: 50%">
      <el-table-column
        inline-template
        label="Title"
        width="180">
        <div>
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ row.title }}</span>
        </div>
      </el-table-column>
      <el-table-column
        prop="author"
        label="Author"
        width="180">
      </el-table-column>
      <el-table-column
        :context="_self"
        inline-template
        label="Operations">
        <div>
          <el-button
            size="small"
            @click="handleAdd($index, row)">
            Edit
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleRecommend($index, row)">
            Remove
          </el-button>
        </div>
      </el-table-column>
    </el-table>


      <bookdialog v-on:hide="hideDialog()" :sel-book="selBook"
      :disp.sync="v"></bookdialog>
  </div>

</template>
<script>

import { mapActions, mapMutations } from 'vuex'
import Books from './Books.vue';

export default {
  name: 'mybooklist',
  components: {
    'books-component': Books
  },
  data() {
    return {
      selBook: {},
      v: false
    }
  },
  computed: {
    books () {
      return this.$store.state.books;
    },
    myBooks() {
      return this.$store.state.myBooks;
    }
  },
  methods: {
    ...mapActions([
      'getMyBooks'
    ]),
    myBooksFilter(book) {
      if (book.userId == 1)
        return book;
    },
    handleAdd($index, row) {
      this.selBook = this.myBooks[$index]; 
      this.v = true;
      console.log($index, row);
    },
    hideDialog() {
      this.v = false;
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getMyBooks();
    })
  }
};
</script>

<style>
#mybooklist {
  padding-left: 1em;
}
</style>