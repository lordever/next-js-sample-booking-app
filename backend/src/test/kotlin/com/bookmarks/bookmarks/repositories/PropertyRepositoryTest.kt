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
    fun testGetPropertiesByLocationIn() {
        val firstLocation = locationRepository.findAll()[0]
        val secondLocation = locationRepository.findAll()[1]

        val locations = listOf(firstLocation, secondLocation)

        val properties = propertyRepository.findAllByLocationIn(locations, null)

        assertThat(properties).hasSize(2)
    }
}