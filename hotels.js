const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const BOOKING_API_URL = 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotelsByCoordinates';
const API_KEY = '805fdd6ee1msh3f9b8f1b29b3f48p14f913jsn106267618f18';  // Tu clave de API

// Middleware para manejar JSON
app.use(express.json());

// Endpoint para buscar hoteles por coordenadas
app.get('/hotels', async (req, res) => {
    const { latitude, longitude, adults, children, currency_code, arrival_date, departure_date } = req.query;

    // Validar fechas de llegada y salida
    if (!arrival_date || !departure_date) {
        return res.status(400).json({ message: 'arrival_date and departure_date are required' });
    }

    try {
        // Solicitud a la API externa
        const response = await axios.get(BOOKING_API_URL, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
            },
            params: {
                latitude: latitude || '19.4326077',  // Coordenadas de ejemplo (Ciudad de México)
                longitude: longitude || '-99.133208',
                adults: adults || '1',
                children: children || '0',
                currency_code: currency_code || 'EUR',
                arrival_date,
                departure_date
            }
        });
        // Enviar la respuesta de la API al cliente
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ message: 'Error fetching hotels' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Hotel microservice running on port ${PORT}`);
});
