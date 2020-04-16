import React from 'react';
import RequestForm from '../Components/RequestForm'

const MakeRequest = (props) => {
    return (
        <div>
            <RequestForm validatedUser={props.validatedUser}/>
        </div>
    )

}

export default MakeRequest;