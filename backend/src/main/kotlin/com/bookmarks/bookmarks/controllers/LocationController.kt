package com.bookmarks.bookmarks.controllers

import com.bookmarks.bookmarks.models.dto.LocationDTO
import com.bookmarks.bookmarks.services.LocationService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class LocationController(private val locationService: LocationService) {
    companion object {
        const val BASE_LOCATION_PATH = "/public/api/v1/locations"
        const val LOCATION_PATH_WITH_ID = "$BASE_LOCATION_PATH/{id}"
    }

    @ExceptionHandler(NotFoundException::class)
    fun handleNotFoundException(): ResponseEntity<String> {
        println("Calling from PropertyController custom exception handler")

        return ResponseEntity.notFound().build()
    }

    @GetMapping(BASE_LOCATION_PATH)
    fun listLocations(): ResponseEntity<List<LocationDTO>> {
        val locations = locationService.findAll()
        return ResponseEntity.status(HttpStatus.OK).body(locations)
    }
}