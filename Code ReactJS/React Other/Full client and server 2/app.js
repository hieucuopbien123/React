// # Full client and server

// ## NodeJS / # Dùng mssql
// ## NodeJS / # Dùng nodemon / Dùng concurrently 

const express = require('express');
const app = express();
const sql = require('mssql'); // Tạo biến thao tác với mssql
// Đây là 1 object khổng lồ có nhiều method và property để thao tác với mssql
// Đây là code NodeJS backend server -> nó vẫn dùng javascipt

// Để sử dụng đc dữ liệu của post với req.body thì phải sử dụng thư viện body-parse nhưng đã deprecated và tích hợp sẵn
// trong express nên chỉ cần thực hiện như dưới. Hàm use là sử dụng cái gì trong app. Hàm urlencoded hỗ trợ encode url.
// Hàm json hỗ trợ encode json
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

var test = null;
// console.log("Logout: ", sql);

// Connect với Microsoft SQL Server, cách tạo config để connect
// C1: Dùng connection string
// C2: Dùng Config Object -> server luôn là: localhost\<tên instance> or dùng DESKTOP-GN3V8MM\<tên instance> nếu muôn. 
// Như bên dưới là tối thiểu để chạy. user và password là bắt buộc vì trong đây nó éo cho dùng window authentification.
var config = {
    server: 'localhost\\SQLEXPRESS',
    database: 'Test',
    user: 'Binh',
    password: '1801',
    options: {
        //trustedConnection: true,
        instanceName: "SQLEXPRESS",
        trustServerCertificate: true // Do k có chứng chỉ nên mặc định ta tạo ra nên phải có cái này tránh lỗi
    }
};

// Cách để connect
// C1: dùng hàm connect trực tiếp của SQL
// sql.connect(config, function (err) {
//     if (err) console.log(err);
//     var request = new sql.Request();
//     request.query('select * from Table1', function (err, recordset) {
//         if (err) 
//             console.log(err)
//         test = recordset.recordset;
//         console.log("Data: ", recordset);
//     });
// });
// Hàm connect của sql có vai trò kết nối và xử lý dữ liệu với database server có thông tin là đối số 1 => 1 là Config
// Object, 2 là hàm số xử lý dữ liệu nhận đối số error nếu có.
// Phương thức Request của sql sẽ trả ra 1 biến request. Nó có hàm query để thực hiện lệnh query bất kỳ trên SQL, 1 là 
// lệnh query của sql, 2 là hàm số nhận 1 lưu err, 2 lưu kết quả hiển thị của lệnh query
// kết quả query lưu dưới dạng 1 object và data thuần mà ta cần nằm trong thuộc tính recordset. Nó lưu dữ liệu là 1 
// object bên trong chứa các attribute và attribute recordset là 1 mảng các object mỗi phần tử là của mảng là 1 object 
// hay 1 row của table trong sql
// => Ở trên tức là thực hiện bất đồng bộ nếu connect được thì tạo request, nếu request query được thì lấy data, 
// tất cả đều asynchronous

// Cách 2 dùng ConnectionPool: khởi tạo 1 connection pool nhận 1 là config object, 2 là callback function xử lý lỗi sau
// khi tạo nếu có nhận 1 err => dùng cách dưới chuẩn hơn
// Tạo 1 request từ pool sẽ đúng hơn còn trên kia là tạo 1 request chung.
var conn = new sql.ConnectionPool(config);
var requestSQL = new sql.Request(conn);

