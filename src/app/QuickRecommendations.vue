<template>
    <div>
    <ul id="books">
        <li v-for="book in books" :key="book.id" >
            <span v-on:click="addToRecommendationBox(book)" 
            :class="{selected: bookListForRec.indexOf(book) !== -1}"> 
                {{ book.title }}
            </span>
        </li>
    </ul>

    <ul id="selectedBooks">
        <li v-for="bookRec in bookListForRec" :key="bookRec.id" >
            <span :class="classObject"> 
                {{ bookRec.title }}
            </span>
        </li>
    </ul>
    </div>
</template>
<script>

import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'mybooklist',
  data() {

    return {
        selectedBook: {},
        bookListForRec: [],
        styleObject: {
            cursor: 'pointer'  
        }
    }
  },
  computed: {
    books () {
      return this.$store.state.books
    },
    classObject: function () {
    return {
        selected : this.bookListForRec.indexOf(this.selectedBook) !== -1
        //  cursor: 'pointer' 
        //  color: 'red'
        //active: this.isActive && !this.error,
    //'text-danger': this.error && this.error.type === 'fatal'
    }
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

    addToRecommendationBox(book) {
        if (this.bookListForRec.indexOf(book) !== -1) {
            this.bookListForRec.pop(book);
        } else {
            this.selectedBook = book;
            this.bookListForRec.push(book);
        }
        console.log(book.id);
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // this.getAllBooks();
    })
  }
};
</script>

<style>
.selected {
    cursor: pointer;
    color: red;
}
</style>
