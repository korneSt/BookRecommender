import { app } from '../index.js'
import auth from '../auth'
import * as types from './mutation-types'


export const state = {
    books: {}
}

export const mutations = {
    [types.GET_USER](state, books) {
        state.books = books
    },
    
}

export const getters = {

}


