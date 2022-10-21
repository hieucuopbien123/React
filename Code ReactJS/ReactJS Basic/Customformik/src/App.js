// # Dùng các thư viện chức năng / Dùng formik

import { Formik, Form, FastField, ErrorMessage } from 'formik';
import CustomField from './CustomField';
import InputField from './InputField.js';
import SelectField from './SelectField';

function App() {
  const initialValues = {
    title: '',
    name: '', // Mỗi 1 control là phải có giá trị ban đầu
    category: null,
    photo: null
  }
  return (
    // Nó chỉ là cung các component kiểu bên ngoài như này xong wrapper vào cái form thực sự bên trong
    <Formik
      initialValues={initialValues}
      onSubmit={value => console.log(value)} // Tự có preventDefault r
    >
      { formikProps => {
        const {values, errors, touched} = formikProps;
        console.log({values, errors, touched});
        // Nếu có error thì trường errors sẽ ra lỗi
        return(
          <Form>
            {/* Input Field bình thường */}
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="Test"
            />
            <FastField
              name="name"
              component={InputField}
              label="Name"
              placeholder="Test"
            />
            <ErrorMessage name="email" component="div" />
            {/* Select Field */}
            <FastField
              name="category"
              component={SelectField}
              label="Category"
              placeholder="This is select placeholder"
              options={[
                {value: 1, label: "Tech"},
                {value: 2, label: "Education"}
              ]}
            />
            {/* Custom Form */}
            <FastField
              name="photo"
              component={CustomField}
              label="Photo"
            />
            {/* Submit éo khác gì bth */}
            <button type='submit'>Submit</button>
          </Form>
        )
      }}
    </Formik>
  );
}
// Nếu các Form phụ thuộc lẫn nhau thì dùng Field, các Form độc lập với nhau thì dùng FastField
// FastField chỉ render lại khi ta tác động tới Field của nó, kể cả các Field khác rerender lại thì nó cx k rerender
// Ngược lại Field thì thay đổi gì nó cũng rerender lại

export default App;
