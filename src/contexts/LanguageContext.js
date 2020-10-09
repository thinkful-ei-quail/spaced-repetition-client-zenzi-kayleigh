import React, { Component } from 'react'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import config from '../config'

const LanguageContext = React.createContext({
  language: null,
  head: null,
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
      head: null,
      guess: null,
      setError: () => {},
      clearError: () => {},
      addGuess: () => {},
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
    fetch(`${config.API_ENDPOINT}/language/head`,{
      headers:{
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(response => response.json())
    .then((head) => {
      console.log('head', head)
      this.setState({head });
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

  handleAddGuess = () => {
    fetch(`${config.API_ENDPOINT}/language/guess`,{
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })

    .then((res) => res.json())
    .then((guess) => {
      this.setState({
        guess,
      });
    })
    .catch((e) => {
      console.log("Error loading guess data");
    });
  }

  render() {
    const value = {
      language: this.state.language,
      head: this.state.head,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      addGuess: this.handleAddGuess,
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
