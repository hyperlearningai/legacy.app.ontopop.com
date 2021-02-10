import React, { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { ColorPicker } from 'primereact/colorpicker'
import { SelectButton } from 'primereact/selectbutton'
import { RadioButton } from 'primereact/radiobutton'
import { InputText } from 'primereact/inputtext'
import { Slider } from 'primereact/slider'
import actions from '../store/actions'

const NetworkStylingNode = ({
  setStoreState,
  stylingNodeShape,
  stylingNodeSize,
  stylingNodeBorder,
  stylingNodeBorderSelected,
  stylingNodeBorderColor,
  stylingNodeBackgroundColor,
  stylingNodeHighlightBorderColor,
  stylingNodeHighlightBackgroundColor,
  stylingNodeHoverBackgroundColor,
  stylingNodeHoverBorderColor,
  stylingNodeTextColor,
}) => {
  const { t } = useTranslation()
  const options = ['Left', 'Middle', 'Right']
  const [value1, setValue1] = useState('Middle')

  const nodeShapeOptions = [
    { name: 'Ellipse', value: 'ellipse' },
    { name: 'Circle', value: 'circle' },
    { name: 'Database', value: 'database' },
    { name: 'Box', value: 'box' },
    { name: 'Text', value: 'text' },
    { name: 'Diamond', value: 'diamond' },
    { name: 'Dot', value: 'dot' },
    { name: 'Star', value: 'star' },
    { name: 'Triangle', value: 'triangle' },
    { name: 'Triangle Down', value: 'triangleDown' },
    { name: 'Hexagon', value: 'hexagon' },
    { name: 'Square', value: 'square' }
  ]

  return (
    <Accordion>
      <AccordionTab header={t('nodeStyling')}>
        <Accordion>
          <AccordionTab header={t('nodeStylingGlobal')}>
            <Accordion>
              <AccordionTab header={t('nodeSize')}>
                <div className="network-settings-input">
                  <div className="network-settings-item-input">
                    <InputText value={stylingNodeSize} onChange={(e) => setStoreState('stylingNodeSize', e.value)} />
                    <Slider
                      min={1}
                      max={1000}
                      step={1}
                      id="nodeSize"
                      value={stylingNodeSize}
                      onChange={(e) => setStoreState('stylingNodeSize', e.value)}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('nodeBorder')}>
                <h4 className="m-t-0 m-b-0">{t('nodeBorderLineWidth')}</h4>
                <div className="network-settings-input">
                  <div className="network-settings-item-input">
                    <InputText value={stylingNodeBorder} onChange={(e) => setStoreState('stylingNodeBorder', `#${e.value}`)} />
                    <Slider
                      min={1}
                      max={10}
                      step={0.5}
                      id="stylingNodeBorder"
                      value={stylingNodeBorder}
                      onChange={(e) => setStoreState('stylingNodeBorder', e.value)}
                    />
                  </div>
                </div>
                <h4 className="m-t-20 m-b-0">{t('nodeBorderLineWidthHighlighted')}</h4>
                <div className="network-settings-input">
                  <div className="network-settings-item-input">
                    <InputText value={stylingNodeBorderSelected} onChange={(e) => setStoreState('stylingNodeBorderSelected', `#${e.value}`)} />
                    <Slider
                      min={1}
                      max={10}
                      step={0.5}
                      id="stylingNodeBorderSelected"
                      value={stylingNodeBorderSelected}
                      onChange={(e) => setStoreState('stylingNodeBorderSelected', e.value)}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('nodeShape')}>
                <h4>{t('nodeShapeInstructions')}</h4>
                {
                  nodeShapeOptions.map((nodeShapeValue) => (
                    <div key={nodeShapeValue.value} className="p-field-radiobutton">
                      <RadioButton
                        inputId={nodeShapeValue.value}
                        name="nodeShapeValue"
                        value={nodeShapeValue.value}
                        onChange={(e) => setStoreState('stylingNodeShape', e.value)}
                        checked={stylingNodeShape === nodeShapeValue.value}
                      />
                      <label className="m-l-10" htmlFor={nodeShapeValue.value}>{nodeShapeValue.name}</label>
                    </div>
                  ))
                }
              </AccordionTab>
              <AccordionTab header={t('nodeColor')}>
                <h4 className="m-t-5 m-b-10">{t('edgeLineColorInstructions')}</h4>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingNodeTextColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeTextColor', `#${e.value}`)}
                  />
                  <span>
                          &nbsp;
                    {t('nodeTextColor')}
                  </span>
                </div>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingNodeBorderColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeBorderColor', `#${e.value}`)}
                  />
                  <span>
                          &nbsp;
                    {t('nodeBorderColor')}
                  </span>
                </div>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingNodeHighlightBorderColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHighlightBorderColor', `#${e.value}`)}
                  />
                  <span>
                          &nbsp;
                    {' '}
                    {t('nodeBorderHighlightedColor')}
                  </span>
                </div>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingNodeBackgroundColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                          &nbsp;
                    {' '}
                    {t('nodeBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingNodeHighlightBackgroundColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHighlightBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                     &nbsp;
                    {' '}
                    {t('nodeBackgroundHighlightedColor')}
                  </span>
                </div>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingNodeHoverBackgroundColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHoverBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                     &nbsp;
                    {' '}
                    {t('nodeBackgroundHoverColor')}
                  </span>
                </div>
                <div className="m-b-10">
                  <ColorPicker
                    value={stylingNodeHoverBorderColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHoverBorderColor', `#${e.value}`)}
                  />
                  <span>
                     &nbsp;
                    {' '}
                    {t('nodeBorderHoverColor')}
                  </span>
                </div>
              </AccordionTab>
              <AccordionTab header={t('nodeCaptionProperties')} className="position-center">
                <h3>Position of caption</h3>
                <SelectButton value={value1} options={options} onChange={(e) => setValue1(e.value)} />
              </AccordionTab>
            </Accordion>
          </AccordionTab>
        </Accordion>
        <Accordion>
          <AccordionTab header={t('nodeStylingByProperty')} />
        </Accordion>
      </AccordionTab>
    </Accordion>
  )
}

NetworkStylingNode.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  stylingNodeShape: PropTypes.string.isRequired,
  stylingNodeBorder: PropTypes.number.isRequired,
  stylingNodeBorderSelected: PropTypes.number.isRequired,
  stylingNodeBorderColor: PropTypes.string.isRequired,
  stylingNodeTextColor: PropTypes.string.isRequired,
  stylingNodeBackgroundColor: PropTypes.string.isRequired,
  stylingNodeHighlightBorderColor: PropTypes.string.isRequired,
  stylingNodeHighlightBackgroundColor: PropTypes.string.isRequired,
  stylingNodeSize: PropTypes.number.isRequired,
  stylingNodeHoverBackgroundColor: PropTypes.string.isRequired,
  stylingNodeHoverBorderColor: PropTypes.string.isRequired,
}

const mapToProps = ({
  stylingNodeShape,
  stylingNodeBorder,
  stylingNodeBorderSelected,
  stylingNodeBorderColor,
  stylingNodeBackgroundColor,
  stylingNodeHighlightBorderColor,
  stylingNodeHighlightBackgroundColor,
  stylingNodeTextColor,
  stylingNodeSize,
  stylingNodeHoverBackgroundColor,
  stylingNodeHoverBorderColor,
}) => ({
  stylingNodeHoverBackgroundColor,
  stylingNodeHoverBorderColor,
  stylingNodeShape,
  stylingNodeBorder,
  stylingNodeBorderSelected,
  stylingNodeBorderColor,
  stylingNodeBackgroundColor,
  stylingNodeHighlightBorderColor,
  stylingNodeHighlightBackgroundColor,
  stylingNodeTextColor,
  stylingNodeSize,
})

export default connect(
  mapToProps,
  actions
)(NetworkStylingNode)
