export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_TOKEN = "SET_TOKEN";
export const SET_SEARCH_DATA = "SET_SEARCH_DATA";
export const SET_JOB_DETAILS_DATA = "SET_JOB_DETAILS_DATA";


export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});


export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});

export const setSearchData = (data) => ({
  type: SET_SEARCH_DATA,
  payload: data,
});

export const setJobDetailsData = (data) => ({
  type: SET_JOB_DETAILS_DATA,
  payload: data,
});

export const fetchAllJobData = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch("https://job-search-portal-backend.onrender.com/api/v1/getAllJobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.message)) {
          dispatch(setSearchData(data.message));
          dispatch(setError(null));
        } else {
          console.error("Unexpected data format:", data);
          dispatch(setError("Unexpected data format"));
        }
      })
      .catch((error) => {
        console.error("Error fetching search data:", error);
        dispatch(setError("Error fetching search data"));
      });
  };
};

export const fetchSearchingData = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    console.log("data", data);
    fetch(`https://job-search-portal-backend.onrender.com/api/v1/searchJobs/${data}`)
      .then((response) => {
        console.log("response.......", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.message)) {
          dispatch(setSearchData(data.message));
          dispatch(setError(null));
        } else {
          console.error("Unexpected data format:", data);
          dispatch(setError("Unexpected data format"));
        }
      })
      .catch((error) => {
        console.error("Error fetching search data:", error);
        dispatch(setError("Error fetching search data"));
      });
  };
};

export const fetchSkillData = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    console.log("data", data);

    fetch(`https://job-search-portal-backend.onrender.com/api/v1/filterJobs/${data}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.message)) {
          dispatch(setSearchData(data.message));
          dispatch(setError(null));
        } else {
          console.error("Unexpected data format:", data);
          dispatch(setError("Unexpected data format"));
        }
      })
      .catch((error) => {
        console.error("Error fetching search data:", error);
        dispatch(setError("Error fetching search data"));
      });
  };
};

export const fetchJobDetails = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch(`https://job-search-portal-backend.onrender.com/api/v1/getJobs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (
          data.success &&
          typeof data.message === "object" &&
          !Array.isArray(data.message)
        ) {
          dispatch(setJobDetailsData(data.message));
          dispatch(setError(null));
        } else {
          console.error("Unexpected data format:", data);
          dispatch(setError("Unexpected data format"));
        }
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        dispatch(setError("Error fetching job details"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};
