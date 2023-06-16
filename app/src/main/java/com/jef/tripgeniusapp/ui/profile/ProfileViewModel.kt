package com.jef.tripgeniusapp.ui.profile

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
import com.jef.tripgeniusapp.model.response.UserResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ProfileViewModel(private val pref: UserPreference) : ViewModel() {
    private val _errorResponse = MutableLiveData<ErrorResponse>()
    val errorResponse: LiveData<ErrorResponse> = _errorResponse

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _profileUser = MutableLiveData<UserResponse>()
    val profileUser: LiveData<UserResponse> = _profileUser

    fun getProfileUser(token : String){
        val client = ApiConfig().getApiService().getUsers("Bearer $token")
        client.enqueue(object : Callback<UserResponse> {
            override fun onResponse(
                call: Call<UserResponse>,
                response: Response<UserResponse>
            ) {
                _isLoading.value = false
                if (response.isSuccessful) {
                    val responseBody = response.body()
                    if (responseBody != null) {
                        _profileUser.value = response.body()
                    }
                } else {
                    Log.e(ContentValues.TAG, "onFailure: ${response.message()}")
                }
            }
            override fun onFailure(call: Call<UserResponse>, t: Throwable) {

                Log.e(ContentValues.TAG, "onFailure: ${t.message}")
            }
        })
    }
    fun getUser(): LiveData<Data> {
        return pref.getUser().asLiveData()
    }
}