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
import actions from '../store/actions'
import updateEdgesStyle from '../utils/networkStyling/updateEdgesStyle'

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
  annotationProperties
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

  const alignmentOptions = ['horizontal', 'top', 'middle', 'bottom']

  const captionAlignmentOptions = alignmentOptions.map((shape) => ({
    label: t(shape),
    value: shape
  }))

  const edgeLineStyleOptions = [
    { icon: 'pi pi-ellipsis-h', value: true },
    { icon: 'pi pi-minus', value: false }
  ]
  const edgeLineStyleTemplate = (option) => <i className={option.icon} />

  return (
    <Accordion>
      <AccordionTab header={t('edgeStyling')}>
        <Accordion>
          <AccordionTab header={t('edgeStylingGlobal')}>
            <Accordion>
              <AccordionTab header={t('edgeLength')}>
                <div className="network-settings-input">
                  <h4 className="m-t-5 m-b-10">{t('edgeLenghtOnlyWithPhysicsOn')}</h4>
                  <div className="network-settings-item-input">
                    <InputNumber value={stylingEdgeLength} onChange={(e) => setStoreState('stylingEdgeLength', parseInt(e.value))} />
                    <Slider
                      min={1}
                      max={1000}
                      step={1}
                      id="rating"
                      value={stylingEdgeLength}
                      onChange={(e) => setStoreState('stylingEdgeLength', parseInt(e.value))}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('edgeThickness')}>
                <InputNumber value={stylingEdgeWidth} onChange={(e) => setStoreState('stylingEdgeWidth', parseInt(e.value))} />
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  id="edgeWidthSlider"
                  value={stylingEdgeWidth}
                  onChange={(e) => setStoreState('stylingEdgeWidth', parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('edgeLineStyleColor')}>
                <h4 className="m-t-5 m-b-10">{t('edgeLineColorInstructions')}</h4>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeLineColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColor', `#${e.value}`)}
                  />
                  <span>
                    {t('edgeLineStyleLineColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeLineColorHighlight.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColorHighlight', `#${e.value}`)}
                  />
                  <span>
                    {t('edgeLineStyleHighlightColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeLineColorHover.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColorHover', `#${e.value}`)}
                  />
                  <span>
                    {t('edgeLineStyleHoverColor')}
                  </span>
                </div>
              </AccordionTab>
              <AccordionTab header={t('edgeLineStyle')}>
                <SelectButton
                  value={stylingEdgeLineStyle}
                  options={edgeLineStyleOptions}
                  onChange={(e) => setStoreState('stylingEdgeLineStyle', e.value)}
                  itemTemplate={edgeLineStyleTemplate}
                />
              </AccordionTab>
              <AccordionTab header={t('edgeLineStyleTextSize')}>
                <InputNumber value={stylingEdgeTextSize} onChange={(e) => setStoreState('stylingEdgeTextSize', parseInt(e.value))} />
                <Slider
                  min={1}
                  max={200}
                  step={1}
                  id="edgeWidthSlider"
                  value={stylingEdgeTextSize}
                  onChange={(e) => setStoreState('stylingEdgeTextSize', parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('edgeLineStyleTextColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeTextColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeTextColor', `#${e.value}`)}
                  />
                  <span>
                    {t('edgeLineStyleTextColor')}
                  </span>
                </div>
              </AccordionTab>
              <AccordionTab header={t('edgeLineStyleTextAlign')}>
                <SelectButton
                  value={stylingEdgeTextAlign}
                  options={captionAlignmentOptions}
                  onChange={(e) => setStoreState('stylingEdgeTextAlign', e.value)}
                />
              </AccordionTab>
              <AccordionTab header={t('edgeCaptionProperty')}>
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
          <AccordionTab header={t('edgeStylingByProperty')}>
            {/* <h3>{t('edgeLineStyleColorChooseProperty')}</h3> */}
            <div className="card m-t-10">
              {/* <div className="text-center">
                      <Badge value="1" className="p-mr-2" size="large" severity="warning" />
                    </div> */}
              <p><strong>{t('edgeByPropInstructions1')}</strong></p>
              {/* <MultiSelect value={selectedCities2} options={cities} onChange={(e) => setSelectedCities2(e.value)} optionLabel="name" placeholder="Select a City" display="chip" /> */}
              {/* <div className="text-center m-t-10">
                      <Badge value="2" className="p-mr-2" size="large" severity="warning" />
                    </div> */}
              <p><strong>{t('edgeByPropInstructions2')}</strong></p>
            </div>
            <Accordion>
              <AccordionTab header={t('edgeLength')}>
                <div className="network-settings-input">
                  <div className="network-settings-item-input">
                    <InputNumber value={stylingEdgeLength} onChange={(e) => setStoreState('stylingEdgeLength', parseInt(e.value))} />
                    <Slider
                      min={0}
                      max={1000}
                      step={1}
                      id="rating"
                      value={stylingEdgeLength}
                      onChange={(e) => setStoreState('stylingEdgeLength', parseInt(e.value))}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('edgeThickness')}>
                <InputNumber value={stylingEdgeWidth} onChange={(e) => setStoreState('stylingEdgeWidth', parseInt(e.value))} />
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  id="edgeWidthSlider"
                  value={stylingEdgeWidth}
                  onChange={(e) => setStoreState('stylingEdgeWidth', parseInt(e.value))}
                />
              </AccordionTab>
              <AccordionTab header={t('edgeLineStyleColor')}>
                <h4 className="m-t-5 m-b-10">{t('edgeLineColorInstructions')}</h4>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeLineColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColor', `#${e.value}`)}
                  />
                  <span>
                    {t('edgeLineStyleLineColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeLineColorHighlight.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColorHighlight', `#${e.value}`)}
                  />
                  <span>
                    {t('edgeLineStyleHighlightColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingEdgeLineColorHover.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColorHover', `#${e.value}`)}
                  />
                  <span>
                    {t('edgeLineStyleHoverColor')}
                  </span>
                </div>
              </AccordionTab>
              <AccordionTab header={t('edgeLineStyle')}>
                <SelectButton
                  value={stylingEdgeLineStyle}
                  options={edgeLineStyleOptions}
                  onChange={(e) => setStoreState('stylingEdgeLineStyle', e.value)}
                  itemTemplate={edgeLineStyleTemplate}
                />
              </AccordionTab>
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
  stylingEdgeTextSize: PropTypes.string.isRequired,
  stylingEdgeTextAlign: PropTypes.string.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,

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
})

export default connect(
  mapToProps,
  actions
)(NetworkStylingEdge)
