import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import FooterComponent from './FooterComponent'
import HeadTags from './HeadTags'
import HeaderComponent from './HeaderComponent'
import Sidebar from './Sidebar'
import MainArea from './MainArea'
import checkAuthAtStartup from '../utils/auth/checkTokenValidity'
import actions from '../store/actions'

const ViewWrapper = ({
  updateStoreValue,
  user,
  view
}) => {
  const { t } = useTranslation()
  const router = useRouter()

  // check if authenticated, otherwise redirect to login
  useEffect(() => {
    if (!user.isGuest && user.email === '') {
      checkAuthAtStartup({
        router,
        updateStoreValue
      })
    }
  },
  [])

  return (
    <>
      <HeadTags
        title={t(view)}
        description={t('ontologyVisualisationDescription')}
      />

      {
        (user.email !== ''
        || user.isGuest) && (
          <>
            <HeaderComponent />
            <main className="main-view">

              <Sidebar />
              <div className="main-view-area">
                <Navbar />
                <MainArea />
                <FooterComponent />
              </div>

            </main>
          </>
        )
      }

    </>
  )
}

ViewWrapper.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  view: PropTypes.string.isRequired,
}

const mapPropsToState = ({
  user
}) => ({
  user
})

export default connect(
  mapPropsToState,
  actions
)(ViewWrapper)
