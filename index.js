'use strict'


const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env?.PORT || 8000
const HOST = process.env?.HOST || '127.0.0.1'

app.all('/', (req, res) => {
    res.send('Todo App')

})


app.use(express.json())
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sqlite:./db.sqlite3')

const Todo = sequelize.define('table_1', {
    // id: {
    //     type: DataTypes.BIGINT,
    //     primaryKey: true,
    //     unique: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //     comment: 'myComment',
    //     field: 'customName',
    //     defaultValue: 'default_value',

    // },
    title: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    description: DataTypes.TEXT,
    isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    priority: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    // createdDate: {
    //     type: DataTypes.DATE,

    // }

})
sequelize.sync({ force: true })
sequelize.authenticate()
    .then(() => console.log('DB Connected'))
    .catch(() => console.log('DB not connected'))



const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res?.errorStatusCode || 500
    res.status(errorStatusCode).send({
        error: true,
        status: false,
        message: err.message,

    })
}
app.listen(PORT, () => console.log(`server runned http://${HOST}:${PORT}`))