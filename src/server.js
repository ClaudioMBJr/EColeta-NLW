const express = require("express")
const server = express()

//pegar o banco de dados

const db = require("./database/db.js")

//configurar pasta pública

server.use(express.static("public"))

//habilitar o uso do req.boy

server.use(express.urlencoded({ extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da minha aplicação
//página inicial
//req: requisição
//res: resposta
server.get("/", function(req, res) {
    return res.render("index.html", { title: "Um título"})
})

server.get("/creat-point", function(req, res) {
    //req.query é o query strings da url
    // req.query()
    return res.render("creat-point.html",{saved: false})
})

server.post("/save-point", function(req, res) {
    // //req.body método usado para pegar os dados do formulário quando method = POST
    // //req.body()
    // // console.log(req.body)
    // // //inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            name,
            img,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.name,
        req.body.img,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if (err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)
        return res.render("creat-point.html", { saved: true})
    }

    db.run(query,values, afterInsertData)

    // db.all(`
    //     SELECT * FROM places`, function(err,rows){
    //         if(err){
    //             return console.log(err)
    //         }
    //         console.log(rows)
    //     })
})

server.get("/search", function(req, res) {
    const search = req.query.search
    if(search == ""){
        return res.render("search-results.html", { total: 0})
    }else{
        //pegar os dados do banco de dados
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows){
            if(err){
                return console.log(err)
            }
            const total = rows.length;
            // console.log(rows)
            //mostrar a página html com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total})
        })
    }    
})

//ligar o servidor

server.listen(3000)