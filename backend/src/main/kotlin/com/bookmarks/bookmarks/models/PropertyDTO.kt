package com.bookmarks.bookmarks.models

import jakarta.persistence.Column
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.util.Date

data class PropertyDTO(
    var _id: String? = null,
    var type: String? = null,
    var owner: String? = null,
    var beds: Int? = null,
    var baths: Int? = null,
    var squareFeet: Int? = null,
    var createdAt: Date? = null,
    var rates: RatesDTO? = null,
    var location: LocationDTO? = null,
    var images: List<String>,
    var amenities: List<String>,

    @field:NotBlank
    @field:NotNull
    @field:Column(length = 50)
    @field:Size(max = 50)
    var name: String? = null,

    @field:NotBlank
    @field:NotNull
    @field:Column(length = 255)
    @field:Size(max = 255)
    var description: String? = null,
)