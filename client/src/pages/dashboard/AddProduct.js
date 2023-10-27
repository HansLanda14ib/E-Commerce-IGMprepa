import {FormRow, FormRowSelect, Alert} from '../../components/dashboard'
import {useAppContext} from '../../context/user_context'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import React, {useState} from "react";
import ColorPicker from "../../components/dashboard/ColorPicker";

const AddJob = () => {
    let {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        handleChange,
        clearValues,
        createProduct,
        uploadImage,
        //editProduct,
        editJobId,
        name,
        price,
        description,
        images,
        category,
        categoryOptions,
        companyOptions,
        company,
        colors,
        addColor,
        featured,
        freeShipping,
        inventory
    } = useAppContext()
    const [selectedFiles, setSelectedFiles] = useState([]);
    const formData = new FormData();

    const handleFileChange = (event) => {
        const filesArray = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...filesArray]);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name || !price || !description || !category || !company || !inventory) {
            displayAlert()
            return
        }
        /* if (isEditing) {
             editJob()
             return
         } */
        createProduct()

    }
    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({name, value})
    }

    const handleChangeImage = async () => {
        selectedFiles.forEach((file) => {
            formData.append('image', file);
        });
        console.log(formData);
        await uploadImage(formData);
    };

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'edit product' : 'add product'}</h3>
                {showAlert && <Alert/>}
                <div className='form-center'>
                    {/* name */}
                    <FormRow
                        type='text'
                        name='name'
                        value={name}
                        handleChange={handleJobInput}
                    />
                    {/* description */}
                    <FormRow
                        type='text'
                        name='description'
                        value={description}
                        handleChange={handleJobInput}
                    />
                    {/* price */}
                    <FormRow
                        type='number'
                        labelText='price (USD)'
                        name='price'
                        value={price}
                        handleChange={handleJobInput}
                    />
                    {/* inventory */}
                    <FormRow
                        type='number'
                        labelText='inventory'
                        name='inventory'
                        value={inventory}
                        handleChange={handleJobInput}
                    />
                    {/* product category */}
                    <FormRowSelect
                        name='category'
                        value={category}
                        handleChange={handleJobInput}
                        list={categoryOptions}
                    />
                    {/* company : type top or bottom */}
                    <FormRowSelect
                        name='company'
                        labelText='product type'
                        value={company}
                        handleChange={handleJobInput}
                        list={companyOptions}
                    />
                    {/* upload image */}
                    <div className='form-row'>
                        <label htmlFor='image' className='form-label'>
                            Upload Image
                        </label>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                        <br/>
                        <button
                            type='submit'
                            className='btn'
                            onClick={handleChangeImage}
                            disabled={isLoading}
                        >
                            upload
                        </button>
                    </div>
                    <div className='form-row'>
                        <ColorPicker/>
                    </div>

                    {/* btn container */}
                    <div className='btn-container'>
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                        <button
                            className='btn btn-block clear-btn'
                            onClick={(e) => {
                                e.preventDefault()
                                clearValues()
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob
