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
import { uuid } from 'uuidv4'
import actions from '../store/actions'
import updateEdgesStyle from '../utils/networkStyling/updateEdgesStyle'
import NetworkStylingEdgeByPropertyForm from './NetworkStylingEdgeByPropertyForm'
import {
  EDGE_ALIGNMENT_OPTIONS,
  EDGE_LINE_STYLE_OPTIONS,
  EDGE_LINE_STYLE_TEMPLATE
} from '../constants/graph'

const NetworkStylingEdge = ({
  setStoreState,
  stylingEdgeLength,
  stylingEdgeWidth,
  stylingEdgeLineStyle,
  stylingEdgeLineColor,
  stylingEdgeLineColorHover,
  stylingEdgeLineColorHighlight,
  stylingEdgeCaptionProperty,
  stylingEdgeTextColor,
  stylingEdgeTextSize,
  stylingEdgeTextAlign,
  annotationProperties,
  stylingEdgeByProperty
}) => {
  const isInitialMount = useRef(true)

  const { t } = useTranslation()

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      updateEdgesStyle()
    }
  },
  [
    stylingEdgeCaptionProperty
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
                    <InputNumber value={stylingEdgeLength} onChange={(e) => setStoreState('stylingEdgeLength', parseInt(e.value))} />
                    <Slider
                      min={1}
                      max={1000}
                      step={1}
                      value={stylingEdgeLength}
                      onChange={(e) => setStoreState('stylingEdgeLength', parseInt(e.value))}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeWidth')}>
                <InputNumber value={stylingEdgeWidth} onChange={(e) => setStoreState('stylingEdgeWidth', parseInt(e.value))} />
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={stylingEdgeWidth}
                  onChange={(e) => setStoreState('stylingEdgeWidth', parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeLineColor')}>
                <h4 className="m-t-5 m-b-10">{t('edgeLineColorInstructions')}</h4>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeLineColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeLineColorHighlight.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColorHighlight', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColorHighlight')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeLineColorHover.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColorHover', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeLineColorHover')}
                  </span>
                </div>
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeLineStyle')}>
                <SelectButton
                  value={stylingEdgeLineStyle}
                  options={EDGE_LINE_STYLE_OPTIONS}
                  onChange={(e) => setStoreState('stylingEdgeLineStyle', e.value)}
                  itemTemplate={EDGE_LINE_STYLE_TEMPLATE}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextSize')}>
                <InputNumber value={stylingEdgeTextSize} onChange={(e) => setStoreState('stylingEdgeTextSize', parseInt(e.value))} />
                <Slider
                  min={1}
                  max={200}
                  step={1}
                  value={stylingEdgeTextSize}
                  onChange={(e) => setStoreState('stylingEdgeTextSize', parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeTextColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeTextColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingEdgeTextColor')}
                  </span>
                </div>
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeTextAlign')}>
                <SelectButton
                  value={stylingEdgeTextAlign}
                  options={captionAlignmentOptions}
                  onChange={(e) => setStoreState('stylingEdgeTextAlign', e.value)}
                />
              </AccordionTab>
              <AccordionTab header={t('stylingEdgeCaptionProperty')}>
                <Dropdown
                  value={stylingEdgeCaptionProperty}
                  options={annotationProperties}
                  optionValue="id"
                  optionLabel="label"
                  filter
                  onChange={(e) => setStoreState('stylingEdgeCaptionProperty', e.value)}
                  className="m-t-10"
                  placeholder={t('selectProperty')}
                />
              </AccordionTab>
            </Accordion>
          </AccordionTab>
        </Accordion>

        <Accordion>
          <AccordionTab header={t('stylingEdgeByProperty')}>
            <Accordion>
              {
                  stylingEdgeByProperty.length > 0
                  && stylingEdgeByProperty.map((stylingProperty, index) => (
                    <AccordionTab
                      key={uuid}
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
  setStoreState: PropTypes.func.isRequired,
  stylingEdgeLength: PropTypes.number.isRequired,
  stylingEdgeWidth: PropTypes.number.isRequired,
  stylingEdgeLineStyle: PropTypes.bool.isRequired,
  stylingEdgeLineColor: PropTypes.string.isRequired,
  stylingEdgeLineColorHover: PropTypes.string.isRequired,
  stylingEdgeLineColorHighlight: PropTypes.string.isRequired,
  stylingEdgeCaptionProperty: PropTypes.string.isRequired,
  stylingEdgeTextColor: PropTypes.string.isRequired,
  stylingEdgeTextSize: PropTypes.number.isRequired,
  stylingEdgeTextAlign: PropTypes.string.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
  stylingEdgeByProperty: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  stylingEdgeLength,
  stylingEdgeWidth,
  stylingEdgeLineStyle,
  stylingEdgeLineColor,
  stylingEdgeLineColorHover,
  stylingEdgeLineColorHighlight,
  stylingEdgeCaptionProperty,
  annotationProperties,
  stylingEdgeTextColor,
  stylingEdgeTextSize,
  stylingEdgeTextAlign,
  stylingEdgeByProperty
}) => ({
  stylingEdgeLength,
  stylingEdgeWidth,
  stylingEdgeLineStyle,
  stylingEdgeLineColor,
  stylingEdgeLineColorHover,
  stylingEdgeLineColorHighlight,
  stylingEdgeCaptionProperty,
  annotationProperties,
  stylingEdgeTextColor,
  stylingEdgeTextSize,
  stylingEdgeTextAlign,
  stylingEdgeByProperty
})

export default connect(
  mapToProps,
  actions
)(NetworkStylingEdge)
