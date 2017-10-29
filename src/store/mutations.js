import { app } from '../index.js'
import auth from '../auth'
import * as types from './mutation-types'


export const state = {
    books: [],
    myBooks: []
}

export const mutations = {
    [types.GET_ALL_BOOKS](state, books) {
        state.books = books
    },
    [types.GET_MY_BOOKS](state, books) {
        state.myBooks = books
    },
    
}

export const getters = {
     fiveBooks: state => {
      return state.books.reverse().slice(3);
    }
}


