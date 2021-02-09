import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'
import '../../styles/dist/WordData.css'
import { FcCheckmark, FcCancel } from "react-icons/fc"
class WordData extends Component {
    static contextType = LanguageContext
    render() {
        const renderPage = () => {
            if (this.context.language !== null ){
                const {words} = this.context.language;
                return (
                    <table className="table">
                        <caption>Words to practice</caption>
                        <thead>
                            <tr>
                                <th className='word'>Word</th>
                                <th>{<FcCheckmark/>? <FcCheckmark/>:'correct'}</th>
                                <th>{<FcCancel/>? <FcCancel/>:'incorrect'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {words.map(word =>
                                <tr className="row" key={word.id}>
                                    <td className="word">{word.original}</td>
                                    <td>{word.correct_count}</td>
                                    <td>{word.incorrect_count}</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr><td colSpan='3'>Total answers correct: {this.props.total}</td></tr>
                        </tfoot>
                    </table>
                );
            } else {return (<h3>Content Loading...</h3>)}
        }
        return (<>{renderPage()}</>
        );
    }
}

export default WordData