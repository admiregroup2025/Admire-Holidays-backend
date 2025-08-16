import destinatinInternationAndDomestic from '../../models/destinationInternationAndDomestic.model.js';
import { formatCountryName } from '../../utils.js';

// For sending name of place according to their type "Domestic/International"
export const destination_Internation_Or_Domestic = async (req, res) => {
  const { type } = req.params;
  try {
    if (!type) {
      return res.status(400).json({ msg: 'type is required', success: false });
    }

    const destinationType = await destinatinInternationAndDomestic
      .find({
        domestic_or_international: { $regex: `^${type}$`, $options: 'i' }, // Case-insensitive match
      })
      .sort({ destination_name: 1 });

    if (!destinationType || destinationType.length === 0) {
      return res.status(409).json({ msg: 'Destination type not found', success: false });
    }

    return res
      .status(200)
      .json({ msg: 'Successfully fetched', success: true, places: destinationType });
  } catch (error) {
    console.log(`Get Destination by type Error -> ${error}`);
    return res.status(500).json({ msg: 'Server Error', success: false });
  }
};

// Adding new destination
export const addDestination_Domestic_Internationl = async (req, res) => {
  try {
    const { destination_name, type, destination_type } = req.body;
    const titleImageUrl = req.files;
    const titleImages = titleImageUrl ? titleImageUrl.map(file => file.path) : [];

    if (!destination_name || !type) {
      return res.status(400).json({ msg: 'All the fields are required', success: false });
    }

    const alreadyExists = await destinatinInternationAndDomestic.find({
      destination_name: formatCountryName(destination_name),
    });

    if (alreadyExists.length > 0) {
      return res.status(409).json({ msg: 'The given destination already exists', success: false });
    }

    const newDestination = new destinatinInternationAndDomestic({
      domestic_or_international: formatCountryName(type),
      destination_name: formatCountryName(destination_name),
      title_image: titleImages,
      destination_type: Array.isArray(destination_type) ? destination_type : [destination_type],
    });

    await newDestination.save();

    return res.status(200).json({ msg: 'Destination created successfully', success: true });
  } catch (error) {
    console.log(`Add Destination Error: ${error}`);
    return res.status(500).json({ msg: 'Server Error', success: false });
  }
};

// Delete destination
export const deleteDestination_Domestic_Internationl = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ msg: 'ID is required', success: false });
    }
    const destination = await destinatinInternationAndDomestic.findById(id);
    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found', success: false });
    }
    await destinatinInternationAndDomestic.findByIdAndDelete(id);
    return res.status(200).json({ msg: 'Destination deleted successfully', success: true });
  } catch (error) {
    console.log(`Delete Destination Error -> ${error}`);
    return res.status(500).json({ msg: 'Server Error', success: false });
  }
};

// Get single destination by ID
export const getSingleDestinationBYId = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ msg: 'ID is required', success: false });
    }
    const destination = await destinatinInternationAndDomestic.findById(id);
    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found', success: false });
    }
    return res
      .status(200)
      .json({ msg: 'Destination fetched successfully', success: true, destination });
  } catch (error) {
    console.log(`Get Single Destination Error -> ${error}`);
    return res.status(500).json({ msg: 'Server Error', success: false });
  }
};

// Update destination
export const updateDestination_Domestic_Internationl = async (req, res) => {
  const { id } = req.params;
  const { destination_name, type, destination_type } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ msg: 'ID is required', success: false });
    }

    const destination = await destinatinInternationAndDomestic.findById(id);
    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found', success: false });
    }

    // Merge title_image if new images are uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      destination.title_image = Array.from(
        new Set([...(destination.title_image || []), ...newImages])
      );
    }

    // Update basic fields
    if (destination_name) {
      destination.destination_name = formatCountryName(destination_name);
    }
    if (type) {
      destination.domestic_or_international = formatCountryName(type);
    }

    // Merge destination_type values
    if (destination_type) {
      destination.destination_type = Array.isArray(destination_type)
        ? destination_type
        : [destination_type];
    }

    await destination.save();

    return res.status(200).json({ msg: 'Destination updated successfully', success: true });
  } catch (error) {
    console.log(`Update Destination Error -> ${error}`);
    return res.status(500).json({ msg: 'Server Error', success: false });
  }
};
