package com.jef.tripgeniusapp.model.response

import com.google.gson.annotations.SerializedName

data class ListResponse(

	@field:SerializedName("data")
	val data: Data? = null,

	@field:SerializedName("message")
	val message: String? = null,

	@field:SerializedName("status")
	val status: Boolean? = null
)

data class ListDestinasiUser(

	@field:SerializedName("kendaraan")
	val kendaraan: Any? = null,

	@field:SerializedName("restaurant")
	val restaurant: Any? = null,

	@field:SerializedName("hotel")
	val hotel: String? = null,

	@field:SerializedName("id")
	val id: Int? = null,

	@field:SerializedName("destinasi")
	val destinasi: String? = null
)
