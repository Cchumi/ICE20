/*function getProducts() {
    return fetch("/products")
      .then(handleErrors)
      .then(res => res.json());
}*/
  
  /*function fakeGetProducts() {
    return new Promise(resolve => {
      // Resolve after a timeout so we can see the loading indicator
      setTimeout(
        () =>
          resolve({
            markers: [
              {
                id: 0,
                name: "Apple"
              },
              {
                id: 1,
                name: "Bananas"
              },
              {
                id: 2,
                name: "Strawberries"
              }
            ]
          }),
        100
      );
    });
  }*/
  
  export function fetchProductsAffiche() {
    const webUrl = 'http://pierregagliardi.com/reactapp/';
    const jsonFile = webUrl + 'ice.json';
    return dispatch => {
      dispatch(fetchProductsBegin());
      return fetch(jsonFile, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
        .then(res => res.json())
      //return fakeGetProducts()
        .then(json => {
          dispatch(fetchProductsSuccess(json));
         // res.markers,
          return json;
        })
        .catch(error =>
          dispatch(fetchProductsFailure(error))
        );
    };
  }
  
  export function fetchProductsMarkers() {
    const webUrl = 'http://pierregagliardi.com/reactapp/';
    const jsonFile = webUrl + 'ice.json';
    return dispatch => {
      dispatch(fetchProductsBegin());
      return fetch(jsonFile, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
        .then(res => res.json())
      //return fakeGetProducts()
        .then(json => {
          dispatch(fetchProductsSuccess(json.markers));
         // res.markers,
          return json.markers;
        })
        .catch(error =>
          dispatch(fetchProductsFailure(error))
        );
    };
  }

  export function fetchProductsConfig() {
    const webUrl = 'http://pierregagliardi.com/reactapp/';
    const jsonFile = webUrl + 'ice.json';
    return dispatch => {
      dispatch(fetchProductsBegin());
      return fetch(jsonFile, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
        .then(res => res.json())
        .then(json => {
          dispatch(fetchProductsSuccessConfig(json.config));
         // res.markers,
          return json.config;
        })
        .catch(error =>
          dispatch(fetchProductsFailureConfig(error))
        );
    };
  }
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  
  export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
  export const FETCH_PRODUCTS_SUCCESS =
    "FETCH_PRODUCTS_SUCCESS";
  export const FETCH_PRODUCTS_FAILURE =
    "FETCH_PRODUCTS_FAILURE";
  
    export const FETCH_PRODUCTS_SUCCESS_CONFIG =
    "FETCH_PRODUCTS_SUCCESS_CONFIG";
  export const FETCH_PRODUCTS_FAILURE_CONFIG =
    "FETCH_PRODUCTS_FAILURE_CONFIG";

  export const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
  });
  
  export const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products }
  });
  export const fetchProductsSuccessConfig = config => ({
    type: FETCH_PRODUCTS_SUCCESS_CONFIG,
    payload: { config }
  });
  
  export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: { error }
  });
  export const fetchProductsFailureConfig = errorconfig => ({
    type: FETCH_PRODUCTS_FAILURE_CONFIG,
    payload: { errorconfig }
  });
  