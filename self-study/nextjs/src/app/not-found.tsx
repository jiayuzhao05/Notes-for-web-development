import React from "react";

export default function NotFound() {
  return (
    <>
      {/* This is an example component */}
      <div className="screen w-screen flex items-center not-found">
        <div className="container flex flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md flex flex-col gap-6">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.
            </p>
            
            <Link href="/" className="px-4 text-center inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
              back to homepage
            </button>
          </div>
          <div className="max-w-lg">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2395 1800"
              width="400"
            >
              <defs>
                <style>.cls-1{fill:#...</style>}
              </defs>
              {/* SVG 内容 */}
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}