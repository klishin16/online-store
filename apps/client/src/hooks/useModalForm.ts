import React from "react";
import {EHttpMethods} from "./useApi";
import axios from "axios";
import {message} from "antd";
import {RequestBuilder} from "../functions/request-builder";
import {useTypedSelector} from "./useTypedSelector";


type UseModalType = [
    showModal: Function,
    modalProps: Object
]

export const useModalForm = <Data>(modalTitle: string, url: string, withFiles = false) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const {token} = useTypedSelector(state => state.auth)

    const showModal = () => {
        setVisible(true);
    };

    const onCreate = (data: Data): void | string[] => { //TODO  в постапи возвращать опционально обект request builder а
        setErrors([])
        setConfirmLoading(true);

        const formData = new FormData()
        for (let key in data) {
            // @ts-ignore
            formData.append(key, data[key])
        }

        const requestData = withFiles ? formData : data

        console.log('Request data:', requestData)

        const rb = new RequestBuilder(url, EHttpMethods.POST, requestData, {}).includeToken(token!)
        console.log("onCreate")
        setTimeout(() => {
            axios(rb.build())
                .then(() => {
                    message.success("Created successfully!")
                    setVisible(false)
                })
                .catch(reason => {
                    if (reason.response.stats === 200) {
                        setErrors(reason.response.data)
                    } else {
                        setErrors([reason.name])
                    }

                })
                .finally(() => setConfirmLoading(false)
                )
        }, 500)

    };


    const onCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return {
        showModal,
        modalTitle,
        confirmLoading,
        visible,
        onCreate,
        onCancel,
        errors
    }
}
