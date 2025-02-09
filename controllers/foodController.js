import FoodModel from "../models/foodModel.js";
import fs from "fs"

// add food item
const foodController = {
    addFood : async(req, res)=>{
        try {
            let image_filename = `${req.file.filename}`
            const food = new FoodModel({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: image_filename,
                category: req.body.category
            })
            await food.save();  
            res.status(200).json({success: true, message: "food added"})
        } catch (error) {
            console.error(error)
            res.status(500).json({success: false, message: error.message})
        }
    },
    getAllFoodList: async (req,res) =>{
        try {
            const food = await FoodModel.find({});
            
            if (food.length > 0) {
                return res.status(200).json({success: true, data: food} );
            } else {
                return res
                    .status(404)
                    .json({ success: false, posts: 'No food found' });
            }

        } catch (error) {
            console.error(error)
            res.status(500).json({success: false, message: error.message})
        }
    },
    removeFood : async (req, res) =>{
        try {
            const food = await FoodModel.findById(req.params.id) // here body or params 

            fs.unlink(`uploads/${food.image}`, () =>{})

            await FoodModel.findByIdAndDelete(req.params.id)
            res.status(200).json({success: true, message: `This food has  deleted successfully`})
        } catch (error) {
            console.error(error)
            res.status(500).json({success: false, message: error.message})
        }
    },
// i make the delete function using ID from the params but he did it use the ID from the body
// and i use foodRouter.delete("/:id", foodController.removeFood)
// but he uses foodRouter.post("/remove", foodController.removeFood)


}

export default foodController 