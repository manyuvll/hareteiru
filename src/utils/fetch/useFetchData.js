import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import * as constants from '../const'
import { getCurrentTheme } from '../../utils/weatherTheme'

export default function useFetchData(loadOnMount) {
    const [status, setStatus] = useState(constants.IDLE);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    const fetch = useCallback(
        url => {
            setStatus(constants.PENDING);
            setValue(null);
            setError(null);
            
            axios({
                "method": "GET",
                "url": url,
                "headers": {
                  "Access-Control-Allow-Origin": "*"
                }
          
              })
              .then((response) => {
                response.data = {...response.data, ...getCurrentTheme(response.data)}
                setValue(response.data);
                setStatus(constants.SUCCESS);
              })
              .catch((error) => {
                console.log(error);
                setStatus(constants.ERROR);
                setError(error);
              })
        },
        [],
    )

    useEffect(() => {
        if(loadOnMount) {
            fetch();
        }
    }, [fetch, loadOnMount])

    return { fetch, status, value, error }
}