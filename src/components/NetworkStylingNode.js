import React, { useRef, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { ColorPicker } from 'primereact/colorpicker'
import { SelectButton } from 'primereact/selectbutton'
import { RadioButton } from 'primereact/radiobutton'
import { InputNumber } from 'primereact/inputnumber'
import { Slider } from 'primereact/slider'
import { Dropdown } from 'primereact/dropdown'
import actions from '../store/actions'
import updateNodesStyle from '../utils/networkStyling/updateNodesStyle'

const fontAlignmentTemplate = (option) => <i className={option.icon} />

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
  stylingNodeTextFontSize,
  stylingNodeTextFontAlign,
  stylingNodeCaptionProperty,
  annotationProperties,
}) => {
  const isInitialMount = useRef(true)

  const { t } = useTranslation()

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      updateNodesStyle()
    }
  },
  [
    stylingNodeCaptionProperty
  ])

  const fontAlignmentOptions = [
    { icon: 'pi pi-align-left', value: 'left' },
    { icon: 'pi pi-align-right', value: 'right' },
    { icon: 'pi pi-align-center', value: 'center' },
    { icon: 'pi pi-align-justify', value: 'justify' }
  ]

  const shapesAffectedBySize = [
    'diamond', 'dot', 'star', 'triangle', 'triangleDown', 'hexagon', 'square'
  ]

  const allShapes = [
    ...shapesAffectedBySize,
    'ellipse',
    'circle',
    'database',
    'box',
    'text'
  ]

  const nodeShapeOptions = allShapes.sort().map((shape) => ({
    name: t(shape),
    value: shape
  }))

  return (
    <Accordion>
      <AccordionTab header={t('nodeStyling')}>
        <Accordion>
          <AccordionTab header={t('nodeStylingGlobal')}>
            <Accordion>
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

              <AccordionTab header={t('nodeSize')}>
                <div className="network-settings-input">
                  <div className="network-settings-item-input">
                    {
                        shapesAffectedBySize.includes(stylingNodeShape) ? (
                          <>
                            <InputNumber value={stylingNodeSize} onChange={(e) => setStoreState('stylingNodeSize', e.value)} />
                            <Slider
                              min={1}
                              max={1000}
                              step={1}
                              id="nodeSize"
                              value={stylingNodeSize}
                              onChange={(e) => setStoreState('stylingNodeSize', e.value)}
                            />
                          </>
                        ) : (
                          <span>
                            {`${t('onlyFollowingShapesAffected')}: ${shapesAffectedBySize.map((shape) => t(shape)).join(', ')}`}
                          </span>
                        )
                      }
                  </div>
                </div>
              </AccordionTab>

              <AccordionTab header={t('nodeFontSize')}>
                <div className="network-settings-input">
                  <div className="network-settings-item-input">
                    <InputNumber value={stylingNodeTextFontSize} onChange={(e) => setStoreState('stylingNodeTextFontSize', e.value)} />
                    <Slider
                      min={1}
                      max={200}
                      step={1}
                      id="nodeSize"
                      value={stylingNodeTextFontSize}
                      onChange={(e) => setStoreState('stylingNodeTextFontSize', e.value)}
                    />
                  </div>
                </div>
              </AccordionTab>

              <AccordionTab header={t('nodeFontAlignment')}>
                <SelectButton
                  value={stylingNodeTextFontAlign}
                  options={fontAlignmentOptions}
                  itemTemplate={fontAlignmentTemplate}
                  onChange={(e) => setStoreState('stylingNodeTextFontAlign', e.value)}
                />
              </AccordionTab>

              <AccordionTab header={t('nodeBorder')}>
                <h4 className="m-t-0 m-b-0">{t('nodeBorderLineWidth')}</h4>
                <div className="network-settings-input">
                  <div className="network-settings-item-input">
                    <InputNumber value={stylingNodeBorder} onChange={(e) => setStoreState('stylingNodeBorder', `#${e.value}`)} />
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
                    <InputNumber value={stylingNodeBorderSelected} onChange={(e) => setStoreState('stylingNodeBorderSelected', `#${e.value}`)} />
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
              <AccordionTab header={t('nodeColor')}>
                <h4 className="m-t-5 m-b-10">{t('edgeLineColorInstructions')}</h4>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeTextColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeTextColor', `#${e.value}`)}
                  />
                  <span>
                    {t('nodeTextColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeBorderColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('nodeBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeHighlightBorderColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHighlightBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('nodeBorderHighlightedColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeBackgroundColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('nodeBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeHighlightBackgroundColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHighlightBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('nodeBackgroundHighlightedColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeHoverBackgroundColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHoverBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('nodeBackgroundHoverColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeHoverBorderColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHoverBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('nodeBorderHoverColor')}
                  </span>
                </div>
              </AccordionTab>

              <AccordionTab header={t('nodeCaptionProperty')}>
                <Dropdown
                  value={stylingNodeCaptionProperty}
                  options={annotationProperties}
                  optionValue="id"
                  optionLabel="label"
                  filter
                  onChange={(e) => setStoreState('stylingNodeCaptionProperty', e.value)}
                  className="m-t-10"
                  placeholder={t('selectProperty')}
                />
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
  stylingNodeTextFontSize: PropTypes.number.isRequired,
  stylingNodeTextFontAlign: PropTypes.string.isRequired,
  stylingNodeCaptionProperty: PropTypes.string.isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
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
  stylingNodeTextFontSize,
  stylingNodeTextFontAlign,
  stylingNodeCaptionProperty,
  annotationProperties
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
  stylingNodeTextFontSize,
  stylingNodeTextFontAlign,
  stylingNodeCaptionProperty,
  annotationProperties
})

export default connect(
  mapToProps,
  actions
)(NetworkStylingNode)
