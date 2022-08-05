import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useCollection } from '../hooks/useCollection';
import { useFirestore } from '../hooks/useFirestore';

const ProjectBoard = ({ filteredProjects, allProjects }) => {
  const { documents } = useCollection('statuses');
  const { updateDocument, response } = useFirestore('projects');

  const [boardProjects, setBoardProjects] = useState([]);
  const [columns, setColumns] = useState();
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
    const currentDraggedProject = allProjects.filter((project) => project.id === draggableId)[0];

    // Arrays of projects in start and finish columns
    const startStatusProjects = allProjects.filter((project) => project.status === startStatusName);
    const finishStatusProjects = allProjects
      .filter((project) => project.status === finishStatusName)
      .concat(currentDraggedProject);

    /////////////////////////////////////////////

    if (startStatusId === finishStatusId) {
      // Project Proper Indexes
      const itemIndexArray = startStatusProjects.map((item) => {
        return item.index;
      });

      const copyOneStartStatusProjects = Array.from(startStatusProjects);
      const copyTwoStartStatusProjects = Array.from(startStatusProjects);

      if (source.index > destination.index) {
        // Temporary column upgrade to avoid flickering
        copyOneStartStatusProjects.splice(source.index, 1);
        copyOneStartStatusProjects.splice(destination.index, 0, currentDraggedProject);
        // Create a new project array after reordering items in a column
        const otherColumnProjects = boardProjects.filter((project) => project.status !== startStatusName);
        const newProjectArray = otherColumnProjects.concat(copyOneStartStatusProjects);
        setBoardProjects(newProjectArray);
        ///////////////

        // Updating Firebase indexes
        const itemsToUpdate = copyTwoStartStatusProjects.splice(destination.index, startStatusProjects.length - 1);
        itemsToUpdate.splice(source.index, 1);

        const idItemsToUpdate = itemsToUpdate.map((item) => {
          return item.id;
        });

        for (let i = 0; i < idItemsToUpdate.length; i++) {
          updateDocument(idItemsToUpdate[i], {
            index: itemIndexArray[destination.index + i + 1],
          });

          updateDocument(currentDraggedProject.id, {
            index: itemIndexArray[destination.index],
          });
        }
      }

      if (source.index < destination.index) {
        console.log('down');

        // Temporary column upgrade to avoid flickering
        copyOneStartStatusProjects.splice(source.index, 1);
        copyOneStartStatusProjects.splice(destination.index, 0, currentDraggedProject);
        // Create a new project array after reordering items in a column
        const otherColumnProjects = boardProjects.filter((project) => project.status !== startStatusName);
        const newProjectArray = otherColumnProjects.concat(copyOneStartStatusProjects);
        setBoardProjects(newProjectArray);
        ///////////////

        // Updating Firebase indexes
        const itemsToUpdate = copyTwoStartStatusProjects.splice(source.index + 1, startStatusProjects.length);
        itemsToUpdate.splice(destination.index, 1);
        console.log(itemsToUpdate);

        console.log(itemIndexArray);

        const idItemsToUpdate = itemsToUpdate.map((item) => {
          return item.id;
        });

        for (let i = 0; i < idItemsToUpdate.length; i++) {
          updateDocument(idItemsToUpdate[i], {
            index: itemIndexArray[source.index + i],
          });
          updateDocument(currentDraggedProject.id, {
            index: itemIndexArray[destination.index],
          });
        }
      }
    } else {
      updateDocument(draggableId, {
        status: finishStatusName,
      });
    }
  };

  useEffect(() => {
    setColumns(documents);
    setBoardProjects(allProjects);
    console.log('documents useEffect');
  }, [documents, allProjects]);

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
