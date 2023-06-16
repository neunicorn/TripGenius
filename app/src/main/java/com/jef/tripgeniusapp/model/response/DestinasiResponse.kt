package com.jef.tripgeniusapp.model.response

import com.google.gson.annotations.SerializedName

data class DestinasiResponse(

	@field:SerializedName("data")
	val data: List<ListDestinasi?>? = null,

	@field:SerializedName("message")
	val message: String? = null,

	@field:SerializedName("status")
	val status: Boolean? = null
)

data class ListDestinasi(

	@field:SerializedName("coodinate")
	val coodinate: String? = null,

	@field:SerializedName("image")
	val image: String? = null,

	@field:SerializedName("city")
	val city: String? = null,

	@field:SerializedName("price")
	val price: String? = null,

	@field:SerializedName("place_name")
	val place_name: String? = null,

	@field:SerializedName("rating")
	val rating: String? = null,

	@field:SerializedName("description")
	val description: String? = null,

	@field:SerializedName("id")
	val id: Int? = null,

	@field:SerializedName("category")
	val category: String? = null,

	@field:SerializedName("lat")
	val lat: String? = null,

	@field:SerializedName("long")
	val jsonMemberLong: String? = null
)
