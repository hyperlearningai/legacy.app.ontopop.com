import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { SelectButton } from 'primereact/selectbutton'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { SIDEBAR_VIEW_VERSIONING } from '../constants/views'
import actions from '../store/actions'

const EditOntology = ({
  selectedGraphVersion,
  graphVersions
}) => {
  const { t } = useTranslation()

  const [mode, setMode] = useState('edit')
  const [graph, setGraph] = useState(selectedGraphVersion)
  const [operation, setOperation] = useState('add')
  const [type, setType] = useState('node')
  const [graphName, setGraphName] = useState('')
  const [isCurrent, setCurrent] = useState(false)

  const newEditButtons = [{
    label: t('edit'),
    value: 'edit',
    icon: 'pi-pencil'
  }, {
    value: 'new',
    label: t('new'),
    icon: 'pi-file'
  }]

  const typeButtons = [{
    label: t('node'),
    value: 'node',
    icon: 'pi-circle-off'
  }, {
    value: 'edge',
    label: t('edge'),
    icon: 'pi-arrow-right'
  }]

  const operationButtons = [{
    value: 'add',
    label: t('add'),
    icon: 'pi-plus'
  }, {
    value: 'update',
    label: t('update'),
    icon: 'pi-pencil'
  }, {
    value: 'delete',
    label: t('delete'),
    icon: 'pi-times'
  }]

  const itemTemplate = (option) => (
    <span className="versioning-row-select-option">
      <i className={`pi ${option.icon}`} />
      {` ${option.label}`}
    </span>
  )

  const availableGraphVersions = Object.keys(graphVersions).map((graphVersion) => ({
    label: graphVersion,
    value: graphVersion
  }))

  return (
    <>
      <div className="sidebar-main-title">
        { t(SIDEBAR_VIEW_VERSIONING)}
      </div>
      <div className="versioning">
        <div
          className="versioning-row"
        >
          <SelectButton
            value={mode}
            options={newEditButtons}
            onChange={(e) => setMode(e.value)}
            itemTemplate={itemTemplate}
          />
        </div>

        {
        mode === 'edit' && (
          <div
            className="versioning-row"
          >
            <label htmlFor="graph-select">
              {t('chooseGraphVersion')}
            </label>

            <Dropdown
              id="graph-select"
              value={graph}
              options={availableGraphVersions}
              onChange={(e) => setGraph(e.value)}
              placeholder={t('selectGraph')}
            />
          </div>
        )
      }

        {
          mode === 'new' && (
            <>
              <div
                className="versioning-row"
              >
                <label htmlFor="graph-name">
                  {t('insertGraphName')}
                </label>

                <InputText
                  id="graph-name"
                  value={graphName}
                  placeholder={t('insertName')}
                  onChange={(e) => setGraphName(e.target.value)}
                />
              </div>

              <div
                className="versioning-row"
              >
                <label htmlFor="from-graph-select">
                  {t('fromGraphVersion')}
                </label>
                <Dropdown
                  id="from-graph-select"
                  value={graph}
                  options={availableGraphVersions}
                  onChange={(e) => setGraph(e.value)}
                  placeholder={t('selectGraph')}
                />
              </div>
            </>
          )
        }

        <div
          className="versioning-row"
        >
          <label htmlFor="operation-select">
            {t('chooseOperation')}
          </label>
          <SelectButton
            id="operation-select"
            value={operation}
            options={operationButtons}
            onChange={(e) => setOperation(e.value)}
            itemTemplate={itemTemplate}
          />
        </div>

        <div
          className="versioning-row"
        >
          <label htmlFor="type-select">
            {t('chooseType')}
          </label>
          <SelectButton
            id="type-select"
            value={type}
            options={typeButtons}
            onChange={(e) => setType(e.value)}
            itemTemplate={itemTemplate}
          />
        </div>

        <div
          className="versioning-row inline"
        >
          <Checkbox
            inputId="set-current"
            onChange={() => setCurrent(!isCurrent)}
            checked={isCurrent}
          />
          <label
            htmlFor="set-curret"
            className="p-checkbox-label"
          >
            {t('setAsCurrentGraph')}
          </label>
        </div>

        <div className="versioning-row">
          <Button
            className="go-button"
            tooltip={`${t('go')}`}
            onClick={() => {}}
            label={t('go')}
            icon="pi pi-chevron-right"
            iconPos="right"
          />
        </div>
      </div>
    </>
  )
}

EditOntology.propTypes = {
  selectedGraphVersion: PropTypes.string.isRequired,
  graphVersions: PropTypes.shape().isRequired,
}

const mapToProps = ({
  selectedGraphVersion,
  graphVersions
}) => ({
  selectedGraphVersion,
  graphVersions
})

export default connect(
  mapToProps,
  actions
)(EditOntology)
