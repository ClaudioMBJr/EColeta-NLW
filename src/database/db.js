//importar a dependencia do sqlite 3

const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no banco de dados

// const db = {
//     propriedade: "valor"
// }

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de banco de dados, para nossas operações

db.serialize(() => {
    //com comandos SQL:
//     //1.criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             img TEXT,
//             adress TEXT,
//             adress2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `) 
//     //2.inserir dados na tabela 
//     const query = `
//         INSERT INTO places(
//             name,
//             img,
//             adress,
//             adress2, 
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//    `
//     const values = [
//         "Papersider",
//         "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&auto=format&fit=crop&w=861&q=80",
//         "Guilherme Gemballa, Jardim América",
//         "260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err){
//         if (err){
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso!")
//         console.log(this)
//     }


//     db.run(query, values, afterInsertData)

//     //3.consultar os dados da tabela 

//     db.all(`SELECT * FROM places`, function(err,rows){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Segue os registros encontrados")
//         console.log(rows)
//     })

    //4.deletar os dados da tabela

    // db.run(`
    //     DELETE FROM places WHERE id = ?`, [1], function(err){
    //         if(err){
    //             return console.log(err)
    //         }
    //         console.log("registro deletado com sucesso")
    //     }
    // )

    // db.run(`DROP TABLE places`,function(err){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Tabela deletada com sucesso")
    // })
 })