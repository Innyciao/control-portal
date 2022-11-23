import React from 'react';
import { useState } from 'react';
import Modal from '../../modal/Modal';
import Step0 from './details-steps/Step0';
import Approve from './details-steps/Approve';
import Decline from './details-steps/Decline';
import SubmitDecline from './details-steps/SubmitDecline';
import SubmitApprove from './details-steps/SubmitApprove';

const DetailsModal = (props) => {

    const [detailsData, setDetailsData] = useState({ step: 0 });
    const updateDetailsData = update => {
        setDetailsData({ ...detailsData, ...update });
    }

    const cancel = _ => {
        setDetailsData({ step: 1 });
        props.toggle();
    }

    const updateProps = { ...props, detailsData, updateDetailsData, cancel };

  return (
    <Modal
        show={props.show}
        toggle={props.toggle}
    >
        {(detailsData.step === 0) &&
            <div className='-mx-8'>
                <div className="px-8 pb-4 text-lg border-b font-bold text-dark dark:text-white dark:border-dark-5 relative -mt-2" >
                    CHANGE REQUEST DETAILS
                    <button type="button" onClick={props.toggle} className=" absolute right-0 top-0  mr-8 text-3xl hover:opacity-60 dark:text-white">&times;</button>
                </div>
            </div>
        }
        {(detailsData.step === 1) &&
            <div className='-mx-8'>
                <div className="px-8 pb-4 text-md border-b font-bold text-dark dark:text-white dark:border-dark-5 relative -mt-2" >
                    REQUEST APPROVED
                    <button type="button" onClick={props.toggle} className=" absolute right-0 top-0  mr-8 text-3xl hover:opacity-60 dark:text-white">&times;</button>
                </div>
            </div>
        }
        {(detailsData.step === 2) &&
            <div className='-mx-8'>
                <div className="px-8 pb-4 text-md border-b font-bold text-dark dark:text-white dark:border-dark-5 relative -mt-2" >
                    REQUEST DECLINED
                    <button type="button" onClick={props.toggle} className=" absolute right-0 top-0  mr-8 text-3xl hover:opacity-60 dark:text-white">&times;</button>
                </div>
            </div>
        }



        <div className="py-2">
            {({
                "4": <SubmitApprove {...updateProps} />,
                "3": <SubmitDecline {...updateProps} />,
                "2": <Decline {...updateProps} />,
                "1": <Approve {...updateProps} />
            })[detailsData.step] ?? <Step0 {...updateProps} />
            }
        </div>


    </Modal>
  )
}

export default DetailsModal