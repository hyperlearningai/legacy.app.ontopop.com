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
import { MultiSelect } from 'primereact/multiselect'
import { SelectButton } from 'primereact/selectbutton'
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
  physicsRepulsion,
  physicsHierarchicalView,
}) => {
  const { t } = useTranslation()
  const [color1, setColor1] = useState(null)
  const [selectedCities2, setSelectedCities2] = useState(null)
  const options = ['Left', 'Middle', 'Right']
  const [value1, setValue1] = useState('Middle')

  const [value3, setValue3] = useState(null)
  const justifyOptions = [
    { icon: 'pi pi-ellipsis-h', value: 'dashed' },
    { icon: 'pi pi-minus', value: 'solid' }
  ]
  const justifyTemplate = (option) => <i className={option.icon} />

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ]

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
                      <h3>{t('edgeLineStyleCurrentColor')}</h3>
                      <ColorPicker value={color1} onChange={(e) => setColor1(e.value)} />
                      <span>
                        {t('chooseColor')}
                      </span>
                    </AccordionTab>
                    <AccordionTab header={t('edgeLineStyle')}>
                      <SelectButton value={value3} options={justifyOptions} onChange={(e) => setValue3(e.value)} itemTemplate={justifyTemplate} />
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
                    <MultiSelect value={selectedCities2} options={cities} onChange={(e) => setSelectedCities2(e.value)} optionLabel="name" placeholder="Select a City" display="chip" />
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
                        min={0}
                        max={1000}
                        step={1}
                        id="edgeWidthSlider"
                        value={physicsEdgeWidth}
                        onChange={(e) => setStoreState('physicsEdgeWidth', parseInt(e.value))}
                      />
                    </AccordionTab>
                    <AccordionTab header={t('edgeLineStyleColor')}>
                      <h3>{t('edgeLineStyleCurrentColor')}</h3>
                      <ColorPicker value={color1} onChange={(e) => setColor1(e.value)} />
                      <span>
                        {t('chooseColor')}
                      </span>
                    </AccordionTab>
                    <AccordionTab header={t('edgeLineStyle')}>
                      <SelectButton value={physicsEdgeLineStyle} onChange={(e) => setStoreState('physicsEdgeLineStyle', parseInt(e.value))} />
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
              here
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
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
}

const mapToProps = ({
  physicsEdgeLength,
  physicsEdgeWidth,
  physicsEdgeLineStyle,
  physicsRepulsion,
  physicsHierarchicalView,
}) => ({
  physicsEdgeLength,
  physicsEdgeWidth,
  physicsEdgeLineStyle,
  physicsRepulsion,
  physicsHierarchicalView,
})

export default connect(
  mapToProps,
  actions
)(NetworkSettings)
