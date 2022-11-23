import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup";
import { useNavigate, redirect } from 'react-router-dom';
import browserSignature from "browser-signature";

export const signature = localStorage.getItem("device") ?? browserSignature();

// Add device signature to localstorage if not present
if (!localStorage.getItem("device")) {
    localStorage.setItem("device", signature)
}


const OtpValidation = () => {
    // const user = useSelector( ({auth}) => (auth.user), shallowEqual);


    const navigate = useNavigate();

    const [isRequested, setIsRequested] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const cancel = () => {
        navigate("/login")
    }

    const OtpValidationSchema = Yup.string()
        .matches(/^[0-9]{6}$/, "Only numbers allowed")
        .length(6, "Six Digit")
        .required()
        ;

    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "is-invalid";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "is-valid";
        }

        return "";
    };
    let token = JSON.parse(window.localStorage.getItem("token"))


    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: OtpValidationSchema,
        onSubmit: async (values) => {
            // otpValidation({ ...values })
            //     .then(({ data }) => {
            //         setIsRequested(true);
            //         const history = props.history
            //         console.log(history) 
            //         /* Mauintain Usergroup Data */
            //          // data = {...data, userGroup: user.userGroup};
            //         props.fulfillUser(data, history);
            //     })
            //     .catch(error => {
            //         setIsRequested(false);
            //         console.log(error);
            //     });
            // admin
            // user
            setIsLoading(true);
            await axios.post(`https://oversight.trovefinance.net/api/auth/2fa-otp`,
                {
                    'otp': values.otp
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'signature': signature,
                        'trv-app-key': 'trove',
                        'authorization': `Bearer ${token}`
                    },
                }
            ).then(response => {
                console.log(response)
                if (response.status === 200) {
                    window.localStorage.setItem("email", JSON.stringify(response.data.email))
                    setIsLoading(false);
                    navigate("/newchange");
                }
                setIsRequested(true);
            }).catch(error => {
                console.error('There was an error!', error);
                setIsRequested(false);
                setIsLoading(false);
            });


            // let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Njg1NjYyNjAsImlhdCI6MTY2ODUyMzA2MCwibmJmIjoxNjY4NTIzMDYwLCJpZGVudGl0eSI6IjNhZTk0NzhhLThmYzAtNDk5Zi04Njg2LWY2YmE3OGI1MGEwMCJ9.Z3DGfLoIs_9qSFTA3Irjng--Qs02sLaPrcfxOZ1J6Qo";
            // await axios.get(`https://oversight.trovefinance.io/api/admins/me`, {
            //   headers:{
            //     'content-type': 'application/json',
            //     'authorization': `Bearer ${token}`
            //   }
            // }).then((e)=>{
            //   console.log("Done")
            //   console.log(e)
            // }).catch((e)=>{
            //   console.log("Error")
            //   console.log(e)
            // })
            // console.log(values)



        },

    })



    return (
        <>
            {isRequested && redirect("/login")}
            {!isRequested && (
                <div className="flex min-h-screen">
                    <div className='w-2/5 relative'>
                        <img src={`/media/images/bg-1.jpg`} alt="" className="absolute min-h-screen" />
                        <div className='flex flex-col justify-between absolute p-6'>
                            <img src={`/media/images/trove-logo.png`} alt="" className=" w-28 h-12 " />
                            <div className=' ml-28 text-2xl justify-center mt-60 md:ml-12 text-gray-2 font-bold text-center'>CONTROL PORTAL</div>
                        </div>
                    </div>
                    <div className='w-3/5'>

                        <form onSubmit={formik.handleSubmit}>
                            <div className=' mt-48'>
                                <div className=' text-center'>
                                    <div className=' font-bold text-lg'>ENTER OTP</div>
                                    <div className=' text-xs mt-1 text-dark-1'>OTP sent to your account email (expire in 15 minutes)</div>
                                </div>
                                <div className='flex justify-center'>
                                    <input
                                        id='otp'
                                        name='otp'
                                        onChange={formik.handleChange}
                                        value={formik.values.otp}
                                        type='text'
                                        className={`border-2 rounded-full text-sm py-1 w-2/5 px-3 mt-9 text-center bg-slate-50 outline-primary ${getInputClasses("otp")}`}
                                    />
                                </div>
                                {formik.touched.otp && formik.errors.otp ? <div className='text-xs text-center mt-2 text-red-400'>{formik.errors.otp}</div> : null}

                                <div className='flex justify-center mt-10'>
                                    {isLoading
                                        ?
                                        <div>
                                            <button
                                                disabled
                                                type="button"
                                                className="py-2 mx-10 px-4 mr-2 text-sm font-medium text-primary bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                                <svg className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                Sign In
                                            </button>
                                            <button
                                                type="submit"
                                                className=" bg-success-light text-primary rounded-full text-sm px-4 py-2 mx-10"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <button
                                                type="submit"
                                                className=" bg-primary rounded-full text-sm px-4 py-2 mx-10"
                                            >
                                                Sign In
                                            </button>
                                            <button
                                                onClick={cancel}
                                                type="submit"
                                                className=" bg-success-light text-primary rounded-full text-sm px-4 py-2 mx-10"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    }

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default OtpValidation