const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;

        Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                return resp.status(500).send({ result: "Token generation failed" });
            }
            resp.send({ user: result, auth: token });
        });
    } catch (err) {
        console.error("Registration Error:", err);
        resp.status(500).send({ error: "Registration failed" });
    }
});

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        }).select("-password");

        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong" });
                } else {
                    resp.send({ user, auth: token });
                }
            });
        } else {
            resp.send({ result: "No user found" });
        }
    } else {
        resp.send({ result: "Email and password required" });
    }
});

app.post("/add-product",verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products",verifyToken, async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No products found" });
    }
});

app.delete("/product/:id",verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

app.get("/product/:id",verifyToken, async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No Record Found..." });
    }
});

app.put("/product/:id",verifyToken, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    resp.send(result);
});

app.get("/search/:key",verifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key, $options: "i" } },
            { company: { $regex: req.params.key, $options: "i" } },
            { category: { $regex: req.params.key, $options: "i" } }
        ]
    });
    resp.send(result);
});
function verifyToken(req, resp, next) {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        console.warn("middleware called if", token);
        Jwt.verify(token, jwtKey, (err) => {
            if (err) {
                resp.send("please provide valid token");
            } else {
                next();
            }
        });
    } else {
        resp.send("please add token with header");
    }
}

app.listen(5000);
