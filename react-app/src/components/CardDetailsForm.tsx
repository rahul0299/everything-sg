import {
    Grid,
    Typography,
    TextField,
    Switch,
    styled, Box, FormControl,
} from '@mui/material';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useState} from "react";


const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#1890ff',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#177ddc',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255,255,255,.35)',
        }),
    },
}));

const CardDetailsForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');

    // Remove spaces from input, limit to 16 digits, then format
    const formatCardNumber = (value: string): string => {
        const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
        return digitsOnly.replace(/(.{4})/g, '$1 ').trim();
    };

    const handleCardInputChange = (e) => {
        const raw = e.target.value;
        setCardNumber(formatCardNumber(raw));
    };

    const handleCvvChange = (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 4);
        setCvv(digitsOnly);
    };


    return (
       <Box sx={{ width: "100%" }}>
           <h2>Payment Details</h2>
           <FormControl>
               <Grid container spacing={2}>
                   <Grid size={12}>
                       <Typography textAlign="left" margin={1}>Name on the Card</Typography>
                       <TextField
                           fullWidth
                           placeholder="Name on the Card"
                           onChange={(e) => setName(e.target.value)}
                           value={name}
                       ></TextField>
                   </Grid>
                   <Grid size={12}>
                       <Typography textAlign="left" margin={1}>Card Number</Typography>
                       <TextField
                           fullWidth
                           placeholder="XXXX XXXX XXXX XXXX"
                           value={cardNumber}
                           onChange={handleCardInputChange}
                           slotProps={{ htmlInput: { inputMode: "numeric" }}}

                       ></TextField>
                   </Grid>
                   <Grid size={6}>
                       <Typography textAlign="left" margin={1}>Expiry Date</Typography>
                       <LocalizationProvider dateAdapter={AdapterDateFns}>
                           <DatePicker
                               views={['month', 'year']}
                               format="MM/yy"
                               disablePast
                               slotProps={{
                                   textField: { fullWidth: true },
                               }}
                           />
                       </LocalizationProvider>
                   </Grid>
                   <Grid size={6}>
                       <Typography textAlign="left" margin={1}>CVV</Typography>
                       <TextField
                           fullWidth
                           placeholder="CVV"
                           type="password"
                           value={cvv}
                           onChange={handleCvvChange}
                           slotProps={{ htmlInput: { maxLength: 3, inputMode: 'numeric'} }}
                       />
                   </Grid>
                   <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                       <AntSwitch />Save my card details
                   </Box>
               </Grid>
           </FormControl>
       </Box>
    )
};

export default CardDetailsForm;
