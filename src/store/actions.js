import * as types from './mutation-types';
import app from '../index.js';
import auth from '../auth';

const URL = 'http://localhost:3000/api/v1.0/';


export const getUserRecommendation = ({commit}) => {
    app.$http.get(URL + 'recommendationUser?userId='+ auth.user.id + 'numberOfResults=5').then ((response) => {
        commit(types.GET_USER_RECOMMENDATIONS, response.body);
    }, (error) => {
        console.log(error);
    })
}

export const getSettings = ({commit}) => {
    app.$http.get(URL + 'settings').then( (response) => {
        commit(types.GET_SETTINGS, response.body);
    }, (error) => {
        console.log(error);
    })
}

export const getAllBooks = ({ commit }) => {
    app.$http.get(URL + 'books').then((response) => {
    commit(types.GET_ALL_BOOKS, response.body);
    }, (response) => {
        console.log(response);
    })
}
export const getQuickRecommendation = (context, {bookIds}) => {
    console.log(bookIds);
    app.$http.get(URL + 'recommendationItem?itemIds=' + bookIds +
    '&numberOfResults=2&minimalScore=0').then((response) => {
    context.commit(types.GET_QUICK_RECOMM, response.body);
    }, (response) => {
        console.log(response);
    })
}

export const getMyBooks = ({ commit }) => {
    app.$http.get(URL + 'books/' + auth.user.id).then((response) => {
        console.log(response);
    commit(types.GET_MY_BOOKS, response.body);
    }, (response) => {
        console.log(response);
    })
}

export const addBook = (context, {book}) => {
    console.log(book);
    app.$http.post(URL + 'book', book).then( (response) => {
        console.log(response);
        context.commit(types.ADD_BOOK, response.body);
    }, (response) => {
        console.log(response);
    })
}

//BOARDS
export const addBoard = (context, {board}) => {
    app.$http.post('http://localhost:3000/boards', board).then((response) => {
        context.commit(types.ADD_BOARD, response.body.value)
        app.$store.dispatch('addActivity', { action: 'added board', element: board.board_name })
    }, (response) => {
        console.log(response)
    });
}

export const editBoard = (context, {boardData, boardName}) => {
    boardData.board_name = boardName
    app.$http.put('http://localhost:3000/boards/' + boardData.id, boardData).then((response) => {
        context.commit(types.EDIT_BOARD, { boardData, boardName })
        app.$store.dispatch('addActivity', { action: 'edited list', element: boardName })

    }, (response) => {
        console.log(response)
    });
}

export const delBoard = (context, {board}) => {
    app.$http.delete('http://localhost:3000/boards/' + context.state.activeBoard.id).then((response) => {
        context.commit(types.DEL_BOARD, { board })
        app.$store.dispatch('addActivity', { action: 'deleted board', element: board.board_name })

    }, (response) => {
        console.log(response)
    });
}

export const delList = (context, {list}) => {
    app.$http.delete('http://localhost:3000/lists/' + list.id).then((response) => {
        context.commit(types.DEL_LIST, { list })
        app.$store.dispatch('addActivity', { action: 'deleted list', element: list.list_name })

    }, (response) => {
        console.log(response)
    });
}

export const delCard = (context, {card}) => {
    app.$http.delete('http://localhost:3000/cards/' + card.id).then((response) => {
        context.commit(types.DEL_CARD, { card })
        app.$store.dispatch('addActivity', { action: 'deleted card', element: card.card_name })

    }, (response) => {
        console.log(response)
    });
}

export const getUsers = (context) => {
    return new Promise((resolve, reject) => {
        app.$http.get('http://localhost:3000/users/').then((response) => {
            // context.commit(types.DEL_CARD, { card })
            // app.$store.dispatch('addActivity', { action: 'deleted card', element: card.card_name })
            resolve(response.body)
        }, (response) => {
            console.log(response)
        })
    })
}

