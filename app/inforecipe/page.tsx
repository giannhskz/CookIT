import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Cake from '../../public/cake.jpg'

 const InfoRecipe = () => {
  return (
    <div className="bg-[url('../public/food.png')] h-screen  bg-cover bg-repeat-y ">
        <div className=' bg-black bg-opacity-70 h-full bg-cover'>

            <div className='flex justify-center items-center pt-6 '>
                <h2 className="backdrop-blur-sm bg-white/50   rounded-full  font-semibold text-dark  text-3xl  p-3" >
                    Recipe Information
                </h2>
            </div>

            <div className='flex justify-center  pt-4 w-full h-3/4 '>
                
                    <div className=' w-2/3 bg-white/95 border-2 rounded-lg border-[#fce4e4] shadow-lg m-12 overflow-y-auto p-3'>
                           <div className='grid grid-rows-5 grid-cols-3 gap-4 '>
                                <div className='row-span-2 col-span-1 rounded-xl m-0.5 overflow-hidden relative'>
                                    <Image src={Cake}
                                           alt={'No Recipe Photo Available'}
                                           fill
                                           className=''>
                                    </Image>
                                </div>

                                <div className='col-span-2 row-span-1 text-4xl font-semibold justify-self-center pt-8 '>
                                    Chocolate Cake
                                </div>

                                <div className='row-span-1 col-span-2  grid-rows-2'>
                                    <div>
                                        <div className='bg-green-200 rounded-xl p-1'> 
                                            <div className='flex p-1'>
                                                <p className='break-keep whitespace-nowrap'>
                                                    Included Incredients:
                                                </p>
                                                <div className='pl-2'>
                                                    flour 1kg | sugar 1/2kg | chocolate 500gr | chocolate 500gr | eggs 3 | baking powder 1  
                                                </div>
                                            </div>
                                        </div>

                                        <div className= 'bg-red-200 rounded-xl p-1 mt-2'> 
                                        <div className='flex p-1'>
                                                <div className='break keep whitespace-nowrap'>
                                                    Missing Inceridents:
                                                </div>
                                                <div className='pl-2'>
                                                    aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaa
                                                </div>
                                            </div> 
                                        </div>
                                   
                                    </div>
                                </div>

                                <div className=' row-span-3 col-span-3  justify-self-center'>
                                    <div>
                                    <ul className="steps steps-vertical">
                                        <li className="step ">Put all the Increadients on a bowl</li>
                                        <li className="step ">Turn the oven on 100 degrees</li>
                                        <li className="step">Mix them</li>
                                        <li className="step">Add water</li>
                                        <li className="step">Add flour</li>
                                        <li className="step">Let it cook for 45'</li>
                                        <li className="step">Melt the chocolate</li>
                                        <li className="step">Cover the cake and serve</li>
                                        <li className="step">Cover the cake and serve</li>
                                        <li className="step">Cover the cake and serve</li>
                                    </ul>
                                    </div>
                                </div>

                           </div> 
                    </div>
                    
                    
            </div>
            
            <div className='flex justify-center mt-4'>
                    <a  className="group relative inline-block overflow-hidden border rounded-xl backdrop-blur-sm bg-black/20 border-red-200 px-8 py-3 focus:outline-none focus:ring"  href="/download">
                    <span className="absolute inset-y-0 left-0 w-[2px] bg-red-200 transition-all group-hover:w-full group-active:bg-red-100"></span>
                    <span className="relative text-2xl font-semibold text-red-200 transition-colors group-hover:text-black group-hover:font-semibold">
                      COOK IT
                    </span>
                    </a>
             </div>

        </div>
    </div>
  )
}

export default InfoRecipe