function isOwner() {
    if (house.owner.toString() !== req.user.userId) {
        return res.status(403).json({ error: "Forbidden: you are not the owner" });
    }
}

module.exports = { isOwner };