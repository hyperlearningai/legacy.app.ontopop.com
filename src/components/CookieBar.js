import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'
import { Button } from 'primereact/button'
import { SelectButton } from 'primereact/selectbutton'
import actions from '../store/actions'
import {
  ANALYTICS_COOKIE,
  PREFERENCES_COOKIES,
  I18N_LANGUAGE
} from '../constants/localStorage'
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import setLocalStorage from '../utils/cookieBar/setLocalStorage'
import checkCookiesAtStartup from '../utils/cookieBar/checkCookiesAtStartup'
import { USERBACK_COOKIE, USERBACK_WIDGET } from '../constants/analytics'

const CookieBar = ({
  isCookieBarOpen,
  isAnalyticsCookie,
  isPreferencesCookie,
  updateStoreValue
}) => {
  const { t, i18n } = useTranslation()

  const [isAnalytics, setAnalytics] = useState(isAnalyticsCookie)
  const [isPreferences, setPreferences] = useState(isPreferencesCookie)
  const [saveAttempt, setSaveAttempt] = useState(false)

  useEffect(() => {
    checkCookiesAtStartup({
      updateStoreValue,
    })
  }, [])

  useEffect(() => {
    if (isAnalyticsCookie !== undefined) {
      setLocalStorage({
        name: ANALYTICS_COOKIE,
        value: isAnalyticsCookie
      })

      if (isAnalyticsCookie) {
        const script = document.createElement('script')

        script.src = USERBACK_WIDGET
        script.async = true

        document.body.appendChild(script)

        return () => {
          document.body.removeChild(script)
        }
      }

      if (!isAnalyticsCookie) {
        localStorage.removeItem(USERBACK_COOKIE)
      }
    }
  }, [isAnalyticsCookie])

  useEffect(() => {
    setLocalStorage({
      name: PREFERENCES_COOKIES,
      value: isPreferencesCookie
    })

    if (isPreferencesCookie) {
      setLocalStorage({
        name: I18N_LANGUAGE,
        value: i18n.language
      })
    }
  }, [isPreferencesCookie, i18n.language])

  const yesNoOptions = [
    {
      value: false,
      label: t('noN')
    },
    {
      value: true,
      label: t('yesY')
    }
  ]

  const isAnalyticsSavedWithoutPreferences = isAnalytics === undefined
  const isPreferencesSavedWithoutPreferences = isPreferences === undefined
  const isSavedWithoutPreferences = isAnalyticsSavedWithoutPreferences || isPreferencesSavedWithoutPreferences

  return (
    <>
      {
        isCookieBarOpen && (
          <div className="cookiebar">

            <div className="cookiebar-title">
              {t('cookieSettings')}
            </div>

            <p className="p-text-italic">
              {`${t('cookieBarMessage1')} ${t('cookieBarMessage2')}`}
            </p>

            <div className="cookiebar-options m-t-20">
              <label htmlFor="cookies-functional">
                <span className="bold">
                  {t('functional')}
                </span>
                {`: ${t('functionalCookies')}`}
              </label>

              <div className="p-d-flex p-jc-center m-t-10">
                <SelectButton
                  id="cookies-functional"
                  value
                  options={yesNoOptions}
                  disabled
                  onChange={(e) => setAnalytics(e.value)}
                />
              </div>
            </div>

            <div className="cookiebar-options m-t-20">
              <label htmlFor="cookies-marketing">
                <span className="bold">
                  {t('analytics')}
                </span>
                {`: ${t('analyticsCookies')}`}
              </label>
              <div className="p-d-flex p-jc-center m-t-10">
                <SelectButton
                  id="cookies-marketing"
                  value={isAnalytics}
                  options={yesNoOptions}
                  onChange={(e) => setAnalytics(e.value)}
                />
              </div>
              {
                (saveAttempt && isAnalyticsSavedWithoutPreferences) && (
                  <small className="p-error p-d-block text-center">
                    {t('chooseYourPreference')}
                  </small>
                )
              }
            </div>

            <div className="cookiebar-options m-t-20">
              <label htmlFor="cookies-marketing">
                <span className="bold">
                  {t('preferences')}
                </span>
                {`: ${t('preferencesCookies')}`}
              </label>
              <div className="p-d-flex p-jc-center m-t-10">
                <SelectButton
                  id="cookies-preferences"
                  value={isPreferences}
                  options={yesNoOptions}
                  onChange={(e) => setPreferences(e.value)}
                />
              </div>
              {
                (saveAttempt && isPreferencesSavedWithoutPreferences) && (
                  <small className="p-error p-d-block text-center">
                    {t('chooseYourPreference')}
                  </small>
                )
              }
            </div>

            <div className="cookie-btn-wrapper m-t-30">
              <Button
                aria-label={t('savePreferences')}
                label={t('savePreferences')}
                className="cookie-btn cookie-btn-secondary"
                id="save-preferences-btn"
                onClick={() => {
                  if (!isSavedWithoutPreferences) {
                    updateStoreValue(['isPreferencesCookie'], OPERATION_TYPE_UPDATE, isPreferences)
                    updateStoreValue(['isAnalyticsCookie'], OPERATION_TYPE_UPDATE, isAnalytics)
                    setSaveAttempt(false)
                    return updateStoreValue(['isCookieBarOpen'], OPERATION_TYPE_UPDATE, false)
                  }

                  setSaveAttempt(true)
                }}
              />

              <Button
                aria-label={t('acceptAll')}
                className="cookie-btn"
                label={t('acceptAll')}
                id="accept-all-btn"
                onClick={() => {
                  updateStoreValue(['isAnalyticsCookie'], OPERATION_TYPE_UPDATE, true)
                  updateStoreValue(['isPreferencesCookie'], OPERATION_TYPE_UPDATE, true)
                  setSaveAttempt(false)
                  return updateStoreValue(['isCookieBarOpen'], OPERATION_TYPE_UPDATE, false)
                }}
              />
            </div>
          </div>
        )
      }
    </>
  )
}

CookieBar.propTypes = {
  isAnalyticsCookie: PropTypes.bool,
  isPreferencesCookie: PropTypes.bool,
  updateStoreValue: PropTypes.func.isRequired,
  isCookieBarOpen: PropTypes.bool.isRequired,
}

CookieBar.defaultProps = {
  isAnalyticsCookie: undefined,
  isPreferencesCookie: undefined,
}

const mapToProps = ({
  isCookieBarOpen,
  isAnalyticsCookie,
  isPreferencesCookie
}) => ({
  isCookieBarOpen,
  isAnalyticsCookie,
  isPreferencesCookie
})

export default connect(
  mapToProps,
  actions
)(CookieBar)
