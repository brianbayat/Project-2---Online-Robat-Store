import React, {Component, Fragment} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {CssBaseline} from '@material-ui/core/'

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Routes />
      </Fragment>
    )
  }
}

export default App
