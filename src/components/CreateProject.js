import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useCreateProject from '../hooks/useCreateProject';

const CreateProject = ({ setNewProjectModal, newProjectModal }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projectIcon, setProjectIcon] = useState(null);
  const [projectIconError, setProjectIconError] = useState(null);
  const { newProject, isPending, error } = useCreateProject();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, description);
    newProject(name, description, projectIcon);
    setNewProjectModal(!newProjectModal);
  };

  const handleFileChange = (e) => {
    setProjectIcon(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setProjectIconError('Please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setProjectIconError('Selected file must be an image');
      return;
    }
    if (!selected > 100000) {
      setProjectIconError('Image file size must be less than 100kb');
      return;
    }

    setProjectIconError(null);
    setProjectIcon(selected);
    console.log('icon updated');
  };

  return (
    <StyledCreateProject>
      <div className='modal-container'>
        <div className='modal'>
          <h2 className='page-title'>Create a new project</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Project name:</span>
              <input required type='text' onChange={(e) => setName(e.target.value)} value={name} />
            </label>
            <label>
              <span>Description:</span>
              <textarea
                className='details-section'
                required
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </label>
            <label>
              <span>Project icon:</span>
              <input required type='file' onChange={handleFileChange} />
              {projectIconError && <div className='error'>{projectIconError}</div>}
            </label>
            <div className='buttons'>
              <button
                className='cancel-button'
                type='button'
                onClick={() => setNewProjectModal((prevState) => !prevState)}
              >
                Cancel
              </button>
              <button className='btn'>Create Project</button>
            </div>
          </form>
        </div>
      </div>
    </StyledCreateProject>
  );
};

const StyledCreateProject = styled.div`
  .modal-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }

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

export default CreateProject;
