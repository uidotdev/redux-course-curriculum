import * as React from 'react'
import { useSelector } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'
import { useParams } from 'react-router-dom'

export default function TweetPage () {
  const { id } = useParams()
  const tweets = useSelector((state) => state.tweets)

  const replies = !tweets[id]
    ? []
    : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)

  return (
    <div>
      <Tweet id={id} />
      <NewTweet id={id} />
      <ul>
        {replies.map((replyId) => (
          <li key={replyId}>
            <Tweet id={replyId}/>
          </li>
        ))}
      </ul>
    </div>
  )
}