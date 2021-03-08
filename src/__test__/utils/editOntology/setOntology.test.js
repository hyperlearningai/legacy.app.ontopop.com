/* eslint max-len:0 */
import setOntology from '../../../utils/editOntology/setOntology'
import setOntologyDeleteNode from '../../../utils/editOntology/setOntologyDeleteNode'
import setOntologyUpdateNode from '../../../utils/editOntology/setOntologyUpdateNode'
import setOntologyAddNode from '../../../utils/editOntology/setOntologyAddNode'
import setOntologyRestoreNode from '../../../utils/editOntology/setOntologyRestoreNode'
import setOntologyAddEdge from '../../../utils/editOntology/setOntologyAddEdge'
import setOntologyDeleteEdge from '../../../utils/editOntology/setOntologyDeleteEdge'
import setOntologyRestoreEdge from '../../../utils/editOntology/setOntologyRestoreEdge'

import en from '../../../i18n/en'

jest.mock('../../../utils/editOntology/setOntologyDeleteNode')
jest.mock('../../../utils/editOntology/setOntologyUpdateNode')
jest.mock('../../../utils/editOntology/setOntologyAddNode')
jest.mock('../../../utils/editOntology/setOntologyRestoreNode')
jest.mock('../../../utils/editOntology/setOntologyAddEdge')
jest.mock('../../../utils/editOntology/setOntologyDeleteEdge')
jest.mock('../../../utils/editOntology/setOntologyRestoreEdge')

const selectedElement = 'id-123'
const setStoreState = jest.fn()
const selectedElementProperties = { rdfsLabel: 'id-123' }
const t = (id) => en[id]

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
      t
    })

    expect(setOntologyRestoreNode).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      t
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
      t
    })

    expect(setOntologyDeleteNode).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      t
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
      t
    })

    expect(setOntologyUpdateNode).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      selectedElementProperties,
      t
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
      t
    })

    expect(setOntologyAddNode).toHaveBeenCalledWith({
      setStoreState,
      selectedElementProperties,
      t
    })
  })

  it('should work correctly when type connection and operation add', async () => {
    const operation = 'add'
    const type = 'edge'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      t
    })

    expect(setOntologyAddEdge).toHaveBeenCalledWith({
      selectedElementProperties,
      setStoreState,
      t
    })
  })

  it('should work correctly when type connection and operation delete', async () => {
    const operation = 'delete'
    const type = 'edge'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      t
    })

    expect(setOntologyDeleteEdge).toHaveBeenCalledWith({
      setStoreState,
      selectedElement,
      t
    })
  })

  it('should work correctly when type connection and operation restore', async () => {
    const operation = 'restore'
    const type = 'edge'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      t
    })

    expect(setOntologyRestoreEdge).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      t
    })
  })
})