function testSQL() {
    // conn.connect().then(() => {
    //     // Khi dùng callback functiton thì trong js luôn có 1 cách khác là trả ra promise -> cả hàm connect và query
    //     requestSQL.query('').then(recordset => {
    //         //code
    //     })
    //     .catch(error => console.log(error))
    // })
    // .catch((err) => {console.log(error)})

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        requestSQL.query("SELECT * FROM Table1 ORDER BY name ASC", function (err, recordset) {
            if (err) {
                console.log(err);
            } else {
                test = recordset.recordset;
                console.log(test)
                // Chú ý hàm get dưới sẽ k chạy nếu ta k gọi app.listen, tức lưu lại, có client gọi thì chạy
                app.get('/api/new', function (req, res) {
                    console.log("Get chạy lại mỗi khi refresh");
                    res.send({
                        new: test
                    });
                    // Tức là gửi 1 object có attribute new là 1 mảng các object phần tử
                    // biến test ra ngoài bị mất do ta dùng conn.close() nên ta nhét này vào trong => k nên như v, ta 
                    // nên lưu vào biến r gọi get ở ngoài sau đó mới close. Tiện thể server luôn bật nên duy trì 1 biến
                    // mãi mãi sẽ tốt hơn, chả cần đóng nx
                });
            }
            // conn.close(); // Dùng xong thì đóng lại
        })
    })
}
testSQL();
// Để app.get trong connect như này k hay vì mỗi lần gọi nó k query lại server mà nó chỉ chạy fix cứng ở lần đầu tiên. 
// và gửi tiếp biến test đã có. Nó k chạy lại để sinh lại biến test. Vd ta chạy server -> vào database sửa tt -> refresh
// website -> gọi lại hàm app.get('/api/new') nhưng data vẫn là biến test cũ vì k chạy lại query là sai
// fix rất đơn giản như version 2 có fix, ta gọi query trong get là được

app.post('/api/insert', function (req, res) {
    var command = "INSERT " + "INTO Table1(Name,Age) " + "VALUES('" + req.body.Name + "','" + req.body.Age + "')";
    requestSQL.query(command, function (err, results) {
        if (err)
            throw err;
    });
    // req là request client gửi tới là 1 object với .body sẽ chứa dữ liệu vào dưới dạng object
    requestSQL.query("SELECT * FROM Table1 ORDER BY name ASC", function (err, recordset) {
        if (err) {
            console.log(err);
        } else {
            test = recordset.recordset;
            res.send({
                new: test // Gửi lại client bằng đúng biến res của hàm post là response lại client như thế nào
                // Ở đây ta trả lại toàn bộ dữ liệu mới luôn chứ éo phải mỗi cái mới thêm mới đầy đủ đc
                // Cái này là cái báo lại hàm axios post là 1 promise thành công thực hiện then nhận tham số ta gửi 
                // lại này, k có thì k thành công
            });
        }
    })
});

app.post('/api/edit', (req, res) => {
    var sql = "UPDATE Table1 SET " + "Name='" + req.body.Name + "'," + "Age='" + req.body.Age + "' "
                + "WHERE Name='" + req.body.Name + "'";
    // Do ta sai lầm khi k có trường id nên coi tên là id v. Nên có id là pivkey
    console.log(sql);
    requestSQL.query(sql, function(err, results) {
        if (err) 
            throw err;
    });
    // Nên nhét bên dưới này vào call back hàm trên
    requestSQL.query("SELECT * FROM Table1 ORDER BY name ASC", function (err, recordset) {
        if (err) {
            console.log(err);
        } else {
            test = recordset.recordset;
            res.send({
                new: test
            });
        }
    })
});

app.post('/api/delete', (req, res) => {
    var sql = "DELETE FROM Table1 " + "WHERE Name='" + req.body.name + "'";
    requestSQL.query(sql, function(err, results) {
        if (err) 
            throw err;
    });
    requestSQL.query("SELECT * FROM Table1 ORDER BY name ASC", function (err, recordset) {
        if (err) {
            console.log(err);
        } else {
            test = recordset.recordset;
            res.send({
                new: test
            });
        }
    })
});

app.listen(4000, function () {
    console.log('Server is running..');
}); // Chú ý phải trùng cái port mà client dùng proxy

// app.get('/api/test', (req, res) => res.send('Hello World!'));
// app.get('/api/test', (req, res) => {
//     res.json({ message: 'I am a message from Server!'});
// })
// lấy dữ liệu API bằng JSON gửi cho client react, dùng send cx đc

// app.listen(4000, () => console.log('App listening on port 4000'));
// Ở trên đây ta tạo ra 1 API. Hàm require thêm toàn bộ express trong đó có hàm express() trả về 1 Express Application
// hàm get là 1 API đơn giản, in ra màn hình nội dung hello world với hàm send của response, k dùng biến request
// app.listen là cho cái app lắng nghe ở cổng nào thì thực hiện function nào
// Tức là chạy cái app này lắng nghe trên cổng 4000 thì chạy call back hiện ra 'App listening on port 4000'
// Liên kết vào cổng đó ví dụ qua browser thì nó nhận request và gửi lại response 'Hello World!'.
// Có thể rê chuột vào code các hàm send, json và listen để xem ví dụ