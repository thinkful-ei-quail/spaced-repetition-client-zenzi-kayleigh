import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
    const renderPage = () => {

      if (this.context.language !== null ){
        const {name , total_score} = this.context.language.language;     
        return (
          <section className="language-component">
            <div className="language-header">
              <h2>{name}</h2>          
            </div>
            {toggleLanguageComponent()}
            <p className="total-score">Total correct answers: {total_score}</p>
            <Link
              onClick={this.handleLogoutClick}
              to='/learn'>
              <button>
                Start practicing
              </button>            
            </Link>
          </section>
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

export default DashboardRoute
