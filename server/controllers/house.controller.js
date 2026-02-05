// import
const Houselist = require("../model/House.model");

async function uploadHouseController(req, res, next) {
    console.log(req.user);
    const { ownerName,title, description, type, houseType, forWhom, price, location, address, images, status, contactNumber } = req.body;
    if (!title || !price || !location || !address || !ownerName || !description || !type || !houseType || !forWhom) return res.status(400).json({ error: "All fields required" });

    const house = new Houselist({
        owner: req.user.userId,
        ownerName,
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

async function updateHouseController(req, res) {
  try {
    const { id } = req.params;

    // following comment can be safely uncomment if scema is not throw mode
    // const allowedFields = ['title', 'description', 'type', 'houseType', 'forWhom', 'price', 'location', 'address', 'images', 'status', 'contactNumber', 'ownerName'];
    // const updates = {};

    // for (const key of Object.keys(req.body)) {
    //   if (allowedFields.includes(key)) {
    //     updates[key] = req.body[key];
    //   }else{
    //     return res.status(400).json({ error: "Invalid field" });
    //   }
    // }
  
    const house = await Houselist.findOneAndUpdate(
      { _id: id, owner: req.user.userId }, // ownership enforced in query
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!house) {
      return res.status(404).json({ error: "House not found or not authorized" });
    }

    res.status(200).json({
      message: "House updated successfully",
      house
    });

  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}

module.exports = { uploadHouseController, deleteHouseController, updateHouseController };