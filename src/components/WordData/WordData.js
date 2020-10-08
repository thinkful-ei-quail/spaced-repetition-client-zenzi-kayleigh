import React, { Component } from 'react'
import './WordData.css';
import LanguageContext from '../../contexts/LanguageContext';

class WordData extends Component {

    static contextType = LanguageContext

    render() {
        const renderPage = () => {

        if (this.context.language !== null ){
            const {words} = this.context.language;
            
   
            return (
            <div className='words-table'>
                <h3>Words to practice</h3>
                <ul>
                    {words.map(word =>
                        <li className="row" key={word.id}>
                            <h4 className="word column">
                                {word.original}
                            </h4>
                            <p className="correct-count column">
                                correct answer count: {word.correct_count}    
                            </p>
                            <p className="incorrect-count column">
                                incorrect answer count: {word.incorrect_count}
                            </p>
                        </li>
                    )}

                </ul>               
            </div>
            );
        } else {
            return (
            <h3>Content Loading...</h3>
            )
        }
        }
        return (
        <>
            {renderPage()}
        </>
        );
    }
}

export default WordData