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
    <div>
        <el-button type="primary" v-on:click="getRec">Get Recommendations</el-button>
    </div>
     <ul id="recommendedBooks">
        <li v-for="b in recommendedBooks" :key="b.id" >
            <span :class="classObject"> 
                {{ b.title }}
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
        bookListForRecIds: [],
        styleObject: {
            cursor: 'pointer'  
        }
    }
  },
  computed: {
    books () {
      return this.$store.state.books;
    },
    recommendedBooks() {
        return this.$store.state.recommendedBooks;
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
      'getMyBooks',
      'getQuickRecommendation'
    ]),
    myBooksFilter: function(book) {
        if (book.userId == 1)
          return book;
      },
    getRec() {
        let request ='';

        for (var i = 0; i < this.bookListForRec.length; i++) {
            request = request + this.bookListForRec[i].id + ',';
        }
        request = request.slice(0, -1);
        console.log('r', request);
        this.getQuickRecommendation({bookIds: request});
    },
    addToRecommendationBox(book) {
                    this.selectedBook = book;

        if (this.bookListForRec.indexOf(book) !== -1) {
            console.log(book)
            // this.bookListForRec.pop(book);
            this.bookListForRec.splice(this.bookListForRec.indexOf(book),1);
            this.bookListForRecIds.splice(this.bookListForRecIds.indexOf(book.id),1);
            // this.selectedBook = {};
        } else {
            this.bookListForRec.push(book);
            this.bookListForRecIds.push(book.id);
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
