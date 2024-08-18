package com.bookmarks.bookmarks.controllers

import com.bookmarks.bookmarks.models.dto.PropertyDTO
import com.bookmarks.bookmarks.repository.LocationRepository
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
    lateinit var locationRepository: LocationRepository

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
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, null, null, null, null)

        assertThat(listProperties.content.size).isEqualTo(10)
    }

    @Test
    @Transactional
    fun testGetAllPropertiesIfPageSizeIsFive() {
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, null, null, null, 5)

        assertThat(listProperties.content.size).isEqualTo(5)
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByType() {
        val testType = "Apartment"
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, null, testType, null, null)

        assertThat(listProperties.content.size).isEqualTo(7)

        listProperties.content.forEach { property -> assertThat(property.type).isEqualTo(testType) }
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByBadType() {
        val testType = "INCORRECT TYPE"
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, null, testType, null, null)

        assertThat(listProperties.content.size).isEqualTo(0)
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByCity() {
        val testCity = "Philadelphia"
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(testCity, null, null, null, null)

        assertThat(listProperties.content.size).isEqualTo(1)

        listProperties.content.forEach { property ->
            val locations = property.location?.city?.let { locationRepository.findByCity(it) }
            assertThat(locations).isNotNull
            assertThat(locations).isNotEmpty

            locations?.forEach { location -> assertThat(location.city).isEqualTo(testCity) }
        }
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByBadCity() {
        val testCity = "BAD CITY"
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(testCity, null, null, null, null)

        assertThat(listProperties.content.size).isEqualTo(0)
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByCityAndType() {
        val testType = "Condo"
        val testCity = "Los Angeles"

        val listProperties: Page<PropertyDTO> = propertyController.listProperties(testCity, null, testType, null, null)

        assertThat(listProperties.content.size).isEqualTo(2)

        listProperties.content.forEach { property ->
            assertThat(property.type).isEqualTo(testType)

            val propertyLocations = property.location?.city?.let { locationRepository.findByCity(it) }
            assertThat(propertyLocations).isNotNull
            assertThat(propertyLocations).isNotEmpty

            propertyLocations?.forEach { location -> assertThat(location.city).isEqualTo(testCity) }
        }
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByBadCityAndBadType() {
        val testType = "BAD TYPE"
        val testCity = "BAD CITY"

        val listProperties: Page<PropertyDTO> = propertyController.listProperties(testCity, null, testType, null, null)

        assertThat(listProperties.content.size).isEqualTo(0)
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByFullAddress() {
        val city = "Denver"
        val street = "Lane"
        val fullAddress = "$street $city"
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, fullAddress, null, null, null)

        assertThat(listProperties.content.size).isEqualTo(1)

        listProperties.content.forEach { property ->
            val locations = property.location?.city?.let { locationRepository.findByCity(it) }
            assertThat(locations).isNotNull
            assertThat(locations).isNotEmpty

            locations?.forEach { location -> assertThat(location.city).isEqualTo(city) }
        }
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByBadFullAddress() {
        val fullAddress = "BAD CITY"
        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, fullAddress, null, null, null)

        assertThat(listProperties.content.size).isEqualTo(0)
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByFullAddressAndType() {
        val city = "Los Angeles"
        val street = "Fashion Street"
        val fullAddress = "$street $city"
        val testType = "Condo"

        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, fullAddress, testType, null, null)

        assertThat(listProperties.content.size).isEqualTo(1)

        listProperties.content.forEach { property ->
            assertThat(property.type).isEqualTo(testType)

            val propertyLocations = property.location?.city?.let { locationRepository.findByCity(it) }
            assertThat(propertyLocations).isNotNull
            assertThat(propertyLocations).isNotEmpty

            propertyLocations?.forEach { location -> assertThat(location.city).isEqualTo(city) }
        }
    }

    @Test
    @Transactional
    fun testGetAllPropertiesByBadFullAddressAndBadType() {
        val testType = "BAD TYPE"
        val testFullAddress = "BAD CITY"

        val listProperties: Page<PropertyDTO> = propertyController.listProperties(null, testFullAddress, testType, null, null)

        assertThat(listProperties.content.size).isEqualTo(0)
    }
}