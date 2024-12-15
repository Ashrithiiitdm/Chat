import { useEffect, useState } from "react";

function useLocal(key, initialValue) {

    const [storedVal, setStoredVal] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (err) {
            console.log(err);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const val = typeof storedVal === "function" ? storedVal(storedVal) : storedVal;
            window.localStorage.setItem(key, JSON.stringify(val));
        }
        catch (err) {
            console.log(err);

        }
    }, [key, storedVal]);

    return [storedVal, setStoredVal];

}

export default useLocal;