const app = require('express')();

const PORT = 4000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.get("/getRequest", (req, res) => {
    res.send("Hello this is GET METHOD");
});
