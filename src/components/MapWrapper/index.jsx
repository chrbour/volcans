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
  const [position, setPosition] = useState([lat, lng]);

    
  useEffect(() => {
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
        console.log('erreur ',err);
    })  
  }, [position,name])

  function LocationMarker() {
      const map = useMap();
      
      // useEffect(() => {
      //   const provider = new EsriProvider();
      //   provider.search({query:name})
      //       .then((value)=>{
      //           lat = value[0].y;
      //           lng = value[0].x;
      //           map.flyTo([lat,lng],map.getZoom());
      //           if (first === 0){
      //             setPosition([lat, lng]);
      //             first++
      //           } 
      //       })
      //       .catch((error=>console.log(error)));
      // }, [])
    
      useEffect(() => {
        if(first === 0){}
          let lat = position[0];
          let lng = position[1];
          map.flyTo([lat,lng],8);
          first++;
      },[first])
      return position === null ? null : (
        <Marker position={position} icon={icon}>
          <Popup>{name}</Popup>
        </Marker>
      )
    }
  return (
      <>
          <div id = 'mapid' style = {{marginTop: 40}}>
              <MapContainer id='maCarte' center={position} zoom={10} >
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker />
              </MapContainer>
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