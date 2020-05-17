import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Nav from './Nav'

export default function App () {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authedUser === null)

  React.useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <Router>
      <React.Fragment>
        <LoadingBar />
        <div className='container'>
          <Nav />
          {loading === true
            ? null
            : <div>
                <Route path='/' exact>
                  <Dashboard />
                </Route>
                <Route path='/tweet/:id'>
                  <TweetPage />
                </Route>
                <Route path='/new'>
                  <NewTweet />
                </Route>
              </div>}
        </div>
      </React.Fragment>
    </Router>
  )
}