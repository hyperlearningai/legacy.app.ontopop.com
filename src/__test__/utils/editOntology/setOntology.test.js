/* eslint max-len:0 */
import setOntology from '../../../utils/editOntology/setOntology'
import setOntologyDeleteNode from '../../../utils/editOntology/setOntologyDeleteNode'
import setOntologyUpdateNode from '../../../utils/editOntology/setOntologyUpdateNode'
import setOntologyAddNode from '../../../utils/editOntology/setOntologyAddNode'
import setOntologyRestoreNode from '../../../utils/editOntology/setOntologyRestoreNode'
import setOntologyUpdateEdge from '../../../utils/editOntology/setOntologyUpdateEdge'
import setOntologyAddEdge from '../../../utils/editOntology/setOntologyAddEdge'
import setOntologyDeleteEdge from '../../../utils/editOntology/setOntologyDeleteEdge'
import setOntologyRestoreEdge from '../../../utils/editOntology/setOntologyRestoreEdge'
import setOntologyAddConnection from '../../../utils/editOntology/setOntologyAddConnection'
import setOntologyDeleteConnection from '../../../utils/editOntology/setOntologyDeleteConnection'
import setOntologyRestoreConnection from '../../../utils/editOntology/setOntologyRestoreConnection'

import en from '../../../i18n/en'

jest.mock('../../../utils/editOntology/setOntologyDeleteNode')
jest.mock('../../../utils/editOntology/setOntologyUpdateNode')
jest.mock('../../../utils/editOntology/setOntologyAddNode')
jest.mock('../../../utils/editOntology/setOntologyRestoreNode')
jest.mock('../../../utils/editOntology/setOntologyUpdateEdge')
jest.mock('../../../utils/editOntology/setOntologyAddEdge')
jest.mock('../../../utils/editOntology/setOntologyDeleteEdge')
jest.mock('../../../utils/editOntology/setOntologyRestoreEdge')
jest.mock('../../../utils/editOntology/setOntologyAddConnection')
jest.mock('../../../utils/editOntology/setOntologyDeleteConnection')
jest.mock('../../../utils/editOntology/setOntologyRestoreConnection')

const selectedElement = 'id-123'
const setStoreState = jest.fn()
const selectedElementProperties = { rdfsLabel: 'id-123' }
const addToObject = jest.fn()
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
      addToObject,
      t
    })

    expect(setOntologyRestoreNode).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      addToObject
    })
  })

  it('should work correctly when type edge and operation restore', async () => {
    const operation = 'restore'
    const type = 'edge'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject,
      t
    })

    expect(setOntologyRestoreEdge).toHaveBeenCalledWith({
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
      addToObject,
      t
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
      addToObject,
      t
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
      addToObject,
      t
    })

    expect(setOntologyAddNode).toHaveBeenCalledWith({
      setStoreState,
      selectedElementProperties,
      addToObject,
      t
    })
  })

  it('should work correctly when type edge and operation update', async () => {
    const operation = 'update'
    const type = 'edge'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject,
      t
    })

    expect(setOntologyUpdateEdge).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject
    })
  })

  it('should work correctly when type edge and operation add', async () => {
    const operation = 'add'
    const type = 'edge'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject,
      t
    })

    expect(setOntologyAddEdge).toHaveBeenCalledWith({
      setStoreState,
      selectedElementProperties,
      addToObject,
      t
    })
  })

  it('should work correctly when type edge and operation delete', async () => {
    const operation = 'delete'
    const type = 'edge'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject,
      t
    })

    expect(setOntologyDeleteEdge).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      addToObject
    })
  })

  it('should work correctly when type connection and operation add', async () => {
    const operation = 'add'
    const type = 'connection'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject,
      t
    })

    expect(setOntologyAddConnection).toHaveBeenCalledWith({
      selectedElementProperties,
      setStoreState,
      addToObject
    })
  })

  it('should work correctly when type connection and operation delete', async () => {
    const operation = 'delete'
    const type = 'connection'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject,
      t
    })

    expect(setOntologyDeleteConnection).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      addToObject
    })
  })

  it('should work correctly when type connection and operation restore', async () => {
    const operation = 'restore'
    const type = 'connection'

    await setOntology({
      operation,
      type,
      selectedElement,
      setStoreState,
      selectedElementProperties,
      addToObject,
      t
    })

    expect(setOntologyRestoreConnection).toHaveBeenCalledWith({
      selectedElement,
      setStoreState,
      addToObject
    })
  })
})
