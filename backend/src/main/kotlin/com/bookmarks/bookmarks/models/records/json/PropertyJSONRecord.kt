package com.bookmarks.bookmarks.models.records.json

data class PropertyJSONRecord(
    var name: String? = null,
    var owner: String? = null,
    var type: String? = null,
    var description: String? = null,
    var beds: String? = null,
    var baths: String? = null,
    var square_feet: String? = null,
    var location: LocationJSONRecord? = null,
    var rates: RateJSONRecord? = null,
    var amenities: List<String>? = null,
    var images: List<String>? = null,
)