import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useCollection } from '../hooks/useCollection';
import { timestamp } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import CalendarIcon from '../assets/calendar_icon.svg';

// Datepicker
import DatePicker from 'react-datepicker';
import './DatePicker.scss';
import { useProjectContext } from '../hooks/useProjectContext';

const priorities = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

function Create({ setCreateModal, projectsCollection }) {
  const { currentProject, urlCurrentProject } = useProjectContext();

  const navigate = useNavigate();
  const { addDocument, response } = useFirestore('projects');
  const { user } = useAuthContext();
  const { documents } = useCollection('users');
  const { documents: categories } = useCollection('categories');
  const { documents: projectGroups } = useCollection('projectGroups');

  // Index EXPERIMENT
  const indexedProjects = projectsCollection.map((project) => {
    return project.index;
  });
  const highestIndex = Math.max(...indexedProjects);
  const newIndex = highestIndex + 1;
  console.log(newIndex);

  // form field values
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const [status, setStatus] = useState('To Do');

  // create user values for react-select
  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.id }, label: user.displayName };
        })
      );
    }
    if (projectGroups)
      setProjectList(
        projectGroups.map((projectGroup) => {
          return {
            value: { ...projectGroup, id: projectGroup.id, projectName: projectGroup.projectName },
            label: projectGroup.projectName,
          };
        })
      );
  }, [documents, projectGroups]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a task category.');
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the task to at least 1 user');
      return;
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const projectGroup = {
      id: selectedProject.value.id,
      projectName: selectedProject.value.projectName.replace(/\s/g, ''),
    };

    setStatus('To Do');

    const task = {
      projectGroup,
      index: newIndex,
      name,
      details,
      assignedUsersList,
      createdBy,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      creationDate: new Date().toDateString(),
      creationTimestamp: Date.now(),
      comments: [],
      status,
      priority: priority.value,
    };

    await addDocument(task);
    navigate(`/${urlCurrentProject}/tasks/page-1`);
    if (!response.error) {
      setCreateModal(false);
      navigate(`/${urlCurrentProject}/tasks/page-1`);
    }
  };

  return (
    <StyledCreate>
      <div className='modal-container'>
        <div className='modal'>
          <h2 className='page-title'>Create a new task</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Project:</span>
              <Select styles={selectStyles} onChange={(option) => setSelectedProject(option)} options={projectList} />
            </label>
            <label>
              <span>Task name:</span>
              <input required type='text' onChange={(e) => setName(e.target.value)} value={name} />
            </label>
            <label>
              <span>Details:</span>
              <textarea
                className='details-section'
                required
                type='text'
                onChange={(e) => setDetails(e.target.value)}
                value={details}
              ></textarea>
            </label>
            <span>Date due:</span>
            <div className='datepicker-wrapper'>
              <DatePicker
                calendarClassName='datepicker'
                required
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
              />
              <img src={CalendarIcon} alt='calendar icon' />
            </div>
            <label>
              <span>Category:</span>
              <Select styles={selectStyles} onChange={(option) => setCategory(option)} options={categories} />
            </label>
            <label>
              <span>Priority:</span>
              <Select styles={selectStyles} onChange={(option) => setPriority(option)} options={priorities} />
            </label>
            <label>
              <span>Assign to:</span>
              <Select styles={selectStyles} onChange={(option) => setAssignedUsers(option)} options={users} isMulti />
            </label>
            <div className='buttons'>
              <button className='cancel-button' type='button' onClick={() => setCreateModal((prevState) => !prevState)}>
                Cancel
              </button>
              <button className='btn'>Create Task</button>

              {formError && <p className='error'>{formError}</p>}
            </div>
          </form>
        </div>
      </div>
    </StyledCreate>
  );
}

// Styles for the React-Select package
const selectStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'var(--input-color)' }),
};

const StyledCreate = styled.div`
  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    padding: 30px;
    background: white;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    min-width: 300px;
    border: 1px solid #ddd;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
  }

  .modal-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }

  .datepicker-wrapper {
    position: relative;

    input {
      color: var(--text-color);
    }
    img {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      right: 2%;
      filter: invert(68%) sepia(8%) saturate(11%) hue-rotate(355deg) brightness(88%) contrast(88%);
    }
  }

  .buttons {
    text-align: right;
    margin-top: 40px;
  }

  .cancel-button {
    margin-right: 1em;
    color: var(--heading-color);
    border: none;
    background: none;
    font-size: inherit;

    &:hover {
      text-decoration: underline;
    }
  }

  input,
  textarea {
    border: 1px solid #ddd;
    background-color: var(--input-color);
    font-family: Poppins, sans-serif;
    font-size: 1em;
    resize: none;
  }

  textarea {
    min-height: 90px;
  }
`;

export default Create;
