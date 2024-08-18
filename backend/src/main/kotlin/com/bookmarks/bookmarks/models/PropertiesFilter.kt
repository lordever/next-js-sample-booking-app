package com.bookmarks.bookmarks.models

data class PropertiesFilter(
    var city: String? = null,
    var fullAddress: String? = null,
    var type: String? = null,
    var page: Int? = 0,
    var pageSize: Int? = 10,
)