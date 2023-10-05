'use client'
import {useState} from "react";

export const useInput = <Value>(initialValue: Value) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    return [
        value,
        {
            value,
            onChange
        }
    ]
};
