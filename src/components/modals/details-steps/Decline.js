import React, { useState } from 'react';
import axios from 'axios';


const Decline = ({ updateDetailsData, username, changeRequestId, clear, guid }) => {
    const [declineReason, setDeclineReason] = useState("");

    const decline = (_) => {
        axios.post('http://ccpap-recip-1xhqf3aposrut-1739196065.eu-west-2.elb.amazonaws.com/api/v1/ccp/decline-change', {
            username: username,
            changeRequestId: changeRequestId,
            declineReason: declineReason,
        }).then(res => console.log(res))
            .catch(err => console.log(err));
        clear(guid)
        updateDetailsData({ step: 3 })
    }
    return (
        <div>
            <div className='flex justify-center mt-8 mb-6'>
                <div>Reason For Declination</div>
            </div>

            <textarea
                type="text"
                name='declineReason'
                id='declineReason'
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="border-dark-2 border text-xs px-10 rounded-md hover:border-primary p-1 outline-primary w-full h-20"
            />

            <div className=' flex justify-center'>
                <button
                    type='submit'
                    onClick={decline}
                    className='mb-3 bg-primary rounded-full mt-10 px-4 py-1 text-white text-sm'>Submit</button>

            </div>
        </div>
    )
}

export default Decline;