export const getLists = (context, {boardId}) => {
    return new Promise((resolve, reject) => {

        app.$http.get('http://localhost:3000/lists?boardId=' + boardId).then((response) => {
            context.commit(types.GET_LISTS, { boardId, lists: response.body }, { silent: true })
            //   this.lists = response.body;
            resolve()
        }, (response) => {
            console.log(response)
        });
    })

}

export const getCards = (context, {listId}) => {
    return new Promise((resolve, reject) => {

        app.$http.get('http://localhost:3000/cards?listId=' + listId).then((response) => {
            context.commit(types.GET_CARDS, { listId, cards: response.body }, { silent: true })
            //   this.lists = response.body;

            for (let i = 0; i < response.body.length; i++) {
                app.$store.dispatch('getFiles', { cardId: response.body[i].id })

                app.$store.dispatch('getLabels', { cardId: response.body[i].id })
                app.$store.dispatch('getComments', { cardId: response.body[i].id })
                // .then((cardLabels) => {
                //     console.log('cardlabels', cardLabels)
                //     context.commit(types.GET_LABELS, { cardId: response.body[i].id, labels: cardLabels })
                // })
            }
            resolve()

        }, (response) => {
            console.log(response)
        });
    })
}


export const getLabelColor = (context, {colorId}) => {
    return new Promise((resolve, reject) => {
        app.$http.get('http://localhost:3000/globalLabels?id=' + colorId).then((response) => {
            // context.commit(types.GET_LABEL_COLORS, { labels: response.body })
            console.log('color', response.body)
            resolve({ responseColor: response })

        }, (response) => {
            console.log(response)
        })
    })
}

export const getLabels = (context, {cardId}) => {
    return new Promise((resolve, reject) => {
        app.$http.get('http://localhost:3000/labels?cardId=' + cardId).then((response) => {
            context.commit(types.GET_LABELS, { cardId, labels: response.body })
            resolve()

        }, (response) => {
            console.log(response)
        })
    })
}

export const getFiles = (context, {cardId}) => {
    return new Promise((resolve, reject) => {
        app.$http.get('http://localhost:3000/files?cardId=' + cardId).then((response) => {
            context.commit(types.GET_FILES, { cardId, files: response.body })
            resolve()

        }, (response) => {
            console.log(response)
        })
    })
}

export const getGlobalLabels = (context) => {
    return new Promise((resolve, reject) => {
        app.$http.get('http://localhost:3000/globalLabels').then((response) => {
            context.commit(types.GET_GLOBAL_LABELS, { labels: response.body })
            resolve()

        }, (response) => {
            console.log(response)
        })
    })
}

// export const getLabels = (context, {cardId}) => {
//     let promises = []

//     // return new Promise((resolve, reject) => {
//         app.$http.get('http://localhost:3000/labels?cardId=' + cardId).then((response) => {
//             console.log('label', response)
//             if (response.body.length > 0) {
//                 response.body.forEach(function (card) {
//                     promises.push(new Promise((resolve, reject) => {

//                         app.$store.dispatch('getLabelColor', {colorId: card.colorId}).then((responseColor) => {
//                             console.log('color', responseColor);
//                             card.colorHex = responseColor.body[0].color
//                             resolve(card)
//                         })
//                     }))
//                 })
//             }
//             console.log('promises', promises)
//             return Promise.all(promises)

//             // context.commit(types.GET_LABEL, { labels: response.body })

//         }, (response) => {
//             console.log(response)
//         })
//     // })

// }

export const getComps = (context) => {
    app.$store.dispatch('getGlobalLabels')
    app.$store.dispatch('getBoards').then(() => {
        for (let i = 0; i < app.$store.state.comp.length; i++) {
            app.$store.dispatch('getActivity', { boardId: app.$store.state.comp[i].id })
            app.$store.dispatch('getLists', { boardId: app.$store.state.comp[i].id }).then(() => {
                for (let j = 0; j < app.$store.state.lists[app.$store.state.comp[i].id].length; j++) {
                    app.$store.dispatch('getCards', { listId: (app.$store.state.lists[app.$store.state.comp[i].id])[j].id })
                }
            })
        }
    })
}

