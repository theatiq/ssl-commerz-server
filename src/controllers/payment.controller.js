const { ObjectId } = require("mongodb")
const { productCollection } = require("../utils/connectDB")
const { default: axios } = require("axios")



// Merchant Panel URL: https://sandbox.sslcommerz.com/manage/ (Credential as you inputted in the time of registration)
// Store name: testtechsp79g
// Registered URL: http://localhost:5173

// Session API to generate transaction: https://sandbox.sslcommerz.com/gwprocess/v3/api.php

// Validation API: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?wsdl

// Validation API (Web Service) name: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php

// You may check our plugins available for multiple carts and libraries: https://github.com/sslcommerz



const postPayment = async (req, res) => {
    const payment = req.body
    const trnxId = new ObjectId().toString()
    payment.trxId = trnxId
    console.log("Payment Info :", payment)
    // Step-1: Initialize Data
    const initiate = {
        store_id: process.env.STORE_ID,
        store_passwd: process.env.STORE_PASS,
        total_amount: payment.price,
        currency: 'BDT',
        tran_id: payment.trxId, // use unique tran_id for each api call
        success_url: 'http://localhost:5000/payment/success',
        fail_url: 'http://localhost:5173/fail',
        cancel_url: 'http://localhost:5173/cancel',
        ipn_url: 'http://localhost:5000/ipn-success-payment',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    }


    // Step-2: Send a request to sslcommez to get gateway url
    const initResponse = await axios({
        url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        method: "POST",
        data: initiate,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    // console.log("Initiate Data: ", initiate)
    // console.log("Init Response: ", initResponse.data)

    const saveData = await productCollection.insertOne(payment)
    // Step-3: Grab the gateway url
    const gateWayURL = initResponse?.data?.GatewayPageURL
    console.log("gateWayURL: ", gateWayURL)
    // Step-4: Redirect to front end
    res.send({ gateWayURL })

    // https://sandbox.sslcommerz.com/EasyCheckOut/testcdeaa9f5f98b435b6d0d89704546781b515

}

const successPayment = async (req, res) => {
    // Step-5: Get Success Payment Data
    const paymentSuccess = req.body
    console.log("Payment Success Info: ", paymentSuccess)
    // Step-6: Validation
    // const { data } = await axios.get(`https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${paymentSuccess.val_id}&store_id=techs67ff202246e5e&store_passwd=techs67ff202246e5e`)

    const { data } = await axios.get(`https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${paymentSuccess.val_id}&store_id=techs67ff202246e5e&store_passwd=techs67ff202246e5e&format=json`)

    console.log("Validation Info: ", data)
    // if (data.status !== "VALID") {
    //     return res.send({ message: "Invalid Payment" })

    // }
    // Step-7: Update the Payment Database
    const updatePayment = await productCollection.updateOne({ trxId: paymentSuccess.tran_id }, {
        $set: {
            status: "Success"
        }
    })
    // Step-8: Update Cart
    // const payment = await paymentCollection.findOne({ trxId: paymentSuccess.tran_id })
    // const query = {
    //     _id: {
    //         $in: payment.cartIds.map((id) => new ObjectId(id))
    //     }
    // }
    // const deleteResult = await cartsCollection.deleteMany(query)
    // console.log(deleteResult)

    console.log("Updated Payment", updatePayment)
    res.redirect("http://localhost:5173/success")
}

module.exports = { postPayment, successPayment }