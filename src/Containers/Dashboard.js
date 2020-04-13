import React from 'react';
import ProjectList from '../Containers/ProjectList'
import SearchBox from '../Components/SearchBox'

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