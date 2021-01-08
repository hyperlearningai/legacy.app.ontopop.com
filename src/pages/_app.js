import App from 'next/app'
import { Provider } from 'redux-zero/react'
import ReactNotification from 'react-notifications-component'
import HeaderComponent from '../components/HeaderComponent'
import FooterComponent from '../components/FooterComponent'
import store from '../store'
import 'vis-network/styles/vis-network.min.css'
import '../styles/styles.scss'
import '../i18n'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Provider store={store}>
        <HeaderComponent />
        <Component {...pageProps} />
        <FooterComponent />
        <ReactNotification />
      </Provider>
    )
  }
}

export default MyApp
