import * as React from 'react'
import { useDispatch } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

export default function NewTweet ({ id }) {
  const dispatch = useDispatch()
  const [text, setText] = React.useState('')
  const [toHome, setToHome] = React.useState(false)

  const handleChange = (e) => setText(e.target.value)

  const  handleSubmit = (e) => {
    e.preventDefault()
    dispatch(handleAddTweet(text, id))
    setText('')
    setToHome(id ? false : true)
  }

  if (toHome === true) {
    return <Redirect to='/' />
  }

  const tweetLeft = 280 - text.length

  return (
    <form className='new-tweet' onSubmit={handleSubmit}>
      <textarea
        placeholder="What's happening?"
        value={ text}
        onChange={handleChange}
        className='textarea'
        maxLength={280}
      />
      {tweetLeft <= 100 && (
        <div className='tweet-length'>
          {tweetLeft}
        </div>
      )}
      <button
        className='btn'
        type='submit'
        disabled={text === ''}>
          Submit
      </button>
    </form>
  )
}