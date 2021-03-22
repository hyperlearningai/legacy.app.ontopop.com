/* eslint react/jsx-key:0 */
import React from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { SelectButton } from 'primereact/selectbutton'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { orderBy } from 'lodash'
import actions from '../store/actions'
import {
  DEFAULT_HIDDEN_ELEMENT_PROPERTY,
  DEFAULT_HIDDEN_ELEMENT_SUBPROPERTY,
  EDGE_PROPERTIES_DROPDOWN
} from '../constants/graph'

const HideElementsByPropertyForm = ({
  elementType,
  index,
  elementProperties,
  annotationProperties,
  setProperty,
  annotationPropertiesDatasets,
}) => {
  const { t } = useTranslation()

  const elementProperty = elementProperties[index]

  const {
    type,
    properties
  } = elementProperty

  const logicButtons = [{
    value: 'and',
    label: t('and'),
    icon: 'pi-plus'
  }, {
    value: 'or',
    label: t('or'),
    icon: 'pi-minus'
  }]

  const operationButtons = [{
    value: 'contains',
    label: t('contains')
  }, {
    value: 'equal',
    label: t('equal')
  }, {
    value: 'notContains',
    label: t('notContains')
  }, {
    value: 'notEqual',
    label: t('notEqual')
  }]

  const itemTemplate = (option) => (
    <span className="graph-options-selection-row-select-option">
      <i className={`pi ${option.icon}`} />
      {` ${option.label}`}
    </span>
  )

  const annotationPropertyList = elementType === 'node' ? orderBy([
    ...annotationProperties,
    ...annotationPropertiesDatasets
  ], ['label'], ['asc']) : EDGE_PROPERTIES_DROPDOWN

  return (
    <div className="graph-options-property-form">
      <div
        className="graph-options-select-button"
      >
        <label htmlFor={`logic-select-${index}`}>
          {t('chooseLogic')}
        </label>
        <SelectButton
          id={`logic-select-${index}`}
          className="logic-select"
          value={type}
          options={logicButtons}
          onChange={(e) => setProperty({
            ...elementProperties,
            [index]: {
              ...elementProperties[index],
              type: e.value
            }
          })}
          itemTemplate={itemTemplate}
        />
      </div>

      {
        Object.keys(properties).length > 0
        && Object.keys(properties).map((propertyIndex) => {
          const {
            property,
            operation,
            value
          } = properties[propertyIndex]

          return (
            <div
              className="graph-options-property-form-property"
            >
              <div className="graph-options-property-form-row m-t-10">
                <label htmlFor={`filter-${type}-${index}-${propertyIndex}`}>
                  {t('chooseFilter')}
                </label>

                <Dropdown
                  id={`filter-${type}-${index}-${propertyIndex}`}
                  value={property}
                  options={annotationPropertyList}
                  filter
                  onChange={(e) => setProperty({
                    ...elementProperties,
                    [index]: {
                      ...elementProperties[index],
                      properties: {
                        ...elementProperties[index].properties,
                        [propertyIndex]: {
                          ...elementProperties[index].properties[propertyIndex],
                          property: e.value
                        }
                      }
                    }
                  })}
                  className="property-select"
                  placeholder={t('selectProperty')}
                />
              </div>

              <div className="graph-options-property-form-row m-t-10">
                <Dropdown
                  value={operation}
                  className="operation-select"
                  options={operationButtons}
                  filter
                  onChange={(e) => setProperty({
                    ...elementProperties,
                    [index]: {
                      ...elementProperties[index],
                      properties: {
                        ...elementProperties[index].properties,
                        [propertyIndex]: {
                          ...elementProperties[index].properties[propertyIndex],
                          operation: e.value
                        }
                      }
                    }
                  })}
                  placeholder={t('selectLogic')}
                />
              </div>

              <div className="graph-options-property-form-row m-t-10">
                <InputText
                  className="property-text-input value-input"
                  value={value}
                  placeholder={t('insertText')}
                  onChange={(e) => setProperty({
                    ...elementProperties,
                    [index]: {
                      ...elementProperties[index],
                      properties: {
                        ...elementProperties[index].properties,
                        [propertyIndex]: {
                          ...elementProperties[index].properties[propertyIndex],
                          value: e.target.value
                        }
                      }
                    }
                  })}
                />
              </div>

              <div className="graph-options-property-form-row m-t-10">
                <div className="network-styling-property-form-row">
                  <span className="p-buttonset add-delete-buttons">
                    <Button
                      label={t('delete')}
                      tooltip={t('delete')}
                      tooltipOptions={{
                        position: 'top'
                      }}
                      className="p-button-warning delete-property"
                      onClick={() => {
                        const newProperties = JSON.parse(JSON.stringify(elementProperties))
                        delete newProperties[index].properties[propertyIndex]

                        if (Object.keys(newProperties[index].properties).length === 0) {
                          newProperties[index].properties = { 0: DEFAULT_HIDDEN_ELEMENT_SUBPROPERTY }
                        }

                        setProperty(newProperties)
                      }}
                    />

                    <Button
                      label={t('add')}
                      className="add-property"
                      onClick={() => {
                        const newProperties = JSON.parse(JSON.stringify(elementProperties))
                        const nextIndex = Object.keys(newProperties[index].properties).length

                        newProperties[index].properties[nextIndex] = DEFAULT_HIDDEN_ELEMENT_SUBPROPERTY

                        setProperty(newProperties)
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
          )
        })
      }

      <div className="graph-options-button-wrapper">
        <Button
          label={t('delete')}
          tooltip={t('delete')}
          tooltipOptions={{
            position: 'top'
          }}
          iconPos="right"
          className="graph-options-button graph-options-button-delete"
          icon="pi pi-trash"
          onClick={() => {
            const newProperties = JSON.parse(JSON.stringify(elementProperties))
            delete newProperties[index]

            setProperty(
              Object.keys(newProperties).length > 0
                ? newProperties
                : {
                  0: DEFAULT_HIDDEN_ELEMENT_PROPERTY
                }
            )
          }}
        />
      </div>

    </div>
  )
}

HideElementsByPropertyForm.propTypes = {
  setProperty: PropTypes.func.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
  annotationPropertiesDatasets: PropTypes.arrayOf(PropTypes.shape).isRequired,
  elementType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  elementProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  annotationProperties,
  annotationPropertiesDatasets
}) => ({
  annotationProperties,
  annotationPropertiesDatasets
})

export default connect(
  mapToProps,
  actions
)(HideElementsByPropertyForm)
