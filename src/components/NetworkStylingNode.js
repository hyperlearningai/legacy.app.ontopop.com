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
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const NetworkStylingNode = ({
  updateStoreValue,
  globalNodeStyling,
  userDefinedNodeStyling,
  stylingNodeByProperty,
  annotationProperties,
  annotationPropertiesDatasets
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
                  aria-label="global-node-shape"
                  value={globalNodeStyling.stylingNodeShape}
                  options={nodeShapeOptions}
                  filter
                  id="global-node-shape"
                  onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeShape'], OPERATION_TYPE_UPDATE, e.value)}
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
                            onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeSize'], OPERATION_TYPE_UPDATE, e.value)}
                          />
                          <Slider
                            min={1}
                            max={1000}
                            step={1}
                            id="stylingNodeSize"
                            value={globalNodeStyling.stylingNodeSize}
                            onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeSize'], OPERATION_TYPE_UPDATE, e.value)}
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
                      onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeTextFontSize'], OPERATION_TYPE_UPDATE, e.value)}
                    />
                    <Slider
                      min={1}
                      max={200}
                      step={1}
                      id="stylingNodeSize"
                      value={globalNodeStyling.stylingNodeTextFontSize}
                      onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeTextFontSize'], OPERATION_TYPE_UPDATE, e.value)}
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
                  onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeTextFontAlign'], OPERATION_TYPE_UPDATE, e.value)}
                />
              </AccordionTab>

              <AccordionTab header={t('stylingNodeBorder')}>
                <h4 className="m-t-0 m-b-0">{t('nodeBorderLineWidth')}</h4>
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      id="global-node-border-width"
                      value={globalNodeStyling.stylingNodeBorder}
                      onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeBorder'], OPERATION_TYPE_UPDATE, e.value)}
                    />
                    <Slider
                      min={1}
                      max={10}
                      step={0.5}
                      id="stylingNodeBorder"
                      value={globalNodeStyling.stylingNodeBorder}
                      onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeBorder'], OPERATION_TYPE_UPDATE, e.value)}
                    />
                  </div>
                </div>
                <h4 className="m-t-20 m-b-0">{t('nodeBorderLineWidthHighlighted')}</h4>
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      id="global-node-border-width-highlighted"
                      value={globalNodeStyling.stylingNodeBorderSelected}
                      onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeBorderSelected'], OPERATION_TYPE_UPDATE, e.value)}
                    />
                    <Slider
                      min={1}
                      max={10}
                      step={0.5}
                      id="stylingNodeBorderSelected"
                      value={globalNodeStyling.stylingNodeBorderSelected}
                      onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeBorderSelected'], OPERATION_TYPE_UPDATE, e.value)}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('nodeColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-text"
                    value={globalNodeStyling.stylingNodeTextColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeTextColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeTextColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-border"
                    value={globalNodeStyling.stylingNodeBorderColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeBorderColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-border-highlight"
                    value={globalNodeStyling.stylingNodeHighlightBorderColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeHighlightBorderColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHighlightBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-background"
                    value={globalNodeStyling.stylingNodeBackgroundColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeBackgroundColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-background-dataset"
                    value={globalNodeStyling.stylingNodeBackgroundColorDataset.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeBackgroundColorDataset'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBackgroundColorDataset')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-background-highlight"
                    value={globalNodeStyling.stylingNodeHighlightBackgroundColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeHighlightBackgroundColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHighlightBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-background-hover"
                    value={globalNodeStyling.stylingNodeHoverBackgroundColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeHoverBackgroundColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHoverBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="global-node-color-border-hover"
                    value={globalNodeStyling.stylingNodeHoverBorderColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeHoverBorderColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHoverBorderColor')}
                  </span>
                </div>
              </AccordionTab>

              <AccordionTab header={t('stylingNodeCaptionProperty')}>
                <div className="network-styling-dropdown-row">
                  <span>
                    {t('stylingNodeCaptionProperty')}
                  </span>
                  <Dropdown
                    aria-label="global-node-caption-property"
                    value={globalNodeStyling.stylingNodeCaptionProperty}
                    options={annotationProperties}
                    filter
                    id="global-node-caption-property"
                    onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeCaptionProperty'], OPERATION_TYPE_UPDATE, e.value)}
                    className="m-t-10"
                    placeholder={t('selectProperty')}
                  />
                </div>

                <div className="network-styling-dropdown-row">
                  <span>
                    {t('stylingNodeCaptionPropertyDataset')}
                  </span>
                  <Dropdown
                    aria-label="ud-node-shape"
                    value={globalNodeStyling.stylingNodeCaptionPropertyDataset}
                    options={annotationPropertiesDatasets}
                    filter
                    id="global-node-caption-property-dataset"
                    onChange={(e) => updateStoreValue(['globalNodeStyling', 'stylingNodeCaptionPropertyDataset'], OPERATION_TYPE_UPDATE, e.value)}
                    className="m-t-10"
                    placeholder={t('selectProperty')}
                  />
                </div>

              </AccordionTab>
            </Accordion>
          </AccordionTab>

          <AccordionTab header={t('nodeStylingUserDefined')}>
            <Accordion>
              <AccordionTab header={t('stylingNodeShape')}>
                <Dropdown
                  aria-label="ud-node-shape"
                  value={userDefinedNodeStyling.stylingNodeShape}
                  options={nodeShapeOptions}
                  filter
                  id="ud-node-shape"
                  onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeShape'], OPERATION_TYPE_UPDATE, e.value)}
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
                            onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeSize'], OPERATION_TYPE_UPDATE, e.value)}
                          />
                          <Slider
                            min={1}
                            max={1000}
                            step={1}
                            id="stylingNodeSize"
                            value={userDefinedNodeStyling.stylingNodeSize}
                            onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeSize'], OPERATION_TYPE_UPDATE, e.value)}
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
                      onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeTextFontSize'], OPERATION_TYPE_UPDATE, e.value)}
                    />
                    <Slider
                      min={1}
                      max={200}
                      step={1}
                      id="stylingNodeSize"
                      value={userDefinedNodeStyling.stylingNodeTextFontSize}
                      onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeTextFontSize'], OPERATION_TYPE_UPDATE, e.value)}
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
                  onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeTextFontAlign'], OPERATION_TYPE_UPDATE, e.value)}
                />
              </AccordionTab>

              <AccordionTab header={t('stylingNodeBorder')}>
                <h4 className="m-t-0 m-b-0">{t('nodeBorderLineWidth')}</h4>
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      id="ud-node-border-width"
                      value={userDefinedNodeStyling.stylingNodeBorder}
                      onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeBorder'], OPERATION_TYPE_UPDATE, e.value)}
                    />
                    <Slider
                      min={1}
                      max={10}
                      step={0.5}
                      id="stylingNodeBorder"
                      value={userDefinedNodeStyling.stylingNodeBorder}
                      onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeBorder'], OPERATION_TYPE_UPDATE, e.value)}
                    />
                  </div>
                </div>
                <h4 className="m-t-20 m-b-0">{t('nodeBorderLineWidthHighlighted')}</h4>
                <div className="network-styling-input">
                  <div className="network-styling-item-input">
                    <InputNumber
                      id="ud-node-border-width-highlighted"
                      value={userDefinedNodeStyling.stylingNodeBorderSelected}
                      onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeBorderSelected'], OPERATION_TYPE_UPDATE, e.value)}
                    />
                    <Slider
                      min={1}
                      max={10}
                      step={0.5}
                      id="stylingNodeBorderSelected"
                      value={userDefinedNodeStyling.stylingNodeBorderSelected}
                      onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeBorderSelected'], OPERATION_TYPE_UPDATE, e.value)}
                    />
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header={t('nodeColor')}>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-text"
                    value={userDefinedNodeStyling.stylingNodeTextColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeTextColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeTextColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-border"
                    value={userDefinedNodeStyling.stylingNodeBorderColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeBorderColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-border-highlight"
                    value={userDefinedNodeStyling.stylingNodeHighlightBorderColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeHighlightBorderColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHighlightBorderColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-background"
                    value={userDefinedNodeStyling.stylingNodeBackgroundColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeBackgroundColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-background-dataset"
                    value={userDefinedNodeStyling.stylingNodeBackgroundColorDataset.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeBackgroundColorDataset'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeBackgroundColorDataset')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-background-highlight"
                    value={userDefinedNodeStyling.stylingNodeHighlightBackgroundColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeHighlightBackgroundColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHighlightBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-background-hover"
                    value={userDefinedNodeStyling.stylingNodeHoverBackgroundColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeHoverBackgroundColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHoverBackgroundColor')}
                  </span>
                </div>
                <div className="m-b-10 colorpicker">
                  <ColorPicker
                    id="ud-node-color-border-hover"
                    value={userDefinedNodeStyling.stylingNodeHoverBorderColor.replace('#', '')}
                    onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeHoverBorderColor'], OPERATION_TYPE_UPDATE, `#${e.value}`)}
                  />
                  <span>
                    {t('stylingNodeHoverBorderColor')}
                  </span>
                </div>
              </AccordionTab>

              <AccordionTab header={t('stylingNodeCaptionProperty')}>
                <div className="network-styling-dropdown-row">
                  <span>
                    {t('stylingNodeCaptionProperty')}
                  </span>
                  <Dropdown
                    aria-label="ud-node-caption-property-dataset"
                    value={userDefinedNodeStyling.stylingNodeCaptionProperty}
                    options={annotationProperties}
                    filter
                    id="ud-node-caption-property"
                    onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeCaptionProperty'], OPERATION_TYPE_UPDATE, e.value)}
                    className="m-t-10"
                    placeholder={t('selectProperty')}
                  />
                </div>

                <div className="network-styling-dropdown-row">
                  <span>
                    {t('stylingNodeCaptionPropertyDataset')}
                  </span>
                  <Dropdown
                    aria-label="ud-node-caption-property-dataset"
                    value={userDefinedNodeStyling.stylingNodeCaptionPropertyDataset}
                    options={annotationPropertiesDatasets}
                    filter
                    id="ud-node-caption-property-dataset"
                    onChange={(e) => updateStoreValue(['userDefinedNodeStyling', 'stylingNodeCaptionPropertyDataset'], OPERATION_TYPE_UPDATE, e.value)}
                    className="m-t-10"
                    placeholder={t('selectProperty')}
                  />
                </div>
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
  updateStoreValue: PropTypes.func.isRequired,
  globalNodeStyling: PropTypes.shape().isRequired,
  userDefinedNodeStyling: PropTypes.shape().isRequired,
  annotationProperties: PropTypes.arrayOf(PropTypes.shape).isRequired,
  annotationPropertiesDatasets: PropTypes.arrayOf(PropTypes.shape).isRequired,
  stylingNodeByProperty: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  globalNodeStyling,
  userDefinedNodeStyling,
  stylingNodeByProperty,
  annotationProperties,
  annotationPropertiesDatasets
}) => ({
  globalNodeStyling,
  userDefinedNodeStyling,
  stylingNodeByProperty,
  annotationProperties,
  annotationPropertiesDatasets
})

export default connect(
  mapToProps,
  actions
)(NetworkStylingNode)
