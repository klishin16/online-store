'use client'
import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";


export const useRequestDeprecated = <Data> (request: () => Promise<AxiosResponse<Data>>, execute = true): [Data | null, boolean, string, Function] => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Data | null>(null)
    const [error, setError] = useState("")

    const execution = () => {
        setLoading(true)
        setTimeout(() => {
            request()
                .then(response => setData(response.data))
                .catch(error => setError(error))
                .finally(() => setLoading(false))
        }, 1000)
    }

    useEffect(() => execution(), []);

    return [data, loading, error, execution]
}

export const useRequest = <Data>(request: () => Promise<Data>): [Data | null, boolean, () => void] => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Data | null>(null)

    const execution = () => {
        setLoading(true)
        setTimeout(() => {
            request()
                .then(response => setData(response))
                .finally(() => setLoading(false))
        }, 1000)
    }

    useEffect(() => execution(), []);

    return [data, loading, execution]
}
