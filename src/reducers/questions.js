import { RECEIVE_QUESTIONS,SAVE_ANSWER,ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
      case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
      
      case SAVE_ANSWER:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.answer]: {
            ...state[action.id][action.answer],
            votes: state[action.id][action.answer].votes.concat([action.authedUser])
          }
        },
      }
    case ADD_QUESTION:
      console.log('action:', action)
      return{
        ...state,
        [action.question.id]: action.question
      }
    default :
      return state
  }
}