package com.bookmarks.bookmarks.repositories

import com.bookmarks.bookmarks.entities.Amenities
import com.bookmarks.bookmarks.entities.Property
import com.bookmarks.bookmarks.repository.AmenitiesRepository
import com.bookmarks.bookmarks.repository.PropertyRepository
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
class AmenitiesRepositoryTest {
    @Autowired
    lateinit var propertyRepository: PropertyRepository

    @Autowired
    lateinit var amenitiesRepository: AmenitiesRepository

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
    fun testAmenities() {
        val amenities = Amenities(
            name = "Test"
        )
        amenities.assignProperty(testSavedProperty)

        val savedAmenities = amenitiesRepository.save(amenities)

        assertNotNull(savedAmenities.id, "Amenities ID should not be null after saving")

        val fetchedAmenities = amenitiesRepository.findById(savedAmenities.id!!).orElse(null)
        assertNotNull(fetchedAmenities, "Amenities should be found in the database")
        assertEquals(
            testSavedProperty.id,
            fetchedAmenities.property?.id,
            "Amenities should be associated with the correct Property"
        )

        val fetchedProperty = propertyRepository.findById(testSavedProperty.id!!).orElse(null)
        assertNotNull(fetchedProperty, "Property should be found in the database")

        val doesPropertyContainAmenities =  fetchedProperty.amenities?.any { it.id == savedAmenities.id } ?: false
        assertTrue(doesPropertyContainAmenities, "Property should contain the saved Amenities")
    }
}