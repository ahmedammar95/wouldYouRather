import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"

class LeaderBOARD extends Component {
  render() {
    
    const authedUser = this.props.authedUser
    if (authedUser === ''){
      return  <Redirect to={{pathname:'/login', state: { referrer: '/leaderboard' }}} />
    }
    
    const  { users } = this.props
    const sortedUsers = Object.keys(users).sort((a,b) => (Object.keys(users[b].answers).length + Object.keys(users[b].questions).length) - (Object.keys(users[a].answers).length + Object.keys(users[a].questions).length)  )

    return(
      <ul className='dashboard-list'>
        { sortedUsers.map( soretdUser => Object.values(users).map( (user) => soretdUser === user.id && (
          <div className='user-body' key={user.id} style={{marginBottom:'10px'}}> 
            <div className='user-img'>
                <img
                  alt={user.avatarURL}
                  src={user.avatarURL}
                  className='avatar'
                />
            </div>
            <hr className='vr'></hr>    
            <div className='user-info'>
                <div className='.user-info'>
                  {user.name}
                  <div style={{fontWeight: 'normal', marginTop: 10}}>Answered questions <span style={{float:'right'}}>{Object.keys(user.answers).length}</span></div>
                  <h2 style={{fontWeight: 'normal', marginTop: 10,marginBottom: 0}}/>
                  <div style={{fontWeight: 'normal',marginTop: 10, marginBottom: 10}}>Created questions <span style={{float:'right'}}>{Object.keys(user.questions).length}</span>                     </div>
                </div>
            </div>
            <hr className='vr'></hr> 
            <div className='score'>
            <div className='score-header'>Score</div>
              <div className='score-body'>
                <div className='ScoreCircle'>
                <div style={{lineHeight:'32px'}}>{Object.keys(user.answers).length + Object.keys(user.questions).length}</div>
                </div>
              </div>
           </div>
          </div> 
      )))}
        </ul>
    )
  }
}

function mapStateToProps ({ users,authedUser }) {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(LeaderBOARD)