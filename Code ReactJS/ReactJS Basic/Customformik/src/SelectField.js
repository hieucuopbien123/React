import React from "react";

const SelectField = (props) => {
    const {
        field, form, // Của formik có sẵn
        options, label, placeholder // Ta custom truyền vào
    } = props;
    const {name, onChange, onBlur, value} = field;
    // Formik cũng chỉ cung cho ta lợi thế là 2 biến field và form ở mỗi component input. Các thuộc tính khác toàn 
    // là ta tự truyền vào formik handle cái onChange thì value là gì, chỉ cần đặt trường name trong Formik trùng 
    // với tên thuộc tính là được

    // 1 số thư viện select nó custom lại cái select onChange thì nó k gửi event mà chỉ gửi giá trị. Khi đó ta có thể 
    // tự chuyển sang event ít nhất 2 trường name và value để xử lý như dưới. 
    // Nếu là event thì mặc định nó tự xử lý cho ta rồi
    // const handleSelectedOptionChange = (selectedOption) => {
    //     console.log(selectedOption);
    //     const selectedValue = selectedOption ? selectedOption.value : selectedOption;
    //     const changeEvent = {
    //         name: name,
    //         value: selectedValue
    //     }
    //     field.onChange(changeEvent);
    // }
    return (
        <form>
            {label && <label for={name}>{label}</label>}
            <select
                id={name}
                {...field}
                // onChange={handleSelectedOptionChange}
                placeholder={placeholder}
            >
                {options.map((data) => (
                    <option value={data.value}>{data.label}</option>
                ))}
            </select>
        </form>
    )
}

export default SelectField;