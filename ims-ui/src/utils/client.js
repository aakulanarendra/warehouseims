import {toast} from 'react-toastify';
import {useEffect, useState} from "react";

const jsonHeaders = new Headers({'Content-Type': 'application/json'});
jsonHeaders.append('Accept', 'application/json');
jsonHeaders.append('Access-Control-Allow-Credentials', 'true');
jsonHeaders.append("Access-Control-Allow-Origin", "*");
jsonHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
jsonHeaders.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")


// jsonHeaders.append('GET', 'POST', 'OPTIONS');

export const get = function (uri, successCallback, errorCallback) {
    fetch(uri, {
        headers: jsonHeaders,
        method: 'GET',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                successCallback(data)
            }).catch(function (err) {
                console.dir(err)
                //response ok but not json
                errorCallback(err)
            })
        } else {
            errorCallback(response)
        }
    }).catch(function (err) {
        toast.error('An unknown GET network error occurred')
        console.log('Fetch GET Error : ' + err)
        console.dir(err)
    });
}

export const del = function (uri, successCallback, errorCallback) {
    fetch(uri, {
        headers: jsonHeaders,
        method: 'DELETE',
    }).then(function (response) {
        if (response) {
            response.json().then(function (data) {
                successCallback(data)
            }).catch(function (err) {
                console.dir(err)
                //response ok but not json
                successCallback(err)
            })
        } else {
            errorCallback(response)
        }
    }).catch(function (err) {
        toast.error('An unknown GET network error occurred')
        console.log('Fetch GET Error : ' + err)
        console.dir(err)
    });
}


export const post = function (uri, postData, successCallback, errorCallback) {
    fetch(uri, {
        headers: jsonHeaders,
        method: 'POST',
        body: JSON.stringify(postData)
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                successCallback(data)
            })
        } else {
            console.log('ERROR Retrieving data! Status Code: ' + response.status)
            errorCallback(response)
        }
    }).catch(function (err) {
        toast.error('An unknown POST network error occurred')
        console.log('Fetch POST Error : ' + err)
    })
}

export const patchP = function (uri, patchData) {
    //NOTE: 'PATCH' is the only method type that has to be uppercase to work
    return fetch(uri, {
        headers: jsonHeaders,
        method: 'PATCH',
        body: JSON.stringify(patchData),
        credentials: 'include'
    }).then(function (response) {
        if (response.ok) {
            return response.json().catch(error => {
                return Promise.reject(error)
            });
        } else {
            if (response.status === 404) {
                toast.error(`Sample not found`)
                return Promise.reject(response)
            }
            return Promise.reject(response)
        }
    }).catch(error => {
        console.log('Fetch PATCH Error : ' + error)
        console.dir(error)
        toast.error(`Sample failed to updated`)
        return Promise.reject(error);
    })
}
export const patch = function (uri, patchData, successCallback, errorCallback) {
    //NOTE: 'PATCH' is the only method type that has to be uppercase to work
    fetch(uri, {
        headers: jsonHeaders,
        method: 'PATCH',
        body: JSON.stringify(patchData)
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                successCallback(data)
            })
        } else {
            errorCallback(response)
        }
    }).catch(function (err) {
        toast.error('An unknown PATCH network error occurred')
        console.log('Fetch PATCH Error : ' + err)
        console.dir(err)
    })
}

export const useFetch = function (url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }
    useEffect(() => {
        fetchUrl();
    }, []);
    return [data, loading];
};
