import React from 'react'
import Image from 'next/image'
import Cake from '../../public/cake.jpg'
import Link from 'next/link'


const RecipeList = () => {
  return (

    <div className="bg-[url('../public/food.png')] h-screen  bg-cover ">
        <div className=' bg-black bg-opacity-70 h-screen bg-cover'>

            <div className='flex justify-center items-center pt-6'>
                <h2 className="backdrop-blur-sm bg-white/50   rounded-full  font-semibold text-dark  text-3xl  p-3" >
                    Recipes List
                </h2>
            </div>
            <div className='flex justify-center h-full pt-4 w-full'>
                <div className='h-2/3 w-2/3 bg-white/95 border-2 rounded-lg border-[#fce4e4] shadow-lg m-12 overflow-y-auto '>
                <Link href={'/inforecipe'}>
                    <div className='border-y-2 shadow-md rounded-xl   mx-2 my-2   hover:scale-95 easy-in duration-500' >
                        
                        <div className='grid grid-cols-5 gap-6 place-content-strech h-full w-full '>

                            <div className='col-span-1 rounded-xl m-0.5 overflow-hidden relative   '
                                 >
                                <Image src={Cake}
                                       alt={'No Recipe Photo Available'}
                                       fill
                                       className=''>
                                </Image>
                            </div>

                            <div className='col-span-4  m-3'>
                                <div className='flex justify-center font-semibold text-2xl  pt-2'>
                                    Chocolate Cake
                                </div>  

                                 <div className='flex justify-around'>
                                                                  
                                    <div className='pt-8 text-lg font-'>
                                        Desert
                                    </div>

                                    <div className='pt-8 flex gap-2 text-lg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        40'
                                    </div>
                                 </div>

                                 <div className='w-full mt-12 bg-red-400 rounded-lg p-1'>
                                    Missing Increadients: -
                                 </div>

                            </div>

                        </div>
                    </div>
                    </Link>
                    <div className='border-y-2 shadow-md rounded-xl   mx-2 my-2   hover:scale-95 easy-in duration-500'>
                        
                        <div className='grid grid-cols-5 gap-6 place-content-strech h-full w-full '>

                            <div className='col-span-1 rounded-xl m-0.5 overflow-hidden relative   '
                                 >
                                <Image src={Cake}
                                       alt={'No Recipe Photo Available'}
                                       fill
                                       className=''>
                                </Image>
                            </div>

                            <div className='col-span-4  m-3'>
                                <div className='flex justify-center font-semibold text-2xl  pt-2'>
                                    Chocolate Cake
                                </div>  

                                 <div className='flex justify-around'>
                                                                  
                                    <div className='pt-8 text-lg font-'>
                                        Desert
                                    </div>

                                    <div className='pt-8 flex gap-2 text-lg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        40'
                                    </div>
                                 </div>

                                 <div className='w-full mt-12 bg-red-400 rounded-lg p-1'>
                                    Missing Increadients: -
                                 </div>

                            </div>

                        </div>
                    </div>
                    <div className='border-y-2 shadow-md rounded-xl   mx-2 my-2   hover:scale-95 easy-in duration-500'>
                        
                        <div className='grid grid-cols-5 gap-6 place-content-strech h-full w-full '>

                            <div className='col-span-1 rounded-xl m-0.5 overflow-hidden relative   '
                                 >
                                <Image src={Cake}
                                       alt={'No Recipe Photo Available'}
                                       fill
                                       className=''>
                                </Image>
                            </div>

                            <div className='col-span-4  m-3'>
                                <div className='flex justify-center font-semibold text-2xl  pt-2'>
                                    Chocolate Cake
                                </div>  

                                 <div className='flex justify-around'>
                                                                  
                                    <div className='pt-8 text-lg font-'>
                                        Desert
                                    </div>

                                    <div className='pt-8 flex gap-2 text-lg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        40'
                                    </div>
                                 </div>

                                 <div className='w-full mt-12 bg-red-400 rounded-lg p-1'>
                                    Missing Increadients: -
                                 </div>

                            </div>

                        </div>
                    </div>

                    <div className='border-2 rounded-xl  h-1/4 m-2 p-2  '>
                            
                    </div>
                    


                </div>
            </div>
        </div>
    </div>
  )
}

export default RecipeList