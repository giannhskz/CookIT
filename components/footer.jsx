"use client";
import Image from "next/image";
import React from "react";

export const Footer = () => {
  
      return (
        <div>
            <div className="border-b-2">
            <div className="flex justify-center">
            <Image  src="/cookingLogo.png" width={70} height={70} />
            </div>
            <div className="flex justify-center">Made by Ioannis Kazas</div>
            </div>
        </div>
          
        
      )
  }
