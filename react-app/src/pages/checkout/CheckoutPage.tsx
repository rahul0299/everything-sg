import {ReactNode, useEffect, useState} from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Paper,
    styled,
    StepConnector,
    CircularProgress,
    Alert, AlertTitle,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';

import "./checkoutpage.css";
import CardDetailsForm from "../../components/CardDetailsForm.tsx";
import {useNavigate} from "react-router";
import {processPayment} from "../../utlis.ts";

// Custom connector with animated fill
const AnimatedConnector = styled(StepConnector)(({ theme }) => ({
    [`& .MuiStepConnector-line`]: {
        height: 3,
        border: 0,
        width: "100%",
        backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#ccc',
        borderRadius: 1,
        position: 'relative',
        zIndex: 0
    },
    [`& .MuiStepConnector-line::before`]: {
        transition: 'all 0.4s ease-in-out',
        content: '""',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        width: 0,
        height: 3,
        border: 0,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 1,
    },
    [`&.Mui-active .MuiStepConnector-line::before`]: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
    },
    [`&.Mui-completed .MuiStepConnector-line::before`]: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
    },
}));

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
    '& .MuiStepIcon-root': {
        transition: 'all 0.4s ease-in-out',
        transitionDelay: '0.4s',
        color: theme.palette.text.disabled, // fallback for inactive steps
    },
    '& .Mui-active .MuiStepIcon-root': {
        color: theme.palette.primary.main,
    },
    '& .Mui-completed .MuiStepIcon-root': {
        color: theme.palette.success.main, // completed circle color
    },
}));


const steps = ['Payment Option', 'Payment Details', 'Confirmation'];

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        }
    };

    const getStep = (step: number) : ReactNode => {
        if (step === 0) {
            return <PaymentOptionStep />
        } else if (step === 1) {
            return <PaymentDetailStep />;
        } else if (step === 2) {
            return <ConfirmStep onSuccess={() => navigate("/")} onFailure={() => setActiveStep(1)}/>
        }

        return <CircularProgress />
    }

    return (
        <div className="checkout-container">
            <Box sx={{ width: '100%' }}>
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    connector={<AnimatedConnector />}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StyledStepLabel>{label}</StyledStepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Step content */}
                <Box mt={4} sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper elevation={10} sx={{
                        p: 4,
                        height: "100%",
                        width: 500,
                        minHeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: "column"
                    }}>
                        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
                            {getStep(activeStep)}
                        </Box>

                        {
                            activeStep < 3 &&
                            <Box marginTop={2} display="flex" width="100%" justifyContent="space-evenly" gap={2}>
                                <button
                                    style={{ flexGrow: 1 }}
                                    className="outline-button"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                                <button
                                    style={{ flexGrow: 1 }}
                                    className="primary-button"
                                    onClick={handleNext}
                                    disabled={activeStep === steps.length - 1}
                                >
                                    Confirm
                                </button>
                            </Box>
                        }
                    </Paper>
                </Box>
            </Box>
        </div>
    );
};

export default CheckoutPage;


const PaymentOptionStep = () => {
    const [selected, setSelected] = useState('');

    const paymentMethods = [
        {
            value: 'card',
            label: 'Credit or Debit Card',
            icons: ['visa', 'mastercard', 'amex', 'discover'],
            icon: <CreditCardIcon />,
        },
        {
            value: 'paynow',
            label: 'PayNow',
            icon: <PaymentIcon />,
        },
        {
            value: 'paylah',
            label: 'PayLah!',
            icon: <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" height={20} />,
        },
    ];

    return <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={9}>
        <Typography variant="h5" fontWeight="bold">Select Payment Option</Typography>
        <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
            {paymentMethods.map((method) => (
                <Box py={1} display="flex" width="100%" key={`payment-method-${method.value}`}>
                    <FormControlLabel
                        value={method.value}
                        control={<Radio />}
                        label={
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box mr={2}>
                                    <Typography fontWeight={600}>{method.label}</Typography>
                                </Box>
                                {method.icon}
                            </Box>
                        }
                    />
                </Box>
            ))}
        </RadioGroup></Box>
}

const PaymentDetailStep = () => {
    return <CardDetailsForm />
}

const ConfirmStep = ({ onSuccess, onFailure }: { onSuccess: () => void, onFailure: () => void }) => {
    const [status, setStatus] = useState<'loading' | 'success' | 'failure'>('loading');

    useEffect(() => {
        processPayment() // no args or pass form values if needed
            .then(() => setStatus('success'))
            .catch(() => setStatus('failure'));
    }, []);

    return (
        <Box textAlign="center" py={6}>
            {status === 'loading' && (
                <>
                    <CircularProgress />
                    <Typography mt={2}>Processing your payment…</Typography>
                </>
            )}

            {status === 'success' && (
                <>
                    <div style={{ textAlign: "left" }}>
                        <Alert severity="success" sx={{ p: 4 }}>
                            <b>Payment Successful</b>
                        </Alert>
                    </div>
                    <button style={{ marginTop: "2rem" }} className="primary-button" onClick={onSuccess}>Return Home</button>
                </>
            )}

            {status === 'failure' && (
                <>
                    <div style={{ textAlign: "left" }}>
                        <Alert severity="error" sx={{ p: 5 }}>
                            <AlertTitle>Payment Failed</AlertTitle>
                            Something went wrong. Please try again
                        </Alert>
                    </div>
                    <button style={{ marginTop: "2rem", marginRight: "1rem" }} className="primary-button" onClick={onFailure}>Retry Payment</button>
                    <button style={{ marginTop: "2rem" }} className="outline-button" onClick={onSuccess}>Return Home</button>
                </>
            )}
        </Box>
    );
};