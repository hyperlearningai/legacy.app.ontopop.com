import { useRef } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Chip } from 'primereact/chip'
import logo from '../assets/images/logo.svg'
import logout from '../utils/auth/logout'
import actions from '../store/actions'
import {
  FORM_LINK, ROUTE_INDEX, ROUTE_LOGIN, ROUTE_PROFILE
} from '../constants/routes'

const HeaderComponent = ({
  activeLoaders,
  setStoreState,
  user
}) => {
  const overlay = useRef(null)
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <header>
      <div className="header-left">
        {
          activeLoaders > 0 && (
            <div className="loader-box">
              <ProgressSpinner
                className="spinner"
                strokeWidth="4"
              />
            </div>
          )
        }
        <div className="logo">
          <img
            src={logo}
            alt="Highways England"
          />
        </div>
      </div>

      <div className="header-right">
        <a
          href={FORM_LINK}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <Chip label={`${t('alphaVersion')} | ${t('sendFeedback')}`} className="p-mr-2" icon="pi pi-info-circle" />
        </a>

        <Button
          type="button"
          icon="pi pi-align-justify"
          id="overlay-menu-button"
          onClick={(e) => overlay.current.toggle(e)}
        />

        <OverlayPanel ref={overlay}>
          {
            router.asPath === ROUTE_PROFILE ? (
              <Button
                icon="pi pi-home"
                label={t('home')}
                id="overlay-menu-home"
                className="p-button-secondary"
                onClick={() => router.push(ROUTE_INDEX)}
              />
            ) : (
              <Button
                icon="pi pi-user"
                id="overlay-menu-profile"
                label={t('profile')}
                className="p-button-secondary"
                onClick={() => router.push(ROUTE_PROFILE)}
              />
            )
          }
          {
            user.isGuest ? (
              <Button
                icon="pi pi-sign-in"
                id="overlay-menu-login"
                className="p-button-secondary"
                label={t('signIn')}
                onClick={() => router.push(ROUTE_LOGIN)}
              />
            ) : (
              <Button
                icon="pi pi-sign-out"
                id="overlay-menu-logout"
                className="p-button-secondary"
                label={t('signOut')}
                onClick={() => logout({
                  router,
                  setStoreState
                })}
              />
            )
          }

        </OverlayPanel>
      </div>
    </header>
  )
}

HeaderComponent.propTypes = {
  activeLoaders: PropTypes.number.isRequired,
  setStoreState: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
}

const mapToProps = ({
  activeLoaders,
  user
}) => ({
  activeLoaders,
  user
})

export default connect(
  mapToProps,
  actions
)(HeaderComponent)
