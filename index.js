import express from 'express';
import DBConnection from './model/index.js';
import projectRoute from './route/projectRoute.js';
import skillRoute from './route/skillRoute.js';
import messageRoute from './route/messageRoute.js';
import userRoute from './route/userRoute.js';
import cors from 'cors';
import { initializeApp } from "firebase/app";
import * as url from 'url';
import { firebaseConfig } from './firebase/firebase-config.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*"
}));


app.use("/project", projectRoute);
app.use("/skill", skillRoute);
app.use("/message", messageRoute);
app.use("/user", userRoute);




app.listen(process.env.PORT || 8000, async () => {

    const app = initializeApp(firebaseConfig);
    console.log("Server Started");
    try {
        await DBConnection;
    } catch (e) {
        console.log(e);
    }
})