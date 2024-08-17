package com.bookmarks.bookmarks.controllers

import com.bookmarks.bookmarks.models.dto.PropertyDTO
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.domain.Page
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.context.WebApplicationContext

@SpringBootTest
class PropertyControllerIT {

    @Autowired
    lateinit var propertyController: PropertyController

    @Autowired
    lateinit var wac: WebApplicationContext

    lateinit var mockMvc: MockMvc

    @BeforeEach
    fun setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build()
    }

    @Test
    @Transactional
    fun testGetAllProperties() {
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, null, null, null)

        assertThat(listProperties.content.size).isEqualTo(10)
    }

    @Test
    @Transactional
    fun testGetAllPropertiesIfPageSizeIsFive() {
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, null, null, 5)

        assertThat(listProperties.content.size).isEqualTo(5)
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByType() {
        val testType = "Apartment"
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, testType, null, null)

        assertThat(listProperties.content.size).isEqualTo(3)

        listProperties.content.forEach { property -> assertThat(property.type).isEqualTo(testType) }
    }
}