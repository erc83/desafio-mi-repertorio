const http = require('http')
const fs = require('fs')
const db = require('./db')
const url  = require('url')

const server = http.createServer(async(req,res)=>{
    if(req.url == '/' && req.method == 'GET'){
        fs.readFile('./views/index.html',(err, file)=>{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(file, 'utf-8')
            res.end()
        })
    }    
    if(req.url == '/ahora' && req.method == "GET"){
        res.writeHead(200, {'Content-Type':'application/json'})
        const result = await db.getDate()
        res.write(JSON.stringify(result))
        res.end()
    }

    //nueva cancion
    if(req.url == '/cancion' && req.method == "POST"){
        req.on('data', body => {
            params = body;
        });
        req.on('end', async ()=>{
            const paramsArray = Object.values(JSON.parse(params)) // llegamos al buffer y agregamos JSON.parse    //Object.values para extraer informacion
            //console.log(Object.values(JSON.parse(params)))
            const result = await db.createCancion(paramsArray)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(result))      //JSON.parse es cuando quiero pasar de un string a objeto de javascript
            res.end()
        });
    }
        //mostrar canciones
    if(req.url == '/canciones'  && req.method == 'GET'){
        const result = await db.getCanciones()
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(result.rows))      //JSON.stringify es cuando quiero pasar de un objeto a string
            res.end()
    }
        //update cancion
    if(req.url == '/cancion' && req.method == 'PUT'){
        let params = null;
        req.on('data', (body) => {
            params = body;
        });
        req.on('end', async ()=>{
            const paramsArray = Object.values(JSON.parse(params)) 
            const result = await db.updateCancion(paramsArray);
            console.log(result);
            res.writeHead(200, {"Content-Type": "application/json"})
            res.write(JSON.stringify(result))
            res.end()
        });
    }
    

})
server.listen(3000, ()=> console.log('escuchando 3000'))