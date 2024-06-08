
"use client";
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    title: 'Daycare',
    description: 'Safe and fun daycare for your pets.',
    link: '/services/daycare',
    image: '/daycare.jpg'
  },
  {
    title: 'Training',
    description: 'Professional training for your pets.',
    link: '/services/training',
    image: '/training.jpg'
  },
  {
    title: 'Adoption',
    description: 'Connect with pets in need of loving homes.',
    link: '#',
    image: '/adoption.jpg'
  },
  {
    title: 'Veterinary',
    description: 'Quality healthcare for your pets.',
    link: '/services/veterinary',
    image: '/veterinary.jpg'
  }
];



const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function FeatureSlider() {
  return (
    <div className="bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">Explore Services</h2>
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={2000}
          infinite={true}
          showDots={true}
          arrows={true}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {features.map((feature, index) => (
            <div key={index} className="p-4 mb-6">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
              <div className="relative w-full h-48">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  <div className="mt-3">
                    <Link href={feature.link} passHref className="text-indigo-600 hover:text-indigo-900 font-medium">
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
