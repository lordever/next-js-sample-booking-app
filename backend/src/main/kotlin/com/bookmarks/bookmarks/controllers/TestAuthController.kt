package com.bookmarks.bookmarks.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TestAuthController {
    companion object {
        const val BASE_TEST_PATH = "/api/v1/test-auth"
    }

    @GetMapping(BASE_TEST_PATH)
    fun testAuth(): String {
        return "Test auth response"
    }
}