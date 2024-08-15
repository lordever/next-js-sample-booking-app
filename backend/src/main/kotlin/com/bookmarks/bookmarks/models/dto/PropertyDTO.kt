package com.bookmarks.bookmarks.models.dto

data class PropertyDTO(
    var type: String? = null,
    var name: String? = null,
    var owner: String? = null,
    var description: String? = null,
    var createdAt: String? = null,
    var beds: Int? = null,
    var baths: Int? = null,
    var squareFeet: Int? = null,
    var location: LocationDTO? = null,
    var rates: RateDTO? = null,
    var images: Set<String> = setOf(),
    var amenities: Set<String> = setOf(),
)