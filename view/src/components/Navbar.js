import { NavLink } from 'react-router-dom'
import React from 'react'

export function Navbar(props) {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <NavLink exact to='/' className='navbar-brand' activeClassName='active'>MobilePro</NavLink>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">

          </ul>
          <ul className='nav navbar-nav navbar-right'>
            { !props.user && <li><NavLink exact to='/login' activeClassName='active'>Login</NavLink></li> }
            { !props.user && <li><NavLink exact to='/register' activeClassName='active'>Register</NavLink></li> }
          </ul>
        </div>
      </div>
    </nav>
  )
}
