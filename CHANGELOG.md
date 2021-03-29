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

## [0.6.0]
### Added
- ONTOLOGY-153 Sidebar views routing for improved analytics
- ONTOLOGY-153 Additional env variables to toggle sidebar views on/off
- ONTOLOGY-130 Added updateStoreValue action to replace all other store actions
- ONTOLOGY-130 Search starts also on search icon click
- ONTOLOGY-109 Added userback and mouseflow snippets

### Changed
- ONTOLOGY-151 Node and edge rendering logic to improve performance

### Deprecated

### Removed
- ONTOLOGY-130 Removed all actions except for updateStoreValue

### Fixed

### Security

## [0.5.0]
### Added
- ONTOLOGY-137 Added node tooltip on hover
- ONTOLOGY-112 Added possibility to hide nodes and edges based on specific properties on network graph options
- ONTOLOGY-112 Added network graph options
- ONTOLOGY-112 Added ability to toggle upper ontology nodes in shortest path view
- ONTOLOGY-105 Connected with styling API
- ONTOLOGY-86 Show nodes and edges related to datasets
- ONTOLOGY-126 Added utilities getStylingProperty and getElementLabel
- ONTOLOGY-126 Added dropdowns with available nodes/edges lists in nodes/edges selection, node neighbourhood and shortest path
- ONTOLOGY-126 Added cypress end-to-end tests

### Changed
- ONTOLOGY-112 Updated node and edge removal logic
- ONTOLOGY-112 Used sidebar button IDs rather than eq in cypress tests to allow buttons reordering

### Deprecated

### Removed
- ONTOLOGY-112 Removed unnecessary test fixtures

### Fixed
- ONTOLOGY-137 Fixed dataset/upper ontology nodes toggling bug
- ONTOLOGY-112 Fixed node update API

### Security

## [0.4.0]
### Added
- ONTOLOGY-30 Added network / node / edge comments
- ONTOLOGY-117 Added new API services
- ONTOLOGY-110 Turned search into form to allow pressing enter on search
- ONTOLOGY-110 Added timeouts to expandNode to avoid browser freezing
- ONTOLOGY-110 Added timeouts to addNodesToGraph to avoid browser freezing
- ONTOLOGY-108 Added alpha banner and feedback link
- ONTOLOGY-93 User-defined nodes and edges styles
- ONTOLOGY-92 Search as entry point after sign in
- ONTOLOGY-93 API endpoints to create/update/delete edges
- ONTOLOGY-93 API endpoints to create/update/delete nodes
- ONTOLOGY-93 Added httpCall function
- ONTOLOGY-26 Structured search
- ONTOLOGY-78 Login page with login endpoint

### Changed
- ONTOLOGY-30 Highlight logic: if notes view, highlight commented nodes, else highlight spiderable nodes
- ONTOLOGY-117 Replaced get checks with try/catch in addNode and addEdge
- ONTOLOGY-117 Replaced old API endpoints with new API services
- ONTOLOGY-110 Sequential node/adge count update after node/edge added
- ONTOLOGY-110 Node styling now performed to each node during queue processing to avoid browser freezing
- ONTOLOGY-110 Added activeLoaders to replace loading in store
- ONTOLOGY-93 Refactored several utils and components to use user-defined nodes and edges styles
- ONTOLOGY-93 Refactored edge management components and utils
- ONTOLOGY-93 Refactored node management components and utils
- ONTOLOGY-93 Refactored functions with api calls to use the httpCall function

### Deprecated

### Removed
- ONTOLOGY-110 Removed redux loading middleware
- ONTOLOGY-93 Removed boundingBoxSelection clearNodesSelection util

### Fixed
- ONTOLOGY-110 Fixed bug: all nodes were highlighted after changing node background color, now working properly
- ONTOLOGY-93 Node selection bug when in shortest path or node neighbourhood mode after nodes filter/nodes selection mode
- ONTOLOGY-93 Node/edge count update after ontology management operations

### Security
- ONTOLOGY-78 Added beared token to API requests


## [0.3.0]
### Added
- ONTOLOGY-62 Added multiple URL endpoints based on stage
- ONTOLOGY-62 Added alpha label to sign in
- ONTOLOGY-20 Edges styling by property
- ONTOLOGY-19 Nodes styling by property
- ONTOLOGY-19 Functions  for VisJs Dataset manipulation
- ONTOLOGY-20 Edges styling
- ONTOLOGY-19 Nodes styling

### Changed
- ONTOLOGY-104 Refactored using graph API model 1
- ONTOLOGY-75 Refactored using latest API response
- ONTOLOGY-75 List only available nodes/edges in Edit ontology
- ONTOLOGY-62 Made login page anonymous for alpha version
- ONTOLOGY-20 Refactoring of Edit Ontology
- ONTOLOGY-20 Refactoring of shortest path logic
- ONTOLOGY-20 Minor refactoring of the neighbour nodes logic
- ONTOLOGY-20 Changed bounding box selection styling logic
- ONTOLOGY-20 Changed nodes and edges selection logic to single view rather than multi-view
- ONTOLOGY-20 Changed free-text selection styling logic

### Deprecated
- ONTOLOGY-20 Removed versioning

### Removed
- ONTOLOGY-62 Removed forgot password page

### Fixed
- ONTOLOGY-104 Fixed styling of ontology restore edge when no edges available
- ONTOLOGY-75 Fixed styling when edge or node styling by property is removed

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