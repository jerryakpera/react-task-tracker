import { useState } from 'react';

const AddTask = ({ addTask }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const newTaskHandler = (e) => {
    e.preventDefault();
    if (!text) {
      alert('Please add text');
      return;
    }

    const newTask = {
      text,
      day,
      reminder,
    };

    addTask(newTask);
    setText('');
    setDay('');
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={newTaskHandler}>
      <div className="form-control">
        <label htmlFor="text">Task</label>
        <input
          type="text"
          placeholder="add text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="add day & time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input
        className="btn btn-block"
        type="submit"
        value="Save Task"
        name=""
        id=""
      />
    </form>
  );
};

export default AddTask;
