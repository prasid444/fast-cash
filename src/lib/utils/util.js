import { Toast } from "native-base";

/* eslint-disable semi */
/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */



export function showErrorInToast(error={},position='bottom'){
    let errorObj=formatError(error);
    console.log("TO SHOW IN TOAST",errorObj);
    let toast_string=errorObj.message;
    errorObj.description.map((errorString)=>{
        toast_string=`${toast_string} \n ${errorString}`
    })

    Toast.show({
        type:'danger',
        text:toast_string,
        position:position
    })
}
export function formatError(error={}) {
    let _errors={
        message:"",
        description:[]
    }
    if (typeof error.error_message === 'string') {
        _errors={
            message:"Error",
            description:[error.error_message]
        };
    } 
     else if (
        typeof error.validation_errors === 'string'
    ) {
        _errors={
            message:"Validation Error",
            description:[error.validation_errors]
        }
    }
    else if (Array.isArray(error.validation_errors)) {
        _errors={
            message:"Validation Error",
            description:[error.validation_errors[0]]
        }
    } else if (typeof error.validation_errors==='object') {
        let error_messages = errorsFromObject(error.validation_errors)
        _errors={
            message:"Validation Error",
            description:error_messages
        }
    }
    return _errors;
}

function errorsFromObject(error_obj = {}) {
    let error_list = [];

    Object.keys(error_obj).map((key, index) => {
        let error_item = error_obj[key];
        if (typeof error_item === 'string') {
            error_list.push(error_item)
        }
        else if (Array.isArray(error_item)) {
            error_list.push(`${key} : ${error_item[0]}`)
        } else if (typeof error_item === 'object') {
            error_list.push(...errorsFromObject(error_item))
        }
    });
    return error_list;
}
