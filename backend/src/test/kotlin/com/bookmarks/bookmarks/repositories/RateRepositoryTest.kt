package com.bookmarks.bookmarks.repositories

import com.bookmarks.bookmarks.entities.Property
import com.bookmarks.bookmarks.entities.Rate
import com.bookmarks.bookmarks.repository.*
import com.fasterxml.jackson.databind.annotation.JsonAppend.Prop
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
class RateRepositoryTest {
    @Autowired
    lateinit var propertyRepository: PropertyRepository

    @Autowired
    lateinit var rateRepository: RateRepository

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
    fun testRates() {
        val rate = Rate(
            monthly = 100,
            weekly = 10,
            nightly = 2
        )
        rate.assignProperty(testSavedProperty)

        val savedRate = rateRepository.save(rate)

        assertNotNull(savedRate.id, "Rate ID should not be null after saving")

        val fetchedRate = rateRepository.findById(savedRate.id!!).orElse(null)
        assertNotNull(fetchedRate, "Rate should be found in the database")
        assertEquals(
            testSavedProperty.id,
            fetchedRate.property?.id,
            "Rate should be associated with the correct Property"
        )

        val fetchedProperty = propertyRepository.findById(testSavedProperty.id!!).orElse(null)
        assertNotNull(fetchedProperty, "Property should be found in the database")

        val doesPropertyContainRate =  fetchedProperty.rates?.any { it.id == savedRate.id } ?: false
        assertTrue(doesPropertyContainRate, "Property should contain the saved Rate")
    }
}