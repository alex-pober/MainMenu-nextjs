import React from "react";

export default function AccountInfo() {
  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contactEmail">Contact Email</label>
        <input
          id="contactEmail"
          type="email"
          value={contactEmail || ""}
          onChange={(e) => setContactEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contactNumber">Contact Number</label>
        <input
          id="contactNumber"
          type="number"
          value={contactNumber || ""}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({ username, contactEmail, contactNumber })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
    </>
  );
}
