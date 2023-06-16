package com.jef.tripgeniusapp.model.response

import com.google.gson.annotations.SerializedName

data class PredictResponse(

	@field:SerializedName("data")
	val data: List<DataId>
)

data class DataId(

	@field:SerializedName("id")
	val id: String,

	@field:SerializedName("idPredict")
	val idPredict: String
)
