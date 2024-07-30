import contactModel from "../models/ContactModel.js";


export const createContact = async (req, res) => {
    try {
        const newContact = await contactModel.create(req.body);
        res.status(201).json( {success:true, message:"Contact sent successfully", data:newContact});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

export const getContacts = async(req,res)=>{
    try {
        let getContacts = await contactModel.find({});
        res.status(200).json({success:true, data:getContacts, message:"Contacts found"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

export const deleteContact = async(req,res)=>{
    try {
        const removeContact = await contactModel.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true, message:"Contact deleted successfully", data:removeContact});
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}