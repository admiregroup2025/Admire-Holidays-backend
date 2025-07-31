import express from 'express';
import {
  // trendingDestination,
  // ourResorts,
  // destinationIteneries,
  // internationalDestinations,
  // domesticDestinations,
  // addDestination_Domestic_Internationl
  getImageGalleryByType,
  getItineraryByDestinationId,
  getSingleItineraryById,
} from '../../controller/destination.controller.js';

const destinationRoute = express.Router();

// destinationRoute.get('/international-destinations', internationalDestinations);
// destinationRoute.get('/domestic-destinations', domesticDestinations);
// destinationRoute.get('/trending-destination', trendingDestination);
// destinationRoute.get('/trending-destination/:place', destinationIteneries);
// destinationRoute.get('/resorts', ourResorts);

// New

destinationRoute.get('/image-gallery/:type', getImageGalleryByType); // Fetch image gallery by type
destinationRoute.get('/itineraries/:place', getItineraryByDestinationId); // Fetch itineraries by place
destinationRoute.get('/itinerary/:id', getSingleItineraryById); // Fetch single itinerary by ID

export default destinationRoute;
