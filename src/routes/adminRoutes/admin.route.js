import express from 'express';
import { authorizeAdmin, auth } from '../../middleware/auth.js';
import uploadMedia from '../../middleware/mediaUploads.js';
import {
  postImageGallery,
  getImageForPlace,
  deleteImageFromGallery
} from '../../controller/admin/imageGallery.controller.js';
import {
  AdminUserVerify,
  AdminUserCreate,
  changePassword,
  userExistedInAdmin,
  getMe,
  logout,
  deleteUser,
} from '../../controller/admin/user.admin.controller.js';
import {
  postCustomerGallery,
  getAllCustomerGalleryImages,
  deleteCustomerGalleryImage,
} from '../../controller/admin/customerGallery.admin.controller.js';
import { destination_Internation_Or_Domestic } from '../../controller/admin/destination.admin.controller.js';
import { addDestination_Domestic_Internationl } from '../../controller/admin/destination.admin.controller.js';
import { getTNC, TNC } from '../../controller/admin/termsAndCondition.admin.controller.js';
import {
  getPaymentMethod,
  paymentMethod,
} from '../../controller/admin/paymentMode.admin.controller.js';
import {
  updateCancellationPolicy,
  getCancellationPolicy,
} from '../../controller/admin/cancellation.admin.controller.js';
import { testimonialVideo } from '../../controller/admin/testimonialVideo.admin.controller.js';
import {
  createItinerary,
  getAllItinerary,
  getItineraryById,
  deleteItinerary,
} from '../../controller/admin/itinaray.admin.controller.js';

import {
  heroSection,
  getAllHeroVideo,
  updateHeroVideo,
  deleteHeroVideo,
} from '../../controller/admin/heroSection.admin.controller.js';

import {
  getPlanYourJourney,
  getContact,
  getSubscribe,
  getSuggestions,
} from '../../controller/admin/leads.admin.controller.js';

import {
  createCity,
  getStateCity,
  getCity,
  UpdateCity,
  DeleteCity
} from '../../controller/admin/cities.admin.controller.js';
import {
  postBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} from '../../controller/admin/Blog.admin.controller.js';

const adminRoute = express.Router();

//Admine Authenticatiomn Section
adminRoute.post('/admin-login', AdminUserVerify);
adminRoute.get('/me', auth, getMe);
adminRoute.post('/logout', auth, logout);
adminRoute.patch('/change-password', auth, authorizeAdmin, changePassword);

// Admin only section no user acccess
adminRoute.post('/add-user', auth, authorizeAdmin, AdminUserCreate);
adminRoute.get('/get-admin-user', auth, authorizeAdmin, userExistedInAdmin);
adminRoute.delete('/delete-user/:userId', auth, authorizeAdmin, deleteUser);

// Image Gallery Section
adminRoute.post('/image-Gallery', auth, uploadMedia.array('image'), postImageGallery);
adminRoute.get('/image-Gallery/:destination_id', auth, getImageForPlace);
adminRoute.delete('/image-Gallery/delete', auth, authorizeAdmin,deleteImageFromGallery)  
// adminRoute.get('/image-Gallery',auth,getAllImage);

// Destination Section
adminRoute.get('/destination/:type', auth, destination_Internation_Or_Domestic);
adminRoute.post('/new-destination', auth, addDestination_Domestic_Internationl);
adminRoute.post(
  '/itinerary',
  auth,
  uploadMedia.single('video'), // ⬅️ only expecting one uploaded video
  createItinerary
);
adminRoute.get('/itinerary', auth, getAllItinerary);
adminRoute.get('/itinerary-details/:id', auth, getItineraryById);
adminRoute.delete('/itinerary/:id', auth, authorizeAdmin, deleteItinerary);
adminRoute.post('/city', auth, uploadMedia.array('image'), createCity);
adminRoute.get('/state/:destinationId', auth, getStateCity);
adminRoute.get('/city/:cityId', auth, getCity);
adminRoute.patch('/city/:cityId', auth, uploadMedia.array('image'), UpdateCity);
adminRoute.delete('/city/:cityId', auth, authorizeAdmin, DeleteCity);

// Terms And Conditions Section
adminRoute.get('/tnc/:id', auth, getTNC);
adminRoute.patch('/tnc', auth, TNC);

// Payment Mode Section
adminRoute.get('/payment-mode/:type', auth, getPaymentMethod);
adminRoute.post('/payment-mode', auth, paymentMethod);

// Cancellation Policy Section
adminRoute.get('/cancellation-policy', auth, getCancellationPolicy);
adminRoute.put('/cancellation-policy', auth, updateCancellationPolicy);

// Customer Gallery  Section
adminRoute.post('/customer-gallery', auth, uploadMedia.array('image'), postCustomerGallery);
adminRoute.get('/customer-gallery', auth, getAllCustomerGalleryImages);
adminRoute.delete('/customer-gallery/delete', auth, deleteCustomerGalleryImage);

// Testimonial Section
adminRoute.post('/testimonial-video', auth, uploadMedia.single('image'), testimonialVideo);

// Hero Section
adminRoute.post('/hero-section', auth, uploadMedia.single('image'), heroSection);

adminRoute.get('/hero-section/:page', auth, getAllHeroVideo);
adminRoute.patch('/hero-section/:videoId', auth, updateHeroVideo);
adminRoute.delete(
  '/hero-section/:videoId',
  auth,
  authorizeAdmin,
  uploadMedia.single('image'),
  deleteHeroVideo
);

// Leads Section
adminRoute.get('/plan-your-journey', auth, getPlanYourJourney);
adminRoute.get('/get-contact', auth, getContact);
adminRoute.get('/get-subscribe', auth, getSubscribe);
adminRoute.get('/get-suggestions', auth, getSuggestions);

//Blog Section

adminRoute.post('/blog', auth, uploadMedia.single('coverImage'), postBlog);
adminRoute.get('/blog', auth, getBlog);
adminRoute.get('/blog/:blogId', auth, getSingleBlog);
adminRoute.patch('/blog/:blogId', auth, uploadMedia.single('coverImage'), updateBlog);
adminRoute.delete('/blog/:blogId', auth, authorizeAdmin, deleteBlog);

export default adminRoute;
