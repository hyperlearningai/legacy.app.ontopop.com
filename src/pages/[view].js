import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import FooterComponent from '../components/FooterComponent'
import HeadTags from '../components/HeadTags'
import HeaderComponent from '../components/HeaderComponent'
import Sidebar from '../components/Sidebar'
import MainArea from '../components/MainArea'
import checkAuthAtStartup from '../utils/auth/checkTokenValidity'
import actions from '../store/actions'

const View = ({
  updateStoreValue,
  user,
}) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { view } = router.query

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

View.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
}

const mapPropsToState = ({
  user
}) => ({
  user
})

export default connect(
  mapPropsToState,
  actions
)(View)
