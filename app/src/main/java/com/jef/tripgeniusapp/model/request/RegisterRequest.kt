package com.jef.tripgeniusapp.model.request

data class RegisterRequest (
    var name: String,
    var email: String,
    var password: String,
    val phone: String,
    val location: String,
    val username: String,
    val gender: String,
    val age: String
)