package com.jef.tripgeniusapp.ui.registrasi

import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import androidx.lifecycle.ViewModelProvider
import com.jef.tripgeniusapp.R
import com.jef.tripgeniusapp.ViewModelFactory
import com.jef.tripgeniusapp.customview.RegisterButton
import com.jef.tripgeniusapp.databinding.ActivityRegisterBinding
import com.jef.tripgeniusapp.model.UserPreference
import com.jef.tripgeniusapp.model.request.RegisterRequest
import com.jef.tripgeniusapp.ui.login.LoginActivity
import com.jef.tripgeniusapp.utils.Validator

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var registerViewModel: RegisterViewModel
    private lateinit var textPassword : EditText
    private lateinit var textEmail : EditText
    private lateinit var textName : EditText
    private lateinit var textUsername : EditText
    private lateinit var textGender : EditText
    private lateinit var textPhone : EditText
    private lateinit var textLocation: EditText
    private lateinit var textAge: EditText
    private lateinit var registerButton: RegisterButton

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        textPassword = binding.editPassword
        textEmail = binding.editEmail
        textName = binding.editName
        textUsername = binding.editUsername
        textGender = binding.editGender
        textPhone = binding.editPhone
        textLocation = binding.editLocation
        textAge = binding.editAge

        setUpView()
        setUpViewModel()
        setUpAction()


        val textWatcher = object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
            }
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                setUpButton()
            }
            override fun afterTextChanged(s: Editable?) {
            }
        }
        textPassword.addTextChangedListener(textWatcher)
    }
    private fun setUpButton(){
        val result = textPassword.text
        binding.registerButton.isEnabled = result != null && checkLengthText(result.toString())
    }

    private fun checkLengthText(text : String):Boolean{
        if(text.length >= 8){
            return true
        }
        return false
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

    private fun setUpViewModel() {
        registerViewModel = ViewModelProvider(
            this,
            ViewModelFactory(UserPreference.getInstance(dataStore))
        )[RegisterViewModel::class.java]

        registerViewModel.isLoading.observe(this){
            showLoading(it)
        }
    }
    private fun setUpAction() {
        binding.registerButton.setOnClickListener {
            val name = binding.editName.text.toString()
            val username = binding.editUsername.text.toString()
            val email = binding.editEmail.text.toString()
            val password = binding.editPassword.text.toString()
            val phone = binding.editPhone.text.toString()
            val location = binding.editLocation.text.toString()
            val gender = binding.editGender.text.toString()
            val age = binding.editAge.text.toString()
            when {
                name.isEmpty() -> {
                    binding.editName.error = "Masukan Nama"
                }
                email.isEmpty() -> {
                    binding.editEmail.error = "Masukan Email"
                }
                password.isEmpty() -> {
                    binding.editPassword.error = "Masukan Password"
                }
                username.isEmpty() -> {
                    binding.editUsername.error = "Masukan Username"
                }
                location.isEmpty() -> {
                    binding.editLocation.error = "Masukan Lokasi"
                }
                phone.isEmpty() -> {
                    binding.editPhone.error = "Masukan Nomor Telephone"
                }
                gender.isEmpty() -> {
                    binding.editGender.error = "Masukan Gender"
                }
                age.isEmpty() -> {
                    binding.editAge.error = "Masukan Umur"
                }
                !Validator.isValidInputEmail(binding.editEmail.text.toString()) -> {
                    binding.editEmail.error = "Your email is not valid"
                }
                else -> {
                    val registerRequest = RegisterRequest(name, email, password,phone, location, username, gender, age)
                    registerViewModel.registerUser(registerRequest)
                    registerViewModel.registerResponse.observe(this) { response ->
                        Toast.makeText(this, response.message, Toast.LENGTH_LONG).show()
                        val intent = Intent(this, LoginActivity::class.java)
                        startActivity(intent)
                        finish()
                    }
                    registerViewModel.errorResponse.observe(this){ response ->
                        if(response.message != null){
                            Toast.makeText(this, response.message, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
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