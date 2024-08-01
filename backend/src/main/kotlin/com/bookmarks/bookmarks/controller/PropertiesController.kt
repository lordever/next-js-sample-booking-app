package com.bookmarks.bookmarks.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class PropertiesController {

    companion object {
        const val BASE_PROPERTIES_PATH = "/api/v1/properties"
    }

    @GetMapping(BASE_PROPERTIES_PATH)
    fun getProperties(): String {
        return "Properties"
    }

}