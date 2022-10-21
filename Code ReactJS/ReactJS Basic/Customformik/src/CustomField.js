import React from "react";
import CustomFieldMain from "./CustomFieldMain";

// Đây là cách custom nhưng thực ra cũng chỉ là dùng như bth lấy các trường của component cũ nhập vào hiện tại
// và các trường nào lấy thì lấy, k lấy thì tự tạo mới chả có gì
// Ở đây ta dùng thêm 1 component trung gian là CustomField là để tái sử dụng được CustomFieldMain trong nhiều nơi khác
// vì nếu dùng TT fix cứng thì CustomFieldMain chỉ dùng ở đây, k thể tái sử dụng chỗ khác
const CustomField = (props) => {
    const {field, form, label} = props;
    const {name, value, onBlur} = field;

    const handleImageUrlChange = (newImageUrl) => {
        console.log(form);
        form.setFieldValue(name, newImageUrl);
        // Hàm của formik làm thay đổi thuộc tính gì thành mang giá trị gì, chú ý name ở đây là nói giá trị value sẽ 
        // bị đổi. Nhớ rằng hàm này để update value còn onChange thì buộc phải truyền vào event 
    }
    return(
        <div>
            {label && <label for={name}>{label}</label>}
            <CustomFieldMain
                name={name}//thuộc tính nào lấy thì truyền vào 
                imageUrl={value}
                onImageUrlChange={handleImageUrlChange}
                onRandomButtonBlur={onBlur}
            />
        </div>
    )
}
export default CustomField;