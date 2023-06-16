package com.jef.tripgeniusapp.ui.login

import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import android.widget.EditText
import android.widget.Toast
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import androidx.lifecycle.ViewModelProvider
import com.jef.tripgeniusapp.R
import com.jef.tripgeniusapp.ViewModelFactory
import com.jef.tripgeniusapp.customview.LoginButton
import com.jef.tripgeniusapp.customview.RegisterButton
import com.jef.tripgeniusapp.databinding.ActivityLoginBinding
import com.jef.tripgeniusapp.model.UserPreference
import com.jef.tripgeniusapp.model.response.Data
import com.jef.tripgeniusapp.ui.home.MainActivity
import com.jef.tripgeniusapp.ui.registrasi.RegisterActivity
import com.jef.tripgeniusapp.utils.Validator.isValidInputEmail

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")
class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var loginViewModel: LoginViewModel
    private lateinit var loginButton: LoginButton
    private lateinit var registerButton: RegisterButton
    private lateinit var passwordText: EditText
    private lateinit var emailText: EditText


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.hide()

        emailText = binding.email
        passwordText = binding.password
        loginButton = binding.btnLogin
        registerButton = binding.btnRegister

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
        passwordText.addTextChangedListener(textWatcher)
    }

    private fun setUpButton() {
        val result = passwordText.text
        loginButton.isEnabled = result != null && checkLengthText(result.toString())
    }

    private fun checkLengthText(text: String): Boolean {
        if (text.length >= 8) {
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
        loginViewModel = ViewModelProvider(
            this,
            ViewModelFactory(UserPreference.getInstance(dataStore))
        )[LoginViewModel::class.java]

        loginViewModel.isLoading.observe(this) {
            showLoading(it)
        }
    }

    private fun setUpAction() {
        loginButton.setOnClickListener {
            val email = binding.email.text.toString()
            val password = binding.password.text.toString()
            when {
                email.isEmpty() -> {
                    binding.email.error = "Your email still empty"
                }
                password.isEmpty() -> {
                    binding.password.error = "Your password still empty"
                }
                !isValidInputEmail(binding.email.text.toString()) -> {
                    binding.email.error = "Your email is not valid"
                }
                else -> {
                    loginViewModel.loginUser(email, password)
                    loginViewModel.loginResponse.observe(this) { loginResponse ->
                        Log.d(ContentValues.TAG, "success response")
                        Toast.makeText(this, loginResponse.message, Toast.LENGTH_SHORT).show()
                        val login = Data(
                            loginResponse.data.name,
                            loginResponse.data.id, loginResponse.data.accessToken
                        )
                        loginViewModel.loginDataBase(login)
                        val intent = Intent(this, MainActivity::class.java)

                        intent.flags =
                            Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
                        startActivity(intent)
                        finish()
                    }
                    loginViewModel.errorResponse.observe(this) { errorResponse ->
                        if (errorResponse.message != null) {
                            Toast.makeText(this, errorResponse.message, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
        }
        registerButton.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
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