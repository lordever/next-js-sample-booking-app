package com.bookmarks.bookmarks.services

import com.bookmarks.bookmarks.entities.Location
import com.bookmarks.bookmarks.mappers.LocationMapper
import com.bookmarks.bookmarks.models.dto.LocationDTO
import com.bookmarks.bookmarks.repository.LocationRepository
import org.springframework.stereotype.Service

@Service
class LocationServiceImpl(
    val locationRepository: LocationRepository,
    val locationMapper: LocationMapper
) : LocationService {
    override fun findAll(): List<LocationDTO> {
        val locations = locationRepository.findAll()
        return locations.map(locationMapper::toDTO)
    }

    override fun findByCity(city: String): List<Location> {
        return locationRepository.findByCity(city)
    }

    override fun findByFullAddress(fullAddress: String): List<Location> {
        return locationRepository.findByFullAddressContaining(fullAddress)
    }
}