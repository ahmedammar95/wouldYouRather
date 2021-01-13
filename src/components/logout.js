import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleChangeUser } from '../actions/authedUser'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class logout extends Component {
  state = {
    selectedUser:'',
  }
  handeChange = (e) => {
    console.log('e', e)
    const selectedUser = e.value
    this.setState(() => ({
      selectedUser
    }))
  }
  
  handleSubmit = (e) =>{
    e.preventDefault()
    const selectedUser = this.state.selectedUser
    const users = this.props.users
    const authedUser= Object.values(users).filter( (user) => user.name === selectedUser )
    const authedUserId= String(Object.values(authedUser).map((obj) => obj.id))
    this.props.dispatch(handleChangeUser(authedUserId))
    if (this.props.location.state !== null ){
      this.props.history.push(this.props.location.state.referrer)
    }
    else{
      this.props.history.push('/')
    }
  }

  componentDidMount(){
    const id = ''
    this.props.dispatch(handleChangeUser(id))
  }


  render(){
    const selectedUser = this.state.selectedUser
    const { users } = this.props
    const usersnames = Object.values(users).map( (user) => user.name )
    return(
      <div className='question'>
        <div className='question-header'>
          <div style={{textAlign:'center'}}>Welcome to the Would You Rather App</div>
          <div style={{fontWeight:'normal',textAlign:'center',margin:'5px'}}>please sign in to continue</div>
        </div>
        <div className='logout-body'>
          <img
              alt="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className='avatar'
              style={{marginLeft: 'auto',marginRight: 'auto',width: '99%' }}
          />
        <div style={{textAlign:'center',fontSize:'20px',fontweight:'bold',color:'#00CCFF',marginBottom:'5px'}}>sign in</div>
         <form onSubmit={this.handleSubmit}>
           <Dropdown  options={usersnames} onChange={this.handeChange} value={selectedUser} placeholder="Select user" />
           <input className='question-Submit' type="submit" value="sign in" style={{textAlign:'center', display: 'block', margin:'auto', marginTop:'5px', width:'100%'}} />
         </form>
        </div>
     </div>
    )
  }
  
}

function mapStateToProps ({authedUser, users, questions},{location}) {
  return {
    location,
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(logout)
