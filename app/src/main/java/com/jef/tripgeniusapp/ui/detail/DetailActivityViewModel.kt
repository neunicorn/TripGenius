package com.jef.tripgeniusapp.ui.detail

import android.content.ContentValues
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import com.jef.tripgeniusapp.api.ApiConfig
import com.jef.tripgeniusapp.model.UserPreference
import com.jef.tripgeniusapp.model.response.Data
import com.jef.tripgeniusapp.model.response.ErrorResponse
import com.jef.tripgeniusapp.model.response.RestaurantResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class DetailActivityViewModel(private val pref: UserPreference): ViewModel() {

    private val _errorResponse = MutableLiveData<ErrorResponse>()
    val errorResponse: LiveData<ErrorResponse> = _errorResponse

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _listRestaurant = MutableLiveData<RestaurantResponse>()
    val listRestaurant: LiveData<RestaurantResponse> = _listRestaurant

    companion object{
        const val TAG = "MainViewModel"
    }
    fun getDestinastion(token: String) {
        _isLoading.value = true
        val client = ApiConfig().getApiService().getRestaurant("Bearer $token")
        client.enqueue(object : Callback<RestaurantResponse> {
            override fun onResponse(
                call: Call<RestaurantResponse>,
                response: Response<RestaurantResponse>
            ) {
                _isLoading.value = false
                if (response.isSuccessful) {
                    val responseBody = response.body()
                    if (responseBody != null) {
                        _listRestaurant.value = response.body()
                    }
                } else {
                    Log.e(ContentValues.TAG, "onFailure: ${response.message()}")
                }
            }

            override fun onFailure(call: Call<RestaurantResponse>, t: Throwable) {
                _isLoading.value = false
                Log.e(DetailActivityViewModel.TAG, "onFailure: ${t.message.toString()}")
            }
        })
    }

    fun getUser(): LiveData<Data> {
        return pref.getUser().asLiveData()
    }
}