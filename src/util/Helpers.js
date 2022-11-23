export const errorMessage = error => {

    let message = "";
    if (error.response && error.response.data.error) {
        message = error.response.data.error;
    } else if (error.response && typeof (error.response.data.message) === "object") {
        for (let key in error.response.data.message) {
            message += `${error.response.data.message[key]} `;
        }
    } else if (error.response && typeof (error.response.data.message) === "string") {
        message = error.response.data.message;
    } else {
        message = error.message;
    }

    return message;
}