package com.jef.tripgeniusapp.ui.detail

import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.jef.tripgeniusapp.R
import com.jef.tripgeniusapp.ViewModelFactory
import com.jef.tripgeniusapp.databinding.ActivityDetailBinding
import com.jef.tripgeniusapp.model.UserPreference
import com.jef.tripgeniusapp.model.response.DataItem
import com.jef.tripgeniusapp.model.response.UserData
import com.jef.tripgeniusapp.ui.home.MainViewModel
import com.jef.tripgeniusapp.ui.profile.ProfileViewModel


private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")
class DetailActivity : AppCompatActivity() {

    private lateinit var detailActivityViewModel: DetailActivityViewModel
    private lateinit var binding: ActivityDetailBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setupViewModel()
    }
    private fun setUpRestaurant(restaurant: List<DataItem>){
        val name = intent.getStringExtra("name")
        val description = intent.getStringExtra("description")
        val photo = intent.getStringExtra("photo")

        Glide.with(applicationContext).load(photo).into(binding.image1)

        binding.tvDestinasi.text = name
        Log.d("lucu",name.toString())
        binding.tvDeskripsi.text = description
        binding.text2.text = restaurant[2].restoName
        setUpView()


    }
    private fun setUpView() {
        @Suppress("DEPRECATION")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.hide(WindowInsets.Type.statusBars())
        } else {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
            )
        }
        supportActionBar?.hide()
    }
    private fun setupViewModel() {
        detailActivityViewModel = ViewModelProvider(
            this,
            ViewModelFactory(UserPreference.getInstance(dataStore))
        )[DetailActivityViewModel::class.java]
        showLoading(true)
        detailActivityViewModel.getUser().observe(this) { user ->
            if (user.accessToken.isNotEmpty()) {
                detailActivityViewModel.getDestinastion(user.accessToken)

            } else {
                Log.e(ContentValues.TAG, "onFailure")
            }
        }
        detailActivityViewModel.listRestaurant.observe(this) { restaurant ->
            setUpRestaurant(restaurant.data as List<DataItem>)
        }
    }
    private fun showLoading(isLoading: Boolean) {
        if (isLoading) {
            binding.progressBar.visibility = View.VISIBLE
        } else {
            binding.progressBar.visibility = View.GONE
        }
    }
}


