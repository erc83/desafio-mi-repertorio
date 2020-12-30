const { Pool } = require('pg')

const config = {
    user: 'erc83',
    password: '2210',
    host: 'localhost',
    database: 'repertorio',
    port: 5432
}

const pool = new Pool(config)

async function getDate(){
    const result = await pool.query("SELECT NOW()")
    return result
}

// aqui debe venir un arreglo         dataArray [A dios le pido, juanes, Em]   
async function createCancion(paramsArray){
    const qryObject = {
        text: 'INSERT INTO repertorio (cancion, artista, tono) VALUES ($1, $2, $3)', 
        values: paramsArray
    }

    const result = await pool.query(qryObject)
    return result
} // termino createCancion

// inicio getCanciones
async function getCanciones(){
    const result = await pool.query('SELECT * FROM repertorio')
    return result
}

async function updateCancion(paramsArray){
    const qryObject = {
        text: 
        "UPDATE repertorio set cancion = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *", 
        values: [paramsArray.id, paramsArray.cancion, paramsArray.artista, paramsArray.tono]
    };
    const result = await pool.query(qryObject)
    return result;
}

module.exports = {
    getDate, 
    createCancion,
    getCanciones,
    updateCancion
}
