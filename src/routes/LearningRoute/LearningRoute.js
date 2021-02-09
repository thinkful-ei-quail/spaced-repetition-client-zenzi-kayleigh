import React, { Component } from 'react'
import config from '../../config'
import LanguageContext from '../../contexts/LanguageContext'
import TokenService from '../../services/token-service'
import './LearningRoute.css'
import '../../styles/dist/Routes.css'
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
  }
  render() {
    
    const renderPage = () =>{
      if(this.context.head === null){
        return (
          <h2>Content Loading...</h2>
        )
      }
      if (this.state.is_correct === null){
        const { nextWord, wordCorrectCount,wordIncorrectCount, totalScore}= this.context.head
        return (
          <section className='container'>
            <h2 className='guess-header'>Translate the word:</h2>
            <span><h3 className='guess-word'>{nextWord}</h3></span>
            <div className='guess-container'>
              <form className='guess-form' onSubmit={ (e)=>this.submitGuess(e)}>
                  <label htmlFor='learn-guess-input'>
                    What's the translation for this word?
                  </label>
                <div className='guess-input'>
                  <input 
                    type='text' 
                    id='learn-guess-input'
                    required
                    onChange={(e) => this.updateGuess(e.target.value)}
                  />
                  <button
                    type='submit'
                  >
                    Submit your answer
                  </button>
                </div>
              </form>
              <div className='inactive-score-container'>
                <p>Your total score is: {totalScore-wordCorrectCount}</p>
                <p>You have answered this word correctly {wordCorrectCount} times.</p>
                <p>You have answered this word incorrectly {wordIncorrectCount} times.</p>
              </div>
            </div>
          </section>     
        )
      }
      if (this.state.is_correct === true){
        const {guess} = this.state.guess
        const { nextWord}= this.context.head
        const { answer , totalScore } = this.state.headRes.response
        return (
          <section className='container'>
            <h2 className='guess-header'>You were correct! {`:D`}</h2>
            <div className='response DisplayFeedback'>
              <p>The correct translation for</p>
              <p className='guess-data'> {nextWord}</p>
              <p> was</p>
              <p className='guess-data'> {answer}</p>
              <p> and you chose</p>
              <p className='guess-data'> {guess}!</p>              
            </div>
            <div className='active-score-container DisplayScore'>
              <p>Your total score is:</p>
              <p className='guess-data'> {totalScore}</p>
            </div>
            <button onClick={()=>this.resetResultOnNext()}>
              Try another word!
            </button>
          </section>  
        )
      }
      if (this.state.is_correct === false){
        const {guess} = this.state.guess
        const { nextWord}= this.context.head
        const { answer , totalScore } = this.state.headRes.response
        return (
          <section className='container'>
            <h2 className='guess-header'>Good try, but not quite right {`:(`}</h2>
            <div className='guess-container'>
              <div className='response DisplayFeedback'>
                <p>The correct translation for</p>
                <p className='guess-data'> {nextWord}</p>
                <p> was</p>
                <p className='guess-data'> {answer}</p>
                <p> and you chose</p>
                <p className='guess-data'> {guess}!</p>              
              </div>
              <div className='active-score-container DisplayScore'>
                <p>Your total score is:</p>
                <p className='guess-data'> {totalScore}</p>
              </div>
              <button onClick={()=>this.resetResultOnNext()}>
                Try another word!
              </button>
            </div>
          </section>
        )
      }else{
        throw new Error ('issue with result state: value not found')
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

