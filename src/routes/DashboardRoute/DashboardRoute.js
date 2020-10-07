import React, { Component } from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import WordData from '../../components/WordData/WordData'

class DashboardRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isExpanded: true,
    };
}
  static contextType = LanguageContext
  render() {
    console.log(this.context.language)

    const toggleLanguageComponent = () => {
      if (this.state.isExpanded === true){
        return (
          <div className="word-data table">
            <WordData/>          
          </div>          
        )
      }
    }

    return (
      <section className="language-component">
        <div className="language-header">
          <h3>Latin</h3>          
        </div>

        {toggleLanguageComponent()}

        <p className="total-score">Total Score:</p>

        <button className="start-learning-button">
          START PRACTICING
        </button>
      </section>
    );
  }
}

export default DashboardRoute
