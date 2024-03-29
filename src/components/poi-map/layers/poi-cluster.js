/**
 * ref: https://github.com/visgl/deck.gl/blob/master/examples/website/icon/icon-cluster-layer.js
 *      https://github.com/EQWorks/flaat-dash/blob/master/src/components/layers/cluster-layer.js
 */
import { CompositeLayer } from '@deck.gl/core'
import { IconLayer } from '@deck.gl/layers'
import Supercluster from 'supercluster'

import iconMapping from '../icons/cluster.json'
import iconAtlas from '../icons/cluster.png'

import { getSuperclusterRadius } from '../utils/cluster'
import { CLUSTER_SIZE_SCALE, SUPERCLUSTER_ZOOM } from '../../../constants'


/**
 * getIconName - sets icon name for clusters
 * @param { object } d - POI data point
 * @returns { string } - POI or cluster icon name
 */
const getIconName = (d) => {
  let size = d.properties.point_count
  // if size exists it is a cluster, get right number for icon name
  return size
    ? `marker-${size < 10 ? size : Math.min(Math.floor(size / 10) * 10, 100)}`
    : 'marker-1'
}

/**
 * getIconSize - sets the icon size for clusters
 * @param { object } d - POI data point
 * @returns { number } - POI or cluster icon size
 */
const getIconSize = () => d => {
  // if d.properties.cluster exists it is a cluster, get right size for icon
  return d.properties.cluster 
    ? ((Math.min(100, d.properties.point_count) / 100) + 1) + .5
    : 1.3
}

// creates an icon layer that includes clusters
class IconClusterLayer extends CompositeLayer {

  static defaultProps = {
    id: 'icon-cluster',
    getPosition: d => d.geometry.coordinates,
    iconAtlas,
    iconMapping,
    sizeScale: CLUSTER_SIZE_SCALE,
    superclusterZoom: SUPERCLUSTER_ZOOM,
    getSuperclusterRadius,
    visible: false,
  }
  
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged
  }

  updateState({ props, oldProps, changeFlags }) {
    const rebuildIndex = changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale

    if (rebuildIndex) {
      const index = new Supercluster({
        maxZoom: props.superclusterZoom,
        radius: props.getSuperclusterRadius(this.props.zoom),
      })
      index.load(
        props.data.map(d => ({
          geometry: { coordinates: props.getPosition(d) },
          properties: d,
        })),
      )
      this.setState({ index })
    }

    const z = Math.floor(this.props.zoom)
    if (rebuildIndex || z !== this.state.z) {
      this.setState({
        data: this.state.index.getClusters([-180, -85, 180, 85], z),
        z,
      })
    }
  }

  getPickingInfo({ info, mode }) {
    const pickedObject = info.object && info.object.properties
    if (pickedObject) {
      if (pickedObject.cluster && mode !== 'hover') {
        info.objects = this.state.index
          .getLeaves(pickedObject.cluster_id, 25)
          .map(f => f.properties)
      }
      info.object = pickedObject
    }
    return info
  }

  renderLayers() {
    const { data } = this.state
    const {
      iconAtlas,
      iconMapping,
      sizeScale,
      getPosition,
      visible,
      ...props
    } = this.props

    return new IconLayer(
      this.getSubLayerProps({
        id: 'icon',
        data,
        iconAtlas,
        iconMapping,
        sizeScale,
        getPosition,
        getIcon: d => getIconName(d),
        getSize: getIconSize(),
        visible,
        pickable: visible,
        ...props,
      }),
    )
  }
}

export default IconClusterLayer
