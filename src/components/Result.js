import React, { Component } from 'react'

class Result extends Component {
    render() {
        return(
            <section className='result container'>
                <h2 className='header'>{this.props.correct?'You were correct!':'Good try, but not quite right :('}</h2>
                <div className='feedback content'>
                    <p>The correct translation for</p>
                    <p className='data'>{this.props.nextWord}</p>
                    <p>was</p>
                    <p className='data'>{this.props.answer}</p>
                    <p>and you submitted</p>
                    <p className='data'>{this.props.guess}</p>
                </div>
                <div className='score content'>
                    <p>Your total score is:</p>
                    <p className='guess-data'> {this.props.totalScore}</p>
                </div>
                <button onClick={()=>this.props.resetResultOnNext()}>
                Try another word!
                </button>
            </section>
        );
    }
}

export default Result