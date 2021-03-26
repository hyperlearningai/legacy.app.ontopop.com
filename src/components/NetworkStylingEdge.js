import React, { useEffect, useRef } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { ColorPicker } from 'primereact/colorpicker'
import { SelectButton } from 'primereact/selectbutton'
import { Slider } from 'primereact/slider'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { v4 } from 'uuid'
import actions from '../store/actions'
import NetworkStylingEdgeByPropertyForm from './NetworkStylingEdgeByPropertyForm'
import {
  EDGE_ALIGNMENT_OPTIONS,
  EDGE_LINE_STYLE_OPTIONS,
  EDGE_LINE_STYLE_TEMPLATE,
  EDGE_PROPERTIES_DROPDOWN
} from '../constants/graph'
import setEdgesStyle from '../utils/networkStyling/setEdgesStyle'
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const NetworkStylingEdge = ({
  updateStoreValue,
  globalEdgeStyling,
  userDefinedEdgeStyling,
  stylingEdgeByProperty,
}) => {
  const isInitialMount = useRef(true)

  const { t } = useTranslation()

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setEdgesStyle()
    }
  },
  [
    globalEdgeStyling,
    userDefinedEdgeStyling,
    stylingEdgeByProperty
  ])

  const captionAlignmentOptions = EDGE_ALIGNMENT_OPTIONS.map((shape) => ({
    label: t(shape),
    value: shape
  }))

  return (
    <Accordion>
      <AccordionTab header={t('edgeStyling')}>
        <Accordion>
          <AccordionTab header={t('edgeStylingGlobal')}>
            <Accordion>
              <AccordionTab header={t('stylingEdgeLength')}>
                <div className="network -styling-input">
                  <h4 className="m-t-5 m-b-10">{t('edgeLenghtOnlyWithPhysicsOn')}</h4>
                  <div className="network -styling-item-input">
                    <InputNumber
                      id="global-edge-length"
                      value={globalEdgeStyling.stylingEdgeLength}
                      onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeLength'], OPERATION_TYPE_UPDATE, parseInt(e.value))}
                    />
                    <Slider
                      min={1}
                      max={1000}
                      step={1}
                      value={globalEdgeStyling.stylingEdgeLength}
                      onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeLength'], OPERATION_TYPE_UPDATE, parseInt(e.value))}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeWidth')}>
                <InputNumber
                  id="global-edge-width"
                  value={globalEdgeStyling.stylingEdgeWidth}
                  onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeWidth'], OPERATION_TYPE_UPDATE, parseInt(e.value))}
                />
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={globalEdgeStyling.stylingEdgeWidth}
                  onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeWidth'], OPERATION_TYPE_UPDATE, parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeLineColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-edge-color-line"
                    value={globalEdgeStyling.stylingEdgeLineColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeLineColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-edge-color-line-highlight"
                    value={globalEdgeStyling.stylingEdgeLineColorHighlight.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeLineColorHighlight'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColorHighlight')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-edge-color-line-hover"
                    value={globalEdgeStyling.stylingEdgeLineColorHover.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeLineColorHover'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColorHover')}
                  </span>
                </div>
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeLineStyle')}>
                <SelectButton
                  id="global-edge-line-style"
                  value={globalEdgeStyling.stylingEdgeLineStyle}
                  options={EDGE_LINE_STYLE_OPTIONS}
                  onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeLineStyle'], OPERATION_TYPE_UPDATE, e.value)}
                  itemTemplate={EDGE_LINE_STYLE_TEMPLATE}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextSize')}>
                <InputNumber
                  id="global-edge-text-size"
                  value={globalEdgeStyling.stylingEdgeTextSize}
                  onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeTextSize'], OPERATION_TYPE_UPDATE, parseInt(e.value))}
                />
                <Slider
                  min={1}
                  max={200}
                  step={1}
                  value={globalEdgeStyling.stylingEdgeTextSize}
                  onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeTextSize'], OPERATION_TYPE_UPDATE, parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-edge-text-color"
                    value={globalEdgeStyling.stylingEdgeTextColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeTextColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeTextColor')}
                  </span>
                </div>
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextAlign')}>
                <SelectButton
                  id="global-edge-text-align"
                  value={globalEdgeStyling.stylingEdgeTextAlign}
                  options={captionAlignmentOptions}
                  onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeTextAlign'], OPERATION_TYPE_UPDATE, e.value)}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeCaptionProperty')}>
                <Dropdown
                  ariaLabel="global-edge-caption-property"
                  id="global-edge-caption-property"
                  value={globalEdgeStyling.stylingEdgeCaptionProperty}
                  options={EDGE_PROPERTIES_DROPDOWN}
                  filter
                  onChange={(e) => updateStoreValue(['globalEdgeStyling', 'stylingEdgeCaptionProperty'], OPERATION_TYPE_UPDATE, e.value)}
                  className="m-t-10"
                  placeholder={t('selectProperty')}
                />
              </AccordionTab>
            </Accordion>
          </AccordionTab>

          <AccordionTab header={t('edgeStylingUserDefined')}>
            <Accordion>
              <AccordionTab header={t('stylingEdgeWidth')}>
                <InputNumber
                  id="ud-edge-width"
                  value={userDefinedEdgeStyling.stylingEdgeWidth}
                  onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeWidth'], OPERATION_TYPE_UPDATE, parseInt(e.value))}
                />
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={userDefinedEdgeStyling.stylingEdgeWidth}
                  onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeWidth'], OPERATION_TYPE_UPDATE, parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeLineColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-edge-color-line"
                    value={userDefinedEdgeStyling.stylingEdgeLineColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeLineColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-edge-color-line-highlight"
                    value={userDefinedEdgeStyling.stylingEdgeLineColorHighlight.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeLineColorHighlight'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColorHighlight')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-edge-color-line-hover"
                    value={userDefinedEdgeStyling.stylingEdgeLineColorHover.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeLineColorHover'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColorHover')}
                  </span>
                </div>
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeLineStyle')}>
                <SelectButton
                  id="ud-edge-line-style"
                  value={userDefinedEdgeStyling.stylingEdgeLineStyle}
                  options={EDGE_LINE_STYLE_OPTIONS}
                  onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeLineStyle'], OPERATION_TYPE_UPDATE, e.value)}
                  itemTemplate={EDGE_LINE_STYLE_TEMPLATE}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextSize')}>
                <InputNumber
                  id="ud-edge-text-size"
                  value={userDefinedEdgeStyling.stylingEdgeTextSize}
                  onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeTextSize'], OPERATION_TYPE_UPDATE, parseInt(e.value))}
                />
                <Slider
                  min={1}
                  max={200}
                  step={1}
                  value={userDefinedEdgeStyling.stylingEdgeTextSize}
                  onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeTextSize'], OPERATION_TYPE_UPDATE, parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-edge-text-color"
                    value={userDefinedEdgeStyling.stylingEdgeTextColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeTextColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeTextColor')}
                  </span>
                </div>
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextAlign')}>
                <SelectButton
                  id="ud-edge-text-align"
                  value={userDefinedEdgeStyling.stylingEdgeTextAlign}
                  options={captionAlignmentOptions}
                  onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeTextAlign'], OPERATION_TYPE_UPDATE, e.value)}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeCaptionProperty')}>
                <Dropdown
                  ariaLabel="global-node-shape"
                  id="ud-edge-caption-property"
                  value={userDefinedEdgeStyling.stylingEdgeCaptionProperty}
                  options={EDGE_PROPERTIES_DROPDOWN}
                  filter
                  onChange={(e) => updateStoreValue(['userDefinedEdgeStyling', 'stylingEdgeCaptionProperty'], OPERATION_TYPE_UPDATE, e.value)}
                  className="m-t-10"
                  placeholder={t('selectProperty')}
                />
              </AccordionTab>
            </Accordion>
          </AccordionTab>

          <AccordionTab header={t('stylingEdgeByProperty')}>
            <Accordion>
              {
                  stylingEdgeByProperty.length > 0
                  && stylingEdgeByProperty.map((stylingProperty, index) => (
                    <AccordionTab
                      key={`edge-style-property-tab-${v4()}`}
                      header={`${t('styleByProperty')} ${index}`}
                    >
                      <NetworkStylingEdgeByPropertyForm
                        index={index}
                        stylingProperty={stylingProperty}
                        isDeleteAvailable={stylingEdgeByProperty.length > 1}
                      />
                    </AccordionTab>
                  ))
                }
            </Accordion>
          </AccordionTab>
        </Accordion>
      </AccordionTab>
    </Accordion>
  )
}

NetworkStylingEdge.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  globalEdgeStyling: PropTypes.shape().isRequired,
  userDefinedEdgeStyling: PropTypes.shape().isRequired,
  stylingEdgeByProperty: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  stylingEdgeByProperty,
  globalEdgeStyling,
  userDefinedEdgeStyling,
}) => ({
  stylingEdgeByProperty,
  globalEdgeStyling,
  userDefinedEdgeStyling,
})

export default connect(
  mapToProps,
  actions
)(NetworkStylingEdge)
