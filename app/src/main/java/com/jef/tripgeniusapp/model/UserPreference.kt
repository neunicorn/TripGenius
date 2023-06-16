package com.jef.tripgeniusapp.model

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import com.jef.tripgeniusapp.model.response.Data
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.runBlocking

class UserPreference private constructor(private val dataStore: DataStore<Preferences>) {

    fun getUser(): Flow<Data> {
        return dataStore.data.map { preferences ->
            Data(
                preferences[NAME_KEY] ?:"",
                preferences[ID_KEY] ?:"",
                preferences[TOKEN_KEY] ?:"",
            )
        }
    }

    suspend fun login(user: Data) {
        dataStore.edit { preferences ->
            preferences[NAME_KEY] = user.name
            preferences[ID_KEY] = user.id
            preferences[TOKEN_KEY] = user.accessToken
        }
    }

    suspend fun logout() {
        dataStore.edit { preferences ->
            preferences[NAME_KEY] = ""
            preferences[ID_KEY] = ""
            preferences[TOKEN_KEY] = ""
        }
    }

    companion object {
        @Volatile
        private var INSTANCE: UserPreference? = null

        private val NAME_KEY = stringPreferencesKey("name")
        private val ID_KEY = stringPreferencesKey("id")
        private val TOKEN_KEY = stringPreferencesKey("token")

        fun getInstance(dataStore: DataStore<Preferences>): UserPreference {
            return INSTANCE ?: synchronized(this) {
                val instance = UserPreference(dataStore)
                INSTANCE = instance
                instance
            }
        }
    }
}