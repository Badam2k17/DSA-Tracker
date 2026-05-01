import { useState, useEffect } from "react";

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
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        fontFamily: "Arial",
      }}
    >
      <h1>DSA Tracker</h1>
      <p>
        Progress: {solvedCount} / {problems.length}
      </p>

      <input id="inp" placeholder="Enter problem name" />
      <button onClick={addProblem}>Add</button>

      {problems.map((p, i) => (
        <div key={i} style={{ margin: "5px 0" }}>
          {p.name}

          <button
            onClick={() => {
              const updated = [...problems];
              updated[i].solved = !updated[i].solved;
              setProblems(updated);
            }}
          >
            {p.solved ? "Solved" : "Mark Done"}
          </button>

          <button
            onClick={() => {
              const updated = problems.filter((_, index) => index !== i);
              setProblems(updated);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
