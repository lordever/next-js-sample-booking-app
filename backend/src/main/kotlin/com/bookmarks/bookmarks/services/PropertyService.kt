package com.bookmarks.bookmarks.services

import com.bookmarks.bookmarks.models.dto.PropertyDTO
import java.util.*

interface PropertyService {
    fun findAll(): List<PropertyDTO>
    fun findById(id: UUID): PropertyDTO
    fun create(property: PropertyDTO): PropertyDTO
    fun updateById(id: UUID, property: PropertyDTO): PropertyDTO
    fun delete(id: UUID): Boolean
}