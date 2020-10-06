import React, { Component } from 'react'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import config from '../config'

const LanguageContext = React.createContext({
  language: {},
  error: null,
  setError: () => {},
  clearError: () => {},
})

export default LanguageContext

export class LanguageProvider extends Component {

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`)

    .then(response => response.json())
    .then((language) => {
      console.log('language', language)
      this.setState({language });
    })
    .catch((error) => {
      console.error(error.message );
    });

  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }




 


  render() {
    const value = {

    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
