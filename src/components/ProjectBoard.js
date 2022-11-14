import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useCollection } from '../hooks/useCollection';
import { useFirestore } from '../hooks/useFirestore';
import BoardTile from './BoardTile';
import AddIcon from '../assets/add_icon.svg';

const ProjectBoard = ({ filteredProjects, allProjects }) => {
  const { documents } = useCollection('statuses');
  const { updateDocument, response } = useFirestore('projects');

  const [boardProjects, setBoardProjects] = useState();
  const [columns, setColumns] = useState();
  const statuses = documents;

  // //// //// //// //// //// //// //// //// //// //// //// //// //// //// //// ////
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Status IDs
    const sourceStatusId = source.droppableId;
    const destinationStatusId = destination.droppableId;

    // Status Names
    const sourceStatusName = statuses.filter((status) => status.id.includes(sourceStatusId))[0].name;
    const destinationStatusName = statuses.filter((status) => status.id.includes(destinationStatusId))[0].name;

    // Object of the project being dragged
    const currentDraggedProject = allProjects.filter((project) => project.id === draggableId)[0];

    // Arrays of projects in source and destination columns
    const sourceStatusProjects = allProjects.filter((project) => project.status === sourceStatusName);
    const destinationStatusProjects = allProjects
      .filter((project) => project.status === destinationStatusName)
      .concat(currentDraggedProject)
      .sort(function (a, b) {
        return a.index - b.index;
      });

    const beforeDestinationStatusProjects = allProjects.filter((project) => project.status === destinationStatusName);

    /////////////////////////////////////////////

    if (sourceStatusId === destinationStatusId) {
      // Project Proper Indexes
      const itemIndexArray = sourceStatusProjects.map((item) => {
        return item.index;
      });

      const copyOneSourceStatusProjects = Array.from(sourceStatusProjects);
      const copyTwoSourceStatusProjects = Array.from(sourceStatusProjects);

      if (source.index > destination.index) {
        // Temporary column upgrade to avoid flickering
        copyOneSourceStatusProjects.splice(source.index, 1);
        copyOneSourceStatusProjects.splice(destination.index, 0, currentDraggedProject);
        // Create a new project array after reordering items in a column
        const otherColumnProjects = boardProjects.filter((project) => project.status !== sourceStatusName);
        const newProjectArray = otherColumnProjects.concat(copyOneSourceStatusProjects);
        setBoardProjects(newProjectArray);
        ///////////////

        // Updating Firebase indexes
        const itemsToUpdate = copyTwoSourceStatusProjects.slice(destination.index, source.index);
        console.log(itemsToUpdate);

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
        copyOneSourceStatusProjects.splice(source.index, 1);
        copyOneSourceStatusProjects.splice(destination.index, 0, currentDraggedProject);
        // Create a new project array after reordering items in a column
        const otherColumnProjects = boardProjects.filter((project) => project.status !== sourceStatusName);
        const newProjectArray = otherColumnProjects.concat(copyOneSourceStatusProjects);
        setBoardProjects(newProjectArray);
        ///////////////

        // Updating Firebase indexes
        const itemsToUpdate = copyTwoSourceStatusProjects.slice(source.index + 1, destination.index + 1);
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
      // Step 1. Avoid flickering in the source column
      const copyOneSourceStatusProjects = Array.from(sourceStatusProjects);
      const copyOneDestinationStatusProjects = Array.from(destinationStatusProjects);

      const copyOnebeforeDestinationStatusProjects = Array.from(beforeDestinationStatusProjects);

      // Temporary column upgrade to avoid flickering
      copyOneSourceStatusProjects.splice(source.index, 1);

      // Create a new project array after reordering items in a column
      const otherColumnProjects = boardProjects.filter((project) => project.status !== sourceStatusName);
      const newProjectArray = otherColumnProjects.concat(copyOneSourceStatusProjects);
      console.log(copyOnebeforeDestinationStatusProjects);
      setBoardProjects(newProjectArray);
      ///////////////

      // Step 2. Update Firebase

      if (copyOnebeforeDestinationStatusProjects.length === 0) {
        updateDocument(draggableId, {
          status: destinationStatusName,
        });
      } else {
        console.log(copyOnebeforeDestinationStatusProjects);

        const itemIndexArray = copyOneDestinationStatusProjects.map((item) => {
          return item.index;
        });

        // Above
        const itemsToUpdateAbove = beforeDestinationStatusProjects.slice(0, destination.index);
        const idItemsToUpdateAbove = itemsToUpdateAbove.map((item) => {
          return item.id;
        });
        for (let i = 0; i < idItemsToUpdateAbove.length; i++) {
          updateDocument(idItemsToUpdateAbove[i], {
            index: itemIndexArray[i],
          });
        }

        //Below
        const itemsToUpdateBelow = beforeDestinationStatusProjects.slice(
          destination.index,
          copyOneDestinationStatusProjects.length + 1
        );
        const idItemsToUpdateBelow = itemsToUpdateBelow.map((item) => {
          return item.id;
        });
        for (let i = 0; i < idItemsToUpdateBelow.length; i++) {
          updateDocument(idItemsToUpdateBelow[i], {
            index: itemIndexArray[destination.index + i + 1],
          });
        }
        updateDocument(currentDraggedProject.id, {
          index: itemIndexArray[destination.index],
        });
        updateDocument(draggableId, {
          status: destinationStatusName,
        });
      }
    }
  };

  // className={`${column.name.toLowerCase().replace(/\s+/g, '-')}`}

  ///////////////////////////////////////////

  useEffect(() => {
    setColumns(documents);
    setBoardProjects(allProjects);
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
                      <div className='column-header'>
                        <h3>{column.name}</h3>
                        <img className='add-icon' src={AddIcon} alt='add icon' />
                      </div>
                      {boardProjects
                        .filter((project) => project.status.includes(column.name))
                        .map((project, index) => {
                          return (
                            <Draggable key={project.id} draggableId={project.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`draggable-item   ${snapshot.isDragging === true && 'is-dragged'}  `}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <BoardTile project={project} />
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
  justify-content: flex-start;
  height: fit-content;

  .droppable-column {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 250px;
    margin: 0 14px;

    .column-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 1em;
      align-items: center;

      h3 {
        color: var(--heading-color);
      }

      img {
        height: 1.8em;
        padding: 0 0.2em;
        filter: brightness(0) saturate(100%) invert(20%) sepia(0%) saturate(1235%) hue-rotate(233deg) brightness(87%)
          contrast(71%);
      }
    }

    .to-do {
      border-top: 0.6em solid #d0d5dd;
    }
    .in-progress {
      border-top: 0.6em solid #7cd4fd;
    }
    .done {
      border-top: 0.6em solid #6ce9a6;
    }
    .blocked {
      border-top: 0.6em solid #fda29b;
    }
  }

  .draggable-item {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .is-dragged {
    filter: brightness(0.96);
    transform: scale(1.02);

    color: black;
  }
`;

export default ProjectBoard;
