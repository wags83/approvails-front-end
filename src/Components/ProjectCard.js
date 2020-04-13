import React from 'react';
import { useHistory } from 'react-router-dom';

const ProjectCard = (props) => {
    const {project_name, budget, department, status, description, id, user} = props.project
    let history = useHistory()

    return (
    <tr>
        <td>{id}</td>
        <td>{project_name}</td>
        <td>{description}</td>
        <td>{budget}</td>
        <td>{user.username}</td>
        <td>{department.name}</td>
        <td>{status}</td>
        <td onClick={() => history.push(`api/v1/projects/${id}`)}><button>Details</button></td>
    </tr>
    )

}

export default ProjectCard;