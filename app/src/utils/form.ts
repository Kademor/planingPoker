export const getFormDataObject = (ref) => {
    const formData = new FormData(ref.current)
    const formDataObject = {}
    formData.forEach((value, key) => {
        formDataObject[key] = value
    })
    return formDataObject
}
