import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import '../../styles/dist/Header.css'
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
            className='link'
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
          <span className='link text'>
            {this.context.user.name}
          </span>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login' className='link'>Login</Link>
        {' '}
        <Link to='/register' className='link'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <h1 className="logo">
          <Link to='/' className='link'>
            Langful
          </Link>
        </h1>
        <div className='nav-container'>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </header>
    );
  }
}

export default Header
