import React, { useState,useEffect } from "react";
import styles from "./JobForm.module.css";
import img from "../assets/WallpaperDog.png";
import { useSelector, useDispatch } from "react-redux";
import { setSearchData, setError } from "../actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const JobForm = () => {

  const location = useLocation();
  const jobDetails = location.state?.jobDetails;
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    position: "",
    salary: 0,
    location: "",
    jobType: "",
    remote: "",
    description: "",
    about: "",
    skills: [],
    information: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [error, setSkillError] = useState("");
  
  useEffect(() => {
    if (jobDetails) {
      setFormData({
       name: jobDetails.name || '',
       logo: jobDetails.logo || '',
        position: jobDetails.position || '',
        location: jobDetails.location || '',
        salary: jobDetails.salary || '',
        jobType: jobDetails.jobType || '',
        remote: jobDetails.remote || '',
        about: jobDetails.about || '',
        description: jobDetails.description || '',
        skills: jobDetails.skills || [],
        information: jobDetails.information || ''
      });
      setItems(jobDetails.skills || []);
    }
  }, [jobDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim() !== "") {
        setItems([...items, inputValue.trim()]);
        setFormData({
          ...formData,
          skills: [...formData.skills, inputValue.trim()],
        });
        setInputValue("");
        setSkillError("");
      }
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setItems(newItems);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.logo ||
      !formData.position ||
      !formData.salary ||
      !formData.location ||
      !formData.jobType ||
      !formData.remote ||
      !formData.description ||
      !formData.about ||
      !formData.skills.length ||
      !formData.information
    ) {
      alert("Please fill in all fields.");
      return;
    } else {
      setSkillError("");
      console.log(formData);

      try {
        let response;
        if (jobDetails) {
          response = await axios.patch(
            `http://localhost:3000/api/v1/updateJob/${jobDetails._id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          response = await axios.post(
            "http://localhost:3000/api/v1/createJob",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        if (
          response.data.success &&
          typeof response.data.message === "object" &&
          !Array.isArray(response.data.message)
        ) {
          dispatch(setSearchData(response.data.message));
          dispatch(setError(null));
        } else {
          console.error("Unexpected data format:", response.data);
          dispatch(setError("Unexpected data format"));
        }
       if(jobDetails){
        alert("Data updated successfully!!")
       }else{
        alert("Data Added successfully!!")
       }
        setItems([]);
        setFormData({
          name: "",
          logo: "",
          position: "",
          salary: 0,
          location: "",
          jobType: "",
          remote: "",
          description: "",
          about: "",
          skills: [],
          information: "",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        dispatch(setError("Error submitting form"));
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      logo: "",
      position: "",
      salary: 0,
      location: "",
      jobType: "",
      remote: "",
      description: "",
      about: "",
      skills: [],
      information: "",
    });
    setInputValue("");
    setItems([]);
    setSkillError("");
  };
  const handleBack = () => {
    navigate("/jobdescription");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Add job description</h2>
        <div className={styles.inputField}>
          <label>Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your company name here"
            required
          />
        </div>

        <div className={styles.inputField}>
          <label>Add logo URL</label>
          <input
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="Enter the link"
            required
          />
        </div>

        <div className={styles.inputField}>
          <label>Job position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter job position"
            required
          />
        </div>

        <div className={styles.inputField}>
          <label>Monthly salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter the amount in rupees"
            required
          />
        </div>

        <div className={styles.inputSelect}>
          <label>Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className={styles.inputSelect}>
          <label>Remote/office</label>
          <select
            name="remote"
            value={formData.remote}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Remote">Remote</option>
            <option value="Office">Office</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className={styles.inputField}>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>

        <div className={styles.inputTextarea}>
          <label>Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Type the job description"
            required
          />
        </div>

        <div className={styles.inputTextarea}>
          <label>About Company</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Type about your company"
            required
          />
        </div>

        <div className={styles.inputFieldList}>
          <label>Skills Required</label>
          <div className={styles.listofItem}>
            <input
              type="text"
              name="skills"
              value={inputValue}
              onChange={handleSkillChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter the must have skills"
            />
            {error && <p className={styles.error}>{error}</p>}
            <ul className={styles.skillsList}>
              {items.map((item, index) => (
                <li key={index}>
                  <p>{item}</p>
                  <button type="button" onClick={() => handleRemoveItem(index)}>
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.inputTextarea}>
          <label>Information</label>
          <textarea
            name="information"
            value={formData.information}
            onChange={handleChange}
            placeholder="Enter additional information"
            required
          />
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleReset}
          >
            Clear
          </button>
          {
            jobDetails ? <button type="submit" className={styles.addButton}>
            Save
          </button> : <button type="submit" className={styles.addButton}>
            + Add Job
          </button>
          }
        </div>
      </form>
      <div className={styles.imageContainer}>
        <p>Recruiter add job details here</p>
        <img src={img} alt="Decorative" className={styles.image} />
      </div>
    </div>
  );
};

export default JobForm;
