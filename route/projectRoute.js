import checkKey from '../middleware/checkKey.js'
import express from 'express'
import Project from '../model/ProjectModel.js';

const router = express.Router();



router.get("/", async (req, res) => {
    try {
        const data = await Project.find().select('-__v');
        res.send(data);
    } catch (e) {
        res.send({ message: "Unable to get Data", });
    }
});

router.post("/", async (req, res) => {


    let project = new Project({
        name: req.body.name,
        link: req.body.link,
        image: req.body.image,
        description: req.body.description,
        tagline: req.body.tagline
    });

    try {

        project = await project.save();
        res.send(project);

    } catch (e) {
        res.send({ message: e });
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