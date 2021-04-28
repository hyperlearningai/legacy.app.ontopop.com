/* eslint react/no-unescaped-entities:0 */

import { useTranslation } from 'react-i18next'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import { APP_NAME } from '../constants/app'

const Footer = ({
  updateStoreValue
}) => {
  const { t } = useTranslation()

  return (
    <>
      <footer className="website-footer relative bg-blueGray-200 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: 'translateZ(0)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <hr className="my-6 border-blueGray-300" />

          <div className="container mx-auto flex items-center justify-between">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              {`Copyright © ${APP_NAME} ${new Date().getFullYear()} - ${t('allRightsReserved')}`}
            </div>

            <div className="website-footer-items">
              <Button
                className="p-link"
                onClick={() => updateStoreValue(['isCookieBarOpen'], OPERATION_TYPE_UPDATE, true)}
              >
                {t('cookies')}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

Footer.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
}

export default connect(
  null,
  actions
)(Footer)
