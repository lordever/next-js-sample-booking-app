package com.bookmarks.bookmarks.mappers

import com.bookmarks.bookmarks.entities.Location
import com.bookmarks.bookmarks.models.records.json.LocationJSONRecord
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface LocationMapper {
    fun toLocation(locationJSONRecord: LocationJSONRecord): Location
}