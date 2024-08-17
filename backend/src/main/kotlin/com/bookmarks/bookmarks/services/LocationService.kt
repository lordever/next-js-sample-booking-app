package com.bookmarks.bookmarks.services

import com.bookmarks.bookmarks.entities.Location

interface LocationService {
    fun findByCity(city: String): List<Location>
}