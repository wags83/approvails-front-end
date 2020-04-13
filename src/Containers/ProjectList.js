import React from 'react';
import ProjectCard from '../Components/ProjectCard'

const ProjectList = (props) => {
    return (
        <div>This is Project List container
            <table>
               <tbody>
                   <tr>
                        <th>Project ID</th>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th>Submitter</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>View Details</th>
                    </tr>
                        {props.projects.map(project => <ProjectCard project={project}/>)}
                </tbody>
            </table>
        </div>
    )

}

export default ProjectList;