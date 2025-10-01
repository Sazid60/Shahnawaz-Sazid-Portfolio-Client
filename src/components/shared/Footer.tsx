import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 px-4">

        <p className="text-sm text-center md:text-left ">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">Shahnawaz Sazid</span>. All
          rights reserved.
        </p>

    
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Sazid60"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-violet-600 transition"
          >
            <Github size={22} />
          </a>

          <a
            href="https://www.linkedin.com/in/shahnawaz-sazid/"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-violet-600 transition"
          >
            <Linkedin size={22} />
          </a>

          <a
            href="https://wa.me/8801639768727"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-violet-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.77 11.77 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.15 1.6 5.96L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.18-1.24-6.17-3.48-8.52zM12 21.54c-2.04 0-4.02-.54-5.76-1.58l-.41-.24-3.7.97.99-3.61-.25-.42A9.54 9.54 0 0 1 2.46 12c0-5.25 4.29-9.54 9.54-9.54 2.55 0 4.95.99 6.76 2.8a9.52 9.52 0 0 1 2.8 6.76c0 5.25-4.29 9.52-9.56 9.52zm5.2-7.14c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.9 1.12-.16.19-.34.21-.63.07-.29-.15-1.24-.46-2.36-1.47-.87-.78-1.45-1.74-1.62-2.03-.16-.29-.02-.45.12-.6.12-.12.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.49-.64-.5h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.03 2.84 1.17 3.04c.15.19 2.03 3.1 4.91 4.35.69.3 1.22.48 1.63.61.68.22 1.29.19 1.78.12.54-.08 1.7-.69 1.94-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.34z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
