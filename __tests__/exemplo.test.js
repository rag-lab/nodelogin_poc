import request from 'supertest'
import app from '../src/app'
import User from '../src/database/schemas/User'
import bcrypt from 'bcryptjs';


//describe('',()=>{

//})

const mongoose = require('mongoose')


describe('User',()=>{

  it('teste registro usuario, passara somente na primeira vez',async ()=>{

    const response = await request(app)
      .post('/users')
      .send({
        nome:"nome0",
        email:"nome0@a.com",
        senha:"nome0",
        senha2:"nome0",	
        telefones:[
          {
            numero:"111111",
            ddd:"11"
          }
        ]
      })

    expect(response.body).toHaveProperty('newUser');
    
  })


  it('testa se a senha foi criptografada apos a criacao do user',async ()=>{

    const newUser = await User.create({
      nome:"nome user",
      email:"emailuser@a.com",
      senha:"abc",
      senha2:"abc",	
      telefones:[
        {
          numero:"111111",
          ddd:"11"
        }
      ],
      ultimo_login: new Date()
    })

    const comparar = await bcrypt.compare('abc', newUser.senha)

    expect(comparar).toBe(true);
  })


  afterAll( async () =>{
        await mongoose.connection.close()
    })

})
