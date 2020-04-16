import React from 'react';
import ProjectList from '../Containers/ProjectList'
import SearchBox from '../Components/SearchBox'

//TO DO:
// -Project status, etc. is not refreshing on back button press from ProjectDetails since it doesn't know about the update since it gets state from App component, move down here?

const Dashboard = (props) => {
    return (
        <div>This is Dashboard Container
            <SearchBox 
            handleSearchChange={props.handleSearchChange}
            searchTerm={props.searchTerm}/>
            <ProjectList projects={props.projects} />

        </div>
    )

}

export default Dashboard;