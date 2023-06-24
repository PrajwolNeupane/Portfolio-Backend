import checkKey from '../middleware/checkKey.js'
import express from 'express'
import Skill from '../model/SkillModel.js';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import multer from 'multer';
import { initializeApp } from "firebase/app";
import config from "../config/firebase.config.js"
import * as dotenv from 'dotenv';
dotenv.config()


const router = express.Router();
const storage = getStorage(initializeApp(config.firebaseConfig),process.env.STORAGE_URL);
const upload = multer().single('image');


router.get("/", checkKey, async (req, res) => {
    try {
        let data = await Skill.find().select("-__v");
        res.send(data);
    } catch (e) {
        res.send(e);
    }
})

router.post("/", [checkKey, upload], async (req, res) => {

    const storage = getStorage();
    var photoURL
    try {
        const fileRef = ref(storage, Date.now() + "-Skill-" + Math.round(Math.random() * 10) + '.png');
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = await uploadBytesResumable(fileRef, req?.file.buffer, metadata);
        photoURL = await getDownloadURL(snapshot.ref);
    }
    catch (e) {
        console.log(`Error on Image ${e}`)
    }
    if (photoURL) {
        let skill = new Skill({
            name: req.body.name,
            image: photoURL,
            type: req.body.type,
            description: req.body.description,
        });
        try {
            skill = await skill.save();
            res.send({ hello: "2" });

        } catch (e) {
            res.send({ message: e });
        }
    }
});


export default router;