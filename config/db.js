import mongoose from "mongoose";
const uri = `mongodb+srv://g14149662:admin@cluster0.yy540ds.mongodb.net/?appName=Cluster0`

export const dbConnection = async() => {
try {
   await mongoose.connect(uri).then(() => console.log("Mongodb is connected")).catch((error) => { console.log("Mongodb is not connected") })
    
} catch (error) {
    console.log(error.message)
}

}