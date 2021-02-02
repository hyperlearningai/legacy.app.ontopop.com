import axios from 'axios'
import getNodeProperties from '../../utils/getNodeProperties'
import en from '../../i18n/en'
import showNotification from '../../utils/showNotification'

jest.mock('../../utils/showNotification')
const t = (id) => en[id]
const setStoreState = jest.fn()

describe('getNodeProperties', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should catch error', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => new Error('error'))

    const output = await getNodeProperties({
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not query annotation properties!',
      type: 'warning',
    })
    expect(setStoreState.mock.calls).toEqual(
      [['loading', true], ['loading', false]]
    )
    expect(output).toEqual([])
  })

  it('should return error if status 400 and no data', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => ({
      status: 400,
    }))

    const output = await getNodeProperties({
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not query annotation properties!',
      type: 'warning',
    })
    expect(setStoreState.mock.calls).toEqual(
      [['loading', true], ['loading', false]]
    )
    expect(output).toEqual([])
  })

  it('should return data', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => ({
      status: 200,
      data: {
        'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': {
          id: 5,
          rdfAbout: 'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4',
          rdfsLabel: 'Synonym',
          skosComment: 'The list of existing Synonyms can be found in Project/Tags.',
          skosDefinition: 'Annotation used to describe Synonyms of a specific Entity.'
        },
        'http://www.w3.org/2004/02/skos/core#note': {
          id: 13,
          rdfAbout: 'http://www.w3.org/2004/02/skos/core#note',
          rdfsLabel: null,
          skosComment: null,
          skosDefinition: null
        }
      }
    }))

    const output = await getNodeProperties({
      setStoreState,
      t
    })

    expect(setStoreState.mock.calls).toEqual(
      [['loading', true], ['loading', false]]
    )
    expect(output).toEqual([
      {
        id: 'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4',
        label: 'Synonym',
      },
      {
        id: 'http://www.w3.org/2004/02/skos/core#note',
        label: 'core#note',
      },
      {
        id: 'rdfAbout',
        label: 'rdfAbout',
      },
      {
        id: 'rdfsLabel',
        label: 'rdfsLabel',
      },
      {
        id: 'skosComment',
        label: 'skosComment',
      },
      {
        id: 'skosDefinition',
        label: 'skosDefinition',
      },
    ])
  })
})
