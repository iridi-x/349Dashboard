import { useEffect, useState } from 'react';

import axios from 'axios';

const API_HOST = 'https://disease.sh/v3/covid-19';

const ENDPOINTS = [
  {
    id: 'all',
    path: '/all',
  },
  {
    id: 'countries',
    path: '/countries',
    isDefault: true,
  },
  {
    id: 'states',
    path: '/states',
  },
  {
    id: 'continents',
    path: '/continents',
  },
  {
    id: 'vaccine-coverage',
    path: '/vaccine/coverage?lastdays=30&fullData=false'
  },
  {
    id: 'states1Day',
    path: '/vaccine/coverage/states?lastdays=1&fullData=false'
  }
];

const defaultState = {
  data: null,
  state: 'ready',
};

const useTracker = ({ api = 'all' }) => {
  const [tracker = {}, updateTracker] = useState( defaultState );

  async function fetchTracker() {
    let route = ENDPOINTS.find(({ id } = {}) => id === api );

    if ( !route ) {
      route = ENDPOINTS.find(({ isDefault } = {}) => !!isDefault );
    }

    let response;

    try {
      updateTracker(( prev ) => {
        return {
          ...prev,
          state: 'loading',
        };
      });
      response = await axios.get( `${API_HOST}${route.path}` );
    } catch ( e ) {
      updateTracker(( prev ) => {
        return {
          ...prev,
          state: 'error',
          error: e,
        };
      });
      return;
    }

    const { data } = response;

    updateTracker(( prev ) => {
      return {
        ...prev,
        state: 'ready',
        data,
      };
    });
  }

  useEffect(() => {
    fetchTracker();
  }, [api]);

  return {
    fetchTracker,
    ...tracker,
  };
};

export default useTracker;
