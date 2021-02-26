/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import serialiseOwlFile from '../../../utils/exportSettings/serialiseOwlFile'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { classesFromApi } from '../../fixtures/classesFromApi'
import store from '../../../store'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'

const nodeIds = [
  '1',
  '170'
]

const predicates = [
  '12'
]

jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')
jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')

describe('serialiseOwlFile', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return right text', () => {
    const getState = () => ({
      objectPropertiesFromApi,
      classesFromApi,
      availableEdges: new DataSet(
        [
          {
            edgeId: 12,
            role: 'Provided to',
            id: '12',
            label: 'Provided to',
            rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
            rdfsLabel: 'Provided to',
            userDefined: false,
            from: '1',
            to: '170'
          },
        ]
      ),
      availableNodes: new DataSet(
        [
          {
            id: '1',
            label: 'Communication Document',
            rdfsLabel: 'Communication Document',
            'Business Area': 'Communications',
            skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
            userDefined: false,
            rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
            skosDefinition: 'Document storing the information conveyed between two or more parties.',
            nodeId: 1
          },
          {
            id: '170',
            label: 'Licence Holder',
            rdfsLabel: 'Licence Holder',
            'Business Area': 'Maintain Design Operate Plan Construct Finance Communications',
            Subdomain: 'GIS RedLine',
            userDefined: false,
            Synonym: 'Infrastructure Manager, Highways England, HE',
            rdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
            skosDefinition: 'A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.',
            nodeId: 170
          }
        ]
      )
    })
    store.getState = getState

    getEdgeIds.mockImplementation(() => predicates)
    getNodeIds.mockImplementation(() => nodeIds)

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



    <!-- http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp -->

    <owl:ObjectProperty rdf:about="http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp">
        <edge:Id>12</edge:Id>
        <role:>Provided to</role:>
        <id:>12</id:>
        <label:>Provided to</label:>
        <rdfs:Label>Provided to</rdfs:Label>
        <from:>1</from:>
        <to:>170</to:>
    </owl:ObjectProperty>

    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Classes
    //
    ///////////////////////////////////////////////////////////////////////////////////////
    -->



    <!-- http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY -->

    <owl:Class rdf:about="http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY">
        <rdfs:Label>Communication Document</rdfs:Label>
        <business:Business Area>Communications</business:Business Area>
        <skos:Comment>A communication will typically have the Licence Holder (Highways England) as one of the parties.</skos:Comment>
        <skos:Definition>Document storing the information conveyed between two or more parties.</skos:Definition>
        <node:Id>1</node:Id>
    </owl:Class>



    <!-- http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ -->

    <owl:Class rdf:about="http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ">
        <rdfs:Label>Licence Holder</rdfs:Label>
        <business:Business Area>Maintain Design Operate Plan Construct Finance Communications</business:Business Area>
        <subdomain:Subdomain>GIS RedLine</subdomain:Subdomain>
        <synonym:Synonym>Infrastructure Manager, Highways England, HE</synonym:Synonym>
        <skos:Definition>A legal organisation with agency in the management of the Network and its associated Strategic Road Network Assets.</skos:Definition>
        <node:Id>170</node:Id>
    </owl:Class>

</rdf:RDF>`

    const result = serialiseOwlFile()

    expect(result).toEqual(output)
  })
})
