import {
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Accordion, AccordionTab } from 'primereact/accordion'
import actions from '../store/actions'
// import filterNodeProps from '../utils/filterNodeProps'
import getEdgesAndNodeProperties from '../utils/getEdgesAndNodeProperties'
import { SIDEBAR_VIEW_NODES_SELECTION } from '../constants/views'
import OntologyFilterByNodeProperties from './OntologyFilterByNodeProperties'
import OntologyFilterByEdgeProperties from './OntologyFilterByEdgeProperties'

const OntologyFilter = ({
  setStoreState,
  // classesFromApi,
  // objectPropertiesFromApi,
  // nodesIdsToDisplay,
  // edgesIdsToDisplay,
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    getEdgesAndNodeProperties({ setStoreState })

    // return () => filterNodeProps({
    //   searchFilterNode: '',
    //   searchFilterEdge: '',
    //   nodesIdsToDisplay,
    //   edgesIdsToDisplay,
    //   classesFromApi,
    //   objectPropertiesFromApi,
    //   setStoreState
    // })
  }, [])

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NODES_SELECTION)}
      </div>
      <div className="ontology-filter">
        <div className="accordion-demo">
          <div className="card">
            <Accordion>
              <AccordionTab header={t('filterNodesByNodeProps')}>
                <OntologyFilterByNodeProperties />
              </AccordionTab>

              <AccordionTab header={t('filterEdgesByEdgesProps')}>
                <OntologyFilterByEdgeProperties />
              </AccordionTab>

            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}

OntologyFilter.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  // classesFromApi: PropTypes.shape().isRequired,
  // objectPropertiesFromApi: PropTypes.shape().isRequired,
  // nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  // edgesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapToProps = ({
  graphData,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
}) => ({
  graphData,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
})

export default connect(
  mapToProps,
  actions
)(OntologyFilter)
