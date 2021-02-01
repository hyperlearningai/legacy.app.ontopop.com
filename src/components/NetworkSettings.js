import React, { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  SiAtom
} from 'react-icons/si'
import {
  FaSitemap
} from 'react-icons/fa'
import {
  IoFootballOutline,
  IoGitNetworkSharp
} from 'react-icons/io5'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { ColorPicker } from 'primereact/colorpicker'
import { SelectButton } from 'primereact/selectbutton'
import { RadioButton } from 'primereact/radiobutton'
import { InputText } from 'primereact/inputtext'
import { Slider } from 'primereact/slider'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { SIDEBAR_VIEW_SETTINGS } from '../constants/views'

const NetworkSettings = ({
  setStoreState,
  physicsEdgeLength,
  physicsEdgeWidth,
  physicsEdgeLineStyle,
  physicsEdgeLineColor,
  physicsEdgeLineColorHover,
  physicsEdgeLineColorHighlight,
  physicsNodeShape,
  physicsNodeSize,
  physicsNodeBorder,
  physicsNodeBorderSelected,
  physicsNodeBorderColor,
  physicsNodeBackgroundColor,
  physicsNodeHighlightBorderColor,
  physicsNodeHighlightBackgroundColor,
  physicsNodeTextColor,
  physicsRepulsion,
  physicsHierarchicalView,
}) => {
  const { t } = useTranslation()
  const options = ['Left', 'Middle', 'Right']
  const [value1, setValue1] = useState('Middle')
  // Physics consts
  // const [physicsEdgeLineStyle, setValueLineStyle] = useState(false);
  const edgeLineStyleOptions = [
    { icon: 'pi pi-ellipsis-h', value: true },
    { icon: 'pi pi-minus', value: false }
  ]
  const edgeLineStyleTemplate = (option) => <i className={option.icon} />

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
  const selectedNodeOption = useState(physicsNodeShape.value)

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_SETTINGS)}
      </div>
      <div className="network-settings">
        <div className="card">
          <Accordion>
            <AccordionTab header={t('edgeStyling')}>
              <Accordion>
                <AccordionTab header={t('edgeStylingGlobal')}>
                  <Accordion>
                    <AccordionTab header={t('edgeLength')}>
                      <div className="network-settings-input">
                        <div className="network-settings-item-input">
                          <InputText value={physicsEdgeLength} onChange={(e) => setStoreState('physicsEdgeLength', parseInt(e.value))} />
                          <Slider
                            min={1}
                            max={1000}
                            step={1}
                            id="rating"
                            value={physicsEdgeLength}
                            onChange={(e) => setStoreState('physicsEdgeLength', parseInt(e.value))}
                          />
                        </div>
                      </div>

                      <div className="network-settings-input">
                        <div className="label">
                          {t('positioning')}
                        </div>
                        <div className="network-settings-buttons">
                          <Button
                            tooltip={t('hierachicalView')}
                            tooltipOptions={{ position: 'top' }}
                            className={physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsHierarchicalView', true)}
                          >
                            <FaSitemap />
                          </Button>
                          <Button
                            tooltip={t('gravitationalView')}
                            tooltipOptions={{ position: 'top' }}
                            className={!physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsHierarchicalView', false)}
                          >
                            <SiAtom />
                          </Button>
                        </div>
                      </div>

                      <div className="network-settings-input">
                        <div className="label">
                          {t('repulsion')}
                        </div>
                        <div className="network-settings-buttons">
                          <Button
                            tooltip={t('enableRepulsion')}
                            tooltipOptions={{ position: 'top' }}
                            className={physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsRepulsion', true)}
                          >
                            <IoFootballOutline />
                          </Button>
                          <Button
                            tooltip={t('disableRepulsion')}
                            tooltipOptions={{ position: 'top' }}
                            className={!physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsRepulsion', false)}
                          >
                            <IoGitNetworkSharp />
                          </Button>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab header={t('edgeThickness')}>
                      <InputText value={physicsEdgeWidth} onChange={(e) => setStoreState('physicsEdgeWidth', parseInt(e.value))} />
                      <Slider
                        min={1}
                        max={20}
                        step={1}
                        id="edgeWidthSlider"
                        value={physicsEdgeWidth}
                        onChange={(e) => setStoreState('physicsEdgeWidth', parseInt(e.value))}
                      />
                    </AccordionTab>
                    <AccordionTab header={t('edgeLineStyleColor')}>
                      <h4 className="m-t-5 m-b-10">{t('edgeLineColorInstructions')}</h4>
                      <div className="m-b-10">
                        <ColorPicker value={physicsEdgeLineColor} onChange={(e) => setStoreState('physicsEdgeLineColor', e.value)} />
                        <span>
                          &nbsp;
                          {t('edgeLineStyleLineColor')}
                        </span>
                      </div>
                      <div className="m-b-10">
                        <ColorPicker value={physicsEdgeLineColorHighlight} onChange={(e) => setStoreState('physicsEdgeLineColorHighlight', e.value)} />
                        <span>
                          &nbsp;
                          {' '}
                          {t('edgeLineStyleHighlightColor')}
                        </span>
                      </div>
                      <div className="m-b-10">
                        <ColorPicker value={physicsEdgeLineColorHover} onChange={(e) => setStoreState('physicsEdgeLineColorHover', e.value)} />
                        <span>
                          &nbsp;
                          {' '}
                          {t('edgeLineStyleHoverColor')}
                        </span>
                      </div>
                    </AccordionTab>
                    <AccordionTab header={t('edgeLineStyle')}>
                      <SelectButton
                        value={physicsEdgeLineStyle}
                        options={edgeLineStyleOptions}
                        onChange={(e) => setStoreState('physicsEdgeLineStyle', e.value)}
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
                          <InputText value={physicsEdgeLength} onChange={(e) => setStoreState('physicsEdgeLength', parseInt(e.value))} />
                          <Slider
                            min={0}
                            max={1000}
                            step={1}
                            id="rating"
                            value={physicsEdgeLength}
                            onChange={(e) => setStoreState('physicsEdgeLength', parseInt(e.value))}
                          />
                        </div>
                      </div>

                      <div className="network-settings-input">
                        <div className="label">
                          {t('positioning')}
                        </div>
                        <div className="network-settings-buttons">
                          <Button
                            tooltip={t('hierachicalView')}
                            tooltipOptions={{ position: 'top' }}
                            className={physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsHierarchicalView', true)}
                          >
                            <FaSitemap />
                          </Button>
                          <Button
                            tooltip={t('gravitationalView')}
                            tooltipOptions={{ position: 'top' }}
                            className={!physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsHierarchicalView', false)}
                          >
                            <SiAtom />
                          </Button>
                        </div>
                      </div>

                      <div className="network-settings-input">
                        <div className="label">
                          {t('repulsion')}
                        </div>
                        <div className="network-settings-buttons">
                          <Button
                            tooltip={t('enableRepulsion')}
                            tooltipOptions={{ position: 'top' }}
                            className={physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsRepulsion', true)}
                          >
                            <IoFootballOutline />
                          </Button>
                          <Button
                            tooltip={t('disableRepulsion')}
                            tooltipOptions={{ position: 'top' }}
                            className={!physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsRepulsion', false)}
                          >
                            <IoGitNetworkSharp />
                          </Button>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab header={t('edgeThickness')}>
                      <InputText value={physicsEdgeWidth} onChange={(e) => setStoreState('physicsEdgeWidth', parseInt(e.value))} />
                      <Slider
                        min={1}
                        max={20}
                        step={1}
                        id="edgeWidthSlider"
                        value={physicsEdgeWidth}
                        onChange={(e) => setStoreState('physicsEdgeWidth', parseInt(e.value))}
                      />
                    </AccordionTab>
                    <AccordionTab header={t('edgeLineStyleColor')}>
                      <h4 className="m-t-5 m-b-10">{t('edgeLineColorInstructions')}</h4>
                      <div className="m-b-10">
                        <ColorPicker value={physicsEdgeLineColor} onChange={(e) => setStoreState('physicsEdgeLineColor', e.value)} />
                        <span>
                          &nbsp;
                          {' '}
                          {t('edgeLineStyleLineColor')}
                        </span>
                      </div>
                      <div className="m-b-10">
                        <ColorPicker value={physicsEdgeLineColorHighlight} onChange={(e) => setStoreState('physicsEdgeLineColorHighlight', e.value)} />
                        <span>
                          &nbsp;
                          {' '}
                          {t('edgeLineStyleHighlightColor')}
                        </span>
                      </div>
                      <div className="m-b-10">
                        <ColorPicker value={physicsEdgeLineColorHover} onChange={(e) => setStoreState('physicsEdgeLineColorHover', e.value)} />
                        <span>
                          &nbsp;
                          {' '}
                          {t('edgeLineStyleHoverColor')}
                        </span>
                      </div>
                    </AccordionTab>
                    <AccordionTab header={t('edgeLineStyle')}>
                      <SelectButton
                        value={physicsEdgeLineStyle}
                        options={edgeLineStyleOptions}
                        onChange={(e) => setStoreState('physicsEdgeLineStyle', e.value)}
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
            <AccordionTab header={t('nodeStyling')}>
              <Accordion>
                <AccordionTab header={t('nodeStylingGlobal')}>
                  <Accordion>
                    <AccordionTab header={t('nodeSize')}>
                      <div className="network-settings-input">
                        <div className="network-settings-item-input">
                          <InputText value={physicsNodeSize} onChange={(e) => setStoreState('physicsNodeSize', parseInt(e.value))} />
                          <Slider
                            min={1}
                            max={1000}
                            step={1}
                            id="nodeSize"
                            value={physicsNodeSize}
                            onChange={(e) => setStoreState('physicsNodeSize', parseInt(e.value))}
                          />
                        </div>
                      </div>

                      <div className="network-settings-input">
                        <div className="label">
                          {t('positioning')}
                        </div>
                        <div className="network-settings-buttons">
                          <Button
                            tooltip={t('hierachicalView')}
                            tooltipOptions={{ position: 'top' }}
                            className={physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsHierarchicalView', true)}
                          >
                            <FaSitemap />
                          </Button>
                          <Button
                            tooltip={t('gravitationalView')}
                            tooltipOptions={{ position: 'top' }}
                            className={!physicsHierarchicalView ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsHierarchicalView', false)}
                          >
                            <SiAtom />
                          </Button>
                        </div>
                      </div>

                      <div className="network-settings-input">
                        <div className="label">
                          {t('repulsion')}
                        </div>
                        <div className="network-settings-buttons">
                          <Button
                            tooltip={t('enableRepulsion')}
                            tooltipOptions={{ position: 'top' }}
                            className={physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsRepulsion', true)}
                          >
                            <IoFootballOutline />
                          </Button>
                          <Button
                            tooltip={t('disableRepulsion')}
                            tooltipOptions={{ position: 'top' }}
                            className={!physicsRepulsion ? 'network-settings-buttons-button-selected' : ''}
                            onClick={() => setStoreState('physicsRepulsion', false)}
                          >
                            <IoGitNetworkSharp />
                          </Button>
                        </div>
                      </div>
                    </AccordionTab>
                    <AccordionTab header={t('nodeBorder')}>
                      <h4 className="m-t-0 m-b-0">{t('nodeBorderLineWidth')}</h4>
                      <div className="network-settings-input">
                        <div className="network-settings-item-input">
                          <InputText value={physicsNodeBorder} onChange={(e) => setStoreState('physicsNodeBorder', parseInt(e.value))} />
                          <Slider
                            min={1}
                            max={10}
                            step={0.5}
                            id="physicsNodeBorder"
                            value={physicsNodeBorder}
                            onChange={(e) => setStoreState('physicsNodeBorder', parseInt(e.value))}
                          />
                        </div>
                      </div>
                      <h4 className="m-t-20 m-b-0">{t('nodeBorderLineWidthHighlighted')}</h4>
                      <div className="network-settings-input">
                        <div className="network-settings-item-input">
                          <InputText value={physicsNodeBorderSelected} onChange={(e) => setStoreState('physicsNodeBorderSelected', parseInt(e.value))} />
                          <Slider
                            min={1}
                            max={10}
                            step={0.5}
                            id="physicsNodeBorderSelected"
                            value={physicsNodeBorderSelected}
                            onChange={(e) => setStoreState('physicsNodeBorderSelected', parseInt(e.value))}
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
                              onChange={(e) => setStoreState('physicsNodeShape', e.value)}
                              checked={selectedNodeOption.value === physicsNodeShape}
                            />
                            <label htmlFor={nodeShapeValue.value}>{nodeShapeValue.name}</label>
                          </div>
                        ))
                      }
                    </AccordionTab>
                    <AccordionTab header={t('nodeColor')}>
                      <h4 className="m-t-5 m-b-10">{t('edgeLineColorInstructions')}</h4>
                      <div className="m-b-10">
                        <ColorPicker value={physicsNodeTextColor} onChange={(e) => setStoreState('physicsNodeTextColor', e.value)} />
                        <span>
                          &nbsp;
                          {t('nodeTextColor')}
                        </span>
                      </div>
                      <div className="m-b-10">
                        <ColorPicker value={physicsNodeBorderColor} onChange={(e) => setStoreState('physicsNodeBorderColor', e.value)} />
                        <span>
                          &nbsp;
                          {t('nodeBorderColor')}
                        </span>
                      </div>
                      <div className="m-b-10">
                        <ColorPicker value={physicsNodeHighlightBorderColor} onChange={(e) => setStoreState('physicsNodeHighlightBorderColor', e.value)} />
                        <span>
                          &nbsp;
                          {' '}
                          {t('nodeBorderHighlightedColor')}
                        </span>
                      </div>
                      <div className="m-b-10">
                        <ColorPicker value={physicsNodeBackgroundColor} onChange={(e) => setStoreState('physicsNodeBackgroundColor', e.value)} />
                        <span>
                          &nbsp;
                          {' '}
                          {t('nodeBackgroundColor')}
                        </span>
                      </div>
                      <div className="m-b-10">
                        <ColorPicker value={physicsNodeHighlightBackgroundColor} onChange={(e) => setStoreState('physicsNodeHighlightBackgroundColor', e.value)} />
                        <span>
                          &nbsp;
                          {' '}
                          {t('nodeBackgroundHighlightedColor')}
                        </span>
                      </div>
                    </AccordionTab>
                    <AccordionTab header={t('nodeCaptionPosition')}>
                      <SelectButton
                        value={physicsEdgeLineStyle}
                        options={edgeLineStyleOptions}
                        onChange={(e) => setStoreState('physicsEdgeLineStyle', e.value)}
                        itemTemplate={edgeLineStyleTemplate}
                      />
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
        </div>
      </div>
    </>
  )
}

NetworkSettings.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  physicsEdgeLength: PropTypes.number.isRequired,
  physicsEdgeWidth: PropTypes.number.isRequired,
  physicsEdgeLineStyle: PropTypes.bool.isRequired,
  physicsEdgeLineColor: PropTypes.string.isRequired,
  physicsEdgeLineColorHover: PropTypes.string.isRequired,
  physicsEdgeLineColorHighlight: PropTypes.string.isRequired,
  physicsNodeShape: PropTypes.string.isRequired,
  physicsNodeBorder: PropTypes.number.isRequired,
  physicsNodeBorderSelected: PropTypes.number.isRequired,
  physicsNodeBorderColor: PropTypes.string.isRequired,
  physicsNodeTextColor: PropTypes.string.isRequired,
  physicsNodeBackgroundColor: PropTypes.string.isRequired,
  physicsNodeHighlightBorderColor: PropTypes.string.isRequired,
  physicsNodeHighlightBackgroundColor: PropTypes.string.isRequired,
  physicsNodeSize: PropTypes.number.isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
}

const mapToProps = ({
  physicsEdgeLength,
  physicsEdgeWidth,
  physicsEdgeLineStyle,
  physicsEdgeLineColor,
  physicsEdgeLineColorHover,
  physicsEdgeLineColorHighlight,
  physicsNodeShape,
  physicsNodeBorder,
  physicsNodeBorderSelected,
  physicsNodeBorderColor,
  physicsNodeBackgroundColor,
  physicsNodeHighlightBorderColor,
  physicsNodeHighlightBackgroundColor,
  physicsNodeTextColor,
  physicsNodeSize,
  physicsRepulsion,
  physicsHierarchicalView,
}) => ({
  physicsEdgeLength,
  physicsEdgeWidth,
  physicsEdgeLineStyle,
  physicsEdgeLineColor,
  physicsEdgeLineColorHover,
  physicsEdgeLineColorHighlight,
  physicsNodeShape,
  physicsNodeBorder,
  physicsNodeBorderSelected,
  physicsNodeBorderColor,
  physicsNodeBackgroundColor,
  physicsNodeHighlightBorderColor,
  physicsNodeHighlightBackgroundColor,
  physicsNodeTextColor,
  physicsNodeSize,
  physicsRepulsion,
  physicsHierarchicalView,
})

export default connect(
  mapToProps,
  actions
)(NetworkSettings)
