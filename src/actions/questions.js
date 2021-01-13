import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER' 
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function saveAnswer ({ authedUser, id, answer }) {
  return {
    type: SAVE_ANSWER,
    id,
    authedUser,
    answer
  }
}

export function handleSaveAnswer (info) {
  return (dispatch) => {
    dispatch(saveAnswer(info))

    return saveQuestionAnswer({
    authedUser: info.authedUser,
    qid: info.id,
    answer: info.answer,
    })
      .catch((e) => {
        console.warn('Error in handleToggleQuestion: ', e)
        alert('The was an error liking the question. Try again.')
      })
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}
