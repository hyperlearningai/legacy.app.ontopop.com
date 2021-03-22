import React, { useEffect, useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ColorPicker } from 'primereact/colorpicker'
import { SelectButton } from 'primereact/selectbutton'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Slider } from 'primereact/slider'
import { Dropdown } from 'primereact/dropdown'
import actions from '../store/actions'
import updateStylingByProperties from '../utils/networkStyling/updateStylingByProperties'
import { FILTER_TYPE_OPTIONS, NODE_STYLING_PROPERTIES } from '../constants/graph'

const NetworkStylingNodeByPropertyForm = ({
  setStoreState,
  index,
  stylingProperty,
  isDeleteAvailable,
  annotationProperties,
}) => {
  const { t } = useTranslation()

  const [stylingPropertyObject, setStylingPropertyObject] = useState(stylingProperty)

  useEffect(() => {
    setStylingPropertyObject(stylingProperty)
  }, [stylingProperty])

  const filterTypeOptions = FILTER_TYPE_OPTIONS.map((value) => ({
    label: t(value),
    value
  }))

  const nodeStylingProperties = Object.keys(NODE_STYLING_PROPERTIES).map((value) => ({
    label: t(value),
    value
  }))

  return (
    <div className="network-styling-property-form">
      <div className="network-styling-property-form-row">
        <h4 className="m-t-0 m-b-0">{t('ifNodeHasProperty')}</h4>
        <Dropdown
          value={stylingPropertyObject.property}
          options={annotationProperties}
          filter
          onChange={(e) => setStylingPropertyObject({
            ...stylingPropertyObject,
            property: e.value
          })}
          className="m-t-10"
          placeholder={t('selectProperty')}
        />
      </div>

      {
        stylingPropertyObject.property && (
          <>
            <div className="network-styling-property-form-row">
              <SelectButton
                value={stylingPropertyObject.filterType}
                options={filterTypeOptions}
                onChange={(e) => setStylingPropertyObject({
                  ...stylingPropertyObject,
                  filterType: e.value
                })}
              />
            </div>

            <div className="network-styling-property-form-row">
              <InputText
                className="property-text-input"
                value={stylingPropertyObject.filterValue}
                onChange={(e) => setStylingPropertyObject({
                  ...stylingPropertyObject,
                  filterValue: e.target.value
                })}
              />
            </div>
          </>
        )
      }

      {
        stylingPropertyObject.filterValue
        && stylingPropertyObject.filterValue.length > 0 && (
          <>
            <div className="network-styling-property-form-row">
              <h4 className="m-t-0 m-b-0">{t('setNodeStyle')}</h4>
              <Dropdown
                value={stylingPropertyObject.styleType}
                options={nodeStylingProperties}
                filter
                onChange={(e) => setStylingPropertyObject({
                  ...stylingPropertyObject,
                  styleValue: undefined,
                  styleType: e.value
                })}
                className="m-t-10"
                placeholder={t('selectStyle')}
              />
            </div>

            {
              stylingPropertyObject.styleType
              && NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].type === 'number'
              && (
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      value={stylingPropertyObject.styleValue}
                      onChange={(e) => setStylingPropertyObject({
                        ...stylingPropertyObject,
                        styleValue: e.value
                      })}
                      min={NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].min || 1}
                      step={NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].step || 1}
                      max={NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].max || 1000}
                    />
                    <Slider
                      min={1}
                      max={100}
                      step={0.5}
                      id="stylingNodeBorder"
                      value={stylingPropertyObject.styleValue}
                      onChange={(e) => setStylingPropertyObject({
                        ...stylingPropertyObject,
                        styleValue: e.value
                      })}
                    />
                  </div>
                </div>
              )
            }

            {
              stylingPropertyObject.styleType
              && NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].type === 'color'
              && (
                <div className="network-styling-property-form-row">
                  <div className="m-b-10 colorpicker">
                    <ColorPicker
                      value={stylingPropertyObject.styleValue ? stylingPropertyObject.styleValue.replace('#', '') : undefined}
                      onChange={(e) => {
                        const styleValue = `#${e.value}`
                        return setStylingPropertyObject({
                          ...stylingPropertyObject,
                          styleValue
                        })
                      }}
                    />
                    <span>
                      {t(NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].label)}
                    </span>
                  </div>
                </div>
              )
            }

            {
              stylingPropertyObject.styleType
              && NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].type === 'dropdown'
              && (
                <div className="network-styling-property-form-row">
                  <Dropdown
                    value={stylingPropertyObject.styleValue}
                    defaultValue={NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].defaultValue}
                    options={
                      NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].needsI18n
                        ? NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].options.map(
                          (value) => ({
                            label: t(value),
                            value
                          })
                        ) : NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].options
                    }
                    filter
                    onChange={(e) => setStylingPropertyObject({
                      ...stylingPropertyObject,
                      styleValue: e.value
                    })}
                    className="m-t-10"
                    placeholder={t(NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].placeholder)}
                  />
                </div>
              )
            }

            {
              stylingPropertyObject.styleType
              && NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].type === 'selectButton'
              && (
                <div className="network-styling-property-form-row">
                  <SelectButton
                    value={stylingPropertyObject.styleValue}
                    defaultValue={NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].defaultValue}
                    options={
                      NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].needsI18n
                        ? NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].options.map(
                          (value) => ({
                            label: t(value),
                            value
                          })
                        ) : NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].options
                    }
                    itemTemplate={NODE_STYLING_PROPERTIES[stylingPropertyObject.styleType].itemTemplate}
                    onChange={(e) => setStylingPropertyObject({
                      ...stylingPropertyObject,
                      styleValue: e.value
                    })}
                  />
                </div>
              )
            }
          </>
        )
      }

      <div className="network-styling-property-form-row">
        <span className="p-buttonset">
          {
            isDeleteAvailable && (
              <Button
                aria-label={t('delete')}
                label={t('delete')}
                tooltip={t('delete')}
                tooltipOptions={{
                  position: 'top'
                }}
                className="p-button-warning delete-property-style"
                icon="pi pi-trash"
                onClick={() => updateStylingByProperties({
                  type: 'node',
                  operation: 'delete',
                  index,
                  stylingPropertyObject,
                  setStoreState
                })}
              />
            )
          }

          <Button
            aria-label={t('delete')}
            label={t('save')}
            tooltip={t('save')}
            tooltipOptions={{
              position: 'top'
            }}
            icon="pi pi-check"
            className="save-property-style"
            disabled={!stylingPropertyObject.styleValue
              || stylingPropertyObject.styleValue.length === 0
              || stylingPropertyObject.styleValue === 0}
            onClick={() => updateStylingByProperties({
              type: 'node',
              operation: 'save',
              index,
              stylingPropertyObject,
              setStoreState
            })}
          />
        </span>
      </div>

    </div>
  )
}

NetworkStylingNodeByPropertyForm.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
  isDeleteAvailable: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  stylingProperty: PropTypes.shape().isRequired,
}

const mapToProps = ({
  annotationProperties,
}) => ({
  annotationProperties
})

export default connect(
  mapToProps,
  actions
)(NetworkStylingNodeByPropertyForm)
