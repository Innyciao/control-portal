import React, { useState } from 'react';
import axios from 'axios';

const Step1 = ({ modalData, updateModalData }) => {

    const [isLoading, setIsLoading] = useState(false);
    // const [document, setDocument] = useState(false);

    const back = () => {
        updateModalData({ step: 0 })
    }


    const submit = () => {
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_API_HOST}/change-request`, modalData.formData)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    setIsLoading(false);
                    // setDocument(true);
                    updateModalData({ step: 2 })
                }
            })
            .catch(err => console.log(err));

    }

    return (
        <div>
            <div className='px-4'>
                <div className=' text-sm'>
                    <div className='flex'>
                        <div className='w-1/2'>
                            <div className='my-2 font-bold'>PROJECT NAME</div>
                            <div className='my-2'>
                                {modalData.formData.projectName}
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className='my-2 font-bold'>CHANGE NAME</div>
                            <div>
                                {modalData.formData.changeName}
                            </div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-1/2'>
                            <div className='my-2 font-bold'>CHANGE TYPE</div>
                            <div>
                                {modalData.formData.changeType}
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className='my-2 font-bold'>IMPACT ON CHANGE</div>
                            <div>
                                {modalData.formData.changeInpact}
                            </div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-1/2'>
                            <div className='my-2 font-bold'>REPO URL</div>
                            <div>
                                {modalData.formData.repoUrl}
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className='my-2 font-bold'>JIRA URL</div>
                            <div>
                                {modalData.formData.jiraUrl}
                            </div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-1/2'>
                            <div className='my-2 font-bold'>CHANGE DESCRIPTION</div>
                            <div>
                                {modalData.formData.description}
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className='my-2 font-bold'>CHANGE REASON</div>
                            <div>
                                {modalData.formData.changeReason}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='my-2 font-bold'>DOCUMENTS</div>
                        {modalData.formData.documentRequest.map((doc, i) => {
                            return (
                                <li key={i} className="list-none">{doc['documentName']}</li>
                            )
                        })}

                    </div>

                    {/* {document
                    ?
                    <div></div>
                    :
                    <div></div>
                    } */}
                </div>

                <div>
                    {isLoading
                        ?
                        <div className='flex justify-between px-16'>
                            <button
                                onClick={back}
                                type='button'
                                className='mb-3 bg-black rounded-full mt-10 px-4 py-1 text-white text-sm'
                            >
                                Back
                            </button>

                            <button
                                onClick={submit}
                                disabled
                                type="submit"
                                className="py-1 px-4 mb-3 mt-10 text-sm font-medium text-primary bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                <svg className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                Submit
                            </button>
                        </div>
                        :
                        <div className='flex justify-between px-16'>
                            <button
                                onClick={back}
                                type='submit'
                                className='mb-3 bg-black rounded-full mt-10 px-4 py-1 text-white text-sm'
                            >
                                Back
                            </button>
                            <button
                                onClick={submit}
                                type='submit'
                                className='mb-3 bg-primary rounded-full mt-10 px-4 py-1 text-white text-sm'
                            >
                                Submit
                            </button>
                        </div>
                    }


                </div>
            </div>
        </div>
    )
}

export default Step1