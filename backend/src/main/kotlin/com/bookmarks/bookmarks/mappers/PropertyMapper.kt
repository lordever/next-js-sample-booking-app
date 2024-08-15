package com.bookmarks.bookmarks.mappers

import com.bookmarks.bookmarks.entities.Amenities
import com.bookmarks.bookmarks.entities.Image
import com.bookmarks.bookmarks.entities.Property
import com.bookmarks.bookmarks.models.dto.PropertyDTO
import com.bookmarks.bookmarks.models.records.json.PropertyJSONRecord
import org.mapstruct.Mapper
import org.mapstruct.Mapping

object PropertyMapperHelper {
    @JvmStatic
    fun convertImagesToUrls(images: Set<Image>?): Set<String> {
        return images?.map { it.url ?: "" }?.toSet() ?: emptySet()
    }

    @JvmStatic
    fun convertAmenitiesToUrls(amenities: Set<Amenities>?): Set<String> {
        return amenities?.map { it.name ?: "" }?.toSet() ?: emptySet()
    }
}

@Mapper(componentModel = "spring", uses = [PropertyMapperHelper::class])
interface PropertyMapper {
    @Mapping(target = "location", ignore = true)
    @Mapping(target = "rates", ignore = true)
    @Mapping(target = "amenities", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "squareFeet", source = "square_feet")
    fun toProperty(propertyJsonRecord: PropertyJSONRecord): Property

    @Mapping(target = "createdAt", source = "createDate")
    @Mapping(target = "images", expression = "java(PropertyMapperHelper.convertImagesToUrls(property.getImages()))")
    @Mapping(
        target = "amenities",
        expression = "java(PropertyMapperHelper.convertAmenitiesToUrls(property.getAmenities()))"
    )
    fun toDTO(property: Property): PropertyDTO
}