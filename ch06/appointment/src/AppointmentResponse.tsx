import { useState } from "react";

interface AppointmentResponseProps {
  onSubmit: (data: { isAccepted: boolean; message: string }) => void;
}

export function AppointmentResponse({
  onSubmit,
}: AppointmentResponseProps) {
  const [isAccepted, setIsAccepted] = useState<null | boolean>(null);
  const [message, setMessage] = useState("");
  const canSubmit = typeof isAccepted === "boolean";
  return (
    <div>
      <fieldset
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          width: "300px",
        }}
      >
        <legend>Appointment Response</legend>
        <div>
          <label>
            <input
              type="radio"
              name="is_accepted"
              checked={isAccepted === true}
              onChange={() => setIsAccepted(true)}
            />{" "}
            Accept
          </label>
          <label>
            <input
              type="radio"
              name="is_accepted"
              checked={isAccepted === false}
              onChange={() => setIsAccepted(false)}
            />{" "}
            Decline
          </label>
        </div>
        <label>
          Optional message:
          <input
            type="text"
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
          />
        </label>
        <button
          disabled={!canSubmit}
          onClick={() => canSubmit && onSubmit({ isAccepted, message })}
        >
          Submit
        </button>
      </fieldset>
    </div>
  );
}
