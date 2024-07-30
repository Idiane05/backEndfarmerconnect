import foodModel from '../models/foodModel.js';
import fs from 'fs';


//create food
export const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded", success: false });
    }
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });
    try {
        await food.save();
        res.status(200).json({ message: 'food saved successfully', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error", success: false });
    }
};

// list of food
export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({message:`food successfully listed`, success:true, data:foods});
    } catch (error) {
        res.status(500).json({ message: "error", status:false});
    }
};

//get food by id

export const getFoodById = async (req, res) => {
    try {
        const foodId = req.params.id; // Get ID from URL parameter
        const food = await foodModel.findById(foodId); // Pass the ID directly
        if (!food) {
            return res.status(404).json({ message: 'Food item not found', success: false });
        }
        res.status(200).json({ message: 'Food successfully retrieved', success: true, data: food });
    } catch (error) {
        console.error('Error retrieving food:', error);
        res.status(500).json({ message: 'Error retrieving food', success: false });
    }
};


// delete food
export const removeFood = async (req, res) => {
    try {
      const foodId = req.params.id; // Get ID from URL parameter
      const food = await foodModel.findById(foodId);
      if (!food) {
        return res.status(404).json({ message: 'Food item not found', success: false });
      }
  
      // Deleting the associated image file
      const imagePath = `uploads/${food.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(`Error deleting file: ${err.message}`);
        } else {
          console.log('File deleted successfully');
        }
      });
  
      await foodModel.findByIdAndDelete(foodId);
      res.status(200).json({ message: 'Food successfully removed', success: true, data: food });
    } catch (error) {
      console.error('Error deleting food:', error);
      res.status(500).json({ message: 'Error deleting food', success: false });
    }
  };
