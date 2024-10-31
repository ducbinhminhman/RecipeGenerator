import React from "react";
import RecipeCard from "./RecipeCard";
 
const About = () => {
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
        {/* Component */}
        <div className="grid gap-12 sm:gap-20 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center rounded-md bg-gray-300 px-3 py-1">
              <div className="mr-1 h-2 w-2 rounded-full bg-black"></div>
              <p className="text-sm">Available for work</p>
            </div>
            <p className="text-sm text-gray-500 sm:text-xl">
              Developer &amp; UX Specialist
            </p>
            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:mb-8">
              Jonathan Smith
            </h1>
            <p className="text-sm text-gray-500 sm:text-xl">
              Consectetur adipiscing elit duis tristique sollicitudin nibh.
              Augue mauris augue neque gravida in fermentum. Sapien pellentesque
              habitant morbi tristique pellentesque.
            </p>
            {/* Divider */}
            <div className="mb-8 mt-8 h-px w-full bg-black"></div>
            <div className="mb-6 flex flex-col gap-2 text-sm text-gray-500 sm:text-base lg:mb-8">
              <p>
                <strong>2020: </strong>Site of the year in Awwwards.com
              </p>
              <p>
                <strong>2020: </strong>Site of the year in Awwwards.com
              </p>
            </div>
            {/* Link */}
            <a
              href="#"
              className="mb-6 flex items-center gap-2.5 text-center text-sm font-bold uppercase md:mb-10 lg:mb-12"
            >
              <p>All Achievements</p>
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b1465d46adaf3f26099edf_arrow.svg"
                alt=""
                className="inline-block"
              />
            </a>
            {/* Buttons */}
            <div className="flex flex-col gap-4 font-semibold sm:flex-row">
              <a
                href="#"
                className="flex items-center gap-4 rounded-md bg-black px-6 py-3 text-white"
              >
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b147043fe6ab404e65635e_Envelope.svg"
                  alt=""
                  className="inline-block"
                />
                <p>Email Me</p>
              </a>
              <a
                href="#"
                className="flex gap-4 rounded-md border border-solid border-black px-6 py-3"
              >
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b14704c8616ad7ba080fe0_Note.svg"
                  alt=""
                  className="inline-block"
                />
                <p>Resume</p>
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="min-h-[530px] overflow-hidden rounded-md bg-gray-100">
            <RecipeCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
