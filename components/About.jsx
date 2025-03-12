import Link from "next/link";
import { motion } from "framer-motion";

import { socials } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import EmailIcon from "./../public/assets/icons/email.svg";

function About() {
  return (
    <section
      className="md:my-36 md:w-2/3 w-full h-full xl:ml-36 lg:ml-12 p-8 md:mt-[40svh] xl:mt-[150px]"
      id="about"
    >
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="text-gray-300 sectionSubText">Introduction</p>
        <h2 className="text-white sectionHeadText">Overview.</h2>
      </motion.div>
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-4 dark:text-ctnSecondaryDark text-gray-300 text-[17px] w-full leading-[30px] flex flex-col justify-between gap-6"
      >
        <div>
          Hello! I am Shikhar Singh, a passionate 21-year-old Computer Science and Engineering student with a strong
          foundation in coding. With expertise in the MERN stack, TypeScript, and Next.js, I have successfully
          developed and deployed numerous projects, demonstrating both technical proficiency and innovative
          problem-solving skills. My knowledge extends to fundamental data structures and algorithms,
          making me well-versed in web development.
          <br className="hidden sm:block" />
          Let&apos;s collaborate to bring your ideas to life!
        </div>
        <div className="break-words w-fit">
          <Link
            href="mailto:shikharsingh22803@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="flex flex-wrap w-full gap-2 transition-all duration-100 ease-in hover:text-primary md:items-center md:flex-row word-break hover:-translate-y-2"
          >
            <EmailIcon className="w-[30px] h-[30px]" />
            shikharsingh22803@gmail.com
          </Link>
        </div>
        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <Link
              href={social.link}
              target="_blank"
              key={social.id}
              className="w-8 h-8 transition-all duration-100 ease-in cursor-pointer hover:-translate-y-2"
            >
              {social.icon}
            </Link>
          ))}
        </div>
        {/* ✅ FIXED RESUME LINK ✅ */}
        <Link
          href="/document/Shikhar_Singh_-_Software_Engineer.pdf"
          target="_blank"
          rel="noreferrer"
          className="w-fit"
        >
          <div className="relative py-2 overflow-hidden text-white rounded-md cursor-pointer btn w-fit bg-tertiary px-7">
            <div className="py-2 text-white original bg-primary px-7">
              Resume
            </div>
            <div className="letters">
              <span>R</span>
              <span>e</span>
              <span>s</span>
              <span>u</span>
              <span>m</span>
              <span>e</span>
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}

export default About;
