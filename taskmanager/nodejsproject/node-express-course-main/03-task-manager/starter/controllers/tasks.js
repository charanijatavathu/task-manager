const Task=require('../models/Task')
const asynwrapper=require('../middleware/async')
const {createCustomError}=require('../error/custom-error'

)
const getAllItems=asynwrapper(async (req,res)=>{
        const tasks= await Task.find({})
        res.status(200).json({tasks})
})
const createTasks=asynwrapper(async (req,res)=>{
        const task=await Task.create(req.body)
        res.status(201).json({task} )    
})
const getTask=asynwrapper(async (req,res)=>{
        const {id:taskID}=req.params
        const task=await Task.findOne({_id:taskID})
        res.status(200).json({task})
        if(!task){
            return next(createCustomError(`no task with id:${taskID}`,404))
            // return res.status(404).json({msg:"no task with that id"})
        } 
})
const updateTask=asynwrapper(async (req,res)=>{
        const {id:taskID}=req.params
        const task=await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true})
        res.status(200).json({task})
        if(!task){
            return next(createCustomError(`no task with id:${taskID}`,404))
        } 
})
const deleteTask=asynwrapper(async(req,res)=>{
        const {id:taskID}=req.params
        const task=await Task.findOneAndDelete({_id:taskID})
        // res.status(200).json({task})
        if(!task){
            return next(createCustomError(`no task with id:${taskID}`,404))
        } 
        res.status(200).json({task})
})

module.exports={
    getAllItems,createTasks,getTask,updateTask,deleteTask
}