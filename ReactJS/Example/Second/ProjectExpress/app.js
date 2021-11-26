const express = require('express');
const app = express();
const sql = require("mssql");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

var config = {
    server: "localhost\\SQLEXPRESS",
    database: "Training",
    user: "UserTest",
    password: "1234",
    options: {
        instanceName: "SQLEXPRESS",
        trustServerCertificate: true
    }
}
var conn = new sql.ConnectionPool(config);
var requestSQL = new sql.Request(conn);
conn.connect(function (err) {
    if(err)
        console.log(err);
})

app.get("/api/get",function (req,res){
    requestSQL.query("SELECT * FROM TrainingTable", function (err,recordset){
        if(err)
            console.log(err);
        else
        {
            res.send({
                data: recordset.recordset
            })
        }
    })
})
app.post("/api/post",function(req,res){
    var command = "INSERT " + "INTO TrainingTable(Name,Age,id,Description) " + "VALUES('" + req.body.name + "','" + req.body.age + "','" +
    req.body.id + "','" + req.body.description + "')";
    requestSQL.query(command)
    .then(() => {
        res.send({});
    }).catch(function(err) {console.log(err)})
})
app.post("/api/delete",function(req,res){
    var command = "DELETE FROM TrainingTable " + "WHERE id='" + req.body.id + "'";
    requestSQL.query(command)
    .then(() => {
        res.send({})
    })
    .catch(function(err) {console.log(err)})
})
app.post("/api/update",function(req,res){
    var command = "UPDATE TrainingTable SET " + "Name='" + req.body.Name + "'," + "Age='" + req.body.Age + "'," 
    + "Description='" + req.body.Description + "'"+ " WHERE id='" + req.body.id + "'";
    requestSQL.query(command)
    .then(() => {
        res.send({})
    })
    .catch(function(err) {console.log(err)})
})

app.listen(4000, function(){
    console.log("Server is listening");
})