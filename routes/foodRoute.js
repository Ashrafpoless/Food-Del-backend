import express from 'express';
import foodController from '../controllers/foodController.js';
import multer from 'multer';
import path from "path";

const foodRouter = express.Router();

// Image Storage Engine

/*const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});*/


const storage = multer.diskStorage({
    destination:  (req, file, cb)=> {
      cb(null, "uploads"); // ✅ Vercel allows writing here
    },
    filename: (req, file, cb)=> {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storage });

foodRouter.post('/add', upload.single('image'), foodController.addFood);
foodRouter.get('/list', foodController.getAllFoodList);
foodRouter.post('/remove', foodController.removeFood);
// foodRouter.delete("/:id", foodController.removeFood)

export default foodRouter;
