import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input, Button, Modal } from 'antd';
import * as Yup from 'yup';
import { BookingFormProps } from '../../interfaces/FormValues';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
});

const BookingForm: React.FC<BookingFormProps> = ({
    onSubmit,
    submitError,
    ModalVisible,
    resetCallback,
    formikRef
}) => {

    const handleCancel = () => {
        if (formikRef.current) {
            formikRef.current.resetForm();
        }
        resetCallback();
    };

    const inputErrStyle: string = 'border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-200 focus:shadow-sm focus:shadow-red-200 shadow shadow-red-200 text-red-600'
    const inputStyle: string = 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 text-blue-900'

    return (
        <Modal
            title="Book a Slot"
            open={ModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Formik
                innerRef={formikRef}
                initialValues={{ name: '', email: '', phone: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, isSubmitting, values }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2">Name</label>
                            <Field name="name" as={Input} className={errors.name && touched.name ? inputErrStyle : inputStyle} />
                            <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <Field name="email" as={Input} className={errors.email && touched.email ? inputErrStyle : inputStyle} />
                            <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block mb-2">Phone</label>
                            <Field name="phone" as={Input} className={errors.phone && touched.phone ? inputErrStyle : inputStyle} />
                            <ErrorMessage name="phone" component="div" className="text-red-500 mt-1" />
                        </div>

                        {submitError && <div className="text-red-500 mb-4">{submitError}</div>}

                        <div className="flex">
                        <Button
                        className='flex-grow'
                            type="primary"
                            htmlType="submit"
                            disabled={isSubmitting || Object.keys(errors).length > 0 || !values.email || !values.name || !values.phone}
                            onClick={() => console.log(values)}
                        >
                            {isSubmitting ? 'Booking...' : 'Book'}
                        </Button>
                        <Button
                            type="default"
                            onClick={handleCancel}
                            className="ml-4"
                        >
                            Cancel
                        </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default BookingForm;
