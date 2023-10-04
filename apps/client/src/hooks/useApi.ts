'use client'
import useRequest from "./useRequest";
import axios from "axios";
import {useTypedSelector} from "./useTypedSelector";
import {RequestBuilder} from "../functions/request-builder";


export enum EHttpMethods {
    GET = "get",
    POST = "post",
    PATCH = "patch",
    DELETE = "delete"
}

export function useGetApi<ResponseData> (url: string, isNeedAuth = true, execute = true): [ResponseData | null, boolean, string, Function] {
    const { token } = useTypedSelector(state => state.auth)
    const requestBuilder = new RequestBuilder(url).includeToken(token!)

    const [data, loading, error, execution] = useRequest<ResponseData>(() => axios(requestBuilder.build()), execute)

    return [data, loading, error, execution]
}

export function usePOSTApi<ReqData, ResponseData> (url: string, isNeedAuth = true, reqData: ReqData): [ResponseData | null, boolean, string, Function] {
    const requestBuilder = new RequestBuilder(url)
        .setMethod(EHttpMethods.POST)
        .includeToken(useTypedSelector(state => state.auth).token!)
        .addData(reqData)

    return useRequest<ResponseData>(() => axios(requestBuilder.build()))
}

// export function usePATCHApi<RequestData, ResponseData> (url: string, isNeedAuth = true): [ResponseData | null, boolean, string, Function] {
//     const requestBuilder = new RequestBuilder(url)
//         .setMethod(HttpMethods.PATCH)
//         .includeToken(useTypedSelector(state => state.auth).token!)
//         .addData(reqData)
//
//     const [data, loading, error, e] = useExtendedRequest<RequestData, ResponseData>()
//     //() => axios(requestBuilder.build())
//     return [data, loading, error, execution
// }

export function useDELETEApi<ResponseData> (url: string, isNeedAuth = true, isExecute = true): [ResponseData | null, boolean, string, Function] {
    const requestBuilder = new RequestBuilder(url)
        .setMethod(EHttpMethods.DELETE)
        .includeToken(useTypedSelector(state => state.auth).token!)

    return useRequest<ResponseData>(() => axios(requestBuilder.build()), isExecute)
}
