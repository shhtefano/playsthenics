import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup, Polygon, Marker, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// Configura l'icona di default di Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const DrawMap = () => {
  const [center] = useState({ lat: 45.075572, lng: 7.68513 });
  const [mapLayers, setMapLayers] = useState([]);
  const ZOOM_LEVEL = 15;

  // Definisci i marker iniziali con descrizione e indirizzo
  const initialMarkers = [
    {
      id: 1,
      position: { lat: 45.080572, lng: 7.69013 },
      description: "Descrizione del primo marker",
      address: "Via Roma 1, Torino",
    },
    {
      id: 2,
      position: { lat: 45.072572, lng: 7.68013 },
      description: "Descrizione del secondo marker",
      address: "Via Garibaldi 20, Torino",
    },
  ];

  useEffect(() => {
    // Carica i poligoni e i marker definiti in JSON
    // setMapLayers(initialPolygons);
  }, []);

  const _onCreate = (e) => {
    const { layerType, layer } = e;
    const { _leaflet_id } = layer;

    if (layerType === "polygon") {
      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, type: layerType, latlngs: layer.getLatLngs()[0] },
      ]);
      console.log("Polygon created.");
      console.log("Coordinates: ", layer.getLatLngs());
    } else if (layerType === "marker") {
      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, type: layerType, latLngs: layer.getLatLng() },
      ]);
      console.log("Marker created.");
      console.log("Coordinates: ", layer.getLatLng());
    }
  };

  const _onEdited = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id ? { ...l, latlngs: editing.latlngs[0] } : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  return (
    <div className="row">
      <div className="col text-center">
        <div className="col" style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', marginTop: '50px' }}>
          <MapContainer
            center={center}
            zoom={ZOOM_LEVEL}
            style={{ height: "500px", width: "300px" }}
          >
            <FeatureGroup>
              <EditControl
                position="topright"
                onCreated={_onCreate}
                onEdited={_onEdited}
                onDeleted={_onDeleted}
                draw={{
                  rectangle: false,
                  circle: false,
                  circlemarker: false,
                  marker: true,
                  polygon:false,
                  polyline: false,
                }}
              />
              {/* Visualizza i poligoni già definiti */}
              {mapLayers.map((layer) =>
                layer.latlngs ? (
                  <Polygon key={layer.id} positions={layer.latlngs} />
                ) : null
              )}
              {/* Visualizza i marker già definiti con popup */}
              {initialMarkers.map((marker) => (
                <Marker key={marker.id} position={marker.position}>
                  <Popup>
                    <div>
                      <h4>Informazioni</h4>
                      <p><strong>Descrizione:</strong> {marker.description}</p>
                      <p><strong>Indirizzo:</strong> {marker.address}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </FeatureGroup>
            <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default DrawMap;
