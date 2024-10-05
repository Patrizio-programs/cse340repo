const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}



showDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const vehicle = await Inventory.findById(id);
    
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Call the utility function to wrap the vehicle data in HTML
    const htmlContent = utilities.wrapVehicleData(vehicle);

    res.send(htmlContent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {getClassifications, showDetail}