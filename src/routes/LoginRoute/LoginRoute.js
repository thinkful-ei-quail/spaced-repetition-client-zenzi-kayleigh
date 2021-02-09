import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import '../../styles/dist/Routes.css'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className='login container'>
        <h2 className="header">Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginRoute
