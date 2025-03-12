import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import DOMPurify from "dompurify";

import { slideIn } from "../utils/motion";

function Contact() {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);

    setForm({ ...form, [name]: sanitizedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("All fields are required.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        {
          from_name: DOMPurify.sanitize(form.name),
          to_name: "Shikhar Singh",
          from_email: DOMPurify.sanitize(form.email),
          to_email: "shikharsingh22803@gmail.com",
          message: DOMPurify.sanitize(form.message),
        },
        process.env.NEXT_PUBLIC_EMAILJS_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you for your message. I will get back to you soon.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <motion.div
      variants={slideIn("left", "tween", 0.2, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="w-full p-8 shadow-md xl:my-36 md:w-2/5 bg-bgSecondaryDark xl:ml-36 lg:ml-16 md:ml-10 rounded-2xl shadow-primary"
      id="contact"
    >
      <p className={"sectionSubText text-ctnSecondaryDark"}>Get in touch</p>
      <h3 className={"sectionHeadText text-ctnPrimaryDark"}>Contact.</h3>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 mt-8"
      >
        <label className="flex flex-col">
          <span className="mb-4 font-medium text-ctnPrimaryDark">
            Your Name
          </span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="What is your good name?"
            className="px-6 py-4 font-medium break-words border-none rounded-lg outline-none bg-bgPrimaryDark placeholder:text-ctnSecondaryDark text-ctnPrimaryDark placeholder:text-sm md:placeholder:text-lg h-fit placeholder:break-words"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-4 font-medium text-ctnPrimaryDark">
            Your email
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="What is your email address?"
            className="px-6 py-4 font-medium break-words border-none rounded-lg outline-none bg-bgPrimaryDark placeholder:text-ctnSecondaryDark text-ctnPrimaryDark placeholder:text-sm md:placeholder:text-lg h-fit placeholder:break-words"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-4 font-medium text-ctnPrimaryDark">
            Your Message
          </span>
          <textarea
            rows={4}
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="What do you want to say?"
            className="px-6 py-4 font-medium break-words border-none rounded-lg outline-none bg-bgPrimaryDark placeholder:text-ctnSecondaryDark text-ctnPrimaryDark placeholder:text-sm md:placeholder:text-lg h-fit placeholder:break-words"
          />
        </label>

        <button
          type="submit"
          className="px-8 py-3 font-bold text-white transition-all ease-in shadow-md outline-none bg-primary rounded-xl w-fit shadow-tertiary hover:shadow-primary hover:bg-tertiary duration-800"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </motion.div>
  );
}

export default Contact;
