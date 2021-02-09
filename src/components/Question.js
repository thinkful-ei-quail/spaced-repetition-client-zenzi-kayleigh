import React, { Component } from 'react'

class Question extends Component {
    render() {
        return (
            <section className='container'>
              <h2 className='guess-header'>Translate the word: {this.props.nextWord.charAt(0).toUpperCase()+this.props.nextWord.substring(1).toLowerCase()}</h2>
              <div className='guess-container'>
                <form className='guess-form' onSubmit={ (e)=>this.props.submitGuess(e)}>
                    <label htmlFor='learn-guess-input'>
                      What's the English translation for this word?
                    </label>
                  <div className='guess-input'>
                    <input 
                      type='text' 
                      id='learn-guess-input'
                      required
                      onChange={(e) => this.props.updateGuess(e.target.value)}
                    />
                    <button
                      type='submit'
                    >
                      Submit your answer
                    </button>
                  </div>
                </form>
                <div className='inactive-score-container'>
                  <p>Your total score is: {this.props.totalScore-this.props.wordCorrectCount}</p>
                  <p>You have answered this word correctly {this.props.wordCorrectCount} times.</p>
                  <p>You have answered this word incorrectly {this.props.wordIncorrectCount} times.</p>
                </div>
              </div>
            </section>     
        )
    }
}

export default Question