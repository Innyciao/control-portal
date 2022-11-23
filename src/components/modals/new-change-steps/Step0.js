import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomSelect from '../../../CustomSelect';
const options = [
    { value: 'Back-end Change', label: 'Back-end Change' },
    { value: 'Front-end Change', label: 'Front-end Change' },
    { value: 'Data-base Change', label: 'Data-base Change' },
    { value: 'API Change', label: 'API Change' },
    { value: 'Mobile Change', label: 'Mobile Change' },
]


const Step0 = ({ updateModalData }) => {

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const requestValidation = Yup.object().shape({
        projectName: Yup.string().required("field required"),
        changeName: Yup.string().required("field required"),
        changeType: Yup.string().required("field required"),
        changeInpact: Yup.string().required("field required"),
        repoUrl: Yup.string().required("field required"),
        jiraUrl: Yup.string().required("field required"),
        description: Yup.string().required("field required"),
        changeReason: Yup.string().required("field required"),

    })



    const formik = useFormik({
        initialValues: {
            projectName: '',
            changeName: '',
            changeType: '',
            changeInpact: '',
            repoUrl: '',
            jiraUrl: '',
            description: '',
            changeReason: '',

        },
        validationSchema: requestValidation,

        onSubmit: async (values) => {

            values['changeRequesterUsername'] = JSON.parse(window.localStorage.getItem("email"))
            console.log(values)
            var documentRequest = []
            // Get The list of images DONE
            var fileInput = document.getElementById('selected_images').files;
            // Extract  "documentName","fileExtension", 
            for (let i = 0; i < fileInput.length; i++) {
                let currentItrObject = {}
                currentItrObject['documentName'] = fileInput[i].name
                currentItrObject["fileExtension"] = fileInput[i].type
                // convet the image to "base64String
                currentItrObject["base64String"] = await toBase64(fileInput[i])
                documentRequest.push(currentItrObject)
            }
            // Add the values to the [values]
            values["documentRequest"] = documentRequest
            // Send a post request.
            //


            updateModalData({ step: 1, formData: values, values });


        },
    });


    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <div className='flex md:px-6 '>
                    <div className='w-1/2'>
                        <div className='pt-5 '>
                            <label className='text-sm mb-1'>Project Name</label>
                            <input
                                id='projectName'
                                type="text"
                                name='projectName'
                                onChange={formik.handleChange}
                                value={formik.values.projectName}
                                className="border-dark-2 border text-xs px-10 rounded-full hover:border-primary outline-primary p-1 py-2 w-40 md:w-60" />
                        </div>
                        {formik.errors.projectName ? <div className='text-xs ml-4 mt-2 text-red-400'>{formik.errors.projectName}</div> : null}
                    </div>
                    <div className='w-1/2'>
                        <div className='pt-5 w-1/2'>
                            <label className='text-sm mb-1'>Change Name</label>
                            <input
                                id='changeName'
                                name='changeName'
                                onChange={formik.handleChange}
                                value={formik.values.changeName}
                                type="text"
                                className="border-dark-2 border text-xs md:px-10 rounded-full hover:border-primary p-1 py-2 outline-primary w-40 md:w-60" />
                        </div>
                        {formik.errors.changeName ? <div className='text-xs ml-4 mt-2 text-red-400'>{formik.errors.changeName}</div> : null}
                    </div>
                </div>

                <div className='flex justify-between md:px-6'>
                    <div>

                        <div className='pt-5'>
                            <label htmlFor='changeType ' className='text-sm mb-1'>Change Type</label>
                            {/* <input
                            id='changeType'
                            name='changeType'
                            onChange={formik.handleChange}
                            value={formik.values.changeType}
                            type="text"
                            className=" border-dark-2 border text-xs md:px-10 rounded-full hover:border-primary p-1 outline-primary w-40 md:w-60" /> */}
                            <CustomSelect
                                options={options}
                                value={formik.values.changeType}
                                onChange={value => formik.setFieldValue('changeType', value.value)}
                                className=" border-dark-2 border text-xs md:px-10 rounded-full hover:border-primary p-1 py-2 outline-primary w-40 md:w-60"

                            />
                        </div>
                        {formik.errors.changeType ? <div className='text-xs ml-4 mt-2 text-red-400'>{formik.errors.changeType}</div> : null}
                    </div>
                    <div>
                        <div className='pt-5 mx-3'>
                            <label className='text-sm mb-1'>Impact On Change</label>
                            <input
                                id='changeInpact'
                                name='changeInpact'
                                onChange={formik.handleChange}
                                value={formik.values.changeInpact}
                                type="text"
                                className="border-dark-2 border text-xs md:px-10 rounded-full hover:border-primary p-1 py-2 outline-primary w-40 md:w-60 " />
                        </div>
                        {formik.errors.changeInpact ? <div className='text-xs ml-4 mt-2 text-red-400'>{formik.errors.changeInpact}</div> : null}
                    </div>
                </div>
                <div className='flex justify-between md:px-6'>
                    <div>
                        <div className='pt-5'>
                            <label className='text-sm mb-1'>Repository URL</label>
                            <input
                                id='repoUrl'
                                name='repoUrl'
                                onChange={formik.handleChange}
                                value={formik.values.repoUrl}
                                type="text"
                                className="border-dark-2 border text-xs px-10 rounded-full hover:border-primary p-1 py-2 outline-primary w-40 md:w-60 " />
                        </div>
                        {formik.errors.repoUrl ? <div className='text-xs ml-4 mt-2 text-red-400'>{formik.errors.repoUrl}</div> : null}
                    </div>
                    <div>
                        <div className='pt-5 mx-1'>
                            <label className='text-sm mb-1'>JIRA URL</label>
                            <input
                                id='jiraUrl'
                                name='jiraUrl'
                                onChange={formik.handleChange}
                                value={formik.values.jiraUrl}
                                type="text"
                                className="border-dark-2 border text-xs md:px-10 rounded-full hover:border-primary p-1 py-2 outline-primary w-40 md:w-60" />
                        </div>
                        {formik.errors.jiraUrl ? <div className='text-xs ml-4 mt-2 text-red-400'>{formik.errors.jiraUrl}</div> : null}
                    </div>
                </div>

                <div className='pt-5 mx-5'>
                    <div className='text-sm mb-1'>Change Description</div>
                    <textarea
                        id='description'
                        name='description'
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        type="text"
                        className="border-dark-2 border text-xs px-10 rounded-md hover:border-primary p-1 outline-primary w-full h-20 "
                    />
                    {formik.errors.description ? <div className='text-xs mt-2 text-red-400'>{formik.errors.description}</div> : null}

                </div>
                <div className='pt-5 mx-5'>
                    <div className='text-sm mb-1'>Change Reason</div>
                    <textarea
                        id='changeReason'
                        name='changeReason'
                        onChange={formik.handleChange}
                        value={formik.values.changeReason}
                        type="text"
                        className="border-dark-2 border text-xs px-10 rounded-md hover:border-primary p-1 outline-primary w-full h-20"
                    />
                    {formik.errors.changeReason ? <div className='text-xs mt-2 text-red-400'>{formik.errors.changeReason}</div> : null}
                </div>

                <input
                    id="selected_images"
                    multiple
                    type='file'
                    name='documentRequest'
                    className=' text-primary text-sm mx-5 mt-5'
                />


                <div className=' flex justify-end'>
                    <button
                        type='submit'
                        className='mb-3 bg-primary rounded-full mt-10 px-4 py-1 text-white text-sm'>Proceed</button>

                </div>


            </form>
        </>
    )
}

export default Step0