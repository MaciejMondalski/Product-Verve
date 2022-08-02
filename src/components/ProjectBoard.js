import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useCollection } from '../hooks/useCollection';
import { useFirestore } from '../hooks/useFirestore';

const ProjectBoard = ({ filteredProjects, allProjects }) => {
  const { documents } = useCollection('statuses');
  const { updateDocument, response } = useFirestore('projects');

  const [columns, setColumns] = useState();
  const [boardProjects, setBoardProjects] = useState(allProjects);
  const statuses = documents;

  // //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Status IDs
    const startStatusId = source.droppableId;
    const finishStatusId = destination.droppableId;

    // Status Names
    const startStatusName = statuses.filter((status) => status.id.includes(startStatusId))[0].name;
    const finishStatusName = statuses.filter((status) => status.id.includes(finishStatusId))[0].name;

    // Object of the project being dragged
    const currentDraggedProject = boardProjects.filter((project) => project.id === draggableId)[0];

    // Arrays of projects in start and finish columns
    const startStatusProjects = boardProjects.filter((project) => project.status === startStatusName);
    const finishStatusProjects = boardProjects
      .filter((project) => project.status === finishStatusName)
      .concat(currentDraggedProject);

    if (startStatusId === finishStatusId) {
      const updatedColumnProjects = Array.from(startStatusProjects);
      updatedColumnProjects.splice(source.index, 1);
      updatedColumnProjects.splice(destination.index, 0, currentDraggedProject);

      // Create a new project array after reordering items in a column
      const otherColumnProjects = boardProjects.filter((project) => project.status !== startStatusName);
      const newProjectArray = otherColumnProjects.concat(updatedColumnProjects);

      setBoardProjects(newProjectArray);
      console.log(newProjectArray);
    } else {
      updateStatus(finishStatusId, draggableId, finishStatusName);
    }

    // // Reordering logic
    // if (startStatusId === finishStatusId) {
    //   const thisStatusProjects = allProjects.filter((project) => project.status === startStatusName);
    //
    //   console.log(thisStatusProjects);
    //
    //   startStatusProjects.splice(source.index, 1);
    //   startStatusProjects.splice(destination.index, 0, draggableId);
    // } else {
    // }
    //
    // updateStatus(finishStatusId, draggableId, finishStatusName);
  };

  // //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// //
  const updateStatus = (finishStatusId, draggableId, finishStatusName) => {
    // Update Firebase document
    updateDocument(draggableId, {
      status: finishStatusName,
    });
  };

  useEffect(() => {
    setColumns(documents);
    console.log('documents useEffect');
  }, [documents]);

  return (
    <StyledBoard>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {columns &&
          statuses.map((column) => {
            return (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided, snapshot) => {
                  return (
                    <div className='droppable-column' {...provided.droppableProps} ref={provided.innerRef}>
                      {column.name}
                      {boardProjects
                        .filter((project) => project.status.includes(column.name))
                        .map((project, index) => {
                          return (
                            <Draggable key={project.id} draggableId={project.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className='draggable-item'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {project.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
      </DragDropContext>
    </StyledBoard>
  );
};

const StyledBoard = styled.div`
  display: flex;
  justify-content: center;
  height: 70vh;
  background-color: lightblue;

  .droppable-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: lightcoral;
    width: 200px;
    margin: 10px;
  }

  .draggable-item {
    user-select: none;
    padding: 6px;
    margin-bottom: 8px;
    width: 80%;
    height: 50px;
    background: lightgray;
  }
`;

export default ProjectBoard;