export const getBoards = (context) => {
    return new Promise((resolve, reject) => {

        app.$http.get('http://localhost:3000/boards?userId=' + auth.user.id).then((response) => {
            app.$store.dispatch('setSharedBoards').then(() => {
                app.$store.dispatch('getSharedBoards').then((boards) => {

                    response.body.push.apply(response.body, boards)
                    context.commit(types.GET_BOARDS, response.body, { silent: true })

                    resolve()
                })
            }, (response) => {
                console.log(response)
            });
        })
    })
}

export const setSharedBoards = (context) => {
    return new Promise((resolve, reject) => {
        app.$http.get('http://localhost:3000/users?id=' + auth.user.id).then((response) => {
            context.commit(types.SET_SHARED_BOARDS, response.body[0].sharedBoards, { silent: true })
            resolve()
        }, (response) => {
            console.log(response)
        });
    })
}

export const getSharedBoards = (context) => {
    let boards = []
    let promises = []

    for (let i = 0; i < app.$store.state.sharedBoards.length; i++) {
        promises.push(new Promise((resolve, reject) => {
            app.$http.get('http://localhost:3000/boards?id=' + app.$store.state.sharedBoards[i]).
                then((response) => {
                    resolve(response.body[0])
                }, (response) => {
                    console.log(response)
                })
        })
        )
    }

    return Promise.all(promises)
}

export const shareBoard = (context, {board, user}) => {
    user.sharedBoards.push(board.id)
    app.$http.put('http://localhost:3000/users/' + user.id, user).then((response) => {
        // context.commit(types.FAV_LIST, { list })
        app.$store.dispatch('addActivity', { action: 'shared board', element: board.board_name })
    }, (response) => {
        console.log(response)
    });
}

export const toggleFavList = (context, {list}) => {
    app.$http.put('http://localhost:3000/lists/' + list.id, list).then((response) => {
        context.commit(types.FAV_LIST, { list })
        app.$store.dispatch('addActivity', { action: 'favourited card', element: list.list_name })

    }, (response) => {
        console.log(response)
    });
}
export const editList = (context, {list, name, pos}) => {
    app.$http.put('http://localhost:3000/lists/' + list.id, { boardId: list.boardId, list_name: name, pos: pos }).then((response) => {
        context.commit(types.EDIT_LIST, { list, name, pos })
        app.$store.dispatch('addActivity', { action: 'edited list', element: list.list_name })
    }, (response) => {
        console.log(response)
    });
}

// export const addLabel = (context, {card, label}) => {
//     let newCard = card
//     let newLabel
//     if (card.labels !== undefined) {
//         newLabel = card.labels.toString().concat(label.id)
//     } else {
//         newLabel = label.id.toString()
//     }
//     newCard.labels = newLabel
//     console.log(newCard.labels)
//     app.$http.patch('http://localhost:3000/cards/' + card.id, { labels: newLabel }).then((response) => {
//         context.commit(types.ADD_LABEL, { card, label: newLabel })
//         app.$store.dispatch('addActivity', { action: 'Add Label', element: card.card_name })

//     }, (response) => {
//         console.log(response)
//     });
// }

export const addLabel = (context, {label}) => {
    app.$http.post('http://localhost:3000/labels', label).then((response) => {
        context.commit(types.ADD_LABEL, { label: response.body })
        app.$store.dispatch('addActivity', { action: 'Add Label', element: label.name })

    }, (response) => {
        console.log(response)
    });
}

export const addFile = (context, {file}) => {
    app.$http.post('http://localhost:3000/files', file).then((response) => {
        context.commit(types.ADD_FILE, { file: file })
        // app.$store.dispatch('addActivity', { action: 'Add Label', element: label.name })

    }, (response) => {
        console.log(response)
    });
}
// export const addComment = (context, {comment}) => {
//     app.$http.post('http://localhost:3000/comments', comment).then((response) => {
//         context.commit(types.ADD_COMMENT, { comment: response.body })
//         app.$store.dispatch('addActivity', { action: 'added comment', element: comment.text })
export const delLabel = (context, {label}) => {
    console.log({label});
    app.$http.delete('http://localhost:3000/labels/' + label.id).then((response) => {
        context.commit(types.DEL_LABEL, {label: label })
        app.$store.dispatch('addActivity', { action: 'remove label', element: label.name })

    }, (response) => {
        console.log(response)
    });
}

