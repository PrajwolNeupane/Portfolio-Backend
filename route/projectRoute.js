import checkKey from '../middleware/checkKey.js'
import express from 'express'
import Project from '../model/ProjectModel.js';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import multer from 'multer';

const router = express.Router();
const upload = multer().single('image');

router.get("/", async (req, res) => {
    try {
        const data = await Project.find().select('-__v');
        res.send(data);
    } catch (e) {
        res.send({ message: "Unable to get Data", });
    }
});

router.post("/", [checkKey, upload], async (req, res) => {

    const storage = getStorage();
    var photoURL

    try {
        const fileRef = ref(storage, Date.now() + "-Project-" + Math.round(Math.random() * 10) + '.png');
        const snapshot = await uploadBytes(fileRef, req?.file.buffer);
        photoURL = await getDownloadURL(fileRef);
    }
    catch (e) {
        console.log(`Error on Image ${e}`)
    }

    if (photoURL) {
        let project = new Project({
            name: req.body.name,
            link: req.body.link,
            image: photoURL,
            description: req.body.description,
            tagline: req.body.tagline
        });

        try {

            project = await project.save();
            res.send(project);

        } catch (e) {
            res.send({ message: e });
        }
    }

});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (id) {
        try {
            const data = await Project.findById(id).select("-__v");
            res.send(data);
        } catch (e) {
            res.send({ message: 'Cannot find Project' });
        }
    } else {
        res.send({ message: "Id cannnot be empty" });
    }

})

export default router;