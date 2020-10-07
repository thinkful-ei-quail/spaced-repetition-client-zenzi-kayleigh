import React, { Component } from 'react';
import LanguageContext from '../../contexts/LanguageContext';

class DashboardRoute extends Component {
  static contextType = LanguageContext
  render() {
    console.log(this.context.language)
    return (
      <section>
        implement and style me
      </section>
    );
  }
}

export default DashboardRoute
