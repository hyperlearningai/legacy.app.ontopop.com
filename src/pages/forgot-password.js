import { Button } from 'primereact/button'
import { useTranslation } from 'react-i18next'
import { InputText } from 'primereact/inputtext'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ProgressSpinner } from 'primereact/progressspinner'
import logo from '../assets/images/logo.svg'
import { ROUTE_LOGIN } from '../constants/routes'
import HeadTags from '../components/HeadTags'
import getPasswordReset from '../utils/auth/getPasswordReset'
import checkTokenValidity from '../utils/auth/checkTokenValidity'
import actions from '../store/actions'

const ForgotPassword = ({
  setStoreState,
  addToObject,
  loading
}) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

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

      <main className="auth">
        <div className="auth-container">

          <div className="logo">
            <img
              src={logo}
              alt="Highways England"
            />
          </div>

          <h1 className="auth-title">{t('forgotPassword')}</h1>

          <div className="auth-input-container">
            <label htmlFor="email" className="auth-label">{t('enterEmail')}</label>
            <div className="p-input-icon-left auth-input">
              <i className="pi pi-user" />
              <InputText
                id="email"
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
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
                  disabled={false}
                  label={t('send')}
                  onClick={() => getPasswordReset({
                    email,
                    router,
                    setStoreState,
                    t
                  })}
                />

                <div className="auth-links">
                  <Link href={ROUTE_LOGIN}>
                    <a>
                      {t('backToLogin')}
                    </a>
                  </Link>
                </div>
              </>
            )
          }
        </div>
      </main>
    </>
  )
}

ForgotPassword.propTypes = {
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
)(ForgotPassword)
