import React from 'react';
import { useState } from 'react';
import Modal from '../../modal/Modal';

const NewChangeModal = props => {

    const [modalData, setModalData] = useState({ step: 0 })

    const updateModalData = update => {
        setModalData({ ...modalData, ...update });
    }

    const updateProps = { ...props, modalData, updateModalData };

    return (<Modal
        show={props.show}
        toggle={props.toggle}
    >
        <div className='-mx-8'>
            <div className="px-8 pb-4 text-lg border-b font-bold text-dark dark:text-white dark:border-dark-5 relative -mt-2" >
                Create portfolio
                <p className="text-xs text-dark-1 font-medium pt-1 dark:text-dark-2 pr-10">
                    Fund your account with a minimum of $10 to create your trading portfolio.
                </p>
                <button type="button" onClick={props.toggle} className=" absolute right-0 top-0  mr-8 text-3xl hover:opacity-60 dark:text-white">&times;</button>
            </div>
        </div>
        <div></div>
    </Modal>
    )
}

export default NewChangeModal;