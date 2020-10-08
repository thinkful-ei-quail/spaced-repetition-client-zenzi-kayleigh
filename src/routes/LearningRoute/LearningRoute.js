import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'

class LearningRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      input_result: null,
    };
  }
  static contextType = LanguageContext;
  updateInput = (input) =>{
    this.setState({input: {input}})
  }
  updateResultOnSubmit = () =>{
    if (this.state.input === this.context.original){
      this.setState({input_result: true})
    }else{
      this.setState({input_result: false})
    }
  };
  resetResultOnNext = () =>{
    this.setState({input_result: null})
  }
  render() {
    const renderPage = () =>{
      if(this.context.head === null){
        return (
          <h2>Content Loading...</h2>
        )
      }
      if (this.state.input_result === null){
        return (
          <section>
            <h2>Translate the word:</h2>
            <form onSubmit={ ()=>this.updateResultOnSubmit()}>
              <label>
                What's the translation for this word?
              </label>
              <input 
                type='text' 
                id='learn-guess-input'
                onChange={(e) => this.updateInput(e.target.value)}
              />
              <button
                type='submit'
              >
                Submit
              </button>
            </form>
            <div className='inactive-score-container'>
              <p>Previous Tries:</p>
              <p>0 Correct / 2 Incorrect</p>
              <p>Score Average: 0%</p>
            </div>
          </section>     
        )
      }
      if (this.state.input_result === true){
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
      if (this.state.input_result === false){
        console.log(this.state.input)
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
            <button onClick={()=>this.resetResultOnNext()}>
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

