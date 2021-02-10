/* eslint max-len:0 */
import { JSDOM } from 'jsdom'
import { store } from 'react-notifications-component'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import exportOwl from '../../../utils/exportSettings/exportOwl'
import en from '../../../i18n/en'

const dom = new JSDOM()
const currentDocument = global.document
const currentWindow = global.window

global.document = dom.window.document
global.window = dom.window

const addNotification = jest.fn()
store.addNotification = addNotification
const exportFileName = 'filename'
const t = (id) => en[id]
const appendChild = jest.fn()
const remove = jest.fn()
const removeChild = jest.fn()
const click = jest.fn()

const currentCreateObjectURL = URL.createObjectURL
const createObjectURLMock = jest.fn()
URL.createObjectURL = () => createObjectURLMock()

global.document.createElement = jest.fn().mockImplementation(() => ({
  style: {
    display: 'block'
  },
  remove: () => remove,
  click
}))

global.document.body.appendChild = jest.fn().mockImplementation(appendChild)
global.document.body.removeChild = jest.fn().mockImplementation(removeChild)

const availableNodesNormalised = {
  'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb': {
    rdfAbout: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
    rdfsLabel: 'Requirement',
    skosDefinition: 'One or more clear statements concerning the intended functionality of a System.',
    skosComment: null,
    skosExample: null,
    owlAnnotationProperties: {
      'http://webprotege.stanford.edu/R9S1rcldeHXCMGJUZEkvaWJ': 'Functional rquirement, non-functional requirement',
      'http://www.w3.org/2004/02/skos/core#definition': 'One or more clear statements concerning the intended functionality of a System.',
      'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'Handover',
      'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Design'
    },
    rdfsSubClassOf: [
      {
        classRdfAbout: 'http://webprotege.stanford.edu/R9WIxkbvxYbhp8NthzYsXSx',
        owlRestriction: null
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv',
          classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi',
          classRdfAbout: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi',
          classRdfAbout: 'http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R8Pp0U9lbiy2Wpdm6YzyV5m',
          classRdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8'
        }
      }
    ],
    id: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
    label: 'Requirement',
    color: {
      background: '#ff6f61'
    }
  },
  'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n': {
    rdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
    rdfsLabel: 'Stakeholder',
    skosDefinition: 'Person, Persons, or organisation affected by or with an interest in a Project, including statutory and non-statutory consultees.',
    skosComment: null,
    skosExample: null,
    owlAnnotationProperties: {
      'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Design Construct Plan Operate Finance',
      'http://webprotege.stanford.edu/R9S1rcldeHXCMGJUZEkvaWJ': 'Land Owner, Government, Non-Government organisation, Regulator, Resident, Direct, Wider',
      'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'GIS RedLine Handover',
      'http://webprotege.stanford.edu/RB4qRK0cMJE67o1Bc9MmGDD': 'GIS RedLine',
      'http://www.w3.org/2004/02/skos/core#definition': 'Person, Persons, or organisation affected by or with an interest in a Project, including statutory and non-statutory consultees.'
    },
    rdfsSubClassOf: [
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
        owlRestriction: null
      }
    ],
    id: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
    label: 'Stakeholder'
  },
  'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9': {
    rdfAbout: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
    rdfsLabel: 'Project',
    skosDefinition: 'A time-bound undertaking of the Licence Holder (and Suppliers) to deliver a defined outcome to their organisation, stakeholders, or the general public.',
    skosComment: null,
    skosExample: 'The road that needs to be built between the M25 and xyz in order to connect London to Inverness as part of a wider Programme.',
    owlAnnotationProperties: {
      'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Design Plan Finance Operate Construct Communications',
      'http://www.w3.org/2004/02/skos/core#example': 'The road that needs to be built between the M25 and xyz in order to connect London to Inverness as part of a wider Programme.',
      'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'Pre-project phase, Construction phase',
      'http://www.w3.org/2004/02/skos/core#definition': 'A time-bound undertaking of the Licence Holder (and Suppliers) to deliver a defined outcome to their organisation, stakeholders, or the general public.'
    },
    rdfsSubClassOf: [
      {
        classRdfAbout: 'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
          classRdfAbout: 'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RUWwziHPSHb0QUR433d6n3',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RvMCpTSGsQmEAyy8Mi6fdN',
          classRdfAbout: 'http://webprotege.stanford.edu/RUWwziHPSHb0QUR433d6n3'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        owlRestriction: null
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RCdbVM6sx0TFJ2bA7j7XW9T',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R4I2v4Y7su3Adf0Vcj6TWd',
          classRdfAbout: 'http://webprotege.stanford.edu/RCdbVM6sx0TFJ2bA7j7XW9T'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXCmh2J46cqAwwT2c4D7Bx',
          classRdfAbout: 'http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/R7msJHfQBx9IyBoi6uDKJ2m',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
          classRdfAbout: 'http://webprotege.stanford.edu/R7msJHfQBx9IyBoi6uDKJ2m'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RpqwgnThbB1jmoXEUbPwkN',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
          classRdfAbout: 'http://webprotege.stanford.edu/RpqwgnThbB1jmoXEUbPwkN'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R7V7p8sdl5TpSs0cd7gZvqr',
          classRdfAbout: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n'
        }
      }
    ],
    id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
    label: 'Project'
  },
  'http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL': {
    rdfAbout: 'http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL',
    rdfsLabel: 'Training',
    skosDefinition: "Teaching or developing, in oneself or others, any skill and knowledge that relates to specific useful competencies in order to improve one's capability, capacity, productivity and performance.",
    skosComment: null,
    skosExample: null,
    owlAnnotationProperties: {
      'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Operate Construct Plan',
      'http://www.w3.org/2004/02/skos/core#definition': "Teaching or developing, in oneself or others, any skill and knowledge that relates to specific useful competencies in order to improve one's capability, capacity, productivity and performance.",
      'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'Handover'
    },
    rdfsSubClassOf: [
      {
        classRdfAbout: 'http://webprotege.stanford.edu/R8N1a0K78gZZbVLw2P1NkTX',
        owlRestriction: null
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RF3YeWGVEQjj16Hy07lXyU',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R8jWMWKWG5xCyyCGXksUAbL',
          classRdfAbout: 'http://webprotege.stanford.edu/RF3YeWGVEQjj16Hy07lXyU'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          classRdfAbout: 'http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY'
        }
      }
    ],
    id: 'http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL',
    label: 'Training'
  },
  'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8': {
    rdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
    rdfsLabel: 'Role',
    skosDefinition: 'The function assumed or part played by a person or thing in a particular situation.',
    skosComment: null,
    skosExample: null,
    owlAnnotationProperties: {
      'http://webprotege.stanford.edu/R9S1rcldeHXCMGJUZEkvaWJ': 'Employee, External Staff, Administrator, Analyst, Internal Customer, Project Manager, Sponsor, User',
      'http://webprotege.stanford.edu/RB4qRK0cMJE67o1Bc9MmGDD': 'GIS RedLine Confirm',
      'http://www.w3.org/2004/02/skos/core#definition': 'The function assumed or part played by a person or thing in a particular situation.',
      'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'GIS RedLine, MIDAS, Options phase, Confirm',
      'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Operate Design Finance Plan Communications'
    },
    rdfsSubClassOf: [
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
        owlRestriction: null
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RtN2Zu9OP2GsaPU9toX3UM',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv',
          classRdfAbout: 'http://webprotege.stanford.edu/RtN2Zu9OP2GsaPU9toX3UM'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R7cbyWVOLsYCR1NFY11TBjJ',
          classRdfAbout: 'http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY'
        }
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/R7YIZpydsaz383PdnJekN8S',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC48Hic1INaQShlkSyb6ZIx',
          classRdfAbout: 'http://webprotege.stanford.edu/R7YIZpydsaz383PdnJekN8S'
        }
      }
    ],
    id: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
    label: 'Role'
  }
}
const availableEdgesNormalised = {
  'http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv___http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb___http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n': {
    from: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
    fromLabel: 'Requirement',
    to: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
    toLabel: 'Stakeholder',
    label: 'Informed by',
    edgeId: 'http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv',
    id: 'http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv___http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb___http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n'
  },
  'http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi___http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb___http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9': {
    from: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
    fromLabel: 'Requirement',
    to: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
    toLabel: 'Project',
    label: 'Created for',
    edgeId: 'http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi',
    id: 'http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi___http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb___http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
  },
  'http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi___http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb___http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL': {
    from: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
    fromLabel: 'Requirement',
    to: 'http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL',
    toLabel: 'Training',
    label: 'Created for',
    edgeId: 'http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi',
    id: 'http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi___http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb___http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL'
  },
  'http://webprotege.stanford.edu/R8Pp0U9lbiy2Wpdm6YzyV5m___http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb___http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8': {
    from: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
    fromLabel: 'Requirement',
    to: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
    toLabel: 'Role',
    label: 'Created by',
    edgeId: 'http://webprotege.stanford.edu/R8Pp0U9lbiy2Wpdm6YzyV5m',
    id: 'http://webprotege.stanford.edu/R8Pp0U9lbiy2Wpdm6YzyV5m___http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb___http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8'
  }
}
const objectPropertiesFromApi = OwlObjectProperties
const classesFromApi = OwlClasses

describe('exportOwl', () => {
  afterEach(() => {
    jest.clearAllMocks()
    global.document = currentDocument
    global.window = currentWindow
    URL.createObjectURL = currentCreateObjectURL
  })

  it('should work correctly', async () => {
    await exportOwl({
      exportFileName,
      availableNodesNormalised,
      availableEdgesNormalised,
      objectPropertiesFromApi,
      classesFromApi,
      t
    })

    expect(appendChild).toHaveBeenCalled()
    expect(removeChild).toHaveBeenCalled()
    expect(createObjectURLMock).toHaveBeenCalled()
    expect(addNotification).toHaveBeenCalledWith(
      {
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        container: 'bottom-left',
        dismiss: { duration: 3000, onScreen: true },
        insert: 'top',
        message: 'File can now be downloaded, check your browser!',
        title: '',
        type: 'success'
      }
    )
  })
})
