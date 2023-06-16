package com.jef.tripgeniusapp.model.response

import com.google.gson.annotations.SerializedName

data class RestaurantResponse(

	@field:SerializedName("data")
	val data: List<DataItem?>? = null,

	@field:SerializedName("message")
	val message: String? = null,

	@field:SerializedName("status")
	val status: Boolean? = null
)

data class DataItem(

	@field:SerializedName("address")
	val address: String? = null,

	@field:SerializedName("max_price")
	val maxPrice: String? = null,

	@field:SerializedName("min_price")
	val minPrice: String? = null,

	@field:SerializedName("latitude")
	val latitude: String? = null,

	@field:SerializedName("longtitude")
	val longtitude: String? = null,

	@field:SerializedName("resto_name")
	val restoName: String? = null,

	@field:SerializedName("id")
	val id: Int? = null,

	@field:SerializedName("name_category")
	val nameCategory: String? = null
)
