const express = require('express')

const PORT = process.env.PORT || 2121
const app = express()
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

app.get('', (req, res) => {
  res.json({
    message: 'Hiii'
  })
})

// Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))