<template>
  <el-table
    :data="books"
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
          @click="handleGetRecommendations($index, row)">
          Get book recommendations
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
  name: 'bookList',
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
    ]),
    handleRecommend(index, row) {
      console.log(index, row);
    },
    handleGetRecommendations(index, row) {
      console.log(index, row);
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // this.getAllBooks();
    })
  }
};
</script>
