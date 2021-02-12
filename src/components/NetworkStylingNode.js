/* eslint react/jsx-key:0 */
import React, { useRef, useEffect } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { ColorPicker } from 'primereact/colorpicker'
import { SelectButton } from 'primereact/selectbutton'
import { InputNumber } from 'primereact/inputnumber'
import { Slider } from 'primereact/slider'
import { Dropdown } from 'primereact/dropdown'
import { uuid } from 'uuidv4'
import actions from '../store/actions'
import updateNodesStyle from '../utils/networkStyling/updateNodesStyle'
import NetworkStylingNodeByPropertyForm from './NetworkStylingNodeByPropertyForm'
import { FONT_ALIGNMENT_OPTIONS, NODE_SHAPES, NODE_SHAPES_AFFECTED_BY_SIZE } from '../constants/graph'

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
  stylingNodeByProperty,
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

  const fontAlignmentTemplate = (option) => <i className={option.icon} />

  const nodeShapeOptions = NODE_SHAPES.sort().map((shape) => ({
    label: t(shape),
    value: shape
  }))

  return (
    <Accordion>
      <AccordionTab header={t('nodeStyling')}>
        <Accordion>
          <AccordionTab header={t('nodeStylingGlobal')}>
            <Accordion>
              <AccordionTab header={t('stylingNodeShape')}>
                <Dropdown
                  value={stylingNodeShape}
                  options={nodeShapeOptions}
                  filter
                  onChange={(e) => setStoreState('stylingNodeShape', e.value)}
                  className="m-t-10"
                  placeholder={t('stylingNodeShape')}
                />
              </AccordionTab>

              <AccordionTab header={t('stylingNodeSize')}>
                <div className="network -styling-input">
                  <div className="network -styling-item-input">
                    {
                        NODE_SHAPES_AFFECTED_BY_SIZE.includes(stylingNodeShape) ? (
                          <>
                            <InputNumber value={stylingNodeSize} onChange={(e) => setStoreState('stylingNodeSize', e.value)} />
                            <Slider
                              min={1}
                              max={1000}
                              step={1}
                              id="stylingNodeSize"
                              value={stylingNodeSize}
                              onChange={(e) => setStoreState('stylingNodeSize', e.value)}
                            />
                          </>
                        ) : (
                          <span>
                            {`${t('onlyFollowingShapesAffected')}: ${NODE_SHAPES_AFFECTED_BY_SIZE.map((shape) => t(shape)).join(', ')}`}
                          </span>
                        )
                      }
                  </div>
                </div>
              </AccordionTab>

              <AccordionTab header={t('stylingNodeTextFontSize')}>
                <div className="network -styling-input">
                  <div className="network -styling-item-input">
                    <InputNumber value={stylingNodeTextFontSize} onChange={(e) => setStoreState('stylingNodeTextFontSize', e.value)} />
                    <Slider
                      min={1}
                      max={200}
                      step={1}
                      id="stylingNodeSize"
                      value={stylingNodeTextFontSize}
                      onChange={(e) => setStoreState('stylingNodeTextFontSize', e.value)}
                    />
                  </div>
                </div>
              </AccordionTab>

              <AccordionTab header={t('stylingNodeTextFontAlign')}>
                <SelectButton
                  value={stylingNodeTextFontAlign}
                  options={FONT_ALIGNMENT_OPTIONS}
                  itemTemplate={fontAlignmentTemplate}
                  onChange={(e) => setStoreState('stylingNodeTextFontAlign', e.value)}
                />
              </AccordionTab>

              <AccordionTab header={t('stylingNodeBorder')}>
                <h4 className="m-t-0 m-b-0">{t('nodeBorderLineWidth')}</h4>
                <div className="network -styling-input">
                  <div className="network -styling-item-input">
                    <InputNumber value={stylingNodeBorder} onChange={(e) => setStoreState('stylingNodeBorder', e.value)} />
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
                <div className="network -styling-input">
                  <div className="network -styling-item-input">
                    <InputNumber value={stylingNodeBorderSelected} onChange={(e) => setStoreState('stylingNodeBorderSelected', e.value)} />
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
              <AccordionTab header={t('stylingNodeTextColor')}>
                <h4 className="m-t-5 m-b-10">{t('edgeLineColorInstructions')}</h4>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeTextColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeTextColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeTextColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeBorderColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeHighlightBorderColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHighlightBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHighlightBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeBackgroundColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeHighlightBackgroundColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHighlightBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHighlightBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeHoverBackgroundColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHoverBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHoverBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    value={stylingNodeHoverBorderColor.replace('#', '')}
                    onChange={(e) => setStoreState('stylingNodeHoverBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHoverBorderColor')}
                  </span>
                </div>
              </AccordionTab>

              <AccordionTab header={t('stylingNodeCaptionProperty')}>
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
          <AccordionTab header={t('stylingNodeByProperty')}>
            <Accordion>
              {
                stylingNodeByProperty.map((stylingProperty, index) => (
                  <AccordionTab
                    key={uuid}
                    header={`${t('styleByProperty')} ${index}`}
                  >
                    <NetworkStylingNodeByPropertyForm
                      index={index}
                      stylingProperty={stylingProperty}
                      isDeleteAvailable={stylingNodeByProperty.length > 1}
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
  stylingNodeByProperty: PropTypes.arrayOf(PropTypes.shape).isRequired,
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
  stylingNodeByProperty,
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
  stylingNodeByProperty,
  annotationProperties
})

export default connect(
  mapToProps,
  actions
)(NetworkStylingNode)
