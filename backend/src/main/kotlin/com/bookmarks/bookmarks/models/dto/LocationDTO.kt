package com.bookmarks.bookmarks.models.dto

import java.util.UUID

data class LocationDTO(
    var id: UUID? = null,
    var street: String? = null,
    var city: String? = null,
    var state: String? = null,
    var zipcode: String? = null,
    var fullText: String? = null,
)