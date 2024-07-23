import React, { useState, useEffect } from "react";
import styles from "./JobFinder.module.css";
import searchIcon from "../assets/searchIcon.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllJobData,
  fetchSearchingData,
  fetchJobDetails,
  setSearchData,
  fetchSkillData,
} from "../actions/index";
import empNo from "../assets/empNo.png";
import flag from "../assets/flag.png";
import rupee from "../assets/rupee.png";
import axios from "axios";

const JobFinder = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchData = useSelector((state) => state.searchData);
  console.log("searchData", searchData);
  const [inputData, setInputData] = useState("");
  const token = useSelector((state) => state.token);
  // const [skillclick, setSkillClick] = useState(false);

  useEffect(() => {
    if (inputData.trim() !== "") {
      dispatch(fetchSearchingData(inputData));
    }
  }, [dispatch, inputData]);

  useEffect(() => {
    dispatch(fetchAllJobData());
  }, []);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  console.log("selectedSkills:", selectedSkills);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    // setSkillClick(!skillclick);
  };

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setDropdownVisible(false);
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleNavigate = (id) => {
    console.log("handleNavigate", id);
    dispatch(fetchJobDetails(id));
    navigate("/jobdescription");
  };

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleFilter = () => {
    try {
      if (selectedSkills.length > 0) {
        const myArray = selectedSkills;
        const result = myArray.join(",");
        console.log("result: " + result);
        dispatch(fetchSkillData(result));
      }
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

  const handleClear = () => {
    setInputData("");
    setSelectedSkills([]);
    dispatch(fetchAllJobData());
  };

  // Extract and deduplicate skills from searchData
  const uniqueSkills = Array.from(
    new Set(
      searchData.flatMap((item) =>
        item.skills.flatMap((skill) => skill.split(","))
      )
    )
  );

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://job-search-portal-backend.onrender.com/api/v1/deleteJob/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.jobFinderConatiner}>
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <img src={searchIcon} alt="Search" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Type any job title"
            className={styles.searchInput}
            name="searchdata"
            value={inputData}
            onChange={handleChange}
          />
        </div>
        <div className={styles.filters}>
          <div className={styles.filtersContainer}>
            <button
              className={`${styles.skillsButton} ${
                dropdownVisible ? styles.active : ""
              }`}
              onClick={toggleDropdown}
            >
              Skills <span className={styles.dropdownArrow}>&#x25BC;</span>
            </button>
            {dropdownVisible && (
              <div className={styles.dropdownMenu}>
                {uniqueSkills.map((skill) => (
                  <div
                    className={styles.dropdownItem}
                    key={skill}
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
            <div className={styles.selectedSkills}>
              {selectedSkills.map((skill) => (
                <div className={styles.skillTag} key={skill}>
                  <p>{skill}</p>
                  <button
                    onClick={() => removeSkill(skill)}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filtersbtn}>
            <button
              className={styles.applyButton}
              onClick={handleFilter}
              disabled={selectedSkills.length === 0}
            >
              Apply Filter
            </button>
            <button
              className={styles.clearButton}
              onClick={handleClear}
              disabled={selectedSkills.length === 0}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {/* card */}
      <div className={styles.cardJobContainer}>
        {searchData && searchData.length > 0 ? (
          searchData.map((item) => (
            <div className={styles.card} key={item._id}>
              <div className={styles.cardContainer}>
                <div>
                  <img
                    src={item.logo}
                    alt="Company Logo"
                    className={styles.logo}
                  />
                </div>
                <div className={styles.rightBox}>
                  <div>
                    <div className={styles.header}>
                      <h3 className={styles.title}>{item.position}</h3>
                      <div className={styles.meta}>
                        <span className={styles.metaItem}>
                          <img src={empNo} />
                          <p> 500-10k</p>
                        </span>
                        <span className={styles.metaItem}>
                          <img src={rupee} />
                          <p> {item.salary}</p>
                        </span>
                        <span className={styles.metaItem}>
                          <img src={flag} />
                          <p>{item.location}</p>
                        </span>
                      </div>
                    </div>
                    <div className={styles.footStatus}>
                      <span className={styles.status}>
                        {/* {item.remote ? "Remote" : "Office"} */}
                        {item.remote}
                      </span>
                      <span className={styles.status}>{item.jobType}</span>
                    </div>
                  </div>
                  <div className={styles.rightsider}>
                    <div className={styles.tags}>
                      {item.skills?.map((skill, index) => (
                        <span className={styles.tag} key={index}>
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className={styles.footer}>
                      {token ? (
                        <div className={styles.Deletebutton}>
                          <button
                            className={styles.button}
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                          <button
                            className={styles.button}
                            onClick={() => handleNavigate(item._id)}
                          >
                            View details
                          </button>
                        </div>
                      ) : (
                        <button
                          className={styles.button}
                          onClick={() => handleNavigate(item._id)}
                        >
                          View details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className={styles.rightsider}>
                <div className={styles.tags}>
                  {item.skills?.map((skill, index) => (
                    <span className={styles.tag} key={index}>
                      {skill}
                    </span>
                  ))}
                </div>
                <div className={styles.footer}>
                  {token ? (
                    <div className={styles.Deletebutton}>
                      <button
                        className={styles.button}
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => handleNavigate(item._id)}
                      >
                        View details
                      </button>
                    </div>
                  ) : (
                    <button
                      className={styles.button}
                      onClick={() => handleNavigate(item._id)}
                    >
                      View details
                    </button>
                  )}
                </div>
              </div> */}
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

    </div>
  );
};

export default JobFinder;
