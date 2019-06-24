import React, { Component } from 'react'
import './App.css';
import {connect} from 'react-redux';
import { updateUser } from './actions/user-action';
class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
          <h1>Component App</h1>
      </div>
    )
  }
}
const mapStateToProps = state => ({
    products: state.products,
    user: state.user
})

const mapActionsToProps = {
  onUpdateUser: updateUser
}

export default connect(mapStateToProps, mapActionsToProps)(App);
