import React from 'react'
import LeftSide from '../../components/message/LeftSide'

const Messages = () => {
    return (
        <div className="message d-flex mb-4">
            <div className="col-md-4 border-right px-0">
                <LeftSide />
            </div>

            <div className="col-md-8 px-0 right_mess">
                <div className="d-flex justify-content-center 
                align-items-center flex-column h-100">

                    <i className="fas fa-car text-primary"
                    style={{fontSize: '5rem'}} />
                    <h4>Chat Vehicules</h4>

                </div>
            </div>
        </div>
    )
}

export default Messages
