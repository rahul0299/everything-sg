import {useEffect, useRef, useState} from "react";
import "./login.css"
import {useNavigate} from "react-router";


const OTPVerification = ({num_digits}: {num_digits: number}) => {

    const navigate = useNavigate();
    const [code, setCode] = useState(new Array<string>(num_digits).fill(""));
    const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);
    const codeRef = useRef<Array<HTMLInputElement>>(Array(num_digits).fill(null));

    useEffect(() => {
        codeRef.current[0]?.focus();
    }, []);

    const handleChange = (value: string, index: number) => {
        if (codeRef.current[index].value.length > 1) {
            return;
        }

        const newOtp = [...code];
        newOtp[index] = value;
        setCode(newOtp);

        if(value && index < num_digits - 1){
            codeRef.current[index + 1].focus()
        }
    }

    const handleBackspace = (e: KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            codeRef.current[index - 1]?.focus();
        }
    };


    const handlePaste = (e: ClipboardEvent) => {
        e.preventDefault();
        const paste = e.clipboardData && e.clipboardData.getData("text");

        if (!paste) return;

        const newOtp = [...code];
        for (let i = 0; i < Math.min(paste.length, code.length); i++) {
            newOtp[i] = paste[i];
            codeRef.current[i]?.focus();
        }
        setCode(newOtp);
    };


    const handleSubmit = () => {
        console.log(code.join(""));
        performLogin()
        // navigate("/");
    }

    const performLogin = () => {
        setIsVerifyingOtp(true);
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }


    return (
        <div className="auth-container">
            <div className="card otp-form">
                <h2>Verification</h2>
                <p>We have sent an OTP to the email address ***********</p>
                <form action={handleSubmit}>
                        <div className="otp-input-container">
                            {
                                code.map((d, i) => (
                                    <input
                                        key={i}
                                        className="otp-input"
                                        value={d}
                                        onChange={(e) => handleChange(e.target.value, i)}
                                        onKeyDown={(e) => handleBackspace(e.nativeEvent, i)}
                                        ref={reference => {
                                            codeRef.current[i] = reference as HTMLInputElement
                                        }}
                                        onPaste={(e) => handlePaste(e.nativeEvent)}
                                    />
                                ))
                            }
                        </div>
                    <p style={{ marginBottom: "2rem" }}>
                        Didn't recieve an OTP? <a href="" onClick={(e) => e.preventDefault()}><u>Resend</u></a>
                    </p>

                    {
                        isVerifyingOtp

                            ?

                            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <button className="otp-submit disabled" disabled={true} onClick={handleSubmit}>
                                    Verifying <div className="loader" ></div>
                                </button>
                            </div>

                            :

                            <button type="submit" className="otp-submit">Submit</button>
                    }

                </form>
            </div>
        </div>
    )
}


export default OTPVerification