import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/ui-components/layout";

const Skills = () => {
  const [userSkills, setUserSkills] = useState([]); // Initialize state for skills fetched from the endpoint
  const [editedSkill, setEditedSkill] = useState(""); // Track edited skill
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  useEffect(() => {
    // Fetch skills from an API endpoint
    const fetchSkills = async () => {
      try {
        const response = await axios.get("YOUR_ENDPOINT_URL_HERE");
        if (response.status === 200) {
          setUserSkills(response.data.skills); // Assuming the API response contains skills in an array named 'skills'
        } else {
          // Handle error if the request fails
          console.error("Failed to fetch skills");
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    // Call the fetchSkills function when the component mounts
    fetchSkills();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const addSkill = () => {
    if (editedSkill.trim() !== "") {
      const newUserSkills = [...userSkills];
      newUserSkills[0].unshift(editedSkill); // Add new skill to the first row
      setUserSkills(newUserSkills);
      setEditedSkill("");
    }
  };

  const updateSkill = (rowIndex, colIndex, newSkill) => {
    const newUserSkills = [...userSkills];
    newUserSkills[rowIndex][colIndex] = newSkill;
    setUserSkills(newUserSkills);
  };

  return (
    <Layout>
      <div className="container" id="skills">
        <h5 className="display-4 text-primary m-5 text-center">
          Skills and Talents
        </h5>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Add your Skills and Talents below:
            </h6>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new skill"
                value={editedSkill}
                onChange={(e) => setEditedSkill(e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={addSkill}>
                Add Skill
              </button>
            </div>
            <table className="table">
              <tbody>
                {userSkills.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((skill, colIndex) => (
                      <td key={colIndex}>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={skill}
                            onChange={(e) =>
                              updateSkill(
                                rowIndex,
                                colIndex,
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          skill
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-start">
              <button
                className="btn btn-success"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Save Changes" : "Edit Skills"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
