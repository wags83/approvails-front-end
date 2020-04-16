import React from 'react';
import ProjectCard from '../Components/ProjectCard'



class ProjectList extends React.Component {
    componentDidMount(){
        this.props.updateProjectListOnEdit()
    }
    render() {
    return (
        <div>This is Project List container
            <table>
               <tbody>
                   <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Budget</th>
                        <th>Submitter</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>View Details</th>
                    </tr>
                        {this.props.projects.map(project => <ProjectCard project={project} key={project.id}/>)}
                </tbody>
            </table>
        </div>
    )
    }

}

export default ProjectList;