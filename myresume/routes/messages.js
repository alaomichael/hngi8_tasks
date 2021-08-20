const express = require('express')
const Message = require('./../models/message')
const router = express.Router();

router.get("/new", (req, res) => {
  res.render('messages/new', { message: new Message()})
});

router.get("/edit/:id", async (req, res) => {
  const message = await Message.findById(req.params.id)
  res.render('messages/edit', { message: message })
});

router.get('/:id', async (req,res) => {
  const message = await Message.findOne({_id: req.params.id})
  if (message == null ) res.redirect('/')
 res.render('messages/show', {message: message});
})

router.post("/", async (req, res,next) => {
 req.message = new Message()
 next()
}, saveMessageAndRedirect('new'));

router.put("/:id", async (req, res, next) => {
 req.message = await Message.findById(req.params.id)
 next()
}, saveMessageAndRedirect('edit'));

router.delete('/:id', async(req, res) => {
  await Message.findByIdAndDelete(req.params.id)
  res.redirect('/');
})

// Not Found Page
// router.get("*", (req, res) => {
//   res.render('messages/notfound', { message: "Not Found"})
// });

function saveMessageAndRedirect(path){
  return async (req, res) => {
    let message = req.message
    message.firstname = req.body.firstname
    message.lastname = req.body.lastname
    message.email = req.body.email
    message.phone = req.body.phone
    message.message = req.body.message
   
    try{
      message = await message.save()
      res.redirect(`/messages/${message.id}`)
    } catch (e){
      res.render(`messages/${path}`, {message: message}
      )
    }
  }
}

module.exports = router