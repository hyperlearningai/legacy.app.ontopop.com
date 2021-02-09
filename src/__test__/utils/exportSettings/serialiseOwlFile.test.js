/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import serialiseOwlFile from '../../../utils/exportSettings/serialiseOwlFile'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import store from '../../../store'

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

describe('serialiseOwlFile', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return right text', () => {
    const getState = () => ({
      availableNodes: new DataSet(Object.keys(availableNodesNormalised).map((nodeId) => ({
        ...availableNodesNormalised[nodeId],
        id: nodeId
      }))),
      availableEdges: new DataSet(Object.keys(availableEdgesNormalised).map((edgeId) => ({
        ...availableEdgesNormalised[edgeId],
      }))),
      objectPropertiesFromApi: OwlObjectProperties,
      classesFromApi: OwlClasses,
    })
    store.getState = getState

    const output = `<?xml version="1.0"?>
<rdf:RDF xmlns="http://webprotege.stanford.edu/project/96Ytr9AQdNv8valtcgFhzp#"
    xml:base="http://webprotege.stanford.edu/project/96Ytr9AQdNv8valtcgFhzp"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:owl="http://www.w3.org/2002/07/owl#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:xml="http://www.w3.org/XML/1998/namespace"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
    xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
    xmlns:skos="http://www.w3.org/2004/02/skos/core#"
    xmlns:webprotege="http://webprotege.stanford.edu/">
    <owl:Ontology rdf:about="http://webprotege.stanford.edu/project/96Ytr9AQdNv8valtcgFhzp"/>



    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Annotation properties
    //
    ///////////////////////////////////////////////////////////////////////////////////////
    -->




    <!-- http://purl.org/dc/elements/1.1/description -->

    <owl:AnnotationProperty rdf:about="http://purl.org/dc/elements/1.1/description"/>



    <!-- http://purl.org/dc/elements/1.1/source -->

    <owl:AnnotationProperty rdf:about="http://purl.org/dc/elements/1.1/source"/>



    <!-- http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI -->

    <owl:AnnotationProperty rdf:about="http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI">
        <rdfs:label>Subdomain</rdfs:label>
        <skos:comment>The list of existing Subdomains can be found in Project/Tags.</skos:comment>
        <skos:definition>Annotation used to describe the Entities that compose a specific Subdomain.</skos:definition>
    </owl:AnnotationProperty>



    <!-- http://webprotege.stanford.edu/R8OwNoGPHfALLALe5R3rm2H -->

    <owl:AnnotationProperty rdf:about="http://webprotege.stanford.edu/R8OwNoGPHfALLALe5R3rm2H">
        <rdfs:label>TODO</rdfs:label>
        <skos:definition>Annotation used to mark pending action to be done in the model.</skos:definition>
    </owl:AnnotationProperty>



    <!-- http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4 -->

    <owl:AnnotationProperty rdf:about="http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4">
        <rdfs:label>Synonym</rdfs:label>
        <skos:comment>The list of existing Synonyms can be found in Project/Tags.</skos:comment>
        <skos:definition>Annotation used to describe Synonyms of a specific Entity.</skos:definition>
    </owl:AnnotationProperty>



    <!-- http://webprotege.stanford.edu/R9S1rcldeHXCMGJUZEkvaWJ -->

    <owl:AnnotationProperty rdf:about="http://webprotege.stanford.edu/R9S1rcldeHXCMGJUZEkvaWJ">
        <rdfs:label>Type</rdfs:label>
        <skos:definition>Annotation used to describe the existing Types of an Entity.</skos:definition>
    </owl:AnnotationProperty>



    <!-- http://webprotege.stanford.edu/RB4qRK0cMJE67o1Bc9MmGDD -->

    <owl:AnnotationProperty rdf:about="http://webprotege.stanford.edu/RB4qRK0cMJE67o1Bc9MmGDD">
        <rdfs:label>Data Source</rdfs:label>
        <skos:comment>The list of existing Data Sources can be found in Project/Tags.</skos:comment>
        <skos:definition>Annotation used to describe the Entities present in a specific Data Source.</skos:definition>
    </owl:AnnotationProperty>



    <!-- http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY -->

    <owl:AnnotationProperty rdf:about="http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY">
        <rdfs:label>Business Area</rdfs:label>
        <skos:comment>The list of existing Business Areas can be found in Project/Tags.</skos:comment>
        <skos:definition>Annotation used to describe the Business Areas impacted by an Entity.</skos:definition>
    </owl:AnnotationProperty>



    <!-- http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs -->

    <owl:AnnotationProperty rdf:about="http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs">
        <rdfs:label>Relationship Type</rdfs:label>
        <skos:comment>The list of existing Relationship Type can be found in Project/Tags.</skos:comment>
        <skos:definition>Annotation used to describe the type of a Relationship in order to make its use more clear.</skos:definition>
    </owl:AnnotationProperty>



    <!-- http://www.w3.org/2004/02/skos/core#comment -->

    <owl:AnnotationProperty rdf:about="http://www.w3.org/2004/02/skos/core#comment">
        <skos:definition>Annotation used to add more information about an Entity or Relationship</skos:definition>
    </owl:AnnotationProperty>



    <!-- http://www.w3.org/2004/02/skos/core#definition -->

    <owl:AnnotationProperty rdf:about="http://www.w3.org/2004/02/skos/core#definition">
        <skos:definition>Annotation used to define the Entity or Relationship</skos:definition>
    </owl:AnnotationProperty>



    <!-- http://www.w3.org/2004/02/skos/core#example -->

    <owl:AnnotationProperty rdf:about="http://www.w3.org/2004/02/skos/core#example">
        <skos:definition>Annotation used to list examples of the Entity or Relationship</skos:definition>
    </owl:AnnotationProperty>



    <!-- http://www.w3.org/2004/02/skos/core#note -->

    <owl:AnnotationProperty rdf:about="http://www.w3.org/2004/02/skos/core#note"/>


    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Datatypes
    //
    ///////////////////////////////////////////////////////////////////////////////////////
    -->




    <!-- http://webprotege.stanford.edu/R9gQCoIaUSnc4BOBkLNOW0k -->

    <rdfs:Datatype rdf:about="http://webprotege.stanford.edu/R9gQCoIaUSnc4BOBkLNOW0k">
        <rdfs:label>Options</rdfs:label>
    </rdfs:Datatype>



    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Object Properties
    //
    ///////////////////////////////////////////////////////////////////////////////////////
    -->



    <!-- http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv -->

    <owl:ObjectProperty rdf:about="http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv">
        <rdfs:Label>Informed by</rdfs:Label>
        <skos:Definition>Relationship that defines the Entity that provides the information or knowledge needed by another Entity.</skos:Definition>
    </owl:ObjectProperty>



    <!-- http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi -->

    <owl:ObjectProperty rdf:about="http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi">
        <rdfs:Label>Created for</rdfs:Label>
        <skos:Definition>Relationship that specifies the Entity that caused the creation of another Entity.</skos:Definition>
    </owl:ObjectProperty>



    <!-- http://webprotege.stanford.edu/R8Pp0U9lbiy2Wpdm6YzyV5m -->

    <owl:ObjectProperty rdf:about="http://webprotege.stanford.edu/R8Pp0U9lbiy2Wpdm6YzyV5m">
        <rdfs:Label>Created by</rdfs:Label>
        <skos:Definition>Relationship that specifies the Entity (a role, system or organisation) that brings into existance another Entity.</skos:Definition>
    </owl:ObjectProperty>

    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Classes
    //
    ///////////////////////////////////////////////////////////////////////////////////////
    -->



    <!-- http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb -->

    <owl:Class rdf:about="http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb">
        <rdfs:Label>Requirement</rdfs:Label>
        <skos:Definition>One or more clear statements concerning the intended functionality of a System.</skos:Definition>
        <rdfs:subClassOf rdf:resource="[object Object]"/>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/R8Pp0U9lbiy2Wpdm6YzyV5m"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8"/>
            </owl:Restriction>
        </rdfs:subClassOf>
    </owl:Class>



    <!-- http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n -->

    <owl:Class rdf:about="http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n">
        <rdfs:Label>Stakeholder</rdfs:Label>
        <skos:Definition>Person, Persons, or organisation affected by or with an interest in a Project, including statutory and non-statutory consultees.</skos:Definition>
        <rdfs:subClassOf rdf:resource="[object Object]"/>
    </owl:Class>



    <!-- http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9 -->

    <owl:Class rdf:about="http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9">
        <rdfs:Label>Project</rdfs:Label>
        <skos:Definition>A time-bound undertaking of the Licence Holder (and Suppliers) to deliver a defined outcome to their organisation, stakeholders, or the general public.</skos:Definition>
        <skos:Example>The road that needs to be built between the M25 and xyz in order to connect London to Inverness as part of a wider Programme.</skos:Example>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/RvMCpTSGsQmEAyy8Mi6fdN"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/RUWwziHPSHb0QUR433d6n3"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf rdf:resource="[object Object]"/>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/R4I2v4Y7su3Adf0Vcj6TWd"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/RCdbVM6sx0TFJ2bA7j7XW9T"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/RXCmh2J46cqAwwT2c4D7Bx"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/R7msJHfQBx9IyBoi6uDKJ2m"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/RpqwgnThbB1jmoXEUbPwkN"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/R7V7p8sdl5TpSs0cd7gZvqr"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n"/>
            </owl:Restriction>
        </rdfs:subClassOf>
    </owl:Class>



    <!-- http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL -->

    <owl:Class rdf:about="http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL">
        <rdfs:Label>Training</rdfs:Label>
        <skos:Definition>Teaching or developing, in oneself or others, any skill and knowledge that relates to specific useful competencies in order to improve one's capability, capacity, productivity and performance.</skos:Definition>
        <rdfs:subClassOf rdf:resource="[object Object]"/>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/R8jWMWKWG5xCyyCGXksUAbL"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/RF3YeWGVEQjj16Hy07lXyU"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY"/>
            </owl:Restriction>
        </rdfs:subClassOf>
    </owl:Class>



    <!-- http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8 -->

    <owl:Class rdf:about="http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8">
        <rdfs:Label>Role</rdfs:Label>
        <skos:Definition>The function assumed or part played by a person or thing in a particular situation.</skos:Definition>
        <rdfs:subClassOf rdf:resource="[object Object]"/>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/RtN2Zu9OP2GsaPU9toX3UM"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/R7cbyWVOLsYCR1NFY11TBjJ"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://webprotege.stanford.edu/RC48Hic1INaQShlkSyb6ZIx"/>
                <owl:someValuesFrom rdf:resource="http://webprotege.stanford.edu/R7YIZpydsaz383PdnJekN8S"/>
            </owl:Restriction>
        </rdfs:subClassOf>
    </owl:Class>

</rdf:RDF>`

    const result = serialiseOwlFile({
      availableNodesNormalised,
      availableEdgesNormalised,
      objectPropertiesFromApi,
      classesFromApi,
    })

    expect(result).toEqual(output)
  })
})
