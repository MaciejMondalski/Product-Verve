import styles from 'styled-components';

function ProjectList({ projects }) {
  return (
    <div>
      {projects.length === 0 && <p>There are no projects to show</p>}
      {projects.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}

export default ProjectList;
