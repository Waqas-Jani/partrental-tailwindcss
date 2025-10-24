/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Counter from "./Counter";

const OrgariumCounter = ({ data }: any) => {
  const renderCounter = (val: any) => {
    const regx = /^\d+$/;

    if (regx.test(val.num)) {
      return <Counter end={Number(val.num)} decimals={0} />;
    } else {
      return val.num;
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {data?.map((item: any, index: number) => (
        <div 
          key={index}
          className="group relative rounded-2xl p-6 lg:p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)'
          }}
        >
          {/* Background decoration */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(236, 32, 38, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)'
            }}
          ></div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Icon/Number container */}
            <div className="mb-4 relative">
              <div 
                className="inline-flex items-center justify-center p-5 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-primary to-red-400"
               
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  {renderCounter(item)}+
                </h3>
              </div>
              
              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500 delay-100"></div>
            </div>
            
            {/* Title */}
            <p className="text-gray-700 font-medium text-sm lg:text-base group-hover:text-gray-900 transition-colors duration-300">
              {item.title}
            </p>
            
            {/* Progress bar animation */}
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                style={{
                  background: 'linear-gradient(90deg, #ec2026 0%, #dc2626 100%)'
                }}
              ></div>
            </div>
          </div>
          
          {/* Hover effect border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-primary group-hover:to-red-400 transition-all duration-300"></div>
        </div>
      ))}
    </div>
  );
};
export default OrgariumCounter;

export const OrgariumCounter2 = () => (
  <div className="row">
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="single-counter-item mb-40">
        <div className="text">
          <h2 className="number">
            <Counter end={3652} decimals={0} />+
          </h2>
          <p>Saticfied Clients</p>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="single-counter-item mb-40">
        <div className="text">
          <h2 className="number">
            <Counter end={896} decimals={0} />+
          </h2>
          <p>Saticfied Clients</p>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="single-counter-item mb-40">
        <div className="text">
          <h2 className="number">
            <Counter end={945} decimals={0} />+
          </h2>
          <p>Saticfied Clients</p>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="single-counter-item mb-40">
        <div className="text">
          <h2 className="number">
            <Counter end={565} decimals={0} />+
          </h2>
          <p>Saticfied Clients</p>
        </div>
      </div>
    </div>
  </div>
);
