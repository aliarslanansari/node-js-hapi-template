import { create } from 'apisauce';

const MapApi = create({
    baseURL: 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix',
    headers: { 'Content-Type': 'application/json' }
});
export default MapApi;
