import { app } from '../index.js'
import auth from '../auth'
import * as types from './mutation-types'


export const state = {
    books: [],
    myBooks: [],
    recommendedBooks: [],
    addedBook: {},
    settings: {}
}

export const mutations = {
    [types.GET_ALL_BOOKS](state, books) {
        state.books = books;
    },
    [types.GET_MY_BOOKS](state, books) {
        state.myBooks = books;
    },
    [types.GET_QUICK_RECOMM](state, books) {
        state.recommendedBooks = books;
    },
    [types.ADD_BOOK](state, book) {
        state.addedBook = book;
    },
    [types.GET_SETTINGS](state, settings) {
        state.settings = settings
    }
    
}

export const getters = {
     fiveBooks: state => {
      return state.books.reverse().slice(3);
    },
    recommendedBooks: state => {
        return state.recommendedBooks;
    }
}


