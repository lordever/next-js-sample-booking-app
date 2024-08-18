package com.bookmarks.bookmarks.models.records.json

data class LocationJSONRecord(
    var street: String? = null,
    var city: String? = null,
    var state: String? = null,
    var zipcode: String? = null,
    var full_text: String? = null,
)