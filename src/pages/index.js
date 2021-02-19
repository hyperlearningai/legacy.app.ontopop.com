import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import GraphVisualisation from '../components/GraphVisualisation'
import FooterComponent from '../components/FooterComponent'
import HeadTags from '../components/HeadTags'
import HeaderComponent from '../components/HeaderComponent'
import Sidebar from '../components/Sidebar'
import checkAuthAtStartup from '../utils/auth/checkTokenValidity'
import actions from '../store/actions'
import resetGraphData from '../utils/graphVisualisation/resetGraphData'

const Index = ({
  addToObject,
  user,
  setStoreState
}) => {
  const { t } = useTranslation()

  const router = useRouter()

  // check if authenticated, otherwise redirect to login
  useEffect(() => {
    if (!user.isGuest && user.email === '') {
      checkAuthAtStartup({
        router,
        addToObject
      })
    }

    return () => resetGraphData({
      setStoreState
    })
  }, [])

  return (
    <>
      <HeadTags
        title=""
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
                <GraphVisualisation />
                <FooterComponent />
              </div>

            </main>
          </>
        )
      }

    </>
  )
}

Index.propTypes = {
  addToObject: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  setStoreState: PropTypes.func.isRequired,
}

const mapPropsToState = ({
  user
}) => ({
  user
})

export default connect(
  mapPropsToState,
  actions
)(Index)
