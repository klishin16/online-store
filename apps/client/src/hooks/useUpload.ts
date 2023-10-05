'use client'
import {useState} from "react";

export const useUpload = () => {
    const [files, setFiles] = useState<any[]>([]);

    const beforeUpload = (file: any) => {
        console.log("Before upload -> file:", file)
        setFiles([...files, file])
        return false;
    }

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return {files, beforeUpload, normFile}
}
