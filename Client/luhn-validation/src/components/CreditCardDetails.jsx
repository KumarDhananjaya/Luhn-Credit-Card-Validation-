import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../state/index.js";


const CreditCardDetails= () => {

  const dispatch = useDispatch();

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isValid, setIsValid] = useState(null);


  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(value);
  };

  const handleCardHolderChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setCardHolder(value);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  };

  const validateCard = async () => {
    
    if (!cardNumber || !expiryDate || !cvv) {
      setIsValid(false); 
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsValid(data.isValid);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.error('Error validating card:', error);
      setIsValid(false);
    }
  };

  const AddCard = async () => {
    try {
      const response = await fetch('http://localhost:3001/cards', {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: _id,
          cardNumber,        
          cardHolder,      
          expiryDate,         
        }),
      });

      if (response.ok) {
        const cards = await response.json();
        dispatch(setCards({cards}));
        setCards("");
      }
    } catch (error){
      console.error('Error validating card:', error);
    }
  };


  return (
    <Container maxWidth="xs">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Credit Card Details
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="cardNumber"
                  label="Card Number"
                  variant="outlined"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="cardHolder"
                  label="Card Holder (Optional)"
                  variant="outlined"
                  value={cardHolder}
                  onChange={handleCardHolderChange}

                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="expiryDate"
                  label="Expiry Date"
                  variant="outlined"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MMYY"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="cvv"
                  label="CVV"
                  variant="outlined"
                  value={cvv}
                  onChange={handleCvvChange}
                  required
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={validateCard}
              style={{ marginTop: '16px' }}
            >
              Submit
            </Button>
          </form>
          {isValid === true && (
            <Alert severity="success" style={{ marginTop: '16px' }}>
              Your Card is valid! 
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={AddCard}
                style={{ marginTop: '16px' }}
              >
                    Save your Card
              </Button>
            </Alert>
        )}
          {isValid === false && (
            <Alert severity="error" style={{ marginTop: '16px' }}>
             Card is not valid.

            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default CreditCardDetails;