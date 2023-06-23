# React Maps

A React map component library for ATOM and Locus, based on `Deck.gl`.

## Libraries

- [Deck.gl](https://deck.gl/docs/api-reference/core/deck)
- [Nebula.gl](https://nebula.gl/)
- [Luma.gl](https://luma.gl/)
- [React-Map-GL](https://visgl.github.io/react-map-gl/)
- [Turf.js](https://turfjs.org/)

## Getting started
In `react-maps` project root:
```shell
$ nvm use
$ yarn install
$ yarn start
```

## Import

```
import {
  LocusMap,
  POIMap,
  GeoCohortMap,
  QLReportMap,
} from '@eqworks/react-maps'
```

## Map component documentation

### Locus Map
A data visualization map that can accept a variety of data layers. [Ref](https://github.com/EQWorks/react-maps/blob/main/src/components/locus-map/constants.js).

[Storybook](https://eqworks.github.io/react-maps/?path=/story/locus-map--all-layers)

**Props**

- **dataConfig** - array of data configuration. Example:
```
[
  { id: 'poiGeojson-123', data: poiGeojson },
  { id: 'wiReportData-123', data: wiReportData },
  // data configuration for MVT layer
  {
    id: 'mvt-123',
    data: {
      tileGeom: 'https://${process.env.TEGOLA_SERVER_URL}/maps/ct/{z}/{x}/{y}.vector.pbf?',
      tileData: [],
    },
  },
]
```
- **layerConfig** - array of layer configuration. Example:
```
[
  {
    layer: 'scatterplot', // other types: 'geojson', 'MVT', 'text', 'icon', 'arc', 'select'
    dataId: 'scatterplot-123',
    dataPropertyAccessor: d => d,
    geometry: {
      geometryAccessor: d => d,
      longitude: 'lon',
      latitude: 'lat',
    }
    visualizations: {
      radius: {
        // radius based on the value of clicks
        value: { field: 'revenue' }, // | 5 (can also be just one size)
        valueOptions: [1, 10],
        dataScale: 'linear',
      },
      fill: {
        value: [102, 108, 198],
      },
    },
    opacity: 0.3,
    interactions: {
      tooltip: {
        tooltipKeys: {
          tooltipTitle1: 'name',
          tooltipTitle2: 'id',
          metricKeys: ['lon', 'lat'],
          metricAccessor: d => d.properties,
        },
      },
    },
    legend: {
      showLegend: true,
      layerTitle: 'Source Layer',
    },
    keyAliases: {
      'Imp': 'Impressions'
    },
    formatDataKey: {
      (title) => truncate(title, 20)
    },
    formatDataValue: {
      revenue: d => '$' + d,
    },
    // custom color
    schemeColor: '#366fe4',
    // whether to allow map to zoom into layer data extent upon first time loading
    initialViewportDataAdjustment: true,
    opacity: 0.5,
    visible: true,
    // whether the scatterplot layer is a target layer or not; used for cross visualizations
    isTargetLayer: false,
  },
]
```
- **mapConfig** - object for various base map prop & component configurations
  - *getCursor* - a custom callback to retrieve the cursor type. [Ref](https://deck.gl/docs/api-reference/core/deck#getcursor:~:text=of%20Controller.-,getCursor,-(Function)%E2%80%8B). Default is [getDefaultCursor](https://github.com/EQWorks/react-maps/blob/6f55c48394c4e814b6aa1223129880c414a86e73/src/utils/index.js#L48).
  - *legendPosition* - position of the Legend on the map. Options: `['top-left', 'top-right', 'bottom-left', 'bottom-right']`.
  - *legendSize* - Legend size. Options: `['sm', 'lg']`.
  - *legendNode* - custom element for legend.
  - *showMapLegend* - whether to show or not the legend on the map. Options: `[true, false]`.
  - *tooltipNode* - custom element for tooltip.
  - *showMapTooltip* - whether to show or not the tooltip on the map. Options: `[true, false]`.
  - *initViewState* - initial view state. [Ref.](https://deck.gl/docs/api-reference/core/deck#:~:text=initialViewState%20(Object)%E2%80%8B,way%20to%20control%20the%20camera.) Example:
  ```
  {
    latitude: 43.41,
    longitude: -79.23,
    zoom: 8.6,
  }
  ```
  - *setCurrentViewport* - callback to set the current viewport
  - *setMapInRenderState* - callback to set whether the map is still rendering or not
  - *pitch* - map pitch in degrees. Used only when we use elevation (extruded layers) on the map. `[0-60]`.
   - *mapboxApiAccessToken* - mapbox token. Required.
   - *controller* - Deck.gl controller. [Ref](https://deck.gl/docs/api-reference/core/deck#interaction-settings).
   - *typography* - typography props. Example:
   ```
   {
    fontFamily: 'Open Sans',
    fontSize: '0.75rem',
    textColor: 'rgb(0, 0, 0)',
  },
   ```

### POI Map
A location map for point & polygons POIs (Point of Interest) that is capable of displaying, editing, and creating new POIs.

[Storybook](https://eqworks.github.io/react-maps/?path=/story/poi-map--poi-clusters)

**Props**

- **POIData** - an array of objects representing point or polygon locations
Point:
```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -79.43598,
      43.65993
    ]
  },
  "properties": {
    "id": 180798,
    "name": "Brand 1",
    "radius": 200,
    "poiType": 2, \\ POI type Point
    "city": "Toronto",
    "region": "ON",
    "postalCode": "M6H 4E6",
    "country": "CAN",
    "polygon": null,
    "polygon_json": null,
    "lat": 43.65993,
    "lon": -79.43598,
    "center_lon": null,
    "center_lat": null,
    "locationType": 2,
    "category": null,
    "deprecated": false
  }
},
```

Polygon:
```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -122.718121194664,
      49.2421430700734
    ]
  },
  "properties": {
    "id": 208752,
    "name": "9",
    "radius": 89,
    "poiType": 1, \\ POI type Polygon
    "chainId": null,
    "address": "45 Oak Street",
    "city": "Pitt Meadows",
    "region": "BC",
    "postalCode": "V3Y",
    "country": "CAN",
    "addressLabel": "45 Oak Street, Pitt Meadows, BC V3Y, Canada",
    "polygon": "POLYGON((-122.718492116132 49.2423843021567,-122.718943854745 49.2425959134472,-122.719090948745 49.2425023350972,-122.71864472492 49.2422603989072,-122.718331910686 49.2421412847236,-122.717771070249 49.241895375912,-122.717201718636 49.241705233125,-122.717117042149 49.2418160311411,-122.717623902033 49.2420111335121,-122.718174581713 49.242250067994,-122.718492116132 49.2423843021567))",
    "polygon_json": "{\"type\":\"Polygon\",\"coordinates\":[[[-122.718492116132,49.2423843021567],[-122.718943854745,49.2425959134472],[-122.719090948745,49.2425023350972],[-122.71864472492,49.2422603989072],[-122.718331910686,49.2421412847236],[-122.717771070249,49.241895375912],[-122.717201718636,49.241705233125],[-122.717117042149,49.2418160311411],[-122.717623902033,49.2420111335121],[-122.718174581713,49.242250067994],[-122.718492116132,49.2423843021567]]]}",
    "lat": 49.2421430700734,
    "lon": -122.718121194664,
    "center_lon": -122.718121194664,
    "center_lat": 49.2421430700734,
    "locationType": 2,
    "category": 3,
    "deprecated": false
  }
}
```
- **activePOI** - active selected POI data object (see above). Defaults to `null`.
- **setActivePOI** - callback to help pass selected POI to the parent component. Defaults to `() => {}`.
- **setDraftActivePOI** - callback to help pass `draftActivePOI` to the parent component. Defaults to `() => {}`.
- **onClickHandle** - custom function to handle `onClick` events. Defaults to `() => {}`.
- **mode** - map mode. Defaults to `''`. Options:
  `['empty', 'display', 'edit', 'create-point', 'create-polygon']`.
- **cluster** - whether or not to use clusters for point POIs. Defaults to `false`.
- **controller** - Deck.gl controller. [Ref](https://deck.gl/docs/api-reference/core/deck#interaction-settings). Default is `{ controller: true }`.
- **forwardGeocoder** - callback to pass on `Geocoder`'s `localGeocoder` prop (`react-map-gl-geocoder`) Default is `() => {}`.
- **geocoderOnResult** -  callback to be used in `Geocoder`'s `onResult` prop. Default is `() => {}`.
- **dataPropertyAccessor** - accessor for data properties. Default is `d => d`.
- **formatTooltipTitle** - formatting function for Tooltip title. Default is `(title) => truncate(title, 20)`.
- **formatDataKey** - formatting function for data keys. Default is `d => d`.
- **formatDataValue** - formatting function for data values. Default is [formatDataPOI](https://github.com/EQWorks/react-maps/blob/6f55c48394c4e814b6aa1223129880c414a86e73/src/components/poi-map/utils/coord-format.js#L2C1-L2C1).
- **getCursor** - a custom callback to retrieve the cursor type. [Ref](https://deck.gl/docs/api-reference/core/deck#getcursor:~:text=of%20Controller.-,getCursor,-(Function)%E2%80%8B). Default is [getDefaultCursor](https://github.com/EQWorks/react-maps/blob/6f55c48394c4e814b6aa1223129880c414a86e73/src/utils/index.js#L48).

### GeoCohort Map
A GeoJSON map that displays data visualization at FSA levels for small zoom values, and at postal code level for large zoom values.

[Storybook](https://eqworks.github.io/react-maps/?path=/story/geocohort-map--basic)

**Props**

- **reportFSAData** - array of data objects with FSA geometry. Example:
```
[
  {
    "Actions": 0, 
    "BidAmount": 0.3138552566694, 
    "Bids": 1299, 
    "Clicks": 0, 
    "GeoCohortItem": "M3C", 
    "GeoCohortListID": [
      8, 
      10
    ], 
    "GeoCohortListName": [
      "Children's Apparel - Top Spending", 
      "Men's Apparel - Top Spending"
    ], 
    "ImpCost": 0.2592245468532, 
    "Imps": 858, 
    "Revenue": 2.3595000000000, 
    "geometry": {
      "coordinates": [
        [
          [
            [
              -79.33049, 
              43.7344
            ], 
            ...
          ]
        ]
      ], 
      "type": "MultiPolygon"
    }, 
    "type": "Feature"
  },
  ...
]
```
- **reportGeoCohortData** - - array of data objects with postal code geometry. Similar to `reportFSAData`, but for postal codes instead of FSAs.
- **filled** - whether to draw filled polygons. [Ref.](https://deck.gl/docs/api-reference/layers/geojson-layer#:~:text=%27circle%27.-,filled,-(Boolean%2C%20optional)) Default is `true`.
- **stroked** - whether to draw an outline around polygons. [Ref.](https://deck.gl/docs/api-reference/layers/geojson-layer#:~:text=%27circle%27.-,stroked,-(Boolean%2C%20optional)) Default is `true`.
- **fillBasedOn** - column name that fill value is based on. Default is `''`.
- **fillDataScale** - scale for data fill. Default is `'linear'`
- **fillColors** - array of two hex colors to be used as gradient fill in polygons & legend. default is `['#bae0ff', '#0075ff']`.
- **elevationBasedOn** - column name that elevation value is based on. Default is `''`.
- **elevationDataScale** - scale for data elevation. Default is `'linear'`.
- **elevations** - array of elevation size range. Default is `[0, 2000]`.
- **onClick** - custom function to handle `onClick` events. Defaults to `undefined`.
- **onHover** - custom function to handle `onHover` events. Defaults to `undefined`.
- **opacity** - value between 0 and 1 for fill opacity. Default is `0.5`.
- **getElevation** - determines the elevation of a polygon feature on map. [Ref](https://deck.gl/docs/api-reference/layers/geojson-layer#:~:text=set%20to%20true.-,getElevation,-(Function%7CNumber)). Default is `0`.
- **getFillColor** - determines the solid color of the polygon. [Ref](https://deck.gl/docs/api-reference/layers/geojson-layer#:~:text=is%20NOT%20extruded.-,getFillColor,-(Function%7CArray)). Default is `highlightId => d => d?.GeoCohortItem === highlightId ? [255, 138, 0] : [0, 117, 255]`.
- **getLineWidth** - determines the width of a line. [Ref](https://deck.gl/docs/api-reference/layers/geojson-layer#:~:text=its%20line%20color.-,getLineWidth,-(Function%7CNumber)). Default is `1`.
- **getLineColor** - the rgba color of a line. [Ref](https://deck.gl/docs/api-reference/layers/geojson-layer#:~:text=will%20be%20drawn.-,getLineColor,-(Function%7CArray)). Default is `[34, 66, 205]`.
- **showLegend** - whether to show or not the legend on the map. Default is `false`.
- **legendPosition** - position of the Legend on the map. Options: `['top-left', 'top-right', 'bottom-left', 'bottom-right']`.
- **legendNode** - custom element for legend. Default is `undefined`.
- **getCursor** - a custom callback to retrieve the cursor type. [Ref](https://deck.gl/docs/api-reference/core/deck#getcursor:~:text=of%20Controller.-,getCursor,-(Function)%E2%80%8B). Default is [getDefaultCursor](https://github.com/EQWorks/react-maps/blob/6f55c48394c4e814b6aa1223129880c414a86e73/src/utils/index.js#L48).
- **getTooltip** - callback that takes a hovered-over point and renders a tooltip. [Ref](https://deck.gl/docs/api-reference/core/deck#interaction-settings:~:text=change%20is%20detected.-,Interaction,-Settings%E2%80%8B). Default is `undefined`.
- **showTooltip** - whether to show or not tooltip. Default is `false`.
- **tooltipProps** - object of props to pass on Tooltip node. Default is:
  ```
  {
    backgroundColor: getTailwindConfigColor('secondary-50'),
    boxShadow: '0 0.125rem 0.5rem 0 rgba(12, 12, 13, 0.15)',
    borderRadius: '0.25rem',
    padding: '0.625rem 0.75rem',
    opacity: 0.9,
  }
  ```
- **tooltipNode** - custom tooltip element. [Default](https://github.com/EQWorks/react-maps/blob/main/src/components/tooltip/tooltip-node.js).
- **tooltipKeys** - keys to use for data values in the tooltip. Example:
  ```
  {
    metricKeys: ['Imps', 'Clicks', 'Bids', 'Revenue'],
  }
  ```
- **typography** - typography props. Example:
   ```
   {
    fontFamily: 'Open Sans',
    fontSize: '0.75rem',
    textColor: 'rgb(0, 0, 0)',
  },
   ```
- **pitch** - map pitch in degrees. Used only when we use elevation (extruded layers) on the map. `[0-90]`.
- **dataPropertyAccessor** - accessor for data properties. Default is `d => d`.
- **formatLegendTitle** - function to format the Legend title column name. Default is `d => d`.
- **formatTooltipTitle** - formatting function for Tooltip title. Default is `d => d`.
- **formatDataKey** - formatting function for data keys. Default is `d => d`.
- **formatDataValue** - object for formatting functions for data values. Default is `undefined`. Example:
  ```
  {
    Revenue: d => '$' + d,
  }
  ```
- **keyAliases** - object of aliases for column names. Default is `undefined`. Example:
  ```
  {
    Imps: 'Impressions',
    Revenue: 'Spend',
  }
  ```
- **setViewportBBox** - callback to read the viewport bbox. Default is `() => {}`.
- **setApiBBox** - callback to read the viewport bbox. Default is `() => {}`.
