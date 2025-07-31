import PlanYourJourney from '../../models/planYourJuorney.model.js'
import contactModel  from '../../models/contact.model.js'
import subscribeModel from '../../models/subscribe.model.js'
import suggestionComplainModel from '../../models/suggestionComplain.model.js'

export const getPlanYourJourney=async(req,res)=>{
    try{
       const Data=await PlanYourJourney.find().sort({createdAt:-1});
       if(!Data){
        return res.status(409).json({msg:"There is no Data for This", success:false})
       }
       return res.status(200).json({msg:"SuccessFully fetched", success:true, Data});
    }
    catch(error){
        console.log(`Get Plan Your Journey ${error}`);
        return res.status(500).json({msg:"Server Error", success:false});
    }
}
export const deletePlanYourJourney=async(req,res)=>{
    try{
        const {id}=req.params;
        const Data=await PlanYourJourney.findByIdAndDelete(id);
        if(!Data){
            return res.status(409).json({msg:"There is no Data for This", success:false})
        }
        return res.status(200).json({msg:"SuccessFully deleted", success:true, Data});
    }
    catch(error){
        console.log(`Delete Plan Your Journey ${error}`);
        return res.status(500).json({msg:"Server Error", success:false});
    }
}
export const getContact=async(req,res)=>{
    try{
       const Data=await contactModel.find().sort({createdAt:-1});
       if(!Data){
        return res.status(409).json({msg:"There is no Data for This", success:false})
       }
       return res.status(200).json({msg:"SuccessFully fetched", success:true, Data});
    }
    catch(error){
        console.log(`Get Plan Your Journey ${error}`);
        return res.status(500).json({msg:"Server Error", success:false});
    }
}

export const getSubscribe=async(req,res)=>{
    try{
       const Data=await subscribeModel.find().sort({createdAt:-1});
       if(!Data){
        return res.status(409).json({msg:"There is no Data for This", success:false})
       }
       return res.status(200).json({msg:"SuccessFully fetched", success:true, Data});
    }
    catch(error){
        console.log(`Get Plan Your Journey ${error}`);
        return res.status(500).json({msg:"Server Error", success:false});
    }
}
export const getSuggestions=async(req,res)=>{
    try{
       const Data=await suggestionComplainModel.find().sort({createdAt:-1});
       if(!Data){
        return res.status(409).json({msg:"There is no Data for This", success:false})
       }
       return res.status(200).json({msg:"SuccessFully fetched", success:true, Data});
    }
    catch(error){
        console.log(`Get Plan Your Journey ${error}`);
        return res.status(500).json({msg:"Server Error", success:false});
    }
}

