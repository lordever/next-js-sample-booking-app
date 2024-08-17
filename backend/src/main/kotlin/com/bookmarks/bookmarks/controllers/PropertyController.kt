package com.bookmarks.bookmarks.controllers

import com.bookmarks.bookmarks.models.dto.PropertyDTO
import com.bookmarks.bookmarks.services.PropertyService
import mu.KotlinLogging
import org.springframework.data.domain.Page
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class PropertyController(private val propertyService: PropertyService) {
    private val logger = KotlinLogging.logger {}

    companion object {
        const val BASE_PROPERTIES_PATH = "/api/v1/properties"
        const val PROPERTIES_PATH_WITH_ID = "$BASE_PROPERTIES_PATH/{id}"
    }

    @ExceptionHandler(NotFoundException::class)
    fun handleNotFoundException(): ResponseEntity<String> {
        println("Calling from PropertyController custom exception handler")

        return ResponseEntity.notFound().build()
    }

    @GetMapping(BASE_PROPERTIES_PATH)
    fun listProperties(
        @RequestParam(required = false) location: String?,
        @RequestParam(required = false) type: String?,
        @RequestParam(required = false) page: Int?,
        @RequestParam(required = false) pageSize: Int?
    ): Page<PropertyDTO> {
        return propertyService.findAll(location, type, page ?: 0, pageSize ?: 10)
    }
}