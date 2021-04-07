import App from 'next/app'
import { Provider } from 'redux-zero/react'
import ReactNotification from 'react-notifications-component'
import store from '../store'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'react-notifications-component/dist/theme.css'
import 'vis-network/styles/vis-network.min.css'
import '../styles/styles.scss'
import '../i18n'
import AuthCheck from '../components/AuthCheck'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Provider store={store}>
        <AuthCheck
          pageProps={pageProps}
        />
        <Component {...pageProps} />
        <ReactNotification />
      </Provider>
    )
  }
}

export default MyApp
