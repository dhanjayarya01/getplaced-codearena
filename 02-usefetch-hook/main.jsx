import React from "react";
import ReactDOM from "react-dom/client";
import { useFetch } from "./useFetch";
import "./style.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-avatar">{user.name.charAt(0)}</div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>📧 {user.email}</p>
        <p>🌐 {user.website}</p>
        <p>🏢 {user.company.name}</p>
      </div>
    </div>
  );
}

function App() {
  const { data, loading, error } = useFetch(API_URL);

  return (
    <div className="container">
      <h1 className="title">👥 User Directory</h1>
      <p className="subtitle">Powered by a custom <code>useFetch</code> hook</p>

      {loading && (
        <div className="status loading">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      )}

      {/* TODO: Display the error message here when error is not null */}
      {error && (
        <div className="status error">
          <p>❌ {error.message}</p>
        </div>
      )}

      {data && !loading && (
        <div className="grid">
          {data.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
