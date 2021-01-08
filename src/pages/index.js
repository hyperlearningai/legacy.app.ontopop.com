import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import MainView from '../components/MainView'
import HeadTags from '../components/HeadTags'

const Index = () => {
  const { t } = useTranslation()

  return (
    <>
      <HeadTags
        title=""
        description={t('ontologyVisualisationDescription')}
      />
      <Navbar />
      <MainView />
    </>
  )
}

export default Index
