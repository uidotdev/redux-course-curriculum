import * as React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav'>
      <NavLink to='/' exact activeClassName='active'>
        Home
      </NavLink>
      <NavLink to='/new' activeClassName='active'>
        New Tweet
      </NavLink>
    </nav>
  )
}