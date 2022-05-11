const express = require("express")
const router = express.Router()

// Routes are read from top to bottom,
// so make sure you're declaring in order
// Put static routes BEFORE dynamic routes



router.use(userLogger)

router.get('/', (req, res) => {
    // To deal with queries (url)
    console.log(req.query.name)
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^
    res.send("User List")
})

router.get('/new', (req, res) => {
    // res.send("User New Form")
    res.render("users/new", { firstName: "Test" })
})



router.post('/', (req, res) => {
    // res.send('Create User')
    const isValid = true
    if(isValid) {
        // Add user to array
        users.push({ firstName: req.body.firstName })
        // Forward user to the get page, the array minus one
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("Error")
        // Pass down the first name they tried to create this with
        // if invalid, puts it back in the form on the same page
        // this works through interpolation from new.pug and users.js
        res.render('users/new', {firstName: req.body.firstName })
    }
    //////////////////////////////////
    // console.log(req.body.firstName) // by default express 
    // doesn't allow us to access the body, so we have to
    // use middleware to make the above log code work
    // in server.js app.use(express.urlencoded())
    res.send("Hi!")
})

// Dynamic parameter starts with :
// For getting an individual user 

router
    .route("/:id")
    .get((req, res) => {
        console.log(req.user)
        res.send(`Get User With ID ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Put User With ID ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete User With ID ${req.params.id}`)
    })


/*
// The code above replaces the more
// verbose code below. The only difference
// is we only had to define our route in one
// location, and all the requests match the route

router.get('/:id', (req, res) => {
    res.send(`Get User With ID ${req.params.id}`)
})

router.put('/:id', (req, res) => {
    res.send(`Put User With ID ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
    res.send(`Delete User With ID ${req.params.id}`)
}) 
*/

const users = [{ name: "Dino" }, { name: "Sabrina" }, { name: "Arman"}]

// param is a type of middleware, stuff that runs
// betwene the request and the response.
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    next()
})

// Every piece of middleware takes a req, res, next
function userLogger(req, res, next) {
    console.log("User: " + req.originalUrl)
    next()
}

module.exports = router