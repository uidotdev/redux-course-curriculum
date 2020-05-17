import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { handleToggleTweet } from '../actions/tweets'
import { Link, useHistory } from 'react-router-dom'

export default function Tweet ({ id }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const authedUser = useSelector((state) => state.authedUser)
  const users = useSelector((state) => state.users)
  const tweets = useSelector((state) => state.tweets)


  const parentTweet = tweets[id] ? tweets[tweets[id].replyingTo] : null
  const tweet = tweets[id]
    ? formatTweet(tweets[id], users[tweets[id].author], authedUser, parentTweet)
    : null

  const handleLike = (e) => {
    e.preventDefault()

    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    }))
  }

  const toParent = (e, id) => {
    e.preventDefault()
    history.push(`/tweet/${id}`)
  }

  if (tweet === null) {
    return <p>This Tweet doesn't existd</p>
  }

  return (
    <Link to={`/tweet/${tweet.id}`} className='tweet'>
      <img
        src={tweet.avatar}
        alt={`Avatar of ${tweet.name}`}
        className='avatar'
      />
      <div className='tweet-info'>
        <div>
          <span>{tweet.name}</span>
          <div>{formatDate(tweet.timestamp)}</div>
          {tweet.parent && (
            <button className='replying-to' onClick={(e) => toParent(e, tweet.parent.id)}>
              Replying to @{tweet.parent.author}
            </button>
          )}
          <p>{tweet.text}</p>
        </div>
        <div className='tweet-icons'>
          <TiArrowBackOutline className='tweet-icon' style={{marginBottom: 3}}/>
          <span>{tweet.replies || 0}</span>
          <button className='heart-button' onClick={handleLike}>
            {tweet.hasLiked === true
              ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
              : <TiHeartOutline className='tweet-icon'/>}
          </button>
          <span>{tweet.likes || 0}</span>
        </div>
      </div>
    </Link>
  )
}