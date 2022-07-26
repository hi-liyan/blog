import * as qs from "qs";
import {useCallback} from "react";

// 后端api
const apiUrl = "https://noco.surcode.cn/nc/shiguangping_blog_08v8/api/v1/movies";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjcyMTc0ODg4OUBxcS5jb20iLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6Miwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjM3NzY1Mjg0fQ.eEX-nok9kYubG4bsMtuKcGuAUPen3GTl1cn5D8L3hkM'

interface Config extends RequestInit {
    data?: object;
}

export const http = async (
    endpoint: string,
    {data, headers, ...custom}: Config = {}
) => {
    const config = {
        method: "GET",
        headers: {
            "Content-Type": data ? "application/json" : "",
            "xc-auth": token,
            ...headers
        },
        ...custom,
    };
    if (config.method.toUpperCase() === "GET") {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }

    return window
        .fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            const resp = await response.json();
            return resp;
        });
};

/**
 * 获取 http client 的 Hook
 */
export const useHttp = () => {
    return useCallback(
        (...[endpoint, config]: Parameters<typeof http>) =>
            http(endpoint, {...config}),
        []
    );
};
