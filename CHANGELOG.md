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