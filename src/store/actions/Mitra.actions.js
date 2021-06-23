import axios from 'axios/index';

export const GET_MITRA_TERDEKAT = '[BLOG] GET_MITRA_TERDEKAT';
export const GET_ANGGOTA_MITRA = '[BLOG] GET_ANGGOTA_MITRA';
export const SIMPAN_MITRA_AKTIF = '[BLOG] SIMPAN_MITRA_AKTIF';
export const SIMPAN_PENGAJUAN_MITRA = '[BLOG] SIMPAN_PENGAJUAN_MITRA';

export function getMitraTerdekat(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Pengguna/getMitraTerdekat', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MITRA_TERDEKAT,
                payload: response.data,
                routeParams
            })
        );
}

export function getAnggotaMitra(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Mitra/getAnggotaMitra', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ANGGOTA_MITRA,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanMitraAktif(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Mitra/simpanMitraAktif', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_MITRA_AKTIF,
                payload: response.data,
                routeParams
            })
        );
}

export function simpanPengajuanMitra(routeParams)
{
    const request = axios.post(localStorage.getItem('api_base')+'/api/Mitra/simpanPengajuanMitra', {
        ...routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : SIMPAN_PENGAJUAN_MITRA,
                payload: response.data,
                routeParams
            })
        );
}