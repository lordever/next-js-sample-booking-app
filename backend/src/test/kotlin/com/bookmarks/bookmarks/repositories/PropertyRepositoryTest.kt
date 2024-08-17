package com.bookmarks.bookmarks.repositories

import com.bookmarks.bookmarks.repository.LocationRepository
import com.bookmarks.bookmarks.repository.PropertyRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class PropertyRepositoryTest {
    @Autowired
    lateinit var propertyRepository: PropertyRepository

    @Autowired
    lateinit var locationRepository: LocationRepository

    @Test
    fun testGetPropertiesByType() {
        val testType = "Apartment"

        val properties = propertyRepository.findAllByType(testType, null)

        assertThat(properties).hasSize(2)
    }

    @Test
    fun testGetPropertiesByLocationIn() {
        val firstLocation = locationRepository.findAll()[0]
        val secondLocation = locationRepository.findAll()[1]

        val locations = listOf(firstLocation, secondLocation)

        val properties = propertyRepository.findAllByLocationIn(locations, null)

        assertThat(properties).hasSize(2)
    }

    @Test
    fun testGetPropertiesByLocationInAndType() {
        val testType = "Condo"
        val testCity = "Los Angeles"

        val locations = locationRepository.findByCity(testCity)

        val properties = propertyRepository.findAllByLocationInAndType(locations, testType, null)

        assertThat(properties).hasSize(2)

        properties.content.forEach { property ->
            assertThat(property.type).isEqualTo(testType)

            val propertyLocations = property.location?.city?.let { locationRepository.findByCity(it) }
            assertThat(propertyLocations).isNotNull
            assertThat(propertyLocations).isNotEmpty

            propertyLocations?.forEach { location -> assertThat(location.city).isEqualTo(testCity) }
        }
    }

    @Test
    fun testGetPropertiesByBadLocationInAndBadType() {
        val testType = "BAD TYPE"
        val testCity = "BAD CITY"

        val locations = locationRepository.findByCity(testCity)

        val properties = propertyRepository.findAllByLocationInAndType(locations, testType, null)

        assertThat(properties).hasSize(0)
    }
}