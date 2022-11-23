import React from 'react';
import axios from 'axios';

const SubmitApprove = ({ updateDetailsData, guid, changeRequestId, username, clear, cancel }) => {


    const submit = (_) => {
        axios.post(`${process.env.REACT_APP_API_HOST}/approve-change`, {
            username: username,
            changeRequestId: changeRequestId,
        }).then(res => console.log(res))
            .catch(err => console.log(err));
        console.log()
        clear(guid)
        updateDetailsData({ step: 1 })
    }

    return (
        <div>
            <div className=' font-bold text-center text-xl my-10'>Are you sure you want to approve?</div>

            <div className='flex justify-center my-10'>
                <button
                    onClick={submit}
                    className=' mx-10 bg-primary py-1 px-2 rounded-full text-sm'
                >
                    Approve
                </button>

                <button
                    onClick={cancel}
                    className=' mx-10 bg-slate-200 py-1 px-2 rounded-full text-sm'
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default SubmitApprove