import React from 'react';
import RequestForm from '../Components/RequestForm'

const MakeRequest = (props) => {
    // console.log(props)
    
    return (
        <div>This is a Make Request container
            <RequestForm validatedUser={props.validatedUser}/>
        </div>
    )

}

export default MakeRequest;