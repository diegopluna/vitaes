"use client";

import React, { useEffect } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    function get(): T | null {
        
        const item = window?.localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return null;
    }
    const [ value, setValue ] = React.useState<T>(get() ?? initialValue);
    
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}
