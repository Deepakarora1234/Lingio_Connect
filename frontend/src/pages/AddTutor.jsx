import React from 'react'
import Header from '../components/Header'
import Register_Animation from "../assets/Register_Animation.json"
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import app from "../../firebase.js"
import Lottie from 'lottie-react'
import { FcGoogle } from "react-icons/fc";
import { LuLanguages } from "react-icons/lu";
import {FormProvider , useForm} from "react-hook-form"
import {useMutation} from "react-query"
import * as apiClient from "../apiClient.js"



const AddTutor = () => {
   
    const formMethods = useForm();
    const {register, handleSubmit, formState: {errors}}  = formMethods
    const mutation = useMutation(apiClient.addTutor,{
        onSuccess:()=>{
            console.log("success")
        },
        onError:(error)=>{
            console.log(error)
        }
    })
    const onSubmit = handleSubmit(async (data) => {
        const file = data.image[0]; 
      

        console.log('File:', file);
        if (file) {
            const fileName = new Date().getTime() + '_' + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, '/' + fileName);
            
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            try {
                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case 'running':
                                    console.log('Upload is running');
                                    break;
                            }
                        },
                        (error) => {
                            console.error(error);
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) => {
                                    console.log('File available at', downloadURL);
                                  
                                    data.image = downloadURL;
                                    resolve();
                                })
                                .catch((error) => {
                                    console.error(error);
                                    reject(error);
                                });
                        }
                    );
                });
            } catch (error) {
                console.error('Error during upload:', error);
                return;
            }
        }
        
        mutation.mutate(data);
    });
    
    
    
    return (
        <div className='flex flex-col gap-6 '>
        <Header />
        <div className=' md:h-screen grid items-center grid-cols-1 lg:grid-cols-2 gap-4 max-[1024px]:gap-8 p-3 '>
        <div className='flex items-center justify-center p-3'>
       
         <Lottie  animationData={Register_Animation}/>
        </div>
        <FormProvider {...formMethods}>
        <form className='flex  justify-center' onSubmit={onSubmit}>
            <div className=' rounded-lg justify-center flex flex-col gap-3 py-7 px-20 max-[1174px]:px-10 max-[524px]:px-5 '>
            <div className='text-white text-3xl p-3 max-[524px]:p-2 mb-6 font-bold'>
                Join to Lingio Connect
            </div>
            <input className='bg-black text-xl border-2 text-white  rounded-lg border-cyan-950 pr-1 pl-2  py-2' placeholder='Enter full name' type='text' name='fullName' {...register('fullName', {required : "This is a required field"})} />
            {errors.fullName && (
                <span className='text-red-700 text-sm'>{errors.fullName.message}</span>
            )}
            <input className='bg-black p-2 text-xl border-2 text-white  rounded-lg border-cyan-950' placeholder='Enter email' type='email' name='email' {...register('email', {required : "This is a required field"})}  />
            {errors.email && (
                <span className='text-red-700 text-sm'>{errors.email.message}</span>
            )}
            <input className='bg-black p-2 text-xl text-white border-2  rounded-lg border-cyan-950' placeholder='Enter Mobile No.' type='text' name='mobileNumber' {...register('mobileNumber', {required : "This is a required field"})} />
            {errors.mobileNumber && (
                <span className='text-red-700 text-sm'>{errors.mobileNumber.message}</span>
            )}
            <input className='bg-black p-2 text-xl border-2 text-white  rounded-lg border-cyan-950' placeholder='Language' type='text' name='language' {...register('language', {required : "This is a required field"})}/>
            {errors.language && (
                <span className='text-red-700 text-sm'>{errors.language.message}</span>
            )}
            <input className='bg-black p-2 text-xl border-2 text-white  rounded-lg border-cyan-950' placeholder='Course Duration (in weeks)' type='number' name='courseDuration' {...register('courseDuration', {required : "This is a required field"})} />
            {errors.courseDuration && (
                <span className='text-red-700 text-sm'>{errors.courseDuration.message}</span>
            )}
            <input className='bg-black p-2 text-xl border-2 text-white  rounded-lg border-cyan-950' placeholder='Cost' type='number' name='cost' {...register('cost', {required : "This is a required field"})}/>
            {errors.cost && (
                <span className='text-red-700 text-sm'>{errors.cost.message}</span>

            )}
            <div className=' flex flex-col gap-3'>
                <label className='bg-black p-2 text-xl  text-white  '>
                    Description
                </label>
            <textarea className='bg-black p-2 text-xl border-2 text-white  rounded-lg border-cyan-950' rows = {3}  name='description' {...register('description', {required : "This is a required field"})} />
            {errors.description && (
                <span className='text-red-700 text-sm'>{errors.description.message}</span>
            )}

            </div>
            <div className=' flex flex-col gap-1 mt-3'>
                <label className='bg-black p-2 text-xl  text-white  '>
                    Upload profile picture
                </label>
            <input className='bg-black p-2 text-sm border-2 text-white  rounded-lg border-cyan-950'  type='file'   name='image' {...register('image')} />
            {errors.image && (
                <span className='text-red-700 text-sm'>{errors.image.message}</span>
            )}
            </div>
            <button className='hover:bg-black mt-4 bg-cyan-950 text-white font-bold text-xl p-3 border rounded-lg ' >Add Tutor</button>
          
    
    
            </div>
        </form>
        </FormProvider>
    
        </div>
          
        </div>
      )
}

export default AddTutor


