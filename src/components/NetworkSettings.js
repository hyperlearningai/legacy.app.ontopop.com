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
  physicsRepulsion,
  physicsHierarchicalView,
}) => {
  const { t } = useTranslation()
  const [color1, setColor1] = useState(null)
  const [color2, setColor2] = useState('1976D2')
  const [selectedCities2, setSelectedCities2] = useState(null)
  const options = ['Left', 'Middle', 'Right']
  const [value1, setValue1] = useState('Middle');
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  const countries = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
  ];
  const countryTemplate = (option) => {
    return (
      <div className="country-item">
        <img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
        <div>{option.name}</div>
      </div>
    );
  }

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
                      <ColorPicker value={color1} onChange={(e) => setColor1(e.value)}></ColorPicker> <span> {t('chooseColor')}</span>
                    </AccordionTab>
                    <AccordionTab header={t('edgeLineStyle')}>
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
                  <div className="card">
                    <h3>{t('edgeLineStyleColorChooseProperty')}</h3>
                    <MultiSelect value={selectedCities2} options={cities} onChange={(e) => setSelectedCities2(e.value)} optionLabel="name" placeholder="Select a City" display="chip" />
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
                      <ColorPicker value={color1} onChange={(e) => setColor1(e.value)}></ColorPicker> <span> {t('chooseColor')}</span>
                    </AccordionTab>
                    <AccordionTab header={t('edgeLineStyle')}>
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
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
}

const mapToProps = ({
  physicsEdgeLength,
  physicsEdgeWidth,
  physicsRepulsion,
  physicsHierarchicalView,
}) => ({
  physicsEdgeLength,
  physicsEdgeWidth,
  physicsRepulsion,
  physicsHierarchicalView,
})

export default connect(
  mapToProps,
  actions
)(NetworkSettings)
