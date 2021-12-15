// https://deck.gl/docs/api-reference/layers/icon-layer

import { IconLayer } from '@deck.gl/layers'
import POIIconMarker from '../icons/poi-location-snowflake.png'

// icon mapping for poi icon layer
const POI_ICON_MAPPING = { marker: { x: 0, y: 0, width: 128, height: 128 } }

const defaultProps = {
  iconAtlas: POIIconMarker,
  iconMapping: POI_ICON_MAPPING,
  billboard: true,
  getIcon: () => 'marker',
  getPosition: d => d.geometry.coordinates,
  getSize: 6,
  visible: false,
}

/**
 * setPOIIcon - sets the POI icon layer
 * @param { object } props - props object for passing data and other attributes to POIIcon
 * @returns { instanceOf IconLayer}
 */
const POIIcon = ({ visible, ...props }) =>
  new IconLayer({
    ...defaultProps,
    sizeScale: props.data.length === 1 ? 12 : (props.data.length < 8 ? 8 : 5),
    visible,
    pickable: visible,
    ...props,
  })

export default POIIcon
