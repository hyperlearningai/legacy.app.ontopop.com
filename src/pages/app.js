import { useTranslation } from 'react-i18next'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import FooterComponent from '../components/FooterComponent'
import HeadTags from '../components/HeadTags'
import HeaderComponent from '../components/HeaderComponent'
import Sidebar from '../components/Sidebar'
import MainArea from '../components/MainArea'
import actions from '../store/actions'

const Index = ({
  user,
}) => {
  const { t } = useTranslation()

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

Index.propTypes = {
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
)(Index)
