/* eslint max-len:0 */
import setOntology from '../../../utils/editOntology/setOntology'
import setOntologyDeleteNode from '../../../utils/editOntology/setOntologyDeleteNode'
import setOntologyUpdateNode from '../../../utils/editOntology/setOntologyUpdateNode'
import setOntologyAddNode from '../../../utils/editOntology/setOntologyAddNode'
import setOntologyRestoreNode from '../../../utils/editOntology/setOntologyRestoreNode'
import setOntologyAddConnection from '../../../utils/editOntology/setOntologyAddConnection'
import setOntologyDeleteConnection from '../../../utils/editOntology/setOntologyDeleteConnection'
import setOntologyRestoreConnection from '../../../utils/editOntology/setOntologyRestoreConnection'

import en from '../../../i18n/en'

jest.mock('../../../utils/editOntology/setOntologyDeleteNode')
jest.mock('../../../utils/editOntology/setOntologyUpdateNode')
jest.mock('../../../utils/editOntology/setOntologyAddNode')
jest.mock('../../../utils/editOntology/setOntologyRestoreNode')
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
      t
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
      t
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
      setStoreState,
      selectedElement,
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
    })
  })
})
