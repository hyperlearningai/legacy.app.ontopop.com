/* eslint max-len:0 */
import setOntology from '../../../utils/setOntology'
import setOntologyDeleteNode from '../../../utils/setOntology/setOntologyDeleteNode'
import setOntologyUpdateNode from '../../../utils/setOntology/setOntologyUpdateNode'
import setOntologyAddNode from '../../../utils/setOntology/setOntologyAddNode'
import setOntologyRestoreNode from '../../../utils/setOntology/setOntologyRestoreNode'

jest.mock('../../../utils/setOntology/setOntologyDeleteNode')
jest.mock('../../../utils/setOntology/setOntologyUpdateNode')
jest.mock('../../../utils/setOntology/setOntologyAddNode')
jest.mock('../../../utils/setOntology/setOntologyRestoreNode')
const selectedElement = 'id-123'
const setStoreState = jest.fn()
const selectedElementProperties = { rdfsLabel: 'id-123' }
const addToObject = jest.fn()

describe('setOntology', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when type node and operation restore', async () => {
    const operation = 'restore'
    const type = 'node'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject
    })

    expect(setOntologyRestoreNode).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      addToObject
    })
  })

  it('should work correctly when type node and operation delete', async () => {
    const operation = 'delete'
    const type = 'node'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject
    })

    expect(setOntologyDeleteNode).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      addToObject
    })
  })

  it('should work correctly when type node and operation update', async () => {
    const operation = 'update'
    const type = 'node'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject
    })

    expect(setOntologyUpdateNode).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject
    })
  })

  it('should work correctly when type node and operation add', async () => {
    const operation = 'add'
    const type = 'node'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject
    })

    expect(setOntologyAddNode).toHaveBeenCalledWith({
      setStoreState,
      selectedElementProperties,
      addToObject
    })
  })
})
