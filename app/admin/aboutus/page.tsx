import React from 'react';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      <div className="max-w-lg mx-auto">
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu
          vehicula ante. Integer eget nisi vel libero tempus faucibus. Nullam nec
          elit metus. Sed suscipit viverra massa, eu suscipit ipsum congue vel.
          Duis vehicula justo magna, in vehicula sapien mollis vitae. Nam ut
          fringilla lorem. Vivamus vel velit nec magna fermentum lacinia. Ut
          accumsan ullamcorper ex, at pellentesque justo efficitur sit amet.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/Auth/signIn">
          <div className="text-blue-500 hover:underline">Back to Home</div>
        </Link>
      </div>
    </div>
  );
}
