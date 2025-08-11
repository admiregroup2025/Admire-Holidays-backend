import destinatinInternationAndDomestic from '../../models/destinationInternationAndDomestic.model.js';
import { formatCountryName } from '../../utils.js';

// For sendind name of place according to their type "Domestic/International"
export const destination_Internation_Or_Domestic = async (req, res) => {
  const { type } = req.params;
  try {
    // console.log(type);
    if (!type) {
      return res.status(400).json({ msg: 'type is required', success: false });
    }

    const destinationType = await destinatinInternationAndDomestic.find({
      domestic_or_international:  { $regex: `^${type}$`, $options: 'i' } // Case-insensitive match,
    }).sort({ destination_name: 1 });
    // console.log(destinationType)
    if (!destinationType || destinationType.length == 0) {
      return res.status(409).json({ msg: 'destination type wontExists', success: false });
    }

    console.log(destinationType);

    return res
      .status(200)
      .json({ msg: 'Successfully fetched', success: true, places: destinationType });
  } catch (error) {
    console.log(`Get Destination by type Error -> ${error}`);
    return res.status(500).json({ msg: 'Server Error', success: false });
  }
};

//Adding new destination
export const addDestination_Domestic_Internationl = async (req, res) => {
  try {
    const { destination_name, type,  } = req.body;
    // console.log(destination_name, , type);
    if (!destination_name || !type ) {
      return res.status(400).json({ msg: 'All the fields are required', success: false });
    }
    const alreadyExists = await destinatinInternationAndDomestic.find({
      destination_name: formatCountryName(destination_name),
    });
    console.log(alreadyExists);
    if (alreadyExists.length > 0) {
      return res.status(409).json({ msg: 'The given destination already exists', success: false });
    }
    const newDestination = new destinatinInternationAndDomestic({
      domestic_or_international: formatCountryName(type),
      destination_name: formatCountryName(destination_name),
      title_image: '',
      
    });
    await newDestination.save();
    return res.status(200).json({ msg: 'Destination created successfully', success: true });
  } catch (error) {
    console.log(`Add Destination and Domestic and Internationa ${error}`);
    return res.status(500).json({ msg: 'Server Error', success: false });
  }
};

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
}

//This is the Latest Changes Which is Suggest by the client.
export const updateDestination_Domestic_Internationl = async (req, res) => {
  const { id } = req.params;
  const { destination_name, type } = req.body;
  console.log(req.body);

  try {
    if (!id) {
      return res.status(400).json({ msg: 'ID is required', success: false });
    }
    // if (!destination_name || !type) {
    //   return res.status(400).json({ msg: 'All fields are required', success: false });
    // }

    const destination = await destinatinInternationAndDomestic.findById(id);
    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found', success: false });
    }
    const title_image=req.file ? req.file.path : destination.title_image;

    destination.destination_name = formatCountryName(destination_name);
    destination.domestic_or_international = formatCountryName(type);
    destination.title_image = title_image; // Update the title_image field if provided
    
    await destination.save();
    
    return res.status(200).json({ msg: 'Destination updated successfully', success: true });
  } catch (error) {
    console.log(`Update Destination Error -> ${error}`);
    return res.status(500).json({ msg: 'Server Error', success: false });
  }
}