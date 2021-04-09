import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import checkAuthAtStartup from '../utils/auth/checkTokenValidity'
import actions from '../store/actions'
import startupActions from '../utils/graphVisualisation/startupActions'
import { ROUTE_LOGIN } from '../constants/routes'

const AuthCheck = ({
  updateStoreValue,
  user,
  pageProps
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

  useEffect(() => {
    if (user.email || user.isGuest) {
      startupActions({
        updateStoreValue,
        t
      })
    }
  },
  [user])

  useEffect(() => {
    if (pageProps.statusCode === 404) {
      router.push(ROUTE_LOGIN)
    }
  }, [pageProps.statusCode])

  return null
}

AuthCheck.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  pageProps: PropTypes.shape().isRequired,
}

const mapPropsToState = ({
  user
}) => ({
  user
})

export default connect(
  mapPropsToState,
  actions
)(AuthCheck)
