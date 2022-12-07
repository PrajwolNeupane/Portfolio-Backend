import checkKey from '../middleware/checkKey.js'
import express from 'express'
import Skill from '../model/SkillModel.js';

const router = express.Router();


router.get("/", checkKey, async (req, res) => {
    try {
        let data = await Skill.find().select("-__v");
        res.send(data);
    } catch (e) {
        res.send(e);
    }
})

router.post("/", checkKey, async (req, res) => {


    let skill = new Skill({
        name: req.body.name,
        image: image_name,
        type: req.body.type,
        description: req.body.description
    });

    try {

        skill = await skill.save();
        res.send(skill);

    } catch (e) {
        res.send({ message: e });
    }

});


export default router;