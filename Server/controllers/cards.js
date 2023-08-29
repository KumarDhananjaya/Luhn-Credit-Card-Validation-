import Cards from "../models/Cards.js";


export const createCard = async (req, res) => {
    try {
        const { userId, cardNumber, cardHolder, expiryDate } = req.body;
        const newCard = new Cards({
            userId,
            cardNumber, 
            cardHolder, 
            expiryDate,

        })
        await newCard.save();

        const card = await Cards.find();
        res.status(201).json(card); 

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

//READ
export const getUserCards = async (req, res) => {
    try {
        const { userId } = req.params;
        const card = await Cards.find({userId});
        res.status(200).json(card); 
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error.message);

    }
};

export const deleteCard = async (req, res) => {
    try {
      const { cardId } = req.params;
  
      const deletedCard = await Cards.findByIdAndRemove(cardId);
  
      if (!deletedCard) {
        return res.status(404).json({ message: 'Card not found' });
      }
      res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };