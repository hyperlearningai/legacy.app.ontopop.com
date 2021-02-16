import { Button } from 'primereact/button'
import { useTranslation } from 'react-i18next'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ProgressSpinner } from 'primereact/progressspinner'
import logo from '../assets/images/logo.svg'
import HeadTags from '../components/HeadTags'
import signIn from '../utils/auth/signIn'
import { ROUTE_FORGOT_PASSWORD, ROUTE_INDEX } from '../constants/routes'
import actions from '../store/actions'
import checkTokenValidity from '../utils/auth/checkTokenValidity'

const Login = ({
  setStoreState,
  addToObject,
  loading
}) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  // check if authenticated, otherwise redirect to login
  useEffect(() => checkTokenValidity({
    router,
    addToObject
  }), [])

  return (
    <>
      <HeadTags
        title=""
        description={t('ontologyVisualisationDescription')}
      />

      <main className="login">
        <div className="auth-container">

          <div className="logo">
            <img
              src={logo}
              alt="Highways England"
            />
          </div>

          <h1 className="auth-title">{t('signIn')}</h1>

          <div className="auth-input-container">
            <label htmlFor="email" className="auth-label">{t('email')}</label>
            <div className="p-input-icon-left auth-input">
              <i className="pi pi-user" />
              <InputText
                id="email"
                value={email}
                type="email"
                onChange={(e) => {
                  setShowError(false)
                  setEmail(e.target.value)
                }}
              />
            </div>
          </div>

          <div className="auth-input-container">
            <label htmlFor="password" className="auth-label">{t('password')}</label>
            <div className="p-input-icon-left auth-input">
              <i className="pi pi-key" />
              <InputText
                id="password"
                value={password}
                type="password"
                onChange={(e) => {
                  setShowError(false)
                  setPassword(e.target.value)
                }}
              />
            </div>
          </div>

          {
            showError && (
              <div className="auth-error">
                {t('invalidEmailPassword')}
              </div>
            )
          }

          <div className="auth-links">
            <Link href={ROUTE_FORGOT_PASSWORD}>
              <a>
                {t('forgotPasswordLink')}
              </a>
            </Link>
          </div>

          {
            loading ? (
              <div className="auth-loader">
                <ProgressSpinner
                  className="spinner"
                  strokeWidth="4"
                />
              </div>
            ) : (
              <>
                <Button
                  className="auth-button m-t-20"
                  label={t('login')}
                  onClick={() => signIn({
                    router,
                    addToObject,
                    setStoreState,
                    email,
                    password,
                    setShowError
                  })}
                />

                <Button
                  className="auth-button m-t-20 p-button-secondary"
                  label={t('continueGuest')}
                  onClick={() => {
                    addToObject('user', 'isGuest', true)
                    router.push(ROUTE_INDEX)
                  }}
                />
              </>
            )
          }

        </div>
      </main>
    </>
  )
}

Login.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  addToObject: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = ({
  loading
}) => ({
  loading
})

export default connect(
  mapStateToProps,
  actions
)(Login)