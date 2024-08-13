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
        val image = Image(
            url = "http://test.com/image.png"
        )
        image.assignProperty(testSavedProperty)

        val savedImage = imageRepository.save(image)

        assertNotNull(savedImage.id, "Image ID should not be null after saving")

        val fetchedImage = imageRepository.findById(savedImage.id!!).orElse(null)
        assertNotNull(fetchedImage, "Image should be found in the database")
        assertEquals(
            testSavedProperty.id,
            fetchedImage.property?.id,
            "Image should be associated with the correct Property"
        )

        val fetchedProperty = propertyRepository.findById(testSavedProperty.id!!).orElse(null)
        assertNotNull(fetchedProperty, "Image should be found in the database")

        val doesPropertyContainImages =  fetchedProperty.images?.any { it.id == savedImage.id } ?: false
        assertTrue(doesPropertyContainImages, "Property should contain the saved Images")
    }
}