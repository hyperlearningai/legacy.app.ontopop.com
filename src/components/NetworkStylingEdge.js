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

const NetworkStylingEdge = ({
  addToObject,
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
                      onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeLength', parseInt(e.value))}
                    />
                    <Slider
                      min={1}
                      max={1000}
                      step={1}
                      value={globalEdgeStyling.stylingEdgeLength}
                      onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeLength', parseInt(e.value))}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeWidth')}>
                <InputNumber
                  id="global-edge-width"
                  value={globalEdgeStyling.stylingEdgeWidth}
                  onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeWidth', parseInt(e.value))}
                />
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={globalEdgeStyling.stylingEdgeWidth}
                  onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeWidth', parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeLineColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-edge-color-line"
                    value={globalEdgeStyling.stylingEdgeLineColor.replace('#', '')}
                    onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeLineColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-edge-color-line-highlight"
                    value={globalEdgeStyling.stylingEdgeLineColorHighlight.replace('#', '')}
                    onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeLineColorHighlight', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColorHighlight')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-edge-color-line-hover"
                    value={globalEdgeStyling.stylingEdgeLineColorHover.replace('#', '')}
                    onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeLineColorHover', `#${e.value}`)}
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
                  onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeLineStyle', e.value)}
                  itemTemplate={EDGE_LINE_STYLE_TEMPLATE}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextSize')}>
                <InputNumber
                  id="global-edge-text-size"
                  value={globalEdgeStyling.stylingEdgeTextSize}
                  onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeTextSize', parseInt(e.value))}
                />
                <Slider
                  min={1}
                  max={200}
                  step={1}
                  value={globalEdgeStyling.stylingEdgeTextSize}
                  onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeTextSize', parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-edge-text-color"
                    value={globalEdgeStyling.stylingEdgeTextColor.replace('#', '')}
                    onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeTextColor', `#${e.value}`)}
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
                  onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeTextAlign', e.value)}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeCaptionProperty')}>
                <Dropdown
                  id="global-edge-caption-property"
                  value={globalEdgeStyling.stylingEdgeCaptionProperty}
                  options={EDGE_PROPERTIES_DROPDOWN}
                  filter
                  onChange={(e) => addToObject('globalEdgeStyling', 'stylingEdgeCaptionProperty', e.value)}
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
                  onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeWidth', parseInt(e.value))}
                />
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={userDefinedEdgeStyling.stylingEdgeWidth}
                  onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeWidth', parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeLineColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-edge-color-line"
                    value={userDefinedEdgeStyling.stylingEdgeLineColor.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeLineColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-edge-color-line-highlight"
                    value={userDefinedEdgeStyling.stylingEdgeLineColorHighlight.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeLineColorHighlight', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColorHighlight')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-edge-color-line-hover"
                    value={userDefinedEdgeStyling.stylingEdgeLineColorHover.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeLineColorHover', `#${e.value}`)}
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
                  onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeLineStyle', e.value)}
                  itemTemplate={EDGE_LINE_STYLE_TEMPLATE}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextSize')}>
                <InputNumber
                  id="ud-edge-text-size"
                  value={userDefinedEdgeStyling.stylingEdgeTextSize}
                  onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeTextSize', parseInt(e.value))}
                />
                <Slider
                  min={1}
                  max={200}
                  step={1}
                  value={userDefinedEdgeStyling.stylingEdgeTextSize}
                  onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeTextSize', parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-edge-text-color"
                    value={userDefinedEdgeStyling.stylingEdgeTextColor.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeTextColor', `#${e.value}`)}
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
                  onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeTextAlign', e.value)}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeCaptionProperty')}>
                <Dropdown
                  id="ud-edge-caption-property"
                  value={userDefinedEdgeStyling.stylingEdgeCaptionProperty}
                  options={EDGE_PROPERTIES_DROPDOWN}
                  filter
                  onChange={(e) => addToObject('userDefinedEdgeStyling', 'stylingEdgeCaptionProperty', e.value)}
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
  addToObject: PropTypes.func.isRequired,
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
