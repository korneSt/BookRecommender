import { app } from '../index.js'
import auth from '../auth'
import * as types from './mutation-types'


export const state = {
    books: []
}

export const mutations = {
    [types.GET_ALL_BOOKS](state, books) {
        state.books = books
    },
    
}

export const getters = {

}


