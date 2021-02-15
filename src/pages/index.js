import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import GraphVisualisationWrapper from '../components/GraphVisualisationWrapper'
import FooterComponent from '../components/FooterComponent'
import HeadTags from '../components/HeadTags'
import HeaderComponent from "../components/HeaderComponent";
import Sidebar from "../components/Sidebar";
import ReactNotification from "react-notifications-component";
import { withIronSession } from "next-iron-session";

const SESSION_ID = '251f5c831459-4b14-8fc9-2b4a4594aec4e6';
const COOKIE_NAME = 'HIGHWAYS_COOKIE';

export const getServerSideProps =withIronSession(
  async ({ req, res }) => {
    const user = req.session.get('user');

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    return {
      props: { user }
    };
  },
  {
    cookieName: COOKIE_NAME,
    cookieOptions: {
      secure: false
    },
    password: SESSION_ID
  }
);

const Index = ({ user }) => {
  const { t } = useTranslation()

  return (
    <>
      <HeaderComponent />
      <main className="main-view">

        <Sidebar />
        <div className="main-view-area">
          <HeadTags
            title=""
            description={t('ontologyVisualisationDescription')}
          />
          <Navbar />
          <GraphVisualisationWrapper />
          <FooterComponent />
        </div>

      </main>
      <ReactNotification />
    </>
  )
}

export default Index
