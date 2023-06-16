package com.jef.tripgeniusapp.ui.home

import android.content.ContentValues
import android.util.Log
import androidx.lifecycle.*
import com.jef.tripgeniusapp.api.ApiConfig
import com.jef.tripgeniusapp.model.UserPreference
import com.jef.tripgeniusapp.model.request.DestinationRequest
import com.jef.tripgeniusapp.model.request.LoginRequest
import com.jef.tripgeniusapp.model.response.Data
import com.jef.tripgeniusapp.model.response.DestinasiResponse
import com.jef.tripgeniusapp.model.response.ErrorResponse
import com.jef.tripgeniusapp.ui.login.LoginViewModel
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainViewModel(private val pref: UserPreference): ViewModel() {

    private val _errorResponse = MutableLiveData<ErrorResponse>()
    val errorResponse: LiveData<ErrorResponse> = _errorResponse

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _listDestinasi = MutableLiveData<DestinasiResponse>()
    val listDestinasi: LiveData<DestinasiResponse> = _listDestinasi


//    fun getDestinasi(token : String) {
//        _isLoading.value = true
//
//        val client = ApiConfig().getApiService().getDestination("Bearer $token")
//        client.enqueue(object : Callback<DestinasiResponse> {
//            override fun onResponse(
//                call: Call<DestinasiResponse>,
//                response: Response<DestinasiResponse>
//            ){
//                _isLoading.value = false
//                if (response.isSuccessful) {
//                    val responseBody = response.body()
//                    if (responseBody != null) {
//                        _listDestinasi.value = response.body()
//                    }
//                } else {
//                    Log.e(ContentValues.TAG, "onFailure: ${response.message()}")
//                }
//            }
//            override fun onFailure(call: Call<DestinasiResponse>, t: Throwable) {
//                _isLoading.value = false
//                Log.e(LoginViewModel.TAG, "onFailure: ${t.message.toString()}")
//            }
//        })
//    }

    fun getUser(): LiveData<Data> {
        return pref.getUser().asLiveData()
    }

    fun logout() {
        viewModelScope.launch {
            pref.logout()
        }
    }

}