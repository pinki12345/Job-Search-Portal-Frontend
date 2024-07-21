import React from "react";
import styles from "./JobDescription.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const JobDescription = () => {
  const token = useSelector((state) => state.token);
  const jobDetailsData = useSelector((state) => state.jobDetailsData);
  console.log("jobDetailsData", jobDetailsData);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/jobform");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleEditClick = () => {
    navigate("/jobform", { state: { jobDetails: jobDetailsData } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>{jobDetailsData.name}</div>

      <div className={styles.card}>
        <div className={styles.jobInfoHeader}>
          <div className={styles.timeStatus}>1w ago · Full Time</div>
          <div className={styles.smallBox}>
            <h2 className={styles.jobTitle}>{jobDetailsData.position}</h2>
            {token ? (
              <div className={styles.button}>
                <button className={styles.editButton} onClick={handleBack}>
                  Back
                </button>
                <button className={styles.editButton} onClick={handleClick}>
                  Add Job
                </button>
                <button className={styles.editButton} onClick={handleEditClick}>
                  Edit Job
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.location}>
            {jobDetailsData.location} | India
          </div>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span style={{ color: "#999999" }}>Salary</span> <br /> ₹
              {jobDetailsData.salary}
            </div>
            <div className={styles.metaItem}>
              <span style={{ color: "#999999" }}>Duration</span> <br /> 6 Months
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <h3>About company</h3>
          <p>{jobDetailsData.about}</p>
        </section>

        <section className={styles.section}>
          <h3>About the job/internship</h3>
          <p>{jobDetailsData.description}</p>
        </section>

        <section className={styles.section}>
          <h3>Skill(s) required</h3>
          <div className={styles.skills}>
            {jobDetailsData?.skills?.map((skill, index) => (
              <span key={index} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3>Additional Information</h3>
          <p>{jobDetailsData.information}</p>
        </section>
      </div>
    </div>
  );
};

export default JobDescription;
