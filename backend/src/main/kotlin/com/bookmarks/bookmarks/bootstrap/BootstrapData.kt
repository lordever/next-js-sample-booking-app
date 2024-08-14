package com.bookmarks.bookmarks.bootstrap

import com.bookmarks.bookmarks.entities.*
import com.bookmarks.bookmarks.mappers.LocationMapper
import com.bookmarks.bookmarks.mappers.PropertyMapper
import com.bookmarks.bookmarks.mappers.RateMapper
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
    var propertyMapper: PropertyMapper,
    var rateMapper: RateMapper,
    var locationMapper: LocationMapper,
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
            recs.forEach { propertyJSONRecord ->
                val property = propertyMapper.toProperty(propertyJSONRecord)
                var location = Location()
                var rate = Rate()

                if (propertyJSONRecord.location != null) {
                    location = locationMapper.toLocation(propertyJSONRecord.location!!)
                    location.assignProperty(property)
                }

                if (propertyJSONRecord.rates != null) {
                    rate = rateMapper.toRate(propertyJSONRecord.rates!!)
                    rate.assignProperty(property)
                }

                loadImages(propertyJSONRecord, property)
                loadAmenities(propertyJSONRecord, property)

                println(property)
                println(location)
                println(rate)
            }
        }
    }

    private fun loadImages(propertyJSONRecord: PropertyJSONRecord, property: Property) {
        propertyJSONRecord.images?.takeIf { it.isNotEmpty() }?.let { images ->
            images.forEach { imageJsonRecord ->
                val image = Image(
                    url = imageJsonRecord
                )
                image.assignProperty(property)
            }
        }
    }

    private fun loadAmenities(propertyJSONRecord: PropertyJSONRecord, property: Property) {
        propertyJSONRecord.amenities?.takeIf { it.isNotEmpty() }?.let { amenitiesList ->
            amenitiesList.forEach { amenitiesJsonRecord ->
                val amenities = Amenities(
                    name = amenitiesJsonRecord
                )
               amenities.assignProperty(property)
            }
        }
    }
}