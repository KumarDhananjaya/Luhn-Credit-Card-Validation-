export const validate = async (req, res) => {
    const { cardNumber } = req.body;
    
    const payload = cardNumber.slice(0, -1);
  
    const payloadDigits = payload.split('').map(Number);
    let sum = 0;
  
    for (let i = payloadDigits.length - 1; i >= 0; i--) {
      let digit = payloadDigits[i];
  
      if (i % 2 === payloadDigits.length % 2) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
    }
  
    const checkDigit = (10 - (sum % 10)) % 10;
  
    const providedCheckDigit = Number(cardNumber.slice(-1));
  
    const isValid = checkDigit === providedCheckDigit;
  
    if (isValid) {
      res.json({ isValid: true });
    } else {
      res.json({ isValid: false });
    }
  };