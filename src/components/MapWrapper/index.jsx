import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {MapContainer , TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-geosearch/dist/geosearch.css";
import icon from "../../utils/leaflet-icon";

function MapWrapper({name, typeView}){
  let lat = 48.856667;
  let lng = 2.351944;
  const [position, setPosition] = useState([lat, lng]);

    
  useEffect(() => {
    fetchCoords()
  },[]);
  function fetchCoords(retries = 30){
    fetch(`https://fr.wikipedia.org/w/api.php?action=query&titles=${name}&prop=coordinates&redirects=1&format=json&origin=*`)
    .then ((res) => {
        if (res.ok){
            return res.json()
        }
    })
    .then ((data) => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        setPosition([pages[pageId].coordinates[0].lat, pages[pageId].coordinates[0].lon]);
    })
    .catch ((err) => {
        if (retries > 0) {
          setTimeout(() => {
            fetchCoords(retries - 1);
          }, 200);
        } else {
          console.error("Echec définitif", err);
        }
    })  
  }

  function LocationMarker() {
      const map = useMap();
      let lat = position[0];
      let lng = position[1];
      if(typeView === "volcan"){
        map.flyTo([lat,lng],8);
        map.zoomControl.remove();
      }
      return (
        <Marker position={position} icon={icon}>
          <Popup>{name}</Popup>
        </Marker>
      )
    }
    
  return (
      <>
          <div id = 'mapid'>
            {typeView === "volcan"?
              <MapContainer id='maCarte' center={position} zoom={10} >
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker />
              </MapContainer>
              :
              <MapContainer id='maCarte' center={position} zoom={1} >
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker />
              </MapContainer>
            }
          </div>
      </>
  )
}

export default MapWrapper;

MapWrapper.propTypes = {
  name: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
}