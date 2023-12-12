import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import { commafy, friendlyDate } from 'lib/util';


import { useTracker } from "hooks";

import { promiseToFlyTo, getCurrentLocation } from "lib/map";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";

import axios from 'axios';

const LOCATION = { lat: 0, lng: 0 };   // middle of the world
  // { lat: 38.9072, lng: -77.0369 };  // in Los Angeles

const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
const ZOOM = 10;

const timeToZoom = 2000;

function countryPointToLayer (feature = {}, latlng) { 
  const { properties = {} } = feature;
  let updatedFormatted;
  let casesString;

  const {
    country,
    updated,
    cases, 
    deaths,
    recovered
  } = properties;

  casesString = `${cases}`;

  if      (cases > 1000000) { casesString = `${casesString.slice(0, -6)}M+`; }
  else if (cases > 1000)    { casesString = `${casesString.slice(0, -3)}k+`;  }
  
  if (updated)      { updatedFormatted = new Date(updated).toLocaleString(); }

  const html = `
    <span class="icon-marker">
      <span class="icon-marker-tooltip">
        <h2>${country}</h2>
        <ul>
          <li><strong>Confirmed:</strong> ${cases}</li>
          <li><strong>Deaths:</strong> ${deaths}</li>
          <li><strong>Recovered:</strong> ${recovered}</li>
          <li><strong>Last Update:</strong> ${updatedFormatted}</li>
        </ul>
      </span>
      ${casesString} 
    </span>
  `;

  return L.marker(latlng, {
    icon: L.divIcon({
      className: 'icon',
      html
    }),
    riseOnHover: true
  });
}

const MapEffect = ({ markerRef }) => {
  console.log('in MapEffect...');
  const map = useMap();

  useEffect(() => {
    if (!markerRef.current || !map) return;

    (async function run() {
      console.log('about to call axios to get the data...');

      const options = {
        method: 'GET',
        url: 'https://disease.sh/v3/covid-19/countries',
        // params: {country: 'China'},    // for one country -- if blank will get all countries
        // headers: {
        //   'Disease.sh': 'disease.sh'
        // }
      };
      
      let response; 
      
      try { response = await axios.request(options); 
      } catch (error) { 
        console.error(error);  
        return; 
      }
      console.log(response.data);
      // const rdr = response.data.response;    // for rapidapi
      // const data = rdr;

      const data = response.data;     // for disease.sh
      const hasData = Array.isArray(data) && data.length > 0;
      if (!Array.isArray(data)) { console.log('not an array!'); return; }
      if (data.length === 0) { console.log('data length is === 0'); }

      if (!hasData) { console.log('No data, sorry!');  return; }

      const geoJson = {
        type: 'FeatureCollection',
        features: data.map((country = {}) => {
          const {countryInfo = {} } = country;
          const { lat, long: lng } = countryInfo;
          return {
            type: 'Feature',
            properties: {
              ...country,
            },
            geometry: {
              type: 'Point',
              coordinates: [ lng, lat]
            }
          }
        })
      }

      console.log('geoJson', geoJson);

      const geoJsonLayers = new L.GeoJSON(geoJson, { 
        pointToLayer: countryPointToLayer
      });
      var _map = markerRef.current._map;
      geoJsonLayers.addTo(_map);

      const location = await getCurrentLocation().catch(() => LOCATION);

      console.log(location);
      

      setTimeout(async () => {
        await promiseToFlyTo(map, { zoom: ZOOM, center: location, });
      }, timeToZoom);
    })();
  }, [map, markerRef]);

  return null;
};

MapEffect.propTypes = {
  markerRef: PropTypes.object,
};

const IndexPage = () => {
  console.log('in IndexPage, before useRef');
  const markerRef = useRef();

  const { data: stats = {} } = useTracker({
    api: 'all',
  });

  const { data: countries = [] } = useTracker({
    api: 'countries',
  });
console.log('in IndexPage, after useRef and useTracker');


  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
  };

  const dashboardStats = [
    {
      primary: {
        label: 'Total Cases',
        value: stats ? commafy( stats?.cases ) : '-',
      },
      secondary: {
        label: 'Per 1 Million',
        value: stats ? commafy( stats?.casesPerOneMillion ) : '-',
      },
    },
    {
      primary: {
        label: 'Total Deaths',
        value: stats ? commafy( stats?.deaths ) : '-',
      },
      secondary: {
        label: 'Per 1 Million',
        value: stats ? commafy( stats?.deathsPerOneMillion ) : '-',
      },
    },
    {
      primary: {
        label: 'Total Tests',
        value: stats ? commafy( stats?.tests ) : '-',
      },
      secondary: {
        label: 'Per 1 Million',
        value: stats ? commafy( stats?.testsPerOneMillion ) : '-',
      },
    },
    {
      primary: {
        label: 'Active Cases',
        value: stats ? commafy( stats?.active ) : '-',
      },
    },
    {
      primary: {
        label: 'Critical Cases',
        value: stats ? commafy( stats?.critical ) : '-',
      },
    },
    {
      primary: {
        label: 'Recovered Cases',
        value: stats ? commafy( stats?.recovered ) : '-',
      },
    },
  ];


  return (
    <Layout pageName="home">
      <Helmet><title>Home Page</title></Helmet>
      {/* do not delete MapEffect and Marker
             with current code or axios will not run */}
      <Map {...mapSettings}>
       <MapEffect markerRef={markerRef} />            
       <Marker ref={markerRef} position={CENTER} />
      </Map>
  
        <div className="tracker-stats">
            <ul>
              { dashboardStats.map(({ primary = {}, secondary = {} }, i ) => {
                return (
                  <li key={`Stat-${i}`} className="tracker-stat">
                    { primary.value && (
                      <p className="tracker-stat-primary">
                        { primary.value }
                        <strong>{ primary.label }</strong>
                      </p>
                    ) }
                    { secondary.value && (
                      <p className="tracker-stat-secondary">
                        { secondary.value }
                        <strong>{ secondary.label }</strong>
                      </p>
                    ) }
                  </li>
                );
              }) }
            </ul>
          </div>
          <div className="tracker-last-updated">
            <p>Last Updated: { stats ? friendlyDate( stats?.updated ) : '-' }</p>
          </div>

      

      <Container type="content" className="text-center home-start">
        <h2>Still Getting Started?</h2>
      </Container>
    </Layout>
  );
};

export default IndexPage;