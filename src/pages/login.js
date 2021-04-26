import { Button } from 'primereact/button'
import { useTranslation } from 'react-i18next'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Chip } from 'primereact/chip'
import HeadTags from '../components/HeadTags'
import signIn from '../utils/auth/signIn'
import actions from '../store/actions'
import checkTokenValidity from '../utils/auth/checkTokenValidity'
import logo from '../assets/images/logo.png'
import { APP_NAME } from '../constants/app'
import { ROUTE_LISTING } from '../constants/routes'
import { OPERATION_TYPE_OBJECT_ADD } from '../constants/store'

const Login = ({
  updateStoreValue,
  activeLoaders
}) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  // check if authenticated, otherwise redirect to login
  useEffect(() => checkTokenValidity({
    router,
    updateStoreValue
  }), [])

  return (
    <>
      <HeadTags
        title=""
        description={t('ontologyVisualisationDescription')}
      />

      <main className="auth">
        <div className="auth-container">
          <div className="logo">
            <img
              src={logo}
              alt={APP_NAME}
            />
          </div>

          <h1 className="auth-title">{t('signIn')}</h1>

          <Chip label={t('alphaVersion')} className="p-mr-2" icon="pi pi-info-circle" />

          <form onSubmit={(e) => {
            e.preventDefault()

            signIn({
              router,
              updateStoreValue,
              email,
              password,
              setShowError,
              t
            })
          }}
          >
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
                  onKeyPress={(e) => {
                    if (e.code === 'Enter') {
                      signIn({
                        router,
                        updateStoreValue,
                        email,
                        password,
                        setShowError,
                        t
                      })
                    }
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

            {
              activeLoaders > 0 ? (
                <div className="auth-loader">
                  <ProgressSpinner
                    className="spinner"
                    strokeWidth="4"
                  />
                </div>
              ) : (
                <>
                  <Button
                    aria-label={t('login')}
                    className="auth-button m-t-20"
                    label={t('login')}
                    id="auth-login-button"
                    onClick={() => signIn({
                      router,
                      updateStoreValue,
                      email,
                      password,
                      setShowError,
                      t
                    })}
                  />

                  <Button
                    className="auth-button m-t-20 p-button-secondary"
                    aria-label={t('continueGuest')}
                    label={t('continueGuest')}
                    id="guest-login-button"
                    onClick={() => {
                      updateStoreValue(['user'], OPERATION_TYPE_OBJECT_ADD, { isGuest: true })
                      router.push(ROUTE_LISTING)
                    }}
                  />
                </>
              )
            }
            <input
              name="submit"
              className="hidden"
              type="submit"
            />
          </form>

        </div>
      </main>
    </>
  )
}

Login.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  activeLoaders: PropTypes.number.isRequired,
}

const mapStateToProps = ({
  activeLoaders
}) => ({
  activeLoaders
})

export default connect(
  mapStateToProps,
  actions
)(Login)
