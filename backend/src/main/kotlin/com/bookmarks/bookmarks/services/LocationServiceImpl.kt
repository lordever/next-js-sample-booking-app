package com.bookmarks.bookmarks.services

import com.bookmarks.bookmarks.entities.Location
import com.bookmarks.bookmarks.repository.LocationRepository
import org.springframework.stereotype.Service

@Service
class LocationServiceImpl(val locationRepository: LocationRepository) : LocationService {
    override fun findByZipCode(zipCode: String): List<Location> {
        return locationRepository.findByZipcode(zipCode)
    }
}