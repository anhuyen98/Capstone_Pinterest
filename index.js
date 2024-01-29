import express from 'express';
import cors from 'cors'
import rootRoutes from './src/routes/rootRoutes.js';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
const port = 8081

app.use(express.json())
// app.use(express.static('.'))
app.use(cors())
app.use(rootRoutes)
app.listen(port, () => {
    console.log(`Starting with port ${port}`)
})

app.get('/', async (req, res) => {
    let data = await prisma.comments.findMany()
    res.send(data)
})