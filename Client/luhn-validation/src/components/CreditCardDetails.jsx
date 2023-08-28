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

function CreditCardDetails() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isValid, setIsValid] = useState(null);

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
    try {
      const response = await fetch('YOUR_BACKEND_API_URL', {
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="cardHolder"
                  label="Card Holder"
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
              Card is valid! and Added Successfully
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