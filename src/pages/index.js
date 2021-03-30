import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import HeadTags from '../components/HeadTags'
import HeaderComponent from '../components/HeaderComponent'
import actions from '../store/actions'
import { ROUTE_SEARCH } from '../constants/routes'

const Index = ({
  user,
}) => {
  const { t } = useTranslation()

  const router = useRouter()

  // check if authenticated, otherwise redirect to login
  useEffect(() => router.push(ROUTE_SEARCH), [])

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
          </>
        )
      }

    </>
  )
}

Index.propTypes = {
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
)(Index)
