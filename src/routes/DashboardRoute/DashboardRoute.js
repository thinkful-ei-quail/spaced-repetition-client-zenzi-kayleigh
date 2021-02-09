import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LanguageContext from '../../contexts/LanguageContext';
import WordData from '../../components/WordData/WordData'
import '../../styles/dist/Routes.css'
import { BsChevronBarDown, BsChevronBarUp, BsFillPlayFill } from "react-icons/bs";
class DashboardRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: true,
    };
  }
  refreshPage = () => {
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
  }
  static contextType = LanguageContext
  render() {
    const toggleLanguageComponent = (language, total) => {
      if (this.state.isExpanded === true){
        return (
          <div className="word-data table">
            <WordData total={total}/>      
            <BsChevronBarUp title='Collapse' className='icon' onClick={()=>this.setState({isExpanded: false})}/><Link className='link' to='/learn'><BsFillPlayFill className='icon' title='Begin'/></Link>
          </div>          
        )
      }else{
        return (
          <>
            <p className="total-score">Total answers correct: {total}</p>
            <BsChevronBarDown title='Expand' className='icon' onClick={()=>this.setState({isExpanded: true})}/><Link className='link' to='/learn'><BsFillPlayFill title='Begin' className='icon'/></Link>
          </>
        )
      }
    }
    const renderPage = () => {
      this.refreshPage()
      if (this.context !== null && this.context.language !== null && this.context.language.language !== undefined){
        const {name: language , total_score} = this.context.language.language;   
        return (
          <section className="dashboard container">
            <h2 className="header">{language} </h2>
            {toggleLanguageComponent(language, total_score)}
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
