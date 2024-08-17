package com.bookmarks.bookmarks.services

import com.bookmarks.bookmarks.entities.Location
import com.bookmarks.bookmarks.models.dto.LocationDTO

interface LocationService {
    fun findAll(): List<LocationDTO>
    fun findByCity(city: String): List<Location>
}