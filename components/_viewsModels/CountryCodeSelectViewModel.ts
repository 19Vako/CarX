import { useState } from "react";

export function CountryCodeSelectViewMode() {
    const [isVisible, setIsVisible] = useState(false)

    return {
        isVisible, 
        setIsVisible
    }
}