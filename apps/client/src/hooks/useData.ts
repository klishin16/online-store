'use client'
import { useHttp } from "./useHttp";
import { useTypedSelector } from "./useTypedSelector";
import { useState } from "react";
import { EHttpMethods } from "./useApi";

export const useData = <Data>(url: string): [Data | null, boolean] => {
    const { token } = useTypedSelector(state => state.auth)
    const { loading, request } = useHttp()
    const [data, setData] = useState<Data | null>(null);
    request(url, EHttpMethods.GET, {}, {
        Authorization: `Bearer ${ token }`
    }).then((data: Data) => {
        setData(data)
    })

    return [data, loading]
}
