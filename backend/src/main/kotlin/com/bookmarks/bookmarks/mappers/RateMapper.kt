package com.bookmarks.bookmarks.mappers

import com.bookmarks.bookmarks.entities.Rate
import com.bookmarks.bookmarks.models.records.json.RateJSONRecord
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface RateMapper {
    fun toRate(rateJSONRecord: RateJSONRecord): Rate
}