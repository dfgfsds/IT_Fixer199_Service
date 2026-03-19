/* eslint-disable @typescript-eslint/no-namespace */
declare namespace L {
  interface MapOptions {
    center?: [number, number]
    zoom?: number
    zoomControl?: boolean
    attributionControl?: boolean
  }

  interface TileLayerOptions {
    maxZoom?: number
    attribution?: string
  }

  interface FlyToOptions {
    duration?: number
  }

  interface LatLng {
    lat: number
    lng: number
  }

  interface Map {
    getCenter(): LatLng
    getZoom(): number
    flyTo(latlng: [number, number], zoom?: number, options?: FlyToOptions): this
    zoomIn(): this
    zoomOut(): this
    on(event: string, handler: () => void): this
    remove(): void
    invalidateSize(): void
  }

  interface TileLayer {
    addTo(map: Map): this
  }

  function map(element: HTMLElement, options?: MapOptions): Map
  function tileLayer(url: string, options?: TileLayerOptions): TileLayer
}