export const editCard = (context, {card, name, pos, desc}) => {
    let newCard = card
    newCard.card_name = name
    newCard.pos = pos
    newCard.desc = desc
    app.$http.patch('http://localhost:3000/cards/' + card.id, { listId: card.listId, card_name: name, pos: pos, desc: desc }).then((response) => {
        context.commit(types.EDIT_CARD, { card, name, pos, desc })
        app.$store.dispatch('addActivity', { action: 'edited card', element: card.card_name })

    }, (response) => {
        console.log(response)
    });
}

export const archiveList = (context, {list}) => {
    context.commit(types.ARCHIVE_LIST, { list })
    app.$http.put('http://localhost:3000/lists/' + list.id, list).then((response) => {
        app.$store.dispatch('addActivity', { action: 'archived list', element: list.list_name })

    }, (response) => {
        console.log(response)
    });
}

export const archiveCard = (context, {card}) => {
    context.commit(types.ARCHIVE_CARD, { card })
    app.$http.put('http://localhost:3000/cards/' + card.id, card).then((response) => {
        app.$store.dispatch('addActivity', { action: 'archived card', element: card.card_name })

    }, (response) => {
        console.log(response)
    });
}

export const addList = (context, {list}) => {
    app.$http.post('http://localhost:3000/lists', list).then((response) => {
        app.$store.dispatch('addActivity', { action: 'added list', element: list.list_name })

        context.commit(types.ADD_LIST, { list: response.body })
    }, (response) => {
        console.log(response)
    });
}

export const addCard = (context, {card}) => {
    app.$http.post('http://localhost:3000/cards', card).then((response) => {
        app.$store.dispatch('addActivity', { action: 'added card', element: card.card_name })
        context.commit(types.ADD_CARD, { card: response.body })
    }, (response) => {
        console.log(response)
    });
}

export const favBoard = (context, {board}) => {
    context.commit(types.FAV_BOARD, { board })
    app.$store.dispatch('addActivity', { action: 'favourited', element: board.board_name })

    app.$http.put('http://localhost:3000/boards/' + board.id, board).then((response) => {
        console.log(response.body)
    }, (response) => {
        console.log(response)
    });
}

export const addActivity = (context, {action, element}) => {
    let newLog = auth.user.username + " " + action + " \"" + element + "\"";

    let newActivity = {
        "boardId": app.$store.state.activeBoard.id,
        "date": new Date(),
        "log": newLog
    }

    app.$http.post('http://localhost:3000/activities', newActivity).then((response) => {
        context.commit(types.ADD_ACTIVITY, { newActivity })
    }, (response) => {
        console.log(response)
    });
}

export const getActivity = (context, {boardId}) => {
    return new Promise((resolve, reject) => {
        app.$http.get('http://localhost:3000/activities?boardId=' + boardId).then((response) => {
            context.commit(types.GET_ACTIVITY, { boardId, activities: response.body })
            resolve()

        }, (response) => {
            console.log(response)
        })
    })
}

export const getComments = (context, {cardId}) => {
    return new Promise((resolve, reject) => {
        app.$http.get('http://localhost:3000/comments?cardId=' + cardId).then((response) => {
            context.commit(types.GET_COMMENTS, { cardId, comments: response.body })
            resolve()

        }, (response) => {
            console.log(response)
        })
    })
}


export const addComment = (context, {comment}) => {
    app.$http.post('http://localhost:3000/comments', comment).then((response) => {
        context.commit(types.ADD_COMMENT, { comment: response.body })
        app.$store.dispatch('addActivity', { action: 'added comment', element: comment.text })

    }, (response) => {
        console.log(response)
    });
}

