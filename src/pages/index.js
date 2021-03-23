import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import InnerHTML from 'dangerously-set-html-content'
import Navbar from '../components/Navbar'
import FooterComponent from '../components/FooterComponent'
import HeadTags from '../components/HeadTags'
import HeaderComponent from '../components/HeaderComponent'
import Sidebar from '../components/Sidebar'
import MainArea from '../components/MainArea'
import checkAuthAtStartup from '../utils/auth/checkTokenValidity'
import actions from '../store/actions'
import resetGraphData from '../utils/graphVisualisation/resetGraphData'

const Index = ({
  addToObject,
  user,
  setStoreState
}) => {
  const customHtml = `
    <script>
        window.Userback = window.Userback || {};
        Userback.access_token = '29230|42198|CVJlhtfkaYN3J3xP2x200ghJ1';
        (function(d) {
            var s = d.createElement('script');s.async = true;
            s.src = 'https://static.userback.io/widget/v1.js';
            (d.head || d.body).appendChild(s);
        })(document);
    </script>
    <script>
      window._mfq = window._mfq || [];
      (function() {
        var mf = document.createElement("script");
        mf.type = "text/javascript"; mf.defer = true;
        mf.src = "//cdn.mouseflow.com/projects/17067ed4-6a87-41f9-b1f0-44249c9c1bfe.js";
        document.getElementsByTagName("head")[0].appendChild(mf);
      })();
    </script>
  `

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
  },
  [])

  return (
    <>
      <HeadTags
        title=""
        description={t('ontologyVisualisationDescription')}
      />

      {process.env.NEXT_PUBLIC_ADD_FEEDBACK === 'true' && <InnerHTML html={customHtml} />}

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
