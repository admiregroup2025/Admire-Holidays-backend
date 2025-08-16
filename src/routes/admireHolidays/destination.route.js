import express from 'express';
import {
  getImageGalleryByType,
  getItineraryByDestinationId,
  getSingleItineraryById,
  getExclusiveAndWeekendItinerary,
  getTrendingDestination,
  // getWeekendTrendingItineraries
} from '../../controller/destination.controller.js';

const destinationRoute = express.Router();
destinationRoute.get('/image-gallery/:type', getImageGalleryByType); // Fetch image gallery by type
destinationRoute.get('/itineraries/:place', getItineraryByDestinationId); // Fetch itineraries by place
destinationRoute.get('/itinerary/:id', getSingleItineraryById); // Fetch single itinerary by ID
destinationRoute.get('/classified-itinerary', getExclusiveAndWeekendItinerary); // Fetch exclusive and weekend itineraries for home page
destinationRoute.get('/home/trending-destination', getTrendingDestination); // Fetch trending destinations
// destinationRoute.get('/weekend-trending-itineraries', getWeekendTrendingItineraries); // Fetch weekend trending itineraries

export default destinationRoute;
