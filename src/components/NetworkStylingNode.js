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
import { v4 } from 'uuid'
import actions from '../store/actions'
import NetworkStylingNodeByPropertyForm from './NetworkStylingNodeByPropertyForm'
import {
  FONT_ALIGNMENT_OPTIONS,
  FONT_ALIGNMENT_TEMPLATE,
  NODE_SHAPES,
  NODE_SHAPES_AFFECTED_BY_SIZE
} from '../constants/graph'
import setNodesStyle from '../utils/networkStyling/setNodesStyle'

const NetworkStylingNode = ({
  addToObject,
  globalNodeStyling,
  userDefinedNodeStyling,
  stylingNodeByProperty,
  annotationProperties,
}) => {
  const isInitialMount = useRef(true)

  const { t } = useTranslation()

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setNodesStyle()
    }
  },
  [
    stylingNodeByProperty,
    userDefinedNodeStyling,
    globalNodeStyling
  ])

  const nodeShapeOptions = NODE_SHAPES.sort().map((shape) => ({
    label: t(shape),
    value: shape
  }))

  return (
    <Accordion>
      <AccordionTab
        header={t('nodeStyling')}
      >
        <Accordion>
          <AccordionTab
            header={t('nodeStylingGlobal')}
          >
            <Accordion>
              <AccordionTab header={t('stylingNodeShape')}>
                <Dropdown
                  value={globalNodeStyling.stylingNodeShape}
                  options={nodeShapeOptions}
                  filter
                  id="global-node-shape"
                  onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeShape', e.value)}
                  className="m-t-10"
                  placeholder={t('stylingNodeShape')}
                />
              </AccordionTab>

              <AccordionTab header={t('stylingNodeSize')}>
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    {
                      NODE_SHAPES_AFFECTED_BY_SIZE.includes(globalNodeStyling.stylingNodeShape) ? (
                        <>
                          <InputNumber
                            id="global-node-size"
                            value={globalNodeStyling.stylingNodeSize}
                            onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeSize', e.value)}
                          />
                          <Slider
                            min={1}
                            max={1000}
                            step={1}
                            id="stylingNodeSize"
                            value={globalNodeStyling.stylingNodeSize}
                            onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeSize', e.value)}
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
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      id="global-node-font-size"
                      value={globalNodeStyling.stylingNodeTextFontSize}
                      onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeTextFontSize', e.value)}
                    />
                    <Slider
                      min={1}
                      max={200}
                      step={1}
                      id="stylingNodeSize"
                      value={globalNodeStyling.stylingNodeTextFontSize}
                      onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeTextFontSize', e.value)}
                    />
                  </div>
                </div>
              </AccordionTab>

              <AccordionTab header={t('stylingNodeTextFontAlign')}>
                <SelectButton
                  value={globalNodeStyling.stylingNodeTextFontAlign}
                  id="global-node-font-alignment"
                  options={FONT_ALIGNMENT_OPTIONS}
                  itemTemplate={FONT_ALIGNMENT_TEMPLATE}
                  onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeTextFontAlign', e.value)}
                />
              </AccordionTab>

              <AccordionTab header={t('stylingNodeBorder')}>
                <h4 className="m-t-0 m-b-0">{t('nodeBorderLineWidth')}</h4>
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      id="global-node-border-width"
                      value={globalNodeStyling.stylingNodeBorder}
                      onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeBorder', e.value)}
                    />
                    <Slider
                      min={1}
                      max={10}
                      step={0.5}
                      id="stylingNodeBorder"
                      value={globalNodeStyling.stylingNodeBorder}
                      onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeBorder', e.value)}
                    />
                  </div>
                </div>
                <h4 className="m-t-20 m-b-0">{t('nodeBorderLineWidthHighlighted')}</h4>
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      id="global-node-border-width-highlighted"
                      value={globalNodeStyling.stylingNodeBorderSelected}
                      onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeBorderSelected', e.value)}
                    />
                    <Slider
                      min={1}
                      max={10}
                      step={0.5}
                      id="stylingNodeBorderSelected"
                      value={globalNodeStyling.stylingNodeBorderSelected}
                      onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeBorderSelected', e.value)}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('nodeColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-text"
                    value={globalNodeStyling.stylingNodeTextColor.replace('#', '')}
                    onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeTextColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeTextColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-border"
                    value={globalNodeStyling.stylingNodeBorderColor.replace('#', '')}
                    onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-border-highlight"
                    value={globalNodeStyling.stylingNodeHighlightBorderColor.replace('#', '')}
                    onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeHighlightBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHighlightBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-background"
                    value={globalNodeStyling.stylingNodeBackgroundColor.replace('#', '')}
                    onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-background-highlight"
                    value={globalNodeStyling.stylingNodeHighlightBackgroundColor.replace('#', '')}
                    onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeHighlightBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHighlightBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-background-hover"
                    value={globalNodeStyling.stylingNodeHoverBackgroundColor.replace('#', '')}
                    onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeHoverBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHoverBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-border-hover"
                    value={globalNodeStyling.stylingNodeHoverBorderColor.replace('#', '')}
                    onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeHoverBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHoverBorderColor')}
                  </span>
                </div>
              </AccordionTab>

              <AccordionTab header={t('stylingNodeCaptionProperty')}>
                <Dropdown
                  value={globalNodeStyling.stylingNodeCaptionProperty}
                  options={annotationProperties}
                  filter
                  id="global-node-caption-property"
                  onChange={(e) => addToObject('globalNodeStyling', 'stylingNodeCaptionProperty', e.value)}
                  className="m-t-10"
                  placeholder={t('selectProperty')}
                />
              </AccordionTab>
            </Accordion>
          </AccordionTab>

          <AccordionTab header={t('nodeStylingUserDefined')}>
            <Accordion>
              <AccordionTab header={t('stylingNodeShape')}>
                <Dropdown
                  value={userDefinedNodeStyling.stylingNodeShape}
                  options={nodeShapeOptions}
                  filter
                  id="ud-node-shape"
                  onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeShape', e.value)}
                  className="m-t-10"
                  placeholder={t('stylingNodeShape')}
                />
              </AccordionTab>

              <AccordionTab header={t('stylingNodeSize')}>
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    {
                      NODE_SHAPES_AFFECTED_BY_SIZE.includes(userDefinedNodeStyling.stylingNodeShape) ? (
                        <>
                          <InputNumber
                            id="ud-node-size"
                            value={userDefinedNodeStyling.stylingNodeSize}
                            onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeSize', e.value)}
                          />
                          <Slider
                            min={1}
                            max={1000}
                            step={1}
                            id="stylingNodeSize"
                            value={userDefinedNodeStyling.stylingNodeSize}
                            onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeSize', e.value)}
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
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      id="ud-node-font-size"
                      value={userDefinedNodeStyling.stylingNodeTextFontSize}
                      onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeTextFontSize', e.value)}
                    />
                    <Slider
                      min={1}
                      max={200}
                      step={1}
                      id="stylingNodeSize"
                      value={userDefinedNodeStyling.stylingNodeTextFontSize}
                      onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeTextFontSize', e.value)}
                    />
                  </div>
                </div>
              </AccordionTab>

              <AccordionTab header={t('stylingNodeTextFontAlign')}>
                <SelectButton
                  id="ud-node-font-alignment"
                  value={userDefinedNodeStyling.stylingNodeTextFontAlign}
                  options={FONT_ALIGNMENT_OPTIONS}
                  itemTemplate={FONT_ALIGNMENT_TEMPLATE}
                  onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeTextFontAlign', e.value)}
                />
              </AccordionTab>

              <AccordionTab header={t('stylingNodeBorder')}>
                <h4 className="m-t-0 m-b-0">{t('nodeBorderLineWidth')}</h4>
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      id="ud-node-border-width"
                      value={userDefinedNodeStyling.stylingNodeBorder}
                      onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeBorder', e.value)}
                    />
                    <Slider
                      min={1}
                      max={10}
                      step={0.5}
                      id="stylingNodeBorder"
                      value={userDefinedNodeStyling.stylingNodeBorder}
                      onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeBorder', e.value)}
                    />
                  </div>
                </div>
                <h4 className="m-t-20 m-b-0">{t('nodeBorderLineWidthHighlighted')}</h4>
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      id="ud-node-border-width-highlighted"
                      value={userDefinedNodeStyling.stylingNodeBorderSelected}
                      onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeBorderSelected', e.value)}
                    />
                    <Slider
                      min={1}
                      max={10}
                      step={0.5}
                      id="stylingNodeBorderSelected"
                      value={userDefinedNodeStyling.stylingNodeBorderSelected}
                      onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeBorderSelected', e.value)}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('nodeColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-text"
                    value={userDefinedNodeStyling.stylingNodeTextColor.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeTextColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeTextColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-border"
                    value={userDefinedNodeStyling.stylingNodeBorderColor.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-border-highlight"
                    value={userDefinedNodeStyling.stylingNodeHighlightBorderColor.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeHighlightBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHighlightBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-background"
                    value={userDefinedNodeStyling.stylingNodeBackgroundColor.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-background-highlight"
                    value={userDefinedNodeStyling.stylingNodeHighlightBackgroundColor.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeHighlightBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHighlightBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-background-hover"
                    value={userDefinedNodeStyling.stylingNodeHoverBackgroundColor.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeHoverBackgroundColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHoverBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-border-hover"
                    value={userDefinedNodeStyling.stylingNodeHoverBorderColor.replace('#', '')}
                    onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeHoverBorderColor', `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHoverBorderColor')}
                  </span>
                </div>
              </AccordionTab>

              <AccordionTab header={t('stylingNodeCaptionProperty')}>
                <Dropdown
                  value={userDefinedNodeStyling.stylingNodeCaptionProperty}
                  options={annotationProperties}
                  filter
                  id="ud-node-caption-property"
                  onChange={(e) => addToObject('userDefinedNodeStyling', 'stylingNodeCaptionProperty', e.value)}
                  className="m-t-10"
                  placeholder={t('selectProperty')}
                />
              </AccordionTab>
            </Accordion>
          </AccordionTab>

          <AccordionTab header={t('stylingNodeByProperty')}>
            <Accordion>
              {
                stylingNodeByProperty.length > 0
                && stylingNodeByProperty.map((stylingProperty, index) => (
                  <AccordionTab
                    key={`node-style-property-tab-${v4()}`}
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
  addToObject: PropTypes.func.isRequired,
  globalNodeStyling: PropTypes.shape().isRequired,
  userDefinedNodeStyling: PropTypes.shape().isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
  stylingNodeByProperty: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  globalNodeStyling,
  userDefinedNodeStyling,
  stylingNodeByProperty,
  annotationProperties
}) => ({
  globalNodeStyling,
  userDefinedNodeStyling,
  stylingNodeByProperty,
  annotationProperties
})

export default connect(
  mapToProps,
  actions
)(NetworkStylingNode)
