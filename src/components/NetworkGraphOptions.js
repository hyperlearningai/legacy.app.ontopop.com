/* eslint react/no-array-index-key:0 */
/* eslint react/jsx-key:0 */
import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Checkbox } from 'primereact/checkbox'
import actions from '../store/actions'
import { SIDEBAR_VIEW_GRAPH_OPTIONS } from '../constants/views'
import { DEFAULT_HIDDEN_ELEMENT_PROPERTY } from '../constants/graph'
import setNetworkGraphOptions from '../utils/networkGraphOptions/setNetworkGraphOptions'
import HideElementsByPropertyForm from './HideElementsByPropertyForm'

const NetworkGraphOptions = ({
  currentGraph,
  graphData,
  updateStoreValue
}) => {
  const { t } = useTranslation()

  const {
    isUpperOntologyVisible,
    isSubClassEdgeVisible,
    isDatasetVisible,
    hiddenNodesProperties,
    hiddenEdgesProperties
  } = graphData[currentGraph]

  const [isUpperOntologyVisibleLocal, setUpperOntologyVisibleLocal] = useState(isUpperOntologyVisible)
  const [isSubClassEdgeVisibleLocal, setSubClassEdgeVisibleLocal] = useState(isSubClassEdgeVisible)
  const [isDatasetVisibleLocal, setDatasetVisibleLocal] = useState(isDatasetVisible)
  const [nodesProperties, setNodesProperties] = useState(hiddenNodesProperties)
  const [edgesProperties, setEdgesProperties] = useState(hiddenEdgesProperties)

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_GRAPH_OPTIONS)}
      </div>
      <div className="graph-options">
        <div className="graph-options-text">{t('chooseGraphOptions')}</div>

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

        <div className="graph-options-toggle p-col-12  m-t-10">
          <Checkbox
            id="dataset-checkbox"
            onChange={(e) => setDatasetVisibleLocal(e.checked)}
            checked={isDatasetVisibleLocal}
          />
          <label htmlFor="upper-ontology-checkbox" className="p-checkbox-label">
            {t('showDatasets')}
          </label>
        </div>

        <div className="graph-options-text">{t('hideElementsByProperties')}</div>

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
                  icon="pi pi-plus"
                  className="graph-options-button graph-options-button-add"
                  tooltip={t('add')}
                  iconPos="right"
                  tooltipOptions={{
                    position: 'top'
                  }}
                  onClick={() => {
                    if (Object.keys(nodesProperties).length === 0) return setNodesProperties({ 0: DEFAULT_HIDDEN_ELEMENT_PROPERTY })

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
              <div className="graph-options-button-wrapper">
                <Button
                  label={t('add')}
                  tooltip={t('add')}
                  className="graph-options-button graph-options-button-add"
                  iconPos="right"
                  tooltipOptions={{
                    position: 'top'
                  }}
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
              </div>
            </AccordionTab>
          </Accordion>
        </div>

        <div className="graph-options-button-wrapper">
          <Button
            tooltip={t('save')}
            id="network-graph-options-save"
            className="graph-options-button m-t-30"
            icon="pi pi-save"
            iconPos="right"
            label={t('show')}
            onClick={() => setNetworkGraphOptions({
              isUpperOntologyVisible: isUpperOntologyVisibleLocal,
              isSubClassEdgeVisible: isSubClassEdgeVisibleLocal,
              isDatasetVisible: isDatasetVisibleLocal,
              hiddenNodesProperties: nodesProperties,
              hiddenEdgesProperties: edgesProperties,
              updateStoreValue
            })}
          />
        </div>

      </div>
    </>
  )
}

NetworkGraphOptions.propTypes = {
  currentGraph: PropTypes.string.isRequired,
  graphData: PropTypes.shape().isRequired,
  updateStoreValue: PropTypes.func.isRequired,
}

const mapToProps = ({
  currentGraph,
  graphData
}) => ({
  currentGraph,
  graphData
})

export default connect(
  mapToProps,
  actions
)(NetworkGraphOptions)
