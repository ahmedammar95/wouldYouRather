import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import ProgressBar from '../utils/progress-bar.component'

class Results extends Component {
  render(){
    
    const { question } = this.props
    const authedUser = this.props.authedUser
    
    if (question === null) {
      return <p>Loading...</p>
    }
   
   const { name, avatar, optionOne, optionTwo} = question
   const optionOneVotes=optionOne.votes.length
   const optionTwoVotes=optionTwo.votes.length
   const Total=optionOne.votes.length+optionTwo.votes.length
   const optionOneVotesCount = Math.round((optionOne.votes.length / (optionOne.votes.length + optionTwo.votes.length)) *1000)/10
   const optionTwoVotesCount = Math.round((optionTwo.votes.length / (optionOne.votes.length + optionTwo.votes.length)) *1000)/10

    return(
       <div className='question'>
        <div className='question-header'>Asked by {name}</div>
        <div className='question-body'>
          <div className='question-img'>
            <img
              src={avatar}
              alt={avatar}
              className='avatar'
            />
          </div>
          <hr className='vr'></hr>
          <div className='question-info'>
            <div className='Result-font'>
              Results:
            </div>
            <div className={optionOne.votes.includes(authedUser) ? 'question-correct' : 'question-incorrect'}>
              {optionOne.votes.includes(authedUser) ? ( <button className='numberCircle'>Your Vote</button> ) : null }
              <div>Would you rather {optionOne.text}?</div>
              <ProgressBar completed={optionOneVotesCount} bgcolor='#00CC99'/>
              <div className="center" style={{color: 'black'}}>{optionOneVotes} out of {Total} votes</div>
            </div>
            <div className={optionTwo.votes.includes(authedUser) ? 'question-correct' : 'question-incorrect'}>
              {optionTwo.votes.includes(authedUser) ? ( <button className='numberCircle'>Your Vote</button> ) : null }
              <div>Would you rather {optionTwo.text}?</div>
              <ProgressBar completed={optionTwoVotesCount} bgcolor='#00CC99' />
              <div className="center" style={{color: 'black'}}>{optionTwoVotes} out of {Total} votes</div>
            </div>
        </div>
      </div>
    </div>
    )
  } 


}

function mapStateToProps ({authedUser, users, questions}, { id }) {

  const question = questions[id]
  
  return {
    users,
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(Results)