import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import Layout from "@/ui-components/layout";

const Skills = () => {
  const [userSkills, setUserSkills] = useState([[]]); // Initialize with a single empty array\
  const [editedSkill, setEditedSkill] = useState(""); // Track edited skill
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const cookies = parseCookies();
        const token = cookies.token || "";

        const response = await axios.get("http://127.0.0.1:8000/api/skills/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.status === 200) {
          // Extracting only the "skills" property from each object in the response
          const skillsArray = response.data.map((item) => item.skills);

          setUserSkills([skillsArray]); // Setting the skills array within another array
        } else {
          console.error("Failed to fetch skills");
          setUserSkills([]); // Set an empty array in case of failure
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        setUserSkills([]); // Set an empty array in case of error
      }
    };

    fetchSkills();
  }, []);

  const addSkill = async () => {
    if (editedSkill.trim() !== "") {
      try {
        const cookies = parseCookies();
        const token = cookies.token || "";

        const response = await axios.post(
          "http://127.0.0.1:8000/api/skills/",
          { skills: editedSkill },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.status === 201) {
          // Fetch skills after successfully adding a skill
          const fetchResponse = await axios.get(
            "http://127.0.0.1:8000/api/skills/",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          if (fetchResponse.status === 200) {
            const skillsArray = fetchResponse.data.map((item) => item.skills);
            setUserSkills([skillsArray]);
            setEditedSkill(""); // Clear the input field by resetting editedSkill to an empty string
          } else {
            console.error("Failed to fetch skills after adding skill");
          }
        } else {
          console.error("Failed to add skill");
        }
      } catch (error) {
        console.error("Error adding skill:", error);
      }
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
                              updateSkill(rowIndex, colIndex, e.target.value)
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
