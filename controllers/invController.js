const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}



/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
        [classification_id]
      )
      return data.rows
    } catch (error) {
      console.error("getclassificationsbyid error " + error)
    }
  }


  /* ***************************
   *  Get all classification data
   * ************************** */
  async function getClassifications() {
    try {
      const data = await pool.query("SELECT * FROM public.classification")
      return data.rows
    } catch (error) {
      console.error("getclassifications error " + error)
    }
  }


  async function getInventoryByClassificationId(classification_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i  
        JOIN public.classification AS c
        ON i.classification_id = c.classification_id
        WHERE i.classification_id = $1`,
        [classification_id]
      )
      return data.rows
    } catch (error) {
  }
}

  async function buildByClassificationId(req, res, next) {
    const classification_id = req.params.classificationId
    const data = await getInventoryByClassificationId(classification_id)
    const nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid: await utilities.buildClassificationGrid(data),
    })
  }



  const showDetail = async (req, res) => {
    try {
      const id = req.params.id;
      const vehicle = await Inventory.getInventoryByClassificationId(id);
      
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

  
  module.exports = {getClassifications, getInventoryByClassificationId, buildByClassificationId, invCont, showDetail}
