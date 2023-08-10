import React from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Work.scss";
import { useState } from "react";
import { useEffect } from "react";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const [works, setWorks] = useState([]);
  const [filterWorks, setFilterWorks] = useState([]);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [workPage, setWorkPage] = useState(8);

  // function
  const paginate = (pageNumber) => {
    setAnimateCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      setCurrentPage(pageNumber);
    }, 500);
  };

  // Get work item per page
  const indexLast = currentPage * workPage;
  const indexFirst = indexLast - workPage;
  const currentWorks = filterWorks.slice(indexFirst, indexLast);

  // Get total pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filterWorks.length / workPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const query = '*[_type == "works"]';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWorks(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setCurrentPage(1);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterWorks(works);
      } else setFilterWorks(works.filter((work) => work.tags.includes(item)));
    }, 500);
  };

  return (
    <>
      <h2 className='head-text'>
        My Project
        <span> Portfolio </span>Section
      </h2>
      <div className='app__work-filter'>
        {["Web App", "Simple Game", "JavaScript", "React", "All"].map(
          (item, i) => (
            <div
              key={i}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.3, delayChildren: 0.3 }}
        className='app__work-portfolio'
      >
        {currentWorks.map((work, i) => (
          <div className='app__work-item app__flex' key={i}>
            <div className='app__work-img app__flex'>
              <img src={urlFor(work.imgUrl)} alt={work.name} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className='app__work-hover app__flex'
              >
                <a href={work.projectLink} target='_blank' rel='norefferer'>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className='app__flex'
                  >
                    <AiFillEye />
                  </motion.div>
                </a>

                <a href={work.codeLink} target='_blank' rel='norefferer'>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className='app__flex'
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className='app__work-content app__flex'>
              <h4 className='bold-text'>{work.title}</h4>
              <p className='p-text' style={{ marginTop: 10 }}>
                {work.description.substring(0, 20) + " ..."}
              </p>
              <div className='app__work-tag app__flex'>
                <p className='p-text'>{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <ul className='app__work-pagination'>
        {pageNumbers.map((number, i) => {
          if (filterWorks.length > 8) {
            return (
              <li
                className={`app__work-pagination-list app__flex p-text ${
                  currentPage === number ? "item-active" : ""
                }`}
                key={i}
                onClick={() => paginate(number)}
              >
                {number}
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
