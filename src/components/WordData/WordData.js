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
                <ul className="row">
                    <div className="word column left table-header">
                        <li>
                            Word
                        </li>
                    </div>

                    <div className="correct-count column middle table-header">
                        <li>
                            # Correct:
                        </li>
                    </div>

                    <div className="incorrect-count column right table-header">
                        <li>
                            # Incorrect:
                        </li>
                    </div>

                    {words.map(word =>
                        <>
                            <div className="word column left">
                                <li>
                                    {word.original}
                                </li>
                            </div>

                            <div className="correct-count column middle">
                                <li>
                                    {word.correct_count}
                                </li>
                            </div>
                            <div className="incorrect-count column right">
                                <li>
                                    {word.incorrect_count}
                                </li>
                            </div>
                        </>
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