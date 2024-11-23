import mongoose from 'mongoose';  
  
const PracticalSchema=mongoose.Schema({  
    Subject:{  
        type:mongoose.Schema.Types.ObjectId,  
        ref:'Subject',  
        required:true,  
    },  
    email:{  
        type:String,  
        required:true  
    },  
    Practical:{  
        type:String,  
        required:true  
    },  
    Enroll:[{  
        type:mongoose.Schema.Types.ObjectId,  
        ref:'Enroll'  
    }]  
})  
const PracitcalModel=mongoose.model("Practical",PracticalSchema);  
  
export default  PracitcalModel; 