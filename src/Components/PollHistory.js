import React, { useEffect, useState } from "react";
import "../styles/Teacher.css";
import ChatContainer from "./ChatContainer";
import { FaRegCommentAlt,  FaEye } from "react-icons/fa";

const PollHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/poll-history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching poll history:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div className="poll-container" style={{ padding: 20 }}>
       <h2 className="title" style={{ marginBottom: 15 }}>
        View <strong>Poll History</strong>
      </h2>
      {history.length === 0 ? (
        <p>No past polls found.</p>
      ) : (
        history.map((poll, index) => {
          const totalVotes = Object.values(poll.results || {}).reduce(
            (sum, count) => sum + count,
            0
          );

          return (
            <div key={index} style={{ marginBottom: 50 }}>
              <div className="poll-question-header">
                <h3>Question {index + 1}</h3>
              </div>
            <div key={index} className="poll-question-box" style={{ marginBottom: 40 }}>
              {/* Question Number */}
              <h4 style={{ marginBottom: 12 }}>
                 {poll.question}
              </h4>

              {(poll.results && Object.keys(poll.results).length > 0) ? (
                Object.entries(poll.results).map(([option, votes], i) => {
                  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

                  return (
                    <div key={option} className="poll-result-bar2">
                      <div
                        className="poll-result-fill"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className={`option-label ${percentage >= 50 ? "white-text" : "black-text"}`}>
                          <span className="option-circle">{i + 1}</span>
                          {option}
                        </span>
                      </div>
                      <span className="percentage-static">{percentage}%</span>
                    </div>
                  );
                })
              ) : (
                <p style={{ fontStyle: "italic", marginTop: 10 }}>No responses.</p>
              )}
            </div>
            </div>
          );
        })
      )}
      <div className="chat-toggle-container">
      <button className="chat-toggle-button" onClick={() => setShowChat(!showChat)}>
        <FaRegCommentAlt size={20} />
      </button>
      {showChat && <ChatContainer name={"Teacher"} />}
    </div>
    </div>
  );
};

export default PollHistory;