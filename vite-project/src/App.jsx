import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("problems"));
    if (saved) setProblems(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("problems", JSON.stringify(problems));
  }, [problems]);

  const addProblem = () => {
    const input = document.getElementById("inp");
    if (input.value.trim() === "") return;

    setProblems([...problems, { name: input.value, solved: false }]);
    input.value = "";
  };
  const solvedCount = problems.filter((p) => p.solved).length;
  return (
    <div className="container">
      <h1>DSA Tracker</h1>
      <p className="progress">
        Progress: {solvedCount} / {problems.length}
      </p>

      <div className="input-group">
        <input id="inp" placeholder="Enter problem name" />
        <button className="add-btn" onClick={addProblem}>
          Add
        </button>
      </div>

      {problems.map((p, i) => (
        <div key={i} className="item">
          <span className={p.solved ? "solved" : ""}>{p.name}</span>

          <div className="actions">
            <button
              className="done-btn"
              onClick={() => {
                const updated = [...problems];
                updated[i].solved = !updated[i].solved;
                setProblems(updated);
              }}
            >
              {p.solved ? "Undo" : "Done"}
            </button>

            <button
              className="delete-btn"
              onClick={() => {
                const updated = problems.filter((_, index) => index !== i);
                setProblems(updated);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
