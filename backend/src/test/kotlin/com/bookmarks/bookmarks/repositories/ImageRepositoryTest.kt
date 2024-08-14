package com.bookmarks.bookmarks.repositories

import com.bookmarks.bookmarks.entities.Image
import com.bookmarks.bookmarks.entities.Property
import com.bookmarks.bookmarks.repository.ImageRepository
import com.bookmarks.bookmarks.repository.PropertyRepository
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
class ImageRepositoryTest {
    @Autowired
    lateinit var propertyRepository: PropertyRepository

    @Autowired
    lateinit var imageRepository: ImageRepository

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
    fun testImages() {
        val image1 = Image(
            url = "http://test.com/image1.png"
        )
        val image2 = Image(
            url = "http://test.com/image2.png"
        )
        image1.assignProperty(testSavedProperty)
        image2.assignProperty(testSavedProperty)

        val firstSavedImage = imageRepository.save(image1)
        val secondSavedImage = imageRepository.save(image2)

        assertNotNull(firstSavedImage.id, "First image ID should not be null after saving")
        assertNotNull(secondSavedImage.id, "Second image ID should not be null after saving")

        val firstFetchedImage = imageRepository.findById(firstSavedImage.id!!).orElse(null)
        val secondFetchedImage = imageRepository.findById(secondSavedImage.id!!).orElse(null)

        assertNotNull(firstFetchedImage, "First image should be found in the database")
        assertNotNull(secondFetchedImage, "Second image should be found in the database")

        assertEquals(
            testSavedProperty.id,
            firstFetchedImage.property?.id,
            "First image should be associated with the correct Property"
        )

        assertEquals(
            testSavedProperty.id,
            secondFetchedImage.property?.id,
            "Second image should be associated with the correct Property"
        )

        val fetchedProperty = propertyRepository.findById(testSavedProperty.id!!).orElse(null)
        assertNotNull(fetchedProperty, "Image should be found in the database")

        val doesPropertyContainImages1 = fetchedProperty.images?.any { it.id == firstSavedImage.id } ?: false
        val doesPropertyContainImages2 = fetchedProperty.images?.any { it.id == secondSavedImage.id } ?: false

        assertTrue(doesPropertyContainImages1, "Property should contain the first saved Images")
        assertTrue(doesPropertyContainImages2, "Property should contain the second saved Images")
    }
}