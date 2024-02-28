import WebUrls from './WebUrls';
import NetInfo from '@react-native-community/netinfo';

const WebMethods = {
  async checkconnectivity() {
    await NetInfo.fetch().then(state => {
      if (state.type == 'none') {
        return true;
      } else {
        return false;
      }
    });
  },
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
  getRequestWithHeader: async (webUrl, token) => {
    const url = WebUrls.url.LOcal_URL + webUrl;
    console.log('url==>', url);
    console.log('token ==>', token);

    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.headers.get('AuthStatus') != null) {
          // const defaultTxt = I18n.t('common.sessionOutMessage');
          // const okTxt = I18n.t('settings.ok');
          // Alert.alert(defaultTxt, '', [
          //   {text: okTxt, onPress: () => CustomFunctions.logout()},
          // ]);
        } else {
          return response.json();
        }
      })
      .then(json => {
        if (json != null) {
          const result = JSON.parse(JSON.stringify(json));
          console.log('result==search===>', result);
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
  patchRequestWithHeader: (webUrl, params, token) => {
    const url = WebUrls.url.LOcal_URL + webUrl;
    console.log('url==>', url);
    console.log('params==>', params);
    console.log('token==>', token);

    return fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
      .then(response => {
        if (response.headers.get('AuthStatus') != null) {
          // const defaultTxt = I18n.t('common.sessionOutMessage');
          // const okTxt = I18n.t('settings.ok');
          // Alert.alert(defaultTxt, '', [
          //   {text: okTxt, onPress: () => CustomFunctions.logout()},
          // ]);
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
