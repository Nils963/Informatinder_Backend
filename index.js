import { server } from "./server.js"
import { db } from "./db.js"

const PORT = process.env.PORT || 8080;

db.authenticate()
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => {
    console.log("DB err", err)
  })

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ...`);
})
