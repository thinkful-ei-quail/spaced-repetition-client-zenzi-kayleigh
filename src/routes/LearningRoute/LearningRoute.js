import React, { Component } from 'react'
import config from '../../config'
import LanguageContext from '../../contexts/LanguageContext'

class LearningRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guess: '',
      is_correct: null,
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
      },
      body: JSON.stringify({
        guess: `${this.state.guess.value}`,
      }),
    })
    .then((res) => {
      return res.json();
    });
    // .then((response) => {
    //   this.context.addGuess();
    //   this.setState({
    //     redirect: "/learn",
    //   });
    // })
  };
  updateResultOnSubmit = () =>{
    if (this.state.guess === 'test'){
      this.setState({is_correct: true})
    }else{
      this.setState({is_correct: false})
    }
  };
  resetResultOnNext = () =>{
    this.setState({is_correct: null})
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
          <section>
            <h2>Translate the word:</h2>
            <span>{nextWord}</span>
            <form onSubmit={ ()=>this.submitGuess()}>
              <label htmlFor='learn-guess-input'>
                What's the translation for this word?
              </label>
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
            </form>
            <div className='inactive-score-container'>
              <p>Your total score is: {totalScore}</p>
              <p>You have answered this word correctly {wordCorrectCount} times.</p>
              <p>You have answered this word incorrectly {wordIncorrectCount} times.</p>
            </div>
          </section>     
        )
      }
      if (this.state.is_correct === true){
        return (
          <section>
            <h2>You were correct: {`:D`}</h2>
            <div className='response'>
              <h4>The correct translation for</h4>
              <p>Salve</p>
              <h4>was</h4>
              <p>Hello</p>
              <h4>You chose</h4>
              <p>Hello</p>              
            </div>
            <div className='active-score-container'>
              <p>Your Score Is Now:</p>
              <p>20%</p>
            </div>
            <button onClick={()=>this.resetResultOnNext()}>
              Try another word!
            </button>
          </section>  
        )
      }
      if (this.state.is_correct === false){
        console.log(this.state.guess)
        return (
          <section>
            <h2>Good try, but not quite right {`:(`}</h2>
            <div className='response'>
              <h4>The correct translation for</h4>
              <p>Salve</p>
              <h4>was</h4>
              <p>Hello</p>
              <h4>You chose</h4>
              <p>Night</p>              
            </div>
            <div className='active-score-container'>
              <p>Your Score Is Now:</p>
              <p>0%</p>
            </div>
            <buttonon Click={()=>this.resetResultOnNext()}>
              Try another word!
            </button>
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

