package com.bookmarks.bookmarks.repositories

import com.bookmarks.bookmarks.entities.Location
import com.bookmarks.bookmarks.entities.Property
import com.bookmarks.bookmarks.repository.LocationRepository
import com.bookmarks.bookmarks.repository.PropertyRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
class LocationRepositoryTest {
    @Autowired
    lateinit var propertyRepository: PropertyRepository

    @Autowired
    lateinit var locationRepository: LocationRepository

    var testSavedProperty: Property = Property()

    @Transactional
    @BeforeEach
    fun setUp() {
        val testProperty = Property(
            name = "Test Prop"
        )

        testSavedProperty = propertyRepository.save(testProperty)
    }

    @Transactional
    @Test
    fun testLocations() {
        val location = Location(
            city = "Denver",
            state = "DE",
            street = "Will st.",
            zipcode = "123456"
        )
        testSavedProperty.assignLocation(location)

        val savedLocation = locationRepository.save(location)

        assertNotNull(savedLocation.id, "Location ID should not be null after saving")

        val fetchedLocation = locationRepository.findById(savedLocation.id!!).orElse(null)
        assertNotNull(fetchedLocation, "Location should be found in the database")
        assertEquals(
            testSavedProperty.id,
            fetchedLocation?.property?.firstOrNull()?.id,
            "Location should be associated with the correct Property"
        )

        val fetchedProperty = propertyRepository.findById(testSavedProperty.id!!).orElse(null)
        assertNotNull(fetchedProperty, "Property should be found in the database")
        assertEquals(
            savedLocation.id,
            fetchedProperty?.location?.id,
            "Property should be associated with the correct Location"
        )
    }

    @Transactional
    @Test
    fun testLocationByCity() {
        val city = "Philadelphia"

        val locationsByCity = locationRepository.findByCity(city)

        assertThat(locationsByCity).isNotEmpty
        locationsByCity.forEach { location -> assertEquals(city, location.city) }
    }

    @Transactional
    @Test
    fun testLocationByFullAddressContaining() {
        val city = "Denver"
        val street = "Lane"
        val fullAddress = "$street $city"

        val locationsByFullAddress = locationRepository.findByFullAddressContaining(fullAddress)

        assertThat(locationsByFullAddress).isNotEmpty
        locationsByFullAddress.forEach { location ->
            assertEquals(city, location.city)
            location.street?.contains(street)?.or(false)?.let { assertTrue(it) }
        }
    }
}