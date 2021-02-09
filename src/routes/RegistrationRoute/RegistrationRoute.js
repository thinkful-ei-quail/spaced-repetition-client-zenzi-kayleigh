import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import '../../styles/dist/Routes.css'
class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }
  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }
  render() {
    return (
      <section className="registration container">
        <p className="summary">
          Practice learning a language with the spaced reptition revision technique.
        </p>
        <div className="register">
          <h2 className="header">Sign up</h2>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </div>
      </section>
    );
  }
}

export default RegistrationRoute
