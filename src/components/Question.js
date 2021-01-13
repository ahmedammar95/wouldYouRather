import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import {  withRouter } from 'react-router-dom'

class Question extends Component {
  
  handleViewPoll = (e,Answered,id) => {
    
    e.preventDefault()

      this.props.history.push({pathname:`/questions/${id}`, id:{id} })

  }
  render(){
    const Answered = this.props.Answered
    const { question } = this.props
    
    if (question === null) {
      return <p>This Tweet doesnt exist</p>
    }
    const { name, avatar,  optionOne,  id} = question
    return(
      <div className='question'>
        <div className='question-header'>{name} asks</div>
        <div className='question-body'>
        <div className='question-img'>
            <img
              alt={avatar}
              src={avatar}
              className='avatar'
            />
       </div>
       <hr className='vr'></hr>
          <div className='question-info'>
            <div className='question-info'>
              Would you rather
            </div>
            <div className='question-text'>
              ....{optionOne.text.substring(0, 18)}....
            </div>
            <button className='question-Poll' onClick={ (e) => this.handleViewPoll(e,Answered,id)}>View Poll</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))