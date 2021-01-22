import {
  useState,
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { InputText } from 'primereact/inputtext'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { MultiSelect } from 'primereact/multiselect'
import actions from '../store/actions'
import { SIDEBAR_VIEW_NODES_FILTER } from '../constants/views'
import searchElement from '../utils/searchElement'

const OntologyFilter = ({
  setStoreState,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay
}) => {
  const { t } = useTranslation()
  const [value1, setValue1] = useState('')
  const [selectedNodeProps, setSelectedNodeProps] = useState(null)
  const [selectedEdgeProps, setSelectedEdgeProps] = useState(null)
  const nodeProps = [
    { name: 'About', code: 'about' },
    { name: 'Comment', code: 'comment' },
    { name: 'Definition', code: 'definition' },
    { name: 'Example', code: 'example' },
    { name: 'Label', code: 'label' }
  ]

  const edgeProps = [
    { name: 'About', code: 'about' },
    { name: 'Comment', code: 'comment' },
    { name: 'Definition', code: 'definition' },
    { name: 'Example', code: 'example' },
    { name: 'Label', code: 'label' }
  ]

  const nodePropTemplate = (option) => {
    return (
      <div className="node-item">
        <div>{option.name}</div>
      </div>
    )
  }

  const edgePropTemplate = (option) => {
    return (
      <div className="edge-item">
        <div>{option.name}</div>
      </div>
    )
  }

  const selectedNodesOptions = (option) => {
    if (option) {
      return (
        <div className="node-item node-item-value">
          <div>{option.name}</div>
        </div>
      )
    }

    return t('allNodeProperties')
  }

  const selectedEdgesOptions = (option) => {
    if (option) {
      return (
        <div className="edge-item edge-item-value">
          <div>{option.name}</div>
        </div>
      )
    }

    return t('allEdgeProperties')
  }

  useEffect(() => () => searchElement({
    search: '',
    nodesIdsToDisplay,
    edgesIdsToDisplay,
    classesFromApi,
    objectPropertiesFromApi,
    setStoreState
  }), [])

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NODES_FILTER)}
      </div>
      <div className="ontology-filter">
        <div className="accordion-demo">
          <div className="card">
            <Accordion>
              <AccordionTab header={t('filterNodesByNodeProps')}>
                <div className="p-b-10">
                  <label htmlFor="filterNodeProps">{t('selectNodeProperties')}</label>
                </div>
                <div className="p-b-10">
                  <MultiSelect
                    id="filterNodeProps"
                    value={selectedNodeProps}
                    options={nodeProps}
                    onChange={(e) => setSelectedNodeProps(e.value)}
                    optionLabel="name"
                    placeholder={t('allNodeProperties')}
                    filter
                    className="multiselect-custom"
                    itemTemplate={nodePropTemplate}
                    selectedItemTemplate={selectedNodesOptions}
                  />
                </div>
                <div className="p-b-10">
                  <label htmlFor="filterNodePropsString">{t('searchInputText')}</label>
                </div>
                <div className="p-input-icon-right freetext-search-input">
                  <i className="pi pi-search" />
                  <InputText
                    id="filterNodePropsString"
                    value={value1}
                    placeholder={t('freeNodeSearchInputPlaceholder')}
                    onChange={(e) => {
                      setValue1(e.target.value)
                      // searchElement({
                      //   search: e.target.value,
                      //   nodesIdsToDisplay,
                      //   edgesIdsToDisplay,
                      //   classesFromApi,
                      //   objectPropertiesFromApi,
                      //   setStoreState
                      // })
                    }}
                  />

                </div>

                <p>{t('filterNodesDescription')}</p>
              </AccordionTab>
              <AccordionTab header={t('filterEdgesByEdgesProps')}>
                <div className="p-b-10">
                  <label htmlFor="filterEdgeProps">{t('selectEdgeProperties')}</label>
                </div>
                <div className="p-b-10">
                  <MultiSelect
                    id="filterEdgeProps"
                    value={selectedEdgeProps}
                    options={edgeProps}
                    onChange={(e) => setSelectedEdgeProps(e.value)}
                    optionLabel="name"
                    placeholder={t('allEdgeProperties')}
                    filter
                    className="multiselect-custom"
                    itemTemplate={edgePropTemplate}
                    selectedItemTemplate={selectedEdgesOptions}
                  />
                </div>
                <div className="p-b-10">
                    <label htmlFor="filterEdgePropsString">{t('searchInputText')}</label>
                </div>
                <div className="p-input-icon-right freetext-search-input">
                  <i className="pi pi-search" />

                  <InputText
                    id="filterEdgePropsString"
                    value={value1}
                    placeholder={t('freeEdgeSearchInputPlaceholder')}
                    onChange={(e) => {
                      setValue1(e.target.value)
                      // searchElement({
                      //   search: e.target.value,
                      //   nodesIdsToDisplay,
                      //   edgesIdsToDisplay,
                      //   classesFromApi,
                      //   objectPropertiesFromApi,
                      //   setStoreState
                      // })
                    }}
                  />

                </div>

                <p>{t('filterEdgesDescription')}</p>
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
  classesFromApi: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  edgesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapToProps = ({
  graphData,
  currentGraph,
  classesFromApi,
}) => ({
  graphData,
  currentGraph,
  classesFromApi,
})

export default connect(
  mapToProps,
  actions
)(OntologyFilter)
