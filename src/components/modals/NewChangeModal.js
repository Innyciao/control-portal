import React from 'react';
import { useState } from 'react';
import Modal from '../../modal/Modal';
import Step0 from './new-change-steps/Step0';
import Step1 from './new-change-steps/Step1';
import Step2 from './new-change-steps/Step2';

const NewChangeModal = (props) => {
    const [modalData, setModalData] = useState({ step: 0 });
    const updateModalData = update => {
        setModalData({ ...props,  modalData , ...update });
    }
    
    const cancel = _ => {
        setModalData({ step: 1 });
        props.toggle();
    }

    const updateProps = { ...props, modalData, updateModalData, cancel };

    return (<Modal
        show={props.show}
        toggle={props.toggle}
    >
        {(modalData.step === 0) &&
            <div className='-mx-8'>
                <div className="px-8 pb-4 text-lg border-b font-bold text-dark dark:text-white dark:border-dark-5 relative -mt-2" >
                    CHANGE REQUEST
                    <button type="button" onClick={props.toggle} className=" absolute right-0 top-0  mr-8 text-3xl hover:opacity-60 dark:text-white">&times;</button>
                </div>
            </div>
        }
        {(modalData.step === 1) &&
            <div className='-mx-8'>
                <div className="px-8 pb-4 text-md border-b font-bold text-dark dark:text-white dark:border-dark-5 relative -mt-2" >
                    REQUEST SUBMITTED
                    <button type="button" onClick={props.toggle} className=" absolute right-0 top-0  mr-8 text-3xl hover:opacity-60 dark:text-white">&times;</button>
                </div>
            </div>
        }



        <div className="py-2">
            {({
                "2": <Step2 {...updateProps} />,
                "1": <Step1 {...updateProps} />
            })[modalData.step] ?? <Step0 {...updateProps} />
            }
        </div>


    </Modal>
    )
}

export default NewChangeModal;