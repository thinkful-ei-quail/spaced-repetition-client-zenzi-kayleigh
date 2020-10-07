import React, { Component } from 'react'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import config from '../config'

const LanguageContext = React.createContext({
  language: null,
  error: null,
  setError: () => {},
  clearError: () => {},
})

export default LanguageContext

export class LanguageProvider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      language: null,
    };
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`,{
      headers:{
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
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
      language: this.state.language,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
