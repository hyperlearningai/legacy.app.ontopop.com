import App from 'next/app'
import { Provider } from 'redux-zero/react'
import ReactNotification from 'react-notifications-component'
import HeaderComponent from '../components/HeaderComponent'
import Sidebar from '../components/Sidebar'
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

        <main className="main-view">
          <Sidebar />

          <div className="main-view-area">
            <Component {...pageProps} />
          </div>
        </main>

        <ReactNotification />
      </Provider>
    )
  }
}

export default MyApp
