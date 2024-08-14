package com.bookmarks.bookmarks.mappers

import com.bookmarks.bookmarks.entities.Property
import com.bookmarks.bookmarks.models.records.json.PropertyJSONRecord
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface PropertyMapper {
    @Mapping(target = "locations", ignore = true)
    @Mapping(target = "rates", ignore = true)
    @Mapping(target = "amenities", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "squareFeet", source = "square_feet")
    fun toProperty(propertyJsonRecord: PropertyJSONRecord): Property
}