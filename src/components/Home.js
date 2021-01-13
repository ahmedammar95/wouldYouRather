import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from "react-router-dom"

class Home extends Component {
  state = {
    ViewUnAnswered: true,
    ViewQuestionsIds:this.props.unansweredQuestionsIds
  }

  handleShowAnswered = (e) => {
    e.preventDefault()

    const { ViewUnAnswered } = this.state.ViewUnAnswered

    this.setState(() => ({
      ViewUnAnswered: false ,
      ViewQuestionsIds:this.props.answeredQuestionsIds
    }))
  }

  handleShowUnAnswered = (e) => {
    e.preventDefault()

    const { ViewUnAnswered } = this.state.ViewUnAnswered

    this.setState(() => ({
      ViewUnAnswered: true ,
      ViewQuestionsIds:this.props.unansweredQuestionsIds
    }))
  }

  componentDidUpdate(prevProps) {
    if (this.props.unansweredQuestionsIds !== prevProps.unansweredQuestionsIds) {
    this.setState(() => ({ 
      ViewQuestionsIds:this.props.unansweredQuestionsIds
    }))
    }
  }

  render() {
    
    const authedUser = this.props.authedUser
    if (authedUser === ''){
        return  <Redirect to={{pathname:'/login', state: { referrer: '/' }}} />
    }

    return (
      <div>
        <div className='homeselect'>
         <div className={this.state.ViewUnAnswered ? 'homeselectoptionselected' : 'homeselectoption'} onClick={this.handleShowUnAnswered}>unanswered Questions</div>
         <div className={this.state.ViewUnAnswered ? 'homeselectoption' : 'homeselectoptionselected'}  onClick={this.handleShowAnswered}>Answered Questions</div>
        </div>
        <ul className='container'>
          {this.state.ViewQuestionsIds.map((id) => (
            <Question key={id} id={id}  Answered={!(this.state.ViewUnAnswered)}/>
          ))}
        </ul>
      </div>
    )
  }
}



function mapStateToProps ({ questions,authedUser }) {
    Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => Object.assign(res, { [key]: obj[key] }), {} );
    const answeredQuestions= Object.filter( questions, (question) => (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)))
    const unansweredQuestions= Object.filter( questions, (question) => !(question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)))
    
  return {
    authedUser,
    questions,
    answeredQuestionsIds: Object.keys(answeredQuestions)
      .sort((a,b) => answeredQuestions[b].timestamp - answeredQuestions[a].timestamp),
    unansweredQuestionsIds: Object.keys(unansweredQuestions)
      .sort((a,b) => unansweredQuestions[b].timestamp - unansweredQuestions[a].timestamp),
    loading: answeredQuestions===null
  }
}

export default connect(mapStateToProps)(Home)