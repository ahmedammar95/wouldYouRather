import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value

    this.setState(() => ({
      optionOne
    }))
  }

  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value

    this.setState(() => ({
      optionTwo
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOne,optionTwo))

    this.setState(() => ({
      optionOne:'',
      optionTwo:'',
      toHome: true,
    }))
  }

  render(){
    
    const {optionOne,optionTwo,toHome } = this.state
    if(toHome === true) {
      return <Redirect to='/' />
    }

    const authedUser = this.props.authedUser
    if (authedUser === ''){
      return  <Redirect to={{pathname:'/login', state: { referrer: '/add' }}} />
    }

    return(
      <div className='question'>
        <div className='NewQuestion-header'>Create New Question</div>
        <div className='NewQuestion-body'>
          <div style={{fontWeight:'normal', margin:'10px'}}>Complete the question:</div>
          <div style={{fontWeight:'bold', margin:'10px'}}> Would you rather ...</div>
          <form className='new-Question' onSubmit={this.handleSubmit}>
            <textarea
              placeholder="Enter Option One Text Here"
              value={optionOne}
              onChange={this.handleChangeOptionOne}
              className='textarea'
            />
            <h2><span>OR</span></h2>
            <textarea
              placeholder="Enter Option Two Text Here"
              value={optionTwo}
              onChange={this.handleChangeOptionTwo}
              className='textarea'
            />
            <button
              className='question-Submit'
              type='submit'
              disabled={optionTwo === '' || optionOne === ''}>
                Submit
            </button>
          </form>
        </div>
      </div>  
    )
  }
  
}

function mapStateToProps ({ authedUser }) {  
  return {
    authedUser,
}
}

export default connect(mapStateToProps)(NewQuestion)