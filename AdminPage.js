import { useEffect, useState } from "react";
import { fetchLogs } from "../api/adminApi";

export default function AdminPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs()
      .then((res) => setLogs(res.data.logs || []))
      .catch(() => setLogs([]));
  }, []);

  const formatTime = (ts) => {
    try {
      return new Date(ts).toLocaleString();
    } catch {
      return ts;
    }
  };

  return (
    <>
      <h2>Admin – Audit Logs</h2>
      <p>
        Chat interactions are securely stored with integrity checks and monitored
        for any suspicious or sensitive activity.
      </p>

      <ul className="logs">
        {logs.map((l) => (
          <li key={l.id} className="log-item">
            <strong>Log #{l.id}</strong> • User {l.userId} • Role {l.role}
            <br />
            <small>{formatTime(l.timestamp)}</small>

            <div>Q: {l.request}</div>
            <div>Ans: {l.response}</div>

            {l.flagged ? (
              <div style={{ color: "#e0b400" }}>
                ⚠️ Flagged: <strong>{l.flagReason}</strong>
              </div>
            ) : null}

            {/* 🔐 Integrity fields */}
            <div style={{ fontSize: "12px", color: "#aaa", marginTop: "0.5rem" }}>
              <div>
                <strong>prevHash:</strong> {l.prevHash || "null"}
              </div>
              <div>
                <strong>hash:</strong> {l.hash}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
