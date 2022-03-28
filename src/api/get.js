import axios from 'axios';

export function getDataBySearchString (params) {
    return axios.get(`http://www.omdbapi.com/?s=${params.title}&y=${params.year}&type=${params.type}&page=${params.page}&apikey=9d575dc3`)
}

export function getDataByImdbId (param) {
    return axios.get(`https://www.omdbapi.com/?i=${param}&apikey=9d575dc3`)
}