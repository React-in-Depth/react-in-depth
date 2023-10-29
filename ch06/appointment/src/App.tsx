import { AppointmentResponse } from "./AppointmentResponse";

function App() {
  return (
    <>
      <h1>Incoming appointment</h1>
      <p>From: John Doe</p>
      <p>Date: 2021-09-01</p>
      <AppointmentResponse onSubmit={console.log} />
    </>
  );
}

export default App;
