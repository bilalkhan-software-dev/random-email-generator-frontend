const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-950/100 text-white w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-300 text-sm md:text-base">
              © 2025 Random Email Generator. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-2 text-center pb-2">
          <p className="text-gray-500 text-xs">Made with ❤️ by BK_QA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
