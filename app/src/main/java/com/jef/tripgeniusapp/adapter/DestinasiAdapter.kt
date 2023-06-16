package com.jef.tripgeniusapp.adapter

import android.app.Activity
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.app.ActivityOptionsCompat
import androidx.core.util.Pair
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions
import com.jef.tripgeniusapp.R
import com.jef.tripgeniusapp.model.response.ListDestinasi
import com.jef.tripgeniusapp.ui.detail.DetailActivity

class DestinasiAdapter(private val listDestinasi: List<ListDestinasi>) :RecyclerView.Adapter<DestinasiAdapter.ListViewHolder>(){

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ListViewHolder {
        val view: View = LayoutInflater.from(parent.context).inflate(R.layout.activity_row, parent, false)
        return ListViewHolder(view)
    }

    override fun getItemCount() = listDestinasi.size

    override fun onBindViewHolder(viewHolder: ListViewHolder, position: Int) {
        Glide.with(viewHolder.itemView.context).load(listDestinasi[position].image)
            .transition(DrawableTransitionOptions.withCrossFade()).centerCrop()
            .into(viewHolder.imgPhoto)
        viewHolder.tvDestinasi.text = listDestinasi[position].place_name
        viewHolder.tvDescription.text = listDestinasi[position].description


        viewHolder.itemView.setOnClickListener{
            val intent = Intent(viewHolder.itemView.context, DetailActivity::class.java)
            intent.putExtra("name", listDestinasi[position].place_name)
            intent.putExtra("description", listDestinasi[position].description)
            intent.putExtra("photo", listDestinasi[position].image)

            viewHolder.itemView.context.startActivity(intent)
        }
    }

    class ListViewHolder(view : View) : RecyclerView.ViewHolder(view){
        val tvDestinasi: TextView = view.findViewById(R.id.tvDestinasi)
        val imgPhoto: ImageView = view.findViewById((R.id.img_avatar))
        val tvDescription: TextView = view.findViewById(R.id.tvDeskripsi)
    }
}