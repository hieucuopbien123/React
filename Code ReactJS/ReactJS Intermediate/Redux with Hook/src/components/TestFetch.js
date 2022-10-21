// # React hook cơ bản / Dùng useEffect
// # Custom hook

import React, { Fragment, useState, useEffect, useReducer } from 'react';
import axios from 'axios';

// function TestFetchAxios() {
//     const [data, setData] = useState({ hits: [] });
//     const [query, setQuery] = useState('redux');
//     const [url, setUrl] = useState(
//         'https://hn.algolia.com/api/v1/search?query=redux',
//     );
//     const [isLoading, setIsLoading] = useState(false);
//     const [isError, setIsError] = useState(false);
    
//     // useEffect(async () => {
//     //     //dùng tùy ý các kiểu fetch kết hợp với hook như bth. Sau khi fetch xong ta lưu lại 
//     //     const result = await axios(
//     //         'https://hn.algolia.com/api/v1/search?query=redux',
//     //     );
//     //     setData(result.data);
//     // },[]);
//     //chú ý dùng như trên sai và sẽ bị warning vì effect đc design chỉ dùng với các hàm k là synchronous để tránh race
//     //condition nên k dùng với các hàm async-> nhét nó vào 1 hàm sync để biến nó thành 1 hàm sync thực hiện lâu là đc
    
//     /*useEffect(() => {
//         const fetchData = async () => {
//             const result = await axios(
//                 `http://hn.algolia.com/api/v1/search?query=${query}`,
//             );
//             setData(result.data);
//         };
//         fetchData();
//     }, [query]);
//     */
//     //user nhập vào thì đổi dữ liệu search=> đơn giản gán vào 1 biến. Nhưng nếu như người dùng mới gõ, chả enter gì nó 
//     //cũng fetch lại -> ta muốn ấn enter mới đổi cơ => tạo biến url enter thì đổi
//     //dùng thêm isLoading khi fetch bằng cách gán true, false nhanh như này. Kèm check lỗi luôn với try và biến error
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsError(false);
//             setIsLoading(true);
//             try{
//                 const result = await axios(url);
//                 setData(result.data);
//             } catch(error){
//                 setIsError(true);
//             }
//             setIsLoading(false);
//         };
//         fetchData();
//     }, [url]);

//     return (
//         <Fragment>
//             {/* nên nhét vào form khi có input, button */}
//             <form
//                 onSubmit={ event => {
//                     setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
//                     event.preventDefault();
//                 }}
//             >
//             <input
//                 type="text"
//                 value={query}
//                 onChange={event => setQuery(event.target.value)}
//             />
//                 <button type="submit">Search</button>
//             </form>
//             {isError && <div>Something went wrong ...</div>}
//             {isLoading ? (
//                 <div>Loading ...</div>
//             ) : (
//                 <ul>
//                     {data.hits.map(item => (
//                         <li key={item.objectID}>
//                             <a href={item.url}>{item.title}</a>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </Fragment>
//     );
// }

// Ngắt quãng fetch khi bị gọi async
//Tuy nhiên muốn tái sử dụng hook fetch ở nh hàm thì ta phải biến nó thành custom hook. Chú ý thêm vào giá trị khởi tạo 
//ban đầu thành params vì mỗi lần fetch là khác nhau. Nhưng ta lại thấy cái isLoading và isError nó có quan hệ mật thiết
//với nhau nên ta gom nó vào 1 object và dùng useReducer
const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};
//do kp lúc nào ta cũng get nên axios ta nên thêm vào object chỉ định làm đối số vào hàm là method nào
const useFetchGet = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });
    
    //giải quyết tình huống đang fetch dở thì chuyển url-> ngừng fetch luôn vì k cần update nx. Khi chuyển url, các 
    //component trang này sẽ bị xóa hết, các useEffect sẽ gọi vào hàm return của nó hết. Ta đơn giản chỉ cần gán biến
    //didCancel bằng false. Nếu nó bằng true thì k cần update nx như ở dưới. Hàm fetch của axios k thể nào dừng khi đang
    //fetch được mà ta chỉ cần k update nx thì nó sẽ k render lại và thực hiện chuyển trang luôn
    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });
            try {
                const result = await axios(url);
                if(!didCancel)//đang fetch dở mà kết thúc thì không dispatch cái này
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (error) {
                if(!didCancel)
                    dispatch({ type: 'FETCH_FAILURE' });
            }
        };
        fetchData();
        return () => {
            didCancel = true;
        }
    }, [url]);
    //VD: ấn nút->fetch->đang fetch dở thì chuyển trang-> unmount component-> gọi các hàm return của useEffect-> didCanel
    //thành true-> hiển thị trang mới-> fetch bh mới xong thì didCancel = true-> k dispatch để cập nhập nx mà thực hiện
    //lại với url mới -> chỉ cản k cập nhập chứ k cản vc fetch
    return [state, setUrl];
    // return [{ data, isLoading, isError }, setUrl];
};
function TestFetchAxios() {
    const [query, setQuery] = useState('redux');
    //điều đặc biệt là ta chỉ cần return những cần dùng trong hàm này
    // const [{ data, isLoading, isError }, doFetch] = useFetchGet(
    //     'https://hn.algolia.com/api/v1/search?query=redux',
    //     { hits: [] },
    // );
    const[state, doFetch] = useFetchGet(
        'https://hn.algolia.com/api/v1/search?query=redux',
        { hits: [] },
    );
    //return ra state và hàm để setState mới chuẩn là custom hook này. Khi chuẩn form như thế thì state chỉ tạo 1 lần
    //có tính chất như state bth đó.
    //Luồng: khi render lần đầu tiên-> gặp hook thì cứ khai báo và fetch giá trị mặc định-> nó sẽ chạy vào useFetchGet
    //và là lần đầu tiên url đổi nó sẽ fetch API như bth-> và trả ra dữ liệu và lúc chạy useEffect nó thực hiện 
    //fetch API bất đồng bộ -> do đó các hàm vẫn chạy tiếp và nó trả cho state giá trị loading là true, error là false
    //để hiện ra mọi thứ như bth-> 1 lúc sau hàm fetch chạy xong-> nó dispatch action và cập nhập biến return ra
    //chú ý là khi ta useReducer thì state nó cũng là state var của useFetchGet nên khi state được reducer gán giá trị 
    //mới nó cx chạy lại và return ra-> component này nhận được giá trị return của state tức state var bị đổi sẽ render
    //lại và hiện giá trị mới nhất
    
    return (
        <Fragment>
            <form onSubmit={event => {
                doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
                event.preventDefault();
            }}>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button type="submit">Search</button>
            </form>
            {state.isError && <div>Something went wrong ...</div>}
            {state.isLoading ? (
                <div>Loading ...</div>
            ) : (
                <ul>
                    {state.data.hits.map(item => (
                        <li key={item.objectID}>
                            <a href={item.url}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            )}
        </Fragment>
    );
}
export default TestFetchAxios;

//dùng reducer hook trong cấp độ component nhỏ, còn reducer redux dùng bao mọi component luôn cơ