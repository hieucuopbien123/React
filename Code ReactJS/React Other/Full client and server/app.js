// # Full client and server

// ## NodeJS / # Dùng mssql
// ## NodeJS / # Dùng nodemon / Dùng concurrently

const express = require("express");
const app = express();
const sql = require("mssql");

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

var config = {
    server: "localhost\\SQLEXPRESS",
    database: "Test",
    user: "Trang",
    password: "180101",
    options: {
        trustedConnection: true,
        instanceName: "SQLEXPRESS",
        trustServerCertificate: true
    }
}

var conn = new sql.ConnectionPool(config);
var requestSQL = new sql.Request(conn);

conn.connect(err => {
    if(err)
        console.log("Error: ", err);
    // chú ý link mặc định '/' là file html hiển thị nên sẽ gửi file đó ta phải tránh link đó ra
    app.get("/api/first", (req,res) => {
        requestSQL.query("SELECT * FROM Table1", (err, recordset)=>{
            if(err)
                    console.log("Error: ", err);
            else{
                res.send(recordset.recordset)
                // Chú ý nếu ta send đi kiểu {data: recordset.recordset} thì nó nhận kp là 1 mảng mà là 1 object 
                // chứa mảng -> tức là bên client phải get là res.data.data mới ra mảng -> thôi thì ta gửi bth 
                // k chuyển sang object nx
            }
        })
    })
})
// Request chỉ đc dùng trong get/post và connect

app.post('/api/add', (req, res) => {
    var sqlQuery = "INSERT INTO Table1(Name,Age) VALUES('" + req.body.Name + "','" + req.body.Age + "')";
    requestSQL.query(sqlQuery, (err)=> console.log(err));
    requestSQL.query("SELECT * FROM Table1", (err, recordset)=>{
        if(err)
                console.log("Error: ", err);
        else{
            res.send(recordset.recordset)
        }
    })
})

app.post('/api/erase', (req, res) => {
    var sqlQuery = "DELETE FROM Table1 WHERE Name='" + req.body.Name+ "'";
    requestSQL.query(sqlQuery, (err)=> console.log(err));
    requestSQL.query("SELECT * FROM Table1", (err, recordset)=>{
        if(err)
                console.log("Error: ", err);
        else{
            res.send(recordset.recordset)
        }
    })
})

app.post('/api/update', (req, res) => {
    var sqlQuery = "UPDATE Table1 SET Name='" + req.body.Name + "', Age='" + req.body.Age
    + "' WHERE Name='" + req.body.index + "'";
    requestSQL.query(sqlQuery, (err)=> console.log(err));
    requestSQL.query("SELECT * FROM Table1", (err, recordset)=>{
        if(err)
                console.log("Error: ", err);
        else{
            res.send(recordset.recordset)
        }
    })
})

app.listen(4000,() => console.log("Hello from server"))
