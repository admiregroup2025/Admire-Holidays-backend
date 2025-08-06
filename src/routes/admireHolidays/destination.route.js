import express from 'express';
import {
  getImageGalleryByType,
  getItineraryByDestinationId,
  getSingleItineraryById,
} from '../../controller/destination.controller.js';

const destinationRoute = express.Router();
destinationRoute.get('/image-gallery/:type', getImageGalleryByType); // Fetch image gallery by type
destinationRoute.get('/itineraries/:place', getItineraryByDestinationId); // Fetch itineraries by place
destinationRoute.get('/itinerary/:id', getSingleItineraryById); // Fetch single itinerary by ID

export default destinationRoute;
