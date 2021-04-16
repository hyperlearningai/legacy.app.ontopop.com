/* eslint react/no-array-index-key:0 */
/* eslint react/jsx-key:0 */
import {useState} from 'react'
import {connect} from 'redux-zero/react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'
import {Button} from 'primereact/button'
import {Accordion, AccordionTab} from 'primereact/accordion'
import {Checkbox} from 'primereact/checkbox'
import actions from '../store/actions'
import {SIDEBAR_VIEW_GRAPH_OPTIONS} from '../constants/views'
import {DEFAULT_HIDDEN_ELEMENT_PROPERTY} from '../constants/graph'
import setNetworkGraphOptions from '../utils/networkGraphOptions/setNetworkGraphOptions'
import HideElementsByPropertyForm from './HideElementsByPropertyForm'

const NetworkGraphOptions = ({
  currentGraph,
  graphData,
  updateStoreValue,
  physicsRepulsion,
  physicsHierarchicalView,
  isPhysicsOn
}) => {
  const {t} = useTranslation()

  const {
    isUserDefinedNodeVisible,
    isOrphanNodeVisible,
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible,
    hiddenNodesProperties,
    hiddenEdgesProperties
  } = graphData[currentGraph]

  const [isUserDefinedNodeVisibleLocal, setUserDefinedNodeVisibleLocal] = useState(isUserDefinedNodeVisible)
  const [isOrphanNodeVisibleLocal, setOrphanNodeVisibleLocal] = useState(isOrphanNodeVisible)
  const [isUpperOntologyVisibleLocal, setUpperOntologyVisibleLocal] = useState(isUpperOntologyVisible)
  const [isSubClassEdgeVisibleLocal, setSubClassEdgeVisibleLocal] = useState(isSubClassEdgeVisible)
  const [isDatasetVisibleLocal, setDatasetVisibleLocal] = useState(isDatasetVisible)
  const [nodesProperties, setNodesProperties] = useState(hiddenNodesProperties)
  const [edgesProperties, setEdgesProperties] = useState(hiddenEdgesProperties)

  return (
    <>
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_GRAPH_OPTIONS)}
      </h1>

      <div className="graph-options">

        <div className="graph-options-text">{t('chooseGraphOptions')}</div>
      <div className="sidebar-main-body graph-options">
        <div className="sidebar-main-body-info">
          {t('chooseGraphOptions')}
        </div>

        <div className="graph-options-toggle p-col-12">
          <Checkbox
            id="user-defined-nodes-checkbox"
            onChange={(e) => setUserDefinedNodeVisibleLocal(e.checked)}
            checked={isUserDefinedNodeVisibleLocal}
          />
          <label htmlFor="user-defined-nodes-checkbox" className="p-checkbox-label">
            {t('showUserDefinedNodes')}
          </label>
        </div>

        <div className="graph-options-toggle p-col-12">
          <Checkbox
            id="orphan-nodes-checkbox"
            onChange={(e) => setOrphanNodeVisibleLocal(e.checked)}
            checked={isOrphanNodeVisibleLocal}
          />
          <label htmlFor="orphan-nodes-checkbox" className="p-checkbox-label">
            {t('showOrphanNodes')}
          </label>
        </div>

        <div className="graph-options-physics">
          <div className="graph-options-physics-input">
            <div className="label">
              {t('physics')}
            </div>
            <div className="graph-options-physics-buttons">
              <Button
                aria-label={t(isPhysicsOn ? 'physicsOff' : 'physicsOn')}
                tooltip={t(isPhysicsOn ? 'physicsOff' : 'physicsOn')}
                tooltipOptions={{position: 'top'}}
                className={isPhysicsOn ? 'graph-options-physics-buttons-button-selected' : ''}
                onClick={() => updateStoreValue(['isPhysicsOn'], OPERATION_TYPE_UPDATE, !isPhysicsOn)}
              >
                <AiOutlinePoweroff/>
              </Button>
            </div>
          </div>

          <div className="graph-options-physics-input">
            <div className="label">
              {t('positioning')}
            </div>
            <div className="graph-options-physics-buttons">
              <Button
                aria-label={t('hierachicalView')}
                tooltip={t('hierachicalView')}
                tooltipOptions={{position: 'top'}}
                className={physicsHierarchicalView ? 'graph-options-physics-buttons-button-selected' : ''}
                onClick={() => updateStoreValue(['physicsHierarchicalView'], OPERATION_TYPE_UPDATE, true)}
              >
                <FaSitemap/>
              </Button>
              <Button
                aria-label={t('gravitationalView')}
                tooltip={t('gravitationalView')}
                tooltipOptions={{position: 'top'}}
                className={!physicsHierarchicalView ? 'graph-options-physics-buttons-button-selected' : ''}
                onClick={() => updateStoreValue(['physicsHierarchicalView'], OPERATION_TYPE_UPDATE, false)}
              >
                <SiAtom/>
              </Button>
            </div>
          </div>

          <div className="graph-options-physics-input">
            <div className="label">
              {t('repulsion')}
            </div>
            <div className="graph-options-physics-buttons">
              <Button
                aria-label={t('gravitationalView')}
                tooltip={t('enableRepulsion')}
                tooltipOptions={{position: 'top'}}
                className={physicsRepulsion ? 'graph-options-physics-buttons-button-selected' : ''}
                onClick={() => updateStoreValue(['physicsRepulsion'], OPERATION_TYPE_UPDATE, true)}
              >
                <IoFootballOutline/>
              </Button>
              <Button
                aria-label={t('disableRepulsion')}
                tooltip={t('disableRepulsion')}
                tooltipOptions={{position: 'top'}}
                className={!physicsRepulsion ? 'graph-options-physics-buttons-button-selected' : ''}
                onClick={() => updateStoreValue(['physicsRepulsion'], OPERATION_TYPE_UPDATE, false)}
              >
                <IoGitNetworkSharp/>
              </Button>
            </div>
          </div>
        </div>

        <div className="graph-options-toggle p-col-12">
          <Checkbox
            id="upper-ontology-checkbox"
            onChange={(e) => setUpperOntologyVisibleLocal(e.checked)}
            checked={isUpperOntologyVisibleLocal}
          />
          <label htmlFor="upper-ontology-checkbox" className="p-checkbox-label">
            {t('showUpperOntologyLayers')}
          </label>
        </div>

        <div className="graph-options-toggle p-col-12  m-t-10">
          <Checkbox
            id="subclass-checkbox"
            onChange={(e) => setSubClassEdgeVisibleLocal(e.checked)}
            checked={isSubClassEdgeVisibleLocal}
          />
          <label htmlFor="overlay-checkbox" className="p-checkbox-label">
            {t('showSubclassRelationships')}
          </label>
        </div>

        <div className="graph-options-toggle p-col-12 m-t-10">
          <Checkbox
            id="dataset-checkbox"
            onChange={(e) => setDatasetVisibleLocal(e.checked)}
            checked={isDatasetVisibleLocal}
          />
          <label htmlFor="upper-ontology-checkbox" className="p-checkbox-label">
            {t('showDatasets')}
          </label>
        </div>

        <div
          className="sidebar-main-body-subtitle m-t-40"
        >
          {t('hideElementsByProperties')}
        </div>

        <div
          className="graph-options-selection"
        >
          <Accordion>
            <AccordionTab
              id="nodes-accordion"
              header={t('nodes')}
            >
              <Accordion>
                {
                  Object.keys(nodesProperties).length > 0
                  && Object.keys(nodesProperties).map((nodePropertyIndex) => (
                    <AccordionTab
                      key={nodePropertyIndex.toString()}
                      header={`${t('filter')} ${parseInt(nodePropertyIndex) + 1}`}
                    >
                      <HideElementsByPropertyForm
                        index={parseInt(nodePropertyIndex)}
                        elementProperties={nodesProperties}
                        elementType="node"
                        setProperty={setNodesProperties}
                      />
                    </AccordionTab>
                  ))
                }
              </Accordion>
              <div className="graph-options-button-wrapper">
                <Button
                  label={t('add')}
                  aria-label={t('add')}
                  icon="pi pi-plus"
                  className="sidebar-button-primary graph-options-button graph-options-button-add"
                  iconPos="right"
                  onClick={() => {
                    if (Object.keys(nodesProperties).length === 0) return setNodesProperties({0: DEFAULT_HIDDEN_ELEMENT_PROPERTY})

                    const nextIndex = Object.keys(nodesProperties).length

                    setNodesProperties({
                      ...nodesProperties,
                      [nextIndex]: DEFAULT_HIDDEN_ELEMENT_PROPERTY
                    })
                  }}
                />
              </div>
            </AccordionTab>
            <AccordionTab
              id="edges-accordion"
              header={t('edges')}
            >
              <Accordion>
                {
                  Object.keys(edgesProperties).length > 0
                  && Object.keys(edgesProperties).map((edgePropertyIndex) => (
                    <AccordionTab
                      header={`${t('filter')} ${parseInt(edgePropertyIndex) + 1}`}
                    >
                      <HideElementsByPropertyForm
                        index={parseInt(edgePropertyIndex)}
                        elementProperties={edgesProperties}
                        elementType="edge"
                        setProperty={setEdgesProperties}
                      />
                    </AccordionTab>
                  ))
                }
              </Accordion>

              <Button
                label={t('add')}
                aria-label={t('add')}
                className="sidebar-button-primary graph-options-button graph-options-button-add"
                iconPos="right"
                icon="pi pi-plus"
                onClick={() => {
                  if (Object.keys(edgesProperties).length === 0) return setEdgesProperties({ 0: DEFAULT_HIDDEN_ELEMENT_PROPERTY })

                  const nextIndex = Object.keys(edgesProperties).length

                  setEdgesProperties({
                    ...edgesProperties,
                    [nextIndex]: DEFAULT_HIDDEN_ELEMENT_PROPERTY
                  })
                }}
              />

            </AccordionTab>
          </Accordion>
        </div>

        <Button
          id="network-graph-options-save"
          className="sidebar-button-primary m-t-50"
          icon="pi pi-arrow-right"
          iconPos="right"
          label={t('apply')}
          aria-label={t('apply')}
          onClick={() => setNetworkGraphOptions({
            isUserDefinedNodeVisible: isUserDefinedNodeVisibleLocal,
            isOrphanNodeVisible: isOrphanNodeVisibleLocal,
            isUpperOntologyVisible: isUpperOntologyVisibleLocal,
            isSubClassEdgeVisible: isSubClassEdgeVisibleLocal,
            isDatasetVisible: isDatasetVisibleLocal,
            hiddenNodesProperties: nodesProperties,
            hiddenEdgesProperties: edgesProperties,
            updateStoreValue
          })}
        />

      </div>
    </>
  )
}

NetworkGraphOptions.propTypes = {
  currentGraph: PropTypes.string.isRequired,
  graphData: PropTypes.shape().isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  isPhysicsOn: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
}

const mapToProps = ({
  currentGraph,
  graphData,
  physicsRepulsion,
  physicsHierarchicalView,
  isPhysicsOn
}) => ({
  currentGraph,
  graphData,
  physicsRepulsion,
  physicsHierarchicalView,
  isPhysicsOn
})

export default connect(
  mapToProps,
  actions
)(NetworkGraphOptions)
