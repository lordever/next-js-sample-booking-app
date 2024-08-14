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
        val amenities1 = Amenities(
            name = "Test"
        )
        val amenities2 = Amenities(
            name = "Test2"
        )
        amenities1.assignProperty(testSavedProperty)
        amenities2.assignProperty(testSavedProperty)

        val savedAmenities1 = amenitiesRepository.save(amenities1)
        val savedAmenities2 = amenitiesRepository.save(amenities2)

        assertNotNull(savedAmenities1.id, "Amenities ID should not be null after saving")
        assertNotNull(savedAmenities2.id, "Amenities ID should not be null after saving")

        val fetchedAmenities1 = amenitiesRepository.findById(savedAmenities1.id!!).orElse(null)
        val fetchedAmenities2 = amenitiesRepository.findById(savedAmenities2.id!!).orElse(null)

        assertNotNull(fetchedAmenities1, "First Amenities should be found in the database")
        assertNotNull(fetchedAmenities2, "Second Amenities should be found in the database")

        assertEquals(
            testSavedProperty.id,
            fetchedAmenities1?.property?.id,
            "First Amenities should be associated with the correct Property"
        )
        assertEquals(
            testSavedProperty.id,
            fetchedAmenities2?.property?.id,
            "Second Amenities should be associated with the correct Property"
        )

        val fetchedProperty = propertyRepository.findById(testSavedProperty.id!!).orElse(null)
        assertNotNull(fetchedProperty, "Property should be found in the database")

        val doesPropertyContainAmenities1 = fetchedProperty?.amenities?.any { it.id == savedAmenities1.id } ?: false
        val doesPropertyContainAmenities2 = fetchedProperty?.amenities?.any { it.id == savedAmenities2.id } ?: false

        assertTrue(doesPropertyContainAmenities1, "Property should contain the first saved Amenities")
        assertTrue(doesPropertyContainAmenities2, "Property should contain the second saved Amenities")
    }
}