import { Map, fromJS } from 'immutable'
import shortid from 'shortid'

import {
  addWordToList,
  createList,
  removeWordFromList,
  updateWordInfo,
} from './functions/listsFunctions'

import {
  createTest,
  updateTaskInput,
  summarize
} from './functions/testFunctions'

function app(state, action) {
  switch (action.type) {
    case 'ADD_WORD_TO_LIST':
      return state.set(
        'lists',
        addWordToList(state.get('lists'), action.listId, action.word)
      )
    case 'REMOVE_WORD_FROM_LIST':
      return state.set(
        'lists',
        removeWordFromList(state.get('lists'), action.listId, action.word)
      )
    case 'CREATE_LIST':
      return state.set(
        'lists',
        createList(state.get('lists'), action.options)
      )
    case 'UPDATE_WORD_INFO':
      return state.set(
        'lists',
        updateWordInfo(
          state.get('lists'),
          action.listId,
          action.wordId,
          action.newInfo
        )
      )
    case 'CREATE_TEST':
      return createTest(state, action.neededLists, action.options)
    case 'UPDATE_TASK_INPUT':
      return updateTaskInput(state, action.taskId, action.value)
    case 'NEXT_TASK':
      return state.updateIn(
        ['test', 'currentTask'],
        currentTask => currentTask + 1
      )
    case 'SUMMARIZE':
      return summarize(state)
    case 'RESET_TEST_STATE':
      return state.update('test', test => Map({ state: 'creating' }))
    default:
      return state
  }
}

export default app
