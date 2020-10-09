import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'



class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      
      <div>

        <nav>
          <Link
            className='nav-item'
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>

          <span className='nav-item'>
            {this.context.user.name}
          </span>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login' className='nav-item'>Login</Link>
        {' '}
        <Link to='/register' className='nav-item'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className="header-container">
        <h1 className="header">
          <Link to='/'>
            Langful
          </Link>
        </h1>
        <div className='nav'>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </header>
    );
  }
}

export default Header
