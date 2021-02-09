import React, { Component } from 'react'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import config from '../config'

const LanguageContext = React.createContext({
  language: null,
  head: null,
  headRes: null,
  error: null,
  getHeadRes: () => {},
  setError: () => {},
  clearError: () => {},
})

export default LanguageContext

export class LanguageProvider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      language: null,
      head: null,
      headRes: null,
      getheadRes: () => {},
      fetchHead: () => {},
      setError: () => {},
      clearError: () => {},
    };
  }

  fetchLanguage = () => {
    fetch(`${config.API_ENDPOINT}/language`,{
      headers:{
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(response => response.json())
    .then((language) => {
      this.setState({language });
    })
    .catch((error) => {
      console.error(error.message );
    });
  }

  fetchHead = () => {
    fetch(`${config.API_ENDPOINT}/language/head`,{
      headers:{
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(response => response.json())
    .then((head) => {
      this.setState({head });
    })
    .catch((error) => {
      console.error(error.message );
    });
  }

  componentDidMount() {
    this.fetchLanguage()
    this.fetchHead()
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

  getHeadRes = res => {
    this.setState({headRes: {res}})
  }


  render() {
    const value = {
      error: this.state.error,
      language: this.state.language,
      head: this.state.head,
      headRes: this.state.headRes,
      getHeadRes: this.getHeadRes,
      fetchHead: this.fetchLanguage,
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
