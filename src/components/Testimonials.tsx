"use client";
import React from 'react';

const testimonials = [
  { name: 'Jane Doe', feedback: 'DogCare provided excellent daycare services for my dog. Highly recommend!', image: '/images/testimonial1.jpg' },
  { name: 'John Smith', feedback: 'The training services helped my dog become more obedient and well-behaved.', image: '/images/testimonial2.jpg' },
  { name: 'Sarah Lee', feedback: 'Adopting a dog through DogCare was a seamless and heartwarming experience.', image: '/images/testimonial3.jpg' },
  // Add more testimonials as needed
];

export default function Testimonials() {
  return (
    <div className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white mb-6">What Our Customers Say</h2>
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
              <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full object-cover mr-6" />
              <div>
                <p className="text-lg text-gray-800">{testimonial.feedback}</p>
                <p className="mt-2 text-gray-600 font-semibold">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
