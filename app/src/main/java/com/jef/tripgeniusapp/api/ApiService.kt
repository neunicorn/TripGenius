package com.jef.tripgeniusapp.api


import com.jef.tripgeniusapp.model.request.DestinationRequest
import com.jef.tripgeniusapp.model.request.LoginRequest
import com.jef.tripgeniusapp.model.request.RegisterRequest
import com.jef.tripgeniusapp.model.response.*
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.*

interface ApiService {
    @POST("/v1/auth/register")
    fun postRegister(
        @Body request: RegisterRequest,
    ): Call<RegisterResponse>

    @POST("/v1/auth/login")
    fun postLogin(
        @Body request: LoginRequest,
    ): Call<LoginResponse>

    @GET("/v1/machineLearning/destination")
    fun getDestination(
        @Header("Authorization")token:String,
        @Query("id") ids:List<String>
    ):Call<DestinasiResponse>

    @GET("/v1/data/allRestaurant/2")
    fun getRestaurant(
        @Header("Authorization")token:String
    ):Call<RestaurantResponse>

    @GET("/v1/user")
    fun getUsers(
        @Header("Authorization") token: String
    ):  Call<UserResponse>
}