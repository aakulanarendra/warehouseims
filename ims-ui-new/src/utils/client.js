import {toast} from 'react-toastify';
import axios from "axios";

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/narendraims/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "category";
const cloudinaryJsonHeaders = new Headers({'content-type': "multipart/form-data"});
cloudinaryJsonHeaders.append('Content-Type','application/json')
// cloudinaryJsonHeaders.append('Access-Control-Allow-Credentials', 'true');
cloudinaryJsonHeaders.append("Access-Control-Allow-Origin", "*");
// cloudinaryJsonHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
// cloudinaryJsonHeaders.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")


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
                // response ok but not json
                errorCallback(err)
            })
        } else {
            errorCallback(response)
        }
    }).catch(function (err) {
        toast.error('An unknown GET network error occurred')
        console.log(`Fetch GET Error : ${  err}`)
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
                // response ok but not json
                successCallback(err)
            })
        } else {
            errorCallback(response)
        }
    }).catch(function (err) {
        toast.error('An unknown GET network error occurred')
        console.log(`Fetch GET Error : ${  err}`)
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
            console.log(`ERROR Retrieving data! Status Code: ${  response.status}`)
            errorCallback(response)
        }
    }).catch(function (err) {
        toast.error('An unknown POST network error occurred')
        console.log(`Fetch POST Error : ${  err}`)
    })
}

export const patchP = function (uri, patchData) {
    // NOTE: 'PATCH' is the only method type that has to be uppercase to work
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
        } 
            if (response.status === 404) {
                toast.error(`Sample not found`)
                return Promise.reject(response)
            }
            return Promise.reject(response)
        
    }).catch(error => {
        console.log(`Fetch PATCH Error : ${  error}`)
        console.dir(error)
        toast.error(`Sample failed to updated`)
        return Promise.reject(error);
    })
}
export const patch = function (uri, patchData, successCallback, errorCallback) {
    // NOTE: 'PATCH' is the only method type that has to be uppercase to work
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
        console.log(`Fetch PATCH Error : ${  err}`)
        console.dir(err)
    })
}


export const uploadImage = function (postData, successCallback, errorCallback) {

    let uri = "https://api.cloudinary.com/v1_1/narendraims/image/upload";
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
            console.log(`ERROR Retrieving data! Status Code: ${  response.status}`)
            errorCallback(response)
        }
    }).catch(function (err) {
        toast.error('An unknown POST network error occurred')
        console.log(`Fetch POST Error : ${  err}`)
    })
}


export const handleImageUpload = function (files, successCallback, errorCallback) {

    const uploaders = (files||[]).map(file => {
        // Initial FormData
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        // formData.append("api_key", "1234567");
        formData.append("timestamp", (Date.now() / 1000) | 0);


        return axios.post(CLOUDINARY_UPLOAD_URL, formData,{timeout:30000})
            .then(response => {
            return response.data;

        })
    });


    axios.all(uploaders).then(result => {
        successCallback(result)
    }, error => errorCallback(error));

};





export const getRoute = function(path) {
    let args = Array.prototype.slice.call(arguments, 1);
    let count = -1;
    return path.replace(/:[a-zA-Z?]+/g, function (match) {
        count += 1;
        return args[count] !== undefined ? args[count] : match;
    });
};