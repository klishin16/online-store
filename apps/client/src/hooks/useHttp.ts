'use client'
import { BACKEND_URL } from "@/constants"
import axios from "axios";
import { useCallback, useState } from "react";
import { message } from "antd";
import { EHttpMethods } from "./useApi";


// export type useHttpResp = {
//     request: Function,
//     loading: boolean,
//     error: string
// }

//
export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")


    const request = useCallback(async function <Body>(url: string, method: EHttpMethods, body?: Body, headers = {}) {
        try {

            const response = await axios({
                method,
                url: BACKEND_URL + url,
                data: body,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    ...headers
                }
            })
            if ((response.status < 200) || (response.status >= 300)) {
                setError(response.data.message || "Что-то пошло не так")
                console.log("here2")
                throw Error(response.data.message || "Что-то пошло не так")
            }

            setLoading(false)
            return response.data

        } catch (e: unknown) {

            console.log("here3")
            // @ts-ignore
            setError(e.name)
        }
    }, [])
    return { loading, error, request }
}

export const useHttpWithErrorHandle = () => {
    const { error, ...rest } = useHttp()

    if (error.length > 0) message.error(error)
    return { ...rest }
}

