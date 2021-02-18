import {
  kebabCase,
  uniq
} from 'lodash'
import store from '../../store'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'
import getNodeIds from '../nodesEdgesUtils/getNodeIds'
import getEdge from '../nodesEdgesUtils/getEdge'

const owlTemplate = `<?xml version="1.0"?>
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



$OBJECT_PROPERTIES

    <!--
    ///////////////////////////////////////////////////////////////////////////////////////
    //
    // Classes
    //
    ///////////////////////////////////////////////////////////////////////////////////////
    -->



$CLASSES

</rdf:RDF>`

/**
 * Export canvas as image
 * @param  {Object}   params
 * @return {String}   owlText      Owl file text content
\ */
const serialiseOwlFile = () => {
  const {
    objectPropertiesFromApi,
    classesFromApi,
  } = store.getState()

  const edgesIds = getEdgeIds()

  const edgesUniqueIds = edgesIds.length === 0 ? [] : uniq(edgesIds.map((edge) => getEdge(edge).predicate))

  // GET OBJECT PROPERTIES
  const objectProperties = []

  for (let index = 0; index < edgesUniqueIds.length; index++) {
    const edgeId = edgesUniqueIds[index]

    const edgeProperties = objectPropertiesFromApi[edgeId]

    if (edgeProperties.rdfAbout) {
      const edgePropertyParts = [
        `    <!-- ${edgeProperties.rdfAbout} -->\n`,
        `    <owl:ObjectProperty rdf:about="${edgeProperties.rdfAbout}">`
      ]

      Object.keys(edgeProperties).map((property) => {
        if (property === 'rdfAbout') return false

        if (property === 'subPropertyOf' && edgeProperties.subPropertyOf.length > 0) {
          edgeProperties[property].map((item) => {
            edgePropertyParts.push(`        <rdfs:subClassOf rdf:resource="${item}"/>`)
            return true
          })
        }

        if (!edgeProperties[property] || typeof edgeProperties[property] === 'object') return false

        const propertyNameParts = kebabCase(property).split('-')
        const propertyNamePrefix = propertyNameParts[0]
        const propertyNameOther = property.replace(propertyNamePrefix, '')
        const propertyNameXml = `${propertyNamePrefix}:${propertyNameOther}`

        edgePropertyParts.push(`        <${propertyNameXml}>${edgeProperties[property]}</${propertyNameXml}>`)

        return true
      })

      edgePropertyParts.push('    </owl:ObjectProperty>')

      objectProperties.push(edgePropertyParts.join('\n'))
    }
  }

  // GET CLASSES
  const classes = []

  const nodesIds = getNodeIds()

  for (let index = 0; index < nodesIds.length; index++) {
    const nodeId = nodesIds[index]

    const nodeProperties = classesFromApi[nodeId]

    if (nodeProperties.rdfAbout) {
      const nodePropertyParts = [
        `    <!-- ${nodeProperties.rdfAbout} -->\n`,
        `    <owl:Class rdf:about="${nodeProperties.rdfAbout}">`
      ]

      Object.keys(nodeProperties).map((property) => {
        if (property === 'rdfAbout' || property === 'id' || property === 'label') return false

        if (property === 'rdfsSubClassOf' && nodeProperties.rdfsSubClassOf.length > 0) {
          nodeProperties[property].map((item) => {
            const { classRdfAbout, owlRestriction } = item

            if (!owlRestriction || owlRestriction === null) {
              nodePropertyParts.push(`        <rdfs:subClassOf rdf:resource="${item}"/>`)
            } else {
              const { objectPropertyRdfAbout } = owlRestriction
              nodePropertyParts.push(`        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="${objectPropertyRdfAbout}"/>
                <owl:someValuesFrom rdf:resource="${classRdfAbout}"/>
            </owl:Restriction>
        </rdfs:subClassOf>`)
            }

            return true
          })
        }

        if (!nodeProperties[property] || typeof nodeProperties[property] === 'object') return false

        const propertyNameParts = kebabCase(property).split('-')
        const propertyNamePrefix = propertyNameParts[0]
        const propertyNameOther = property.replace(propertyNamePrefix, '')
        const propertyNameXml = `${propertyNamePrefix}:${propertyNameOther}`

        nodePropertyParts.push(`        <${propertyNameXml}>${nodeProperties[property]}</${propertyNameXml}>`)

        return true
      })

      nodePropertyParts.push('    </owl:Class>')

      classes.push(nodePropertyParts.join('\n'))
    }
  }

  return owlTemplate.replace('$OBJECT_PROPERTIES', objectProperties.join('\n\n\n\n')).replace('$CLASSES', classes.join('\n\n\n\n'))
}

export default serialiseOwlFile
