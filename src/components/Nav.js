import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
  render() {
    const { authedUser,users } = this.props
    const myUser= Object.values(users).filter( (user) => user.id === authedUser )
    const authedUsername= String(Object.values(myUser).map((obj) => obj.name))
    const authedUseravatar= String(Object.values(myUser).map((obj) => obj.avatarURL))
    return (
      <nav className='nav'>
        <ul>
          <li style={{marginTop:'10px'}}>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li style={{marginTop:'10px'}}>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li style={{marginTop:'10px'}}>
            <NavLink to='/leaderboard' activeClassName='active'>
              LeaderBoard
            </NavLink>
          </li >
            {this.props.authedUser === '' ? null :
               <li className='noHover' style={{marginLeft:'400px',marginTop:'10px'}} >
                 Hello, {authedUsername}
              </li>
            }
            {this.props.authedUser === '' ? null :
            <img
              alt={authedUseravatar}
              src={authedUseravatar}
              className='avatar'
              style={{width: '40px',height: '40px'}}
            />
            }
            {this.props.authedUser === '' ? null :
              <li style={{marginTop:'10px'}}>
                <NavLink to='/login' activeClassName='active'>
                  logout
                </NavLink>
              </li>
            }
        </ul>
      <h2 className='Navh2'  />
      </nav>
    )
  }
}

function mapStateToProps ({authedUser, users}) {

  return{
    authedUser,
    users,
  }
}

export default connect(mapStateToProps)(Nav);