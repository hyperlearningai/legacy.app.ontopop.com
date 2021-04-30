import resetBoundingBoxNodes from '../../../utils/boundingBoxSelection/resetBoundingBoxNodes'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'

jest.mock('../../../utils/networkStyling/setNodeStyle')

store.getState = jest.fn().mockImplementation(() => ({
  selectedBoundingBoxNodes: [
    classesFromApi['1'],
  ],
  classesFromApi
}))

describe('resetBoundingBoxNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await resetBoundingBoxNodes()

    expect(setNodeStyle).toHaveBeenCalledWith({
      node: classesFromApi['1']
    })
  })
})
