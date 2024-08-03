import { FormikProps } from 'formik';

export interface FormValues {
    name: string;
    email: string;
    phone: string;
}

export interface BookingData extends FormValues {
    date: string;
}

export interface BookingFormProps {
    onSubmit: (values: FormValues) => void;
    onCancel: () => void;
    ModalVisible: boolean;
    submitError: string | null;
    formikRef: React.RefObject<FormikProps<FormValues>>;
    resetCallback: () => void;
}
