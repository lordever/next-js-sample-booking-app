package com.bookmarks.bookmarks.bootstrap

import com.bookmarks.bookmarks.entities.Property
import com.bookmarks.bookmarks.mappers.PropertyMapper
import com.bookmarks.bookmarks.models.records.json.PropertyJSONRecord
import com.bookmarks.bookmarks.repository.ImageRepository
import com.bookmarks.bookmarks.repository.LocationRepository
import com.bookmarks.bookmarks.repository.PropertyRepository
import com.bookmarks.bookmarks.repository.RateRepository
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import org.springframework.util.ResourceUtils
import java.io.File

@Component
class BootstrapData(
    var propertyRepository: PropertyRepository,
    var locationRepository: LocationRepository,
    var rateRepository: RateRepository,
    var imageRepository: ImageRepository,
    var propertyMapper: PropertyMapper
) : CommandLineRunner {
    @Transactional
    override fun run(vararg args: String?) {
        loadJsonData()
    }

    private fun loadJsonData() {
        if (propertyRepository.count() == 0L) {
            val file: File = ResourceUtils.getFile("classpath:jsondata/properties.json")
            val mapper = jacksonObjectMapper()

            val recs: List<PropertyJSONRecord> = mapper.readValue(file)
            val property: Property = propertyMapper.toProperty(recs[0])
            println(property)
        }
    }
}