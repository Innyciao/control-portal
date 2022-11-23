import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircleLoader } from 'react-spinners';
// import Base64ToImg from '../../conversion/base64_to_img';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Step0 = ({ updateDetailsData, guid }) => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(true);

    const userEmail = JSON.parse(window.localStorage.getItem("email"))



    var url = `${process.env.REACT_APP_API_HOST}/single-change-request?uuid=${guid}`
    var roleUrl = `${process.env.REACT_APP_API_HOST}/user-role?username=${userEmail}`
    // var heading = [
    //     'Project Name',
    //     'Change Name',
    //     'Change Type',
    //     'Impact On Change',
    //     'Repository URL',
    //     'JIRA URL',
    //     'Change Description',
    //     'Change Reason',
    //     'Documents'
    // ];

    // change base64 string to file    

    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get(url);
            if (response.status === 200) {
                setLoading(false)
                setData(response.data.responseData[0]);

            }
        };
        loadData()
    }, [url])

    useEffect(() => {
        const roleData = async () => {
            const res = await axios.get(roleUrl);
            setRole(res.data.responseData[0].canApprove)
        };
        roleData()
    }, [roleUrl])

    // const level = JSON.parse(window.localStorage.getItem("role"))

    const approve = (_) => {

        updateDetailsData({ step: 4 })
    }

    const decline = (_) => {

        updateDetailsData({ step: 2 })
    }

    const styleObj = {
        fontSize: 14,
    }

    // // const base64_to_img = JSON.parse(window.localStorage.getItem('base64String'));
    // const documentName =  JSON.parse(window.localStorage.getItem('documentName'));

    function downloadBase64File(base64String, documentName) {

        const linkSource = base64String;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = documentName;
        downloadLink.click();
    }


    return (
        <Tabs>
            <TabList>
                <Tab style={styleObj}
                >Request Details</Tab>
                <Tab style={styleObj}>Approval Flow</Tab>
            </TabList>
            <TabPanel>
                {loading
                    ?
                    <div className='flex justify-center items-center h-96'>
                        <CircleLoader color="#36d7b7" />
                    </div>
                    :
                    <div>
                        <div className='px-4 mt-4'>
                            <div className=' text-sm' key={data.guid}>
                                <div className='flex '>
                                    <div className=' w-1/2'>
                                        <div className='my-2 font-bold'>PROJECT NAME</div>
                                        <div className='my-2'>
                                            {data['projectName']}
                                        </div>
                                    </div>
                                    <div className=' w-1/2'>
                                        <div className='my-2 font-bold'>CHANGE NAME</div>
                                        <div>{data['changeName']}</div>
                                    </div>
                                </div>
                                <div className='flex mt-4'>
                                    <div className=' w-1/2'>
                                        <div className='my-2 font-bold'>CHANGE TYPE</div>
                                        <div>{data['changeType']}</div>
                                    </div>
                                    <div className=' w-1/2'>
                                        <div className='my-2 font-bold'>IMPACT OF CHANGE</div>
                                        <div>{data['changeInpact']}</div>
                                    </div>
                                </div>
                                <div className='flex mt-4'>
                                    <div className=' w-1/2'>
                                        <div className='my-2 font-bold'>REPO URL</div>
                                        <div>{data['repoUrl']}</div>
                                    </div>
                                    <div className=' w-1/2'>
                                        <div className='my-2 font-bold'>JIRA URL</div>
                                        <div>{data['jiraUrl']}</div>
                                    </div>
                                </div>
                                <div className='flex mt-4'>
                                    <div className=' w-1/2'>
                                        <div className='my-2 font-bold'>CHANGE DESCRIPTION</div>
                                        <div>{data['changeDescription']}</div>
                                    </div>
                                    <div className=' w-1/2'>
                                        <div className='my-2 font-bold'>CHANGE REASON</div>
                                        <div>{data['changeReason']}</div>
                                    </div>
                                </div>
                                <div className='mt-4 mb-7'>
                                    <div className='my-2 font-bold'>DOCUMENTS</div>
                                    {
                                        data['changeDocuments'].map((e) => {
                                            return (
                                                <div className="">
                                                    <button
                                                        onClick={() => downloadBase64File(e['base64String'], e['documentName'])}>
                                                        {e['documentName']}
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <p>


                        </p>
                        <div className='flex justify-between mb-10 mt-10 mx-24'>
                            {(role && userEmail !== data['changeUsername'])
                                ?
                                <div className='mt-5'>
                                    <button
                                        onClick={approve}
                                        className='bg-primary px-4 py-1 rounded-md disabled:opacity-75 disabled:bg-dark-8 mx-10'
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={decline}
                                        className='bg-danger-3 px-4 py-1 rounded-md disabled:opacity-75 disabled:bg-dark-8 mx-10'
                                    >
                                        Decline
                                    </button>
                                </div>
                                :
                                <div></div>
                            }

                        </div>
                    </div>
                }
            </TabPanel>
            <TabPanel>
                Approval Details
            </TabPanel>
        </Tabs>
    )
}

export default Step0