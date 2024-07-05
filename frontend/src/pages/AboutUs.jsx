import React from "react";
import Header from "../components/Header"

const AboutUs = () => {
  return (
    <div>

    
    <Header />
    <div className="min-h-screen flex items-center justify-center bg-black py-8">
   
      <div className="max-w-5xl mx-auto p-6 bg-cyan-950 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-cyan-300 mb-8">
          About Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center bg-black rounded-lg p-4 shadow-lg">
            <img
              src="/photo.jpg"
              alt="Deepak"
              className="w-32 h-32 rounded-full mb-4 border-4 border-cyan-300"
            />
            <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
              Deepak
            </h2>
            <p className="text-lg text-cyan-200 mb-4 text-center">
              Competitive Programmer | 🛡️ LeetCode Knight | ⭐⭐⭐ CodeChef
              3-Star | 💻 MERN Stack Web Developer Passionate about solving
              complex problems efficiently and crafting seamless web
              experiences. As a competitive programmer, I thrive on challenges,
              holding the LeetCode Knight badge and achieving a 3-star rating on
              CodeChef. I love diving into algorithmic puzzles, optimizing
              solutions, and constantly sharpening my problem-solving skills. I
              specialize in MERN (MongoDB, Express.js, React.js, Node.js) stack
              development. I design and develop robust, scalable web
              applications with a keen eye on user experience and performance.
              Seeking opportunities to collaborate on exciting projects where I
              can leverage my skills to create impactful solutions. Let's
              connect and explore how we can innovate together!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://portfolio121-deep.netlify.app/"
                className="text-cyan-400 hover:text-cyan-600"
              >
                Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/deepak-arora-1a855b27a/"
                className="text-cyan-400 hover:text-cyan-600"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/AroraDeepak13"
                className="text-cyan-400 hover:text-cyan-600"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center bg-black rounded-lg p-4 shadow-lg">
            <img
              src="/SaranshPhoto.jpg"
              alt="Saransh"
              className="w-32 h-32 rounded-full mb-4 border-4 border-cyan-300"
            />
            <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
              Saransh
            </h2>
            <p className="text-lg text-cyan-200 mb-4 text-center">
              Driven by a passion for solving complex problems and creating
              seamless web experiences, I thrive on challenges and have earned a
              3-star rating on CodeChef. My journey in competitive programming
              involves diving into algorithmic puzzles, optimizing solutions,
              and continuously enhancing my problem-solving skills. Specializing
              in the MERN (MongoDB, Express.js, React.js, Node.js) stack, I
              focus on designing and developing robust, scalable web
              applications with a strong emphasis on user experience and
              performance. I am eager to collaborate on exciting projects where
              I can apply my skills to create impactful solutions. Let's connect
              and explore innovative opportunities together!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://saransh-portfolio-site.netlify.app"
                className="text-cyan-400 hover:text-cyan-600"
              >
                Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/saransh-goyal-215532244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="text-cyan-400 hover:text-cyan-600"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Saransh1804"
                className="text-cyan-400 hover:text-cyan-600"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
