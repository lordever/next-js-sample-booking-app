package com.bookmarks.bookmarks.models.dto

import com.bookmarks.bookmarks.entities.Rate

data class PropertyDTO(
    var type: String? = null,
    var name: String? = null,
    var owner: String? = null,
    var description: String? = null,
    var beds: Int? = null,
    var baths: Int? = null,
    var squareFeet: Int? = null,
    var location: LocationDTO? = null,
    var rates: Rate? = null,
    var images: List<String>? = null,
    var amenities: List<String>? = null,
)