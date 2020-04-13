import React from 'react';


class SearchBox extends React.Component {
    
    state ={

    }
    
    render () {
    return (
        <div className="search-box">
        <input
          name="searchTerm"
          type="text"
          placeholder={"Search for Projects..."}
          value={this.props.searchTerm}
          onChange={this.props.handleSearchChange}
        />
      </div>
    )
    }

}

export default SearchBox;