package com.jef.tripgeniusapp.api

import com.jef.tripgeniusapp.model.response.PredictResponse
import retrofit2.Call
import retrofit2.http.*

interface ApiServicePredict {
    @GET("/predict")
    fun getPredict(
        @Query("user_age")user_age:Int
    ):Call<PredictResponse>
}