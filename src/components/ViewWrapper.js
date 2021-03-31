import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import FooterComponent from './FooterComponent'
import HeadTags from './HeadTags'
import HeaderComponent from './HeaderComponent'
import Sidebar from './Sidebar'
import MainArea from './MainArea'
import actions from '../store/actions'
import { DYNAMIC_ROUTES, ROUTE_SEARCH } from '../constants/routes'
import { toDashedCase, turnToRoute } from '../constants/functions'

const ViewWrapper = ({
  user,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { query } = router
  const { slug } = query

  const isInitialMountCurrentGraph = useRef(true)

  useEffect(() => {
    if (isInitialMountCurrentGraph.current === true) {
      if (!slug || !DYNAMIC_ROUTES.includes(turnToRoute(toDashedCase(slug[0])))) {
        router.push(ROUTE_SEARCH)
        isInitialMountCurrentGraph.current = false
      }
    }
  }, [slug])

  return (
    <>
      <HeadTags
        title={t(slug ? slug[0] : '')}
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
  user: PropTypes.shape().isRequired
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
