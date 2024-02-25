import WebUrls from './WebUrls';

const WebMethods = {
  postRequest: (webUrl, params) => {
    const url = WebUrls.url.LOcal_URL + webUrl;
    console.log('url==>', url);
    console.log('params==>', params);

    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(response => {
        console.log(':::::', response);
        if (!response.ok) {
          console.log('server error ');
          return null;
        } else {
          return response.json();
        }
      })
      .then(json => {
        console.log(json);
        if (json != null) {
          const result = JSON.parse(JSON.stringify(json));
          return result;
        } else {
          console.log('return null');
          return null;
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  },
  postRequestWithHeader: (webUrl, params, token) => {
    const url = WebUrls.url.LOcal_URL + webUrl;
    console.log('url==>', url);
    console.log('params==>', params);
    console.log('token==>', token);

    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
      .then(response => {
        if (response.headers.get('AuthStatus') != null) {
          return null;
        } else {
          return response.json();
        }
      })
      .then(json => {
        if (json != null) {
          const result = JSON.parse(JSON.stringify(json));
          console.log('result=====>', result);
          return result;
        } else {
          console.log('return null');
          return null;
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  },
};

export default WebMethods;