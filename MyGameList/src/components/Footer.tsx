export default function Footer() {
  return (
    <footer className="shadow bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              My Game List
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="https://github.com/OBsant"
                className="mr-4 hover:underline md:mr-6 "
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ocsantos/"
                className="hover:underline"
              >
                Linkedin
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://github.com/OBsant" className="hover:underline">
            Ocivaldo Bruno™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
