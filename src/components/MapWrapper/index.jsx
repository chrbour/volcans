import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {MapContainer , TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-geosearch/dist/geosearch.css";
import { EsriProvider } from "leaflet-geosearch";
import icon from "../../utils/leaflet-icon";

let first = 0;
function MapWrapper({name}){
    let lat = 48.856667;
    let lng = 2.351944;
    const [position, setPosition] = useState([lat, lng])
    function LocationMarker() {
        const map = useMap();
        useEffect(() => {
          const provider = new EsriProvider();
          provider.search({query:name})
              .then((value)=>{
                  lat = value[0].y;
                  lng = value[0].x;
                  map.flyTo([lat,lng],map.getZoom());
                  if (first === 0){
                    setPosition([lat, lng]);
                    first++
                  } 
              })
              .catch((error=>console.log(error)));
        }, [])
        return position === null ? null : (
          <Marker position={position} icon={icon}>
            <Popup>{name}</Popup>
          </Marker>
        )
      }
      function recentrer(){
        setPosition([lat,lng]);
      }
    return (
        <>
            <div id = 'mapid' style = {{marginTop: 40}}>
                <MapContainer id='maCarte' center={position} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
                <button onClick = {recentrer}>Recentrer</button>
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