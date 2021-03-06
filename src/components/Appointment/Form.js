import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

// Form component for filling out appointment form
export default function Form(props) { 
  const [student, setStudent] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  // reset function
  const reset = () => { 
    setStudent(""); 
    setInterviewer(null);
  };

  // cancel function
  const cancel = () => { 
    reset(); 
    props.onCancel();
  };

  // validate empty input function
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } 

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    
    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          value={interviewer || null}
          onChange={(interviewerID) => {
            setInterviewer(interviewerID)
          }}
          data-testid="interviewer-selection"
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>

  )
}
