import React, { Component } from 'react'
import '../styles/dist/Question.css'
import { FcCheckmark, FcCancel } from "react-icons/fc"
import { AiOutlineEnter } from "react-icons/ai";
class Question extends Component {
    render() {
        return (
            <section className='question container'>
              <h2 className='header'>Translate the word: {this.props.nextWord.charAt(0).toUpperCase()+this.props.nextWord.substring(1).toLowerCase()}</h2>
              <div className='border'>
                <form onSubmit={ (e)=>this.props.submitGuess(e)}>
                    <label  className='question' htmlFor='learn-guess-input'>
                      What is the english translation for this word?
                    </label>
                    <div>
                        <input 
                        type='text' 
                        id='learn-guess-input'
                        required
                        onChange={(e) => this.props.updateGuess(e.target.value)}
                        />
                        <button type='submit' className='purple-button'><AiOutlineEnter className='icon' title='Submit your answer'/></button>
                    </div>
                </form>
                <table className="score-table">
                    <caption>Scores for this word</caption>
                    <thead>
                        <tr>
                            <th><FcCheckmark title='correct'/></th>
                            <th><FcCancel title='incorrect'/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.wordCorrectCount}</td>
                            <td>{this.props.wordIncorrectCount}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr><td colSpan='2'>Language total: {this.props.totalScore-this.props.wordCorrectCount}</td></tr>
                    </tfoot>
                </table>
                {/* <div className='score'>
                  <p className='total'>{this.props.language} total score: {this.props.totalScore-this.props.wordCorrectCount}</p>
                  <p>You have answered this word correctly {this.props.wordCorrectCount} times.</p>
                  <p>You have answered this word incorrectly {this.props.wordIncorrectCount} times.</p>
                </div> */}
              </div>
            </section>     
        )
    }
}

export default Question
