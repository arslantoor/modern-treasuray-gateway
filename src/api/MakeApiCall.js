import axios from "axios";
import {toast} from "react-toastify";
import {encode} from 'js-base64';

export function MakeApiCall(url, data, type, params) {
    const base_url = process.env.REACT_APP_API_URL;
    const username = process.env.REACT_ORGANISATION_ID;
    const password = process.env.REACT_PRODUCTION_KEY;
    const authorization = "MmQwNTI3MTUtN2VmNy00MzhkLWExZmUtODQ1OGM3ODYzM2JmOnRlc3QtM2txN05kUmpxTFRNZmZ1M2lRNE1ndTVhOUs1UGpKTVVuQzNtdnBjVkFnWXY5MUNVbk5OanFtZUhadFhKREpmZA=="
    return axios({
        url: base_url + url,
        params: params,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${authorization}`
        },
        data: data,
        method: type
    }).catch(err => {
        toast.error("Payment failed", {
            position: 'top-center'
        });
    })
}

export default MakeApiCall;