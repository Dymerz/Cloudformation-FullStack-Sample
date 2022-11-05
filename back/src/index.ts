import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { Pool } from 'pg';

import * as dotenv from 'dotenv';
dotenv.config()

const client = new Pool({
  host: process.env.DATABASE_HOST,
  user: 'postgres',
  password: 'lpsselcelc',
  database: 'example',
  port: 5432
})

const app = express()
const router = express.Router();

app.use(express.json())
app.use(cors())
app.use('/api', router);

router.get('/ping', (req, response) => {
  response.status(200).json({
    status: 'healthy'
  })
})

router.get('/fruits', (req, response) => {
  client
    .query('SELECT * FROM fruits')
    .then(result => {
      console.log(result.rows)
      response.status(200).json(result.rows)
    })
    .catch(response.status(500).json)
})

router.get('/fruits/:id', (req, response) => {
  client
    .query('SELECT * FROM fruits WHERE id = $1', [req.params.id])
    .then(result => {
      if(result.rowCount == 0 || result.rows.length != 1)
      {
        response.status(404).json({code: 404})
        return
      }

      console.log(result.rows)
      response.status(200).json(result.rows[0])
    })
    .catch(response.status(500).json)
})

router.delete('/fruits/:id', (req, response) => {
  const fruit = {
    id: req.params.id,
  }

  client
    .query('DELETE FROM fruits WHERE id = $1', [fruit.id])
    .then(result => {
      if(result.rowCount == 0)
      {
        response.status(404).json({code: 404})
        return
      }

      console.log(fruit)
      response.status(200).json(fruit)
    })
    .catch(response.status(500).json)
})

router.post('/fruits', (req, response) => {
  const fruit = {
    id  : uuidv4(),
    name: req.body.name
  }

  client
    .query('INSERT INTO fruits (id, name) VALUES ($1, $2)', [fruit.id, fruit.name])
    .then(result => {
      console.log(fruit)
      response.status(200).json(fruit)
    })
    .catch(response.status(500).json)
})

const port = process.env.PORT ?? 80;
app.listen(port, () => {
  console.log(`Service is running on port ${port}`)
})
