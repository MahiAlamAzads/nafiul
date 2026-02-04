// import
const Houselist = require("../model/House.model");

async function uploadHouseController(req, res, next) {
    console.log(req.user);
    const { title, description, type, houseType, forWhom, price, location, address, images, status, contactNumber } = req.body;
    if (!title || !description || !type || !houseType || !forWhom) return res.status(400).json({ error: "All fields required" });

    const house = new Houselist({
        owner: req.user.userId,
        title,
        description,
        type,
        houseType,
        forWhom,
        price,
        location,
        address,
        images,
        status,
        contactNumber
    })

    // i should not forget to save
    await house.save();


    res.send({
        house: house,
        message: "House uploaded successfully"
    })
}

async function deleteHouseController(req, res) {
    try {
        const { id } = req.params;
        console.log(id);

        // here need to check if the user is the owner
        /*
          implement here
        */
        const house = await Houselist.findById(id);

        if (!house) {
            return res.status(404).json({ error: "House not found" });
        }

        // Check ownership
        if (house.owner.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Forbidden: you are not the owner" });
        }

        const deletedHouse = await Houselist.findByIdAndDelete(id);

        if (!deletedHouse) {
            return res.status(404).json({ error: "House not found" });
        }

        res.status(200).json({ message: "House deleted successfully", deletedHouse });
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
}
module.exports = { uploadHouseController, deleteHouseController };