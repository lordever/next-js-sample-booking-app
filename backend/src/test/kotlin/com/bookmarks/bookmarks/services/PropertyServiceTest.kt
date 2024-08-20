package com.bookmarks.bookmarks.services

import com.bookmarks.bookmarks.models.PropertiesFilter
import com.bookmarks.bookmarks.models.dto.PropertyDTO
import com.bookmarks.bookmarks.repository.LocationRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.domain.Page
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
class PropertyServiceTest {
    @Autowired
    lateinit var propertyService: PropertyService

    @Autowired
    lateinit var locationRepository: LocationRepository

    @Test
    @Transactional
    fun testFindAll() {
        val filter = PropertiesFilter()

        val listProperties = propertyService.findAll(filter)
        assertThat(listProperties.content.size).isEqualTo(10)
    }

    @Test
    @Transactional
    fun testFindAllWherePageSizeIsFive() {
        val filter = PropertiesFilter(pageSize = 5)

        val listProperties = propertyService.findAll(filter)
        assertThat(listProperties.content.size).isEqualTo(5)
    }

    @Test
    @Transactional
    fun testFindAllByType() {
        val testType = "Apartment"
        val filter = PropertiesFilter(type = testType)

        val listProperties = propertyService.findAll(filter)
        assertThat(listProperties.content.size).isEqualTo(7)

        listProperties.content.forEach { property -> assertThat(property.type).isEqualTo(testType) }
    }

    @Test
    @Transactional
    fun testFindAllByBadType() {
        val testType = "BAD TYPE"
        val filter = PropertiesFilter(type = testType)

        val listProperties = propertyService.findAll(filter)
        assertThat(listProperties.content.size).isEqualTo(0)
    }

    @Test
    @Transactional
    fun testFindAllByCity() {
        val testCity = "Philadelphia"
        val filter = PropertiesFilter(city = testCity)
        val listProperties: Page<PropertyDTO> = propertyService.findAll(filter)

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
    fun testFindAllByBadCity() {
        val testCity = "BAD CITY"
        val filter = PropertiesFilter(city = testCity)
        val listProperties: Page<PropertyDTO> = propertyService.findAll(filter)

        assertThat(listProperties.content.size).isEqualTo(0)
    }

    @Test
    @Transactional
    fun testFindAllByCityAndType() {
        val testType = "Condo"
        val testCity = "Los Angeles"
        val filter = PropertiesFilter(type = testType, city = testCity)

        val listProperties: Page<PropertyDTO> = propertyService.findAll(filter)

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
    fun testFindAllByBadCityAndBadType() {
        val testType = "BAD TYPE"
        val testCity = "BAD CITY"
        val filter = PropertiesFilter(type = testType, city = testCity)

        val listProperties: Page<PropertyDTO> = propertyService.findAll(filter)

        assertThat(listProperties.content.size).isEqualTo(0)
    }

    @Test
    @Transactional
    fun testFindAllByFullAddress() {
        val city = "Denver"
        val street = "Lane"
        val fullAddress = "$street $city"
        val filter = PropertiesFilter(fullAddress = fullAddress)
        val listProperties: Page<PropertyDTO> = propertyService.findAll(filter)

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
    fun testFindAllByBadFullAddress() {
        val fullAddress = "BAD CITY"
        val filter = PropertiesFilter(fullAddress = fullAddress)
        val listProperties: Page<PropertyDTO> = propertyService.findAll(filter)

        assertThat(listProperties.content.size).isEqualTo(0)
    }

    @Test
    @Transactional
    fun testFindAllByFullAddressAndType() {
        val city = "Los Angeles"
        val street = "Fashion Street"
        val fullAddress = "$street $city"
        val testType = "Condo"
        val filter = PropertiesFilter(fullAddress = fullAddress, type = testType)

        val listProperties: Page<PropertyDTO> = propertyService.findAll(filter)

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
        val filter = PropertiesFilter(fullAddress = testFullAddress, type = testType)

        val listProperties: Page<PropertyDTO> = propertyService.findAll(filter)

        assertThat(listProperties.content.size).isEqualTo(0)
    }
}