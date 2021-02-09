import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { JSDOM } from 'jsdom'
import ExportSettings from '../../components/ExportSettings'

const dom = new JSDOM()
const currentDocument = global.document
const currentWindow = global.window

global.document = dom.window.document
global.window = dom.window

const setup = () => {
  const props = {}

  const component = shallow(<ExportSettings {...props} />)

  return {
    component,
    props
  }
}

describe('ExportSettings', () => {
  afterEach(() => {
    jest.clearAllMocks()
    global.document = currentDocument
    global.window = currentWindow
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
