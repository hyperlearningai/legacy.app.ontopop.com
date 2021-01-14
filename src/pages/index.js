import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import GraphVisualisationWrapper from '../components/GraphVisualisationWrapper'
import FooterComponent from '../components/FooterComponent'
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
      <GraphVisualisationWrapper />
      <FooterComponent />
    </>
  )
}

export default Index
