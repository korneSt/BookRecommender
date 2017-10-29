<template>
  <el-table
    :data="books.filter(myBooksFilter)"
    border
    style="width: 100%">
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
          Add to my books
        </el-button>
        <el-button
          size="small"
          type="success"
          @click="handleRecommend($index, row)">
          Recommend
        </el-button>
      </div>
    </el-table-column>
  </el-table>
</template>
<script>

import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'mybooklist',
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
      'getMyBooks'
    ]),
    myBooksFilter: function(book) {
        if (book.userId == 1)
          return book;
      },
  },
  mounted: function () {
    this.$nextTick(function () {
      // this.getAllBooks();
    })
  }
};
</script>
