import React from "react";

const Modal = ({show, title, subTitle, children, toggle, size, backdrop}) => {

    const width = {
                    "sm": "500px",
                    "md": "750px",
                    "lg": "900px",
                    "xl": "1250px"
                }[size] ?? "620px";

    return <div tabIndex="0" className={`z-100 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed ${show !== true && "hidden"} `}>
                <div  className="z-110 relative p-3 pt-14 mx-auto my-0 max-w-full" style={{width}} >
                    <div className="bg-white dark:bg-dark dark:border-dark rounded-lg shadow-lg pt-4 border flex flex-col overflow-hidden">
                        {
                            title && <div className="relative border-b pl-6 pr-16 pb-4 dark:border-dark-5">
                                        <button type="button" onClick={toggle} className={`fill-current h-6 w-6 absolute top-0 right-4 font-thin text-3xl leading-5 hover:opacity-60 dark:text-white ${subTitle && "top-2"}`}>&times;</button>
                                        <div className="text-lg font-semibold dark:text-white" >{title}</div>
                                        {subTitle && <p className="text-xs text-dark-2 dark:text-dark-1">{subTitle}</p>}
                                    </div>
                        }
                        <div className="px-6 py-2 flex-grow">
                            {children}
                        </div>
                    </div>
                </div>
                <div 
                    className="z-100 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50 dark:opacity-75"
                    onClick={backdrop === false ? null : toggle}
                >
                </div>
            </div>


}

export default Modal;