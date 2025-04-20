import {FormEvent, useEffect, useRef, useState} from "react";
import "./login.css"
import {useLocation, useNavigate} from "react-router";
import {useAuth} from "../../store/AuthContext.tsx";
import {verifyOTP} from "../../utlis.ts";
import {Alert} from "@mui/material";


const OTPVerification = ({num_digits}: {num_digits: number}) => {

    const navigate = useNavigate();
    const { loginUser } = useAuth();
    const location = useLocation();

    const user = location.state?.user;
    const from = location.state?.from || "/";

    const [code, setCode] = useState(new Array<string>(num_digits).fill(""));
    const [state, setState] = useState<string>("");
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


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setState("loading");

        const otp = code.join("");

        try {
            const res = await verifyOTP({email: user.email, otp});

            if (res !== "Success") {
                throw new Error("OTP failed");
            }

            setState("");
            const login = await loginUser(user.email, user.password)

            if (login === "Success") {
                navigate(from, { replace: true });
            } else {
                throw new Error("Login failed")
            }
        } catch (err) {
            console.error(err);
            setState("error");
        }
    }

    const censorEmail = (email: string, showchars: number = 5): string => {
        const i = email.lastIndexOf("@");
        return email.substring(0, Math.min(showchars, i)) + "*".repeat(Math.max(0, i - showchars)) + email.substring(i, email.length);
    }


    return (
        <div className="auth-container">
            <div className="card otp-form">
                <h2>Verification</h2>
                {
                    state === "error" && (
                        <Alert severity="error" style={{ marginBottom: "1rem" }}>
                            Sign up failed. Please try again.
                        </Alert>
                    )
                }
                {
                    state !== "error" && <p style={{ margin: "1rem auto" }}>We have sent an OTP to the email address {censorEmail(user?.email)}</p>
                }
                <form onSubmit={handleSubmit}>
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
                        Didn't receive an OTP? <a href="" onClick={(e) => e.preventDefault()}><u>Resend</u></a>
                    </p>

                    {
                        state === "loading"

                            ?

                            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <button type="submit" className="otp-submit disabled" disabled={true} >
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