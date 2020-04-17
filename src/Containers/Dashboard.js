import React from 'react';
import ProjectList from '../Containers/ProjectList'
import SearchBox from '../Components/SearchBox'

const Dashboard = (props) => {
    return (
        <div>
            <SearchBox 
            handleSearchChange={props.handleSearchChange}
            searchTerm={props.searchTerm}/>
            <ProjectList projects={props.projects} updateProjectListOnEdit={props.updateProjectListOnEdit} />

        </div>
    )

}

export default Dashboard;