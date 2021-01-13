import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import PollPage from './PollPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Nav from './Nav'
import logout from './logout'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div className="App">
       <Router>
        <Fragment>
          <LoadingBar />
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/login' component={logout} />
                  <Route path='/' exact component={Home} />
                  <Route path='/leaderboard' component={LeaderBoard} />
                  <Route path='/add' component={NewQuestion} />
                  <Route path='/questions/:id'  component={PollPage} />
                </div>}
        </Fragment>
      </Router>
      </div>
    );
  }
}

export default connect()(App);
