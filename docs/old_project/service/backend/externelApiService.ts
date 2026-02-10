import {Request} from '~/service'
import type {UseFetchReturn} from "@vueuse/core";

const request = Request()
const noCorsRequest = Request({
  fetchOptions: {
    mode: 'no-cors'
  }
})

interface IHitokoto {
  "id": number,
  "uuid": string,
  "hitokoto": string,
  "type": string,
  "from": string,
  "from_who": string,
  "creator": string,
  "creator_uid": number,
  "reviewer": number,
  "commit_from": string,
  "created_at": Date,
  "length": number
}

interface IIpCity {
  "requestId": string,
  "code": string,
  "message": string,
  "data": {
    "ip": string,
    "ipVersion": string,
    "countryCode": string,
    "country": string,
    "province": string,
    "city": string,
    "district": string,
    "districtCode": string,
    "longitude": string | number,
    "latitude": string | number,
    "isp": string
  }
}

interface IWeather {
  "code": string,
  "updateTime": Date,
  "fxLink": string,
  "now": {
    "obsTime": Date,
    "temp": string,
    "feelsLike": string,
    "icon": string,
    "text": string,
    "wind360": string,
    "windDir": string,
    "windScale": string,
    "windSpeed": string,
    "humidity": string,
    "precip": string,
    "pressure": string,
    "vis": string,
    "cloud": string,
    "dew": string
  },
  "refer": {
    "sources": [
      string
    ],
    "license": [
      string
    ]
  }
}

interface ILocation {
  "code": string,
  "location": [
    {
      "name": string,
      "id": string,
      "lat": string,
      "lon": string,
      "adm2": string,
      "adm1": string,
      "country": string,
      "tz": string,
      "utcOffset": string,
      "isDst": string,
      "type": string,
      "rank": string,
      "fxLink": string
    }
  ],
  "refer": {
    "sources": [
      string
    ],
    "license": [
      string
    ]
  }
}

const getHitokoto = (): UseFetchReturn<IHitokoto> => {
  return request.get({
    url: 'https://v1.hitokoto.cn/',
    params: {}
  })
}

const getIpCity = (): UseFetchReturn<IIpCity> => {
  return request.get({
    url: 'https://api.songzixian.com/api/ip?dataSource=GLOBAL_IP',
    params: {}
  })
}

const getCurWeather = (params = {}): UseFetchReturn<IWeather> => {
  return request.get({
    url: 'https://devapi.qweather.com/v7/weather/now',
    params: params
  })
}

const getLocationId = (params = {}): UseFetchReturn<ILocation> => {
  return request.get({
    url: 'https://geoapi.qweather.com/v2/city/lookup',
    params: params
  })
}

export {
  getHitokoto,
  getIpCity,
  getCurWeather,
  getLocationId
}
