const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const {User} = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async(req, res)=> {
    const {path: tempUoload, originalname} = req.file;
    const {_id} = req.user;
    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;
    const resultUpload = path.join(avatarsDir, filename)
    

    await Jimp.read(tempUoload)
    .then((image) => {
        image.resize(250, 250);
        image.write(tempUoload);
    })
    .catch((err) => {
        return new Error(err.message);
    });

    
    await fs.rename(tempUoload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});
    res.json({
        avatarURL,
    })
}

module.exports = updateAvatar;
