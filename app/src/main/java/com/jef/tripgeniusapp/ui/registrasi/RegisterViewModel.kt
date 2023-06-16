package com.jef.tripgeniusapp.ui.registrasi

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.google.gson.Gson
import com.jef.tripgeniusapp.api.ApiConfig
import com.jef.tripgeniusapp.model.UserPreference
import com.jef.tripgeniusapp.model.request.RegisterRequest
import com.jef.tripgeniusapp.model.response.ErrorResponse
import com.jef.tripgeniusapp.model.response.RegisterResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterViewModel(private val pref : UserPreference) : ViewModel() {

    private val _registerResponse = MutableLiveData<RegisterResponse>()
    val registerResponse: LiveData<RegisterResponse> = _registerResponse

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _errorResponse = MutableLiveData<ErrorResponse>()
    val errorResponse: LiveData<ErrorResponse> = _errorResponse


    companion object{
        private const val TAG = "MainViewModel"
    }

    fun registerUser(registerRequest : RegisterRequest) {
        _isLoading.value = true
        val apiService = ApiConfig().getApiService()
        val register = apiService.postRegister(registerRequest)

        register.enqueue(object : Callback<RegisterResponse> {
            override fun onResponse(
                call: Call<RegisterResponse>,
                response: Response<RegisterResponse>
            ) {
                _isLoading.value = false
                if (response.isSuccessful) {
                    _registerResponse.value = response.body()
                } else {
                    val error = response.errorBody()
                    val errorJsonString = error?.string()
                    val gson = Gson()
                    _errorResponse.value = gson.fromJson(errorJsonString, ErrorResponse::class.java)
                    Log.e(TAG, "onFailure: ${response.message()}")
                }
            }
            override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                _isLoading.value = false
                Log.e(TAG, "onFailure: ${t.message.toString()}")
            }
        })
    }

}