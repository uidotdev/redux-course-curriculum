import * as React from 'react'
import { useSelector } from 'react-redux'
import Tweet from './Tweet'

export default function Dashboard () {
  const tweets = useSelector((state) => state.tweets)
  const tweetIds = Object.keys(tweets)
    .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)

  return (
    <ul>
      {tweetIds.map((id) => (
        <li key={id}>
          <Tweet id={id}/>
        </li>
      ))}
    </ul>
  )
}