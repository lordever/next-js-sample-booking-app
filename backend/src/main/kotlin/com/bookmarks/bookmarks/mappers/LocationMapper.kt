package com.bookmarks.bookmarks.mappers

import com.bookmarks.bookmarks.entities.Location
import com.bookmarks.bookmarks.models.dto.LocationDTO
import com.bookmarks.bookmarks.models.records.json.LocationJSONRecord
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface LocationMapper {
    fun toLocation(locationJSONRecord: LocationJSONRecord): Location

    @Mapping(source = "full_text", target = "fullText")
    fun toDTO(location: Location): LocationDTO
}