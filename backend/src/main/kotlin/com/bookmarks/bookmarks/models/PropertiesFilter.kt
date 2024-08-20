package com.bookmarks.bookmarks.models

data class PropertiesFilter(
    var city: String? = null,
    var fullAddress: String? = null,
    var type: String? = null,
    var page: Int? = null,
    var pageSize: Int? = null,
) {
    init {
        page = page ?: 0
        pageSize = pageSize ?: 10
    }
}