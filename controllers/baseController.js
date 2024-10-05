const utilities = require("../utilities")
const baseController = {}

baseController.buildHome = async function(req, res) {
  try {
    const nav = await utilities.getNav()
    res.render("index", { title: "Home", nav })
  } catch (error) {
    console.error(error)
    res.status(500).render("error", { title: "Error", message: "Internal Server Error", error })
  }
}
module.exports = baseController
