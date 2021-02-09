import React, { Component } from 'react'
import config from '../../config'
import LanguageContext from '../../contexts/LanguageContext'
import TokenService from '../../services/token-service'
//import './LearningRoute.css'
import '../../styles/dist/Routes.css'
import { VscLoading } from "react-icons/vsc"
import Result from '../../components/Result'
import Question from '../../components/Question'
class LearningRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guess: '',
      is_correct: null,
      headRes: null,
    };
  }
  static contextType = LanguageContext;
  updateGuess = (guess) =>{
    this.setState({guess: {guess}})
  }
  submitGuess = (e) => {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(this.state.guess),
    })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      this.context.getHeadRes(response);
      this.setState({headRes: {response}})
      this.updateResultOnSubmit()
    });
  };
  updateResultOnSubmit = () =>{
    if (this.context.headRes.res.isCorrect){
      this.setState({is_correct: true})
    }else{
      this.setState({is_correct: false})
    }
  };
  resetResultOnNext = () =>{
    window.location.reload(false)
    //this.setState({is_correct: null, headRes: null})
  };
  render() {
    const renderPage = () =>{
      if(this.context.head === null){
        return (
          <div className='loading container'>
            <VscLoading/>
            <h2>Content Loading...</h2>
          </div>
        )
      }
      if (this.state.is_correct === null){
        return(
          <Question
            nextWord={this.context.head.nextWord}
            wordCorrectCount={this.context.head.wordCorrectCount}
            wordIncorrectCount={this.context.head.wordIncorrectCount}
            totalScore={this.context.head.totalScore}
            submitGuess={(e)=>{this.submitGuess(e)}}
            updateGuess={(e)=>{this.updateGuess(e)}}
          />
        )
      }
      if (this.state.is_correct === true || this.state.is_correct === false){
        return (
          <Result
            correct={this.state.is_correct}
            guess={this.state.guess}
            nextWord={this.context.nextWord}
            answer={this.state.headRes.response.answer}
            totalScore={this.state.headRes.response.totalScore}
            resetResultOnNext={(e)=>{this.resetResultOnNext(e)}}
          />  
        )
      }else{
        throw new Error ('issue with results: value not found')
      }
    }
    return (
      <>
        {renderPage()}
      </>
    );
  }
}

export default LearningRoute

