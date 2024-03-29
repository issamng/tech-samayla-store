const axios = require('axios');

const getNewProducts = async () => {
  try {
    const response = await axios.get("https://techsamayla.vercel.app/api/newProducts");
    console.log("Liste des nouveaux produits :", response.data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des nouveaux produits :",
      error
    );
  }
};

getNewProducts();
