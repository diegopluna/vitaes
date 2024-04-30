export const Features = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Key Features
          </h2>
          <p className=" text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Our resume builder offers a range of features to help you create the
            perfect resume.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Professional Templates</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose from a variety of professionally designed templates to
              showcase your skills and experience.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Customizable Sections</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Easily add, remove, and rearrange sections to highlight your
              strengths and achievements.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Real-Time Formatting</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              See your resume updates in real-time as you build it, ensuring a
              polished and professional look.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Cloud Save</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Save your resume in the cloud and access it from anywhere, on any
              device.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">User-Friendly Interface</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Our intuitive interface makes it easy to create a professional
              resume without any design skills.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Export and Share</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Easily export your resume in PDF or other formats, and share it
              with potential employers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
