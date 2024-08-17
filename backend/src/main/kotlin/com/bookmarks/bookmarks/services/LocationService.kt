package com.bookmarks.bookmarks.services

import com.bookmarks.bookmarks.entities.Location

interface LocationService {
    fun findByZipCode(zipCode: String): List<Location>
}