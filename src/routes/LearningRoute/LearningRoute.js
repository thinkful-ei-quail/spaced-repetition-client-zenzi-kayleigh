import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'

class LearningRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      input_result: null,
    };
  }
  static contextType = LanguageContext;
  
  render() {
    console.log(this.state.input_result)
    const updateResultOnSubmit = (input) =>{
      if (input === this.context.original){
        this.setState({input_result: true})
      }
      this.setState({input_result: false})
    };
    const resetResultOnNext = () =>{
      this.setState({input_result: null})
    }
    const renderPage = () =>{
      if(this.context.head === null){
        return (
          <h2>Content Loading...</h2>
        )
      }
      if (this.state.input_result === null){
        return (
          <section>
            <h2>Translate the word: Salve</h2>
            <form>
              <label>
                What's the translation for this word?
              </label>
              <input type="text"/>
            </form>
          </section>     
        )
      }
      if (this.state.input_result === true){
        return (
          <section>
            correct answer page
          </section>
        )
      }
      if (this.state.input_result === false){
        return (
          <section>
            incorrect answer page
          </section>
        )
      }else{
        throw new Error ('issue with result state: value not found')
      }
    }
    return (
      <>
        {renderPage()}
      </>
    );
  }
}

export default LearningRoute

