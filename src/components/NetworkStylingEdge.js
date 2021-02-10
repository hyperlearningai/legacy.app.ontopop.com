import React, { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { ColorPicker } from 'primereact/colorpicker'
import { SelectButton } from 'primereact/selectbutton'
import { InputText } from 'primereact/inputtext'
import { Slider } from 'primereact/slider'
import actions from '../store/actions'

const NetworkStylingEdge = ({
  setStoreState,
  stylingEdgeLength,
  stylingEdgeWidth,
  stylingEdgeLineStyle,
  stylingEdgeLineColor,
  stylingEdgeLineColorHover,
  stylingEdgeLineColorHighlight,
}) => {
  const { t } = useTranslation()
  const options = ['Left', 'Middle', 'Right']
  const [value1, setValue1] = useState('Middle')

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
                  <div className="network-settings-item-input">
                    <InputText value={stylingEdgeLength} onChange={(e) => setStoreState('stylingEdgeLength', parseInt(e.value))} />
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
                <InputText value={stylingEdgeWidth} onChange={(e) => setStoreState('stylingEdgeWidth', parseInt(e.value))} />
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
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingEdgeLineColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColor', `#${e.value}`)}
                  />
                  <span>
                          &nbsp;
                    {t('edgeLineStyleLineColor')}
                  </span>
                </div>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingEdgeLineColorHighlight.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColorHighlight', `#${e.value}`)}
                  />
                  <span>
                          &nbsp;
                    {' '}
                    {t('edgeLineStyleHighlightColor')}
                  </span>
                </div>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingEdgeLineColorHover.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColorHover', `#${e.value}`)}
                  />
                  <span>
                          &nbsp;
                    {' '}
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
              <AccordionTab header={t('edgeCaptionPosition')} className="position-center">
                <h3>Position of caption</h3>
                <SelectButton value={value1} options={options} onChange={(e) => setValue1(e.value)} />
              </AccordionTab>
              <AccordionTab header={t('edgeCaptionProperties')}>
                here
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
                    <InputText value={stylingEdgeLength} onChange={(e) => setStoreState('stylingEdgeLength', parseInt(e.value))} />
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
                <InputText value={stylingEdgeWidth} onChange={(e) => setStoreState('stylingEdgeWidth', parseInt(e.value))} />
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
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingEdgeLineColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColor', `#${e.value}`)}
                  />
                  <span>
                          &nbsp;
                    {' '}
                    {t('edgeLineStyleLineColor')}
                  </span>
                </div>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingEdgeLineColorHighlight.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColorHighlight', `#${e.value}`)}
                  />
                  <span>
                          &nbsp;
                    {' '}
                    {t('edgeLineStyleHighlightColor')}
                  </span>
                </div>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingEdgeLineColorHover.replace('#', '')}
                    onChange={(e) => setStoreState('stylingEdgeLineColorHover', `#${e.value}`)}
                  />
                  <span>
                          &nbsp;
                    {' '}
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
              <AccordionTab header={t('edgeCaptionPosition')}>
                here
              </AccordionTab>
              <AccordionTab header={t('edgeCaptionProperties')}>
                here
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
}

const mapToProps = ({
  stylingEdgeLength,
  stylingEdgeWidth,
  stylingEdgeLineStyle,
  stylingEdgeLineColor,
  stylingEdgeLineColorHover,
  stylingEdgeLineColorHighlight,
}) => ({
  stylingEdgeLength,
  stylingEdgeWidth,
  stylingEdgeLineStyle,
  stylingEdgeLineColor,
  stylingEdgeLineColorHover,
  stylingEdgeLineColorHighlight,
})

export default connect(
  mapToProps,
  actions
)(NetworkStylingEdge)
