import { useEffect } from "react";
import useLocal from "./useLocal"

const useColorMode = () => {
    const [colorMode, setColorMode] = useLocal("color-theme", "light");

    useEffect(() => {
        const className = 'dark';

        const bodyElement = window.document.body.classList;

        if (colorMode == "dark") {
            bodyElement.add(className);
        }
        else {
            bodyElement.remove(className);
        }
    }, [colorMode]);
    return [colorMode, setColorMode];
}

export default useColorMode;