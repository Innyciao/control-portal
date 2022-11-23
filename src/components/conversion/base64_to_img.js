import React from 'react';

const Base64ToImg = ({fileDetails}) => {

    // const [file, setFile ] = useState()


    // useEffect(()=>{
    //     dataURLtoFile()
    // }, [])

    // const dataURLtoFile = () => {
    //     var dataurl = fileDetails['base64String'];
    //     var filename = fileDetails['fileExtension']
    //     let arr = dataurl.split(','),
    //         mime = arr[0].match(/:(.*?);/)[1],
    //         bstr = atob(arr[1]),
    //         n = bstr.length,
    //         u8arr = new Uint8Array(n);
    
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    
    //     setFile(new File([u8arr], filename, { type: mime }));
    // }
   
    return (
        <div>
         RETURN AN IMAGE!
{/* 
        <img src={file} alt="Error!!" /> */}
        </div>
    )
}

export default Base64ToImg