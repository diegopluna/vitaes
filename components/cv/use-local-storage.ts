"use client";

import React, { useEffect } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    function get(): T {
        if (typeof window === 'undefined') return initialValue;
        const item = window?.localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return initialValue;
    }
    const [ value, setValue ] = React.useState<T>(get());
    
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}
