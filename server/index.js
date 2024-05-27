const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {setUser,getUser} = require('./auth')


mongoose.connect("mongodb://localhost:27017/Shopping").then(console.log('database connected'))


//DataBase models

const AccSchema = mongoose.Schema({name:String,email:String,password:String})
const Account = mongoose.model('Account',AccSchema);

// Account.create({name:"prem",username:"prem357180",password:"1234"})

const ItemsSchema = mongoose.Schema({img:String ,price:Number,rating:Number})
const Items = mongoose.model('Items',ItemsSchema)

// Define the schema for UserData
const UserDataSchema = new mongoose.Schema({
    mail: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Items' }],
    placed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Items' }],
    selling: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Items' }]
  });
  
  // Create the UserData model
  const UserData = mongoose.model('UserData', UserDataSchema);

// Items.pre('')
////////////////////////////////////////

const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())

app.get("/home", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'secret', (err, user) => {
            if (err) {
                console.log('Token verification failed:', err);
                res.send('false'); // Forbidden
            }
            res.send('true');
        });
    } else {
        console.log('Token not received');
        res.send('false'); // Unauthorized
    }
});


app.get("/getid", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'secret', (err, user) => {
            if (err) {
                console.log('Token verification failed:', err);
                res.json(false); // Forbidden
            }
            res.json(user.email);
        });
    } else {
        console.log('Token not received');
        res.json(false); // Unauthorized
    }
});

app.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    Account.create({name,email,password})
    UserData.create({mail:email})
})


app.post('/login',async (req,res)=>{
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'secret', (err, user) => {
            if (err) {
                console.log('Token verification failed:', err);
                res.send('false'); // Forbidden
            }
            res.send('true');
        });
    } else {
    const {email,password} = req.body;
    const user =await Account.findOne({email:email,password:password})
    if(!user){console.log("wrong credentials");res.send(false)}
    else{
        const token = setUser(user);
        res.cookie("token",token)
        return res.send(true)
    } }
}) 


// app.post('/sell',async(req,res)=>{
//     let {mail,image,price} = req.body;
//     var id = ''
//     await Items.create({img:image,price:price,rating:0}).then(e=>{console.log(e._id);id=e._id})
//     const user = await UserData.findOne({ mail: mail }).exec();
//     if(user){
//         user.selling.push(id);
//         user.save();
//     }else{
//         console.log(id);
//         const newUser = new UserData({    
//             mail: mail,
//             cart: [],
//             placed: [], 
//             selling: [id]
//         }); 
//         await newUser.save();
//         console.log(newUser.selling[0])
//         console.log(id);
//     }
    
// })

app.post('/sell', async (req, res) => {
    const { mail, image, price } = req.body;
  
    try {
      const item = await Items.create({ img: image, price: price, rating: 0 });
      const itemId = item._id;
      let user = await UserData.findOne({ mail: mail }).exec();
  
      if (user) {
        user.selling.push(itemId);
        await user.save();
        res.status(200).send('Item added to existing user');
      } else {
        const newUser = new UserData({
          mail: mail,
          cart: [],
          placed: [],
          selling: [itemId]
        });
        await newUser.save();
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  

app.get('/getitems',async (req,res)=>{
    res.json(await Items.find({}))
})
app.post('/cart',async (req,res)=>{
    const {mail} = req.body
    const user = await UserData.findOne({ mail: mail }).exec();
    const item = await Promise.all(user.cart.map(e=>Items.findById(e).exec()))
    res.json(item);
})


app.post('/getSellingItems',async (req,res)=>{
    const {mail} = req.body
    if(mail==""){console.log('not entered'); return}
    const user = await UserData.findOne({ mail: mail }).exec();
    if(!user){return}
    const item = await Promise.all(user.selling.map(e=>Items.findById(e).exec()))
    res.json(item);
})
 

app.post('/getOrderedItems',async (req,res)=>{
    const {mail} = req.body
    if(mail==""){console.log('not entered'); return}
    const user = await UserData.findOne({ mail: mail }).exec();
    const item = await Promise.all(user.placed.map(e=>Items.findById(e).exec()))
    res.json(item);
})
  
app.post('/setcart',async (req,res)=>{
    const {mail,id} = req.body
    UserData.findOne({mail:mail}).exec().then((user)=>{
        if(user){
            user.cart.push(id)
            user.save()
        }
    })
})

app.post('/removecart',async (req,res)=>{
    const {mail,id} = req.body
    UserData.findOne({mail:mail}).exec().then((user)=>{
        if(user){
            let  index  = user.cart.map((e,i) => {if(e === id){return i}})
            if(index!=-1){
                user.cart.splice(index,1);
            }
            user.save()
        }
    })
})


app.post('/removeSelling', async (req, res) => {
    const { mail, id } = req.body;
  
    try {
      const deletedItem = await Items.findByIdAndDelete(id);
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      const user = await UserData.findOne({ mail: mail }).exec();
      if (user) {
        const index = user.selling.indexOf(id);
        if (index !== -1) {
          user.selling.splice(index, 1);
          await user.save()
        }
      }
      res.json(true);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/cancleorder',async (req,res)=>{
    const {mail,id} = req.body
    UserData.findOne({mail:mail}).exec().then((user)=>{
        if(user){
            let  index  = user.placed.map((e,i) => {if(e === id){return i}})
            if(index!=-1){
                user.placed.splice(index,1);
            }
            user.save()
            res.json(true)
        }
    })
    
})

app.post('/buyItem',async (req,res)=>{
    const {mail,id} = req.body
    try {
    UserData.findOne({mail:mail}).exec().then((user)=>{
        if(user){
            let  index  = user.cart.map((e,i) => {if(e === id){return i}}) 
                if(index!=-1){
                    user.cart.splice(index,1);
                }
                user.placed.push(id)
                user.save()
            }
        })
    } catch (error) {
    }
})
app.post('/editprice',async (req,res)=>{
    const {id,price} = req.body
    try {
        await Items.findByIdAndUpdate(id, { price: price })
    } catch (error) {
    } 
})

app.listen(5000,()=>{
    console.log('listning at 5000');
})