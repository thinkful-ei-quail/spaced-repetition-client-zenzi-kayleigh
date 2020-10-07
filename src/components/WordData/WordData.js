import React, { Component } from 'react'
import './WordData.css';
import LanguageContext from '../../contexts/LanguageContext';

class WordData extends Component {

    static contextType = LanguageContext

    render() {
        return(
            <div className='container'>
                <ul>{/*map data and for each word*/}
                    <div className="word column left">
                       <li>
                           Word
                       </li>
                    </div>

                    <div className="correct-count column middle">
                        <li>
                            Number Correct:
                        </li>
                    </div>

                    <div className="incorrect-count column right">
                        <li>
                            Number Incorrect:
                        </li>
                    </div>
                </ul>               
            </div>
        );
    }
}

export default WordData