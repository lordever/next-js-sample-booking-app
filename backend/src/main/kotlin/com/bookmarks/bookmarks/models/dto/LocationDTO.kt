package com.bookmarks.bookmarks.models.dto

data class LocationDTO(
    var street: String? = null,
    var city: String? = null,
    var state: String? = null,
    var zipcode: String? = null
)