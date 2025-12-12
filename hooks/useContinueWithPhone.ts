import { ConfirmationResult, getAuth, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";

export function useContinueWithPhone() {
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSendCode = async (number: string) => {
        try {
            const response = await signInWithPhoneNumber(getAuth(), number);
            setConfirmationResult(response);    
        } catch (err) {
            console.error(err);
            setConfirmationResult(null);
        }
    };

    const handleConfirmCode = async (code:string) => {
        if(!confirmationResult) {
            console.error("You shoud to get SMS");
            return null
        }
        setIsLoading(true)
        try {
            await confirmationResult.confirm(code)
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
        
    }


    return {
        handleSendCode,
        handleConfirmCode,
        isLoading
    }
}