package com.jef.tripgeniusapp.ui.profile

import android.content.ContentValues
import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import android.util.AttributeSet
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import com.jef.tripgeniusapp.R
import com.jef.tripgeniusapp.ViewModelFactory
import com.jef.tripgeniusapp.adapter.DestinasiAdapter
import com.jef.tripgeniusapp.databinding.FragmentProfileBinding
import com.jef.tripgeniusapp.model.UserPreference
import com.jef.tripgeniusapp.model.response.ListDestinasi
import com.jef.tripgeniusapp.model.response.UserData
import com.jef.tripgeniusapp.ui.home.MainViewModel
import com.jef.tripgeniusapp.ui.login.LoginActivity


class ProfileFragment : Fragment() {
    private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")
    companion object {
        fun newInstance() = ProfileFragment()
    }
    private lateinit var profileViewModel: ProfileViewModel
    private lateinit var binding : FragmentProfileBinding


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileBinding.inflate(inflater,container,false)
        return binding.root
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?){
        super.onViewCreated(view, savedInstanceState)

        setupViewModel()

    }
    private fun setupViewModel() {
        profileViewModel = ViewModelProvider(
            this,
            ViewModelFactory(UserPreference.getInstance(requireContext().dataStore))
        )[ProfileViewModel::class.java]
//        showLoading(true)
        profileViewModel.getUser().observe(this) { user ->
            if (user.accessToken.isNotEmpty()) {
                profileViewModel.getProfileUser(user.accessToken)

            } else {
                Log.e(ContentValues.TAG, "onFailure")
            }
        }
        profileViewModel.profileUser.observe(this) { profile ->
            setProfile(profile.data)
        }
    }
    private fun setProfile(profile: UserData) {

        binding.getName.text = profile.name
        binding.getAge.text = profile.age.toString()
        binding.getEmail.text = profile.email

    }
//    private fun showLoading(isLoading: Boolean) {
//        if (isLoading) {
//            binding.progressBar.visibility = View.VISIBLE
//        } else {
//            binding.progressBar.visibility = View.GONE
//        }
//    }
}