/* eslint max-len:0 */
import setOntologyUpdateNode from '../../../utils/editOntology/setOntologyUpdateNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

const selectedElementProperties = {
  rdfAbout: 'http://test.com/node',
  rdfsLabel: 'New node',
}
const selectedElement = '1'
const setStoreState = jest.fn()

const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
newClassesFromApi[selectedElement] = {
  ...newClassesFromApi[selectedElement],
  label: 'New node',
  rdfsLabel: 'New node',
}

describe('setOntologyUpdateNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingNodeCaptionProperty: 'rdfsLabel',
      classesFromApi,
      updatedNodes: [],
    }))

    await setOntologyUpdateNode({
      selectedElement,
      setStoreState,
      selectedElementProperties,
    })

    expect(updateNodes).toHaveBeenLastCalledWith(
      {
        id: '1',
        label: 'New node',
        rdfsLabel: 'New node'
      }
    )

    expect(setStoreState.mock.calls).toEqual([
      [
        'classesFromApi',
        newClassesFromApi
      ],
      [
        'updatedNodes',
        ['1']
      ]
    ])
  })
})
