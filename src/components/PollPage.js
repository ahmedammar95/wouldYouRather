import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleSaveAnswer } from '../actions/questions'
import Results from './Results'
import { Redirect } from "react-router-dom"
class PollPage extends Component {
  state = {
    selectedOption:'',
  }

  onValueChange = (e) => {
    
    const { selectedOption } = this.state.selectedOption

    this.setState({
      selectedOption: e.target.value
    });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const  toResult = this.state
    const id = this.props.question.id
    const authedUser= this.props.authedUser
    const answer =  this.state.selectedOption === this.props.question.optionOne.text ? 'optionOne' : 'optionTwo'
    const dispatch = this.props.dispatch
    dispatch(handleSaveAnswer( { authedUser, id, answer }))
  }

  componentDidUpdate(prevProps) {
    if (this.props.question !== null && prevProps.question === null){
      this.setState(() => ({ 
        selectedOption: this.props.question.optionOne.text
      }))      
    }
  }

  render(){
    
    const { authedUser, question,isQuestionAnswered } = this.props

    if (authedUser === '' ){
      console.log('id', this.props.id)
      const currentLocation = `/questions/${this.props.id}`
      return  <Redirect to={{pathname:'/login', state: { referrer: currentLocation }}} />
    }

    if (question === null) {
      return <p>ERROR 404 Page not found</p>
    }
    const { name, avatar, optionOne, optionTwo,id} = question
    if (isQuestionAnswered){
      return (<Results id={id} />)
    }
    else {
    return(
       <div className='question'>
          <div className='question-header'>{name} asks</div>
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
              <div className='question-info'>
                Would You Rather
              </div>
              <ol>
                <form onSubmit={this.formSubmit}>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value={optionOne.text}
                        checked={this.state.selectedOption === optionOne.text}
                        onChange={this.onValueChange}
                      />
                      {optionOne.text}
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value={optionTwo.text}
                        checked={this.state.selectedOption === optionTwo.text}
                        onChange={this.onValueChange}
                      />
                      {optionTwo.text}
                    </label>
                  </div>
                  <button className="btn btn-default" style={{"backgroundColor":"#228B22","fontSize":"15px","color":"white","width":"90%"}} type="submit">
                    Submit
                  </button>
                </form>
              </ol>
          </div>
        </div>
    </div>
      )
}
  }
   
}



function mapStateToProps ({authedUser, users, questions}, props) {
  const { id } = props.match.params
  const question = questions[id]
  let isQuestionAnswered=''
    Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => Object.assign(res, { [key]: obj[key] }), {} );
  if (Object.keys(questions).length !== 0 && authedUser !=='') {
    const QuestionsAnsweredbyAuthedUser=Object.filter( questions, (question) => (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)))
    isQuestionAnswered=Object.keys(QuestionsAnsweredbyAuthedUser).includes(id)
  }
  return {
    id,
    isQuestionAnswered,
    users,
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(PollPage)