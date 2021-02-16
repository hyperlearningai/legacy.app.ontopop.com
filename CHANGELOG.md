# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]
### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [0.3.0]
### Added
- ONTOLOGY-20 Edges styling by property
- ONTOLOGY-19 Nodes styling by property
- ONTOLOGY-19 Functions  for VisJs Dataset manipulation
- ONTOLOGY-20 Edges styling
- ONTOLOGY-19 Nodes styling

### Changed
- ONTOLOGY-20 Changes nodes and edges selection logic to single view rather than multi-view

### Deprecated

### Removed

### Fixed

### Security



## [0.2.0]
### Added
- ONTOLOGY-33 Added connections create-delete-restore operations in selected graph version
- ONTOLOGY-33 Added edge create-update-delete-restore operations in selected graph version
- ONTOLOGY-32 Added graph version save/upload functions, both to/from file and localStorage
- ONTOLOGY-32 Added node create-update-delete-restore operations in selected graph version
- ONTOLOGY-32 Added graph versioning tab and way to add/select version
- ONTOLOGY-21 Filter nodes by properties
- ONTOLOGY-22 Filter edges by properties
- ONTOLOGY-51 Added JSDoc build command
- ONTOLOGY-51 Gremlin console for programmatic queries
- ONTOLOGY-55 Made spiderable nodes border highlighted and made the border return to normal after node expansion
- ONTOLOGY-56 Ability to turn on/off network physics
- ONTOLOGY-47 Visualise subnetwork after dynamic bounding box selection

### Changed
- ONTOLOGY-33 Removed availableNodesNormalised and availableEdgesNormalised and replaced with AvailableNodes and AvailableEdges DataSet

### Deprecated

### Removed

### Fixed
- ONTOLOGY-33 Fixed edges filter, using annotation properties for property dropdown
- ONTOLOGY-32 Added useRef constants in GraphVisualisationWrapper to avoid refreshing the graph multiple times at startup
- ONTOLOGY-47 Removed highlight from free-text search selected node after sidebar section update

### Security

## [0.1.0]
### Added
- ONTOLOGY-27 Spider on filtered nodes
- ONTOLOGY-24 Shortest path between two nodes
- ONTOLOGY-25 Free text search on nodes and edges properties
- ONTOLOGY-37 Get graph data from API
- ONTOLOGY-28 Added view export as owl
- ONTOLOGY-28 Added view export as csv (zipped file containing basic and full CSV data)
- ONTOLOGY-28 Added view export as pdf
- ONTOLOGY-28 Added view export as png and jpeg
- ONTOLOGY-36 Added settings to sidebar
- ONTOLOGY-23 Added node neighbourhood filter
- ONTOLOGY-18 Select edges and display edge and related nodes properties
- ONTOLOGY-17 Select nodes and display node properties
- ONTOLOGY-16 Simple network-based ontology visualisation

### Changed
- ONTOLOGY-37 Replaced ant design with primereact
- ONTOLOGY-23 Moved from modal overlays to sidebar with left icons vscode-style
- ONTOLOGY-36 Moved from nodes/edges arrays to datasets to improve elements customisation

### Deprecated

### Removed
- ONTOLOGY-54 Node search icon in toolbar

### Fixed
- ONTOLOGY-54 Object properties removed from CSV export
- ONTOLOGY-54 Fixed node and edges count when node expanded
- ONTOLOGY-54 Added subClassOf as default edge is owlRestrictions missing
- ONTOLOGY-28 Added jsdoc comments to store actions and utils

### Security

## [0.0.2]
### Added
- Hide edges on drag for performance
- Network graph loading bar
- Navigation buttons
- Node removal feature
- Nodes/edges count

### Removed
- Zoom button from settings as already present in navigation buttons

## [0.0.1]
### Added
- Physics settings widget with edge lenght, zoom fit, hierarchival vs orbital view, repulsion
- Edges list widget with filter and edge toggling option
- Node search widget
- Node info widget
- Node/edges visualisation from JSOn file
- Internationalisation
- NextJS boilerplate